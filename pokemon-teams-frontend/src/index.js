// const BASE_URL = "http://localhost:3000"
// const TRAINERS_URL = `${BASE_URL}/trainers`
// const POKEMONS_URL = `${BASE_URL}/pokemons`

// fetch for trainers + teams 

function main() {
    loadTrainers()
    listenForDelete()
}


function loadTrainers(){

    fetch('http://localhost:3000/trainers')
    .then(resp => resp.json())
    .then(trainers => {
        trainers.forEach(trainer => renderTrainer(trainer)) 
    })

}


function renderTrainer(trainer){

    const main = document.querySelector('main')
    main.innerHTML += renderCard(trainer)
    pokemonInfo(trainer)
  
}


function renderCard(trainer){
    return (`
    <div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
    <button data-trainer-id=${trainer.id}>Add Pokemon</button>
    <ul id=${trainer.id}-pokemon>
    
    
    </ul>
    </div>  
    `)
}

function pokemonInfo(trainer){
    const fullPokeTeam = trainer.pokemons 
    const trainerCard = document.getElementById(`${trainer.id}-pokemon`)

    fullPokeTeam.forEach(pokemon => {
        const li = `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
        trainerCard.innerHTML += li
    })
}

// delete a pokeman 
//              - target the main div 
//               - add an event listener for click 
//     - stop default? * 
//     - conditional to make sure the click is on a release button 
//     - find the specific release button 
//     - add controller action for delete
//     - also a fetch req happens 
//     - remove the association to the trainer 
//     - re-render the card sans pokeman 

function listenForDelete(){

    const main = document.querySelector('main')
    main.addEventListener('click', function(event){
        if (event.target.className === "release"){
            const pokemonId = event.target.dataset.pokemonId
            event.target.parentNode.remove()
            console.log(pokemonId);
            removePokemon(pokemonId)
            // target the li and set it to ""
        }
    })
}

function removePokemon(pokemonId){
    
    const reqObj = {
        method: 'DELETE'
        // NOW IVE LEARNED IT 
    }

    fetch(`http://localhost:3000/pokemons/${pokemonId}`, reqObj)
        .then (resp => resp.text())
        .then (pokeData => {
            console.log(pokeData)
            console.log('yes');
        })
}














main()