function findPokemons(num) {

    return fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`)

}

async function getPokemons() {

    const divPokemonList = document.querySelector('#pokemon-list')

    let arrayPokemons = []

    for (let num = 1; num <= 151; num++) {

        if (!localStorage.hasOwnProperty(`pokemon${num}`)) {

            try {

                let response = await findPokemons(num)

                let jsonResponse = await response.json()

                arrayPokemons = [

                    jsonResponse.id,
                    jsonResponse.name,
                    jsonResponse.types,
                    jsonResponse.abilities,
                    jsonResponse.height,
                    jsonResponse.weight,
                    jsonResponse.sprites.other.home.front_default

                ]
                
                localStorage.setItem(`pokemon${num}`, JSON.stringify(arrayPokemons))

            } catch (error) {

                console.log(error)

            }

        }
        
    }

    arrayPokemons = []

    for (num = 1; num <= localStorage.length; num++) {

        arrayPokemons[num] = (JSON.parse((localStorage.getItem(`pokemon${num}`))))

        let divPokemonCard = document.createElement('div')

        divPokemonCard.setAttribute('id', 'pokemon-card')

        let urlPokemonImage = (arrayPokemons[num][6])

        let pokemonImg = document.createElement('img')
    
        pokemonImg.setAttribute('src', urlPokemonImage)

        pokemonImg.setAttribute('id', 'pokemon-img')
    
        divPokemonList.appendChild(divPokemonCard)

        divPokemonCard.appendChild(pokemonImg)

    }

}

getPokemons()

/*

status
hp
atack
defesa
velocidade
total

habilidades
1 atack especial

*/

function holdTightButton(id) {

    const button = document.querySelector(`#${id}`)

    let scale = 0.9

    button.style.transform = `scale(${scale})`

    let soundButton = new Audio('sounds/sound-button.wav')

    soundButton.play()

}

function dropButton(id) {

    const button = document.querySelector(`#${id}`)

    let scale = 1.0

    button.style.transform = `scale(${scale})`

}

const onButton = document.querySelector('#on-button')

const offButton = document.querySelector('#off-button')

const pokedexDisplay = document.querySelector('#pokedex-display')

const divPokemonCard = document.querySelector('#pokemon-card')

    
onButton.addEventListener('mousedown', () => {

    if (pokedexDisplay.className == 'pokedex-display-off') {

        let soundButton = new Audio('sounds/sound-on.wav')

        soundButton.play()
        
        pokedexDisplay.classList.remove('pokedex-display-off')

        pokedexDisplay.classList.add('pokedex-display-on')

    }

})

offButton.addEventListener('mousedown', () => {

    if (pokedexDisplay.className == 'pokedex-display-on') {

        let soundButton = new Audio('sounds/sound-off.wav')

        soundButton.play()

        pokedexDisplay.classList.remove('pokedex-display-on')

        pokedexDisplay.classList.add('pokedex-display-off')

    }

})

const soundCard = new Audio('sounds/sound-cards-transition2.wav')

divPokemonCard.addEventListener('mouseover', () => {

    soundCard.play()

})