# prasishsharma.com.np

Personal website of **Prasish Sharma**, Flutter developer from Pokhara, Nepal, and publisher of the
**MobileApp Mentor** apps on Google Play.

Live: <https://prasishsharma.com.np>

This is the redesigned version of the site. All of the previous version's
content, images and URLs are carried over.

## What's here

| Path | What it is |
|---|---|
| `/` | Home: about, resume (experience, education, certifications), skills, apps, GitHub, privacy, contact |
| `/privacy-policy/` | Privacy policy covering every MobileApp Mentor app |
| `/privacy-policy-kids/` | Privacy policy for children's games/apps |
| `/privacy/color-blind-test/` | Color Blind Test — Ishihara (`com.mobileappmentor.color_blind_test_ishihara`) |
| `/privacy/jhandi-munda/` | Jhandi Munda (`com.mobileappmentor.langur_burja`) |
| `/privacy/color-cards-blitz/` | Uno: Color Cards Blitz (`com.mobileappmentor.colorcardsblitz`) |
| `/privacy/pickup-lines/` | Pickup Lines & Flirty Openers (`com.mobileappmentor.pickup_lines`) |
| `/app-ads.txt` | Authorised ad sellers for AdMob + mediation partners |
| `/.well-known/security.txt` | Security contact |

### Old URLs that keep working

| Old URL | Now |
|---|---|
| `/privacy-poicy.html` | Same Color Blind Test policy, unchanged apart from added security meta tags |
| `/#privacy_policy` | Full privacy policy, inline on the home page. No redirect or JavaScript needed, so it matches the Play Console URL exactly |
| `/#privacy_policy_kids` | Full children's privacy policy, inline on the home page |
| `/google58bd251f5c47639c.html` | Google Search Console verification, unchanged |
| `/full_blog1.html`, `/text_flutter.html` | Were empty; now redirect to the home page |
| `/assets/...` | Every original image, font, script and stylesheet is still at its original path |

## Running it

There is no build step and no dependencies. The site is plain HTML, CSS and a small amount of JavaScript.

To preview locally, serve the folder with any static server and open <http://localhost:8000>:

```sh
# Any one of these:
python -m http.server 8000
npx serve -l 8000 .
```

All internal links and assets use relative paths, so double-clicking `index.html` also works. So does
VS Code Live Server, and so does hosting in a subfolder. The only exception is `404.html`, which stays
root-relative because GitHub Pages serves it at any path.

## Deploying to GitHub Pages

1. Push this folder to a new GitHub repository.
2. **Settings → Pages**: Source = *Deploy from a branch*, Branch = `main`, folder = `/ (root)`.
3. The `CNAME` file already contains `prasishsharma.com.np`.
4. A custom domain can only be attached to one GitHub Pages site. Before step 2, open
   **mywebsite2023 → Settings → Pages** and unpublish it. Don't remove the domain there,
   because that makes GitHub commit a deletion of `CNAME` to the old repo.
5. Once the certificate is issued, tick **Enforce HTTPS**.

DNS stays as it is today, because it already points at GitHub Pages.

## Security

- **Zero third-party requests.** Fonts (Inter and JetBrains Mono, SIL Open Font License), icons, images
  and scripts are all self-hosted. No analytics, no cookies, no trackers, no CDNs.
- **Deny-by-default Content-Security-Policy** in every page: `default-src 'none'`, with only same-origin
  scripts, styles, images and fonts allowed. There are no inline scripts or styles, no plugins, no forms,
  and `base-uri 'none'`.
- **Trusted Types enforced** (`require-trusted-types-for 'script'; trusted-types 'none'`): browsers that
  support it block every DOM-XSS sink (innerHTML, eval, and so on). The site's JavaScript uses none of them.
- The standalone app policies, which use inline CSS, get an even stricter `default-src 'none'` policy.
- All SVGs were scanned: none contain scripts, event handlers or external references.
- External links use `rel="noopener noreferrer"`. The referrer policy is `strict-origin-when-cross-origin`.
- **No server code, no database, no forms**, so there is nothing to inject into and nothing to leak.
- `_headers` adds HSTS (with preload), `frame-ancestors 'none'`, `X-Frame-Options`, `nosniff`,
  `Permissions-Policy`, COOP and CORP on Cloudflare Pages or Netlify. GitHub Pages ignores this file and
  cannot set custom headers. For those headers on GitHub Pages, put the domain behind Cloudflare's free plan.
- `.nojekyll` makes GitHub Pages serve `.well-known/` and skip Jekyll processing.
- Account-level protection matters as much as the site: turn on 2FA for GitHub and your domain registrar,
  and enable **Enforce HTTPS** in GitHub Pages.
## Editing

- **Apps**: each app is one `<article class="app">` block in `index.html`. Icons live in `assets/img/apps/`.
- **Privacy policies**: edit the relevant `index.html` and update its *Last updated* date and `sitemap.xml`.
- **app-ads.txt**: keep the `OWNERDOMAIN` line. After editing, check it in AdMob → Apps → app-ads.txt.
