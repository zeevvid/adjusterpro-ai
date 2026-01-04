import React from 'react';
import { Upload, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { PublicIntakeData } from '../../types';

interface StepProps {
    data: PublicIntakeData;
    updateData: (updates: Partial<PublicIntakeData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export const StepPolicy: React.FC<StepProps> = ({ data, updateData, onNext, onBack }) => {
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            updateData({ hasPolicy: true, policyFile: e.target.files[0] });
            // In a real app we would upload and parse here
            // For now, assume instant success and move next
            setTimeout(onNext, 1000);
        }
    };

    return (
        <div className="max-w-2xl mx-auto w-full md:mt-8 px-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Want to check if you're covered?</h2>
                <p className="text-slate-500 max-w-lg mx-auto">Upload just the first page of your policy (Declarations Page). Our AI only checks coverage types — nothing else.</p>
            </div>

            <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-8">
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:bg-slate-50 hover:border-blue-400 transition-all group cursor-pointer relative">
                        <input
                            type="file"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept=".pdf,.jpg,.png"
                        />
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Upload size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Upload Declarations Page</h3>
                        <p className="text-slate-400 text-sm">PDF or Photo accepted</p>
                    </div>
                </div>

                <div className="px-8 pb-8">
                    <div className="bg-slate-50 p-4 rounded-xl flex items-start gap-3 mb-8">
                        <ShieldCheck className="text-green-600 shrink-0 mt-1" size={20} />
                        <p className="text-xs text-slate-500 leading-relaxed">
                            <strong>Safe & Secure:</strong> This document is only used to verify your deductible and coverage limits (Coverage A, B, C). It is not shared with your insurer.
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            updateData({ hasPolicy: false });
                            onNext();
                        }}
                        className="w-full text-slate-500 font-bold py-4 hover:bg-slate-50 rounded-2xl transition-colors"
                    >
                        Skip for now
                    </button>

                    <button onClick={onBack} className="w-full text-slate-400 font-bold text-sm mt-2 hover:text-slate-600">Go Back</button>
                </div>
            </div>
        </div>
    );
};
