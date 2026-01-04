
import React from 'react';
import { 
  TrendingUp, FileCheck, Clock, Users, CloudRain, MapPin, 
  AlertTriangle, FileText, CheckCircle2, MessageSquare, 
  ArrowRight, ShieldCheck, Download, Zap, Home, Info, BookOpen, PlusCircle, PhoneForwarded
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UserRole } from '../types';

const data = [
  { month: 'Jan', claims: 40 },
  { month: 'Feb', claims: 30 },
  { month: 'Mar', claims: 65 },
  { month: 'Apr', claims: 45 },
  { month: 'May', claims: 90 },
  { month: 'Jun', claims: 85 },
];

export const Dashboard: React.FC<{ role: UserRole }> = ({ role }) => {
  if (role === UserRole.CLIENT) {
    return <ClientDashboard />;
  }
  return <AdjusterDashboard />;
};

const ClientDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Homeowner Hero Section */}
      <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-10 items-stretch">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-500/20">
              <Home size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900">Welcome, Alice Johnson</h1>
              <p className="text-slate-500 font-medium">Homeowner Portal • Claim #AP-2024-884</p>
            </div>
          </div>
          
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 relative overflow-hidden group">
            <Zap className="absolute -right-4 -bottom-4 w-32 h-32 text-blue-600/5 group-hover:scale-110 transition-transform" />
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Your claim is currently in <span className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4">Phase 3: Field Verification</span>. 
              Our experts are documenting structural damage found during yesterday's inspection.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-md shadow-blue-500/10 active:scale-95">
                Message Adjuster <MessageSquare size={18} />
              </button>
              <button className="bg-white text-slate-700 border border-slate-200 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95">
                Full Claim History
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-96 grid grid-cols-1 gap-4">
          <div className="bg-slate-900 rounded-[32px] p-6 text-white flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Estimated Recovery</span>
              <div className="flex items-center gap-1 text-green-400 text-[10px] font-bold">
                <ShieldCheck size={14} /> AI Verified
              </div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">$24,850.00</div>
              <p className="text-slate-400 text-xs">Based on current Xactimate scoping</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-[10px] font-bold text-blue-400 uppercase">Status</span>
              <span className="text-xs font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">Adjusting</span>
            </div>
          </div>
          <div className="bg-blue-600 rounded-[32px] p-6 text-white flex flex-col justify-center group cursor-pointer hover:bg-blue-700 transition-all">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform">
                 <TrendingUp size={24} />
               </div>
               <div>
                 <p className="text-[10px] font-bold text-blue-100 uppercase tracking-wider">Projected Outcome</p>
                 <p className="font-bold text-sm">Targeting +$12k over carrier initial quote</p>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Quick Action Hub */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button className="flex flex-col items-center justify-center gap-3 p-6 bg-blue-50 border-2 border-blue-100 rounded-[32px] hover:border-blue-400 hover:bg-blue-100 transition-all group active:scale-95">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <PlusCircle size={24} />
          </div>
          <span className="font-bold text-blue-900">Add Damage Photos</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-3 p-6 bg-green-50 border-2 border-green-100 rounded-[32px] hover:border-green-400 hover:bg-green-100 transition-all group active:scale-95">
          <div className="w-12 h-12 bg-green-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
            <Download size={24} />
          </div>
          <span className="font-bold text-green-900">Download My Policy</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-3 p-6 bg-orange-50 border-2 border-orange-100 rounded-[32px] hover:border-orange-400 hover:bg-orange-100 transition-all group active:scale-95">
          <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
            <PhoneForwarded size={24} />
          </div>
          <span className="font-bold text-orange-900">Call My Adjuster</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-3 p-6 bg-slate-900 border-2 border-slate-800 rounded-[32px] hover:border-blue-500 hover:bg-slate-800 transition-all group active:scale-95">
          <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <PlusCircle size={24} />
          </div>
          <span className="font-bold text-white">Report New Loss</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Document Vault Access */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <FileText className="text-blue-500" /> Recent Claim Documents
            </h3>
            <button className="px-4 py-2 bg-slate-50 text-blue-600 rounded-xl text-sm font-bold flex items-center gap-1 hover:bg-blue-50 transition-colors">
              Manage Vault <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               { name: 'Sworn Proof of Loss', date: 'Oct 24, 2024', type: 'Legal' },
               { name: 'Inspection Photos', date: 'Oct 15, 2024', type: 'Evidence' },
               { name: 'Mitigation Receipt', date: 'Oct 12, 2024', type: 'Financial' },
               { name: 'Representation Auth', date: 'Oct 10, 2024', type: 'Admin' }
             ].map((doc, i) => (
               <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all group">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-2xl border border-slate-200 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                      <FileText size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{doc.name}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">{doc.type} • {doc.date}</p>
                    </div>
                 </div>
                 <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all"><Download size={20} /></button>
               </div>
             ))}
          </div>
        </div>

        {/* Education & Safety */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
            <ShieldCheck className="absolute -right-8 -top-8 w-48 h-48 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Info className="text-blue-400" /> Mitigation Tips
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">Your policy requires you to prevent further damage. Here's what to do now:</p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-xs">
                  <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0">1</span>
                  <span>Keep all repair receipts for reimbursement.</span>
                </li>
                <li className="flex gap-3 text-xs">
                  <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0">2</span>
                  <span>Tarp leaky roofs or board broken windows.</span>
                </li>
              </ul>
              <button className="w-full mt-4 py-3 bg-white text-slate-900 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 hover:bg-blue-50 active:scale-95">
                Visit Advice Hub <BookOpen size={16} />
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <CloudRain className="text-blue-500" /> Local Safety Status
            </h3>
            <div className="space-y-4">
              <HazardItem 
                type="Flood Alert" 
                location="Your Neighborhood" 
                time="2h ago" 
                desc="Water levels rising on SW 12th St. Avoid low-lying areas."
                severity="high"
              />
              <HazardItem 
                type="Wind Gusts" 
                location="Miami-Dade" 
                time="4h ago" 
                desc="40mph winds recorded. Check outdoor structures."
                severity="medium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdjusterDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Staff Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Portfolio Value" value="$42.8M" change="+18.2%" icon={<TrendingUp className="text-green-600" />} />
        <StatCard title="Active Claims" value="342" change="+2.4%" icon={<FileCheck className="text-blue-600" />} />
        <StatCard title="Pending Review" value="58" change="-4.1%" icon={<Clock className="text-orange-600" />} />
        <StatCard title="Total Staff" value="24" change="0%" icon={<Users className="text-purple-600" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Claims Processing Trends - Staff Only */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Firm Performance</h3>
              <p className="text-slate-500 text-sm">Monthly claim recovery and submission volume</p>
            </div>
            <select className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 outline-none">
              <option>Last 6 Months</option>
              <option>Full Year</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#2563eb', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="claims" stroke="#2563eb" fillOpacity={1} fill="url(#colorClaims)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Monitoring - Staff Only */}
        <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-black text-slate-800 flex items-center gap-2 tracking-tight">
              <Zap className="text-blue-500" size={20} /> Field Intelligence
            </h3>
            <span className="text-[10px] bg-red-100 text-red-600 px-3 py-1 rounded-full font-black uppercase tracking-widest">Active Storm</span>
          </div>
          <div className="p-8 space-y-6 flex-1">
            <HazardItem 
              type="Storm Surge" 
              location="Palm Beach, FL" 
              time="15m ago" 
              desc="Significant surge recorded. 45 clients in direct impact path. Auto-notifying now."
              severity="high"
            />
            <HazardItem 
              type="Hail Track" 
              location="Coral Springs" 
              time="1h ago" 
              desc="Large hail cell moved through ZIP 33065. Potential for 200+ roof claims."
              severity="medium"
            />
            <HazardItem 
              type="Network Alert" 
              location="Field Ops" 
              time="3h ago" 
              desc="3 adjusters currently in surge zones. Mitigation vendors mobilized."
              severity="medium"
            />
          </div>
          <button className="w-full py-6 text-blue-600 font-bold hover:bg-slate-50 transition-colors border-t border-slate-100 text-sm active:scale-95">
            Launch Operations Map
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{title: string, value: string, change: string, icon: React.ReactNode}> = ({ title, value, change, icon }) => (
  <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all group">
    <div className="flex items-center justify-between mb-6">
      <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">{icon}</div>
      <span className="text-green-500 text-xs font-black bg-green-50 px-3 py-1 rounded-full">{change}</span>
    </div>
    <h4 className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{title}</h4>
    <p className="text-3xl font-black text-slate-900">{value}</p>
  </div>
);

const HazardItem: React.FC<{type: string, location: string, time: string, desc: string, severity: 'high' | 'medium'}> = ({ type, location, time, desc, severity }) => (
  <div className="group border-l-4 border-slate-100 pl-5 py-2 hover:border-blue-400 transition-colors cursor-default">
    <div className="flex justify-between items-start mb-1">
      <h5 className={`font-black text-sm uppercase tracking-wider ${severity === 'high' ? 'text-red-600' : 'text-orange-600'}`}>{type}</h5>
      <span className="text-[10px] font-bold text-slate-400">{time}</span>
    </div>
    <p className="text-xs font-black text-slate-700 mb-1">{location}</p>
    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">{desc}</p>
  </div>
);
