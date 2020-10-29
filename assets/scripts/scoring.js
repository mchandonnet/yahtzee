'use strict'

const { unique } = require('jquery')
const gameplay = require('./gameplay')

const allDice = function () {
  const all = gameplay.tableDice.concat(gameplay.savedDice)
  return all.sort()
}

// reducing function used for adding 3K, 4K and chance
const reducer = (accumulator, currentValue) => accumulator + currentValue

// function for getting all unique numbers in a set
const getUnique = function () {
  return [...new Set(allDice())]
}

// function for getting the total number of tiems an element repeats
const getQty = function (arr, num) {
  let count = 0
  arr.forEach(el => {
    if (el === num) {
      count++
    }
  })
  return count
}

// scoreing logic for 1, 2, 3, 4, 5, 6
const count = function (num) {
  // combine all the dice into a since array and sort it...
  // const allDice = gameplay.tableDice.concat(gameplay.savedDice)
  // allDice.sort()
  console.log('All Dice: ', allDice())
  console.log('Table Dice: ', gameplay.tableDice)
  console.log('Saved Dice: ', gameplay.savedDice)
  const count = allDice().filter(el => el === num)
  console.log(num * count.length)
}

// scoring logic for 3K
const threeK = function () {
  // store a variable for all dice
  const all = allDice()
  // get a list of unique values
  const unique = getUnique()
  let score = 0
  for (let i = 0; i < unique.length; i++) {
    if (getQty(all, unique[[i]]) >= 3) {
      score = (allDice().reduce(reducer))
      break;
    } else {
      score = 0
    }
  }
  console.log(score)
}

// scoring logic for 4K
const fourK = function () {
  // store a variable for all dice
  const all = allDice()
  // get a list of unique values
  const unique = getUnique()
  let score = 0
  for (let i = 0; i < unique.length; i++) {
    if (getQty(all, unique[[i]]) >= 4) {
      score = (allDice().reduce(reducer))
      break;
    } else {
      score = 0
    }
  }
  console.log(score)
}

const fh = function () {
  const all = allDice()
  const unique = getUnique()
  let score = 0

  if (unique.length === 2) {
    const a = getQty(all, unique[0])
    const b = getQty(all, unique[1])
    console.log('a: ', a)
    console.log('b: ', b)
    if (((a === 3) && (b === 2)) || ((a === 2) && (b === 3))) {
      score = 25
    }
  } else {
    score = 0
  }
  console.log(score)
}

// scoring logic for yahtzee
const yahtzee = function () {
  if ((allDice().length > 0) && (getUnique().length === 1)) {
    console.log(50)
  } else {
    console.log(0)
  }
}

// scoring logic for "chance"
const chance = function () {
  if (allDice().length > 0) {
    const count = allDice().reduce(reducer)
    console.log(count)
  } else {
    return false
  }
}

module.exports = {
  count: count,
  threeK: threeK,
  fourK: fourK,
  fh: fh,
  yahtzee: yahtzee,
  chance: chance
}
