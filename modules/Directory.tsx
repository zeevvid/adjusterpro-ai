
import React from 'react';
import { INSURANCE_COMPANIES } from '../constants';
import { Phone, ExternalLink, Shield, Wrench, MapPin, Truck } from 'lucide-react';

export const Directory: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Insurance Directory */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Shield className="text-blue-600" /> Carrier Claim Lines
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INSURANCE_COMPANIES.map((company, i) => (
              <div key={i} className="p-4 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
                <span className="font-bold text-slate-800">{company.name}</span>
                <a href={`tel:${company.phone}`} className="mt-2 text-blue-600 font-medium flex items-center gap-2 hover:underline">
                  <Phone size={14} /> {company.phone}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Repair Referrals */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Wrench className="text-orange-600" /> Vetted Local Repair Partners
          </h3>
          <div className="space-y-4">
            {[
              { name: 'PureWater Mitigation', type: 'Water Damage', rating: 4.9 },
              { name: 'SecureTarp Roofing', type: 'Roofing & Tarps', rating: 4.8 },
              { name: 'Elite Electricians', type: 'Electrical', rating: 4.7 }
            ].map((vendor, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-orange-200 transition-colors">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                     <Truck size={20} />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-800">{vendor.name}</h4>
                     <p className="text-xs text-slate-500">{vendor.type}</p>
                   </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-orange-500 font-bold text-sm">
                    ★ {vendor.rating}
                  </div>
                  <button className="text-[10px] text-blue-600 font-bold uppercase tracking-wider hover:underline">Contact Vendor</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Evacuation & Hazards */}
        <section className="lg:col-span-2 bg-slate-900 text-white p-8 rounded-2xl shadow-xl overflow-hidden relative">
          <MapPin className="absolute -right-12 -top-12 w-64 h-64 opacity-10" />
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
             <div className="flex-1 space-y-4">
               <h3 className="text-2xl font-bold">Local Safety & Routes</h3>
               <p className="text-slate-400">In an emergency, knowing your nearest exit route and local hazards can save lives.</p>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                   <h5 className="font-bold text-blue-400 mb-1">Evacuation Route A</h5>
                   <p className="text-xs">Take State Road 84 West to US-27 North. Primary route for flood zone A.</p>
                 </div>
                 <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                   <h5 className="font-bold text-orange-400 mb-1">Active Hazard: Flooding</h5>
                   <p className="text-xs">Biscayne Blvd at NE 15th St. Standing water (6 inches). Avoid compact vehicles.</p>
                 </div>
               </div>
               <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2">
                 View Live Map <ExternalLink size={18} />
               </button>
             </div>
             <div className="w-full md:w-80 h-48 bg-slate-800 rounded-xl border border-white/10 overflow-hidden">
                <img src="https://picsum.photos/seed/evac/400/300" className="w-full h-full object-cover opacity-50 grayscale" alt="Map View" />
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};
