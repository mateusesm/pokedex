let arrayPokemons = []

const numRegEx = /\d+/g

const pokedexDisplay = document.querySelector('#pokedex-display')

const pokedexSecondDisplay = document.querySelector('#second-display')

const onButton = document.querySelector('#on-button')
onButton.addEventListener('mousedown', onPokedex)

const offButton = document.querySelector('#off-button')
offButton.addEventListener('mousedown', offPokedex)

const controllerButtons = document.querySelectorAll('.controller-button')

for (let controllerButton of controllerButtons) {

    controllerButton.addEventListener('mousedown', () => {

        if ((pokedexDisplay.className == 'pokedex-display-on') && (pokedexSecondDisplay.className == 'second-display-on')) {

            let nextUrlNumber = 1

            let divPokemonList = document.querySelector('#pokemon-list')

            if (document.querySelector('#pokemon-display-img')) {

                let divPokemonCard = 0

                let imgDisplayPokemon = document.querySelector('#pokemon-display-img')
        
                let atualImgUrl = imgDisplayPokemon.getAttribute('src')

                let atualUrlNumber = Number(atualImgUrl.match(numRegEx))

                if (controllerButton.id == 'controller-button-top') { 

                    if (atualUrlNumber >= 4) {

                        nextUrlNumber = atualUrlNumber - 3

                    } else {

                        nextUrlNumber = 151

                    }    
    
                } else if (controllerButton.id == 'controller-middle-button-left') {

                    if (atualUrlNumber > 1 && atualUrlNumber <= 151) {

                        nextUrlNumber = atualUrlNumber - 1

                    } else if (atualUrlNumber == 1) {

                        nextUrlNumber = 151

                    }    
                } else if (controllerButton.id == 'controller-middle-button-right') {

                    if (atualUrlNumber < 151) {

                        nextUrlNumber = atualUrlNumber + 1

                    } else if (atualUrlNumber == 151) {

                        nextUrlNumber = 1

                    }    

                } else if (controllerButton.id == 'controller-bottom-button') {

                    if (atualUrlNumber <= 148) {

                        nextUrlNumber = atualUrlNumber + 3

                    } else if (atualUrlNumber >= 149 && atualUrlNumber <= 150) {

                        nextUrlNumber = 151

                    } else {

                        nextUrlNumber = 1

                    }    

                }

            }

            showPokemon(nextUrlNumber, arrayPokemons)

        }

    })

}

const clearButton = document.querySelector('#clear-button')
clearButton.addEventListener('mousedown', () => {

    if ((pokedexDisplay.className == 'pokedex-display-on') && (pokedexSecondDisplay.className == 'second-display-on')) {
    
        if (document.querySelector('#pokemon-number')) {

            let inputPokemonNumber = document.querySelector('#pokemon-number')

            inputPokemonNumber.value = ''

        } else {

            initialize()

        }

    }

})

const confirmButton = document.querySelector('#confirm-button')
confirmButton.addEventListener('mousedown', () => {

    if ((pokedexDisplay.className == 'pokedex-display-on') && (pokedexSecondDisplay.className == 'second-display-on')) {
    
        if (document.querySelector('#pokemon-number')) {

            let inputPokemonNumber = document.querySelector('#pokemon-number')

            let idPokemon = Number(inputPokemonNumber.value)

            showPokemon(idPokemon, arrayPokemons)

        }

    }

})

const blueNumberButtons = document.querySelectorAll('.blue-number-button')

for (let blueNumberButton of blueNumberButtons) {

    blueNumberButton.addEventListener('mousedown', () => {

        if ((pokedexDisplay.className == 'pokedex-display-on') && (pokedexSecondDisplay.className == 'second-display-on')) {

            let inputPokemonNumber = document.querySelector('#pokemon-number')

            let numberOfButton = blueNumberButton.textContent

            inputPokemonNumber.value += numberOfButton

        }

    })

}

let blueLed = document.querySelector('#blue-led')

let greenLed = document.querySelector('#green-led')

let soundOnButton = new Audio('sounds/sound-on.wav')

let soundOffButton = new Audio('sounds/sound-off.wav')

