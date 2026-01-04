import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, ArrowRight, ShieldAlert } from 'lucide-react';
import { PublicIntakeData } from '../../types';

interface StepProps {
    data: PublicIntakeData;
    updateData: (updates: Partial<PublicIntakeData>) => void;
    onNext: () => void;
}

interface Message {
    id: string;
    sender: 'ai' | 'user';
    text: string;
    type?: 'text' | 'options' | 'date';
    options?: string[];
}

export const StepDamageChat: React.FC<StepProps> = ({ data, updateData, onNext }) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'ai', text: 'Hi, I\'m here to help you get a fair estimate. First, tell us what happened.', type: 'text' },
        { id: '2', sender: 'ai', text: 'What kind of damage did you have?', type: 'options', options: ['Roof', 'Water / Leak', 'Hurricane / Hail', 'Fire', 'Other'] }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const processResponse = (text: string) => {
        // Add user response
        const newMessages = [...messages, { id: Date.now().toString(), sender: 'user' as const, text }];
        setMessages(newMessages);
        setInputText('');

        // AI thinks...
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            const lastAiMessage = messages.filter(m => m.sender === 'ai').pop();
            const lastAiText = lastAiMessage?.text.toLowerCase() || '';

            if (lastAiText.includes('kind of damage')) {
                updateData({ damageType: text });
                setMessages(prev => [
                    ...prev,
                    { id: Date.now().toString(), sender: 'ai', text: `I see. ${text} damage can be tricky. When did this happen?`, type: 'text' }
                ]);
            } else if (lastAiText.includes('when did this happen')) {
                updateData({ lossDate: text });
                setMessages(prev => [
                    ...prev,
                    { id: Date.now().toString(), sender: 'ai', text: 'Got it. Is the damage visible right now?', type: 'options', options: ['Yes', 'No', 'Not sure'] }
                ]);
            } else if (lastAiText.includes('visible right now')) {
                updateData({ damageDetails: `Visible: ${text}` });
                setMessages(prev => [
                    ...prev,
                    { id: Date.now().toString(), sender: 'ai', text: 'Understood. One last thing - did you already call the insurance company?', type: 'options', options: ['Yes', 'No'] }
                ]);
            } else if (lastAiText.includes('insurance company')) {
                setMessages(prev => [
                    ...prev,
                    { id: Date.now().toString(), sender: 'ai', text: 'Okay, thanks. Let\'s check your location context next.', type: 'text' }
                ]);
                setTimeout(onNext, 1500);
            }
        }, 800);
    };

    const handleOptionClick = (option: string) => {
        processResponse(option);
    };

    const handleSend = () => {
        if (!inputText.trim()) return;
        processResponse(inputText);
    };

    return (
        <div className="flex flex-col h-full max-w-2xl mx-auto w-full bg-white md:rounded-3xl md:shadow-xl md:my-8 overflow-hidden md:border border-slate-100">
            <div className="bg-slate-900 p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-full">
                        <Bot size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold">AdjusterPro AI</h3>
                        <p className="text-xs text-blue-200">Online • Typically replies instantly</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-4 ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'}`}>
                            <p className="leading-relaxed">{msg.text}</p>

                            {msg.type === 'options' && msg.options && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {msg.options.map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => handleOptionClick(opt)}
                                            disabled={messages.indexOf(msg) !== messages.length - 1}
                                            className="bg-slate-100 hover:bg-white border border-slate-200 hover:border-blue-300 text-slate-700 text-sm font-bold py-2 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white text-slate-400 p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-xs font-bold animate-pulse">
                            AI is typing...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
                <div className="relative">
                    <input
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        placeholder="Type your answer..."
                        className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                    />
                    <button
                        onClick={handleSend}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
