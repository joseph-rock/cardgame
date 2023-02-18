export const HAND = {
  ROYAL_FLUSH: "Royal Flush",
  STRAIGHT_FLUSH: "Straight Flush",
  FOUR_OF_A_KIND: "Four of a Kind",
  FULL_HOUSE: "Full House",
  FLUSH: "Flush",
  STRAIGHT: "Straight",
  THREE_OF_A_KIND: "Three of a Kind",
  TWO_PAIR: "Two Pair",
  PAIR: "Pair",
  HIGH_CARD: "High Card",
};

/**
 *
 * @param {*} cards
 * @returns {*}
 */
export function evaluate(cards) {
  const handDescription = bestHand([...cards]);
  let bestCards = bestHighCards([...cards]);

  switch (handDescription) {
    case HAND.ROYAL_FLUSH:
    case HAND.STRAIGHT_FLUSH:
      bestCards = bestStraightFlushCards([...cards]);
      break;
    case HAND.FOUR_OF_A_KIND:
      bestCards = bestPairOfSizeCards([...cards], 3);
      break;
    case HAND.FULL_HOUSE:
      bestCards = bestFullHouseCards([...cards]);
      break;
    case HAND.FLUSH:
      bestCards = bestFlushCards([...cards]);
      break;
    case HAND.STRAIGHT:
      bestCards = bestStraightCards([...cards]);
      break;
    case HAND.THREE_OF_A_KIND:
      bestCards = bestPairOfSizeCards([...cards], 2);
      break;
    case HAND.TWO_PAIR:
      bestCards = bestTwoPairCards([...cards]);
      break;
    case HAND.PAIR:
      bestCards = bestPairOfSizeCards([...cards]);
      break;
    default:
      break;
  }

  return {
    handDescription: handDescription,
    bestCards: bestCards,
  };
}

function bestHand(cards) {
  if (cards.length === 0) return "";
  if (isRoyalFlush([...cards])) return HAND.ROYAL_FLUSH;
  if (isStraightFlush([...cards])) return HAND.STRAIGHT_FLUSH;
  if (isFourOfAKind([...cards])) return HAND.FOUR_OF_A_KIND;
  if (isFullHouse([...cards])) return HAND.FULL_HOUSE;
  if (isFlush([...cards])) return HAND.FLUSH;
  if (isStraight([...cards])) return HAND.STRAIGHT;
  if (isThreeOfAKind([...cards])) return HAND.THREE_OF_A_KIND;
  if (isTwoPair([...cards])) return HAND.TWO_PAIR;
  if (isPair([...cards])) return HAND.PAIR;
  return HAND.HIGH_CARD;
}

//------------Determine Best Hand-----------------

function pairOfSize(cards, windowOffset = 1) {
  const copy = sortByValue(cards);

  for (let i = 0; i < copy.length - windowOffset; i++) {
    if (copy[i].number === copy[i + windowOffset].number) {
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
  const copy = sortByValue(cards);

  for (let i = 0; i < copy.length - 1; i++) {
    if (copy[i].number === copy[i + 1].number) {
      copy.splice(i, 2);
      return isPair(copy);
    }
  }

  return false;
}

function isFullHouse(cards) {
  const copy = sortByValue(cards);
  for (let i = 0; i < copy.length - 2; i++) {
    if (copy[i].number === copy[i + 2].number) {
      copy.splice(i, 3);
      return isPair(copy) || isThreeOfAKind(copy);
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
  const copy = removeDuplicateValues(cards);
  const suite = flushSuite(copy);
  return suite !== null && isHighStraight(cardsOfSuite(copy, suite));
}

//-----------Cards of Best Hand--------------

function bestHighCards(cards, returnCards = []) {
  const reverseSorted = reverseSortByValue(cards, true);

  // Fill returnCard list until 5 cards are present
  while (returnCards.length < 5) {
    returnCards.push(reverseSorted.shift());
  }
  return returnCards;
}

function bestPairOfSizeCards(cards, size = 1, returnCards = []) {
  const copy = reverseSortByValue(cards);

  for (let i = 0; i < copy.length - size; i++) {
    if (copy[i].number === copy[i + size].number) {
      returnCards.push(...copy.splice(i, size + 1));
    }
  }

  return bestHighCards(copy, returnCards);
}

function bestTwoPairCards(cards) {
  const copy = reverseSortByValue(cards);
  let returnCards = [];

  for (let i = 0; i < copy.length - 1; i++) {
    if (copy[i].number === copy[i + 1].number) {
      returnCards = copy.splice(i, 2);
      break;
    }
  }

  for (let i = 0; i < copy.length - 1; i++) {
    if (copy[i].number === copy[i + 1].number) {
      returnCards.push(...copy.splice(i, 2));
      break;
    }
  }

  return bestHighCards(copy, returnCards);
}

function bestFullHouseCards(cards) {
  const copy = reverseSortByValue(cards);
  let returnCards = [];
  for (let i = 0; i < copy.length - 2; i++) {
    if (copy[i].number === copy[i + 2].number) {
      returnCards = copy.splice(i, 3);
      break;
    }
  }

  for (let i = 0; i < copy.length - 1; i++) {
    if (copy[i].number === copy[i + 1].number) {
      returnCards.push(...copy.splice(i, 2));
      return returnCards;
    }
  }
  return returnCards;
}

function bestFlushCards(cards) {
  const suite = flushSuite(cards);
  const flushCards = cardsOfSuite(cards, suite);
  const ordered = reverseSortByValue(flushCards, true);
  return ordered.slice(0, 5);
}

function bestStraightCards(cards) {
  const copy = removeDuplicateValues(cards);
  const revOrderCopy = reverseSortByValue(copy);

  if (isHighStraight(revOrderCopy)) {
    revOrderCopy.unshift(revOrderCopy.pop());
    return revOrderCopy.slice(0, 5);
  }

  for (let i = 0; i < revOrderCopy.length - 4; i++) {
    if (revOrderCopy[i].number - revOrderCopy[i + 4].number === 4) {
      return revOrderCopy.slice(i, i + 5);
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
 * Returns copy of a list of Card objects and sorts low to high based on card value.
 * Ace is lowest value, King is highest value.
 */
function sortByValue(cards) {
  const copy = [...cards];
  copy.sort((a, b) => a.number - b.number);
  return copy;
}

/**
 * Returns copy of a list of Card objects and sorts high to low based on card value.
 * Ace is lowest value, King is highest value.
 * Option aceHigh will make Two lowest and Ace highest.
 */
function reverseSortByValue(cards, aceHigh = false) {
  const copy = [...cards];
  copy.sort((a, b) => b.number - a.number);

  if (aceHigh) {
    while (
      copy.some((card) => card.number !== 0) &&
      copy[copy.length - 1].number === 0
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
  const copy = sortByValue(cards);
  return copy.filter((card, index) =>
    index + 1 === copy.length ? card : card.number !== copy[index + 1].number
  );
}

/**
 * Determines if 5 or more Cards share the same suite. Returns the
 * suite or null if not found.
 */
function flushSuite(cards) {
  const copy = sortBySuite(cards);
  for (let i = 4; i < copy.length; i++) {
    if (copy[i].suite.localeCompare(copy[i - 4].suite) === 0) {
      return copy[i].suite;
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
  const copy = removeDuplicateValues(cards);
  return (
    copy[copy.length - 1].number === 12 &&
    copy[0].number === 0 &&
    copy[copy.length - 1].number - copy[copy.length - 4].number === 3
  );
}

export default evaluate;
