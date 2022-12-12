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
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        listItem.classList.add('list-group-item')
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        button.classList.add('btn');
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

    //Code to hide/show modal
    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');
        

        //Clear all existing modal content
        modalContainer.innerText = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButton = document.createElement('button');
        closeButton.classList.add('modal-close');
        closeButton.innerText = 'Close';
        closeButton.addEventListener('click', hideModal);

        let imgElement = document.createElement('img');
        imgElement.src = pokemon.imageURL;

        let titleElement = document.createElement('h2');
        titleElement.innerText = pokemon.name;

        let heightElement = document.createElement('p');
        heightElement.innerText = 'Height: ' + pokemon.height;

        modalContainer.appendChild(modal);
        modal.appendChild(imgElement);
        modal.appendChild(titleElement);
        modal.appendChild(heightElement);
        modal.appendChild(closeButton);

        modalContainer.classList.add('is-visible');

        //close modal by clicking outside the modal
        modalContainer.addEventListener('click', (e) => {
            //since this is also triggered when clicking INSIDE the modal
            //we only want to close if user clicks directly on the overlay
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    //close modal using ESC
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });
    
    //End code to hide/show modal

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







 

