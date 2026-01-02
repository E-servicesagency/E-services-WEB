
import React from 'react';
import { useTranslation } from '../App';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="space-y-12">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-6">{t('navAbout')}</h1>
          <p className="text-xl text-slate-600 leading-relaxed italic">
            "We are not just a tool provider. We are your partner in business execution."
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12">
           <div className="bg-[#0D1B3E] text-white p-8 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-4 border-b border-slate-600 pb-2 uppercase tracking-widest text-blue-400">Our Mission</h2>
              <p className="text-sm leading-relaxed opacity-90">
                To bridge the gap between AI capabilities and actual business results through professional, consultant-level strategy and execution frameworks.
              </p>
           </div>
           <div className="bg-white text-slate-900 p-8 rounded-xl shadow-lg border border-slate-200">
              <h2 className="text-xl font-bold mb-4 border-b border-slate-100 pb-2 uppercase tracking-widest text-blue-600">Our Vision</h2>
              <p className="text-sm leading-relaxed text-slate-600">
                To be the leading global authority in AI-driven business consulting, empowering a new generation of high-efficiency entrepreneurs.
              </p>
           </div>
        </section>

        <section className="bg-slate-50 p-12 rounded-xl text-center border border-slate-200">
           <h3 className="text-2xl font-bold mb-6">Expertise Driven Results</h3>
           <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
             At E-services Agency, every AI interaction is grounded in decades of business development principles. We focus on the "Why" and "How" of execution.
           </p>
           <div className="flex justify-center gap-12 grayscale opacity-50">
             <div className="font-bold text-lg">STRATEGY</div>
             <div className="font-bold text-lg">EXECUTION</div>
             <div className="font-bold text-lg">AI-SCALE</div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default About;
