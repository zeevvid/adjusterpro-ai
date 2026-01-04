import React from 'react';
import { ArrowRight, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import { PublicIntakeData } from '../../types';

interface StepProps {
    data: PublicIntakeData;
    updateData: (updates: Partial<PublicIntakeData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export const StepEstimate: React.FC<StepProps> = ({ data, onNext, onBack }) => {
    return (
        <div className="max-w-2xl mx-auto w-full md:mt-4 px-6 mb-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Your Estimated Claim Range</h2>
                <p className="text-slate-500">Based on recent {data.damageType || 'storm'} claims in {data.address ? 'your area' : 'similar areas'}.</p>
            </div>

            <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">

                {/* Insurance Estimate Card */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-1">Estimated Insurance Payout</h4>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-slate-900">$28,000</span>
                                <span className="text-slate-400 font-medium">-</span>
                                <span className="text-4xl font-black text-slate-900">$54,000</span>
                            </div>
                        </div>
                        <div className="bg-slate-100 p-3 rounded-full">
                            <DollarSign className="text-slate-400" size={24} />
                        </div>
                    </div>
                </div>

                {/* Warning Card */}
                <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200 flex gap-4 items-start">
                    <AlertTriangle className="text-yellow-600 shrink-0 mt-1" size={24} />
                    <div>
                        <h4 className="font-bold text-yellow-900 text-lg mb-1">Important Reality Check</h4>
                        <p className="text-yellow-800 leading-relaxed">Most homeowners who work directly with insurance receive <span className="font-black bg-yellow-200 px-1 rounded">30-50% less</span> than the full value due to hidden policy exclusions and under-scoped repairs.</p>
                    </div>
                </div>

                {/* Public Adjuster Uplift Card */}
                <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-white transform hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-30 -mr-20 -mt-20"></div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="text-green-400" size={20} />
                                <h4 className="text-blue-200 font-bold uppercase tracking-widest text-xs">Potential Recovered Value</h4>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-white">+$12,000</span>
                                <span className="text-slate-500 font-medium">-</span>
                                <span className="text-4xl font-black text-white">$22,000</span>
                            </div>
                            <p className="text-slate-400 text-sm mt-2 font-medium">Additional funds typically secured by a Public Adjuster</p>
                        </div>
                        <div className="bg-blue-600/20 p-4 rounded-full border border-blue-500/30">
                            <TrendingUp className="text-blue-400" size={32} />
                        </div>
                    </div>
                </div>

                <button
                    onClick={onNext}
                    className="w-full bg-blue-600 text-white text-xl font-bold py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                    See My Options <ArrowRight size={24} />
                </button>

                <button onClick={onBack} className="w-full text-slate-400 font-bold text-sm hover:text-slate-600 pt-2">Back to Details</button>
            </div>
        </div>
    );
};
