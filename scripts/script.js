const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const ALL_POKEMON_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302";

let next_URL = "";
let previous_URL = null;
let arrayNamesAndLinks = [];
let listOfPokemon = [];
let allPokemonNameArray = [];
let pokemonInfo = "";

async function init() {
  await firstLoadData();
  await getPokemonUrlAndRender();
  renderButtons();
  await getListOfAllPokemons();
  console.log("Lister aller POkemon und links:", allPokemonNameArray);
}

async function loadNextPage() {
  disappearButtons();
  await loadNextData();
  renderButtons();
}

async function loadPreviousPage() {
  disappearButtons();
  await loadPreviousData();
  renderButtons();
}

function showPokemonInfo(id) {
  searchClicketPokemon(id);
  renderPokemonInfoOverlay();
  renderInfoStatsAbout();
}

async function firstLoadData() {
  let response = await fetch(BASE_URL);
  let responseToJason = await response.json();
  arrayNamesAndLinks = await responseToJason.results;
  next_URL = await responseToJason.next;
}

async function getPokemonUrlAndRender() {
  for (const pokemon of arrayNamesAndLinks) {
    await renderPokemons(pokemon.url);
  }
}

async function renderPokemons(url) {
  const pokemonRef = document.getElementById("content-js");
  let response = await fetch(url);
  let responseToJason = await response.json();
  listOfPokemon.push(responseToJason);
  pokemonRef.innerHTML += getPokemonOverviewTemplate(responseToJason);
}

async function loadNextData() {
  const pokemonRef = document.getElementById("content-js");
  pokemonRef.innerHTML = "";
  let response = await fetch(next_URL);
  let responseToJason = await response.json();

  arrayNamesAndLinks = await responseToJason.results;
  next_URL = await responseToJason.next;
  previous_URL = await responseToJason.previous;
  await getPokemonUrlAndRender();
}

async function loadPreviousData() {
  const pokemonRef = document.getElementById("content-js");
  pokemonRef.innerHTML = "";
  let response = await fetch(previous_URL);
  let responseToJason = await response.json();

  arrayNamesAndLinks = await responseToJason.results;
  next_URL = await responseToJason.next;
  previous_URL = await responseToJason.previous;
  getPokemonUrlAndRender();
}

function renderButtons() {
  if (previous_URL != null) {
    renderPreviousButton();
    renderNextButton();
  } else {
    document.getElementById("previous-btn").innerHTML = "";
    renderNextButton();
  }
}

function renderPreviousButton() {
  let btnRef = document.getElementById("previous-btn");
  btnRef.innerHTML = ` <button onclick="loadPreviousPage()" class="button">
          <img src="./assets/icons/arrow_back.svg" alt="" />
        </button>`;
}

function renderNextButton() {
  let btnRef = document.getElementById("next-btn");
  btnRef.innerHTML = ` <button onclick="loadNextPage()" class="button">
          <img src="./assets/icons/arrow_forward.svg" alt="" />
        </button>`;
}

function disappearButtons() {
  document.getElementById("previous-btn").innerHTML = "";
  document.getElementById("next-btn").innerHTML = "";
}

function closeInfo() {
  let overlayRef = document.getElementById("overlay-js");
  overlayRef.classList.remove("overlay");
  overlayRef.innerHTML = "";
}

function renderPokemonInfoOverlay() {
  event.stopPropagation();

  let overlayRef = document.getElementById("overlay-js");
  overlayRef.classList.add("overlay");
  overlayRef.innerHTML = getPokemonInfoTemplate();
}

async function getListOfAllPokemons() {
  let response = await fetch(ALL_POKEMON_URL);
  let responseToJason = await response.json();
  allPokemonNameArray = await responseToJason.results;
}

function searchClicketPokemon(id) {
  pokemonInfo = "";
  pokemonInfo = listOfPokemon.find((pokemon) => pokemon.id === id);
}

function renderInfoStatsAbout() {
  let tableRef = document.getElementById("infoStatsTable");
  tableRef.innerHTML = "";

  tableRef.innerHTML = infoStatsTableAbout();
}
