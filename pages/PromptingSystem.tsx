
import React, { useState } from 'react';
import { useTranslation } from '../App';
import { generateProfessionalPrompt } from '../geminiService';

const PromptingSystem: React.FC = () => {
  const { t, lang } = useTranslation();
  const [mode, setMode] = useState<'short' | 'advanced'>('advanced');
  const [formData, setFormData] = useState({
    role: '',
    context: '',
    objective: '',
    constraints: '',
    format: ''
  });
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateProfessionalPrompt(formData, lang);
      setGeneratedPrompt(result || "");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    alert(lang === 'en' ? 'Prompt copied!' : 'تم نسخ التلقين!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">{t('promptingTitle')}</h1>
        <div className="flex justify-center p-1 bg-slate-100 rounded-lg inline-flex mx-auto">
          <button
            onClick={() => setMode('short')}
            className={`px-8 py-2 rounded-md text-sm font-bold transition-all ${mode === 'short' ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
          >
            {t('shortPrompt')}
          </button>
          <button
            onClick={() => setMode('advanced')}
            className={`px-8 py-2 rounded-md text-sm font-bold transition-all ${mode === 'advanced' ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
          >
            {t('advancedPrompt')}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-600 rounded"></span>
              {mode === 'short' ? t('shortPrompt') : t('advancedPrompt')}
            </h2>
            
            <div className="space-y-4">
              {mode === 'advanced' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">{t('roleLabel')}</label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Senior Product Manager"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">{t('contextLabel')}</label>
                    <textarea
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      placeholder="Current business stage, target audience..."
                      value={formData.context}
                      onChange={(e) => setFormData({...formData, context: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">{t('objectiveLabel')}</label>
                    <textarea
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      placeholder="Specific result you want to achieve..."
                      value={formData.objective}
                      onChange={(e) => setFormData({...formData, objective: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">{t('constraintsLabel')}</label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. No jargon, under 500 words..."
                      value={formData.constraints}
                      onChange={(e) => setFormData({...formData, constraints: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">{t('formatLabel')}</label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Markdown table, bullet points..."
                      value={formData.format}
                      onChange={(e) => setFormData({...formData, format: e.target.value})}
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">{t('shortPromptDesc')}</p>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">{t('objectiveLabel')}</label>
                    <textarea
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Describe the task briefly..."
                      value={formData.objective}
                      onChange={(e) => setFormData({...formData, objective: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-[#0D1B3E] hover:bg-slate-800 text-white font-bold py-4 rounded transition-all mt-4 disabled:opacity-50"
              >
                {loading ? 'Building...' : t('generatePrompt')}
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col">
           <div className="bg-[#f1f5f9] p-8 rounded-xl border-2 border-dashed border-slate-300 flex-grow relative">
              <div className="absolute top-4 right-4 flex gap-2">
                 {generatedPrompt && (
                    <button
                      onClick={copyToClipboard}
                      className="bg-white text-slate-600 border border-slate-200 px-3 py-1 rounded text-xs font-bold hover:bg-slate-50 flex items-center gap-1 shadow-sm"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      {t('copyPrompt')}
                    </button>
                 )}
              </div>
              
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Generated System Prompt</h4>
              {generatedPrompt ? (
                <div className="text-slate-800 text-sm font-mono leading-relaxed whitespace-pre-wrap">
                  {generatedPrompt}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center py-20">
                  <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  <p className="text-xs uppercase tracking-widest">Awaiting Generation Parameters</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default PromptingSystem;
