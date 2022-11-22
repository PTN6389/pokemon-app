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

//List each Pokemon and indicate the ones that have a height greater than 5
function displayPokemonList (pokemon) {
    if (pokemon.height > 5) {
        document.write ("<p>" + pokemon.name + " (<span>Height:</span> " + pokemon.height + ") - Wow, that's big! </p>");  
    } else {
        document.write ("<p>" + pokemon.name + " (<span>Height:</span> " + pokemon.height + ") </p>");
    }
}

pokemonList.forEach(displayPokemonList);

