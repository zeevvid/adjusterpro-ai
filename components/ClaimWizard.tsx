
import React, { useState } from 'react';
import { Upload, Camera, FileText, Calendar, Info, CheckCircle, ArrowRight, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';

export const ClaimWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    policy: null,
    dateOfLoss: '',
    description: '',
    photos: [] as string[],
    receipts: [] as string[],
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 6));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    // Mock upload logic
    console.log(`Uploading to ${field}`);
  };

  const steps = [
    { title: 'Policy Info', icon: <FileText /> },
    { title: 'Date of Loss', icon: <Calendar /> },
    { title: 'Damage Details', icon: <Info /> },
    { title: 'Photos', icon: <Camera /> },
    { title: 'Receipts/Mitigation', icon: <Upload /> },
    { title: 'Review & Sign', icon: <CheckCircle /> },
  ];

  const getNextButtonText = () => {
    switch(step) {
      case 1: return "Continue to Date";
      case 2: return "Continue to Details";
      case 3: return "Continue to Photos";
      case 4: return "Continue to Receipts";
      case 5: return "Final Review";
      case 6: return "Secure My Payout";
      default: return "Next";
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[32px] shadow-xl border border-slate-200 overflow-hidden mb-12">
      {/* Progress Bar */}
      <div className="flex bg-slate-50 border-b border-slate-100 p-2">
        {steps.map((s, i) => (
          <div 
            key={i} 
            className={`flex-1 py-3 text-center text-[10px] font-black uppercase tracking-[0.15em] transition-all ${
              step === i + 1 ? 'text-blue-600' : 'text-slate-300'
            }`}
          >
            <div className={`mx-auto w-1 h-1 rounded-full mb-1 transition-all ${step === i + 1 ? 'bg-blue-600 scale-[2]' : 'bg-slate-200'}`}></div>
            <span className="hidden sm:inline">{s.title}</span>
            <span className="sm:hidden">{i + 1}</span>
          </div>
        ))}
      </div>

      <div className="p-10 min-h-[450px]">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <FileText size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-800">Policy Analysis</h3>
                <p className="text-slate-500">We'll find the coverage your carrier won't mention.</p>
              </div>
            </div>
            <div className="border-3 border-dashed border-slate-100 rounded-[32px] p-16 text-center hover:border-blue-400 transition-all cursor-pointer bg-slate-50 group">
              <Upload className="mx-auto text-slate-300 mb-4 group-hover:text-blue-500 group-hover:-translate-y-2 transition-all" size={56} />
              <input type="file" className="hidden" id="policy-upload" onChange={(e) => handleFileUpload(e, 'policy')} />
              <label htmlFor="policy-upload" className="cursor-pointer text-blue-600 font-black text-xl block">Upload Your Full Policy</label>
              <p className="text-sm text-slate-400 mt-2 font-medium">PDF, DOC up to 10MB • Secured with AES-256</p>
            </div>
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl border border-green-100">
               <ShieldCheck className="text-green-600" size={24} />
               <p className="text-sm text-green-800 font-medium italic">Our AI policy auditor finds an average of 12% additional coverage per file.</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-3xl font-black text-slate-800">Event Timeline</h3>
            <p className="text-slate-500">When exactly did the property loss occur? This is critical for statutory deadlines.</p>
            <div className="max-w-sm">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Date of Loss</label>
              <input 
                type="date" 
                className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-lg font-bold"
                value={formData.dateOfLoss}
                onChange={(e) => setFormData({...formData, dateOfLoss: e.target.value})}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-3xl font-black text-slate-800">Damage Assessment</h3>
            <p className="text-slate-500">Describe what happened in your own words. Our AI will help structure this for the carrier.</p>
            <textarea 
              rows={8}
              className="w-full p-6 rounded-[24px] border-2 border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-lg font-medium"
              placeholder="Example: Heavy rain on Tuesday led to a ceiling leak in the master bedroom. Water is currently dripping through the light fixture..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-3xl font-black text-slate-800">Evidence Vault</h3>
            <p className="text-slate-500">Clear photos are the bedrock of a successful settlement. Capture multiple angles.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="aspect-square border-3 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-slate-300 hover:text-blue-500 hover:border-blue-400 cursor-pointer transition-all bg-slate-50">
                <Camera size={40} />
                <span className="text-xs font-black mt-2 uppercase tracking-widest">Add Evidence</span>
              </div>
              {[1,2,3].map(i => (
                <div key={i} className="aspect-square bg-slate-100 rounded-3xl overflow-hidden group relative">
                  <img src={`https://picsum.photos/seed/damage${i}/300`} className="w-full h-full object-cover" alt="Damage" />
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-all"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-3xl font-black text-slate-800">Mitigation & Receipts</h3>
            <p className="text-slate-500">Proof of emergency measures (tarping, drying, etc.) is legally required for reimbursement.</p>
            <div className="bg-blue-50 p-6 rounded-3xl flex gap-4 border border-blue-100 mb-6">
              <div className="p-2 bg-blue-600 rounded-xl text-white h-fit">
                <Zap size={20} />
              </div>
              <p className="text-sm text-blue-800 font-medium leading-relaxed">
                <span className="font-black">Pro Tip:</span> Insurers often reject mitigation costs if not documented correctly. Upload your invoices now so we can audit them.
              </p>
            </div>
            <div className="p-8 border-2 border-slate-100 rounded-3xl bg-slate-50 text-center">
              <input type="file" multiple className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-sm file:font-black file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer" />
              <p className="mt-4 text-xs font-bold text-slate-400">Drag files here to bulk upload</p>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-3xl font-black text-slate-800">Review & Legal Auth</h3>
            <div className="space-y-6">
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-[24px]">
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Letter of Representation</p>
                <div className="font-mono text-xs leading-relaxed h-32 overflow-y-auto bg-white p-6 border rounded-2xl text-slate-600">
                  I, the undersigned, hereby authorize AdjusterPro to represent my interests in the property loss claim dated {formData.dateOfLoss || '[DATE]'}. I understand that AdjusterPro works on a contingency basis...
                  [Full legal disclosure text for public adjusting contracts]
                </div>
              </div>
              <div className="bg-slate-900 border-4 border-slate-800 rounded-[32px] p-10 text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
                <p className="text-slate-400 mb-6 text-sm font-bold tracking-widest uppercase">Sign Your Authorization Here</p>
                <div className="h-32 w-full border-b-2 border-slate-700 mx-auto max-w-md group-hover:border-blue-500 transition-colors"></div>
                <p className="text-slate-600 text-[10px] mt-4">By signing, you agree to our Terms of Representation</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
        <button 
          onClick={prevStep}
          disabled={step === 1}
          className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-sm tracking-widest uppercase transition-all ${
            step === 1 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200'
          }`}
        >
          <ArrowLeft size={18} /> Back
        </button>
        <button 
          onClick={step === 6 ? () => alert('Claim Successfully Filed!') : nextStep}
          className="group flex items-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-[20px] font-black text-sm tracking-widest uppercase hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
        >
          {getNextButtonText()} 
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
