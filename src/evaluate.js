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

function isPair(cards) {
  return pairOfSize(cards);
}

function isTwoPair(cards) {
  const copy = sortByValue(cards);

  for (let i = 0; i < cards.length - 1; i++) {
    if (copy[i].id === copy[i + 1].id) {
      copy.splice(i, 2);
      return isPair(copy);
    }
  }

  return false;
}

function isThreeOfAKind(cards) {
  return pairOfSize(cards, 2);
}

function isStraight(cards) {
  const copy = sortByValue(removeDuplicateValues(cards));
  if (copy.length < 5) return false;
  for (let i = 4; i < copy.length; i++) {
    if (copy[i].id - copy[i - 4].id === 4) {
      return true;
    }
  }

  return isHighStraight(cards);
}

function isHighStraight(cards) {
  const copy = sortByValue(removeDuplicateValues([...cards]));
  return (
    copy[copy.length - 1].id === 12 &&
    copy[0].id === 0 &&
    copy[copy.length - 1].id - copy[copy.length - 4].id === 3
  );
}

function isFlush(cards) {
  return flushSuite(cards) !== null;
}

function isFullHouse(cards) {
  const copy = sortByValue(cards);
  for (let i = 0; i < cards.length - 2; i++) {
    if (copy[i].id === copy[i + 2].id) {
      copy.splice(i, 3);
      return isPair(copy) || isThreeOfAKind(copy);
    }
  }
  return false;
}

function isFourOfAKind(cards) {
  return pairOfSize(cards, 3);
}

function isStraightFlush(cards) {
  const suite = flushSuite([...cards]);
  const flushCards = allFlushCards(cards, suite);

  return suite !== null && isStraight(flushCards);
}

function isRoyalFlush(cards) {
  const copy = removeDuplicateValues(cards);
  const suite = flushSuite(copy);
  return suite !== null && isHighStraight(allFlushCards(copy, suite));
}

//-----------Cards of Best Hand--------------

function bestHighCards(cards, returnCards = []) {
  const reverseSorted = reverseSortByValue(cards);
  const copy = makeAceHigh(reverseSorted);

  // Fill returnCard list until 5 cards are present
  while (returnCards.length < 5) {
    returnCards.push(copy.shift());
  }
  return returnCards;
}

function bestPairOfSizeCards(cards, size = 1, returnCards = []) {
  const copy = reverseSortByValue(cards);

  for (let i = 0; i < cards.length - size; i++) {
    if (copy[i].id === copy[i + size].id) {
      returnCards.push(...copy.splice(i, size + 1));
    }
  }

  return bestHighCards(copy, returnCards);
}

function bestTwoPairCards(cards) {
  const copy = reverseSortByValue(cards);
  let returnCards = [];

  for (let i = 0; i < copy.length - 1; i++) {
    if (copy[i].id === copy[i + 1].id) {
      returnCards = copy.splice(i, 2);
      break;
    }
  }

  for (let i = 0; i < copy.length - 1; i++) {
    if (copy[i].id === copy[i + 1].id) {
      returnCards.push(...copy.splice(i, 2));
      break;
    }
  }

  return bestHighCards(copy, makeAceHigh(returnCards));
}

function bestFullHouseCards(cards) {
  const copy = reverseSortByValue(cards);
  let returnCards = [];
  for (let i = 0; i < copy.length - 2; i++) {
    if (copy[i].id === copy[i + 2].id) {
      returnCards = copy.splice(i, 3);
      break;
    }
  }

  for (let i = 0; i < copy.length - 1; i++) {
    if (copy[i].id === copy[i + 1].id) {
      returnCards.push(...copy.splice(i, 2));
      return returnCards;
    }
  }
  return returnCards;
}

function bestFlushCards(cards) {
  const copy = allFlushCards(cards, flushSuite(cards));
  return makeAceHigh(reverseSortByValue(copy).slice(0, 5));
}

function bestStraightCards(cards) {
  const copy = removeDuplicateValues([...cards]);
  const revOrderCopy = reverseSortByValue(copy);

  // Check if Ace to be High
  if (isHighStraight(copy)) {
    revOrderCopy.unshift(revOrderCopy.pop());
    return revOrderCopy.slice(0, 5);
  }

  for (let i = 0; i < revOrderCopy.length - 4; i++) {
    if (revOrderCopy[i].id - revOrderCopy[i + 4].id === 4) {
      return revOrderCopy.slice(i, i + 5);
    }
  }

  return null;
}

function bestStraightFlushCards(cards) {
  const flushCards = allFlushCards(cards, flushSuite(cards));
  return bestStraightCards(flushCards);
}

//-----------Utils---------------

function sortByValue(cards) {
  cards.sort((a, b) => a.id - b.id);
  return cards;
}

function reverseSortByValue(cards) {
  cards.sort((a, b) => b.id - a.id);
  return cards;
}

function sortBySuite(cards) {
  cards.sort((a, b) => a.suite.localeCompare(b.suite));
  return cards;
}

function removeDuplicateValues(cards) {
  const copy = sortByValue(cards);
  return copy.filter((card, index) =>
    index + 1 === copy.length ? card : card.id !== copy[index + 1].id
  );
}

function flushSuite(cards) {
  const copy = sortBySuite(cards);
  for (let i = 4; i < cards.length; i++) {
    if (copy[i].suite.localeCompare(copy[i - 4].suite) === 0) {
      return copy[i].suite;
    }
  }
  return null;
}

function allFlushCards(cards, suite) {
  return cards.filter((card) => card.suite.localeCompare(suite) === 0);
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

function makeAceHigh(cards) {
  const copy = reverseSortByValue(cards);
  while (copy.some((card) => card.id !== 0) && copy[copy.length - 1].id === 0) {
    copy.unshift(copy.pop());
  }
  return copy;
}

export default evaluate;
