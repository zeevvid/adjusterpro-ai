import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Smartphone, Clock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PublicIntakeData } from '../../types';

interface StepProps {
    data: PublicIntakeData;
    updateData: (updates: Partial<PublicIntakeData>) => void;
    onComplete: () => void;
    onBack: () => void;
}

export const StepContact: React.FC<StepProps> = ({ data, updateData, onComplete, onBack }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    // Options
    const options = [
        { id: 'review', label: 'Get a free professional claim review', icon: ShieldCheck },
        { id: 'verify', label: 'Have an adjuster confirm this estimate', icon: UserCheck },
        { id: 'start', label: 'Start my claim the right way', icon: CheckCircle2 },
        { id: 'save', label: 'Just save this report', icon: ArrowLeft } // Visual only, actually exit
    ];

    const handleSubmit = async () => {
        if (!selectedOption) return;

        // SaaS Routing Logic
        if (data.referralId) {
            console.log(`Routing lead to referring adjuster: ${data.referralId}`);
            // No fee for referred leads
            setSubmitted(true);
        } else {
            if (selectedOption !== 'save') {
                console.log("Organic lead - triggering conversion fee flow ($400)");
                // In a real app, we would redirect to Stripe here
                // const sessionUrl = await createConversionPaymentSession(data.claimId, 400);
                // window.location.href = sessionUrl;

                // For the demo, show "Processing Payment" state
                setSubmitted(true);
            } else {
                setSubmitted(true);
            }
        }

        setTimeout(() => {
            onComplete();
        }, 3000);
    };

    if (submitted) {
        return (
            <div className="max-w-xl mx-auto mt-20 text-center px-6 animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={48} />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-4">You're all set!</h2>
                <p className="text-xl text-slate-500 mb-8">We've generated your report. An expert will reach out shortly to discuss your options.</p>
                <p className="text-sm text-slate-400">Redirecting to home...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto w-full md:mt-8 px-6 mb-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-900 mb-2">What would you like to do next?</h2>
                <p className="text-slate-500">Choose the best option for your situation. No pressure.</p>
            </div>

            <div className="space-y-4 mb-8">
                {options.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => setSelectedOption(opt.id)}
                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 group ${selectedOption === opt.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-slate-100 bg-white hover:border-blue-300'
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${selectedOption === opt.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-500'
                            }`}>
                            <opt.icon size={24} />
                        </div>
                        <span className={`text-lg font-bold ${selectedOption === opt.id ? 'text-blue-900' : 'text-slate-700'}`}>
                            {opt.label}
                        </span>
                        {selectedOption === opt.id && <CheckCircle2 className="ml-auto text-blue-600" size={24} />}
                    </button>
                ))}
            </div>

            {selectedOption && selectedOption !== 'save' && (
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl animate-in fade-in slide-in-from-bottom-8">
                    <h3 className="text-xl font-black text-slate-900 mb-6">Where should we send the details?</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                            <div className="relative">
                                <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    placeholder="John Doe"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold text-slate-700"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Phone Number</label>
                            <div className="relative">
                                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    placeholder="(555) 123-4567"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold text-slate-700"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Best Time to Call</label>
                            <div className="relative">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold text-slate-700 appearance-none">
                                    <option>Morning (9am - 12pm)</option>
                                    <option>Afternoon (12pm - 5pm)</option>
                                    <option>Evening (5pm - 8pm)</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 text-white text-xl font-bold py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 mt-4"
                        >
                            Confirm & Send
                        </button>
                    </div>
                </div>
            )}

            {selectedOption === 'save' && (
                <div className="text-center animate-in fade-in">
                    <p className="text-slate-500 mb-4">We've saved this report to your browser session.</p>
                    <button onClick={onComplete} className="text-blue-600 font-bold hover:underline">Return to Home</button>
                </div>
            )}

            <button onClick={onBack} className="w-full text-center text-slate-400 font-bold text-sm mt-8 hover:text-slate-600">Back</button>
        </div>
    );
};
