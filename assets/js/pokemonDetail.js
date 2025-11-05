const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const detalhes = document.getElementById('detalhes')

if (id) {
    buscarDetalhes(id);
} else {
    console.error('Nenhum ID encontrado na URL');
}

function buscarDetalhes(id) {
    pokeApi.getPokemonAboutById(id)
        .then((pokemonAbout) => {
            detalhes.innerHTML = `
            <div id="name">${pokemonAbout.pokemon.name}</div>
            <div id="photo">${pokemonAbout.pokemon.photo}</div>
            <div id="species">${pokemonAbout.species.name}</div>
            `
        })
}

buscarDetalhes(id)
