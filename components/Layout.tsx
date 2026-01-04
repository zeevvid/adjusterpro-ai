
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { AppView, UserRole } from '../types';
import { Shield, Menu, X, Bell, LogOut, AlertCircle, PlusCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setView: (view: AppView) => void;
  userRole: UserRole;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, setView, userRole, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const filteredNav = NAV_ITEMS.filter(item => item.roles.includes(userRole));

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
                {userRole === UserRole.ADJUSTER ? 'Staff Portal' : 'Client Access'}
              </p>
            )}
          </div>
          {filteredNav.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center p-4 transition-colors ${
                activeView === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {isSidebarOpen && <span className="ml-4 font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button 
            onClick={onLogout}
            className="w-full flex items-center p-2 rounded text-slate-400 hover:bg-red-900/20 hover:text-red-400 transition-colors"
          >
            <div className="flex-shrink-0"><LogOut size={20} /></div>
            {isSidebarOpen && <span className="ml-4 font-medium">Log Out</span>}
          </button>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex justify-center p-2 rounded hover:bg-slate-800"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-slate-800">
              {filteredNav.find(n => n.id === activeView)?.label || 'AdjusterPro'}
            </h2>
            <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {userRole}
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
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold border ${
                userRole === UserRole.ADJUSTER ? 'bg-indigo-600 border-indigo-700' : 'bg-blue-600 border-blue-700'
              }`}>
                {userRole === UserRole.ADJUSTER ? 'AS' : 'CL'}
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
