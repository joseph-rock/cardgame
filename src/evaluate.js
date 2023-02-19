import { HAND, VALUE } from "./data";

export function evaluate(cards) {
  const handDescription = bestHand(cards);
  let bestCards = bestHighCards(cards);

  switch (handDescription) {
    case HAND.ROYAL_FLUSH:
    case HAND.STRAIGHT_FLUSH:
      bestCards = bestStraightFlushCards(cards);
      break;
    case HAND.FOUR_OF_A_KIND:
      bestCards = bestPairOfSizeCards(cards, 3);
      break;
    case HAND.FULL_HOUSE:
      bestCards = bestFullHouseCards(cards);
      break;
    case HAND.FLUSH:
      bestCards = bestFlushCards(cards);
      break;
    case HAND.STRAIGHT:
      bestCards = bestStraightCards(cards);
      break;
    case HAND.THREE_OF_A_KIND:
      bestCards = bestPairOfSizeCards(cards, 2);
      break;
    case HAND.TWO_PAIR:
      bestCards = bestTwoPairCards(cards);
      break;
    case HAND.PAIR:
      bestCards = bestPairOfSizeCards(cards);
      break;
    default:
      break;
  }

  return {
    handDescription: handDescription,
    bestCards: bestCards,
  };
}

//------------Determine Best Hand-----------------

function bestHand(cards) {
  if (cards.length === 0) return "";
  if (isRoyalFlush(cards)) return HAND.ROYAL_FLUSH;
  if (isStraightFlush(cards)) return HAND.STRAIGHT_FLUSH;
  if (isFourOfAKind(cards)) return HAND.FOUR_OF_A_KIND;
  if (isFullHouse(cards)) return HAND.FULL_HOUSE;
  if (isFlush(cards)) return HAND.FLUSH;
  if (isStraight(cards)) return HAND.STRAIGHT;
  if (isThreeOfAKind(cards)) return HAND.THREE_OF_A_KIND;
  if (isTwoPair(cards)) return HAND.TWO_PAIR;
  if (isPair(cards)) return HAND.PAIR;
  return HAND.HIGH_CARD;
}

function pairOfSize(cards, windowOffset = 1) {
  const sorted = sortByValue(cards);

  for (let i = 0; i < sorted.length - windowOffset; i++) {
    if (sorted[i].number === sorted[i + windowOffset].number) {
      return true;
    }
  }

  return false;
}

function isPair(cards) {
  return pairOfSize(cards);
}

function isThreeOfAKind(cards) {
  return pairOfSize(cards, 2);
}

function isFourOfAKind(cards) {
  return pairOfSize(cards, 3);
}

function isTwoPair(cards) {
  const sorted = sortByValue(cards);

  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i].number === sorted[i + 1].number) {
      sorted.splice(i, 2);
      return isPair(sorted);
    }
  }

  return false;
}

function isFullHouse(cards) {
  const sorted = sortByValue(cards);
  for (let i = 0; i < sorted.length - 2; i++) {
    // Locate and remove Three of A Kind
    if (sorted[i].number === sorted[i + 2].number) {
      sorted.splice(i, 3);
      // Evaluate remaining cards
      return isPair(sorted) || isThreeOfAKind(sorted);
    }
  }
  return false;
}

function isStraight(cards) {
  return bestStraightCards(cards) !== null;
}

function isFlush(cards) {
  return flushSuite(cards) !== null;
}

function isStraightFlush(cards) {
  const suite = flushSuite(cards);
  const flushCards = cardsOfSuite(cards, suite);
  return suite !== null && isStraight(flushCards);
}

function isRoyalFlush(cards) {
  const cardsSet = removeDuplicateValues(cards);
  const suite = flushSuite(cardsSet);
  return suite !== null && isHighStraight(cardsOfSuite(cardsSet, suite));
}

//-----------Cards of Best Hand--------------

function bestHighCards(cards, returnCards = []) {
  const reverseSorted = sortByValue(cards);

  // Fill returnCard list until 5 cards are present
  while (returnCards.length < 5) {
    returnCards.push(reverseSorted.shift());
  }
  return returnCards;
}

function bestPairOfSizeCards(cards, windowOffset = 1, returnCards = []) {
  const reverseSorted = sortByValue(cards);

  for (let i = 0; i < reverseSorted.length - windowOffset; i++) {
    if (reverseSorted[i].number === reverseSorted[i + windowOffset].number) {
      returnCards.push(...reverseSorted.splice(i, windowOffset + 1));
      break;
    }
  }

  return bestHighCards(reverseSorted, returnCards);
}

