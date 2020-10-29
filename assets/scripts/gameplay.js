'use strict'

let activeGame = true
let roundNumber = 1 // tracks turns - a game of yahtzee has 13 turns
let rollCount = 0 // tracks rolls per turn - max of 3
// let allDice = [] // includes all the dice
let tableDice = [] // only the dice that are being rolled
let savedDice = [] // only the dice that are being held

const randDie = function () {
  return (Math.floor(Math.random() * 6) + 1)
}

const nextRound = function () {
  if (roundNumber < 13) {
    // clear the doce on the table
    $('#game-table').empty()
    tableDice.length = 0

    // clear the saved dice
    $('#saved-game-table').empty()
    savedDice.length = 0

    // clear the allDice Array
    // allDice.length = 0

    // increment the round number and reset the roll count
    roundNumber++
    rollCount = 0
  } else {
    // after 13 turns the game is over!
    // prompt the user to start a new game
    activeGame = false
    console.log('This game is over!')
  }
}

const showDie = function (index, die, loc) {
  let dieContainer = ''
  dieContainer = (`
    <input type="image" class="mx-4 die-border" src="./assets/images/dice-${die}.png" width="70px" height="70px" alt="Dice" id="rolled-die" data-value-index="${index}" />
  `)

  if (loc === 'roll') {
    $('#game-table').append(dieContainer)
  } else if (loc === 'save') {
    $('#saved-game-table').append(dieContainer)
  }
}

const addToHold = function (event) {
  if (rollCount > 0 && rollCount <= 3) {
    // save the die that was clicked on and copy that value to the holdDice array
    savedDice.push(tableDice[event.target.dataset.valueIndex])

    // clear the dice displayed on the table
    $('#game-table').empty()
    $('#saved-game-table').empty()

    // display saved Dice
    for (let i = 0; i < savedDice.length; i++) {
      showDie(i, savedDice[i], 'save')
    }

    // remove newly saved die from tableDice array
    tableDice.splice(event.target.dataset.valueIndex, 1)

    // display table dice
    for (let i = 0; i < tableDice.length; i++) {
      showDie(i, tableDice[i], 'roll')
    }

    // build new allDice Array
    // allDice.length = 0
    // allDice = tableDice.concat(savedDice)
    // allDice.sort()

    console.log('roll: ', tableDice)
    console.log('save: ', savedDice)
    // console.log('all: ', allDice)
  }
}

const addToTable = function (event) {
  if (rollCount > 0 && rollCount <= 3) {
    // console.log(event.target.dataset.valueIndex)
    // save the die that was clicked on and copy that value to the holdDice array
    tableDice.push(savedDice[event.target.dataset.valueIndex])
    // clear the dice displayed on the table
    $('#game-table').empty()
    $('#saved-game-table').empty()
    // display table dice
    for (let i = 0; i < tableDice.length; i++) {
      showDie(i, tableDice[i], 'roll')
    }

    savedDice.splice(event.target.dataset.valueIndex, 1)

    // display saved Dice
    for (let i = 0; i < savedDice.length; i++) {
      showDie(i, savedDice[i], 'save')
    }

    // build new allDice Array
    // allDice.length = 0
    // allDice = tableDice.concat(savedDice)
    // allDice.sort()

    console.log('roll: ', tableDice)
    console.log('hold: ', savedDice)
    // console.log('all: ', allDice)
  }
}

const rollDie = function () {
  // check if the game is active and the user has rolls remaining
  if (activeGame && rollCount < 3) {
    // prep the table for the next roll
    rollCount += 1 // increment the roll counter
    $('#game-table').empty() // clear the table for the next roll
    tableDice.length = 0 // reset the array for tracking rolled dice
    // allDice.length = 0
    // allDice.push.apply(allDice, savedDice)

    const diceToRoll = (5 - savedDice.length)
    for (let i = 0; i < diceToRoll; i++) {
      const die = randDie()
      tableDice.push(die)
      // allDice.push(die)
      showDie(i, die, 'roll')
    }
  }
}

module.exports = {
  rollDie: rollDie,
  addToHold: addToHold,
  addToTable: addToTable,
  nextRound: nextRound,
  // allDice: allDice,
  tableDice: tableDice,
  savedDice: savedDice
}
