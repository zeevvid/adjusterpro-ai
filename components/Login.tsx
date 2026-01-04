import React, { useState } from 'react';
import { UserRole } from '../types';
import { Shield, User, Briefcase, ChevronRight, CheckCircle, Home, FileText, Zap, Sparkles, PhoneCall, ShieldCheck, ArrowRight, Mail } from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  onCancel?: () => void;
}

enum LoginStep {
  AUTH = 'AUTH',
  ROLE_SELECT = 'ROLE_SELECT'
}

export const Login: React.FC<LoginProps> = ({ onLogin, onCancel }) => {
  const [step, setStep] = useState<LoginStep>(LoginStep.AUTH);

  const handleGoogleSignIn = () => {
    // Mocking successful auth transition
    setStep(LoginStep.ROLE_SELECT);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden font-inter text-slate-900">
      {/* Glossy Background Accents */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[180px] rounded-full animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[150px] rounded-full animate-float" style={{ animationDelay: '-2s' }}></div>
      </div>

      <header className="relative z-50 p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 p-2.5 rounded-2xl text-white shadow-xl shadow-slate-900/10">
            <Shield size={24} />
          </div>
          <span className="font-black text-2xl tracking-tighter text-slate-900 uppercase">AdjusterPro <span className="text-blue-600">AI</span></span>
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-95"
          >
            &larr; Exit
          </button>
        )}
      </header>

      <main className="relative z-10 flex-1 flex flex-col justify-center items-center px-8 pb-32">
        <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">

          {step === LoginStep.AUTH ? (
            <div className="text-center space-y-12">
              <div className="space-y-4">
                <h1 className="text-5xl font-black text-slate-900 tracking-tightest leading-tight">Secure <span className="text-blue-600">Access.</span></h1>
                <p className="text-slate-500 font-medium text-lg">Sign in to your AdjusterPro AI workspace.</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-4 bg-white border border-slate-200 p-5 rounded-[24px] hover:border-blue-300 hover:shadow-2xl transition-all group active:scale-95"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span className="font-black text-slate-800 tracking-tight">Continue with Google</span>
                </button>

                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-4 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">or use email</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <div className="bg-slate-100/50 p-2 rounded-[28px] border border-slate-200 focus-within:border-blue-400 transition-colors flex items-center gap-3">
                  <div className="bg-white p-3 rounded-2xl shadow-sm text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="Work Email"
                    className="bg-transparent border-none outline-none flex-1 text-sm font-bold placeholder:text-slate-400"
                  />
                  <button className="bg-slate-900 text-white p-3 rounded-2xl hover:bg-blue-600 transition-all active:scale-95">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-12 animate-in slide-in-from-right-8 duration-500">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto animate-bounce-subtle">
                  <Shield size={32} />
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tightest leading-tight">One last <span className="text-blue-600">Step.</span></h1>
                <p className="text-slate-500 font-medium text-lg">Which describes you best?</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => onLogin(UserRole.CLIENT)}
                  className="group flex items-center justify-between bg-white border border-slate-200 p-8 rounded-[32px] hover:border-blue-500 hover:shadow-2xl transition-all text-left active:scale-[0.98]"
                >
                  <div className="flex items-center gap-6">
                    <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Home size={28} />
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-slate-800 leading-none mb-1">I'm a Homeowner</h3>
                      <p className="text-slate-400 text-xs font-bold font-medium">Tracking my active claim.</p>
                    </div>
                  </div>
                  <ChevronRight size={24} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                </button>

                <button
                  onClick={() => onLogin(UserRole.ADJUSTER)}
                  className="group flex items-center justify-between bg-white border border-slate-200 p-8 rounded-[32px] hover:border-blue-500 hover:shadow-2xl transition-all text-left active:scale-[0.98]"
                >
                  <div className="flex items-center gap-6">
                    <div className="bg-slate-100 text-slate-900 p-4 rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-all">
                      <Briefcase size={28} />
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-slate-800 leading-none mb-1">I'm a Professional</h3>
                      <p className="text-slate-400 text-xs font-bold font-medium">Adjuster or Carrier access.</p>
                    </div>
                  </div>
                  <ChevronRight size={24} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                </button>
              </div>

              <button
                onClick={() => setStep(LoginStep.AUTH)}
                className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                &larr; Back to sign in
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Trust Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/50 backdrop-blur-md border-t border-slate-100 py-6 px-12 hidden md:block z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center grayscale opacity-50">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enterprise Encrypted</span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SOC2 TYPE II COMPLIANT</span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GDPR PROTECTED DATA</span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">REAL-TIME BI-DIRECTIONAL SYNC</span>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 3s ease-in-out infinite; }
        .tracking-tightest { letter-spacing: -0.05em; }
      `}</style>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
};
