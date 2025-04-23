let offset = 0;
const limit = 100;

let oneHundredPokemonNameArray = [];
let allPokemonInfo = [];

async function getAllPokemonInfoOverAPI() {
  await getListOfAllPokemons();
  console.log("Liste aller Pokémon und Links:", oneHundredPokemonNameArray);
  await getAllPokemonUrlAndSave();
  console.log("AllPokemonInfos:", allPokemonInfo);
  loadNextOneHundred(); // ruft automatisch die nächste Seite auf
}

async function getListOfAllPokemons() {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  console.log("Fetching List:", url);
  const response = await fetch(url);
  const data = await response.json();
  oneHundredPokemonNameArray = data.results;
}

async function getAllPokemonUrlAndSave() {
  for (const pokemon of oneHundredPokemonNameArray) {
    await saveAllPokemonInfos(pokemon.url);
  }
}

async function saveAllPokemonInfos(url) {
  const response = await fetch(url);
  const data = await response.json();
  allPokemonInfo.push(data);
}

function loadNextOneHundred() {
  if (offset < 1300) {
    offset += limit;
    setTimeout(getAllPokemonInfoOverAPI, 1000);
  } else {
    console.log("Fertig mit allen Pokémon.");
  }
}
