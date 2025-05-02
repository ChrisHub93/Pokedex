let offset = 0;
const limit = 500;

let intervalId;

let oneHundredPokemonNameArray = [];
let allPokemonInfo = [];

async function getAllPokemonInfoOverAPI() {
  await getListOfAllPokemons();
  await getAllPokemonUrlAndSave();
  endLoadingScreen() 
  loadNextOneHundred(); 
}

async function getListOfAllPokemons() {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
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
  if (offset === 0 && !intervalId) { 
    intervalId = setInterval(renderLoadingStatus, 1000);
  }
  if (offset < 1300) {
    offset += limit;
    setTimeout(getAllPokemonInfoOverAPI, 100);
  } else {
    renderLoadingStatus()
    clearInterval(intervalId);
    renderSeachInput()
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

function initSearch() {
  const searchInput = document.getElementById("search-input");

  searchInput.addEventListener("keyup", (event) => {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm.length >= 3) {
      const filteredPokemons = allPokemonInfo.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm)
      );
      renderFilteredPokemons(filteredPokemons);
    } else {
      clearPokemonList();
    }
  });
}