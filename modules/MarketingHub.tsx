
import React, { useState } from 'react';
import { 
  Share2, Sparkles, Send, Instagram, Linkedin, Facebook, 
  MessageSquare, Users, TrendingUp, Plus, Calendar, 
  ImageIcon, FileText, Heart, Globe, ArrowUpRight
} from 'lucide-react';
import { getAIAssistance } from '../services/geminiService';

export const MarketingHub: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCaption, setGeneratedCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAIPost = async () => {
    setIsGenerating(true);
    const aiResponse = await getAIAssistance(
      `Generate a high-converting social media post (Instagram/LinkedIn) for a Public Adjusting firm. 
       Context: ${prompt}. 
       Include emojis, relevant hashtags, and a strong call to action for homeowners to get a free policy review. 
       Make it professional yet empathetic.`
    );
    setGeneratedCaption(aiResponse);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Marketing & Social Hub</h2>
          <p className="text-slate-500 font-medium">Amplify your firm's reach with AI-powered content and lead tracking</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
            <Plus size={18} /> Schedule Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Content Lab */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-2xl text-white">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-800">AI Content Lab</h3>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Gemini Pro Powered</span>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Post Topic / Recent Success</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Just recovered $45k for a family in South Beach whose roof was denied. Mention 24h response time."
                  className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:border-blue-500 outline-none transition-all text-sm font-medium min-h-[120px]"
                />
              </div>
              <button 
                onClick={generateAIPost}
                disabled={!prompt || isGenerating}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isGenerating ? 'Drafting Excellence...' : 'Generate High-Convert Post'}
                <Sparkles size={18} />
              </button>

              {generatedCaption && (
                <div className="mt-8 p-8 bg-slate-900 rounded-[32px] text-white animate-in zoom-in-95 duration-300 relative group">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"><FileText size={16} /></button>
                    <button className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"><Share2 size={16} /></button>
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-300">
                    {generatedCaption}
                  </pre>
                  <div className="mt-6 flex gap-3">
                    <button className="flex-1 py-3 bg-white text-slate-900 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-blue-50">
                      <Instagram size={14} /> Send to Instagram
                    </button>
                    <button className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-blue-400">
                      <Linkedin size={14} /> Post to LinkedIn
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <Calendar className="text-blue-500" /> Upcoming Posts
              </h4>
              <div className="space-y-3">
                <PostScheduleItem date="Tomorrow, 9:00 AM" platform="LinkedIn" topic="Common Policy Pitfalls" />
                <PostScheduleItem date="Friday, 3:00 PM" platform="Facebook" topic="Recent Storm Update" />
              </div>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp className="text-green-500" /> Lead Sources
              </h4>
              <div className="space-y-2">
                <LeadSourceBar label="Instagram Ads" value={45} color="bg-pink-500" />
                <LeadSourceBar label="Google Search" value={32} color="bg-blue-500" />
                <LeadSourceBar label="LinkedIn" value={18} color="bg-indigo-600" />
                <LeadSourceBar label="Referrals" value={5} color="bg-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Analytics */}
        <div className="space-y-8">
          <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
            <TrendingUp className="absolute -right-8 -top-8 w-48 h-48 opacity-10 rotate-12" />
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <Share2 className="text-blue-400" /> Engagement
            </h3>
            <div className="space-y-6">
               <div className="flex justify-between items-end">
                 <div>
                   <p className="text-4xl font-black text-white tracking-tighter">12.4k</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Impressions</p>
                 </div>
                 <span className="text-green-400 text-xs font-bold">+24% vs LW</span>
               </div>
               <div className="h-1 bg-white/10 rounded-full w-full">
                 <div className="h-full bg-blue-500 w-3/4 rounded-full"></div>
               </div>
               <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                 <div>
                   <p className="font-bold text-lg">842</p>
                   <p className="text-[10px] text-slate-500 font-bold uppercase">Shares</p>
                 </div>
                 <div>
                   <p className="font-bold text-lg">52</p>
                   <p className="text-[10px] text-slate-500 font-bold uppercase">New Leads</p>
                 </div>
               </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Heart className="text-red-500" /> Reputation Mgr
            </h3>
            <p className="text-xs text-slate-500">Send automatic review requests after successful settlement.</p>
            <div className="space-y-4">
              <ReviewRequestItem name="Alice Johnson" settlement="$24,850" status="Ready" />
              <ReviewRequestItem name="Mike Pizza" settlement="$155,000" status="Sent" />
            </div>
            <button className="w-full py-3 border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">
              Manage Review Templates
            </button>
          </div>

          <div className="bg-blue-600 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden group">
            <Globe className="absolute -right-8 -bottom-8 w-40 h-40 opacity-10" />
            <h3 className="text-lg font-bold mb-2">Social Assets</h3>
            <p className="text-blue-100 text-xs mb-6">Access logos, approved graphics, and brand guidelines for social media.</p>
            <button className="flex items-center gap-2 font-bold text-sm bg-white text-blue-600 px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-all">
              Asset Library <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostScheduleItem: React.FC<{ date: string, platform: string, topic: string }> = ({ date, platform, topic }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
    <div>
      <p className="text-xs font-black text-slate-800">{topic}</p>
      <p className="text-[10px] text-slate-400 uppercase font-bold">{platform} • {date}</p>
    </div>
    <button className="text-slate-400 hover:text-blue-600 transition-colors">
      <MoreHorizontal size={18} />
    </button>
  </div>
);

const LeadSourceBar: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 bg-slate-100 rounded-full w-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

const ReviewRequestItem: React.FC<{ name: string, settlement: string, status: string }> = ({ name, settlement, status }) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
    <div>
      <p className="text-xs font-bold text-slate-800">{name}</p>
      <p className="text-[10px] text-slate-400">Settled: {settlement}</p>
    </div>
    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
      status === 'Sent' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
    }`}>
      {status}
    </span>
  </div>
);

const MoreHorizontal: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
  </svg>
);
