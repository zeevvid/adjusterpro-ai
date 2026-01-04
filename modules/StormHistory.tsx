
import React, { useState } from 'react';
import {
  CloudLightning, Search, Download, FileText,
  ArrowUpRight, Wind, Zap, Droplets, Info,
  Sparkles, Filter, Calendar, MapPin, AlertTriangle, ShieldCheck, Printer
} from 'lucide-react';
import { getAIAssistance } from '../services/geminiService';

interface StormEvent {
  id: string;
  name: string;
  date: string;
  exactTime: string;
  type: 'Hurricane' | 'Hail' | 'Wind' | 'Flood';
  peakMetric: string;
  intensityLabel?: string;
  affectedZips: string[];
  estimatedClaims: number;
}

const HISTORICAL_STORMS: StormEvent[] = [
  {
    id: 'h-1',
    name: 'Hurricane Milton',
    date: 'Oct 9, 2024',
    exactTime: '08:42 PM EDT',
    type: 'Hurricane',
    peakMetric: '120 mph',
    intensityLabel: 'Category 3',
    affectedZips: ['33139', '33140', '33141'],
    estimatedClaims: 450
  },
  {
    id: 'h-2',
    name: 'South FL Hail Outbreak',
    date: 'Jun 15, 2024',
    exactTime: '04:15 PM EDT',
    type: 'Hail',
    peakMetric: '1.75"',
    intensityLabel: 'Golf Ball Size',
    affectedZips: ['33065', '33066', '33067'],
    estimatedClaims: 120
  },
  {
    id: 'h-hail-recent',
    name: 'Spring Hail Storm',
    date: 'Mar 28, 2024',
    exactTime: '02:30 PM EDT',
    type: 'Hail',
    peakMetric: '1.00"',
    intensityLabel: 'Quarter Size',
    affectedZips: ['33139', '33301'],
    estimatedClaims: 85
  },
  {
    id: 'h-3',
    name: 'April Wind Shear Event',
    date: 'Apr 22, 2024',
    exactTime: '11:05 AM EDT',
    type: 'Wind',
    peakMetric: '65 mph',
    intensityLabel: 'Severe Tropical Force',
    affectedZips: ['33301', '33304'],
    estimatedClaims: 35
  },
  {
    id: 'h-4',
    name: 'Summer Monsoon Flooding',
    date: 'Jul 30, 2023',
    exactTime: '12:00 PM EDT',
    type: 'Flood',
    peakMetric: '8.4 in/24h',
    intensityLabel: 'Major Flash Flood',
    affectedZips: ['33132', '33130'],
    estimatedClaims: 85
  },
];

const HOUSTON_STORMS: StormEvent[] = [
  {
    id: 'tx-1',
    name: 'Houston Hail Event',
    date: 'Mar 15, 2024',
    exactTime: '03:45 PM CDT',
    type: 'Hail',
    peakMetric: '1.50"',
    intensityLabel: 'Ping Pong Size',
    affectedZips: ['77071', '77072', '77074'],
    estimatedClaims: 210
  },
  {
    id: 'tx-2',
    name: 'Spring Severe Thunderstorms',
    date: 'Mar 21, 2024',
    exactTime: '06:30 PM CDT',
    type: 'Wind',
    peakMetric: '60 mph',
    intensityLabel: 'Severe Gusts',
    affectedZips: ['77071', '77035'],
    estimatedClaims: 45
  },
  {
    id: 'tx-3',
    name: 'April Flood Event',
    date: 'Apr 09, 2024',
    exactTime: '10:15 AM CDT',
    type: 'Flood',
    peakMetric: '4.5 in/6h',
    intensityLabel: 'Street Flooding',
    affectedZips: ['77071', '77096'],
    estimatedClaims: 15
  }
];

