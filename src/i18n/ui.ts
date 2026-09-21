// Minimal two-locale dictionary. EN pages live at /, FR pages at /fr/.
// Header/Footer read `nav` + `footer` for the active locale.

export type Lang = 'en' | 'fr';

export interface NavItem {
  label: string;
  href: string;
}

interface Strings {
  nav: NavItem[];
  cta: { label: string; href: string };
  langLabel: string;
  altLangHref: (path: string) => string;
  footer: {
    tagline: string;
    rights: string;
    contact: string;
    privacy: NavItem;
  };
}

const CONTACT_EN = '/contact';
const CONTACT_FR = '/fr/contact';

export const ui: Record<Lang, Strings> = {
  en: {
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Training', href: '/formations' },
      { label: 'AI Adoption', href: '/accompagnement' },
      { label: 'Expertise', href: '/expertise' },
      { label: 'Perspective', href: '/perspective' },
      { label: 'About', href: '/about' },
    ],
    cta: { label: 'Talk to us', href: CONTACT_EN },
    langLabel: 'FR',
    altLangHref: (path) => '/fr' + (path === '/' ? '' : path),
    footer: {
      tagline: 'AI consulting & engineering, built on 35+ years of high-stakes engineering.',
      rights: 'All rights reserved.',
      contact: 'Contact us',
      privacy: { label: 'Privacy', href: '/privacy' },
    },
  },
  fr: {
    nav: [
      { label: 'Accueil', href: '/fr' },
      { label: 'Services', href: '/fr/services' },
      { label: 'Formations', href: '/fr/formations' },
      { label: 'Accompagnement', href: '/fr/accompagnement' },
      { label: 'Expertise', href: '/fr/expertise' },
      { label: 'Point de vue', href: '/fr/perspective' },
      { label: 'À propos', href: '/fr/about' },
    ],
    cta: { label: 'Nous contacter', href: CONTACT_FR },
    langLabel: 'EN',
    altLangHref: (path) => (path.replace(/^\/fr/, '') || '/'),
    footer: {
      tagline: "Conseil & ingénierie IA, fondés sur 35+ ans d'ingénierie à fort enjeu.",
      rights: 'Tous droits réservés.',
      contact: 'Nous contacter',
      privacy: { label: 'Confidentialité', href: '/fr/privacy' },
    },
  },
};

/*
  Article dates. Kept here with the rest of the locale-specific strings so the
  two listing pages and the two article pages share one definition instead of
  re-declaring an Intl formatter each (Gemini review, PR #17).
*/
const dateFormatters: Record<Lang, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  fr: new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
};

export function formatDate(date: Date, lang: Lang): string {
  return dateFormatters[lang].format(date);
}

export const SITE = {
  name: 'NitroX Consulting',
  domain: 'nitroxconsulting.com',
  linkedin: 'https://www.linkedin.com/company/nitrox-consulting',
  location: 'Montpellier, France',
  contactEndpoint: 'https://ls.nitroxconsulting.com/contact',
};
