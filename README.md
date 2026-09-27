# 🔴 Pokédex

Ein moderner Pokédex als Web-App – entwickelt mit **Vanilla JavaScript**, der kostenlosen [PokéAPI](https://pokeapi.co/) und einem modernen Dark-Theme mit Glassmorphism-Optik.

> 🌐 **Live-Demo:** https://pokedex-program.netlify.app

---

## ✨ Features

* 🔍 **Alle Pokémon** – Vollständige Liste (Gen I–IX, bis zu 1025 Einträge) über die PokéAPI
* 🖼️ **Offizielles Artwork** – Hochauflösende Sprites statt Pixel-Grafiken, inklusive Fallback
* 🎨 **Typ-Farben** – Hintergrund-Glow und Stat-Balken passen sich dem Haupttyp an
* 📊 **Detailansicht** mit:

  * Name, Nummer und Typen
  * Größe und Gewicht
  * Pokédex-Beschreibung (Deutsch, Fallback auf Englisch)
  * Basiswerte als animierte Balken
  * Fähigkeiten (inklusive versteckter Fähigkeiten)
  * Fundorte aus allen Spielen
* 🔎 **Live-Suche** – Filtert die Liste sofort während der Eingabe
* ⚡ **Lazy-Loading + Cache** – Details werden erst beim Klick geladen und anschließend zwischengespeichert
* 📱 **Responsive Design** – Funktioniert auf Desktop, Tablet und Smartphone
* 🌙 **Modernes Dark-Theme** mit Glassmorphism-Panels

---

## 🛠️ Technologien

| Bereich | Verwendet                                                                 |
| ------- | ------------------------------------------------------------------------- |
| Markup  | HTML5 (semantisch)                                                        |
| Styling | CSS3 – Custom Properties, Grid, Flexbox, `backdrop-filter`, `color-mix()` |
| Logik   | Vanilla JavaScript (ES2020+) – `async/await`, `fetch`, `Promise.all`      |
| Daten   | [PokéAPI](https://pokeapi.co/)                                            |
| Hosting | [Netlify](https://www.netlify.com/)                                       |

Keine Frameworks, keine Build-Tools, keine Dependencies – **reines Web**.

---

## 🧠 Wie es funktioniert (Kurz)

Beim Start wird ein einziger Request an `/pokemon?limit=1025` geschickt, um alle Namen zu laden.

Die Liste wird mit lokal verlinkten Sprites (`raw.githubusercontent.com`) aufgebaut – dadurch sind keine 1025 API-Requests erforderlich.

Beim Klick auf ein Pokémon werden die Details per `Promise.all` geladen. Pokémon-Daten und Fundorte werden dabei parallel abgerufen und anschließend im Cache (`pokedex[id]`) gespeichert.

Ein erneuter Klick lädt die Daten direkt aus dem Cache – es ist kein weiterer Netzwerk-Request erforderlich.

Die Beschreibung wird bevorzugt auf Deutsch geladen. Falls keine deutsche Beschreibung verfügbar ist, wird auf Englisch zurückgegriffen. Dadurch wird kein fester Index wie in vielen Tutorials verwendet.

---

## 🎨 Design-Highlights

* Dunkler Hintergrund mit radialen Gradients für mehr Tiefe
* Panels mit Glassmorphism (`backdrop-filter: blur`)
* Typ-Farben aus der offiziellen Pokémon-Palette
* Animierte Stat-Balken mit CSS-Transition
* Hover-Effekt auf dem Pokéball-Logo
* Custom Scrollbar in der Liste

---

## 🗺️ Mögliche Erweiterungen

* [ ] Suche debouncen + virtuelles Scrollen für flüssigere Performance bei 1025 Einträgen
* [ ] Filter nach Typ / Generation
* [ ] Favoriten (`localStorage`)
* [ ] Entwicklungslinien anzeigen
* [ ] Shiny-Sprites als Toggle
* [ ] Vergleichsmodus (zwei Pokémon nebeneinander)

---

## 📜 Lizenz

Dieses Projekt steht unter der **MIT-Lizenz** – frei verwendbar, anpassbar und teilbar.

Die Pokémon-Daten und -Sprites stammen aus der PokéAPI und sind Eigentum von Nintendo, Game Freak und The Pokémon Company. Dieses Projekt dient ausschließlich Bildungs- und Demonstrationszwecken.

---

## 🙏 Danksagung

**PokéAPI** – Kostenlose, offene Pokémon-API

**Netlify** – Hosting

<p align="center">Made with ❤️ and JavaScript</p>
