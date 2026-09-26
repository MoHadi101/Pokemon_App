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

## 🔌 Verwendete API-Endpunkte
Endpunkt	Zweck
GET /api/v2/pokemon?limit=1025	Liste aller Pokémon-Namen
GET /api/v2/pokemon/{id}	Details: Typen, Werte, Fähigkeiten, Sprites
GET /api/v2/pokemon-species/{id}	Beschreibungstexte (mehrsprachig)
GET /api/v2/pokemon/{id}/encounters	Fundorte
## 🧠 Wie es funktioniert (Kurz)
Beim Start wird ein einziger Request an /pokemon?limit=1025 geschickt, um alle Namen zu bekommen.

Die Liste wird mit lokal verlinkten Sprites (raw.githubusercontent.com) aufgebaut – keine 1025 API-Calls.

Klick auf ein Pokémon lädt dessen Details per Promise.all (Pokémon + Fundorte parallel) und legt sie im Cache (pokedex[id]) ab.

Erneuter Klick holt die Daten sofort aus dem Cache – kein zweiter Netzwerk-Request.

Die Beschreibung wird bevorzugt auf Deutsch geladen, sonst auf Englisch (statt eines festen Index wie in vielen Tutorials).

## 🎨 Design-Highlights
Dunkler Hintergrund mit radialen Gradients für Tiefe

Panels mit Glassmorphism (backdrop-filter: blur)

Typ-Farben aus offizieller Pokémon-Palette

Animierte Stat-Balken mit CSS-Transition

Hover-Effekt auf dem Pokéball-Logo

Custom Scrollbar in der Liste

## 🗺️ Mögliche Erweiterungen
□ Suche debouncen + virtuelles Scrollen für flüssigere Performance bei 1025 Einträgen
□ Filter nach Typ / Generation
□ Favoriten (localStorage)
□ Entwicklungslinien anzeigen
□ Shiny-Sprites als Toggle
□ Vergleichsmodus (zwei Pokémon nebeneinander)
## 📜 Lizenz
Dieses Projekt steht unter der MIT-Lizenz – frei verwendbar, anpassbar und teilbar.

Die Pokémon-Daten und -Sprites stammen aus der PokéAPI und sind Eigentum von Nintendo, Game Freak und The Pokémon Company. Dieses Projekt dient ausschließlich Bildungs- und Demonstrationszwecken.

## 🙏 Danksagung
PokéAPI – kostenlose, offene Pokémon-API

Netlify – Hosting
<p align="center"> Made with ❤️ and JavaScript </p> 
