# IKC DIN — site build (lees dit eerst)

`bundle.js` en `index.html` in de root worden **gegenereerd**. Niet met de hand aanpassen.

    _build/base/        <- pure Claude Design export (bundle.js + index.html)
    _build/content/     <- inhoud van Irfan: hutbe.json, news.json, vaktija_2026.json
    _build/patches/     <- nav-hover, hutba-sectie, activiteiten, styling, vaktija-logica
    _build/apply_patches.py

Bouwen:  `python3 _build/apply_patches.py`  (vanuit de root van de repo)

## Na een nieuwe Claude Design export
1. Kopieer de nieuwe `bundle.js` en `index.html` naar `_build/base/`.
2. Draai `python3 _build/apply_patches.py`. Alles wat Irfan heeft aangeleverd komt automatisch terug.
3. Faalt een patch ("PATCH FAILED"), dan is de export veranderd: pas die ene patch aan, niets handmatig overschrijven.

## Nieuwe inhoud toevoegen
- Hutba: nieuw object in `content/hutbe.json` (nieuwste bovenaan wordt automatisch gekozen op `id` = datum).
- Nieuws: nieuw object in `content/news.json` (sortering nieuwste eerst gaat vanzelf op `date`).
- Vaktija 2027: nieuwe tabel in `content/vaktija_2026.json`-formaat (365 regels van 24 cijfers) en jaartal in `patches/vaktija.js` aanpassen.
- Activiteiten (Halaqa, Mekteb, Džuma) staan in `patches/events.js`; de Džuma-tijd wisselt automatisch (14:00 zomertijd / 13:00 wintertijd).

## Nieuwsbrieven uit Gmail (label "website")
- `_build/gmail-feed/Code.gs` = Google Apps Script (draait in Irfans Gmail). Alleen mails met het label **website** komen in de feed.
- De web-app-URL van dat script staat in `content/feed.json` (`{"url": "..."}`). Leeg = alleen de vaste kaarten uit `content/newsletters.json`.
- De site toont de nieuwste 6 (feed + vaste kaarten, dubbele onderwerpen worden samengevoegd).
