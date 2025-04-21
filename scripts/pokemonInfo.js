function showPokemonInfo(id) {
  searchClicketPokemon(id);
  renderPokemonInfoOverlay();
  renderInfoStatsAbout();
}

function showPreviousePokemonInfo(id) {
    if (id >= 1) {
        let nextId = "";
        nextId = id - 1;
        showPokemonInfo(nextId);
    } return
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

function renderInfoStatsAbout() {
  let tableRef = document.getElementById("infoStatsTable");
  tableRef.innerHTML = "";

  tableRef.innerHTML = infoStatsTableAbout();
}

function closeInfo() {
  let overlayRef = document.getElementById("overlay-js");
  overlayRef.classList.remove("overlay");
  overlayRef.innerHTML = "";
}
