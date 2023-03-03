const numRegEx = /\d+/g

const pokedexDisplay = document.querySelector('#pokedex-display')
const pokedexSecondDisplay = document.querySelector('#second-display')

const onPokedex = () => {
    if ((pokedexDisplay.className == 'pokedex-display-off') && (pokedexSecondDisplay.className == 'second-display-off')) {
        greenLed.style.backgroundColor = '#7BD434'
        soundOnButton.play()
        pokedexDisplay.classList.remove('pokedex-display-off')
        pokedexSecondDisplay.classList.remove('second-display-off')
        pokedexDisplay.classList.add('pokedex-display-on')
        pokedexSecondDisplay.classList.add('second-display-on')

        initialize()
    }
    return
}
const onButton = document.querySelector('#on-button')
onButton.addEventListener('mousedown', onPokedex)

const offPokedex = () => {
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
    return
}
const offButton = document.querySelector('#off-button')
offButton.addEventListener('mousedown', offPokedex)

const controllerButtons = document.querySelectorAll('.controller-button')

for (let controllerButton of controllerButtons) {
    controllerButton.addEventListener('mousedown', () => {

        if ((pokedexDisplay.className == 'pokedex-display-on') && (pokedexSecondDisplay.className == 'second-display-on')) {
            let idPokemon = 1

            if (document.querySelector('#pokemon-display-img')) {
                let imgDisplayPokemon = document.querySelector('#pokemon-display-img')
                let atualImgUrl = imgDisplayPokemon.getAttribute('src')
                let atualUrlNumber = Number(atualImgUrl.match(numRegEx))

                if (controllerButton.id == 'controller-button-top') { 
                    if (atualUrlNumber >= 4) {
                        idPokemon = atualUrlNumber - 3
                    } else {
                        idPokemon = 151
                    }    
                } else if (controllerButton.id == 'controller-middle-button-left') {
                    if (atualUrlNumber > 1 && atualUrlNumber <= 151) {
                        idPokemon = atualUrlNumber - 1
                    } else if (atualUrlNumber == 1) {
                        idPokemon = 151
                    }    
                } else if (controllerButton.id == 'controller-middle-button-right') {
                    if (atualUrlNumber < 151) {
                        idPokemon = atualUrlNumber + 1
                    } else if (atualUrlNumber == 151) {
                        idPokemon = 1
                    }    
                } else if (controllerButton.id == 'controller-bottom-button') {
                    if (atualUrlNumber <= 148) {
                        idPokemon = atualUrlNumber + 3
                    } else if (atualUrlNumber >= 149 && atualUrlNumber <= 150) {
                        idPokemon = 151
                    } else {
                        idPokemon = 1
                    }    
                }
            }
            showPokemon(idPokemon)
        }
    })
}

const blueNumberButtons = document.querySelectorAll('.blue-number-button')

for (let blueNumberButton of blueNumberButtons) {
    blueNumberButton.addEventListener('mousedown', () => {

        if ((pokedexDisplay.className == 'pokedex-display-on') && (pokedexSecondDisplay.className == 'second-display-on') && (document.querySelector('#pokemon-number'))) {
            let inputPokemonNumber = document.querySelector('#pokemon-number')
            let numberOfButton = blueNumberButton.textContent
            inputPokemonNumber.value += numberOfButton

        }

    })

}


const clearButton = document.querySelector('#clear-button')
clearButton.addEventListener('mousedown', () => {

    if ((pokedexDisplay.className == 'pokedex-display-on') && (pokedexSecondDisplay.className == 'second-display-on') && (document.querySelector('#pokemon-number'))) {

        let inputPokemonNumber = document.querySelector('#pokemon-number')
        inputPokemonNumber.value = inputPokemonNumber.value.slice(0, -1)

    } else {
        initialize()
    }

})

const confirmButton = document.querySelector('#confirm-button')
confirmButton.addEventListener('mousedown', () => {

    if ((pokedexDisplay.className == 'pokedex-display-on') && (pokedexSecondDisplay.className == 'second-display-on') && (document.querySelector('#pokemon-number'))) {
        let inputPokemonNumber = document.querySelector('#pokemon-number')
        let idPokemon = Number(inputPokemonNumber.value)
        showPokemon(idPokemon)    
    }

})


const blueLed = document.querySelector('#blue-led')
const greenLed = document.querySelector('#green-led')

const soundOnButton = new Audio('sounds/sound-on.wav')
const soundOffButton = new Audio('sounds/sound-off.wav')

const initialize = () => {
    if (document.querySelector('#pokemon-display-img')) {
        let pokemonImg = document.querySelector('#pokemon-display-img')
        pokedexDisplay.removeChild(pokemonImg)

    }

    blueLed.style.backgroundColor = '#1C91DA'

    pokedexSecondDisplay.innerHTML = '<p>Olá! Sou a Pokédex da região de Kanto, escolha qualquer pokémon pelas cartas ao lado, digitando seu número ou pelos botões direcionais, e te mostrarei seus principais dados!</p>'

    const inputPokemonNumber = document.createElement('input')

    inputPokemonNumber.setAttribute('id', 'pokemon-number')
    inputPokemonNumber.setAttribute('type', 'text')
    inputPokemonNumber.setAttribute('size', '4')
    inputPokemonNumber.setAttribute('maxlength', '4')
    inputPokemonNumber.setAttribute('disabled', "true")
    pokedexSecondDisplay.appendChild(inputPokemonNumber)

    return
}


