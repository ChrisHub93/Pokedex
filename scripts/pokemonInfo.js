function showPokemonInfo(id) {
    searchClicketPokemon(id);
    renderPokemonInfoOverlay();
    renderInfoStatsAbout();
  }
  
  function showNextPokemonInfo(id) {
    let nextId = "";
    nextId = id +1 
    showPokemonInfo(nextId);
  }

  function searchClicketPokemon(id) {
    pokemonInfo = "";
    pokemonInfo = listOfPokemon.find((pokemon) => pokemon.id === id);
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