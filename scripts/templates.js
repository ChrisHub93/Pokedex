function getPokemonOverviewTemplate(pokemon) {
  const typesHTML = getTypesTemplate(pokemon);

  return `
    <div onclick="showPokemonInfo(${pokemon.id})" class="pokemon bg_${pokemon.types[0].type.name}">
      <div class="pokemon__id">
        <p>#${pokemon.id}</p>
      </div>
      <div class="pokemon__name">
        <h2>${pokemon.name}</h2>
      </div>
      <div class="pokemon__profile">
        <div class="pokemon__profile__type" id="types">
          ${typesHTML}
        </div>
        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="Pokemon Image" class="pokemon__profile__img">
      </div>
    </div>
  `;
}

function getTypesTemplate(pokemon) {
  return pokemon.types
    .map(
      (typeObj) =>
        `<p class="type bg_type_${pokemon.types[0].type.name}">${typeObj.type.name}</p>`
    )
    .join("");
}

function getPokemonInfoTemplate() {
  const typesHTML = getTypesInfoTemplate();
  return `
  <div class="info bg_${pokemonInfo.types[0].type.name}" onclick="event.stopPropagation()">
    <div class="info__box">
      <div class="info__close">
        <button onclick="closeInfo()" class="border--none hover bg_${pokemonInfo.types[0].type.name}">
          <img src="./assets/icons/close.svg" alt="Close">
        </button>
      </div>
      <div class="info__change">
        <button id="info-btn-left" onclick="showPreviousePokemonInfo(${pokemonInfo.id})" class="border--none hover bg_${pokemonInfo.types[0].type.name}">
          <img src="./assets/icons/arrow_back.svg" alt="left">
        </button>
        <button id="info-btn-right" onclick="showNextPokemonInfo(${pokemonInfo.id})" class="border--none hover bg_${pokemonInfo.types[0].type.name}">
          <img src="./assets/icons/arrow_forward.svg" alt="right">
        </button>
      </div>
      <div class="info__nameAndId">
        <h2>${pokemonInfo.name}</h2>
        <p>#${pokemonInfo.id}</p>
      </div>
      <div class="info__types" id="infoTypes">
        ${typesHTML}
      </div>
      <div class="info__img">
        <img src="${pokemonInfo.sprites.other["official-artwork"].front_default}" class="info__image">
      </div>
    </div>
    <div class="info__stats">
      <div class="info__stats__nav">
        <button id="aboutBtn" onclick="showAbout()" class="btnNav">About</button>
        <button id="baseBtn" onclick="showBaseStats()" class="btnNav">Base Stats</button>
        <button id="evolutionBtn" onclick="showEvolution()" class="btnNav">Evolution</button>
        <button id="movesBtn" onclick="showMoves()" class="btnNav">Moves</button>
      </div>
      <table class="info__statsTable info__statsTable__evolution" id="infoStatsTable">
        <div class="info__statsTable__moves" id="infoMoves-js"></div>
      </table>
    </div>
  </div>
  `;
}

function getFirstPokemonInfoTemplate() {
  const typesHTML = getTypesInfoTemplate();
  return `
  <div class="info bg_${pokemonInfo.types[0].type.name}" onclick="event.stopPropagation()">
    <div class="info__box">
      <div class="info__close">
        <button onclick="closeInfo()" class="border--none hover bg_${pokemonInfo.types[0].type.name}">
          <img src="./assets/icons/close.svg" alt="Close">
        </button>
      </div>
      <div class="info__change content-right">
        <button id="info-btn-right" onclick="showNextPokemonInfo(${pokemonInfo.id})" class="border--none hover bg_${pokemonInfo.types[0].type.name}">
          <img src="./assets/icons/arrow_forward.svg" alt="right">
        </button>
      </div>
      <div class="info__nameAndId">
        <h2>${pokemonInfo.name}</h2>
        <p>#${pokemonInfo.id}</p>
      </div>
      <div class="info__types" id="infoTypes">
        ${typesHTML}
      </div>
      <div class="info__img">
        <img src="${pokemonInfo.sprites.other["official-artwork"].front_default}" class="info__image">
      </div>
    </div>
    <div class="info__stats">
      <div class="info__stats__nav">
        <button id="aboutBtn" onclick="showAbout()" class="btnNav">About</button>
        <button id="baseBtn" onclick="showBaseStats()" class="btnNav">Base Stats</button>
        <button id="evolutionBtn" onclick="showEvolution()" class="btnNav">Evolution</button>
        <button id="movesBtn" onclick="showMoves()" class="btnNav">Moves</button>
      </div>
      <table class="info__statsTable info__statsTable__evolution" id="infoStatsTable">
        <div class="info__statsTable__moves" id="infoMoves-js"></div>
      </table>
    </div>
  </div>
  `;
}

