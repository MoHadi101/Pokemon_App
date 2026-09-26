# 🔴 Pokédex

Ein moderner Pokédex als Web-App – gebaut mit **Vanilla JavaScript**, der kostenlosen [PokéAPI](https://pokeapi.co/) und einem frischen Dark-Theme mit Glassmorphism-Optik.

> 🌐 **Live-Demo:** [https://pokedex-program.netlify.app](https://pokedex-program.netlify.app)

---

## ✨ Features

- 🔍 **Alle Pokémon** – vollständige Liste (Gen I–IX, bis zu 1025 Einträge) über die PokéAPI
- 🖼️ **Offizielles Artwork** – hochauflösende Sprites statt Pixel-Grafiken (mit Fallback)
- 🎨 **Typ-Farben** – Hintergrund-Glow und Stat-Balken passen sich dem Haupttyp an
- 📊 **Detailansicht** mit:
  - Name, Nummer, Typen
  - Größe & Gewicht
  - Pokédex-Beschreibung (deutsch, Fallback englisch)
  - Basiswerte als animierte Balken
  - Fähigkeiten (inkl. versteckter Fähigkeiten)
  - Fundorte aus allen Spielen
- 🔎 **Live-Suche** – filtert die Liste sofort beim Tippen
- ⚡ **Lazy-Loading + Cache** – Details werden erst beim Klick geladen und danach zwischengespeichert
- 📱 **Responsive Design** – funktioniert auf Desktop, Tablet und Smartphone
- 🌙 **Modernes Dark-Theme** mit Glassmorphism-Panels

---

## 🛠️ Technologien

| Bereich | Verwendet |
|---|---|
| Markup | HTML5 (semantisch) |
| Styling | CSS3 – Custom Properties, Grid, Flexbox, `backdrop-filter`, `color-mix()` |
| Logik | Vanilla JavaScript (ES2020+) – `async/await`, `fetch`, `Promise.all` |
| Daten | [PokéAPI](https://pokeapi.co/) |
| Hosting | [Netlify](https://www.netlify.com/) |

Keine Frameworks, keine Build-Tools, keine Dependencies – reines Web.

---

## 🚀 Live-Demo

👉 **[https://pokedex-program.netlify.app](https://pokedex-program.netlify.app)**

---

## 📂 Projektstruktur
