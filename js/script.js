let pokemonRepository = (function () {
    let pokemonList = [
    {
        name: 'Bulbasaur',
        height: 7,
        types: ['grass', 'poison']
    },
    {
        name: 'Butterfree',
        height: 1.1,
        types: ['bug', 'flying']
    },
    {
        name: 'Nidoqueen',
        height: 4.03,
        types: ['poison', 'ground']
    }
    ];

    function add(pokemon) {
        if (typeof pokemonList !== 'object') {
            alert('pokemonList is not an object')
        } else
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll    
    };

})();

//console.log(pokemonRepository.getAll())
function displayPokemonList (pokemon) {
    if (pokemon.height > 5) {
        document.write ("<p>" + pokemon.name + " (<span>Height:</span> " + pokemon.height + ") - Wow, that's big! </p>");  
    } else {
        document.write ("<p>" + pokemon.name + " (<span>Height:</span> " + pokemon.height + ") </p>");
    }
}

pokemonRepository.getAll().forEach(displayPokemonList);

 

