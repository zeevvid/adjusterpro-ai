import React, { useState } from 'react';
import { Check, ChevronRight, ChevronLeft, Save, Upload, Plus, Camera, AlertCircle, CheckCircle2 } from 'lucide-react';
import { saveIntake, IntakeData } from '../services/db';

const STEPS = [
    'Client & Basics',
    'Affected Areas',
    'Repairs & Mitigation',
    'Contents & Loss',
    'Notes & Photos',
    'Review'
];

const INITIAL_DATA: IntakeData = {
    clientName: '',
    intakeDate: new Date().toISOString().split('T')[0],
    propertyAddress: '',
    repName: 'Current Adjuster',
    primaryPhone: '',
    secondaryPhone: '',
    email: '',
    altEmail: '',
    dateOfLoss: '',
    lossType: 'Storm',
    insuranceCo: '',
    policyNumber: '',
    claimNumber: '',
    priorClaim: false,
    priorClaimDetails: '',
    interiorAreas: [],
    exteriorAreas: [],
    interiorNotes: '',
    repairsMade: false,
    repairsDetails: '',
    mitigationUsed: false,
    mitigationCompany: '',
    receiptsAvailable: false,
    emergencyServices: false,
    contentsDamaged: false,
    highValueItems: false,
    tempRelocation: false,
    lossOfUse: false,
    generalNotes: '',
    internalNotes: '',
    photosTaken: true,
    noPhotosReason: ''
};

