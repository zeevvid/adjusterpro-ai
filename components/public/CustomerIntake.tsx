import React, { useState } from 'react';
import { PublicIntakeData } from '../../types';
import { StepDamageChat } from './StepDamageChat';
import { StepAddress } from './StepAddress';
import { StepPolicy } from './StepPolicy';
import { StepEstimate } from './StepEstimate';
import { StepContact } from './StepContact';

interface CustomerIntakeProps {
    onCancel: () => void;
    onComplete: () => void;
}

export const CustomerIntake: React.FC<CustomerIntakeProps> = ({ onCancel, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [data, setData] = useState<PublicIntakeData>({
        damageType: '',
        damageDetails: '',
        lossDate: '',
        address: '',
        hasPolicy: false,
        contactName: '',
        contactPhone: '',
        contactTime: '',
        referralId: sessionStorage.getItem('adjuster_ref_id') || undefined
    });

    const updateData = (updates: Partial<PublicIntakeData>) => {
        setData(prev => ({ ...prev, ...updates }));
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <StepDamageChat data={data} updateData={updateData} onNext={nextStep} />;
            case 1:
                return <StepAddress data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
            case 2:
                return <StepPolicy data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
            case 3:
                return <StepEstimate data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
            case 4:
                return <StepContact data={data} updateData={updateData} onComplete={onComplete} onBack={prevStep} />;
            default:
                return <div>Error: Unknown Step</div>;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header / Progress Bar */}
            <div className="bg-white border-b border-slate-100 p-6 flex flex-col items-center">
                <div className="flex justify-between items-center w-full max-w-2xl mb-4">
                    <button onClick={onCancel} className="text-slate-400 font-bold text-sm hover:text-slate-600">Cancel</button>
                    <div className="text-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">AdjusterPro AI Estimation Tool</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-0.5 rounded border border-slate-100 italic">
                            Not a Public Adjuster • For Educational Use Only
                        </span>
                    </div>
                    <div className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Step {currentStep}/5</div>
                </div>
                <div className="w-full max-w-2xl bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                        className="bg-blue-600 h-full transition-all duration-500 ease-out"
                        style={{ width: `${(currentStep / 5) * 100}%` }}
                    />
                </div>
            </div>

            {/* Step Content */}
            <div className="flex-1 overflow-y-auto py-12 animate-in fade-in slide-in-from-bottom-4 duration-700" key={currentStep}>
                {renderStep()}
            </div>
        </div>
    );
};
