'use strict'

const api = require('./api')
const ui = require('./ui')

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
  // console.log('All Dice: ', allDice())
  // console.log('Table Dice: ', gameplay.tableDice)
  // console.log('Saved Dice: ', gameplay.savedDice)
  const count = allDice().filter(el => el === num)
  console.log(num * count.length)
  return (num * count.length)
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
  return score
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
  return score
}

const fh = function () {
  const all = allDice()
  const unique = getUnique()
  let score = 0

  if (unique.length === 2) {
    const a = getQty(all, unique[0])
    const b = getQty(all, unique[1])
    // console.log('a: ', a)
    // console.log('b: ', b)
    if (((a === 3) && (b === 2)) || ((a === 2) && (b === 3))) {
      score = 25
    }
  } else {
    score = 0
  }
  console.log(score)
  return score
}

const ss = function () {
  const all = allDice()
  const unique = getUnique()
  let score = 0

  // if there are 5 unique items in the allDice Array && they are numbered 1-5 or 2-6
  if ((unique.length >= 4) && (((all.includes(1)) && (all.includes(2)) && (all.includes(3)) && (all.includes(4))) || ((all.includes(2)) && (all.includes(3)) && (all.includes(4)) && (all.includes(5))) || ((all.includes(3)) && (all.includes(4)) && (all.includes(5)) && (all.includes(6))))) {
    score = 30
  } else {
    score = 0
  }
  console.log(score)
  return score
}

const ls = function () {
  const unique = getUnique()
  const total = (allDice().reduce(reducer))
  let score = 0

  // if there are 5 unique items in the allDice Array && they are numbered 1-5 or 2-6
  if ((unique.length === 5) && ((total === 15) || (total === 20))) {
    score = 40
  } else {
    score = 0
  }
  console.log(score)
  return score
}

// scoring logic for yahtzee
const yahtzee = function () {
  let score = 0
  if ((allDice().length > 0) && (getUnique().length === 1)) {
    score = 50
  } else {
    score = 0
  }
  console.log(score)
  return score
}

// scoring logic for "chance"
const chance = function () {
  let score = 0
  if (allDice().length > 0) {
    score = allDice().reduce(reducer)
  } else {
    score = 0
  }
  console.log(score)
  return score
}

module.exports = {
  count: count,
  threeK: threeK,
  fourK: fourK,
  fh: fh,
  ss: ss,
  ls: ls,
  yahtzee: yahtzee,
  chance: chance
}
