
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Dashboard } from './modules/Dashboard';
import { ClaimWizard } from './components/ClaimWizard';
import { WeatherRadar } from './modules/WeatherRadar';
import { EducationHub } from './modules/EducationHub';
import { Directory } from './modules/Directory';
import { Operations } from './modules/Operations';
import { GPSTracker } from './modules/GPSTracker';
import { MarketingHub } from './modules/MarketingHub';
import { StormHistory } from './modules/StormHistory';
import { ClientManagement } from './modules/ClientManagement';
import { ChatWidget } from './components/ChatWidget';
import { AppView, UserRole } from './types';
import { ClipboardList, FolderLock, ShieldCheck, Calculator, Search, Plus, Filter, Download, Save, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);

  // Auto-redirect if role changes
  useEffect(() => {
    setActiveView(AppView.DASHBOARD);
  }, [userRole]);

  const handleLogout = () => {
    setUserRole(null);
  };

  if (!userRole) {
    return <Login onLogin={setUserRole} />;
  }

  const renderView = () => {
    switch (activeView) {
      case AppView.DASHBOARD:
        return <Dashboard role={userRole} />;
      case AppView.FILE_CLAIM:
        return (
          <div className="animate-in fade-in duration-500">
            <div className="max-w-4xl mx-auto mb-8 text-center">
              <h2 className="text-4xl font-black text-slate-900 mb-2">Start Your Claim</h2>
              <p className="text-slate-500 text-lg">Our experts will handle the carriers. Start by documenting the damage below.</p>
            </div>
            <ClaimWizard />
          </div>
        );
      case AppView.WEATHER_RADAR:
        return <WeatherRadar />;
      case AppView.EDUCATION:
        return <EducationHub role={userRole} />;
      case AppView.DIRECTORY:
        return <Directory />;
      case AppView.OPERATIONS:
        return userRole === UserRole.ADJUSTER ? <Operations /> : <Dashboard role={userRole} />;
      case AppView.GPS_TRACKER:
        return userRole === UserRole.ADJUSTER ? <GPSTracker /> : <Dashboard role={userRole} />;
      case AppView.MARKETING:
        return userRole === UserRole.ADJUSTER ? <MarketingHub /> : <Dashboard role={userRole} />;
      case AppView.STORM_HISTORY:
        return <StormHistory />;
      case AppView.XACTIMATE:
        return userRole === UserRole.ADJUSTER ? (
          <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm animate-in fade-in duration-500">
            <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Calculator className="text-blue-600" size={24} />
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">Xactimate Engine</h3>
                </div>
                <p className="text-slate-500 text-sm">Professional line-item estimating for Claim #AP-2024-884</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2 text-sm">
                  <Download size={16} /> Export ESX
                </button>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 text-sm">
                  <Save size={16} /> Save Estimate
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-100 border-b border-slate-200 flex flex-wrap gap-2">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input placeholder="Search Price List (e.g. RFG 300)" className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
              </div>
              <button className="bg-white border border-slate-200 p-2 rounded-lg text-slate-600 hover:bg-slate-50"><Filter size={18} /></button>
              <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"><Plus size={16} /> New Item</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Cat/Sel</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4">Qty</th>
                    <th className="px-6 py-4">Unit</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">RCV</th>
                    <th className="px-6 py-4 text-right">Deprec.</th>
                    <th className="px-6 py-4 text-right">ACV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-xs">
                  <tr className="bg-blue-50/30">
                    <td colSpan={8} className="px-6 py-2 font-black text-blue-900 uppercase tracking-widest bg-blue-50">Roofing - Main Structure</td>
                  </tr>
                  <EstimateRow cat="RFG" sel="300" desc="Remove 3 tab - 20 yr - composition shingle" qty="24.00" unit="SQ" price="54.20" rcv="1,300.80" dep="-$240.10" acv="1,060.70" />
                  <EstimateRow cat="RFG" sel="300+" desc="3 tab - 20 yr - comp. shingle - w/ felt" qty="24.00" unit="SQ" price="212.45" rcv="5,098.80" dep="-$0.00" acv="5,098.80" />
                  <EstimateRow cat="RFG" sel="RIDGC" desc="Ridge cap - composition shingles" qty="120.00" unit="LF" price="3.12" rcv="374.40" dep="-$45.00" acv="329.40" />

                  <tr className="bg-slate-50/50">
                    <td colSpan={8} className="px-6 py-2 font-black text-slate-700 uppercase tracking-widest bg-slate-100">Interior - Living Room</td>
                  </tr>
                  <EstimateRow cat="PNT" sel="P" desc="Paint the walls - two coats" qty="450.00" unit="SF" price="0.84" rcv="378.00" dep="-$32.00" acv="346.00" />
                  <EstimateRow cat="DRY" sel="1/2" desc='1/2" drywall - hung, taped, ready for texture' qty="32.00" unit="SF" price="2.45" rcv="78.40" dep="-$10.00" acv="68.40" />
                </tbody>
              </table>
            </div>

            <div className="p-8 bg-slate-900 text-white flex justify-end gap-12">
              <SummaryItem label="Net Claim" value="$7,230.40" />
              <SummaryItem label="Sales Tax" value="$512.12" />
              <SummaryItem label="Total RCV" value="$7,742.52" highlight />
            </div>
          </div>
        ) : <Dashboard role={userRole} />;
      case AppView.CLIENT_MANAGEMENT:
        return userRole === UserRole.ADJUSTER ? <ClientManagement /> : <Dashboard role={userRole} />;
      case AppView.CLIENT_PORTAL:
        return (
          <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
            <div className="bg-slate-900 text-white p-16 rounded-[60px] shadow-2xl relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-10 -ml-32 -mb-32"></div>
              <div className="relative z-10 space-y-8">
                <div className="mx-auto w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-blue-400">
                  <FolderLockIcon size={40} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-5xl font-black tracking-tight">Your Claims Vault</h3>
                  <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">Secure, encrypted storage for every document, photo, and authorization related to your property recovery.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="bg-blue-600 text-white px-10 py-4 rounded-[20px] font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">Add Document</button>
                  <button className="bg-white/10 text-white px-10 py-4 rounded-[20px] font-bold hover:bg-white/20 transition-all border border-white/5">Download Archive</button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              <VaultCard title="Policy Files" count={2} detail="Last updated 2 days ago" />
              <VaultCard title="Evidence Photos" count={42} detail="High-resolution damage proof" />
              <VaultCard title="Contracts" count={1} detail="E-Signed on Oct 10th" />
            </div>
          </div>
        );
      default:
        return <Dashboard role={userRole} />;
    }
  };

  return (
    <>
      <Layout
        activeView={activeView}
        setView={setActiveView}
        userRole={userRole}
        onLogout={handleLogout}
      >
        {renderView()}
      </Layout>
      <ChatWidget />
    </>
  );
};

