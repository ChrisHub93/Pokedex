let offset = 500;
const limit = 500;

let oneHundredPokemonNameArray = [];
let allPokemonInfo = [];

// // Alt
// async function getAllPokemonInfoOverAPI() {
//   await getListOfAllPokemons();
//   await getAllPokemonUrlAndSave();
//   endLoadingScreen()
//   loadNextOneHundred();
// }

async function getAllPokemonInfoOverAPI(limitForThisBatch, offsetForThisBatch) {
  console.log("OFFSET:", offsetForThisBatch, "LIMIT:", limitForThisBatch);
  await getListOfAllPokemons(limitForThisBatch, offsetForThisBatch);
  await getAllPokemonUrlAndSave();
  endLoadingScreen();
  loadNextOneHundred();
}

// // Alt
// async function getListOfAllPokemons() {
//   const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
//   const response = await fetch(url);
//   const data = await response.json();
//   oneHundredPokemonNameArray = data.results;
// }

// // test aus
// async function getListOfAllPokemons(limitForThisBatch) {
//   const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limitForThisBatch}`;
//   const response = await fetch(url);
//   const data = await response.json();
//   oneHundredPokemonNameArray = data.results;
// }

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
// // Alt
// function loadNextOneHundred() {
//   if (offset === 0 && !intervalId) {
//     intervalId = setInterval(renderLoadingStatus, 1000);
//   }
//   if (offset < 1025) {
//     offset += limit;
//     setTimeout(getAllPokemonInfoOverAPI, 100);
//   } else {
//     renderLoadingStatus()
//     clearInterval(intervalId);
//     renderSeachInput()
//     initSearch();
//   }
// }

// Test
function loadNextOneHundred() { 
  if (offset < 1025) {
    const remaining = 1025 - offset;
    const currentLimit = Math.min(limit, remaining);
    const currentOffset = offset; // Save current offset

    setTimeout(() => {
      getAllPokemonInfoOverAPI(currentLimit, currentOffset);
    }, 100);
    offset += currentLimit; // only increase after scheduling
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

function initSearch() {
  const searchInput = document.getElementById("search-input");

  searchInput.addEventListener("keyup", (event) => {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm.length >= 3) {
      const filteredPokemons = allPokemonInfo.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm)
      );
      renderFilteredPokemons(filteredPokemons);
    } else if (searchTerm.length === 0) {
      clearPokemonList();
    }
  });
}
