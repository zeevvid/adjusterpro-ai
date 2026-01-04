import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, Sparkles, Download, X } from 'lucide-react';

export const XactimateVerify: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [results, setResults] = useState<any>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setResults(null);
        }
    };

    const handleAnalyze = () => {
        setAnalyzing(true);
        // Mock analysis - replace with actual API call
        setTimeout(() => {
            setResults({
                totalItems: 127,
                verified: 119,
                warnings: 6,
                missing: 2,
                suggestions: [
                    { type: 'missing', item: 'Roof Underlayment', code: 'RFG-UND-001', severity: 'high' },
                    { type: 'missing', item: 'Permit Fees', code: 'GEN-PRM-100', severity: 'medium' },
                    { type: 'warning', item: 'Shingle Quantity', code: 'RFG-SHG-200', message: 'Quantity seems low for sq footage', severity: 'medium' },
                    { type: 'warning', item: 'Labor Rate', code: 'LAB-GEN-001', message: 'Below market average for ZIP', severity: 'low' },
                ]
            });
            setAnalyzing(false);
        }, 3000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Xactimate AI Verification</h1>
                <p className="text-slate-500 font-medium mt-2">Upload your estimate to ensure nothing was missed. Our AI cross-references industry standards and local pricing.</p>
            </div>

            {/* Upload Section */}
            {!file && (
                <div className="bg-white rounded-[40px] border-2 border-dashed border-slate-200 p-16 text-center hover:border-blue-400 transition-all group">
                    <div className="max-w-md mx-auto space-y-6">
                        <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto group-hover:bg-blue-100 transition-colors">
                            <Upload className="text-blue-600" size={40} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 mb-2">Upload Xactimate Estimate</h3>
                            <p className="text-slate-500 text-sm">Drag and drop your .ESX, .PDF, or .XLSX file here</p>
                        </div>
                        <label className="inline-block">
                            <input
                                type="file"
                                className="hidden"
                                accept=".esx,.pdf,.xlsx,.xls"
                                onChange={handleFileUpload}
                            />
                            <span className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all cursor-pointer inline-flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95">
                                <FileText size={20} /> Select File
                            </span>
                        </label>
                        <p className="text-xs text-slate-400 font-medium">Supported: ESX, PDF, Excel • Max 25MB</p>
                    </div>
                </div>
            )}

            {/* File Preview & Analysis */}
            {file && !results && (
                <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                                <FileText className="text-blue-600" size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900">{file.name}</h3>
                                <p className="text-slate-400 text-sm font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setFile(null)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={analyzing}
                        className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-900/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {analyzing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Analyzing Estimate...
                            </>
                        ) : (
                            <>
                                <Sparkles size={24} /> Start AI Verification
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Results */}
            {results && (
                <div className="space-y-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                                    <FileText size={20} />
                                </div>
                                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Total Items</span>
                            </div>
                            <p className="text-4xl font-black text-slate-900">{results.totalItems}</p>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
                                    <CheckCircle size={20} />
                                </div>
                                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Verified</span>
                            </div>
                            <p className="text-4xl font-black text-green-600">{results.verified}</p>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
                                    <AlertTriangle size={20} />
                                </div>
                                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Warnings</span>
                            </div>
                            <p className="text-4xl font-black text-orange-600">{results.warnings}</p>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
                                    <X size={20} />
                                </div>
                                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Missing</span>
                            </div>
                            <p className="text-4xl font-black text-red-600">{results.missing}</p>
                        </div>
                    </div>

                    {/* Detailed Findings */}
                    <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black text-slate-900">AI Findings & Recommendations</h3>
                            <button className="flex items-center gap-2 bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all">
                                <Download size={18} /> Export Report
                            </button>
                        </div>

                        <div className="space-y-4">
                            {results.suggestions.map((item: any, i: number) => (
                                <div
                                    key={i}
                                    className={`p-6 rounded-2xl border-l-4 ${item.severity === 'high'
                                            ? 'bg-red-50/50 border-red-500'
                                            : item.severity === 'medium'
                                                ? 'bg-orange-50/50 border-orange-500'
                                                : 'bg-yellow-50/50 border-yellow-500'
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span
                                                    className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${item.type === 'missing'
                                                            ? 'bg-red-100 text-red-600'
                                                            : 'bg-orange-100 text-orange-600'
                                                        }`}
                                                >
                                                    {item.type}
                                                </span>
                                                <h4 className="font-black text-slate-900">{item.item}</h4>
                                            </div>
                                            <p className="text-xs text-slate-500 font-mono mb-2">Code: {item.code}</p>
                                            {item.message && (
                                                <p className="text-sm text-slate-600 font-medium">{item.message}</p>
                                            )}
                                        </div>
                                        <button className="bg-white px-4 py-2 rounded-xl text-sm font-bold text-blue-600 hover:bg-blue-50 transition-all">
                                            Add to Estimate
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => {
                                setFile(null);
                                setResults(null);
                            }}
                            className="flex-1 bg-slate-100 text-slate-700 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                        >
                            Upload New Estimate
                        </button>
                        <button className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                            Save Verified Estimate
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
