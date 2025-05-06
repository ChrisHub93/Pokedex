let offset = 500;
const limit = 500;

let oneHundredPokemonNameArray = [];
let allPokemonInfo = [];

async function getAllPokemonInfoOverAPI(limitForThisBatch, offsetForThisBatch) {
  await getListOfAllPokemons(limitForThisBatch, offsetForThisBatch);
  await getAllPokemonUrlAndSave();
  endLoadingScreen();
  loadNextOneHundred();
}

async function getListOfAllPokemons(limitForThisBatch, offsetForThisBatch) {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offsetForThisBatch}&limit=${limitForThisBatch}`;
  const response = await fetch(url);
  const data = await response.json();
  oneHundredPokemonNameArray = data.results;
}

async function getAllPokemonUrlAndSave() {
  const fetchPromises = oneHundredPokemonNameArray.map((pokemon) =>
    fetch(pokemon.url).then((res) => res.json())
  );

  const results = await Promise.all(fetchPromises);
  allPokemonInfo.push(...results);
}

function loadNextOneHundred() {
  if (offset < 1025) {
    const remaining = 1025 - offset;
    const currentLimit = Math.min(limit, remaining);
    const currentOffset = offset;

    setTimeout(() => {
      getAllPokemonInfoOverAPI(currentLimit, currentOffset);
    }, 100);
    offset += currentLimit;
    renderLoadingStatus();
  } else {
    renderSeachInput();
    initSearch();
  }
}

function renderLoadingStatus() {
  let searchRef = document.getElementById("head-seach-js");
  searchRef.innerHTML = "";

  searchRef.innerHTML = getSearchLoadingStatus();
}

function renderSeachInput() {
  let searchRef = document.getElementById("head-seach-js");
  searchRef.innerHTML = "";

  searchRef.innerHTML = getSeachInputTemplate();
}

// prettier-ignore
function initSearch() {
  const searchInput = document.getElementById("search-input");
  let hasClearedOnce = true;

  searchInput.addEventListener("keyup", (event) => {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm.length >= 3) {
      hasClearedOnce = false;
      const filtered = allPokemonInfo.filter(p => p.name.toLowerCase().includes(searchTerm));
      console.log(filtered.length);
      filtered.length ? renderFilteredPokemons(filtered) : renderNoPokemonFound();
    } else if (searchTerm.length === 0 && !hasClearedOnce) {
      clearPokemonList();
      hasClearedOnce = true;
    }
  });
}

function renderFilteredPokemons(pokemonList) {
  const container = document.getElementById("content-js");
  container.innerHTML = "";

  pokemonList.forEach((pokemon) => {
    container.innerHTML += getPokemonOverviewTemplate(pokemon);
  });
}

function renderNoPokemonFound() {
  const container = document.getElementById("content-js");
  container.innerHTML = "";
  disappearButtons();
  container.innerHTML = getNoPokemonFoundTemplate();
}

function clearPokemonList() {
  const container = document.getElementById("content-js");
  container.innerHTML = "";
  getPokemonUrlAndRender();
  renderButtons();
}
