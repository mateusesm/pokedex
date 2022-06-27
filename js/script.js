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

            if (controllerButton.id == 'controller-button-top') {

                if (!document.querySelector('#pokemon-display-img')) {

                    nextUrlNumber = 151

                    let divPokemonCard = document.querySelector(`#card-${nextUrlNumber}`)

                    divPokemonList.scrollTo(0, 6350)

                    divPokemonCard.style.transform = `scale(${1.2})`
    
                } else {

                    let pokemonImg = document.querySelector('#pokemon-display-img')
        
                    let atualImgUrl = pokemonImg.getAttribute('src')

                    let atualUrlNumber = Number(atualImgUrl.match(numRegEx))

                    if (atualUrlNumber >= 4) {

                        nextUrlNumber = atualUrlNumber - 3

                    } else {

                        nextUrlNumber = 151

                    }

                }

            } /*else if (controllerButton.id == 'controller-button-left') {



            } else if (controllerButton.id == 'controller-button-right') {



            } else if (controllerButton.id == 'controller-button-bottom') {


            }*/

            showPokemon(nextUrlNumber, arrayPokemons)
            
            
           
            
            
            
            /*if (!document.querySelector('#pokemon-display-img')) {

                let atualUrlNumber = 0
                let nextUrlNumber = atualUrlNumber + 1

            } else {

                let pokemonImg = document.querySelector('#pokemon-display-img')
        
                let atualImgUrl = pokemonImg.getAttribute('src')

                const numRegEx = /\d+/g

                let atualUrlNumber = Number(atualImgUrl.match(numRegEx))

            }*/

                /* Se eu clicar em próximo

                   
                    showPokemon(nextUrlNumber, arrayPokemons)

                Se eu clicar em anterior

                    //let beforeUrlNumber = atualUrlNumber - 1

                    //showPokemon(nextUrlNumber, arrayPokemons)

                Se eu clicar pra cima

                     let upUrlNumber = atualUrlNumber - 2

                     //showPokemon(nextUrlNumber, arrayPokemons)

                Se eu clicar pra cima

                    let downUrlNumber = atualUrlNumber + 2

                    showPokemon(nextUrlNumber, arrayPokemons)*/
         
       

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

for (let c = 0; c < blueNumberButtons.length; c++) {

    blueNumberButtons[c].addEventListener('mousedown', () => {

        if ((pokedexDisplay.className == 'pokedex-display-on') && (pokedexSecondDisplay.className == 'second-display-on')) {

            let inputPokemonNumber = document.querySelector('#pokemon-number')

            let numberOfButton = blueNumberButtons[c].textContent

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

    pokedexSecondDisplay.innerHTML = '<p>Olá! Sou a Pokédex da região de Kanto, escolha qualquer pokémon pelas cartas ao lado ou digitando seu número, e te mostrarei seus principais dados!</p>'

    const inputPokemonNumber = document.createElement('input')

    inputPokemonNumber.setAttribute('id', 'pokemon-number')

    inputPokemonNumber.setAttribute('type', 'text')

    inputPokemonNumber.setAttribute('size', '4')

    inputPokemonNumber.setAttribute('maxlength', '4')

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

const showPokemon = (id = 0, arrayPokemons = []) => {

    if ((pokedexDisplay.className == 'pokedex-display-on') && (pokedexSecondDisplay.className == 'second-display-on')) {

        if (document.querySelector('#pokemon-display-img')) {

            let removePokemonImg = document.querySelector('#pokemon-display-img')

            pokedexDisplay.removeChild(removePokemonImg)
           
        }

        let idPokemon = id

        if (idPokemon < 1 || idPokemon > 151) {

            pokedexSecondDisplay.innerHTML = ''
            
            pokedexSecondDisplay.innerHTML = `<p>[ERRO!] Pokémon não encontrado.<br/>
            Somente os 151 pokémons da 1ª geração estão disponíveis.<br/>
            Verifique o pokémon buscado ou o seu número e tente novamente.</p>`

        } else {

            let urlPokemonImage = arrayPokemons[idPokemon][6]

            let pokemonImg = document.createElement('img')
    
            let blueLed = document.querySelector('#blue-led')
    
            let soundPokemonDisplay = new Audio('sounds/sound-pokemon-display.wav')
    
            pokemonImg.setAttribute('src', urlPokemonImage)
    
            pokemonImg.setAttribute('id', 'pokemon-display-img')
    
            blueLed.style.backgroundColor = '#49B8FA'
    
            soundPokemonDisplay.volume -= 0.5
    
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

}

getPokemons(showPokemon)