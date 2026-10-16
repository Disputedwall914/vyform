# VYFORM — Webdesign mit Eigencharakter

Ein Solo-Webdesign-Studio von Julian. Aussprache: „vai-form“.

**Live:** https://disputedwall914.github.io/vyform/

## Veröffentlichung

Jeder Push auf `main` baut die Website automatisch und veröffentlicht sie über GitHub Actions auf GitHub Pages. Alternativ lässt sich der Workflow `Deploy VYFORM to GitHub Pages` manuell starten. Nur die fertige Einzeldatei wird veröffentlicht.


Die fertige `index.html` funktioniert ohne Installation oder Build. Bilder, Schrift, Videos, CSS und JavaScript sind eingebettet. Ein Doppelklick reicht.

## Quellprojekt bearbeiten

React 18, TypeScript, Tailwind CSS 3, Framer Motion und Lucide React mit Vite. Node.js 22 oder neuer verwenden.

```sh
npm ci
npm run dev
```

```sh
npm run build
```

Der Build erstellt die direkt öffnbare Einzeldatei `dist/index.html`.

## Inhalte

- Texte und Leistungen: `src/main.tsx`
- Farben, Layout und Breakpoints: `src/style.css`
- Bildreihen: `src/marquee-assets.ts`
- Kontaktadresse: Konstante `EMAIL` in `src/main.tsx`
- Originaler Chrom-Cursor: `assets/hero-cursor.webp`
- Verwendeter Imagegen-Prompt und Modus: `asset-notes.txt`

Die Anfragefunktion bereitet einen E-Mail-Entwurf vor. Sie versendet nichts automatisch und hat keinen Server. Die Projektbilder sind als Designreferenzen aus der bereitgestellten Vorlage gekennzeichnet, nicht als eigene Kundenarbeiten.

## Assets

Das Hero-Motiv wurde mit dem eingebauten Imagegen-Tool als transparente 3D-Cursor-Skulptur erzeugt. Prompt und Ausführung sind in `asset-notes.txt` dokumentiert.

Die Bildreihen, vier kleinen 3D-Objekte und neun Projektbilder stammen aus der vom Nutzer bereitgestellten Vorlage. Originaladressen stehen in `reference-assets.json` und `downloaded-assets.json`. Die 20 verfügbaren GIFs wurden für flüssige Wiedergabe in kleine H.264-Loops umgewandelt. Die nicht verfügbare Celestia-Vorschau wurde durch eine bereits für dieses Projekt generierte Architekturstudie ersetzt.

Kanit stammt von Google Fonts. Die SIL Open Font License liegt in `assets/Kanit-OFL.txt`. Die Schrift ist auf den benötigten lateinischen Zeichensatz einschließlich deutscher Umlaute beschränkt.
