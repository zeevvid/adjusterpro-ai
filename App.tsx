
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
import { AdminSaaS } from './modules/AdminSaaS';
import { AdjusterPartnerDashboard } from './modules/AdjusterDashboard';
import { ClientManagement } from './modules/ClientManagement';
import { ChatWidget } from './components/ChatWidget';
import { LandingPage } from './components/public/LandingPage';
import { CustomerIntake } from './components/public/CustomerIntake';
import { XactimateVerify } from './modules/XactimateVerify';
import { AppView, UserRole } from './types';
import { ClipboardList, FolderLock, ShieldCheck, Calculator, Search, Plus, Filter, Download, Save, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [activeView, setActiveView] = useState<AppView>(AppView.LANDING);
  const [showLogin, setShowLogin] = useState(false);

  // Auto-redirect if role changes
  useEffect(() => {
    if (userRole) {
      // If logging in as Pro/Admin, go to their specific dashboard
      if (userRole === UserRole.ADMIN) {
        setActiveView(AppView.SAAS_ADMIN);
      } else {
        setActiveView(AppView.ADJUSTER_DASHBOARD);
      }
      setShowLogin(false);
    }
  }, [userRole]);

  const handleLogout = () => {
    setUserRole(null);
    setActiveView(AppView.DASHBOARD); // Return to public hub
    setShowLogin(false);
  };

  if (showLogin && !userRole) {
    return <Login onLogin={setUserRole} onCancel={() => setShowLogin(false)} />;
  }

  const renderView = () => {
    // Public Views (No Layout)
    if (activeView === AppView.LANDING) {
      return <LandingPage onStart={() => setActiveView(AppView.PUBLIC_INTAKE)} onStaffLogin={() => setShowLogin(true)} />;
    }

    if (activeView === AppView.PUBLIC_INTAKE) {
      return <CustomerIntake onCancel={() => setActiveView(AppView.LANDING)} onComplete={() => setActiveView(AppView.LANDING)} />;
    }

    // Authenticated Views (With Layout)
    const content = () => {
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
          return <EducationHub role={userRole!} />;
        case AppView.SAAS_ADMIN:
          return <AdminSaaS />;
        case AppView.ADJUSTER_DASHBOARD:
          return <AdjusterPartnerDashboard />;
        case AppView.CLIENT_MANAGEMENT:
          return <ClientManagement />;
        case AppView.XACTIMATE_VERIFY:
          return <XactimateVerify />;
        case AppView.XACTIMATE:
          return <div className="p-8"><h1 className="text-2xl font-bold">Xactimate Integration</h1><p>Coming Soon</p></div>;
        case AppView.DIRECTORY:
          return <Directory />;
        case AppView.OPERATIONS:
          return userRole === UserRole.ADJUSTER ? <Operations /> : <Dashboard role={userRole!} />;
        case AppView.GPS_TRACKER:
          return userRole === UserRole.ADJUSTER ? <GPSTracker /> : <Dashboard role={userRole!} />;
        case AppView.MARKETING:
          return userRole === UserRole.ADJUSTER ? <MarketingHub /> : <Dashboard role={userRole!} />;
        case AppView.STORM_HISTORY:
          return <StormHistory />;
        case AppView.CLIENT_MANAGEMENT:
          return <ClientManagement />;
        case AppView.CLIENT_PORTAL:
          return <div className="p-8">Client Portal Placeholder (Restored)</div>;
        case AppView.SUBSCRIPTION:
          return (
            <div className="p-8 max-w-4xl mx-auto">
              <h1 className="text-3xl font-black text-slate-900 mb-6 uppercase tracking-tight">Standard Professional Plan</h1>
              <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-1">Current Tier</p>
                    <p className="text-2xl font-black text-blue-600">Enterprise Pro + AI</p>
                  </div>
                  <div className="bg-green-100 text-green-600 px-4 py-2 rounded-xl font-black text-xs uppercase">Active</div>
                </div>
                <div className="h-px bg-slate-100"></div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-1">Next Billing Date</p>
                    <p className="font-bold text-slate-800">Feb 4, 2026</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-1">Monthly Cost</p>
                    <p className="font-bold text-slate-800">$299.00</p>
                  </div>
                </div>
                <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-600 transition-all active:scale-[0.98]">Manage in Stripe</button>
              </div>
            </div>
          );
        case AppView.REFERRAL:
          return (
            <div className="p-8 max-w-4xl mx-auto">
              <h1 className="text-3xl font-black text-slate-900 mb-6 uppercase tracking-tight">Earn while you help</h1>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[40px] p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <h2 className="text-4xl font-black">Refer a Neighbor, <br />Get $100.</h2>
                  <p className="text-blue-100 font-medium text-lg max-w-md">Share AdjusterPro AI with anyone in need of claim assistance. When they sign up, you both get a bonus.</p>
                  <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/20">
                    <span className="font-black flex-1 truncate">adjusterpro.ai/ref/home_3482</span>
                    <button className="bg-white text-blue-600 px-6 py-2 rounded-xl font-black text-xs uppercase hover:bg-blue-50 transition-all">Copy Link</button>
                  </div>
                </div>
              </div>
            </div>
          );
        default:
          return <Dashboard role={userRole!} />;
      }
    };

    return (
      <Layout
        activeView={activeView}
        setView={setActiveView}
        userRole={userRole}
        onLogout={handleLogout}
        onLoginRequest={() => setShowLogin(true)}
      >
        {content()}
      </Layout>
    );
  };

  return (
    <>
      {renderView()}
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