const holdTightButton = (id) => {
    const button = document.querySelector(`#${id}`)
    let soundButton = new Audio('sounds/sound-button.wav')

    soundButton.play()
    button.style.transform = `scale(${0.9})`

    return
}

const dropButton = (id) => {
    const button = document.querySelector(`#${id}`)
    button.style.transform = `scale(${1.0})`

    return
}


const findPokemons = async (num) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`)
}


const showPokemon = (idPokemon) => {
    if ((pokedexDisplay.className == 'pokedex-display-on') && (pokedexSecondDisplay.className == 'second-display-on')) {

        if (document.querySelector('#pokemon-display-img')) {
            let removePokemonImg = document.querySelector('#pokemon-display-img')
            pokedexDisplay.removeChild(removePokemonImg)
           
        }

        if (idPokemon < 1 || idPokemon > 151) {
            pokedexSecondDisplay.innerHTML = ''
            pokedexSecondDisplay.innerHTML = `<p>[ERRO!] Pokémon não encontrado.<br/>
            Somente os 151 pokémons da 1ª geração estão disponíveis.<br/>
            Verifique o pokémon buscado ou o seu número e tente novamente.</p>`

        } else {
            const pokemons = JSON.parse((localStorage.getItem('pokemons')))
            const indexArrayPokemon = idPokemon - 1
            const pokemon = pokemons[indexArrayPokemon]

            let urlPokemonImage = pokemon.front_default
            let pokemonImg = document.createElement('img')
            let soundPokemonDisplay = new Audio('sounds/sound-pokemon-display.wav')
    
            pokemonImg.setAttribute('src', urlPokemonImage)
            pokemonImg.setAttribute('id', 'pokemon-display-img')
    
            blueLed.style.backgroundColor = '#49B8FA'
    
            soundPokemonDisplay.volume -= 0.5
            soundPokemonDisplay.play()
    
            pokedexDisplay.appendChild(pokemonImg)
            pokedexSecondDisplay.innerHTML = ''
    
            pokedexSecondDisplay.innerHTML = `<p>Número: ${pokemon.id}</p>`
            pokedexSecondDisplay.innerHTML += `<p>Nome: ${pokemon.name}</p>`
    
            if (pokemon.types.length == 2) {
                pokedexSecondDisplay.innerHTML += `<p>Tipo: ${pokemon.types[0].type.name} & ${pokemon.types[1].type.name} </p>`
    
            } else if (pokemon.types.length == 1) {
                pokedexSecondDisplay.innerHTML += `<p>Tipo: ${pokemon.types[0].type.name}</p>`
            }
    
            if (pokemon.abilities.length == 3) {
                pokedexSecondDisplay.innerHTML += `<p>Abilidades: ${pokemon.abilities[0].ability.name} & ${pokemon.abilities[1].ability.name} & ${pokemon.abilities[2].ability.name} </p>`
    
            } else if (pokemon.abilities.length == 2) {
                pokedexSecondDisplay.innerHTML += `<p>Abilidades: ${pokemon.abilities[0].ability.name} & ${pokemon.abilities[1].ability.name} </p>`
    
            } else if (pokemon.abilities.length == 1) {
                pokedexSecondDisplay.innerHTML += `<p>Abilidades: ${pokemon.abilities[0].ability.name}</p>`
    
            }
            pokedexSecondDisplay.innerHTML += `<p>Altura: ${pokemon.height/10} (metros)</p>`
            pokedexSecondDisplay.innerHTML += `<p>Peso: ${pokemon.weight/10} (kilos)</p>`
        }
      
    } else if (pokedexDisplay.className == 'pokedex-display-off') {
        alert('Ligue a pokédex para analisar um pokémon.')
    }

    return
}

const showPokemonCard = () => {
    const divPokemonList = document.querySelector('#pokemon-list')
    const pokemons = JSON.parse(localStorage.getItem('pokemons'))

    for (let pokemon of pokemons) {

        if (!document.querySelector(`#card-${pokemon.id}`)) {
            let divPokemonCard = document.createElement('div')
    
            divPokemonCard.setAttribute('class', 'pokemon-card')
            divPokemonCard.setAttribute('id', `card-${pokemon.id}`)
        
            let urlPokemonImage = (pokemon.front_default)
            let pokemonImg = document.createElement('img')
            
            pokemonImg.setAttribute('src', urlPokemonImage)
            pokemonImg.setAttribute('id', 'pokemon-card-img')
            
            divPokemonList.appendChild(divPokemonCard)
            divPokemonCard.appendChild(pokemonImg)
        
            divPokemonCard.addEventListener('click', () => {
                let idPokemon = Number(divPokemonCard.getAttribute('id').match(numRegEx))
                showPokemon(idPokemon)
            })
        }
            
    }

    return
}


const getPokemons = async () => {
    let arrayPokemons = []

    for (let num = 1; num <= 151; num++) {
        try {
            let response = await findPokemons(num)
            const { id, name, types, abilities, height, weight, sprites: { other: { home: { front_default } } } } = await response.json()

            const pokemon = {
                id,
                name,
                types,
                abilities,
                height,
                weight,
                front_default,
            }

            arrayPokemons.push(pokemon)

            localStorage.setItem('pokemons', JSON.stringify(arrayPokemons))
            showPokemonCard()   

        } catch (error) {
            console.log(error)
        }
      
    }

    arrayPokemons = []

    return
}

(function startPokedex() {
    if (localStorage.hasOwnProperty('pokemons')) {
        showPokemonCard()
        return
    } else {
        getPokemons()
        return
    }
})()