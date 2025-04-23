function getPokemonOverviewTemplate(pokemon) {
  let typesHTML = "";
  getTypesTemplate();

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

  function getTypesTemplate() {
    pokemon.types.forEach((typeObj) => {
      const htmlString = `<p class="type bg_type_${pokemon.types[0].type.name}">${typeObj.type.name}</p>`;
      typesHTML += htmlString;
    });
  }
}

function getPokemonInfoTemplate() {
  let typesHTML = "";
  getTypesTemplate()
  return `
  <div class="info pokemon bg_${pokemonInfo.types[0].type.name}" onclick="event.stopPropagation()">
              <div class="info__box">
                <div class="info__close">
                  <button onclick="closeInfo()" class="border--none hover bg_${pokemonInfo.types[0].type.name}"><img src="./assets/icons/close.svg" alt="Close"></button>
                </div>
                <div class="info__change">
                  <button onclick="showPreviousePokemonInfo(${pokemonInfo.id})" class="border--none hover bg_${pokemonInfo.types[0].type.name}"><img src="./assets/icons/arrow_back.svg" alt="left"></button>
                  <button onclick="showNextPokemonInfo(${pokemonInfo.id})" class="border--none hover bg_${pokemonInfo.types[0].type.name}"><img src="./assets/icons/arrow_forward.svg" alt="right"></button>
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
                    <a href="">About</a>
                    <a href="">Base Stats</a>
                    <a href="">Evolution</a>
                    <a href="">Moves</a>
                </div>
                <table class="info__statsTable" id="infoStatsTable">
                </table>
              </div>

          </div>
      </div>
  `;
  function getTypesTemplate() {
    pokemonInfo.types.forEach((typeObj) => {
      const htmlString = `<p class="type bg_type_${pokemonInfo.types[0].type.name} mg-right10">${typeObj.type.name}</p>`;
      typesHTML += htmlString;
    });
  }
}


function infoStatsTableAbout() {
  let abilitys = "";
 getAbilities()

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
                    <th>Abilities</th>
                    <td>${abilitys}</td>
                  </tr>
  `;

  function getAbilities() {
    const abilityNames = pokemonInfo.abilities.map((obj) => obj.ability.name);
    abilitys = abilityNames.join(', ');
  }
}

function infoStatsTableBaseStats() {
  return``
}

function infoStatsTableEvolution() {
  return``
}

function infoStatsTableMoves() {
  return``
}