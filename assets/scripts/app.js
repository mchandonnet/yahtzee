'use strict'

const events = require('./events')
const gamePlay = require('./gameplay')
const scoring = require('./scoring')
const ui = require('./ui')

$(() => {
  // create event listeners for form submissions
  // ---------------------------------------------------------------------- //
  // login / registration / change password
  $('#login-form').on('submit', events.onSignIn)
  // registration
  $('#register-form').on('submit', events.onRegister)
  // change password
  $('#change-password-form').on('submit', events.onChangePW)

  // Create event listeners for links
  // ---------------------------------------------------------------------- //
  // Register User / Already a user
  $('#anchor-login').on('click', function () {
    ui.views(false, true, false, false, false)
  })

  $('#anchor-register-user').on('click', function () {
    ui.views(false, false, true, false, false)
  })

  // Create event listeners for Game PLay
  // ---------------------------------------------------------------------- //
  // Roll Dice / Hold Dice
  $('#roll-dice').on('click', gamePlay.rollDie)
  $('#game-table').on('click', '#rolled-die', gamePlay.addToHold)
  $('#saved-game-table').on('click', '#rolled-die', gamePlay.addToTable)

  // add score
  $('#ones').on('click', function () {
    scoring.count(1)
  })

  $('#twos').on('click', function () {
    scoring.count(2)
  })

  $('#threes').on('click', function () {
    scoring.count(3)
  })

  $('#fours').on('click', function () {
    scoring.count(4)
  })

  $('#fives').on('click', function () {
    scoring.count(5)
  })

  $('#sixes').on('click', function () {
    scoring.count(6)
  })

  // temp for newRound
  $('#start-new-game').on('click', gamePlay.nextRound)
})
