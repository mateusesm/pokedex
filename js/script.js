const pokedexDisplay = document.querySelector('#pokedex-display')

const pokedexSecondDisplay = document.querySelector('#second-display')

const onButton = document.querySelector('#on-button')

const offButton = document.querySelector('#off-button')


let blueLed = document.querySelector('#blue-led')

let greenLed = document.querySelector('#green-led')

let soundOnButton = new Audio('sounds/sound-on.wav')

let soundOffButton = new Audio('sounds/sound-off.wav')


onButton.addEventListener('mousedown', onPokedex)
offButton.addEventListener('mousedown', offPokedex)


function onPokedex() {

    if ((pokedexDisplay.className == 'pokedex-display-off') && (pokedexSecondDisplay.className == 'second-display-off')) {

        greenLed.style.backgroundColor = '#7BD434'

        soundOnButton.play()
            
        pokedexDisplay.classList.remove('pokedex-display-off')

        pokedexSecondDisplay.classList.remove('second-display-off')
    
        pokedexDisplay.classList.add('pokedex-display-on')

        pokedexSecondDisplay.classList.add('second-display-on')

        pokedexSecondDisplay.innerHTML = '<p>Olá! Sou a Pokédex da região de Kanto, escolha qualquer pokémon pelas cartas ao lado ou digitando seu número, e te mostrarei seus principais dados!</p>'

        const inputPokemonNumber = document.createElement('input')

        inputPokemonNumber.setAttribute('id', 'pokemon-number')

        inputPokemonNumber.setAttribute('type', 'text')

        inputPokemonNumber.setAttribute('size', '4')

        inputPokemonNumber.setAttribute('maxlength', '4')

        pokedexSecondDisplay.appendChild(inputPokemonNumber)

    }

}

