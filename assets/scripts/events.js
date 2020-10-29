'use strict'

const getFormFields = require('./../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onRegister = function (event) {
  // prevent default action for the event
  event.preventDefault()
  // get the form from event object
  const form = event.target
  // use getFormFields() to get the data from the form
  const data = getFormFields(form)
  api.apiCall('/sign-up', 'POST', data, false)
  // handle SUCCESSFUL response
    .then(ui.onRegSuccess)
  // handle ERROR response
    .catch(ui.onRegFailure)
}

const onSignIn = function (event) {
  // prevent default action for the event
  event.preventDefault()
  // get the form from event object
  const form = event.target
  // use getFormFields() to get the data from the form
  const data = getFormFields(form)
  api.apiCall('/sign-in', 'POST', data, false)
  // handle SUCCESSFUL response
    .then(ui.onLoginSuccess)
  // handle ERROR response
    .catch(ui.onLoginFailure)
}

const onChangePW = function (event) {
  // prevent default action for the event
  event.preventDefault()
  // get the form from event object
  const form = event.target
  // use getFormFields() to get the data from the form
  const data = getFormFields(form)
  api.apiCall('/change-password', 'PATCH', data, true)
  // handle SUCCESSFUL response
    .then(ui.onChangeSuccess)
  // handle ERROR response
    .catch(ui.onChangeFailure)
}

module.exports = {
  onRegister: onRegister,
  onSignIn: onSignIn,
  onChangePW: onChangePW
}
