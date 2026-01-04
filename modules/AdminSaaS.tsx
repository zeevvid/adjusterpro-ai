import React, { useState, useEffect } from 'react';
import {
    Users,
    CreditCard,
    ArrowUpRight,
    CheckCircle,
    AlertCircle,
    Search,
    Filter,
    MoreHorizontal,
    TrendingUp,
    DollarSign,
    Activity
} from 'lucide-react';
import { AdjusterProfile, SubscriptionTier } from '../types';

export const AdminSaaS: React.FC = () => {
    const [adjusters, setAdjusters] = useState<AdjusterProfile[]>([]);
    const [loading, setLoading] = useState(true);

    // Mock Data
    useEffect(() => {
        setTimeout(() => {
            setAdjusters([
                { uid: '1', email: 'mike@topadjusters.com', referralId: 'MIKE-ROOF', tier: SubscriptionTier.PRO, subscriptionStatus: 'active', companyName: 'Top Adjusters LLC' },
                { uid: '2', email: 'sarah@claimpros.io', referralId: 'SARAH-HAIL', tier: SubscriptionTier.AGENCY, subscriptionStatus: 'active', companyName: 'ClaimPROS Iowa' },
                { uid: '3', email: 'john@independent.net', referralId: 'JOHN-FIRE', tier: SubscriptionTier.STARTER, subscriptionStatus: 'past_due', companyName: 'Independent Loss Consulting' }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const stats = [
        { label: 'Total MRR', value: '$4,280', icon: DollarSign, trend: '+12%', color: 'blue' },
        { label: 'Active Partners', value: '24', icon: Users, trend: '+3', color: 'indigo' },
        { label: 'Organic Leads', value: '18', icon: Activity, trend: '+5', color: 'green' },
        { label: 'Unpaid Fees', value: '$1,200', icon: CreditCard, trend: '-2%', color: 'red' },
    ];

    return (
        <div className="max-w-7xl mx-auto p-8 space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">SaaS Command Center</h1>
                    <p className="text-slate-500 font-medium">Manage partner subscriptions, referrals, and platform conversions.</p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
                    <TrendingUp size={18} /> View Analytics
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-50 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform`}></div>
                        <div className="relative z-10">
                            <div className={`p-3 bg-${stat.color}-100 text-${stat.color}-600 rounded-2xl w-fit mb-4`}>
                                <stat.icon size={20} />
                            </div>
                            <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">{stat.label}</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-slate-900">{stat.value}</span>
                                <span className={`text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full`}>{stat.trend}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Partner Management Table */}
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                        <CreditCard className="text-blue-600" /> Public Adjuster Partners
                    </h3>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                placeholder="Search partners..."
                                className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
                            />
                        </div>
                        <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-slate-100 transition-all">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                                <th className="px-8 py-6 border-b border-slate-50">Partner / Company</th>
                                <th className="px-8 py-6 border-b border-slate-50">Referral ID</th>
                                <th className="px-8 py-6 border-b border-slate-50">Tier</th>
                                <th className="px-8 py-6 border-b border-slate-50">Status</th>
                                <th className="px-8 py-6 border-b border-slate-50 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {adjusters.map((adj) => (
                                <tr key={adj.uid} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-black">
                                                {adj.companyName?.substring(0, 1)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{adj.companyName}</p>
                                                <p className="text-xs text-slate-400 font-medium">{adj.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <code className="bg-slate-100 px-3 py-1 rounded-lg text-xs font-bold text-blue-600 tracking-wider font-mono">
                                            {adj.referralId}
                                        </code>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${adj.tier === SubscriptionTier.AGENCY ? 'bg-purple-100 text-purple-600' :
                                            adj.tier === SubscriptionTier.PRO ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {adj.tier}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            {adj.subscriptionStatus === 'active' ? (
                                                <CheckCircle className="text-green-500" size={16} />
                                            ) : (
                                                <AlertCircle className="text-red-500" size={16} />
                                            )}
                                            <span className={`text-sm font-bold ${adj.subscriptionStatus === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                                                {adj.subscriptionStatus.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-white rounded-lg transition-all group-hover:shadow-sm">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 bg-slate-50/30 border-t border-slate-50 flex justify-center">
                    <button className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">View All Adjuster Partners &rarr;</button>
                </div>
            </div>

            {/* Organic Leads Table */}
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                        <Activity className="text-green-500" /> Pending Organic Leads
                    </h3>
                    <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase px-3 py-1 rounded-full">New Leads Awaiting Assignment</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                                <th className="px-8 py-6 border-b border-slate-50">Homeowner</th>
                                <th className="px-8 py-6 border-b border-slate-50">Damage Type</th>
                                <th className="px-8 py-6 border-b border-slate-50">Estimated Value</th>
                                <th className="px-8 py-6 border-b border-slate-50">Status</th>
                                <th className="px-8 py-6 border-b border-slate-50 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[
                                { name: 'John Peterson', type: 'Residential Fire', value: '$85,000', status: 'Pending Fee' },
                                { name: 'Sarah Miller', type: 'Hurricane Roof', value: '$22,400', status: 'Payment Verified' },
                            ].map((lead) => (
                                <tr key={lead.name} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-6 font-bold text-slate-900">{lead.name}</td>
                                    <td className="px-8 py-6 text-sm text-slate-600">{lead.type}</td>
                                    <td className="px-8 py-6 font-mono font-bold text-blue-600">{lead.value}</td>
                                    <td className="px-8 py-6">
                                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${lead.status === 'Payment Verified' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                                            }`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="bg-slate-900 text-white text-[10px] font-black uppercase px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
                                            Assign Partner
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Organic Conversion Fee Settings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-black mb-2 flex items-center gap-3">
                            <CreditCard className="text-blue-400" /> Platform Traffic Fee
                        </h3>
                        <p className="text-blue-200 text-sm mb-8">Flat-fee charged to unreferred homeowners who opt to connect with a partner adjusters.</p>

                        <div className="bg-white/10 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                            <label className="block text-[10px] font-black text-blue-300 uppercase tracking-widest mb-2">Current Conversion Fee</label>
                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-black">$400.00</span>
                                <button className="text-xs font-bold bg-white text-slate-900 px-4 py-2 rounded-xl h-fit">Update Price</button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-blue-300 font-bold uppercase tracking-widest">
                            <ArrowUpRight size={14} />
                            <span>Generates Invoice Automaticlly upon user consent</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                        <Users className="text-indigo-600" /> Territory Management
                    </h3>
                    <div className="space-y-4 opacity-50 pointer-events-none">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                            <span className="font-bold text-slate-700">Priority Routing Index</span>
                            <div className="w-12 h-6 bg-slate-200 rounded-full"></div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                            <span className="font-bold text-slate-700">Geographic Lead Distribution</span>
                            <div className="w-12 h-6 bg-slate-200 rounded-full"></div>
                        </div>
                    </div>
                    <div className="mt-8 bg-indigo-50 text-indigo-600 p-4 rounded-2xl text-xs font-bold text-center border border-indigo-100">
                        Phase 2 Features: Territory controls coming soon.
                    </div>
                </div>
            </div>
        </div>
    );
};
