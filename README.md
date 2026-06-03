# Roman Sabol — Čistenie áut & Renovácia svetiel

Modern rebrand of romansabol.sk. Static site, deployed on Cloudflare Pages.

## Local preview

Any static server works. Examples:

```bash
npx serve site
# or
python -m http.server 8080 --directory site
```

## Deploy to Cloudflare Pages

1. Push this repo to GitHub.
2. On Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Pick this repo. Settings:
   - **Build command:** *(leave empty)*
   - **Build output directory:** `site`
4. Save & deploy. Cloudflare gives you a `*.pages.dev` URL automatically.

## Structure

```
site/
  index.html      # landing page
  styles.css      # all styles, custom properties, animations
  script.js       # cursor, reveal-on-scroll, counters, tilt
  _headers        # Cloudflare Pages security headers
```

Contact: 0903 379 976 · Bratislava
