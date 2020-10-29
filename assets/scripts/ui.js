'use strict'

const store = require('./store')

// Promise functions for Failed api calls
// ---------------------------------------------------------------------- //

// Registration Success
const onRegSuccess = function () {
  $('#registration-result').html('Thanks for registering.  You are being redirected to the login page...')
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
  views(false, false, false, false, true)
}

// Change Password Success
const onChangeSuccess = function () {
  // show a confirmation message
  $('#change-password-result').html('You have succesfully changed your password!')
  // wait 5 seconds, and reset the forms and html
  setTimeout(function () {
    resetForms(true)
  }, 5000)
}

// Promise functions for Failed api calls
// ---------------------------------------------------------------------- //

// Registration Failure
const onRegFailure = function () {
  $('#registration-result').html('Something went wrong.  Please wait a few minutes and try again')
  setTimeout(function () {
    resetForms(true)
  }, 5000)
}

// Login Failure
const onLoginFailure = function () {
  // Show error message
  $('#login-result').html('Login failed - check your email address and password, and try again.')
  // wait 5 seconds, then reset the forms and clear the html
  setTimeout(function () {
    resetForms(true)
  }, 5000)
}

// Change password failure
const onChangeFailure = function () {
  // show an error message
  $('#change-password-result').html('Password change failed - check your password, and try again!')
  // wait 5 seconds, and reset the forms and html
  setTimeout(function () {
    resetForms(true)
  }, 5000)
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
    $('#navigation').show()
  } else {
    $('#navigation').hide()
  }

  if (game) {
    $('#game-section').show()
  } else {
    $('#game-section').hide()
  }
}

module.exports = {
  onRegSuccess: onRegSuccess,
  onRegFailure: onRegFailure,
  onLoginSuccess: onLoginSuccess,
  onLoginFailure: onLoginFailure,
  onChangeSuccess: onChangeSuccess,
  onChangeFailure: onChangeFailure,
  resetForms: resetForms,
  resetHTML: resetHTML,
  views: views
}
