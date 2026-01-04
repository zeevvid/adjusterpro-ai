import React, { useEffect, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

export const FirebaseDebug = () => {
    const [status, setStatus] = useState<string>('Testing...');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const testConnection = async () => {
            try {
                // Try to write a test document
                await addDoc(collection(db, "debug_tests"), {
                    timestamp: new Date(),
                    test: true
                });
                setStatus('Connected & Writable');
            } catch (err: any) {
                console.error("Firebase Test Error:", err);
                setStatus('Connection Failed');
                setError(err.message || 'Unknown error');
            }
        };

        testConnection();
    }, []);

    if (status === 'Connected & Writable') return null; // Hide if all good

    return (
        <div className="fixed bottom-4 right-4 max-w-sm bg-slate-900 text-white p-6 rounded-2xl shadow-2xl z-50 border-l-4 border-red-500 animate-in slide-in-from-right">
            <h3 className="font-bold text-lg mb-2">Firebase Debugger</h3>
            <p className="font-mono text-sm mb-2">Status: <span className={status.includes('Failed') ? 'text-red-400' : 'text-green-400'}>{status}</span></p>
            {error && (
                <div className="bg-white/10 p-3 rounded-lg overflow-auto max-h-32">
                    <p className="text-xs font-mono text-red-200">{error}</p>
                </div>
            )}
            <p className="text-xs text-slate-400 mt-4">
                If you see "Missing or insufficient permissions", go to Firebase Console {'>'} Firestore {'>'} Rules and allow read/write.
            </p>
        </div>
    );
};
