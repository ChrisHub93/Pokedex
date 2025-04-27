let pokemonInfo = "";
let pokemonEvolutionNames = [];
let evolutionData = [];

function showPokemonInfo(id) {
  searchClicketPokemon(id);
  renderPokemonInfoOverlay();
  showAbout();
}

function showPreviousePokemonInfo(id) {
  if (id >= 1) {
    let nextId = "";
    nextId = id - 1;
    showPokemonInfo(nextId);
  }
  return;
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

function renderPokemonInfoOverlay() {
  let overlayRef = document.getElementById("overlay-js");
  overlayRef.classList.add("overlay");
  overlayRef.innerHTML = getPokemonInfoTemplate();
}

function closeInfo() {
  let overlayRef = document.getElementById("overlay-js");
  overlayRef.classList.remove("overlay");
  overlayRef.innerHTML = "";
}

function showAbout() {
  let tableRef = document.getElementById("infoStatsTable");
  tableRef.innerHTML = "";
  tableRef.classList.add("info__statsTable");
  document.getElementById("infoMoves-js").innerHTML = "";

  tableRef.innerHTML = getTableAboutTemplate();
}

function showBaseStats() {
  let tableRef = document.getElementById("infoStatsTable");
  tableRef.innerHTML = "";
  tableRef.classList.add("info__statsTable");
  document.getElementById("infoMoves-js").innerHTML = "";

  tableRef.innerHTML = getTableBaseStatsTemplate();
}

async function showEvolution() {
  await getEvolutionNamens();
  await getEvolutionIDs();
  await renderEvolutionTemplate();
}

async function getEvolutionNamens() {
  pokemonEvolutionNames = [];
  let thirdEvolution = 0;

  let speciesJason = await (await fetch(pokemonInfo.species.url)).json();
  let evolutionChainJson = await (
    await fetch(speciesJason.evolution_chain.url)
  ).json();
  thirdEvolution = evolutionChainJson.chain.evolves_to[0].evolves_to.length;

  pokemonEvolutionNames.push(evolutionChainJson.chain.species.name);
  pokemonEvolutionNames.push(
    evolutionChainJson.chain.evolves_to[0].species.name
  );
  if (thirdEvolution != 0) {
    pokemonEvolutionNames.push(
      evolutionChainJson.chain.evolves_to[0].evolves_to[0].species.name
    );
  }
}

async function getEvolutionIDs() {
  evolutionData = pokemonEvolutionNames.map((name) => {
    const foundPokemon = allPokemonInfo.find((p) => p.name === name);
    return foundPokemon
      ? { name: foundPokemon.name, id: foundPokemon.id }
      : { name, id: null };
  });
  console.log("Result", evolutionData);
}

async function renderEvolutionTemplate() {
  let tableRef = document.getElementById("infoStatsTable");
  tableRef.innerHTML = ""; 
  tableRef.classList.add("info__statsTable");
  document.getElementById("infoMoves-js").innerHTML = "";

  tableRef.innerHTML = getEvolutionTemplate();
}

function showMoves() {
  renderPokemonMoves();
}

function renderPokemonMoves() {
  let tableRef = document.getElementById("infoStatsTable");
  tableRef.innerHTML = "";
  tableRef.classList.remove("info__statsTable");

  let moveRef = document.getElementById("infoMoves-js");
  moveRef.innerHTML = "";

  moveRef.innerHTML = getMovesTemplate();

  console.log(pokemonInfo.moves[0].move.name);
}