export const StormHistory: React.FC = () => {
  const [addressSearch, setAddressSearch] = useState('');
  const [propertyReport, setPropertyReport] = useState<StormEvent[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedStorm, setSelectedStorm] = useState<StormEvent | null>(null);
  const [aiReport, setAiReport] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePropertySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressSearch) return;

    setIsSearching(true);
    // Simulate property-specific impact lookup
    setTimeout(() => {
      // Logic to return correct regional data based on search
      const lowerSearch = addressSearch.toLowerCase();
      if (lowerSearch.includes('77') || lowerSearch.includes('tx') || lowerSearch.includes('houston')) {
        setPropertyReport(HOUSTON_STORMS);
      } else {
        // Default to Florida/Miami data
        setPropertyReport(HISTORICAL_STORMS.filter(s => s.affectedZips.includes('33139')));
      }
      setIsSearching(false);
    }, 1500);
  };

  const generateReport = async (storm: StormEvent) => {
    setSelectedStorm(storm);
    setIsGenerating(true);
    setAiReport('');

    const prompt = `Generate a professional insurance impact summary for the following historical storm event:
      Storm Name: ${storm.name}
      Date: ${storm.date}
      Exact Time: ${storm.exactTime}
      Type: ${storm.type}
      Peak Intensity: ${storm.peakMetric} (${storm.intensityLabel})
      Affected ZIPs: ${storm.affectedZips.join(', ')}
      
      Focus on likely property damage types (roof, windows, structural, mold), typical carrier pushback for this type of event, and how a Public Adjuster can maximize the settlement. Identify if this is within the 2-year Florida statute of limitations.`;

    const response = await getAIAssistance(prompt);
    setAiReport(response);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Property Search Hero */}
      <div className="bg-slate-900 rounded-[48px] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32 animate-pulse"></div>
        <div className="relative z-10 max-w-3xl space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-xs font-black uppercase tracking-widest border border-blue-500/20">
              <ShieldCheck size={14} /> Property Back-Profile Engine
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Search Any Property's Weather History.</h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium">Verify exact storm and hail impact dates for any address in our historical database.</p>
          </div>

          <form onSubmit={handlePropertySearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={24} />
              <input
                type="text"
                placeholder="Enter full property address..."
                value={addressSearch}
                onChange={(e) => setAddressSearch(e.target.value)}
                className="w-full bg-white/5 border-2 border-white/10 rounded-[24px] py-5 pl-16 pr-6 text-white text-lg outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="bg-blue-600 text-white px-10 py-5 rounded-[24px] font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50"
            >
              {isSearching ? 'Analyzing History...' : 'Generate Profile'}
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Property Specific Results */}
          {propertyReport && (
            <div className="bg-white rounded-[40px] border-2 border-blue-100 shadow-xl p-8 space-y-6 animate-in zoom-in-95 duration-500">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Historical Hits: {addressSearch}</h3>
                  <p className="text-slate-500 text-sm font-medium">We found {propertyReport.length} significant weather events for this location.</p>
                </div>
                <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100"><Printer size={20} /></button>
              </div>

              <div className="space-y-4">
                {propertyReport.map(storm => (
                  <div key={storm.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-5">
                      <div className={`p-4 rounded-2xl ${storm.type === 'Hurricane' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' :
                          storm.type === 'Hail' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' :
                            'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                        }`}>
                        {storm.type === 'Hurricane' && <CloudLightning size={24} />}
                        {storm.type === 'Hail' && <Zap size={24} />}
                        {storm.type === 'Wind' && <Wind size={24} />}
                        {storm.type === 'Flood' && <Droplets size={24} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-lg font-black text-slate-900">{storm.name}</p>
                          <span className="text-[10px] font-black px-2 py-0.5 bg-white border border-slate-200 rounded-full uppercase tracking-tighter">{storm.intensityLabel}</span>
                        </div>
                        <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                          <Calendar size={14} className="text-blue-500" /> {storm.date} <span className="text-slate-300">|</span> <span className="text-slate-800 font-black">{storm.exactTime}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="text-right flex-1 md:flex-initial">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Statute Deadline</p>
                        <p className="text-xs font-bold text-red-600">{calculateDeadline(storm.date)}</p>
                      </div>
                      <button
                        onClick={() => generateReport(storm)}
                        className="bg-white border-2 border-slate-200 text-slate-900 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                      >
                        View Analysis
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regional Archive List */}
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-800">Regional Storm & Hail Archive</h3>
              <div className="flex gap-2">
                <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl"><Filter size={18} /></button>
                <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl"><Search size={18} /></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Event & Exact Date</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Intensity</th>
                    <th className="px-8 py-5 text-right text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {HISTORICAL_STORMS.map(storm => (
                    <tr key={storm.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-1.5 h-10 rounded-full ${storm.type === 'Hurricane' ? 'bg-red-500' :
                              storm.type === 'Hail' ? 'bg-blue-600' :
                                'bg-orange-500'
                            }`}></div>
                          <div>
                            <p className="text-sm font-black text-slate-800">{storm.name}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{storm.date} • {storm.exactTime}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-900 px-3 py-1 bg-slate-100 rounded-full">{storm.peakMetric}</span>
                          <span className="text-[10px] text-slate-400 font-bold">{storm.intensityLabel}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button
                          onClick={() => generateReport(storm)}
                          className="text-blue-600 font-black text-[10px] uppercase tracking-widest hover:underline"
                        >
                          Report Info
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* AI Insight Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl overflow-hidden min-h-[500px] flex flex-col sticky top-8">
            <div className="p-8 border-b border-slate-100 bg-gradient-to-br from-blue-50 to-white flex items-center gap-3">
              <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-500/20">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">AI Archive Auditor</h3>
                <p className="text-xs text-slate-500 font-medium">Deep analysis on property recovery</p>
              </div>
            </div>

            <div className="flex-1 p-8 overflow-y-auto max-h-[600px]">
              {isGenerating ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm font-bold text-slate-600">Mining historic storm cells...</p>
                </div>
              ) : selectedStorm && aiReport ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-black text-slate-900">{selectedStorm.name}</h4>
                      <p className="text-[10px] text-red-600 font-black uppercase tracking-widest">Property Analysis Report</p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-blue-600"><Download size={18} /></button>
                  </div>

                  <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex gap-3">
                    <AlertTriangle size={16} className="text-orange-600 flex-shrink-0" />
                    <p className="text-[10px] text-orange-800 font-bold leading-tight">
                      This event occurred on {selectedStorm.date}. Ensure the claim is filed before {calculateDeadline(selectedStorm.date)} to protect statutory rights.
                    </p>
                  </div>

                  <div className="prose prose-sm text-slate-600 leading-relaxed font-medium">
                    <pre className="whitespace-pre-wrap font-sans text-sm border-l-2 border-slate-100 pl-4">
                      {aiReport}
                    </pre>
                  </div>

                  <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-500/10">
                    Export Formal Evidence Package
                  </button>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40 py-20">
                  <FileText size={64} className="text-slate-200" />
                  <p className="text-sm font-medium text-slate-400">Select an event or property <br /> to generate an AI Impact Profile.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-600 p-8 rounded-[40px] text-white shadow-xl relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10 flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-3 rounded-2xl"><Info size={24} /></div>
              <h4 className="font-bold text-lg">Statute Reminder</h4>
            </div>
            <p className="relative z-10 text-sm text-blue-50 leading-relaxed font-medium">
              In most states, including Florida, you have <span className="font-black underline decoration-white/30 underline-offset-4">24 months</span> from the date of loss to report a claim. Older storms may still be viable if supplemental damage is found.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper to calculate 2 year deadline
function calculateDeadline(dateStr: string) {
  const date = new Date(dateStr);
  date.setFullYear(date.getFullYear() + 2);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