function bestTwoPairCards(cards) {
  const reverseSorted = sortByValue(cards);
  let returnCards = [];

  // Find highest Pair cards
  for (let i = 0; i < reverseSorted.length - 1; i++) {
    if (reverseSorted[i].number === reverseSorted[i + 1].number) {
      returnCards.push(...reverseSorted.splice(i, 2));
      break;
    }
  }

  return bestPairOfSizeCards(reverseSorted, 1, returnCards);
}

function bestFullHouseCards(cards) {
  const reverseSorted = sortByValue(cards);
  let returnCards = [];

  // Find highest Three of a Kind cards
  for (let i = 0; i < reverseSorted.length - 2; i++) {
    if (reverseSorted[i].number === reverseSorted[i + 2].number) {
      returnCards.push(...reverseSorted.splice(i, 3));
      break;
    }
  }

  // Find highest card with at least one Pair
  for (let i = 0; i < reverseSorted.length - 1; i++) {
    if (reverseSorted[i].number === reverseSorted[i + 1].number) {
      returnCards.push(...reverseSorted.splice(i, 2));
      break;
    }
  }
  return returnCards;
}

function bestFlushCards(cards) {
  const suite = flushSuite(cards);
  const flushCards = cardsOfSuite(cards, suite);
  const reverseOrdered = sortByValue(flushCards);
  return reverseOrdered.slice(0, 5);
}

function bestStraightCards(cards) {
  const cardsSet = removeDuplicateValues(cards);
  const reverseOrdered = sortByValue(cardsSet, false);

  if (isHighStraight(reverseOrdered)) {
    reverseOrdered.unshift(reverseOrdered.pop());
    return reverseOrdered.slice(0, 5);
  }

  for (let i = 0; i < reverseOrdered.length - 4; i++) {
    if (reverseOrdered[i].number - reverseOrdered[i + 4].number === 4) {
      return reverseOrdered.slice(i, i + 5);
    }
  }

  return null;
}

function bestStraightFlushCards(cards) {
  const flushCards = cardsOfSuite(cards, flushSuite(cards));
  return bestStraightCards(flushCards);
}

//-----------Utils---------------

/**
 * Returns copy of a list of Card objects and sorts high to low based on card value.
 * King is highest value, Ace is lowest value
 * Option aceHigh will shift any Ace to front of list.
 */
function sortByValue(cards, aceHigh = true) {
  const copy = [...cards];
  copy.sort((a, b) => b.number - a.number);

  if (aceHigh) {
    while (
      copy.some((card) => card.number !== VALUE.ACE.number) &&
      copy[copy.length - 1].number === VALUE.ACE.number
    ) {
      copy.unshift(copy.pop());
    }
  }

  return copy;
}

/**
 * Returns copy of a list of Card objects grouped by suite
 */
function sortBySuite(cards) {
  const copy = [...cards];
  copy.sort((a, b) => a.suite.localeCompare(b.suite));
  return copy;
}

/**
 * Returns sorted list of cards with duplicate values removed
 */
function removeDuplicateValues(cards) {
  const sorted = sortByValue(cards, false);
  return sorted.filter((card, index) =>
    index + 1 === sorted.length
      ? card
      : card.number !== sorted[index + 1].number
  );
}

/**
 * Determines if 5 or more Cards share the same suite. Returns the
 * suite or null if not found.
 */
function flushSuite(cards) {
  const sorted = sortBySuite(cards);
  for (let i = 0; i < sorted.length - 4; i++) {
    if (sorted[i].suite.localeCompare(sorted[i + 4].suite) === 0) {
      return sorted[i].suite;
    }
  }
  return null;
}

/**
 * Returns copy of Card list containing only cards of a specific Suite
 */
function cardsOfSuite(cards, suite) {
  return cards.filter((card) => card.suite.localeCompare(suite) === 0);
}

/**
 * Check edgecase to determine if 10 J Q K A present
 */
function isHighStraight(cards) {
  const cardsSet = removeDuplicateValues(cards);
  const lastIndex = cardsSet.length - 1;
  return (
    cardsSet[0].number === VALUE.KING.number &&
    cardsSet[lastIndex].number === VALUE.ACE.number &&
    cardsSet[0].number - cardsSet[3].number === 3
  );
}

export default evaluate;
