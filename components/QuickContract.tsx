import React, { useState } from 'react';
import { Send, CheckCircle2, FileSignature } from 'lucide-react';
import { saveContractRequest } from '../services/db';

export const QuickContract: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
    const [data, setData] = useState({
        name: '',
        email: '',
        address: '',
        fee: 20
    });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const id = await saveContractRequest(data);

            // Trigger n8n Webhook
            const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
            const webhookSecret = import.meta.env.VITE_N8N_WEBHOOK_SECRET;

            if (!webhookSecret) {
                alert("Missing Webhook Secret! Please restart your terminal/server to load the new .env file.");
                setLoading(false);
                return;
            }

            if (webhookUrl) {
                try {
                    await fetch(webhookUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-webhook-secret': webhookSecret || ''
                        },
                        body: JSON.stringify({
                            id,
                            timestamp: new Date().toISOString(),
                            secret: webhookSecret,
                            // Contract Data Structure
                            contract_type: "Letter of Representation",
                            organization: {
                                name: "United Damage Adjusters, LLC",
                                short_name: "U.D.A.",
                                address: "2455 Hollywood Blvd. – Suite 214, Hollywood, FL 33020",
                                contact: {
                                    office_phone: "(954) 453-1174",
                                    fax: "(954) 239-7788",
                                    email: "claims@udafl.com"
                                }
                            },
                            policyholder: {
                                full_name: data.name,
                                signatures_required: 1,
                                address: data.address, // Using loss address as default
                                email: data.email
                            },
                            insurance: {
                                insurance_company: "",
                                policy_number: "",
                                claim_type: {
                                    new: true,
                                    reopen: false,
                                    supplement: false,
                                    denial: false,
                                    state_of_emergency: false
                                }
                            },
                            loss_details: {
                                property_address: data.address,
                                date_of_loss: "", // Not collected in Quick Contract
                                cause_of_loss: "Storm",
                                coverage_types: ["building", "personal_property", "ALE", "loss_of_income"]
                            },
                            compensation_terms: {
                                fee_percentage: data.fee,
                                fee_basis: "total_actual_damages_recovered",
                                payment_trigger: "upon_insurance_payment",
                                payee_authorization: true
                            },
                            financial_authorizations: {
                                assignment_of_proceeds: true,
                                lien_rights: true,
                                power_of_attorney: {
                                    limited: true,
                                    scope: ["endorse_documents", "file_documents", "endorse_checks", "deposit_funds", "disburse_net_proceeds"]
                                }
                            },
                            mortgage_authorization: {
                                release_information: true,
                                authorize_communication: true,
                                authorize_claim_funds: true
                            },
                            legal_terms: {
                                governing_law: "Florida",
                                attorney_fees_clause: true,
                                fraud_warning: {
                                    statute: "Florida Statute 817.234",
                                    penalty: "Third-degree felony"
                                }
                            },
                            cancellation_rights: {
                                allowed: true,
                                period_days: 10,
                                notice_method: ["certified_mail", "proof_of_mailing"],
                                penalty: "none"
                            }
                        })
                    });
                } catch (webhookError) {
                    console.error("Webhook trigger failed", webhookError);
                }
            }

            // Simulate API call to DocuSign
            setTimeout(() => {
                setLoading(false);
                setSent(true);
            }, 1000);
        } catch (error) {
            console.error("Error saving contract request:", error);
            setLoading(false);
            alert("Failed to send contract request.");
        }
    };

    if (sent) {
        return (
            <div className="bg-white p-12 rounded-[40px] shadow-xl border border-slate-200 text-center animate-in fade-in zoom-in-95">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-2">Envelope Sent!</h3>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">The representation agreement has been sent to <strong>{data.email}</strong> via DocuSign. You will be notified when they sign.</p>
                <button onClick={onCancel} className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-colors">Return to Dashboard</button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[40px] shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-blue-600 text-white p-8 flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl"><FileSignature size={32} /></div>
                <div>
                    <h2 className="text-2xl font-black tracking-tight">Prepare Contract</h2>
                    <p className="text-blue-200 text-sm">Rapidly generate and send a 20% Contingency Agreement.</p>
                </div>
            </div>

            <form onSubmit={handleSend} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Client Name</label>
                        <input required className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-900"
                            placeholder="e.g. John Doe"
                            value={data.name} onChange={e => setData({ ...data, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Client Email</label>
                        <input required type="email" className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-900"
                            placeholder="e.g. john@example.com"
                            value={data.email} onChange={e => setData({ ...data, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Property Address (Loss Location)</label>
                    <input required className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-900"
                        placeholder="e.g. 123 Main St, Miami, FL"
                        value={data.address} onChange={e => setData({ ...data, address: e.target.value })}
                    />
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-slate-800">Contingency Fee Percentage</h4>
                        <p className="text-xs text-slate-500">Standard rate is 20%. Adjust only if approved.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200">
                        <span className="font-black text-slate-400">%</span>
                        <input type="number" className="w-16 font-black text-xl text-right outline-none text-slate-900" value={data.fee} onChange={e => setData({ ...data, fee: parseInt(e.target.value) })} />
                    </div>
                </div>

                <div className="pt-6 flex gap-4">
                    <button type="button" onClick={onCancel} className="flex-1 py-4 font-bold text-slate-500 hover:text-slate-700 transition-colors">Cancel</button>
                    <button disabled={loading} type="submit" className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
                        {loading ? 'Sending...' : <><Send size={20} /> Send via DocuSign</>}
                    </button>
                </div>
            </form>
        </div>
    );
};
