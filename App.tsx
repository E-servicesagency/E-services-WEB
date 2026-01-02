
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Language } from './types';
import { translations } from './translations';

// Pages
import Home from './pages/Home';
import AIAgent from './pages/AIAgent';
import PromptingSystem from './pages/PromptingSystem';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation must be used within LanguageProvider");
  return context;
};

const Header = () => {
  const { lang, setLang, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: t('navHome') },
    { path: '/agent', label: t('navAIAgent') },
    { path: '/prompting', label: t('navPrompting') },
    { path: '/services', label: t('navServices') },
    { path: '/about', label: t('navAbout') },
    { path: '/contact', label: t('navContact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0D1B3E] text-white shadow-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
             <Link to="/" className="text-xl font-bold tracking-tight">
                {t('brandName').toUpperCase()}
             </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium hover:text-blue-400 transition-colors ${
                  location.pathname === item.path ? 'text-blue-400' : 'text-slate-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="bg-slate-800 px-4 py-2 rounded text-xs font-bold border border-slate-700 hover:bg-slate-700"
            >
              {lang === 'en' ? 'العربية' : 'ENGLISH'}
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-4">
             <button
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="text-xs font-bold px-2 py-1 border border-slate-700 rounded"
              >
                {lang === 'en' ? 'AR' : 'EN'}
              </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0D1B3E] border-t border-slate-700 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-slate-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#0D1B3E] text-slate-400 py-12 px-4 border-t border-slate-700">
      <div className="max-w-7xl mx-auto text-center md:text-left rtl:md:text-right grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-4">{t('brandName')}</h3>
          <p className="text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
            {t('missionStatement')}
          </p>
        </div>
        <div className="flex flex-col space-y-2">
           <Link to="/services" className="hover:text-white transition-colors">{t('navServices')}</Link>
           <Link to="/about" className="hover:text-white transition-colors">{t('navAbout')}</Link>
           <Link to="/contact" className="hover:text-white transition-colors">{t('navContact')}</Link>
        </div>
        <div className="text-sm">
          <p className="text-white mb-2">© {new Date().getFullYear()} {t('brandName')}</p>
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');

  const t = (key: keyof typeof translations): string => {
    return translations[key][lang];
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/agent" element={<AIAgent />} />
              <Route path="/prompting" element={<PromptingSystem />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </LanguageProvider>
  );
}
