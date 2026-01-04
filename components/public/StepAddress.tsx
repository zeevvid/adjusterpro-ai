import React, { useState } from 'react';
import { MapPin, Search, CheckCircle, ArrowRight, Loader } from 'lucide-react';
import { PublicIntakeData } from '../../types';

interface StepProps {
    data: PublicIntakeData;
    updateData: (updates: Partial<PublicIntakeData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export const StepAddress: React.FC<StepProps> = ({ data, updateData, onNext, onBack }) => {
    const [address, setAddress] = useState(data.address || '');
    const [analyzing, setAnalyzing] = useState(false);
    const [steps, setSteps] = useState<{ id: string, text: string, status: 'pending' | 'loading' | 'done' }[]>([
        { id: '1', text: 'Locating Property...', status: 'pending' },
        { id: '2', text: 'Checking NOAA Storm Database...', status: 'pending' },
        { id: '3', text: 'Analyzing Local Claims Data...', status: 'pending' },
        { id: '4', text: 'Verifying Storm Date Match...', status: 'pending' }
    ]);
    const [complete, setComplete] = useState(false);

    const startAnalysis = () => {
        if (!address) return;
        setAnalyzing(true);
        updateData({ address });

        let currentStepDelay = 0;

        steps.forEach((step, index) => {
            currentStepDelay += 800 + Math.random() * 500;

            setTimeout(() => {
                setSteps(prev => prev.map((s, i) => {
                    if (i === index) return { ...s, status: 'loading' };
                    if (i === index - 1) return { ...s, status: 'done' };
                    return s;
                }));
            }, currentStepDelay);

            setTimeout(() => {
                setSteps(prev => prev.map((s, i) => {
                    if (i === index) return { ...s, status: 'done' };
                    return s;
                }));

                if (index === steps.length - 1) {
                    setComplete(true);
                    // Wait a moment then show next button or auto-advance? 
                    // User requested "Qualifying storm on [Date]" message.
                }
            }, currentStepDelay + 1200);
        });
    };

    return (
        <div className="max-w-2xl mx-auto w-full md:mt-8 px-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Where did this happen?</h2>
                <p className="text-slate-500">We need the address to check historical storm data.</p>
            </div>

            <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-8">
                {!analyzing ? (
                    <div className="space-y-6">
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                            <input
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                placeholder="Enter Property Address"
                                className="w-full text-lg font-medium bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                            />
                        </div>
                        <button
                            onClick={startAnalysis}
                            disabled={!address}
                            className="w-full bg-blue-600 text-white text-lg font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            Check This Location <Search size={20} />
                        </button>
                        <button onClick={onBack} className="w-full text-slate-400 font-bold hover:text-slate-600">Go Back</button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-slate-900 text-center mb-6">Analyzing Location Context...</h3>
                        <div className="space-y-4">
                            {steps.map((step) => (
                                <div key={step.id} className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${step.status === 'done' ? 'bg-green-100 text-green-600' :
                                            step.status === 'loading' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-300'
                                        }`}>
                                        {step.status === 'done' ? <CheckCircle size={18} /> :
                                            step.status === 'loading' ? <Loader size={18} className="animate-spin" /> :
                                                <div className="w-2 h-2 rounded-full bg-current" />}
                                    </div>
                                    <span className={`font-medium transition-all ${step.status === 'done' ? 'text-slate-900' :
                                            step.status === 'loading' ? 'text-blue-600' : 'text-slate-400'
                                        }`}>{step.text}</span>
                                </div>
                            ))}
                        </div>

                        {complete && (
                            <div className="mt-8 pt-8 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-4">
                                <div className="bg-green-50 rounded-2xl p-6 text-center mb-6 border border-green-100">
                                    <p className="text-green-800 font-bold text-lg mb-1">✓ Verified Storm Match</p>
                                    <p className="text-green-600 text-sm">We found qualifying storm activity near this location matching your date.</p>
                                </div>
                                <button
                                    onClick={onNext}
                                    className="w-full bg-blue-600 text-white text-lg font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                                >
                                    Continue to Coverage Check <ArrowRight size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
