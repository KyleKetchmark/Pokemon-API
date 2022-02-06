const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
let url;

// DOM Variables
//Search bar
const searchWrapper = document.getElementsByClassName('displayResults');
const searchForm = document.querySelector('form');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('submit');
//Poke displayed results
const pokeDisplay = document.getElementById('pokeDisplay')
const pokeName = document.getElementById('name')
const pokeTypeSection = document.getElementById('type-return');
const pokeImgSection = document.getElementById('pokeImg');
const pokeMovesSection = document.getElementById('move-return');
const pokeInfoSection = document.getElementById('abil-return');
const pokeAbils = document.getElementsByClassName('data');

// Event listener - press submit - return results
searchForm.addEventListener('submit', fetchApi);

// Fetch Fx
async function fetchApi(e) {
    //prevent pg refresh
    e.preventDefault();
    //reassign - hoisting 
    url = pokeUrl;
    // console.log(url);
    //if searchInput is NOT empty return pokemon url
    if (searchInput.value !== '') {
        url += searchInput.value;
    }
    let response = await fetch(url);
    let data = await response.json();
    displayPokemon(data);
}

//Display function
function displayPokemon(data) {
    console.log("Returned data: ", data);

    //removes content upon new submit
    while (pokeImgSection.firstChild) {
        pokeName.removeChild(pokeName.firstChild);
        pokeImgSection.removeChild(pokeImgSection.firstChild);
    }
    while (pokeTypeSection.firstChild) {
        pokeTypeSection.removeChild(pokeTypeSection.firstChild);
    }
    while (pokeMovesSection.firstChild) {        
        pokeMovesSection.removeChild(pokeMovesSection.firstChild);
    }
    while (pokeInfoSection.firstChild) {
        pokeInfoSection.removeChild(pokeInfoSection.firstChild);
    }
    
    //assign variables from returned object keys
    let abilities = data.abilities;
    let moves = data.moves;
    let type = data.types[0].type.name;
    let pokeImg = data.sprites.front_default;
    let pokeNameDisplay = data.name;
    
    //display name
    let nameDisplay = document.createElement('h3');
    nameDisplay.innerText = `${pokeNameDisplay}`;
    pokeName.appendChild(nameDisplay);
    
    //display img
    let imgDisplay = document.createElement('img');
    imgDisplay.src = pokeImg;
    pokeImgSection.appendChild(imgDisplay);
    
    //display type
    let typeHeading = document.createElement('h3');
    typeHeading.innerText = 'Type:'
    pokeTypeSection.appendChild(typeHeading)
    let typeDisplay = document.createElement('p');
    typeDisplay.innerText = type;
    pokeTypeSection.appendChild(typeDisplay);
    
    //abil header append
    let abilHeader = document.createElement('h3')
    abilHeader.innerText = 'Abilites:'
    pokeInfoSection.appendChild(abilHeader)
    
    //checks for input value
    if (abilities.length === 0) {
        console.log('No abilities');
    } else {
        //iterate through ability array and DOM abilities
        for (let i = 0; i < abilities.length; i++) {
            // console.log(abilities[i]);
            let currentAbility = abilities[i].ability.name;
            let abilityList = document.createElement('li');
            abilityList.innerText = `${currentAbility}`
            pokeInfoSection.appendChild(abilityList);
        }
    }

    //Moves append
    let moveHeader = document.createElement('h3')
    moveHeader.innerText = 'Moves:'
    pokeMovesSection.appendChild(moveHeader)

    //check for moves value
    if (moves.length === 0) {
        console.log('No moves');
    } else {
        //iterate through moves and DOM moves
        // return move name at index
        //firstMoves returns first 4 in array
        let firstMoves = moves.slice(0, 4)
        for (let i = 0; i < firstMoves.length; i++) {
            let startMoves = firstMoves[i].move.name;
            // console.log(allMoves);
            let moveList = document.createElement('li')
            moveList.innerText = `${startMoves}`;
            pokeMovesSection.appendChild(moveList);
        }
    }
}
