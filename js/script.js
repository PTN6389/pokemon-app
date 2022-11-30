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
        } else {
        pokemonList.push(pokemon);
        }
    }

    function getAll() {
        return pokemonList;
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    function addListItem(pokemon) {

        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', function(event) {
            showDetails(pokemon)
        });
    } 
    
   

    return {
        add: add,
        getAll: getAll, 
        addListItem: addListItem
    };

})();


pokemonRepository.getAll().forEach(function (pokemon) {
    
    pokemonRepository.addListItem(pokemon);
    
    
});




 

