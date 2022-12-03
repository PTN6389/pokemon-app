let pokemonRepository = (function () {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
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
    
    function showLoadingMessage() {
        let loadingMessageContainer = document.querySelector('.loading-message-container');
        let loadingMessageAdd = document.createElement('p');
        loadingMessageAdd.innerText = 'Loading pokemon list...'
        loadingMessageContainer.appendChild(loadingMessageAdd);
    }

    function hideLoadingMessage() {
        let loadingMessageContainer = document.querySelector('.loading-message-container');
        let loadingMessageRemove = document.querySelector('p');
        loadingMessageContainer.removeChild(loadingMessageRemove);
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiURL).then(function (response) {
            hideLoadingMessage();
            return response.json();
        }).then(function(json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsURL: item.url
                };
                add(pokemon); 
            });
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsURL;
        showLoadingMessage();
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function(details) {
            item.imageURL = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        add: add,
        getAll: getAll, 
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };

})();


pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);   
    });
});







 

