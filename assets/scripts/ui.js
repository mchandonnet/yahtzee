'use strict'

const store = require('./store')

const onLoginSuccess = function (res) {
  console.log('success')
  // reset forms
  resetForms(true)
  // store the user infirmation to the store variable
  store.user = res.user
  // show / hide forms
  // views(false, false, false, false, true, false, true, true)
}

// Promise functions for Failed api calls

// Login Failure
const onLoginFailure = function () {
  console.log('failure')
  // Show error message
  $('#login-result').html('Login failed - check your email address and password, and try again!')
  // wait 5 seconds, then reset the forms and clear the html
  setTimeout(function () {
    resetForms(true)
  }, 5000)
}

// Registration Failure

// Change password failure

const resetForms = function (html) {
  $('#change-password-form').trigger('reset')
  $('#login-form').trigger('reset')
  $('#register-form').trigger('reset')
  if (html) {
    resetHTML()
  }
}

const resetHTML = function () {
  $('#registration-result').html('')
  $('#login-result').html('')
  $('#change-password-result').html('')
  $('#api-failure').html('')
}

module.exports = {
  onLoginSuccess: onLoginSuccess,
  onLoginFailure: onLoginFailure,
  resetForms: resetForms,
  resetHTML: resetHTML
}
