/**
 * Metadata for the 20 supported locales.
 * `font` indicates the script-specific class to apply on <body>.
 */
export type LocaleCode =
  | 'es' | 'en' | 'zh' | 'hi' | 'fr' | 'ar' | 'bn' | 'pt' | 'ru' | 'ur'
  | 'id' | 'de' | 'ja' | 'mr' | 'te' | 'tr' | 'ta' | 'vi' | 'tl' | 'ko';

export interface LocaleMeta {
  code: LocaleCode;
  /** Native name shown in the language switcher. */
  nativeName: string;
  /** English name (for tooltips / aria). */
  englishName: string;
  dir: 'ltr' | 'rtl';
  /** Body class controlling the font stack. */
  font: 'latin' | 'cjk-sc' | 'cjk-jp' | 'cjk-kr' | 'arabic' | 'urdu' | 'devanagari' | 'bengali' | 'tamil' | 'telugu';
  /** BCP-47 tag for `Intl.NumberFormat` & `<html lang>`. */
  bcp47: string;
}

export const DEFAULT_LOCALE: LocaleCode = 'es';

export const LOCALES: LocaleMeta[] = [
  { code: 'es', nativeName: 'Español',          englishName: 'Spanish',      dir: 'ltr', font: 'latin',       bcp47: 'es' },
  { code: 'en', nativeName: 'English',          englishName: 'English',      dir: 'ltr', font: 'latin',       bcp47: 'en' },
  { code: 'zh', nativeName: '中文',              englishName: 'Chinese',      dir: 'ltr', font: 'cjk-sc',      bcp47: 'zh-Hans' },
  { code: 'hi', nativeName: 'हिन्दी',             englishName: 'Hindi',        dir: 'ltr', font: 'devanagari',  bcp47: 'hi' },
  { code: 'fr', nativeName: 'Français',         englishName: 'French',       dir: 'ltr', font: 'latin',       bcp47: 'fr' },
  { code: 'ar', nativeName: 'العربية',           englishName: 'Arabic',       dir: 'rtl', font: 'arabic',      bcp47: 'ar' },
  { code: 'bn', nativeName: 'বাংলা',             englishName: 'Bengali',      dir: 'ltr', font: 'bengali',     bcp47: 'bn' },
  { code: 'pt', nativeName: 'Português',        englishName: 'Portuguese',   dir: 'ltr', font: 'latin',       bcp47: 'pt' },
  { code: 'ru', nativeName: 'Русский',          englishName: 'Russian',      dir: 'ltr', font: 'latin',       bcp47: 'ru' },
  { code: 'ur', nativeName: 'اردو',             englishName: 'Urdu',         dir: 'rtl', font: 'urdu',        bcp47: 'ur' },
  { code: 'id', nativeName: 'Bahasa Indonesia', englishName: 'Indonesian',   dir: 'ltr', font: 'latin',       bcp47: 'id' },
  { code: 'de', nativeName: 'Deutsch',          englishName: 'German',       dir: 'ltr', font: 'latin',       bcp47: 'de' },
  { code: 'ja', nativeName: '日本語',            englishName: 'Japanese',     dir: 'ltr', font: 'cjk-jp',      bcp47: 'ja' },
  { code: 'mr', nativeName: 'मराठी',             englishName: 'Marathi',      dir: 'ltr', font: 'devanagari',  bcp47: 'mr' },
  { code: 'te', nativeName: 'తెలుగు',           englishName: 'Telugu',       dir: 'ltr', font: 'telugu',      bcp47: 'te' },
  { code: 'tr', nativeName: 'Türkçe',           englishName: 'Turkish',      dir: 'ltr', font: 'latin',       bcp47: 'tr' },
  { code: 'ta', nativeName: 'தமிழ்',             englishName: 'Tamil',        dir: 'ltr', font: 'tamil',       bcp47: 'ta' },
  { code: 'vi', nativeName: 'Tiếng Việt',       englishName: 'Vietnamese',   dir: 'ltr', font: 'latin',       bcp47: 'vi' },
  { code: 'tl', nativeName: 'Filipino',         englishName: 'Filipino',     dir: 'ltr', font: 'latin',       bcp47: 'tl' },
  { code: 'ko', nativeName: '한국어',            englishName: 'Korean',       dir: 'ltr', font: 'cjk-kr',      bcp47: 'ko' }
];

export const LOCALE_CODES = LOCALES.map(l => l.code);

export function getLocale(code: string): LocaleMeta {
  return LOCALES.find(l => l.code === code) ?? LOCALES[0];
}

export function isLocale(code: string): code is LocaleCode {
  return LOCALE_CODES.includes(code as LocaleCode);
}

export function fontBodyClass(font: LocaleMeta['font']): string {
  switch (font) {
    case 'cjk-sc':     return 'font-cjk-sc';
    case 'cjk-jp':     return 'font-cjk-jp';
    case 'cjk-kr':     return 'font-cjk-kr';
    case 'arabic':     return 'font-arabic';
    case 'urdu':       return 'font-urdu';
    case 'devanagari': return 'font-devanagari';
    case 'bengali':    return 'font-bengali';
    case 'tamil':      return 'font-tamil';
    case 'telugu':     return 'font-telugu';
    default:           return '';
  }
}
