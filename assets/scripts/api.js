const config = require('./config')
const store = require('./store')

const apiCall = function (url, method, data, auth) {
  const ajaxCall = {
    url: config.apiUrl + url,
    method: method
  }

  if (auth) {
    ajaxCall.headers = {
      Authorization: `Bearer ${store.user.token}`
    }
  }

  if (data) {
    ajaxCall.data = data
  }
  // console.log('api call: ', ajaxCall)
  return $.ajax(ajaxCall)
}

module.exports = {
  apiCall
}
