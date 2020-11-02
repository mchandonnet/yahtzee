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
  // views(changepw, login, register, nav, game, highScores, APIError)
  // Register User / Already a user
  $('#anchor-login').on('click', function () {
    ui.resetForms(true)
    ui.views(false, true, false, false, false, false, false)
  })

  $('#anchor-register-user').on('click', function () {
    ui.resetForms(true)
    ui.views(false, false, true, false, false, false, false)
  })

  $('#anchor-back-to-game').on('click', function () {
    ui.resetForms(true)
    ui.views(false, false, false, true, true, false, false)
  })

  $('#btn-home').on('click', function () {
    ui.resetForms(true)
    ui.views(false, false, false, true, true, false, false)
  })

  $('#btn-leaders').on('click', function () {
    ui.resetForms(true)
    events.getLeaders()
  })

  $('#btn-change-password').on('click', function () {
    ui.resetForms(true)
    ui.views(true, false, false, true, false, false, false)
  })

  $('#btn-logout').on('click', events.onSignOut)

  // Create event listeners for Game PLay
  // ---------------------------------------------------------------------- //
  // Roll Dice / Hold Dice
  $('#roll-dice').on('click', gamePlay.rollDie)
  $('#game-table').on('click', '#rolled-die', gamePlay.addToHold)
  $('#saved-game-table').on('click', '#rolled-die', gamePlay.addToTable)

  // add score
  $('#ones-div').on('click', '#ones', function () {
    events.onScoreTop(1)
  })

  $('#twos-div').on('click', '#twos', function () {
    events.onScoreTop(2)
  })

  $('#threes-div').on('click', '#threes', function () {
    events.onScoreTop(3)
  })

  $('#fours-div').on('click', '#fours', function () {
    events.onScoreTop(4)
  })

  $('#fives-div').on('click', '#fives', function () {
    events.onScoreTop(5)
  })

  $('#sixes-div').on('click', '#sixes', function () {
    events.onScoreTop(6)
  })

  $('#three_k-div').on('click', '#3k', function () {
    events.onScoreBottom('3k')
  })

  $('#four_k-div').on('click', '#4k', function () {
    events.onScoreBottom('4k')
  })
  $('#full_house-div').on('click', '#fh', function () {
    events.onScoreBottom('fh')
  })
  $('#small_straight-div').on('click', '#ss', function () {
    events.onScoreBottom('ss')
  })
  $('#large_straight-div').on('click', '#ls', function () {
    events.onScoreBottom('ls')
  })
  $('#yahtzee-div').on('click', '#yahtzee', function () {
    events.onScoreBottom('yahtzee')
  })
  $('#chance-div').on('click', '#chance', function () {
    events.onScoreBottom('chance')
  })

  // link for creating a new game
  $('#start-new-game').on('click', events.onNewGame)
})