function getLastPokemonInfoTemplate() {
  const typesHTML = getTypesInfoTemplate();
  return `
  <div class="info bg_${pokemonInfo.types[0].type.name}" onclick="event.stopPropagation()">
    <div class="info__box">
      <div class="info__close">
        <button onclick="closeInfo()" class="border--none hover bg_${pokemonInfo.types[0].type.name}">
          <img src="./assets/icons/close.svg" alt="Close">
        </button>
      </div>
      <div class="info__change">
        <button id="info-btn-left" onclick="showPreviousePokemonInfo(${pokemonInfo.id})" class="border--none hover bg_${pokemonInfo.types[0].type.name}">
          <img src="./assets/icons/arrow_back.svg" alt="left">
        </button>
      </div>
      <div class="info__nameAndId">
        <h2>${pokemonInfo.name}</h2>
        <p>#${pokemonInfo.id}</p>
      </div>
      <div class="info__types" id="infoTypes">
        ${typesHTML}
      </div>
      <div class="info__img">
        <img src="${pokemonInfo.sprites.other["official-artwork"].front_default}" class="info__image">
      </div>
    </div>
    <div class="info__stats">
      <div class="info__stats__nav">
        <button id="aboutBtn" onclick="showAbout()" class="btnNav">About</button>
        <button id="baseBtn" onclick="showBaseStats()" class="btnNav">Base Stats</button>
        <button id="evolutionBtn" onclick="showEvolution()" class="btnNav">Evolution</button>
        <button id="movesBtn" onclick="showMoves()" class="btnNav">Moves</button>
      </div>
      <table class="info__statsTable info__statsTable__evolution" id="infoStatsTable">
        <div class="info__statsTable__moves" id="infoMoves-js"></div>
      </table>
    </div>
  </div>
  `;
}

function getTypesInfoTemplate() {
  return pokemonInfo.types
    .map(
      (typeObj) =>
        `<p class="type bg_type_${pokemonInfo.types[0].type.name} mg-right10">${typeObj.type.name}</p>`
    )
    .join("");
}

function getTableAboutTemplate() {
  const abilitys = getAbilities();

  return `
                 
                  <tr>
                    <th>Height</th>
                    <td>${(pokemonInfo.height / 10).toFixed(2)} m</td>
                  </tr>
                  <tr>
                    <th>Weight</th>
                    <td>${(pokemonInfo.weight / 10).toFixed(2)} kg</td>
                  </tr>
                  <tr>
                    <th>Base Experience</th>
                    <td>${pokemonInfo.base_experience}</td>
                  </tr>
                  <tr>
                    <th>Abilities</th>
                    <td>${abilitys}</td>
                  </tr>
  `;
}

function getAbilities() {
  return pokemonInfo.abilities
    .map((obj) => `<p> ${obj.ability.name} </p>`)
    .join("");
}

function getTableBaseStatsTemplate() {
  return pokemonInfo.stats
    .map((stat) => {
      const barWidth = (stat.base_stat / 150) * 100;
      return `
          <tr>
            <th>${stat.stat.name}</th>
            <td>
              <div class="progress-bar">
                <div class="progress-bar__fill" style="width: ${barWidth}%"></div>
              </div>
            </td>
            <td>${stat.base_stat}</td>
          </tr>
        `;
    })
    .join("");
}

function getEvolutionTemplate() {
  return evolutionData
    .map(
      (typeObj) => `
        <div class="evolution">
          <img class="evolution__img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${typeObj.id}.png" class="info__image">
          <p class="evolution__name">${typeObj.name}</p>
        </div>
      `
    )
    .join("");
}

function getMovesTemplate() {
  return pokemonInfo.moves
    .map(
      (typeObj) => `    
                <p>${typeObj.move.name}</p>
              `
    )
    .join("");
}

function getSeachInputTemplate() {
  return `
        <img class="header__search__img" src="./assets/icons/search.svg" alt="Search Icon" />
        <input class="header__search__imput" type="text" id="search-input"/>
  `;
}

function getSearchLoadingStatus() {
  return `
  <p>loading for seach...${((allPokemonInfo.length / 1025) * 100).toFixed(
    2
  )}%</p>
  `;
}

function getLoadingemplate() {
  return `
  <div>
      <p>Please wait... Professor Oak is still organizing his Poké Balls!</p>
  </div>
  `;
}

function getNoPokemonFoundTemplate() {
  return `
    <p>Sorry, even Professor Oak could not find anything with that name.</p>
  `
}

function getLoadingTextTemplate() {
  return `
        <div class="loadingText">
          <p>Loading...</p>
        </div>
  `
}