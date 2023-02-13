import drawCard from "./drawCard.js";
import { symbols, numbers } from "./data.js";
import Card from "./Card.js";

function bestHand(cards) {
  const copy = new Array(...cards);

  if (isRoyalFlush(copy)) return "Royal Flush";
  if (isStraightFlush(copy)) return "Straight Flush";
  if (isFourOfAKind(copy)) return "Four of a Kind";
  if (isFullHouse(copy)) return "Full House";
  if (isFlush(copy)) return "Flush";
  if (isStraight(copy)) return "Straight";
  if (isThreeOfAKind(copy)) return "Three of a Kind";
  if (isTwoPair(copy)) return "Two Pair";
  if (isPair(copy)) return "Pair";

  return "High Card";
}

function isPair(cards) {
  return pairOfSize(cards);
}

function isTwoPair(cards) {
  return false;
}

function isThreeOfAKind(cards) {
  return pairOfSize(cards, 2);
}

function isStraight(cards) {
  const copy = removeDuplicateValues(cards);

  if (copy.length < 5) return false;

  for (let i = 4; i < cards.length; i++) {
    if (copy[i].id - copy[i - 4].id === 4) {
      return true;
    }
  }

  if (
    copy[copy.length - 1].id === 12 &&
    copy[0].id === 0 &&
    copy[copy.length - 1].id - copy[copy.length - 4].id === 3
  ) {
    return true;
  }

  return false;
}

function isFlush(cards) {
  const copy = sortBySuite(cards);

  for (let i = 4; i < cards.length; i++) {
    if (copy[i].suite.localeCompare(copy[i - 4].suite) === 0) {
      return true;
    }
  }
  return false;
}

function isFullHouse(cards) {
  return false;
}

function isFourOfAKind(cards) {
  return pairOfSize(cards, 3);
}

function isStraightFlush(cards) {
  const copy = removeDuplicateValues(cards);
  return isStraight(copy) && isFlush(copy);
}

function isRoyalFlush(cards) {
  return false;
}

//----------------------------------------------------------------------

function sortByValue(cards) {
  const copy = new Array(...cards);
  copy.sort((a, b) => a.id - b.id);
  return copy;
}

function sortBySuite(cards) {
  const copy = new Array(...cards);
  copy.sort((a, b) => a.suite.localeCompare(b.suite));
  return copy;
}

function removeDuplicateValues(cards) {
  const copy = sortByValue(cards);
  return copy.filter((card, index) =>
    index !== copy.length - 1 ? card.id !== copy[index + 1].id : true
  );
}

function pairOfSize(cards, size = 1) {
  const copy = sortByValue(cards);

  for (let i = size; i < cards.length; i++) {
    if (copy[i].id === copy[i - size].id) {
      return true;
    }
  }

  return false;
}

//----------------------------------------------------------

function randomCardTest() {
  let drawn = [];
  let cards = [];
  while (cards.length < 7) {
    cards.push(drawCard(drawn));
  }
  cards.sort((a, b) => a.id - b.id);

  console.log(cards);
  console.log(bestHand(cards));
}

function genCard(id, suite) {
  return new Card({
    id: id,
    value: numbers[id].number,
    suite: symbols[suite].name,
  });
}

const c1 = genCard(12, 0);
const c2 = genCard(11, 1);
const c3 = genCard(10, 0);
const c4 = genCard(9, 0);
const c5 = genCard(0, 0);
const foo = [c1, c2, c3, c4, c5];

console.log(bestHand(foo), foo);

// const bar = removeDuplicateValues(foo);
// console.log(bar);
