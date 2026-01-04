
import React, { useState } from 'react';
import { 
  MapPin, Navigation, Search, Phone, MessageSquare, 
  MoreHorizontal, Zap, Users, Shield, Clock, ArrowUpRight, 
  Map as MapIcon, Layers, Info
} from 'lucide-react';

export const GPSTracker: React.FC = () => {
  const [selectedAdjuster, setSelectedAdjuster] = useState<string | null>(null);

  const staff = [
    { id: '1', name: 'John Doe', status: 'Inspecting', battery: '82%', lastSeen: '2m ago', location: 'SW 12th St, Miami', task: 'Claim #AP-2024-884' },
    { id: '2', name: 'Sarah Miller', status: 'Traveling', battery: '45%', lastSeen: 'Just now', location: 'I-95 Northbound', task: 'En route to Coral Gables' },
    { id: '3', name: 'Mike Ross', status: 'At Office', battery: '100%', lastSeen: '10m ago', location: 'Headquarters', task: 'Policy Auditing' },
    { id: '4', name: 'Emma Wilson', status: 'Inspecting', battery: '68%', lastSeen: '5m ago', location: 'Palm Beach Gardens', task: 'Claim #AP-2024-912' },
  ];

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Staff GPS Tracker</h2>
          <p className="text-slate-500 font-medium">Real-time field intelligence & dispatch console</p>
        </div>
        <div className="flex gap-3">
          <div className="flex -space-x-3">
            {staff.map(s => (
              <div key={s.id} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold ring-2 ring-slate-100">
                {s.name.split(' ').map(n => n[0]).join('')}
              </div>
            ))}
          </div>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
            <PlusCircle size={18} /> Dispatch Adjuster
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Live Map Interface */}
        <div className="flex-1 bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden relative group">
          <div className="absolute inset-0 bg-slate-100">
            <img 
              src="https://picsum.photos/seed/miami-map/1600/1200" 
              className="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply" 
              alt="Live Map" 
            />
            {/* Pulsing Pins */}
            <MapPinPulse top="30%" left="40%" label="John Doe" color="bg-blue-600" active={selectedAdjuster === '1'} />
            <MapPinPulse top="55%" left="48%" label="Sarah Miller" color="bg-orange-500" active={selectedAdjuster === '2'} />
            <MapPinPulse top="82%" left="72%" label="Emma Wilson" color="bg-blue-600" active={selectedAdjuster === '4'} />
          </div>

          {/* Map Controls Overlay */}
          <div className="absolute top-6 left-6 space-y-2">
            <div className="bg-white/90 backdrop-blur p-2 rounded-2xl shadow-xl border border-white flex flex-col gap-1">
              <button className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-700 transition-colors"><MapIcon size={20} /></button>
              <button className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-700 transition-colors"><Layers size={20} /></button>
              <div className="h-px bg-slate-100 my-1"></div>
              <button className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-700 transition-colors"><Info size={20} /></button>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 flex items-center gap-4 bg-white/90 backdrop-blur p-4 rounded-3xl shadow-2xl border border-white max-w-sm">
             <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
               <Zap size={24} className="fill-current" />
             </div>
             <div>
               <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Optimized Routing</p>
               <p className="text-[10px] text-slate-500">AI has recalculated paths for 4 adjusters to avoid the SW 8th St flood zone.</p>
             </div>
          </div>
        </div>

        {/* Staff List Sidebar */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm p-8 flex-1 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-800">Field Team</h3>
              <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-full uppercase tracking-tighter">4 Active</span>
            </div>
            
            <div className="space-y-4">
              {staff.map(person => (
                <div 
                  key={person.id}
                  onClick={() => setSelectedAdjuster(person.id)}
                  className={`p-5 rounded-3xl border-2 transition-all cursor-pointer group ${
                    selectedAdjuster === person.id 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20' 
                      : 'bg-slate-50 border-transparent hover:border-blue-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                        selectedAdjuster === person.id ? 'bg-white/20' : 'bg-white border border-slate-200 text-slate-400'
                      }`}>
                        {person.name[0]}
                      </div>
                      <div>
                        <p className={`font-bold text-sm ${selectedAdjuster === person.id ? 'text-white' : 'text-slate-800'}`}>{person.name}</p>
                        <p className={`text-[10px] uppercase font-black tracking-widest ${selectedAdjuster === person.id ? 'text-blue-100' : 'text-slate-400'}`}>
                          {person.status} • {person.lastSeen}
                        </p>
                      </div>
                    </div>
                    <button className={`${selectedAdjuster === person.id ? 'text-white' : 'text-slate-400'} hover:scale-110 transition-transform`}>
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                  
                  <div className={`text-[11px] leading-relaxed mb-4 ${selectedAdjuster === person.id ? 'text-blue-50' : 'text-slate-500'}`}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <MapPin size={10} /> {person.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={10} /> {person.task}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${
                      selectedAdjuster === person.id 
                        ? 'bg-white/20 hover:bg-white/30 text-white' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}>
                      Ping
                    </button>
                    <button className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${
                      selectedAdjuster === person.id 
                        ? 'bg-white text-blue-600 hover:bg-blue-50' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}>
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[40px] p-8 text-white space-y-6">
            <h3 className="font-bold text-slate-400 text-xs uppercase tracking-[0.2em]">Operational Pulse</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-black">124 mi</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Distance Covered</p>
              </div>
              <div>
                <p className="text-2xl font-black text-green-400">92%</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">SLA Compliance</p>
              </div>
            </div>
            <button className="w-full py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors">
              Export Daily Logistics Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MapPinPulse: React.FC<{ top: string, left: string, label: string, color: string, active: boolean }> = ({ top, left, label, color, active }) => (
  <div className="absolute" style={{ top, left }}>
    <div className="relative flex items-center justify-center">
      <div className={`absolute w-12 h-12 ${color} rounded-full opacity-20 animate-ping`}></div>
      <div className={`relative z-10 w-4 h-4 ${color} rounded-full border-2 border-white shadow-xl transition-all duration-300 ${active ? 'scale-150 ring-4 ring-white/30' : ''}`}></div>
      {active && (
        <div className="absolute top-8 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[10px] font-black whitespace-nowrap shadow-2xl animate-in zoom-in-50 duration-200">
          {label} - Active Task
        </div>
      )}
    </div>
  </div>
);

const PlusCircle: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/>
  </svg>
);
