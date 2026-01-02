
import React from 'react';
import { useTranslation } from '../App';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">{t('navContact')}</h1>
        <p className="text-xl text-slate-600 mb-12">
          Ready to scale your executive performance? Start a conversation with our Business Agent or request a custom implementation.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left rtl:text-right mb-16">
          <div className="p-8 border border-slate-200 rounded-xl hover:border-blue-500 transition-colors">
            <h3 className="font-bold text-lg mb-4">Direct Consulting</h3>
            <p className="text-sm text-slate-500 mb-6">Inquire about professional prompt engineering or AI integration for your team.</p>
            <a href="mailto:office@eservicesagency.com" className="text-blue-600 font-bold hover:underline">office@eservicesagency.com</a>
          </div>
          <div className="p-8 border border-slate-200 rounded-xl hover:border-blue-500 transition-colors">
            <h3 className="font-bold text-lg mb-4">AI Agent Support</h3>
            <p className="text-sm text-slate-500 mb-6">Experience our authority-driven business agent for immediate tactical advice.</p>
            <button className="bg-[#0D1B3E] text-white px-6 py-2 rounded text-sm font-bold shadow-md">Launch Agent</button>
          </div>
        </div>

        <div className="bg-slate-950 text-white p-12 rounded-2xl shadow-2xl relative overflow-hidden">
           <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4">Become an Authority-Driven Business</h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">The future of business is not just about using AI, but about controlling it through professional strategy.</p>
              <button className="bg-blue-600 hover:bg-blue-700 px-12 py-4 rounded-full font-bold text-lg transition-all shadow-xl">
                {t('getStarted')}
              </button>
           </div>
           <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600 opacity-10 rounded-full blur-3xl"></div>
           <div className="absolute -top-20 -left-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
