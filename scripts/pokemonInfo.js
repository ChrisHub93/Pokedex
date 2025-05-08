let pokemonInfo = [];
let pokemonEvolutionNames = [];
let evolutionData = [];
let evolutionExist = true;

function showPokemonInfo(id) {
  searchClicketPokemon(id);
  renderPokemonInfoOverlay(id);
  document.body.classList.add("hide-Overflow");
  showAbout();
}

function showPreviousePokemonInfo(id) {
  if (id > 1) {
    let nextId = "";
    nextId = id - 1;
    showPokemonInfo(nextId);
  }
}

function hideButton() {
  document.getElementById("info-btn-left").classList.add("display-none");
}

function showNextPokemonInfo(id) {
  let nextId = "";
  nextId = id + 1;
  showPokemonInfo(nextId);
}

function searchClicketPokemon(id) {
  pokemonInfo = "";
  pokemonInfo = allPokemonInfo.find((pokemon) => pokemon.id === id);
}

function renderPokemonInfoOverlay(id) {
    const overlayRef = document.getElementById("overlay-js");
    overlayRef.classList.add("overlay");
  
    if (id === 1) {
      overlayRef.innerHTML = getFirstPokemonInfoTemplate();
    } else if (id === 1025) {
      overlayRef.innerHTML = getLastPokemonInfoTemplate();
    } else {
      overlayRef.innerHTML = getPokemonInfoTemplate();
    }
  }

function closeInfo() {
  document.body.classList.remove("hide-Overflow");
  let overlayRef = document.getElementById("overlay-js");
  overlayRef.classList.remove("overlay");
  overlayRef.innerHTML = "";
}

function showAbout() {
  heighlightClickedNav("aboutBtn");
  renderAboutStats();
}

function renderAboutStats() {
  let tableRef = document.getElementById("infoStatsTable");
  tableRef.innerHTML = "";
  tableRef.classList.remove("info__statsTable__evolution");
  tableRef.classList.add("info__statsTable");
  document.getElementById("infoMoves-js").innerHTML = "";

  tableRef.innerHTML = getTableAboutTemplate();
}

function showBaseStats() {
  heighlightClickedNav("baseBtn");
  renderBaseStats();
}

function renderBaseStats() {
  let tableRef = document.getElementById("infoStatsTable");
  tableRef.innerHTML = "";
  tableRef.classList.remove("info__statsTable__evolution");
  tableRef.classList.add("info__statsTable");

  document.getElementById("infoMoves-js").innerHTML = "";
  tableRef.innerHTML = getTableBaseStatsTemplate();
}

async function showEvolution() {
  heighlightClickedNav("evolutionBtn");
  showLoadingText();
  await getEvolutionNamens();
  await getEvolutionIDs();
  await renderEvolutionTemplate();
}

// prettier-ignore
async function getEvolutionNamens() {
  pokemonEvolutionNames = [];
  evolutionExist = true;

  let speciesJason = await (await fetch(pokemonInfo.species.url)).json();
  let evolutionChainJson = await (await fetch(speciesJason.evolution_chain.url)).json();

  pokemonEvolutionNames.push(evolutionChainJson.chain.species.name);

  if (evolutionChainJson.chain.evolves_to.length > 0) {
    pokemonEvolutionNames.push(evolutionChainJson.chain.evolves_to[0].species.name);

    if (evolutionChainJson.chain.evolves_to[0].evolves_to.length > 0) {
      pokemonEvolutionNames.push(evolutionChainJson.chain.evolves_to[0].evolves_to[0].species.name);
    }
  } else {
    evolutionExist = false;
  }
}

async function getEvolutionIDs() {
  evolutionData = pokemonEvolutionNames.map((name) => {
    const foundPokemon = allPokemonInfo.find((p) => p.name === name);
    return foundPokemon
      ? { name: foundPokemon.name, id: foundPokemon.id }
      : { name, id: null };
  });
}

async function renderEvolutionTemplate() {
  let tableRef = document.getElementById("infoStatsTable");
  tableRef.innerHTML = "";
  tableRef.classList.add("info__statsTable", "info__statsTable__evolution");
  document.getElementById("infoMoves-js").innerHTML = "";

  tableRef.innerHTML = getEvolutionTemplate();

  if (evolutionExist === false) {
    tableRef.innerHTML += `<p>There is no evolution <br>for this Pokémon</p>`;
  }
}

function showLoadingText() {
  let tableRef = document.getElementById("infoStatsTable");
  tableRef.innerHTML = "";
  tableRef.innerHTML = getLoadingTextTemplate();
}

function showMoves() {
  heighlightClickedNav("movesBtn");
  renderPokemonMoves();
}

function renderPokemonMoves() {
  let tableRef = document.getElementById("infoStatsTable");
  let moveRef = document.getElementById("infoMoves-js");
  tableRef.innerHTML = "";
  moveRef.innerHTML = "";
  tableRef.classList.remove("info__statsTable");

  moveRef.innerHTML = getMovesTemplate();
}

function heighlightClickedNav(selected) {
  document.getElementById("aboutBtn").classList.remove("highlitedBtn");
  document.getElementById("baseBtn").classList.remove("highlitedBtn");
  document.getElementById("evolutionBtn").classList.remove("highlitedBtn");
  document.getElementById("movesBtn").classList.remove("highlitedBtn");

  document.getElementById(selected).classList.add("highlitedBtn");
}
