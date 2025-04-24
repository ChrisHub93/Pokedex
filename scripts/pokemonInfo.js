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
    // 1. link over species.url -> evolution_chain.url  =>
    // chain.species.name /, chain.evolves_to.[].species.name /, chain.evolves_to.[].evolves_to.species.name
    // save in let pokemonInfoEvolution
    // 2 search PokemonInfoEvolution names in allPokemonInfo
    // 3. render for each .sprites.other["official-artwork"].front_default (renderEvolutionTemplate())
    
  }

  function renderEvolutionTemplate() {
    let tableRef = document.getElementById("infoStatsTable");
    tableRef.innerHTML = "";

    tableRef.innerHTML = getEvolutionTemplate();
  }