const initialize = () => {

    if (document.querySelector('#pokemon-display-img')) {

        let pokemonImg = document.querySelector('#pokemon-display-img')

        pokedexDisplay.removeChild(pokemonImg)

    }

    blueLed.style.backgroundColor = '#146BA0'

    pokedexSecondDisplay.innerHTML = '<p>Ol??! Sou a Pok??dex da regi??o de Kanto, escolha qualquer pok??mon pelas cartas ao lado, digitando seu n??mero ou pelos bot??es direcionais, e te mostrarei seus principais dados!</p>'

    const inputPokemonNumber = document.createElement('input')

    inputPokemonNumber.setAttribute('id', 'pokemon-number')

    inputPokemonNumber.setAttribute('type', 'text')

    inputPokemonNumber.setAttribute('size', '4')

    inputPokemonNumber.setAttribute('maxlength', '4')

    inputPokemonNumber.setAttribute('disabled', "true")

    pokedexSecondDisplay.appendChild(inputPokemonNumber)

}

function onPokedex() {

    if ((pokedexDisplay.className == 'pokedex-display-off') && (pokedexSecondDisplay.className == 'second-display-off')) {

        greenLed.style.backgroundColor = '#7BD434'

        soundOnButton.play()
            
        pokedexDisplay.classList.remove('pokedex-display-off')

        pokedexSecondDisplay.classList.remove('second-display-off')
    
        pokedexDisplay.classList.add('pokedex-display-on')

        pokedexSecondDisplay.classList.add('second-display-on')

        initialize()

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

function holdTightButton(id) {

    const button = document.querySelector(`#${id}`)

    let soundButton = new Audio('sounds/sound-button.wav')

    soundButton.play()

    button.style.transform = `scale(${0.9})`

}

function dropButton(id) {

    const button = document.querySelector(`#${id}`)

    button.style.transform = `scale(${1.0})`

}

function findPokemons(num) {

    return fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`)

}

async function getPokemons(showPokemon) {

    const divPokemonList = document.querySelector('#pokemon-list')

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

        divPokemonCard.setAttribute('id', `card-${num}`)

        let urlPokemonImage = (arrayPokemons[num][6])

        let pokemonImg = document.createElement('img')
    
        pokemonImg.setAttribute('src', urlPokemonImage)

        pokemonImg.setAttribute('id', 'pokemon-card-img')
    
        divPokemonList.appendChild(divPokemonCard)

        divPokemonCard.appendChild(pokemonImg)

        divPokemonCard.addEventListener('click', () => {

            let idPokemon = Number(divPokemonCard.getAttribute('id').match(numRegEx))

            showPokemon(idPokemon, arrayPokemons)

        })

    }

}

const showPokemon = (idPokemon = 0, arrayPokemons = []) => {

    if ((pokedexDisplay.className == 'pokedex-display-on') && (pokedexSecondDisplay.className == 'second-display-on')) {

        if (document.querySelector('#pokemon-display-img')) {

            let removePokemonImg = document.querySelector('#pokemon-display-img')

            pokedexDisplay.removeChild(removePokemonImg)
           
        }

        if (idPokemon < 1 || idPokemon > 151) {

            pokedexSecondDisplay.innerHTML = ''
            
            pokedexSecondDisplay.innerHTML = `<p>[ERRO!] Pok??mon n??o encontrado.<br/>
            Somente os 151 pok??mons da 1?? gera????o est??o dispon??veis.<br/>
            Verifique o pok??mon buscado ou o seu n??mero e tente novamente.</p>`

        } else {

            let urlPokemonImage = arrayPokemons[idPokemon][6]

            let pokemonImg = document.createElement('img')
    
            let soundPokemonDisplay = new Audio('sounds/sound-pokemon-display.wav')
    
            pokemonImg.setAttribute('src', urlPokemonImage)
    
            pokemonImg.setAttribute('id', 'pokemon-display-img')
    
            blueLed.style.backgroundColor = '#49B8FA'
    
            soundPokemonDisplay.volume -= 0.5
    
            soundPokemonDisplay.play()
    
            pokedexDisplay.appendChild(pokemonImg)
    
            pokedexSecondDisplay.innerHTML = ''
    
            pokedexSecondDisplay.innerHTML = `<p>N??mero: ${arrayPokemons[idPokemon][0]}</p>`
    
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

        alert('Ligue a pok??dex para analisar um pok??mon.')

    }

}

getPokemons(showPokemon)