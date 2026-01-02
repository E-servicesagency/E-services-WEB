
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../App';
import { generateBusinessAdvice } from '../geminiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAgent: React.FC = () => {
  const { t, lang } = useTranslation();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const systemInstruction = `You are the E-services Agency AI Business Agent. 
    Role: Professional Senior Business Consultant & Strategist.
    Expertise: Entrepreneurship, Business Development, Operations, Execution.
    Tone: Formal, Authoritative, Action-oriented.
    Instructions: Provide concise, high-impact business advice. Avoid generalities. Focus on execution frameworks and measurable results. Use ${lang === 'en' ? 'English' : 'Arabic'}. No emojis.`;

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await generateBusinessAdvice(input, systemInstruction);
      setMessages(prev => [...prev, { role: 'assistant', content: response || "Consultant unavailable." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection error. Please retry." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">{t('agentTitle')}</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">{t('agentDesc')}</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Capabilities Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-bold text-slate-900 border-b pb-2 mb-4">{t('agentCapabilities')}</h3>
          <ul className="space-y-3 text-sm text-slate-700">
            {[t('capability1'), t('capability2'), t('capability3'), t('capability4')].map((cap, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                {cap}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-lg border border-slate-200 flex flex-col h-[600px]">
          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-4 bg-slate-50 rounded-t-xl">
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center text-slate-400 italic">
                {t('chatPlaceholder')}
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-lg shadow-sm ${
                  m.role === 'user' ? 'bg-[#0D1B3E] text-white' : 'bg-white text-slate-800 border border-slate-200'
                }`}>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-lg border border-slate-200 animate-pulse text-slate-400 text-sm">
                  Consulting...
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('chatPlaceholder')}
              className="flex-grow bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgent;
