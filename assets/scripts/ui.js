'use strict'

const gameplay = require('./gameplay')
const store = require('./store')

// Promise functions for Failed api calls
// ---------------------------------------------------------------------- //

// Registration Success
const onRegSuccess = function () {
  $('#registration-result').html('<p class="alert alert-success">Thanks for registering.  You are being redirected to the login page...</p>')
  setTimeout(function () {
    resetForms(true)
    views(false, true, false, false)
  }, 5000)
}

// Login Success
const onLoginSuccess = function (res) {
  // reset forms
  resetForms(true)
  // store the user infirmation to the store variable
  store.user = res.user
  // show / hide forms
  views(false, false, false, true, true)
}

// Change Password Success
const onChangeSuccess = function () {
  // show a confirmation message
  $('#change-password-result').html('<p class="alert alert-success">Password changed Succesfully</p>')
  // wait 5 seconds, and reset the forms and html
  setTimeout(function () {
    resetForms(true)
  }, 5000)
}

// Promise functions for Failed api calls
// ---------------------------------------------------------------------- //

// Registration Failure
const onRegFailure = function () {
  $('#registration-result').html('<p class="alert alert-danger">Something went wrong. Please check your email address and password and try again</p>')
  setTimeout(function () {
    resetForms(true)
  }, 5000)
}

// Login Failure
const onLoginFailure = function () {
  // Show error message
  $('#login-result').html('<p class="alert alert-danger">Login failed - check your email address and password, and try again</p>')
  // wait 5 seconds, then reset the forms and clear the html
  setTimeout(function () {
    resetForms(true)
  }, 5000)
}

// Change password failure
const onChangeFailure = function () {
  // show an error message
  $('#change-password-result').html('<p class="alert alert-danger">Password change failed - check your password, and try again!</p>')
  // wait 5 seconds, and reset the forms and html
  setTimeout(function () {
    resetForms(true)
  }, 5000)
}

// General Game Functions
// ---------------------------------------------------------------------- //
const onNewGameSuccess = function (res) {
  gameplay.newGame(res)
}

const onNewGamefailure = function () {
  console.log('Failure')
}

const onScoreTopSuccess = function (res) {
  gameplay.nextRound()
}

const onScoreTopFailure = function () {
  console.log('Failure')
}

const onScoreBottomSuccess = function (res) {
  console.log('onScoreBottomSuccess: ', 'success')
  gameplay.nextRound()
}

const onScoreBottomFailure = function () {
  console.log('Failure')
}
// General UI functions
// ---------------------------------------------------------------------- //
// Reset forms
const resetForms = function (html) {
  $('#change-password-form').trigger('reset')
  $('#login-form').trigger('reset')
  $('#register-form').trigger('reset')
  if (html) {
    resetHTML()
  }
}

// Reset HTML for warning messages
const resetHTML = function () {
  $('#registration-result').html('')
  $('#login-result').html('')
  $('#change-password-result').html('')
  $('#api-failure').html('')
}

const views = function (changepw, login, register, nav, game) {
  if (changepw) {
    $('#change-password-form').show()
  } else {
    $('#change-password-form').hide()
  }

  if (login) {
    $('#login-form').show()
  } else {
    $('#login-form').hide()
  }

  if (register) {
    $('#register-form').show()
  } else {
    $('#register-form').hide()
  }

  if (nav) {
    $('#nav-images').show()
  } else {
    $('#nav-images').hide()
  }

  if (game) {
    $('#game-section').show()
  } else {
    $('#game-section').hide()
  }
}

// Game UI functions
// ---------------------------------------------------------------------- //
// Set Score
const updateTopScoreUI = function (num, score) {
  // update the store.game variable with the latest score
  const label = ['', 'ones', 'twos', 'threes', 'fours', 'fives', 'sixes']
  // update the score in the store variable
  store.game[label[num]] = score
  // calculate the top score
  store.game.top_sub = (store.game.ones + store.game.twos + store.game.threes + store.game.fours + store.game.fives + store.game.sixes)
  // calculate the bonus
  if (store.game.bonus === null && store.game.top_sub >= 63) {
    store.game.bonus = 35
  }
  // calculate the total
  store.game.top = store.game.top_sub + store.game.bonus

  // update the score UI
  $(`#${label[num]}-div`).html(score)
  $('#sub-top').html(store.game.top_sub)
  $('#bonus').html(store.game.bonus)
  $('#top-total').html(store.game.top)
  $('#upper-div').html(store.game.top)

  console.log('store.game variable after update: ', store.game)
}

const updateBottomScoreUI = function (label, score) {
  console.log('label: ', label)
  // update the score in the store variable
  store.game[label] = score
  // calculate the bottom score
  store.game.lower_total = (store.game.three_k + store.game.four_k + store.game.full_house + store.game.small_straight + store.game.large_straight + store.game.yahtzee + store.game.chance)
  // calculate the grand total
  store.game.grand_total = store.game.lower_total + store.game.top

  // update the score UI
  $(`#${label}-div`).html(score)
  $('#upper-div').html(store.game.top)
  $('#lower-div').html(store.game.lower_total)
  $('#grand-div').html(store.game.grand_total)
}

module.exports = {
  onRegSuccess: onRegSuccess,
  onRegFailure: onRegFailure,
  onLoginSuccess: onLoginSuccess,
  onLoginFailure: onLoginFailure,
  onChangeSuccess: onChangeSuccess,
  onChangeFailure: onChangeFailure,
  onNewGameSuccess: onNewGameSuccess,
  onNewGamefailure: onNewGamefailure,
  onScoreTopSuccess: onScoreTopSuccess,
  onScoreTopFailure: onScoreTopFailure,
  updateTopScoreUI: updateTopScoreUI,
  onScoreBottomSuccess: onScoreBottomSuccess,
  onScoreBottomFailure: onScoreBottomFailure,
  updateBottomScoreUI: updateBottomScoreUI,
  resetForms: resetForms,
  resetHTML: resetHTML,
  views: views
}
