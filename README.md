# CIERRA

Sitio editorial multilingüe de la campaña **CIERRA — Cierra las que puedas.**

> El mismo modelo de negocio que convierte tu vida en datos extraíbles para venderte cosas, alimenta también las máquinas de vigilancia, persecución y guerra. No son problemas separados: es la misma cadena.

---

## Stack

- **Astro 5** (SSG) con i18n nativo, default `es` sin prefijo
- **Tailwind CSS v4** (vía `@tailwindcss/vite`), tema editorial brutalista
- **TypeScript** + Astro Content Collections (Zod) para validar el JSON por idioma
- **Vanilla JS** para la única isla interactiva (calculadora)
- **Cloudflare Pages** + Pages Function (`functions/_middleware.ts`) para detección automática del `Accept-Language`

## Idiomas soportados

20 idiomas, los más hablados del mundo según Ethnologue (L1+L2):

`es, en, zh, hi, fr, ar, bn, pt, ru, ur, id, de, ja, mr, te, tr, ta, vi, tl, ko`

Árabe (`ar`) y urdu (`ur`) renderizan en RTL. CJK (`zh`, `ja`, `ko`) y los scripts índicos cargan fuentes Noto específicas.

> **Nota sobre traducciones.** El español es la fuente autoritativa. Las traducciones a los otros 19 idiomas son provisionales y se generan/incorporan progresivamente. Cualquier locale sin JSON propio cae automáticamente al español sin romper el build, mostrando un banner con la advertencia correspondiente.

## Estructura

```
src/
├── content/site/{locale}.json    # contenido por idioma
├── content.config.ts             # schema Zod
├── i18n/locales.ts               # metadata de los 20 idiomas
├── i18n/utils.ts                 # loadSite, localePath, fallbacks
├── layouts/BaseLayout.astro      # html/lang/dir/hreflang/OG
├── components/                   # Hero, Chapter, Calculator, etc.
├── pages/index.astro             # /  (es)
└── pages/[lang]/index.astro      # /{lang}/  (otros 19)

functions/_middleware.ts          # Accept-Language → 302 a /{lang}/
public/                           # fonts, og, favicon, grain
```

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npm run preview    # previsualiza el build estático
```

### Probar en local con Cloudflare Functions

```bash
npx wrangler pages dev dist
```

## Despliegue

Cloudflare Pages, build command `npm run build`, output dir `dist`. La función de middleware se despliega automáticamente desde `functions/`.

## Añadir una traducción

1. Copia `src/content/site/es.json` → `src/content/site/{code}.json`.
2. Traduce solo los **valores** de texto. **No** modifiques claves, URLs, ni años.
3. Mantén nombres propios sin traducir (Molly Russell, Pablo Hasél, Lavender, Palantir, Meta Ray-Ban, etc.).
4. Ejecuta `npm run build` para validar el schema.

## Licencia

Esta campaña es libre. Cópiala, tradúcela, mejórala.