export const IntakeWizard: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState<IntakeData>(INITIAL_DATA);
    const [saving, setSaving] = useState(false);

    const updateData = (field: keyof IntakeData, value: any) => {
        setData(prev => ({ ...prev, [field]: value }));
        // Simulate autosave per field interaction
        setSaving(true);
        setTimeout(() => setSaving(false), 800);
    };

    const handleSaveIntake = async () => {
        setSaving(true);
        try {
            await saveIntake(data);
            alert('Intake Saved Successfully!');
        } catch (error) {
            console.error(error);
            alert('Error saving intake.');
        } finally {
            setSaving(false);
        }
    };

    const toggleArea = (type: 'interior' | 'exterior', area: string) => {
        const list = type === 'interior' ? data.interiorAreas : data.exteriorAreas;
        const newList = list.includes(area) ? list.filter(a => a !== area) : [...list, area];
        updateData(type === 'interior' ? 'interiorAreas' : 'exteriorAreas', newList);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0: // Client & Basics
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4">Contact Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input className="input-field" placeholder="Client Name" value={data.clientName} onChange={e => updateData('clientName', e.target.value)} />
                                <input className="input-field" placeholder="Property Address" value={data.propertyAddress} onChange={e => updateData('propertyAddress', e.target.value)} />
                                <input className="input-field" placeholder="Primary Phone" value={data.primaryPhone} onChange={e => updateData('primaryPhone', e.target.value)} />
                                <input className="input-field" placeholder="Email Address" value={data.email} onChange={e => updateData('email', e.target.value)} />
                            </div>
                            <div className="mt-4 flex gap-4">
                                <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100" onClick={() => updateData('secondaryPhone', data.primaryPhone)}>Same as Primary Phone</button>
                                <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100" onClick={() => updateData('altEmail', data.email)}>Same as Primary Email</button>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4">Claim Basics</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">Loss Type</label>
                                    <select className="input-field" value={data.lossType} onChange={e => updateData('lossType', e.target.value)}>
                                        {['Storm', 'Fire', 'Water', 'Mold', 'Theft', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 mb-1 block">Date of Loss</label>
                                    <input type="date" className="input-field" value={data.dateOfLoss} onChange={e => updateData('dateOfLoss', e.target.value)} />
                                </div>
                                <input className="input-field" placeholder="Insurance Company" value={data.insuranceCo} onChange={e => updateData('insuranceCo', e.target.value)} />
                                <input className="input-field" placeholder="Policy Number" value={data.policyNumber} onChange={e => updateData('policyNumber', e.target.value)} />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-yellow-800">
                            <AlertCircle size={20} />
                            <div className="flex-1">
                                <label className="font-bold text-sm cursor-pointer flex items-center gap-2">
                                    <input type="checkbox" className="w-4 h-4" checked={data.priorClaim} onChange={e => updateData('priorClaim', e.target.checked)} />
                                    Prior Overlapping Claim?
                                </label>
                            </div>
                        </div>
                        {data.priorClaim && (
                            <textarea className="input-field w-full h-24" placeholder="Explain details of prior claim..." value={data.priorClaimDetails} onChange={e => updateData('priorClaimDetails', e.target.value)} />
                        )}
                    </div>
                );

            case 1: // Affected Areas
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="font-black text-slate-800">Interior Areas</h4>
                                <div className="flex gap-2">
                                    <button className="preset-btn" onClick={() => updateData('interiorAreas', ['Kitchen', 'Living Room', 'Dining Room', 'Hallway'])}>Commons Preset</button>
                                    <button className="preset-btn" onClick={() => updateData('interiorAreas', ['Whole House'])}>Whole House</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {['Living Room', 'Kitchen', 'Bedroom(s)', 'Bathroom(s)', 'Dining Room', 'Hallway', 'Laundry', 'Garage'].map(area => (
                                    <button
                                        key={area}
                                        onClick={() => toggleArea('interior', area)}
                                        className={`p-4 rounded-xl text-sm font-bold border transition-all ${data.interiorAreas.includes(area) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-400'}`}
                                    >
                                        {area}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 pt-8 border-t border-slate-100">
                            <h4 className="font-black text-slate-800">Exterior Areas</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {['Roof', 'Fence', 'Driveway', 'Patio/Deck', 'Pool', 'Shed', 'Siding'].map(area => (
                                    <button
                                        key={area}
                                        onClick={() => toggleArea('exterior', area)}
                                        className={`p-4 rounded-xl text-sm font-bold border transition-all ${data.exteriorAreas.includes(area) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-500 hover:border-blue-400'}`}
                                    >
                                        {area}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 2: // Mitigation
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <ToggleSection
                            label="Any Repairs Made?"
                            checked={data.repairsMade}
                            onChange={v => updateData('repairsMade', v)}
                            subcontent={
                                <textarea className="input-field w-full h-24 mt-2" placeholder="Describe repairs made..." value={data.repairsDetails} onChange={e => updateData('repairsDetails', e.target.value)} />
                            }
                        />
                        <ToggleSection
                            label="Mitigation Company Used?"
                            checked={data.mitigationUsed}
                            onChange={v => updateData('mitigationUsed', v)}
                            subcontent={
                                <div className="mt-2 space-y-3">
                                    <input className="input-field" placeholder="Company Name" value={data.mitigationCompany} onChange={e => updateData('mitigationCompany', e.target.value)} />
                                    <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={data.receiptsAvailable} onChange={e => updateData('receiptsAvailable', e.target.checked)} /> Receipts Available?</label>
                                </div>
                            }
                        />
                    </div>
                );

            case 3: // Contents
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <BigToggle label="Contents Damaged?" checked={data.contentsDamaged} onChange={v => updateData('contentsDamaged', v)} />
                            <BigToggle label="High Value Items?" checked={data.highValueItems} onChange={v => updateData('highValueItems', v)} />
                            <BigToggle label="Temporary Relocation?" checked={data.tempRelocation} onChange={v => updateData('tempRelocation', v)} />
                            <BigToggle label="Loss of Use Incurred?" checked={data.lossOfUse} onChange={v => updateData('lossOfUse', v)} />
                        </div>
                    </div>
                );

            case 4: // Notes & Photos
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <div>
                            <label className="font-black text-slate-700 block mb-2">General Notes</label>
                            <textarea className="input-field w-full h-32" placeholder="Enter general claim notes..." value={data.generalNotes} onChange={e => updateData('generalNotes', e.target.value)} />
                        </div>
                        <div>
                            <label className="font-black text-red-700 block mb-2">Internal / Red Flags</label>
                            <textarea className="input-field w-full h-24 bg-red-50 border-red-100 focus:ring-red-200" placeholder="Confidential Adjuster Notes..." value={data.internalNotes} onChange={e => updateData('internalNotes', e.target.value)} />
                        </div>

                        <div className="p-6 bg-slate-100 rounded-2xl flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-slate-800">Photos Taken?</h4>
                                <p className="text-xs text-slate-500">Photos are required to generate the estimate.</p>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => updateData('photosTaken', true)} className={`px-4 py-2 rounded-lg font-bold border transition-colors ${data.photosTaken ? 'bg-green-600 text-white border-green-600' : 'bg-white border-slate-300'}`}>Yes</button>
                                <button onClick={() => updateData('photosTaken', false)} className={`px-4 py-2 rounded-lg font-bold border transition-colors ${!data.photosTaken ? 'bg-red-600 text-white border-red-600' : 'bg-white border-slate-300'}`}>No</button>
                            </div>
                        </div>
                        {!data.photosTaken && (
                            <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-medium animate-in slide-in-from-top-2">
                                <AlertCircle size={16} className="inline mr-2" />
                                Please explain why photos were not taken. This may delay the claim.
                                <input className="input-field mt-2" placeholder="Reason..." value={data.noPhotosReason} onChange={e => updateData('noPhotosReason', e.target.value)} />
                            </div>
                        )}
                    </div>
                );

            case 5: // Review
                return (
                    <div className="text-center py-12 animate-in fade-in zoom-in-95">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-2">Intake Complete</h3>
                        <p className="text-slate-500 mb-8">All data saved. Ready to generate documents.</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={onCancel} className="px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-colors">Return to Dashboard</button>
                            <button onClick={handleSaveIntake} className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors shadow-xl shadow-indigo-500/20 flex items-center gap-2">
                                Save Intake <Check size={20} />
                            </button>
                        </div>
                    </div>
                );

        }
    };



    return (
        <div className="bg-white rounded-[40px] shadow-xl border border-slate-200 overflow-hidden flex flex-col min-h-[600px]">
            {/* Header */}
            <div className="bg-slate-900 text-white p-8 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black tracking-tight">New Claim Intake</h2>
                    <p className="text-slate-400 text-sm">Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep]}</p>
                </div>
                <div className="flex items-center gap-2">
                    {saving ? <span className="text-xs text-slate-400 animate-pulse flex items-center gap-1"><Save size={12} /> Saving...</span> : <span className="text-xs text-green-400 flex items-center gap-1"><Check size={12} /> Saved</span>}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-slate-100 w-full">
                <div className="h-full bg-indigo-500 transition-all duration-500 ease-out" style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}></div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 overflow-y-auto max-h-[600px]">
                {renderStepContent()}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                <button
                    onClick={() => currentStep === 0 ? onCancel() : setCurrentStep(c => c - 1)}
                    className="text-slate-500 font-bold px-6 py-3 rounded-xl hover:bg-white hover:shadow-sm transition-all"
                >
                    {currentStep === 0 ? 'Cancel' : 'Back'}
                </button>

                {currentStep < 5 && (
                    <button
                        onClick={() => setCurrentStep(c => c + 1)}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                    >
                        Next Step <ChevronRight size={18} />
                    </button>
                )}
            </div>

            <style>{`
        .input-field {
            width: 100%;
            padding: 12px 16px;
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            font-size: 0.875rem;
            outline: none;
            transition: all 0.2s;
        }
        .input-field:focus {
            background-color: white;
            border-color: #6366f1;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }
        .preset-btn {
            font-size: 0.75rem;
            font-weight: 700;
            color: #4f46e5;
            background-color: #eef2ff;
            padding: 6px 12px;
            border-radius: 8px;
            transition: background-color 0.2s;
        }
        .preset-btn:hover {
            background-color: #e0e7ff;
        }
      `}</style>
        </div>
    );
};

// Helper Components
const ToggleSection = ({ label, checked, onChange, subcontent }: any) => (
    <div className={`p-6 rounded-2xl border transition-all ${checked ? 'bg-white border-indigo-200 shadow-sm' : 'bg-slate-50 border-slate-200'}`}>
        <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-800">{label}</h4>
            <button
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${checked ? 'bg-indigo-600' : 'bg-slate-300'}`}
            >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
        {checked && subcontent}
    </div>
);

const BigToggle = ({ label, checked, onChange }: any) => (
    <button
        onClick={() => onChange(!checked)}
        className={`w-full p-6 rounded-2xl border text-left flex justify-between items-center transition-all ${checked ? 'bg-indigo-50 border-indigo-500 text-indigo-900' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
    >
        <span className="font-bold">{label}</span>
        <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${checked ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300'}`}>
            {checked && <Check size={14} className="text-white" />}
        </div>
    </button>
);


