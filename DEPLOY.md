# HICH House Showroom — Deployment

Der Ordner ist eine vollständig statische Seite (kein Build-Schritt). Jeder statische Host funktioniert.

## Option A — Cloudflare Pages (1 Befehl, wrangler ist bereits eingeloggt)

```sh
cd "/Users/laura/Documents/Claude/Projects/Hitch House"
npx wrangler pages project create hich-house --production-branch=main
npx wrangler pages deploy hich-showroom --project-name=hich-house --branch=main
```

→ Ergebnis: `https://hich-house.pages.dev` (eigene Domain später in Cloudflare zuweisbar).

## Option B — Netlify Drop (ohne CLI)

https://app.netlify.com/drop öffnen und den Ordner `hich-showroom` ins Fenster ziehen.

## Lokal ansehen

```sh
cd hich-showroom && python3 -m http.server 8742
# → http://localhost:8742/
```

## Hinweise

- Platzhalter im Inhalt: `hello@hichhouse.com`, Koordinaten `39°01′ N · 1°26′ E`, Fahrzeiten (Flughafen ±20 min etc.) — vor Kundenversand bestätigen.
- Mood-Deeplinks: `#mood-01` … `#mood-21` (z. B. `…/index.html#mood-05` für Mediterraneo).
- Brochure-PDF: Button im Kapitel VI erzeugt Desktop- und Mobile-PDF nacheinander über den Print-Dialog.