const EstimateRow: React.FC<any> = ({ cat, sel, desc, qty, unit, price, rcv, dep, acv }) => (
  <tr className="hover:bg-slate-50 transition-colors">
    <td className="px-6 py-3 font-bold text-slate-900">{cat} {sel}</td>
    <td className="px-6 py-3 text-slate-600 truncate max-w-xs">{desc}</td>
    <td className="px-6 py-3 text-slate-800">{qty}</td>
    <td className="px-6 py-3 text-slate-500">{unit}</td>
    <td className="px-6 py-3 text-slate-800">{price}</td>
    <td className="px-6 py-3 font-bold text-slate-900">{rcv}</td>
    <td className="px-6 py-3 text-red-500 text-right">{dep}</td>
    <td className="px-6 py-3 font-black text-blue-600 text-right">{acv}</td>
  </tr>
);

const SummaryItem: React.FC<any> = ({ label, value, highlight }) => (
  <div className="text-right">
    <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${highlight ? 'text-blue-400' : 'text-slate-500'}`}>{label}</p>
    <p className={`text-2xl font-black ${highlight ? 'text-white' : 'text-slate-300'}`}>{value}</p>
  </div>
);

const VaultCard: React.FC<{ title: string, count: number, detail: string }> = ({ title, count, detail }) => (
  <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group cursor-pointer text-center">
    <div className="mx-auto p-5 bg-slate-50 text-slate-400 rounded-3xl mb-8 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all inline-block">
      <FolderLockIcon size={40} />
    </div>
    <h4 className="text-2xl font-black text-slate-900 mb-2">{title}</h4>
    <div className="space-y-1">
      <p className="text-blue-600 text-sm font-black uppercase tracking-widest">{count} Files Stored</p>
      <p className="text-slate-400 text-xs font-medium">{detail}</p>
    </div>
  </div>
);

const FolderLockIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" /><rect x="12" y="11" width="8" height="5" rx="1" /><path d="M16 11V9a2 2 0 1 0-4 0v2" />
  </svg>
);

export default App;
