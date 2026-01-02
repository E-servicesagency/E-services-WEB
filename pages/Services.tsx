
import React from 'react';
import { useTranslation } from '../App';

const Services: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    { title: t('service1Title'), desc: t('service1Desc'), icon: "🎯" },
    { title: t('service2Title'), desc: t('service2Desc'), icon: "📈" },
    { title: t('service3Title'), desc: t('service3Desc'), icon: "⚡" },
    { title: t('capability4'), desc: t('heroSubheadline'), icon: "🏗️" },
  ];

  return (
    <div className="py-20 bg-slate-50 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{t('servicesTitle')}</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
             E-services Agency provides professional consulting services built for the AI era.
             Our focus is on authority, strategy, and measurable outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-white p-10 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all">
               <div className="text-3xl mb-4">{s.icon}</div>
               <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
               <p className="text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
