
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { AppView, UserRole } from '../types';
import { Shield, Menu, X, Bell, LogOut, AlertCircle, PlusCircle, Briefcase } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setView: (view: AppView) => void;
  userRole: UserRole | null;
  onLogout: () => void;
  onLoginRequest: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, setView, userRole, onLogout, onLoginRequest }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const filteredNav = NAV_ITEMS.filter(item => {
    if (item.isPublic) return true;
    if (userRole && item.roles?.includes(userRole)) return true;
    return false;
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-slate-900 text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield size={24} />
          </div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight">AdjusterPro</span>}
        </div>

        <nav className="flex-1 py-4">
          <div className="px-4 mb-4">
            {isSidebarOpen && (
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">
                {!userRole ? 'Public Access' : userRole === UserRole.ADJUSTER ? 'Pro Workspace' : 'Platform Control'}
              </p>
            )}
          </div>
          {filteredNav.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center p-4 transition-colors ${activeView === item.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {isSidebarOpen && <span className="ml-4 font-bold text-sm">{item.label}</span>}
            </button>
          ))}

          {!userRole && (
            <div className="mt-8 px-4">
              <button
                onClick={onLoginRequest}
                className="w-full bg-blue-600/10 text-blue-400 border border-blue-600/20 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 group"
              >
                <Briefcase size={14} className="group-hover:rotate-12 transition-transform" />
                {isSidebarOpen && "Adjuster Login"}
              </button>
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex justify-center p-2 rounded hover:bg-slate-800 text-slate-400"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black text-slate-900">
              {filteredNav.find(n => n.id === activeView)?.label || 'AdjusterPro AI'}
            </h2>
            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${!userRole ? 'bg-slate-100 text-slate-400' : 'bg-blue-100 text-blue-600'
              }`}>
              {userRole || 'Public Mode'}
            </div>
          </div>
          <div className="flex items-center gap-6">
            {userRole === UserRole.CLIENT && (
              <button
                onClick={() => setView(AppView.FILE_CLAIM)}
                className="hidden md:flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 active:scale-95"
              >
                <AlertCircle size={16} /> File New Claim
              </button>
            )}

            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {userRole && (
                <button
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Log Out"
                >
                  <LogOut size={20} />
                </button>
              )}

              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold border shadow-sm ${!userRole ? 'bg-slate-200 text-slate-400 border-slate-300' :
                userRole === UserRole.ADJUSTER ? 'bg-indigo-600 border-indigo-700' : 'bg-blue-600 border-blue-700'
                }`}>
                {!userRole ? '??' : userRole === UserRole.ADJUSTER ? 'AS' : 'AD'}
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          {children}
        </div>
      </main>
    </div>
  );
};
