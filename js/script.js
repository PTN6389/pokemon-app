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
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 5) {
        document.write ("<p>" + pokemonList[i].name + " (<span>Height:</span> " + pokemonList[i].height + ") - Wow, that's big! </p>");  
    } else {
        document.write ("<p>" + pokemonList[i].name + " (<span>Height:</span> " + pokemonList[i].height + ") </p>");
    }
    
}