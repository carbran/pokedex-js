const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function convertPokeSpeciesToSpeciesModel(species) {
    const pokemonSpecies = new PokemonSpecies()

    pokemonSpecies.name = species.name

    if (species.gender_rate < 0) {
        pokemonSpecies.gender = 'genderless'
    } else {
        const femaleRate = (species.gender_rate / 8) * 100
        const maleRate = 100 - femaleRate
        pokemonSpecies.gender = `${femaleRate}% female ${maleRate} male`
    }
    
    pokemonSpecies.eggGroups = species.egg_groups.maps((eggSlot) => eggSlot.name).join()

    return pokemonSpecies
}

function convertPokeApiDetailToPokemonAbout(about) {
    const pokemon = new Pokemon()
    const pokemonAbout = new PokemonAbout()

    pokemon.number = about.id
    pokemon.name = about.name

    const types = about.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = about.sprites.other.dream_world.front_default

    pokemonAbout.pokemon = pokemon

    pokemonAbout.height = about.height
    pokemonAbout.weight = about.weight

    pokemonAbout.abilities = about.abilities.map((abilitySlot) => abilitySlot.ability.name).join()

    const urlSpecies = about.species.url

    const pokeSpecies = pokeApi.getPokemonSpecies(urlSpecies)

    pokemonAbout.species = pokeSpecies

    return pokemonAbout
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        //  Lista de promessas
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))

}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemonAboutById = (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemonAbout)
}

pokeApi.getPokemonSpecies = (speciesUrl) => {

    return fetch(speciesUrl)
        .then((response) => response.json())
        .then(convertPokeSpeciesToSpeciesModel)
}