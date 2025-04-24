let pokemonInfo = "";

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
  
  function closeInfo() {
    let overlayRef = document.getElementById("overlay-js");
    overlayRef.classList.remove("overlay");
    overlayRef.innerHTML = "";
  }

  function showAbout() {
    let tableRef = document.getElementById("infoStatsTable");
    tableRef.innerHTML = "";
  
    tableRef.innerHTML = getTableAboutTemplate();
  }  

  function showBaseStats() {
    let tableRef = document.getElementById("infoStatsTable");
    tableRef.innerHTML = "";

    tableRef.innerHTML = getTableBaseStatsTemplate();
  }

  function showEvolution() {
    let tableRef = document.getElementById("infoStatsTable");
    tableRef.innerHTML = "";

    tableRef.innerHTML = getEvolutionTemplate();
  }