import React, { useState } from 'react';
import {
    Link as LinkIcon,
    Copy,
    ExternalLink,
    CreditCard,
    ShieldCheck,
    Users,
    TrendingUp,
    Settings,
    AlertCircle
} from 'lucide-react';
import { SubscriptionTier } from '../types';

export const AdjusterPartnerDashboard: React.FC = () => {
    const [copied, setCopied] = useState(false);
    const referralId = "MIKE-ROOF-2024";
    const referralLink = `https://adjusterpro.ai/?ref=${referralId}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const tiers = [
        { name: 'Starter', price: 149, features: ['1 Referral Link', 'Standard Dashboard', 'Basic Analytics'], current: false },
        { name: 'Pro', price: 299, features: ['Unlimited Usage', 'Custom Branding', 'Priority Routing', 'Advanced Analytics'], current: true },
        { name: 'Agency', price: 699, features: ['Multiple Users', 'Territory Controls', 'API Access', 'White-labeling'], current: false },
    ];

    return (
        <div className="max-w-6xl mx-auto p-8 space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Partner Portal</h1>
                    <p className="text-slate-500 font-medium">Generate leads and manage your AdjusterPro AI collaboration.</p>
                </div>
                <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl border border-green-100 flex items-center gap-2 font-bold text-sm">
                    <ShieldCheck size={18} /> Verified Partner • Pro Plan
                </div>
            </div>

            {/* Referral Link Card */}
            <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[140px] opacity-20 -mr-48 -mt-48"></div>
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600/20 p-3 rounded-2xl">
                            <LinkIcon className="text-blue-400" />
                        </div>
                        <h3 className="text-xl font-black">Your Unique Referral Asset</h3>
                    </div>

                    <div className="bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                        <p className="text-blue-200 text-xs font-black uppercase tracking-widest mb-3">Copy & Share your link to lock leads</p>
                        <div className="flex gap-4">
                            <div className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-blue-100 flex items-center">
                                {referralLink}
                            </div>
                            <button
                                onClick={handleCopy}
                                className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all shrink-0"
                            >
                                {copied ? <CheckCircle size={18} className="text-green-500" /> : <Copy size={18} />}
                                {copied ? 'Copied!' : 'Copy Link'}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-8 text-sm">
                        <div className="flex items-center gap-2 text-blue-200">
                            <TrendingUp size={16} className="text-green-400" />
                            <span className="font-bold">24 Leads Generated</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-200">
                            <Users size={16} className="text-indigo-400" />
                            <span className="font-bold">14 Active Claims</span>
                        </div>
                        <a href={referralLink} target="_blank" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors ml-auto font-medium">
                            Test Link <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Subscription Management */}
            <div className="space-y-6">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <CreditCard size={24} className="text-blue-600" /> Subscription & Billing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`p-8 rounded-[32px] border ${tier.current ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 bg-white'} relative overflow-hidden transition-all hover:shadow-lg`}
                        >
                            {tier.current && (
                                <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest">
                                    Current Plan
                                </div>
                            )}
                            <h4 className="text-slate-400 font-black text-xs uppercase tracking-widest mb-1">{tier.name}</h4>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-black text-slate-900">${tier.price}</span>
                                <span className="text-slate-400 font-bold text-sm">/mo</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {tier.features.map(f => (
                                    <li key={f} className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                                        <ShieldCheck size={16} className="text-blue-500" /> {f}
                                    </li>
                                ))}
                            </ul>
                            <button
                                disabled={tier.current}
                                className={`w-full py-4 rounded-2xl font-black text-sm transition-all ${tier.current ? 'bg-slate-100 text-slate-400 cursor-default' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-950/20'
                                    }`}
                            >
                                {tier.current ? 'Your Active Plan' : 'Upgrade Now'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Claims & Network Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Active Claim Lifecycle */}
                <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-xl font-black text-slate-900">Active Claim Lifecycle</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time Status tracking</p>
                        </div>
                        <button className="bg-slate-50 p-2 rounded-xl text-slate-400 hover:text-blue-600 transition-colors">
                            <Settings size={18} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {[
                            { name: 'Smith Residence', status: 'Negotiation', progress: 85, color: 'blue' },
                            { name: 'Heights Industrial', status: 'PA Assignment', progress: 40, color: 'indigo' },
                            { name: 'Oak Street Condo', status: 'Documentation', progress: 65, color: 'green' }
                        ].map((claim) => (
                            <div key={claim.name} className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="font-bold text-slate-900">{claim.name}</p>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{claim.status}</p>
                                    </div>
                                    <span className={`text-xs font-black text-${claim.color}-600`}>{claim.progress}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full bg-${claim.color}-600 rounded-full`} style={{ width: `${claim.progress}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Partner Network */}
                <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-xl font-black text-slate-900">Network Directory</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Trusted Contractors & Key Clients</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                42 Contacts
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { name: 'Elite Roofers Inc.', type: 'Contractor', rating: '4.9', active: true },
                            { name: 'Coastal Mitigation', type: 'Contractor', rating: '4.8', active: true },
                            { name: 'Jackson Holdings', type: 'Key Client', rating: 'N/A', active: false }
                        ].map((contact) => (
                            <div key={contact.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-slate-500 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        {contact.name[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">{contact.name}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{contact.type}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {contact.rating !== 'N/A' && <p className="text-xs font-black text-amber-500">★ {contact.rating}</p>}
                                    {contact.active ? (
                                        <span className="text-[8px] font-black uppercase text-green-500 bg-green-50 px-2 py-0.5 rounded-full">On Site</span>
                                    ) : (
                                        <span className="text-[8px] font-black uppercase text-slate-300">Idle</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const CheckCircle: React.FC<{ size?: number, className?: string }> = ({ size = 20, className }) => (
    <ShieldCheck size={size} className={className} />
);
