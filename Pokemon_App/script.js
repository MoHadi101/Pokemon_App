const POKEMON_COUNT = 1025;

// Direkter Sprite-Link ohne API-Request (für die Liste)
const SPRITE = id =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

// Farbe für den Glow hinter dem Sprite
const TYPE_COLORS = {
  grass:"#7ac74c", fire:"#ee8130", water:"#6390f0", electric:"#f7d02c",
  ice:"#96d9d6", fighting:"#c22e28", poison:"#a33ea1", ground:"#e2bf65",
  flying:"#a98ff3", psychic:"#f95587", bug:"#a6b91a", rock:"#b6a136",
  ghost:"#735797", dragon:"#6f35fc", dark:"#705746", steel:"#b7b7ce",
  fairy:"#d685ad", normal:"#a8a77a"
};

const STAT_LABELS = {
  hp:                 "Kraftpunkte",
  attack:             "Angriff",
  defense:             "Verteidigung",
  "special-attack":   "Spezial-Angriff",
  "special-defense":  "Spezial-Verteidigung",
  speed:              "Initiative"
};

const pokedex = {};   // Cache: id -> Datenobjekt

document.addEventListener("DOMContentLoaded", init);

/* ---------- Initialisierung ---------- */
async function init() {
  const listEl   = document.getElementById("pokemon-list");
  const searchEl = document.getElementById("search");

  try {
    // EIN Request für alle 
    const res  = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_COUNT}`);
    const data = await res.json();

    data.results.forEach((entry, idx) => {
      const id = idx + 1;
      const el = document.createElement("div");
      el.className       = "pokemon-name";
      el.id              = id;
      el.dataset.name    = entry.name;
      el.innerHTML = `
        <img src="${SPRITE(id)}" loading="lazy" alt="">
        <span class="num">#${String(id).padStart(3, "0")}</span>
        <span class="name">${entry.name}</span>`;
      el.addEventListener("click", () => updatePokemon(id));
      listEl.append(el);
    });
  } catch (err) {
    listEl.textContent = "Fehler beim Laden der Liste.";
    console.error(err);
    return;
  }

  // Suche
  searchEl.addEventListener("input", e => {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll(".pokemon-name").forEach(el => {
      el.classList.toggle("hidden", !el.dataset.name.includes(q));
    });
  });

  // Erstes Pokémon direkt anzeigen
  updatePokemon(1);
}

/* ---------- Daten holen (mit Cache) ---------- */
async function getPokemon(id) {
  if (pokedex[id]) return pokedex[id];

  // Pokémon + Fundorte parallel laden
  const [pRes, eRes] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`)
  ]);
  const pokemon    = await pRes.json();
  const encounters = await eRes.json();

  // Beschreibung
  const sRes    = await fetch(pokemon.species.url);
  const species = await sRes.json();
  const entries = species.flavor_text_entries;
  const entry   = entries.find(e => e.language.name === "de")
               || entries.find(e => e.language.name === "en");
  const desc = entry
    ? entry.flavor_text.replace(/[\n\f\r]+/g, " ").trim()
    : "Keine Beschreibung verfügbar.";

  // Fundorte 
  const locations = [...new Set(
    encounters.map(e => prettyName(e.location_area.name))
  )];

  const data = {
    id,
    name:    pokemon.name,
    types:   pokemon.types,
    img:     pokemon.sprites.other?.["official-artwork"]?.front_default
             || pokemon.sprites.front_default,
    desc,
    height:  pokemon.height,   // Dezimeter
    weight:  pokemon.weight,   // Hektogramm
    stats:   pokemon.stats,
    abilities: pokemon.abilities,
    locations
  };

  pokedex[id] = data;
  return data;
}

/* ---------- Detailansicht rendern ---------- */
async function updatePokemon(id) {
  const loading = document.getElementById("loading");
  const detail  = document.getElementById("pokemon-detail");

  loading.hidden = false;
  loading.textContent = "Lade Daten…";
  detail.hidden  = true;

  // aktiven Listeneintrag markieren
  document.querySelectorAll(".pokemon-name.active")
          .forEach(e => e.classList.remove("active"));
  document.getElementById(id)?.classList.add("active");

  let data;
  try {
    data = await getPokemon(id);
  } catch (err) {
    loading.textContent = "Fehler beim Laden.";
    console.error(err);
    return;
  }

  loading.hidden = true;
  detail.hidden  = false;

  // Grunddaten
  document.getElementById("pokemon-img").src        = data.img;
  document.getElementById("pokemon-number").textContent = "#" + String(id).padStart(3, "0");
  document.getElementById("pokemon-name").textContent   = data.name;
  document.getElementById("pokemon-description").textContent = data.desc;
  document.getElementById("pokemon-height").textContent =
    (data.height / 10).toFixed(1) + " m";
  document.getElementById("pokemon-weight").textContent =
    (data.weight / 10).toFixed(1) + " kg";

  // Glow-Farbe = Haupttyp
  const primaryType = data.types[0]?.type.name || "normal";
  detail.style.setProperty("--type-color", TYPE_COLORS[primaryType] || "#7ac74c");

  // Typen
  const typesDiv = document.getElementById("pokemon-types");
  typesDiv.innerHTML = "";
  data.types.forEach(t => {
    const span = document.createElement("span");
    span.className   = "type-box " + t.type.name;
    span.textContent = t.type.name.toUpperCase();
    typesDiv.append(span);
  });

  // Basiswerte
  const statsDiv = document.getElementById("pokemon-stats");
  statsDiv.innerHTML = "";
  data.stats.forEach(s => {
    const val = s.base_stat;
    const pct = Math.min(100, (val / 180) * 100);
    const row = document.createElement("div");
    row.className = "stat-row";
    row.innerHTML = `
      <span class="stat-label">${STAT_LABELS[s.stat.name] || s.stat.name}</span>
      <span class="stat-value">${val}</span>
      <span class="stat-bar"><span style="width:${pct}%"></span></span>`;
    statsDiv.append(row);
  });

  // Fähigkeiten
  const abDiv = document.getElementById("pokemon-abilities");
  abDiv.innerHTML = "";
  data.abilities.forEach(a => {
    const span = document.createElement("span");
    span.className = "ability" + (a.is_hidden ? " hidden-ability" : "");
    span.textContent = prettyName(a.ability.name)
                     + (a.is_hidden ? " (versteckt)" : "");
    abDiv.append(span);
  });

  // Fundorte
  const locDiv = document.getElementById("pokemon-locations");
  locDiv.innerHTML = "";
  if (data.locations.length === 0) {
    locDiv.textContent = "Keine Fundorte in dieser Generation bekannt.";
  } else {
    data.locations.slice(0, 12).forEach(l => {
      const tag = document.createElement("span");
      tag.className   = "location";
      tag.textContent = l;
      locDiv.append(tag);
    });
    if (data.locations.length > 12) {
      const more = document.createElement("span");
      more.className   = "location more";
      more.textContent = `+${data.locations.length - 12} weitere`;
      locDiv.append(more);
    }
  }
}

/* ---------- Hilfsfunktion ---------- */
function prettyName(slug) {
  return slug
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}