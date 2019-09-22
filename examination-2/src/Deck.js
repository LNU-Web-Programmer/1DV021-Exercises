/**
 * Module for creating a deck, shuffleing, dealing cards and controlling the deck
 *
 * @author Rickard Marjanovic
 * @version 1.0.0
 */

'use strict'

function Deck () {
  this.deck = [] // created an array to hold the deck
  this.usedCards = [] // Holds used cards in a deck

  Deck.prototype.shuffleDeck = function () {
    let tempValue, randomNo
    let currentElement = this.deck.length

    while (currentElement !== 0) {
      randomNo = Math.floor(Math.random() * (currentElement))

      currentElement--

      tempValue = this.deck[randomNo]
      this.deck[randomNo] = this.deck[currentElement]
      this.deck[currentElement] = tempValue
    }
    return this.deck
  }

  Deck.prototype.createDeck = function () {
    const suits = ['♥', '♠', '♣', '♦']
    const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
    for (let suit of suits) {
      for (let value of values) {
        this.deck.push({ suit, value })
      }
    }
    return this.deck
  }

  Deck.prototype.giveCard = function () {
    let card = this.deck.pop()
    let value = 0
    let countA = 0
    if (card.value === 'A') {
      value = 14
      countA++
    } else if (card.value === 'J') {
      value = 11
    } else if (card.value === 'Q') {
      value = 12
    } else if (card.value === 'K') {
      value = 13
    } else {
      value += card.value
    }
    return { card, value, countA }
  }

  Deck.prototype.checkRemainingDeck = function () {
    if (this.deck.length <= 1) {
      this.usedCards.push(this.deck.pop()) // Remove the remaining card from the deck and adds to used cards

      for (let o = 0; o < this.usedCards.length; o++) {
        this.deck.push(this.usedCards[o])
      }
      this.usedCards.length = 0
      this.deck = this.shuffleDeck() // Reshuffles the deck
    }
  }
}

// Exports
module.exports = Deck
