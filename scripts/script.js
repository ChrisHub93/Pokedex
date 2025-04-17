const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

let next_URL = "";
let previous_URL = "";
let arrayResults = [];

async function init() {
    await firstLoadData()
    getPokemonURL()

}

async function firstLoadData() {
    let response = await fetch(BASE_URL)
    let responseToJason = await response.json()
    arrayResults = await responseToJason.results;
    next_URL = await responseToJason.next
}

async function getPokemonURL() {
    for (const pokemon of arrayResults) {
        await renderPokemons(pokemon.url)
    }
}


async function renderPokemons(url) {
    const pokemonRef = document.getElementById('content-js');
    
    let response = await fetch(url)
    let responseToJason = await response.json()
    pokemonRef.innerHTML += getPokemonOverview(responseToJason);
    
   // console.log(responseToJason);  
}



// Funktionen für den "Next" und "Previous" Button
async function loadNextData() {
    clearVariables()
    let response = await fetch(next_URL);
    let responseToJason = await response.json();
    arrayResults = await responseToJason.results;
    next_URL = await responseToJason.next;
    previous_URL = await responseToJason.previous;   
}

async function loadPreviousData() {
    clearVariables()
    let response = await fetch(previous_URL);
    let responseToJason = await response.json();
    arrayResults = await responseToJason.results;
    next_URL = await responseToJason.next;
    previous_URL = await responseToJason.previous; 
}

function clearVariables() {
    next_URL = "";
    previous_URL = "";
    arrayResults = [];
}