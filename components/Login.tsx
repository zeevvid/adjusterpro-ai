
import React from 'react';
import { UserRole } from '../types';
import { Shield, User, Briefcase, ChevronRight, CheckCircle, Home, FileText, Zap, Sparkles, PhoneCall } from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="py-6 px-8 flex justify-between items-center bg-white border-b border-slate-100 z-20">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Shield size={24} />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">AdjusterPro<span className="text-blue-600">AI</span></span>
        </div>
        <button 
          onClick={() => onLogin(UserRole.ADJUSTER)}
          className="text-slate-500 hover:text-blue-600 text-sm font-semibold transition-all flex items-center gap-1 group"
        >
          <Briefcase size={16} className="group-hover:rotate-12 transition-transform" /> Staff Portal
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row items-center px-8 py-12 md:py-24 max-w-7xl mx-auto z-10 gap-16">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold gap-2 animate-bounce-subtle">
            <Sparkles size={16} className="text-blue-500" /> $1.2B Recovered for Homeowners
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight">
            Don't Settle for <span className="relative inline-block">
              <span className="relative z-10 text-blue-600">Less.</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-blue-100 -z-10"></span>
            </span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
            Most insurance companies underpay claims by 35%. We use proprietary AI to find every cent of damage and fight for your maximum settlement. 
            <span className="block mt-2 font-bold text-slate-900">Zero upfront costs. We only get paid when you do.</span>
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 text-slate-700 font-medium">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="text-green-500" size={14} />
              </div>
              Free Policy Analysis
            </div>
            <div className="flex items-center gap-3 text-slate-700 font-medium">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="text-green-500" size={14} />
              </div>
              No-Win, No-Fee Guarantee
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button 
              onClick={() => onLogin(UserRole.CLIENT)}
              className="group relative bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all flex items-center gap-3 active:scale-95 shadow-2xl shadow-blue-500/40 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span>Start My Claim</span> 
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex flex-col">
              <button className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors text-lg">
                <PhoneCall size={20} /> Schedule Free Call
              </button>
              <p className="text-slate-400 text-xs font-medium ml-7">Speak with an expert in 5 mins</p>
            </div>
          </div>
        </div>

        {/* Visual Element */}
        <div className="flex-1 w-full max-w-md hidden lg:block relative">
          <div className="absolute -inset-4 bg-blue-100 rounded-[40px] rotate-3 -z-10 opacity-50"></div>
          <div className="bg-slate-900 p-10 rounded-[40px] shadow-2xl space-y-8 border-4 border-white relative">
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-3xl shadow-xl border border-slate-100 animate-float">
               <div className="flex items-center gap-3">
                  <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>
                  <span className="text-sm font-black text-slate-800">New Settlement: +$14k</span>
               </div>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white">
                 <Home size={24} />
               </div>
               <div>
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Client Transparency</p>
                 <p className="text-white font-bold">Real-time Recovery Tracking</p>
               </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                <span>Negotiation Progress</span>
                <span className="text-blue-400">85% Complete</span>
              </div>
              <div className="h-4 bg-white/5 rounded-full w-full overflow-hidden p-1">
                <div className="h-full bg-blue-500 w-5/6 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl space-y-2 border border-white/5">
               <div className="flex justify-between items-center">
                 <span className="text-slate-300 text-sm">Initial Carrier Offer</span>
                 <span className="text-red-400 line-through text-xs">$8,400</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-slate-300 text-sm font-bold">AdjusterPro Final</span>
                 <span className="text-green-400 font-black text-lg">$34,200.00</span>
               </div>
            </div>
            <div className="flex justify-around pt-4 border-t border-white/10">
              <div className="text-center">
                <div className="text-white font-bold">24h</div>
                <div className="text-[8px] text-slate-500 uppercase font-black">Response</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold">100%</div>
                <div className="text-[8px] text-slate-500 uppercase font-black">Encrypted</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold">AI</div>
                <div className="text-[8px] text-slate-500 uppercase font-black">Verified</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Style for custom animations */}
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
      `}</style>

      {/* Background decoration */}
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
