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
            showModal(pokemon);
        });
    }

    function addListItem(pokemon) {
        let pokemonList = $('.pokemon-list');
        let listItem = $('<li class="list-group-item"></li>');
        let button = $('<button type="button" class="btn button-class" data-toggle="modal" data-target="#pokemonDetailsModal">' + pokemon.name + '</button>');
        listItem.append(button);
        pokemonList.append(listItem);
        button.on('click', function(event) {
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
          hideLoadingMessage();
            return response.json();
        }).then(function(details) {
            item.imageURL = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        });
    }

    //Code to show modal
    function showModal(pokemon) {
        let modalHeader = $('.modal-header');
        let modalTitle = $('.modal-title');
        let modalBody = $('.modal-body');
        
            

        //Clear all existing modal content
        modalTitle.empty();
        modalBody.empty();

        let titleElement = $('<h2>' + pokemon.name + '</h2>');
        
        let imgElement = $('<img class="modal-img" style="width:50%">');
        imgElement.attr("src", pokemon.imageURL);

       let heightElement = $('<p><span>Height: </span>' + pokemon.height + '</p>');

        modalTitle.append(titleElement);
        modalBody.append(imgElement);
        modalBody.append(heightElement);
    }
    //End code to show modal

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







 