function offPokedex() {

    if((pokedexDisplay.className == 'pokedex-display-on') && (pokedexSecondDisplay.className == 'second-display-on')) {

        greenLed.style.backgroundColor = '#36693E'

        blueLed.style.backgroundColor = '#146BA0'

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

function blueNumberButton() {

    

}

function holdTightButton(id) {

    const button = document.querySelector(`#${id}`)

    let scale = 0.9

    let soundButton = new Audio('sounds/sound-button.wav')

    soundButton.play()

    button.style.transform = `scale(${scale})`

}

function dropButton(id) {

    const button = document.querySelector(`#${id}`)

    let scale = 1.0

    button.style.transform = `scale(${scale})`

}

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

        divPokemonCard.setAttribute('id', `${num}`)

        let urlPokemonImage = (arrayPokemons[num][6])

        let pokemonImg = document.createElement('img')
    
        pokemonImg.setAttribute('src', urlPokemonImage)

        pokemonImg.setAttribute('id', 'pokemon-card-img')
    
        divPokemonList.appendChild(divPokemonCard)

        divPokemonCard.appendChild(pokemonImg)

        divPokemonCard.addEventListener('click', () => {

            if (pokedexDisplay.className == 'pokedex-display-on') {

                let idPokemon = divPokemonCard.id

                let soundPokemonDisplay = new Audio('sounds/sound-pokemon-display.wav')

                let blueLed = document.querySelector('#blue-led')

                let urlPokemonImage = arrayPokemons[idPokemon][6]

                let pokemonImg = document.createElement('img')

                soundPokemonDisplay.volume -= 0.5

                pokemonImg.setAttribute('src', urlPokemonImage)

                pokemonImg.setAttribute('id', 'pokemon-display-img')

                blueLed.style.backgroundColor = '#49B8FA'

                if (!document.querySelector('#pokemon-display-img')) {

                    soundPokemonDisplay.play()

                    pokedexDisplay.appendChild(pokemonImg)

                    pokedexSecondDisplay.innerHTML = ''

                    pokedexSecondDisplay.innerHTML = `<p>Número: ${arrayPokemons[idPokemon][0]}</p>`

                    pokedexSecondDisplay.innerHTML += `<p>Nome: ${arrayPokemons[idPokemon][1]}</p>`

                    if (arrayPokemons[idPokemon][2].length == 2) {

                        pokedexSecondDisplay.innerHTML += `<p>Tipo: ${arrayPokemons[idPokemon][2][0].type.name} & ${arrayPokemons[idPokemon][2][1].type.name} </p>`

                    } else if (arrayPokemons[idPokemon][2].length == 1) {

                        pokedexSecondDisplay.innerHTML += `<p>Tipo: ${arrayPokemons[idPokemon][2][0].type.name}</p>`

                    }

                    if (arrayPokemons[idPokemon][3].length == 3) {

                        pokedexSecondDisplay.innerHTML += `<p>Abilidades: ${arrayPokemons[idPokemon][3][0].ability.name} & ${arrayPokemons[idPokemon][3][1].ability.name} & ${arrayPokemons[idPokemon][3][2].ability.name} </p>`

                    } else if (arrayPokemons[idPokemon][3].length == 2) {

                        pokedexSecondDisplay.innerHTML += `<p>Abilidades: ${arrayPokemons[idPokemon][3][0].ability.name} & ${arrayPokemons[idPokemon][3][1].ability.name} </p>`

                    } else if (arrayPokemons[idPokemon][3].length == 1) {

                        pokedexSecondDisplay.innerHTML += `<p>Abilidades: ${arrayPokemons[idPokemon][3][0].ability.name}</p>`

                    }

                    pokedexSecondDisplay.innerHTML += `<p>Altura: ${arrayPokemons[idPokemon][4]/10} (metros)</p>`

                    pokedexSecondDisplay.innerHTML += `<p>Peso: ${arrayPokemons[idPokemon][5]/10} (kilos)</p>`

                } else {

                    let removePokemonImg = document.querySelector('#pokemon-display-img')

                    pokedexDisplay.removeChild(removePokemonImg)

                    soundPokemonDisplay.play()

                    pokedexDisplay.appendChild(pokemonImg)

                    pokedexSecondDisplay.innerHTML = ''

                    pokedexSecondDisplay.innerHTML = `<p>Número: ${arrayPokemons[idPokemon][0]}</p>`

                    pokedexSecondDisplay.innerHTML += `<p>Nome: ${arrayPokemons[idPokemon][1]}</p>`

                    if (arrayPokemons[idPokemon][2].length == 2) {

                        pokedexSecondDisplay.innerHTML += `<p>Tipo: ${arrayPokemons[idPokemon][2][0].type.name} & ${arrayPokemons[idPokemon][2][1].type.name} </p>`

                    } else if (arrayPokemons[idPokemon][2].length == 1) {

                        pokedexSecondDisplay.innerHTML += `<p>Tipo: ${arrayPokemons[idPokemon][2][0].type.name}</p>`

                    }

                    if (arrayPokemons[idPokemon][3].length == 3) {

                        pokedexSecondDisplay.innerHTML += `<p>Abilidades: ${arrayPokemons[idPokemon][3][0].ability.name} & ${arrayPokemons[idPokemon][3][1].ability.name} & ${arrayPokemons[idPokemon][3][2].ability.name} </p>`

                    } else if (arrayPokemons[idPokemon][3].length == 2) {

                        pokedexSecondDisplay.innerHTML += `<p>Abilidades: ${arrayPokemons[idPokemon][3][0].ability.name} & ${arrayPokemons[idPokemon][3][1].ability.name} </p>`

                    } else if (arrayPokemons[idPokemon][3].length == 1) {

                        pokedexSecondDisplay.innerHTML += `<p>Abilidades: ${arrayPokemons[idPokemon][3][0].ability.name}</p>`

                    }

                    pokedexSecondDisplay.innerHTML += `<p>Altura: ${arrayPokemons[idPokemon][4]/10} (metros)</p>`

                    pokedexSecondDisplay.innerHTML += `<p>Peso: ${arrayPokemons[idPokemon][5]/10} (kilos)</p>`

                }
                    
            } else if (pokedexDisplay.className == 'pokedex-display-off') {

                alert('Ligue a pokédex para analisar um pokémon.')

            }

        })

    }

}

getPokemons()