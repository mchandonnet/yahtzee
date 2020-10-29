'use strict'

const gameplay = require('./gameplay')

const count = function (num) {
  // combine all the dice into a since array and sort it...
  const allDice = gameplay.tableDice.concat(gameplay.savedDice)
  allDice.sort()
  console.log('All Dice: ', allDice)
  console.log('Table Dice: ', gameplay.tableDice)
  console.log('Saved Dice: ', gameplay.savedDice)
  const count = allDice.filter(el => el === num)
  console.log(num * count.length)

}

const validateOnes = function () {
  count(1)
}

const validateTwos = function () {
  count(2)
}

const validateThrees = function () {
  count(3)
}

const validateFours = function () {
  count(4)
}

const validateFives = function () {
  count(5)
}

const validateSixes = function () {
  count(6)
}

module.exports = {
  count: count,
  validateOnes: validateOnes,
  validateTwos: validateTwos,
  validateThrees: validateThrees,
  validateFours: validateFours,
  validateFives: validateFives,
  validateSixes: validateSixes
}
