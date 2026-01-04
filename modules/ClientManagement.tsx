import React, { useState } from 'react';
import { Plus, Search, Filter, PenTool, ClipboardList, ArrowLeft, Send, CheckCircle2, X } from 'lucide-react';

import { IntakeWizard } from '../components/IntakeWizard';
import { QuickContract } from '../components/QuickContract';
import { getIntakes, getContractRequests } from '../services/db';

type ViewMode = 'LIST' | 'SELECTION' | 'CONTRACT' | 'INTAKE';

interface ClaimRecord {
    id: string;
    name: string;
    type: 'Intake' | 'Contract';
    status: string;
    date: string;
}

export const ClientManagement: React.FC = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('LIST');
    const [claims, setClaims] = useState<ClaimRecord[]>([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const intakes = await getIntakes();
                const contracts = await getContractRequests();

                const normalizedIntakes = intakes.map((i: any) => ({
                    id: i.id,
                    name: i.clientName || 'Unknown Client',
                    type: 'Intake' as const,
                    status: 'New Intake',
                    date: i.createdAt?.toDate().toLocaleDateString() || 'N/A'
                }));

                const normalizedContracts = contracts.map((c: any) => ({
                    id: c.id,
                    name: c.name || 'Unknown Client',
                    type: 'Contract' as const,
                    status: c.status || 'Pending',
                    date: c.createdAt?.toDate().toLocaleDateString() || 'N/A'
                }));

                setClaims([...normalizedIntakes, ...normalizedContracts]);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (viewMode === 'LIST') {
            fetchData();
        }
    }, [viewMode]);

    const renderContent = () => {
        switch (viewMode) {
            case 'SELECTION':
                return (
                    <div className="max-w-4xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-4">
                        <button
                            onClick={() => setViewMode('LIST')}
                            className="mb-8 flex items-center text-slate-500 hover:text-slate-800 transition-colors"
                        >
                            <ArrowLeft size={20} className="mr-2" /> Back to Client List
                        </button>
                        <h2 className="text-3xl font-black text-slate-800 mb-2 text-center">New File Setup</h2>
                        <p className="text-slate-500 text-center mb-12 text-lg">Choose how you want to initiate this claim file.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Option 1: Fast Contract */}
                            <button
                                onClick={() => setViewMode('CONTRACT')}
                                className="group relative bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-200 hover:-translate-y-2 transition-all text-left"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <PenTool size={120} />
                                </div>
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                    <PenTool size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 mb-2">Execute Contract</h3>
                                <p className="text-slate-500 mb-8 leading-relaxed">Fast-path for securing representation. Enter basic info and immediately send a DocuSign envelope.</p>
                                <span className="inline-flex items-center text-blue-600 font-bold group-hover:underline">
                                    Launch Sign Flow <Send size={16} className="ml-2" />
                                </span>
                            </button>

                            {/* Option 2: Full Intake */}
                            <button
                                onClick={() => setViewMode('INTAKE')}
                                className="group relative bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-indigo-200 hover:-translate-y-2 transition-all text-left"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <ClipboardList size={120} />
                                </div>
                                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                                    <ClipboardList size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 mb-2">Full Intake & Setup</h3>
                                <p className="text-slate-500 mb-8 leading-relaxed">Comprehensive file creation. Step through the 6-part intake wizard to capture all loss details.</p>
                                <span className="inline-flex items-center text-indigo-600 font-bold group-hover:underline">
                                    Start Wizard <CheckCircle2 size={16} className="ml-2" />
                                </span>
                            </button>
                        </div>
                    </div>
                );

            case 'CONTRACT':
                return (
                    <div className="max-w-3xl mx-auto py-8">
                        <button onClick={() => setViewMode('SELECTION')} className="mb-6 flex items-center text-slate-500 hover:text-slate-800"><ArrowLeft size={18} className="mr-2" /> Back</button>
                        <QuickContract onCancel={() => setViewMode('LIST')} />
                    </div>
                );

            case 'INTAKE':
                return (
                    <div className="max-w-5xl mx-auto py-8">
                        <button onClick={() => setViewMode('SELECTION')} className="mb-6 flex items-center text-slate-500 hover:text-slate-800"><ArrowLeft size={18} className="mr-2" /> Back</button>
                        <IntakeWizard onCancel={() => setViewMode('LIST')} />
                    </div>
                );

            case 'LIST':
            default:
                return (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        {/* Incoming Lead Notifications */}
                        <div className="space-y-4">
                            {[
                                {
                                    id: 'lead-1',
                                    name: 'Sarah Mitchell',
                                    type: 'Hurricane Roof Damage',
                                    time: '2 minutes ago',
                                    source: 'Damage Calculator',
                                    urgent: true
                                },
                                {
                                    id: 'lead-2',
                                    name: 'Robert Chen',
                                    type: 'Water Leak - Kitchen',
                                    time: '18 minutes ago',
                                    source: 'Referral Link',
                                    urgent: false
                                }
                            ].map((lead) => (
                                <div
                                    key={lead.id}
                                    className={`bg-gradient-to-r ${lead.urgent ? 'from-red-50 to-orange-50 border-red-200' : 'from-blue-50 to-indigo-50 border-blue-200'} border-2 rounded-[32px] p-6 shadow-sm animate-in slide-in-from-top-4`}
                                >
                                    <div className="flex items-center justify-between gap-6">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className={`w-12 h-12 ${lead.urgent ? 'bg-red-600' : 'bg-blue-600'} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg relative`}>
                                                {lead.name[0]}
                                                {lead.urgent && (
                                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white animate-pulse"></div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h4 className="text-lg font-black text-slate-900">{lead.name}</h4>
                                                    {lead.urgent && (
                                                        <span className="bg-red-600 text-white text-[8px] font-black uppercase px-2 py-1 rounded-full">Urgent</span>
                                                    )}
                                                    <span className="text-xs text-slate-400 font-bold">• {lead.time}</span>
                                                </div>
                                                <p className="text-sm text-slate-600 font-medium">{lead.type}</p>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Source: {lead.source}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setViewMode('SELECTION')}
                                                className={`${lead.urgent ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 active:scale-95`}
                                            >
                                                <Plus size={18} /> Accept Lead
                                            </button>
                                            <button className="text-slate-400 hover:text-slate-600 transition-colors p-2">
                                                <X size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Main Claims Table */}
                        <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm">
                            <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Claim Management Console</h3>
                                    <p className="text-slate-500">Internal status tracking for all firm-represented policyholders.</p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                                        <Filter size={18} /> Filter
                                    </button>
                                    <button
                                        onClick={() => setViewMode('SELECTION')}
                                        className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                                    >
                                        <Plus size={20} /> New File
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                                        <tr>
                                            <th className="px-10 py-5">Policyholder</th>
                                            <th className="px-10 py-5">File ID</th>
                                            <th className="px-10 py-5">Workflow Status</th>
                                            <th className="px-10 py-5">Created Date</th>
                                            <th className="px-10 py-5 text-right">Access</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {loading ? (
                                            <tr><td colSpan={5} className="text-center py-10">Loading records...</td></tr>
                                        ) : claims.length === 0 ? (
                                            <tr><td colSpan={5} className="text-center py-10 text-slate-500">No active files found. Start a new file above.</td></tr>
                                        ) : (
                                            claims.map((claim) => (
                                                <tr key={claim.id} className="hover:bg-slate-50 transition-all group">
                                                    <td className="px-10 py-8 font-black text-slate-800">
                                                        {claim.name}
                                                        <span className="block text-[10px] text-slate-400 font-normal uppercase tracking-wider">{claim.type}</span>
                                                    </td>
                                                    <td className="px-10 py-8 font-mono text-xs text-slate-400">{claim.id.slice(0, 8)}...</td>
                                                    <td className="px-10 py-8">
                                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${claim.status === 'sent' ? 'bg-yellow-50 text-yellow-600' : 'bg-blue-50 text-blue-600'}`}>
                                                            {claim.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-10 py-8 font-black text-slate-900">{claim.date}</td>
                                                    <td className="px-10 py-8 text-right">
                                                        <button className="text-indigo-600 font-bold text-sm hover:underline">Manage File</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return renderContent();
};
