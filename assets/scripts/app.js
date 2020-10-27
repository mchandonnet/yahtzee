'use strict'

const events = require('./events')

$(() => {
  // create event listeners for form submissions
  // login / registration / change password
  $('#login-form').on('submit', events.onSignIn)
  // registration
  $('#register-form').on('submit', events.onRegister)
  // change password
  $('#change-password-form').on('submit', events.onChangePW)
})
