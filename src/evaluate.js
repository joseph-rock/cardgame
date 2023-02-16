function bestHand(cards) {
  const cardsCopy = [...cards];
  if (isRoyalFlush(cardsCopy)) return "Royal Flush";
  if (isStraightFlush(cardsCopy)) return "Straight Flush";
  if (isFourOfAKind(cardsCopy)) return "Four of a Kind";
  if (isFullHouse(cardsCopy)) return "Full House";
  if (isFlush(cardsCopy)) return "Flush";
  if (isStraight(cardsCopy)) return "Straight";
  if (isThreeOfAKind(cardsCopy)) return "Three of a Kind";
  if (isTwoPair(cardsCopy)) return "Two Pair";
  if (isPair(cardsCopy)) return "Pair";

  return "High Card";
}

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
  const copy = removeDuplicateValues(cards);
  if (copy.length < 5) return false;
  for (let i = 4; i < copy.length; i++) {
    if (copy[i].id - copy[i - 4].id === 4) {
      return true;
    }
  }

  return isHighStraight(copy);
}

function isHighStraight(cards) {
  const copy = removeDuplicateValues(cards);
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
  const copy = removeDuplicateValues(cards);
  const suite = flushSuite(copy);
  return suite !== null && isStraight(flushCards(copy, suite));
}

function isRoyalFlush(cards) {
  const copy = removeDuplicateValues(cards);
  const suite = flushSuite(copy);
  return suite !== null && isHighStraight(flushCards(copy, suite));
}

function sortByValue(cards) {
  const copy = [...cards];
  copy.sort((a, b) => a.id - b.id);
  return copy;
}

function sortBySuite(cards) {
  const copy = [...cards];
  copy.sort((a, b) => a.suite.localeCompare(b.suite));
  return copy;
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

function flushCards(cards, suite) {
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

export default bestHand;
