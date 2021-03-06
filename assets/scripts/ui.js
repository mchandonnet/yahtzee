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
    views(false, true, false, false, false, false, false)
  }, 5000)
}

// Login Success
const onLoginSuccess = function (res) {
  // reset forms
  resetForms(true)
  // store the user infirmation to the store variable
  store.user = res.user
  // show / hide forms
  views(false, false, false, true, true, false, false)
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

const onSignOutSuccess = function () {
  store.user = {}
  store.game = {}
  
  $('#ones-div').html('')
  $('#twos-div').html('')
  $('#threes-div').html('')
  $('#fours-div').html('')
  $('#fives-div').html('')
  $('#sixes-div').html('')
  $('#sub-top').html('')
  $('#bonus').html('')
  $('#top-total').html('')
  $('#three_k-div').html('')
  $('#four_k-div').html('')
  $('#full_house-div').html('')
  $('#small_straight-div').html('')
  $('#large_straight-div').html('')
  $('#yahtzee-div').html('')
  $('#chance-div').html('')
  $('#lower-div').html('')
  $('#upper-div').html('')
  $('#grand-div').html('')

  $('#game-table').html(`
  <a href="#">
    <img class="mx-4 die-border" src="./assets/images/dice-1.png" width="60px" height="60px" alt="Dice" id="d1">
  </a>

  <a href="#">
    <img class="mx-4 die-border" src="./assets/images/dice-2.png" width="60px" height="60px" alt="Dice" id="d1">
  </a>

  <a href="#">
    <img class="mx-4 die-border" src="./assets/images/dice-3.png" width="60px" height="60px" alt="Dice" id="d1">
  </a>

  <a href="#">
    <img class="mx-4 die-border" src="./assets/images/dice-4.png" width="60px" height="60px" alt="Dice" id="d1">
  </a>

  <a href="#">
    <img class="mx-4 die-border" src="./assets/images/dice-5.png" width="60px" height="60px" alt="Dice" id="d1">
  </a>
  `)
  $('#roll-dice').prop('disabled', true)
  $('#roll-dice').html('Start a new game by clicking the link in the lower right corner...')
  $('#saved-game-table').html('')
  resetForms(true)
  views(false, true, false, false, false, false, false)
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

const onSignOutFailure = function () {
  onAPIFailure()
}
// General Game Functions
// ---------------------------------------------------------------------- //
const onNewGameSuccess = function (res) {
  gameplay.newGame(res)
}

const onNewGamefailure = function () {
  onAPIFailure()
}

const onScoreTopSuccess = function (res) {
  gameplay.nextRound()
}

const onScoreTopFailure = function () {
  onAPIFailure()
}

const onScoreBottomSuccess = function (res) {
  gameplay.nextRound()
}

const onScoreBottomFailure = function () {
  onAPIFailure()
}

// General UI functions
// ---------------------------------------------------------------------- //
// API Failures
const onAPIFailure = function () {
  $('#api-error').html('<p class="alert alert-danger">Something went wrong - please wait a few minutes and try again...</p>')
  $('#api-error').show()
  setTimeout(function () {
    resetForms(true)
    $('#api-error').hide()
  }, 5000)
}

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

const views = function (changepw, login, register, nav, game, highScores, APIFailure) {
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

  if (highScores) {
    $('#high-scores').show()
  } else {
    $('#high-scores').hide()
  }

  if (APIFailure) {
    $('#api-error-container').show()
  } else {
    $('#api-error-container').hide()
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

  // update the score UI
  $(`#${label[num]}-div`).html(score)
  updateTotals()
}

const updateBottomScoreUI = function (label, score) {
  // update the score in the store variable
  store.game[label] = score

  // update the score UI
  $(`#${label}-div`).html(score)
  updateTotals()
}

const updateTotals = function () {
  // calculate the top score
  store.game.top_sub = (store.game.ones + store.game.twos + store.game.threes + store.game.fours + store.game.fives + store.game.sixes)
  // calculate the bonus
  if (store.game.bonus === null && store.game.top_sub >= 63) {
    store.game.bonus = 35
  }
  // calculate the top total
  store.game.top = store.game.top_sub + store.game.bonus

  // calculate the bottom score
  store.game.lower_total = (store.game.three_k + store.game.four_k + store.game.full_house + store.game.small_straight + store.game.large_straight + store.game.yahtzee + store.game.chance)
  // calculate the grand total
  store.game.grand_total = (store.game.lower_total + store.game.top)

  // Update Scsores on the LOWER part of the Scoresheet
  // update display for - UPPER - Subtotal
  $('#sub-top').html(store.game.top_sub)
  // update display for - UPPER - Bonus
  $('#bonus').html(store.game.bonus)
  // update display for top Total TOP
  $('#top-total').html(store.game.top)

  // Update scores on the LOWER part of the Scoresheet
  // Update display for LOWER - Total
  $('#lower-div').html(store.game.lower_total)
  // Update display for UPPER TOTAL on the LOWER section
  $('#upper-div').html(store.game.top)
  // Update display for LOWER - GRAND TOTAL
  $('#grand-div').html(store.game.grand_total)
}

/*  This function is not working! */
// const onFinalizeGameSuccess = function () {
//   // store.game = {}
//   // gameplay.clearScoresheet()
//   // store.game.activeGame = false
//   // console.log('This game is over!')
//   console.log('Finalize Game Success!')
//   console.log('store.game after finalizing: ', store.game)
// }

/*  This function is not working! */
// const onFinalizeGameFailure = function () {
//   console.log('Finalize Game Failure!')
// }

const onGetLeadersSuccess = function (res) {
  let scoresHTML = (`
    <div class="col-12 header scores border-top border-dark d-flex justify-content-center">
      <div class="col-12 d-flex justify-content-start">All-time high scores (Top 25)</div>
    </div>
  `)

  if (res.games.length === 0) {
    const scoreHTML = (` 
    <div class="col-12 scores d-flex justify-content-center">
      <div class="col-12">The high score list is currently EMPTY -- You should play a game!</div>
    </div>
  `)

    scoresHTML += scoreHTML
  } else {
    res.games.forEach(function (game, index) {
      const scoreHTML = (` 
      <div class="col-12 scores d-flex justify-content-center">
        <div class="col-6">${index + 1}. ${game.owner.firstName} ${game.owner.lastName}</div>
        <div class="col-6 d-flex justify-content-end" id="ones-div">${game.grand_total}</div>
      </div>
      `)

      scoresHTML += scoreHTML
    })
  }

  $('#score-container').html(scoresHTML)
}

const onGetLeadersFailure = function () {
  onAPIFailure()
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
  onSignOutSuccess: onSignOutSuccess,
  onSignOutFailure: onSignOutFailure,
  onGetLeadersSuccess: onGetLeadersSuccess,
  onGetLeadersFailure: onGetLeadersFailure,
  onAPIFailure: onAPIFailure,
  // onFinalizeGameSuccess: onFinalizeGameSuccess,
  // onFinalizeGameFailure: onFinalizeGameFailure,
  resetForms: resetForms,
  resetHTML: resetHTML,
  views: views
}
