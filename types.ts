export enum LogoStyle {
  MINIMALIST = 'Minimalist',
  CYBERPUNK = 'Cyberpunk',
  CORPORATE = 'Corporate',
  ABSTRACT = 'Abstract',
  MASCOT = 'Mascot',
  TYPOGRAPHIC = 'Typographic',
  GEOMETRIC = 'Geometric'
}

export interface LogoParams {
  companyName: string;
  domain: string;
  style: LogoStyle;
  primaryColor: string;
  additionalDetails: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}
