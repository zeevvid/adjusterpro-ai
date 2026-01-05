import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, Home, Zap, DollarSign, Sparkles, TrendingUp, Search, User } from 'lucide-react';
import { storage } from '../../services/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

interface LandingPageProps {
    onStart: () => void;
    onStaffLogin: () => void;
}

// Video background configuration - Firebase Storage path
// Try these common paths (uncomment the one that matches your Firebase Storage structure):
// If the file is in the root: '202601041855.mp4'
// If it's in a videos folder: 'videos/202601041855.mp4'
// If it's in a different folder, use: 'folder-name/202601041855.mp4'
const VIDEO_STORAGE_PATH = '202601041855.mp4';

// Alternative paths to try if the first one fails
const ALTERNATIVE_PATHS = [
    'videos/202601041855.mp4',
    'background/202601041855.mp4',
    'assets/202601041855.mp4',
];

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onStaffLogin }) => {
    console.log('🎬 LandingPage component rendering');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    // Log component mount
    useEffect(() => {
        console.log('🎬 LandingPage component mounted (useEffect)');
        console.log('📦 Firebase storage instance:', storage);
        console.log('📦 Storage type:', typeof storage);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const refId = params.get('ref');
        if (refId) {
            sessionStorage.setItem('adjuster_ref_id', refId);
            console.log('Attribution captured:', refId);
        }
    }, []);

    // Fetch video URL from Firebase Storage
    useEffect(() => {
        console.log('🎥 Video loading useEffect triggered');
        
        // Verify storage is available
        if (!storage) {
            console.error('❌ Firebase storage is not initialized!');
            return;
        }
        
        try {
            console.log('🔍 Storage bucket:', storage.app?.options?.storageBucket || 'Not available');
        } catch (e) {
            console.warn('⚠️ Could not access storage bucket info:', e);
        }
        
        const loadVideo = async () => {
            console.log('🚀 Starting video load process...');
            // Try the primary path first
            const pathsToTry = [VIDEO_STORAGE_PATH, ...ALTERNATIVE_PATHS];
            console.log('📂 Paths to try:', pathsToTry);
            
            for (const path of pathsToTry) {
                try {
                    console.log(`🔄 Attempting to load video from Firebase Storage: "${path}"`);
                    const videoRef = ref(storage, path);
                    console.log('📎 Video reference created');
                    const url = await getDownloadURL(videoRef);
                    console.log('✅ Video URL loaded successfully from path:', path);
                    console.log('🔗 Video URL:', url);
                    setVideoUrl(url);
                    return; // Success, exit the function
                } catch (error: any) {
                    console.warn(`❌ Failed to load video from path "${path}":`, error?.message || error);
                    if (error?.code) {
                        console.warn('Error code:', error.code);
                        // Common Firebase Storage error codes
                        if (error.code === 'storage/object-not-found') {
                            console.error(`File not found at path: ${path}`);
                        } else if (error.code === 'storage/unauthorized') {
                            console.error('❌ UNAUTHORIZED: Firebase Storage rules may be blocking access.');
                            console.error('Please update your Firebase Storage rules to allow public read access.');
                            console.error('Go to: Firebase Console > Storage > Rules');
                            console.error('Add this rule: match /{allPaths=**} { allow read: if true; }');
                        } else if (error.code === 'storage/permission-denied') {
                            console.error('❌ PERMISSION DENIED: Check Firebase Storage rules.');
                        }
                    }
                    // Continue to next path
                }
            }
            
            // If all paths failed
            console.error('❌ Could not load video from any of the attempted paths:', pathsToTry);
            console.error('Please check:');
            console.error('1. The file exists in Firebase Storage');
            console.error('2. The file path is correct (check Firebase Console)');
            console.error('3. Firebase Storage rules allow public read access');
        };

        loadVideo().catch((error) => {
            console.error('💥 Fatal error in loadVideo:', error);
        });
    }, []);

    // Handle video playback when URL is loaded
    useEffect(() => {
        if (videoUrl) {
            const videoElement = document.querySelector('video') as HTMLVideoElement;
            if (videoElement) {
                // Ensure video plays even if autoplay is blocked
                const playPromise = videoElement.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('✅ Video playback started successfully');
                        })
                        .catch((error) => {
                            console.warn('⚠️ Autoplay was prevented:', error);
                            console.log('Video will play when user interacts with the page');
                        });
                }
            }
        }
    }, [videoUrl]);

    return (
        <div className="min-h-screen bg-slate-50 overflow-hidden font-inter selection:bg-blue-100 selection:text-blue-900 relative">
            {/* Video Background */}
            <div className="fixed inset-0 z-0">
                {videoUrl ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ zIndex: 0 }}
                        onLoadedData={(e) => {
                            console.log('✅ Video loaded and ready to play');
                            console.log('Video dimensions and metadata loaded');
                            const video = e.currentTarget;
                            // Try to play explicitly
                            video.play().catch((err) => {
                                console.warn('Play attempt failed:', err);
                            });
                        }}
                        onCanPlay={(e) => {
                            console.log('✅ Video can start playing');
                            const video = e.currentTarget;
                            // Ensure it plays
                            video.play().catch((err) => {
                                console.warn('Play on canPlay failed:', err);
                            });
                        }}
                        onPlay={() => console.log('▶️ Video started playing')}
                        onError={(e) => {
                            console.error('❌ Video playback error:', e);
                            const video = e.currentTarget;
                            console.error('Error code:', video.error?.code);
                            console.error('Error message:', video.error?.message);
                            if (video.error) {
                                console.error('Full error details:', {
                                    code: video.error.code,
                                    message: video.error.message,
                                });
                            }
                        }}
                    >
                        <source src={videoUrl} type="video/mp4" />
                        {/* Fallback for browsers that don't support video */}
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="absolute inset-0 bg-slate-50"></div>
                )}
                {/* Overlay to ensure content readability - very light overlay to show video */}
                <div className="absolute inset-0 bg-slate-50/20 backdrop-blur-[0.5px]" style={{ zIndex: 1 }}></div>
            </div>

            {/* Dynamic Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-[1]">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/20 premium-blur rounded-full animate-float"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/20 premium-blur rounded-full animate-float" style={{ animationDelay: '-2s' }}></div>
            </div>

            {/* Header */}
            <header className="relative z-[100] flex justify-between items-center p-8 max-w-7xl mx-auto">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                        <ShieldCheck size={28} />
                    </div>
                    <span className="font-black text-2xl tracking-tighter text-slate-900 uppercase">AdjusterPro <span className="text-blue-600">AI</span></span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={onStaffLogin}
                        className="group flex items-center gap-3 bg-white border border-slate-200 pl-4 pr-2 py-2 rounded-2xl hover:border-blue-500 transition-all shadow-sm hover:shadow-lg active:scale-95"
                    >
                        <span className="text-[10px] font-black text-slate-400 group-hover:text-blue-600 uppercase tracking-widest transition-colors">Sign In</span>
                        <div className="bg-slate-100 p-2 rounded-xl text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                            <User size={18} />
                        </div>
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <main className="relative z-[100] max-w-7xl mx-auto px-6 pt-12 md:pt-24 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left Side: Content */}
                <div className="text-left animate-slide-up">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest mb-10 shadow-xl shadow-blue-500/20">
                        <Sparkles size={14} className="animate-pulse" />
                        <span>AI-Powered Claims Intelligence</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tightest mb-8 leading-[0.9] mix-blend-multiply">
                        Find out what your claim is <span className="text-gradient">really worth.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-xl leading-relaxed font-medium">
                        Storm, water, fire, or roof damage? Our proprietary AI estimates your potential payout — <span className="text-slate-900 font-bold">before you talk to insurance.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={onStart}
                            className="bg-blue-600 text-white text-xl font-black px-12 py-7 rounded-[28px] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 hover:-translate-y-1.5 flex items-center justify-center gap-4 group"
                        >
                            Calculate My Damage <ArrowRight size={28} className="group-hover:translate-x-1.5 transition-transform" />
                        </button>
                    </div>

                    <div className="mt-12 flex flex-wrap gap-8 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-2.5"><div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div> No Signup</span>
                        <span className="flex items-center gap-2.5"><div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div> No Commitment</span>
                        <span className="flex items-center gap-2.5"><div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div> 100% Free</span>
                    </div>
                </div>

                {/* Right Side: Visual Asset */}
                <div className="relative hidden lg:block animate-premium-reveal">
                    {/* Main Visual Card */}
                    <div className="glass-card rounded-[48px] p-10 border border-white/50 shadow-2xl relative z-20">
                        <div className="flex justify-between items-center mb-10">
                            <div className="space-y-1">
                                <h3 className="font-black text-2xl text-slate-900">AI Recovery Model</h3>
                                <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Analysis v4.28</p>
                            </div>
                            <div className="bg-green-100 text-green-600 px-4 py-2 rounded-2xl font-black text-xs">
                                +34% AVG UPLIFT
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-slate-400 font-bold text-xs uppercase">Carrier Estimate</span>
                                    <span className="text-slate-900 font-black text-xl">$18,400</span>
                                </div>
                                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-400 w-[40%] rounded-full"></div>
                                </div>
                            </div>

                            <div className="bg-blue-600 p-8 rounded-[36px] shadow-2xl shadow-blue-500/30 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-end mb-4">
                                        <span className="text-blue-100 font-bold text-xs uppercase tracking-widest leading-none">AdjusterPro AI Forecast</span>
                                        <TrendingUp size={24} className="text-blue-300" />
                                    </div>
                                    <div className="text-5xl font-black mb-2">$32,850</div>
                                    <p className="text-blue-200 text-sm font-bold">Recommended Settlement Goal</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-100 flex gap-6 justify-center grayscale opacity-50">
                            <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                            <div className="w-24 h-4 bg-slate-200 rounded-full my-auto"></div>
                        </div>
                    </div>

                    {/* Floating Accents */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-[40px] shadow-2xl z-10 animate-float flex items-center justify-center border border-slate-100" style={{ animationDelay: '-1s' }}>
                        <div className="text-center">
                            <div className="text-blue-600 font-black text-3xl mb-1">98%</div>
                            <div className="text-slate-400 font-bold text-[8px] uppercase tracking-widest">Accuracy</div>
                        </div>
                    </div>

                    <div className="absolute -bottom-12 -left-8 w-56 h-32 glass-card rounded-[32px] z-30 animate-float p-6" style={{ animationDelay: '-3s' }}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                                <Search size={20} />
                            </div>
                            <span className="text-slate-900 font-black text-xs uppercase leading-tight">Scanning Policy...</span>
                        </div>
                        <div className="space-y-2">
                            <div className="h-1.5 bg-blue-200 rounded-full w-full"></div>
                            <div className="h-1.5 bg-blue-100 rounded-full w-[60%]"></div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Partner Excellence Section */}
            <section className="relative z-[100] py-24 px-6 bg-slate-900 text-white overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                    <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-10"></div>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 relative z-10">
                        <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest border border-blue-500/20">
                            Professional Ecosystem
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black leading-tight">
                            Built for the next generation of <span className="text-blue-400">Public Adjusters.</span>
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
                            Scale your firm with AI-driven damage assessments, automated lead generation, and professional scope intelligence. Stop scouring, start settling.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4">
                            {[
                                { title: 'Lead Locking', desc: 'Secure referral attribution on every claim.' },
                                { title: 'AI Scoping', desc: 'Generate precise damage reports in seconds.' },
                                { title: 'Tiered Growth', desc: 'Flexible plans built for solo PAs or Agencies.' },
                                { title: 'Instant Billing', desc: 'Automated conversion fee handling.' }
                            ].map((item) => (
                                <div key={item.title} className="space-y-2 group">
                                    <div className="flex items-center gap-2 text-blue-400 font-black text-sm uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                                        <ArrowRight size={16} /> {item.title}
                                    </div>
                                    <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={onStart}
                                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                            >
                                Enter Homeowner Hub
                            </button>
                            <button
                                onClick={onStaffLogin}
                                className="bg-white/10 text-white border border-white/10 px-8 py-4 rounded-2xl font-black text-sm hover:bg-white/20 transition-all backdrop-blur-md active:scale-95"
                            >
                                Adjuster Login
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[40px] p-2 border border-white/10 shadow-3xl">
                            <div className="bg-slate-900 rounded-[38px] overflow-hidden aspect-video relative">
                                {/* Simulated Partner Dashboard UI */}
                                <div className="absolute inset-0 p-8 space-y-6">
                                    <div className="flex justify-between items-center text-white/40">
                                        <div className="w-24 h-4 bg-white/5 rounded-full"></div>
                                        <div className="flex gap-2">
                                            <div className="w-4 h-4 rounded-full bg-white/5"></div>
                                            <div className="w-4 h-4 rounded-full bg-white/5"></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-24 bg-blue-600/10 rounded-2xl border border-blue-500/20 flex flex-col justify-center px-6">
                                            <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Active Leads</span>
                                            <span className="text-3xl font-black text-white">42</span>
                                        </div>
                                        <div className="h-24 bg-indigo-600/10 rounded-2xl border border-indigo-500/20 flex flex-col justify-center px-6">
                                            <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">Global Payout</span>
                                            <span className="text-3xl font-black text-white">$12.4M</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-10 bg-white/5 rounded-xl w-full"></div>
                                        <div className="h-10 bg-white/5 rounded-xl w-[80%]"></div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full animate-bounce-subtle shadow-xl shadow-blue-500/40">
                                    Partner Platform v2.0
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Footer */}
            <footer className="relative z-[100] bg-slate-50 border-t border-slate-200 py-20 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="space-y-6 max-w-sm">
                        <div className="flex items-center gap-2">
                            <div className="bg-slate-900 p-2 rounded-lg text-white">
                                <ShieldCheck size={20} />
                            </div>
                            <span className="font-black text-xl tracking-tighter text-slate-900 uppercase underline decoration-blue-500 decoration-4">AdjusterPro AI</span>
                        </div>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">
                            A informational platform for homeowners to estimate claim value. Not a public adjuster. Not legal advice. AI estimations for educational purposes only.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</h4>
                            <ul className="space-y-2 text-slate-600 text-sm font-bold">
                                <li className="hover:text-blue-600 cursor-pointer">Damage Calculator</li>
                                <li className="hover:text-blue-600 cursor-pointer">Policy Check</li>
                                <li className="hover:text-blue-600 cursor-pointer">Claim History</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Company</h4>
                            <ul className="space-y-2 text-slate-600 text-sm font-bold">
                                <li className="hover:text-blue-600 cursor-pointer">Partner Program</li>
                                <li className="hover:text-blue-600 cursor-pointer">Legal Disclaimers</li>
                                <li className="hover:text-blue-600 cursor-pointer">Contact</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform</h4>
                            <ul className="space-y-2 text-slate-600 text-sm font-bold">
                                <li onClick={onStaffLogin} className="hover:text-blue-600 cursor-pointer flex items-center gap-2">
                                    Admin Login <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                                </li>
                                <li className="text-slate-300 pointer-events-none">Staff GPS (Internal)</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between gap-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <span>© 2024 AdjusterPro AI Intelligence</span>
                    <div className="flex gap-8">
                        <span className="hover:text-slate-600 cursor-pointer">Privacy</span>
                        <span className="hover:text-slate-600 cursor-pointer">Terms</span>
                    </div>
                </div>
            </footer>

            <style>{`
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            display: flex;
            width: fit-content;
            animation: marquee 40s linear infinite;
        }
        .tracking-tightest { letter-spacing: -0.05em; }
      `}</style>
        </div>
    );
};
