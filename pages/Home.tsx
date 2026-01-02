
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../App';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative bg-[#0D1B3E] text-white pt-32 pb-40 px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 Q 50 0 100 100" fill="none" stroke="white" strokeWidth="0.1" />
             <path d="M0 50 Q 50 100 100 50" fill="none" stroke="white" strokeWidth="0.1" />
           </svg>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
            {t('heroHeadline')}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12">
            {t('heroSubheadline')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/agent" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded shadow-xl transition-all">
              {t('getStarted')}
            </Link>
            <Link to="/services" className="bg-transparent border border-white hover:bg-white hover:text-[#0D1B3E] text-white font-bold py-4 px-10 rounded transition-all">
              {t('viewServices')}
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
        <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">{t('navAIAgent')}</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {t('agentDesc')}
            </p>
          </div>
          <Link to="/agent" className="text-blue-600 font-bold hover:underline">{t('getStarted')} →</Link>
        </div>

        <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-slate-100 text-slate-800 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">{t('navPrompting')}</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {t('shortPromptDesc')}
            </p>
          </div>
          <Link to="/prompting" className="text-blue-600 font-bold hover:underline">{t('getStarted')} →</Link>
        </div>
      </section>

      {/* Authority Section */}
      <section className="bg-slate-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{t('servicesTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left rtl:text-right mt-12">
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 underline underline-offset-8 decoration-blue-500">{t('service1Title')}</h4>
              <p className="text-sm text-slate-600">{t('service1Desc')}</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 underline underline-offset-8 decoration-blue-500">{t('service2Title')}</h4>
              <p className="text-sm text-slate-600">{t('service2Desc')}</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 underline underline-offset-8 decoration-blue-500">{t('service3Title')}</h4>
              <p className="text-sm text-slate-600">{t('service3Desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
