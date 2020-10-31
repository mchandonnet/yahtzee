'use strict'

const getFormFields = require('./../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const scoring = require('./scoring')
const store = require('./store')

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

const onNewGame = function () {
  const data = {
    game: {
      active: true
    }
  }

  api.apiCall('/games', 'POST', data, true)
  // handle SUCCESSFUL response
    .then(ui.onNewGameSuccess)
  // handle ERRROR response
    .catch(ui.onNewGameFailure)
}

const onScoreTop = function (num) {
  if (store.game.rollCount <= 0) {
    return false
  } else {

    const label = ['', 'ones', 'twos', 'threes', 'fours', 'fives', 'sixes']
    const score = scoring.count(num)
    const url = '/games/' + store.game.id
    const data = {
      game: {
        [label[num]]: score
      }
    }

    api.apiCall(url, 'PATCH', data, true)
    // handle SUCCESSFUL response
      .then(ui.onScoreTopSuccess)
    // update the UI
      .then(ui.updateTopScoreUI(num, score))
    // handle ERRROR response
      .catch(ui.onScoreTopFailure)

  }
}

const onScoreBottom = function (el) {
  if (store.game.rollCount <= 0) {
    return false
  } else {
    const url = '/games/' + store.game.id
    let itemScore
    let item

    if (el === '3k') {
      item = 'three_k'
      itemScore = scoring.threeK()
    } else if (el === '4k') {
      item = 'four_k'
      itemScore = scoring.fourK()
    } else if (el === 'fh') {
      item = 'full_house'
      itemScore = scoring.fh()
    } else if (el === 'ss') {
      item = 'small_straight'
      itemScore = scoring.ss()
    } else if (el === 'ls') {
      item = 'large_straight'
      itemScore = scoring.ls()
    } else if (el === 'yahtzee') {
      item = 'yahtzee'
      itemScore = scoring.yahtzee()
    } else if (el === 'chance') {
      item = 'chance'
      itemScore = scoring.chance()
    } else {
      return false
    }

    const data = {
      game: {
        [item]: itemScore
      }
    }

    api.apiCall(url, 'PATCH', data, true)
      // handle SUCCESSFUL response
      .then(ui.onScoreBottomSuccess)
      // update the UI
      .then(ui.updateBottomScoreUI(item, itemScore))
      // handle ERRROR response
      .catch(ui.onScoreBottomFailure)
  }
}

module.exports = {
  onRegister: onRegister,
  onSignIn: onSignIn,
  onChangePW: onChangePW,
  onNewGame: onNewGame,
  onScoreTop: onScoreTop,
  onScoreBottom: onScoreBottom
}
