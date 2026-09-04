# Yinxin Sun's CV

A minimalist, bilingual (English / 中文) resume hosted on GitHub Pages.

The site is **plain static HTML/CSS/JS with zero dependencies and no build
step** — nothing to install, nothing to compile, nothing to break. Editing
the resume means editing `index.html` and pushing to `main`.

## Structure

```
├── index.html                      # the whole CV, English + Chinese blocks
├── styles.css                      # design + print (A4) stylesheet
├── script.js                       # language toggle, print button, WeChat dialog
├── avatar.jpg / favicon.ico / apple-touch-icon.png
├── robots.txt / sitemap.xml / .nojekyll
└── .github/workflows/deploy.yml    # deploys to GitHub Pages on push to main
```

## Editing the resume

All content lives in `index.html` in two clearly marked blocks:

- `<!-- ══ ENGLISH VERSION ══ -->` — `<main class="container lang-en">`
- `<!-- ══ 中文版本 ══ -->` — `<main class="container lang-cn">`

Keep the two blocks in sync when you change content. The language toggle
swaps between them, stores the choice in `localStorage`, and defaults to
the visitor's browser language (English fallback, works without JavaScript).

Styling (colors, spacing, print layout) is plain CSS in `styles.css` —
the `@media print` block at the bottom controls the printed/PDF output.

## Previewing locally

No install needed — just open `index.html` in a browser, or serve the
folder for a realistic URL setup:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) publishes the
site on every push to `main`. One-time setup in the GitHub repo:

1. **Settings → General → Danger Zone**: the repository must be **public**
   (GitHub Pages on the free plan only works for public repositories).
2. **Settings → Pages → Build and deployment → Source**: select
   **GitHub Actions**.

The site then goes live at `https://sunforthree.github.io/CV/` and every
push to `main` redeploys automatically.

### Deploying at the domain root instead

If you later want the site at `https://sunforthree.github.io/` (user site),
move the site files into a repository named `sunforthree.github.io` and
update the absolute URLs in `index.html` (`canonical`, `og:url`, `og:image`,
JSON-LD) and `robots.txt`/`sitemap.xml` from
`https://sunforthree.github.io/CV/` to `https://sunforthree.github.io/`.
All asset references are relative, so nothing else needs to change.

## License

MIT
