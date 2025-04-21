let oneHundred_POKEMON_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100";
let currentCount = 100;
let currentURL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=" + currentCount; 

let oneHundredPokemonNameArray = [];
let allPokemonInfo = [];

async function getAllPokemonInfoOverAPI() {
  await getListOfAllPokemons();
  console.log("Lister aller Pokemon und links:", oneHundredPokemonNameArray);
  await getAllPokemonUrlAndSave()
  console.log("AllPokemonInfos:",allPokemonInfo);
  loadNextOneHundred()
}

async function getListOfAllPokemons() {
  let response = await fetch(currentURL);
  let responseToJason = await response.json();
  oneHundredPokemonNameArray = await responseToJason.results;
}

async function getAllPokemonUrlAndSave() {
  for (const allPokemon of oneHundredPokemonNameArray) {
    await saveAllPokemonInfos(allPokemon.url);
  }
}

async function saveAllPokemonInfos(url) {
  let response = await fetch(url);
  let responseToJason = await response.json();
  allPokemonInfo.push(responseToJason);
}

function loadNextOneHundred() {
  if (currentCount != 3000){
    currentCount += 100;
    currentURL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=" + currentCount; 
    console.log(currentURL);
    getAllPokemonInfoOverAPI();
  } if (currentCount === 3000) {
    currentCount += 2;
    currentURL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=" + currentCount; 
  } else {
    return
  }
    
}