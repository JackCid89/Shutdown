/**
 * Cloudflare Pages middleware: language auto-detection on `/`.
 *
 *  - Reads the `cierra_lang` cookie. If set & supported, redirects to it.
 *  - Otherwise parses `Accept-Language`, picks the best supported match
 *    (with base-language fallback: `pt-BR` → `pt`, `zh-TW` → `zh`).
 *  - If the best match is `es` (default), passes through without redirect.
 *  - Otherwise, 302 redirects to `/{lang}/` and sets the cookie.
 *
 *  Localized URLs (`/en/`, `/zh/`, ...) are passed through unmodified.
 */

const SUPPORTED = [
  'es', 'en', 'zh', 'hi', 'fr', 'ar', 'bn', 'pt', 'ru', 'ur',
  'id', 'de', 'ja', 'mr', 'te', 'tr', 'ta', 'vi', 'tl', 'ko'
] as const;

type Locale = typeof SUPPORTED[number];
const SUPPORTED_SET: Set<string> = new Set(SUPPORTED);

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  const m = header.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}

function pickLocale(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null;
  const candidates = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      let q = 1;
      for (const p of params) {
        const m = p.trim().match(/^q=([\d.]+)$/);
        if (m) q = parseFloat(m[1]);
      }
      return { tag: tag.toLowerCase(), q };
    })
    .filter((c) => c.tag && c.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const c of candidates) {
    if (SUPPORTED_SET.has(c.tag)) return c.tag as Locale;
    const base = c.tag.split('-')[0];
    if (SUPPORTED_SET.has(base)) return base as Locale;
  }
  return null;
}

function isLocalizedPath(pathname: string): boolean {
  const seg = pathname.split('/').filter(Boolean)[0];
  return !!seg && SUPPORTED_SET.has(seg);
}

export const onRequest: PagesFunction = async ({ request, next }) => {
  const url = new URL(request.url);
  const isRoot = url.pathname === '/' || url.pathname === '';

  if (!isRoot || isLocalizedPath(url.pathname)) {
    return next();
  }

  const cookie = readCookie(request.headers.get('Cookie'), 'cierra_lang');
  let target: Locale | null = null;

  if (cookie && SUPPORTED_SET.has(cookie)) {
    target = cookie as Locale;
  } else {
    target = pickLocale(request.headers.get('Accept-Language'));
  }

  if (!target || target === 'es') {
    const res = await next();
    if (target && !cookie) {
      res.headers.append(
        'Set-Cookie',
        `cierra_lang=${target}; Path=/; Max-Age=31536000; SameSite=Lax`
      );
    }
    return res;
  }

  const headers = new Headers({ Location: `/${target}/` });
  if (!cookie) {
    headers.append(
      'Set-Cookie',
      `cierra_lang=${target}; Path=/; Max-Age=31536000; SameSite=Lax`
    );
  }
  return new Response(null, { status: 302, headers });
};
