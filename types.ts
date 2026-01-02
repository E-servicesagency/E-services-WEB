
export type Language = 'en' | 'ar';

export interface Translation {
  [key: string]: {
    en: string;
    ar: string;
  };
}

export interface NavItem {
  id: string;
  label: { en: string; ar: string };
  path: string;
}

export interface PromptField {
  id: string;
  label: { en: string; ar: string };
  placeholder: { en: string; ar: string };
}
