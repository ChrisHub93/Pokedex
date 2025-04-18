function getPokemonOverviewTemplate(pokemon) {
  let typesHTML = "";
  getTypesTemplate();

  return `
     <div onclick="openInfo(${pokemon.id})" class="pokemon bg_${pokemon.types[0].type.name}">
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
  
}