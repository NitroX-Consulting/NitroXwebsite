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
      { label: 'Expertise', href: '/expertise' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    cta: { label: 'Talk to us', href: CONTACT_EN },
    langLabel: 'FR',
    altLangHref: (path) => '/fr' + (path === '/' ? '' : path),
    footer: {
      tagline: 'AI & IT consulting, built on 20+ years of capital-markets engineering.',
      rights: 'All rights reserved.',
      privacy: { label: 'Privacy', href: '/privacy' },
    },
  },
  fr: {
    nav: [
      { label: 'Accueil', href: '/fr' },
      { label: 'Services', href: '/fr/services' },
      { label: 'Expertise', href: '/fr/expertise' },
      { label: 'À propos', href: '/fr/about' },
      { label: 'Contact', href: '/fr/contact' },
    ],
    cta: { label: 'Nous contacter', href: CONTACT_FR },
    langLabel: 'EN',
    altLangHref: (path) => (path.replace(/^\/fr/, '') || '/'),
    footer: {
      tagline: "Conseil en IA & IT, fondé sur 20+ ans d'ingénierie des marchés de capitaux.",
      rights: 'Tous droits réservés.',
      privacy: { label: 'Confidentialité', href: '/fr/privacy' },
    },
  },
};

export const SITE = {
  name: 'NitroX Consulting',
  domain: 'nitroxconsulting.com',
  email: 'contact@nitroxconsulting.com',
  linkedin: 'https://www.linkedin.com/company/nitrox-consulting',
  location: 'Montpellier, France',
  contactEndpoint: 'https://ls.nitroxconsulting.com/contact',
};
