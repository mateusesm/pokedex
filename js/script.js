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

        divPokemonCard.setAttribute('class', 'pokemon-card')

        divPokemonCard.setAttribute('id', `poke-card-${num}`)

        let urlPokemonImage = (arrayPokemons[num][6])

        let pokemonImg = document.createElement('img')
    
        pokemonImg.setAttribute('src', urlPokemonImage)

        pokemonImg.setAttribute('id', 'pokemon-card-img')
    
        divPokemonList.appendChild(divPokemonCard)

        divPokemonCard.appendChild(pokemonImg)

        divPokemonCard.addEventListener('click', (divPokemonCard) => {

            if (pokedexDisplay.className == 'pokedex-display-on') {

                let soundPokemonDisplay = new Audio('sounds/sound-pokemon-display.wav')

                soundPokemonDisplay.volume -= 0.5

                let urlPokemonImage = divPokemonCard.path[0].currentSrc

                let pokemonImg = document.createElement('img')

                pokemonImg.setAttribute('src', urlPokemonImage)

                pokemonImg.setAttribute('id', 'pokemon-display-img')

                if (!document.querySelector('#pokemon-display-img')) {

                    soundPokemonDisplay.play()

                    pokedexDisplay.appendChild(pokemonImg)

                } else {

                    let removePokemonImg = document.querySelector('#pokemon-display-img')

                    pokedexDisplay.removeChild(removePokemonImg)

                    soundPokemonDisplay.play()

                    pokedexDisplay.appendChild(pokemonImg)

                }
                    
            } else if (pokedexDisplay.className == 'pokedex-display-off') {

                alert('Ligue a pokédex para analisar um pokémon.')

            }

        })

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

const pokedexDisplay = document.querySelector('#pokedex-display')

const pokedexSecondDisplay = document.querySelector('#second-display')

function holdTightButton(id) {

    const button = document.querySelector(`#${id}`)

    let scale = 0.9

    let soundButton = new Audio('sounds/sound-button.wav')

    let soundOnButton = new Audio('sounds/sound-on.wav')

    let soundOffButton = new Audio('sounds/sound-off.wav')

    soundButton.play()

    button.style.transform = `scale(${scale})`

    if ((id == 'on-button') && (pokedexDisplay.className == 'pokedex-display-off') && (pokedexSecondDisplay.className == 'second-display-off')) {

        soundOnButton.play()
            
        pokedexDisplay.classList.remove('pokedex-display-off')

        pokedexSecondDisplay.classList.remove('second-display-off')
    
        pokedexDisplay.classList.add('pokedex-display-on')

        pokedexSecondDisplay.classList.add('second-display-on')
    

    } else if ((id == 'off-button') && (pokedexDisplay.className == 'pokedex-display-on') && (pokedexSecondDisplay.className == 'second-display-on'))  {

        soundOffButton.play()
    
        pokedexDisplay.classList.remove('pokedex-display-on')

        pokedexSecondDisplay.classList.remove('second-display-on')
    
        pokedexDisplay.classList.add('pokedex-display-off')

        pokedexSecondDisplay.classList.add('second-display-off')

        if (document.querySelector('#pokemon-display-img')) {

            let pokemonImg = document.querySelector('#pokemon-display-img')

            pokedexDisplay.removeChild(pokemonImg)

        }

    }

}

function dropButton(id) {

    const button = document.querySelector(`#${id}`)

    let scale = 1.0

    button.style.transform = `scale(${scale})`

}