
function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src=${pokemon.photo} alt="${pokemon.name}">
        </div>
    </li>
    `
}

const pokemonList = document.getElementById('pokemonList')

pokeApi.getPokemons()
    .then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
    })
    .catch((error) => console.error(error))

// sobre o método map: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map

// const listItems = []
// for (let i = 0; i < pokemons.length; i++) {
//     const pokemon = pokemons[i];
//     listItems.push(convertPokemonToLi(pokemon))
// }
// console.log(listItems);

// A transformação acima foi substituida pelo map
// Ao invés de map((pokemon) => convertPokemonToLi(pokemon)) foi passada 
// a referência da função pis o map já trabalha com cada item e entende o que fazer
// A função join no final junta a lista resultante separando ela com ''
// pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')