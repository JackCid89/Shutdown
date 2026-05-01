import { getEntry } from 'astro:content';
import { DEFAULT_LOCALE, LOCALE_CODES, type LocaleCode, isLocale } from './locales';
import type { SiteContent } from '../content.config';

/**
 * Load the site content for a given locale, falling back to the default locale
 * (Spanish) if the translation is not yet available. This makes the build
 * resilient: shipping a single language at a time never breaks the others.
 */
export async function loadSite(locale: LocaleCode): Promise<{ content: SiteContent; isFallback: boolean }> {
  const entry = await getEntry('site', locale);
  if (entry) return { content: entry.data as SiteContent, isFallback: false };

  const fallback = await getEntry('site', DEFAULT_LOCALE);
  if (!fallback) throw new Error(`Default locale "${DEFAULT_LOCALE}" content not found.`);
  return { content: fallback.data as SiteContent, isFallback: true };
}

/** Build the URL for a given locale (default locale has no prefix). */
export function localePath(locale: LocaleCode, path: string = ''): string {
  const clean = path.replace(/^\/+/, '');
  if (locale === DEFAULT_LOCALE) return '/' + clean;
  return `/${locale}/${clean}`;
}

/** Read the locale code from an `Astro.url`. Returns DEFAULT_LOCALE if none. */
export function localeFromUrl(url: URL): LocaleCode {
  const seg = url.pathname.split('/').filter(Boolean)[0];
  return seg && isLocale(seg) ? (seg as LocaleCode) : DEFAULT_LOCALE;
}

/** All locales except the default one (used for `getStaticPaths` of `[lang]`). */
export const NON_DEFAULT_LOCALES: LocaleCode[] = LOCALE_CODES.filter(c => c !== DEFAULT_LOCALE);
