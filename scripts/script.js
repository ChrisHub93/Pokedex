const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

let next_URL = "";
let previous_URL = null;
let arrayNamesAndLinks = [];
let listOfPokemon = [];
let pageIsloading = true;

async function init() {
  loadingScreen();
  await firstLoadData();
  await getPokemonUrlAndRender();
  renderButtons();
  endLoadingScreen();
  getAllPokemonInfoOverAPI(500, 0);
  renderLoadingStatus();
}

async function loadNextPage() {
  pageIsloading = true;
  disappearButtons();
  await loadNextData();
  renderButtons();
  pageIsloading = false;
}

async function loadPreviousPage() {
  pageIsloading = true;
  disappearButtons();
  await loadPreviousData();
  renderButtons();
  pageIsloading = false;
}

async function clickOnLogo() {
  if (!pageIsloading) {
    await firstLoadData();
    await getPokemonUrlAndRender();
    renderButtons();
  }
}

async function firstLoadData() {
  let response = await fetch(BASE_URL);
  let responseToJason = await response.json();
  arrayNamesAndLinks = await responseToJason.results;
  next_URL = await responseToJason.next;
}

async function getPokemonUrlAndRender() {
  const pokemonRef = document.getElementById("content-js");
  pokemonRef.innerHTML = "";

  const promises = arrayNamesAndLinks.map((pokemon) =>
    fetch(pokemon.url).then((res) => res.json())
  );
  const results = await Promise.all(promises);

  for (const data of results) {
    listOfPokemon.push(data);
    pokemonRef.innerHTML += getPokemonOverviewTemplate(data);
  }
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

function loadingScreen() {
  let overlayRef = document.getElementById("overlay-loading-js");
  overlayRef.classList.add("overlay-loading");
  overlayRef.innerHTML = getLoadingemplate();
}

function endLoadingScreen() {
  let overlayRef = document.getElementById("overlay-loading-js");
  overlayRef.classList.remove("overlay-loading");
  overlayRef.innerHTML = "";
}
