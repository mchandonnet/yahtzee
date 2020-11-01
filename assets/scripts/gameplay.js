'use strict'

const store = require('./store')
const events = require('./events')

let tableDice = [] // only the dice that are being rolled
let savedDice = [] // only the dice that are being held

const randDie = function () {
  return (Math.floor(Math.random() * 6) + 1)
}

const clearScoresheet = function () {
  $('#ones-div').html('<a href="#" id="ones">Apply score to ACES</a>')
  $('#twos-div').html('<a href="#" id="twos">Apply score to TWOS</a>')
  $('#threes-div').html('<a href="#" id="threes">Apply score to THREES</a>')
  $('#fours-div').html('<a href="#" id="fours">Apply score to FOURS</a>')
  $('#fives-div').html('<a href="#" id="fives">Apply score to FIVES</a>')
  $('#sixes-div').html('<a href="#" id="sixes">Apply score to SIXES</a>')
  $('#sub-top').html('')
  $('#bonus').html('')
  $('#top-total').html('')
  $('#three_k-div').html('<a href="#" id="3k">Apply score to 3 of a Kind</a>')
  $('#four_k-div').html('<a href="#" id="4k">Apply score to 4 of a Kind</a>')
  $('#full_house-div').html('<a href="#" id="fh">Apply score to Full House</a>')
  $('#small_straight-div').html('<a href="#" id="ss">Apply score to Sm Straight</a>')
  $('#large_straight-div').html('<a href="#" id="ls">Apply score to Lg Straight</a>')
  $('#yahtzee-div').html('<a href="#" id="yahtzee">Apply score to Yahtzee</a>')
  $('#chance-div').html('<a href="#" id="chance">Apply score to Chance</a>')
  $('#lower-div').html('')
  $('#upper-div').html('')
  $('#grand-div').html('')
}

const newGame = function (res) {
  // clear the doce on the table
  $('#game-table').empty()
  tableDice.length = 0

  // clear the saved dice
  $('#saved-game-table').empty()
  savedDice.length = 0

  store.game = {}
  store.game.id = res.game._id
  store.game.ones = null
  store.game.twos = null
  store.game.threes = null
  store.game.fours = null
  store.game.fives = null
  store.game.sixes = null
  store.game.top_sub = null
  store.game.bonus = null
  store.game.top = null
  store.game.three_k = null
  store.game.four_k = null
  store.game.full_house = null
  store.game.small_straight = null
  store.game.large_straight = null
  store.game.yahtzee = null
  store.game.chance = null
  store.game.lower_total = null
  store.game.grand_total = null
  store.game.roundNumber = 1
  store.game.rollCount = 0
  store.game.activeGame = true

  $('#roll-dice').prop('disabled', false)
  $('#roll-dice').html('Roll!')

  // reset the scoresheet
  clearScoresheet()
  // $('#ones-div').html('<a href="#" id="ones">Apply score to ACES</a>')
  // $('#twos-div').html('<a href="#" id="twos">Apply score to TWOS</a>')
  // $('#threes-div').html('<a href="#" id="threes">Apply score to THREES</a>')
  // $('#fours-div').html('<a href="#" id="fours">Apply score to FOURS</a>')
  // $('#fives-div').html('<a href="#" id="fives">Apply score to FIVES</a>')
  // $('#sixes-div').html('<a href="#" id="sixes">Apply score to SIXES</a>')
  // $('#sub-top').html('')
  // $('#bonus').html('')
  // $('#top-total').html('')
  // $('#three_k-div').html('<a href="#" id="3k">Apply score to 3 of a Kind</a>')
  // $('#four_k-div').html('<a href="#" id="4k">Apply score to 4 of a Kind</a>')
  // $('#full_house-div').html('<a href="#" id="fh">Apply score to Full House</a>')
  // $('#small_straight-div').html('<a href="#" id="ss">Apply score to Sm Straight</a>')
  // $('#large_straight-div').html('<a href="#" id="ls">Apply score to Lg Straight</a>')
  // $('#yahtzee-div').html('<a href="#" id="yahtzee">Apply score to Yahtzee</a>')
  // $('#chance-div').html('<a href="#" id="chance">Apply score to Chance</a>')
  // $('#lower-div').html('')
  // $('#upper-div').html('')
  // $('#grand-div').html('')
}

const nextRound = function () {
  if (store.game.roundNumber < 13) {
    // clear the doce on the table
    $('#game-table').empty()
    tableDice.length = 0

    // clear the saved dice
    $('#saved-game-table').empty()
    savedDice.length = 0

    // increment the round number and reset the roll count
    store.game.roundNumber++
    store.game.rollCount = 0
  } else {
    // after 13 turns the game is over!
    events.onFinalizeGame()
  }
  console.log(store.game)
}

const showDie = function (index, die, loc) {
  let dieContainer = ''
  dieContainer = (`
    <input type="image" class="mx-4 die-border" src="./assets/images/dice-${die}.png" width="60px" height="60px" alt="Dice" id="rolled-die" data-value-index="${index}" />
  `)

  if (loc === 'roll') {
    $('#game-table').append(dieContainer)
  } else if (loc === 'save') {
    $('#saved-game-table').append(dieContainer)
  }
}

const addToHold = function (event) {
  if (store.game.rollCount > 0 && store.game.rollCount <= 3) {
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

    // console.log('roll: ', tableDice)
    // console.log('save: ', savedDice)
    // console.log('all: ', allDice)
  }
}

const addToTable = function (event) {
  if (store.game.rollCount > 0 && store.game.rollCount <= 3) {
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

    // console.log('roll: ', tableDice)
    // console.log('hold: ', savedDice)
  }
}

const rollDie = function () {
  // check if the game is active and the user has rolls remaining
  if (store.game.activeGame === true && store.game.rollCount < 3) {
    // prep the table for the next roll
    store.game.rollCount += 1 // increment the roll counter
    $('#game-table').empty() // clear the table for the next roll
    tableDice.length = 0 // reset the array for tracking rolled dice

    const diceToRoll = (5 - savedDice.length)
    for (let i = 0; i < diceToRoll; i++) {
      const die = randDie()
      tableDice.push(die)
      showDie(i, die, 'roll')
    }
  }
}

module.exports = {
  // rollCount: rollCount,
  // roundNumber: roundNumber,
  // activeGame: activeGame,
  rollDie: rollDie,
  addToHold: addToHold,
  addToTable: addToTable,
  nextRound: nextRound,
  tableDice: tableDice,
  savedDice: savedDice,
  clearScoresheet: clearScoresheet,
  newGame: newGame
}
