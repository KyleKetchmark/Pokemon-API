const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
let url;

// DOM Variables
const searchWrapper = document.getElementsByClassName('wrapper');
const searchForm = document.querySelector('form');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('submit');
const pokeSection = document.querySelector('section');
const pokeMovesSection = document.getElementById('move-return')
const pokeInfoSection = document.getElementById('abil-return');
const pokeAbils = document.getElementsByClassName('data');

// Event listener - press submit - return results
searchForm.addEventListener('submit', fetchApi);

// Fetch Fx
async function fetchApi(e) {
    //prevent pg refresh
    e.preventDefault();
    //reassign - hoisting 
    url = pokeUrl
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
const pokeMovesSection = document.getElementById('move-return')
    while (pokeInfoSection.firstChild) {
        pokeInfoSection.removeChild(pokeInfoSection.firstChild)
    }
    while (pokeMovesSection.firstChild) {
        pokeMovesSection.removeChild(pokeMovesSection.firstChild)
    }

    //assign variables to object 
    let abilities = data.abilities;
    let moves = data.moves;

    //checks for input value
    if (abilities.length === 0) {
        console.log('No abilities');
    } else {
        //iterate through ability array and DOM abilities
        for (let i = 0; i < abilities.length; i++) {
            // console.log(abilities[i]);
            let currentAbility = abilities[i].ability.name;
            let abilityList = document.createElement('li');
            abilityList.innerText = `Ability: ${currentAbility}`
            pokeInfoSection.appendChild(abilityList);
        }
    }
    //check for moves value
    if (moves.length === 0) {
        console.log('No moves');
    } else {
        //iterate through moves and DOM moves
        // return move name at index
        for (let i = 0; i < moves.length; i++) {
            // console.log(moves[i]);
            let allMoves = moves[i].move.name;
            // console.log(allMoves);
            let moveList = document.createElement('li')
            moveList.innerText = `Move: ${allMoves}`;
            pokeMovesSection.appendChild(moveList);
        }
    }
}
