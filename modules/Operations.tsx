
import React from 'react';
import { Briefcase, MapPin, Search, Calendar, Users, ClipboardCheck, BarChart3 } from 'lucide-react';

export const Operations: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Field Staff Tracking */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2"><MapPin className="text-blue-600" /> Field Adjuster Tracking</h3>
            <div className="flex gap-2">
               <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">4 Active</span>
               <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded font-bold">2 Idle</span>
            </div>
          </div>
          <div className="h-96 relative">
            <img src="https://picsum.photos/seed/operations/800/500" className="w-full h-full object-cover grayscale opacity-20" alt="Map" />
            <div className="absolute inset-0 bg-slate-50/50"></div>
            
            {/* Mock Adjuster Pins */}
            <div className="absolute top-20 left-1/4 group cursor-pointer">
               <div className="relative">
                 <div className="w-10 h-10 bg-blue-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white font-bold text-xs">JD</div>
                 <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">John Doe (Inspecting Roof)</div>
               </div>
            </div>
            
            <div className="absolute bottom-32 right-1/3 group cursor-pointer">
               <div className="relative">
                 <div className="w-10 h-10 bg-purple-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white font-bold text-xs">MS</div>
                 <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Mike Smith (Traveling)</div>
               </div>
            </div>
          </div>
        </div>

        {/* Appointment Calendar */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-100 font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="text-blue-600" /> Inspection Calendar
          </div>
          <div className="p-6 flex-1 space-y-4">
             {[
               { time: '09:00 AM', client: 'Alice Johnson', type: 'Initial Inspect' },
               // Fixed: Use double quotes to handle the apostrophe in "Bob's Pizza" to prevent parser errors
               { time: '11:30 AM', client: "Bob's Pizza", type: 'Xactimate Scoping' },
               { time: '02:00 PM', client: 'Charlie Davis', type: 'Carrier Meeting' },
               { time: '04:30 PM', client: 'Diana Prince', type: 'Final Walkthrough' }
             ].map((appt, i) => (
               <div key={i} className="p-3 bg-slate-50 rounded-lg border-l-4 border-blue-500 hover:bg-slate-100 transition-colors">
                  <p className="text-[10px] font-bold text-slate-400">{appt.time}</p>
                  <p className="font-bold text-slate-800 text-sm">{appt.client}</p>
                  <p className="text-xs text-slate-500">{appt.type}</p>
               </div>
             ))}
          </div>
          <button className="w-full py-4 text-blue-600 font-semibold border-t border-slate-100 hover:bg-slate-50">View Full Schedule</button>
        </div>

        {/* Measurement & Tools */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
           <h3 className="font-bold text-slate-800 flex items-center gap-2"><ClipboardCheck className="text-green-600" /> Quick Tools</h3>
           <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-300 transition-all text-center">
                <BarChart3 className="mx-auto mb-2 text-blue-600" />
                <span className="text-xs font-bold block">Roof Estimator</span>
              </button>
              <button className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-300 transition-all text-center">
                <Search className="mx-auto mb-2 text-blue-600" />
                <span className="text-xs font-bold block">Policy Auditor</span>
              </button>
           </div>
           <div className="bg-blue-600 text-white p-6 rounded-xl relative overflow-hidden group cursor-pointer shadow-lg hover:bg-blue-700 transition-colors">
              <Users className="absolute -right-2 -bottom-2 w-24 h-24 opacity-20" />
              <h4 className="font-bold mb-1">Employee GPS</h4>
              <p className="text-xs text-blue-100">Live feed of all staff locations and route optimization.</p>
           </div>
        </div>

        {/* Analytics Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-xl flex items-center gap-8">
           <div className="flex-1 space-y-2">
             <h3 className="text-2xl font-bold">Data Analytics</h3>
             <p className="text-slate-400">Claims are currently processing 15% faster than last quarter due to AI document verification.</p>
             <div className="flex gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">8.4d</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Avg. Turnaround</div>
                </div>
                <div className="w-px bg-white/10"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Client Success</div>
                </div>
             </div>
           </div>
           <div className="hidden md:block w-32 h-32 border-8 border-blue-600 border-t-slate-700 rounded-full animate-spin [animation-duration:10s]"></div>
        </div>
      </div>
    </div>
  );
};
