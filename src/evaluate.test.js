import { symbols, numbers } from "./data.js";
import Card from "./Card.js";
import bestHand from "./evaluate.js";

function genCard({ cardValue, suiteID } = {}) {
  const id = cardValue - 1;
  return new Card({
    id: id,
    value: numbers[id].number,
    suite: symbols[suiteID].name,
  });
}

describe("Check High Card", () => {
  test("King High", () => {
    const cards = [
      genCard({ cardValue: 13, suiteID: 0 }),
      genCard({ cardValue: 8, suiteID: 1 }),
      genCard({ cardValue: 7, suiteID: 2 }),
      genCard({ cardValue: 2, suiteID: 3 }),
      genCard({ cardValue: 9, suiteID: 0 }),
    ];
    expect(bestHand(cards)).toBe("High Card");
  });
});

describe("Check Pairs", () => {
  test("Pair of Twos", () => {
    const cards = [
      genCard({ cardValue: 1, suiteID: 0 }),
      genCard({ cardValue: 8, suiteID: 1 }),
      genCard({ cardValue: 2, suiteID: 2 }),
      genCard({ cardValue: 2, suiteID: 3 }),
      genCard({ cardValue: 9, suiteID: 0 }),
    ];
    expect(bestHand(cards)).toBe("Pair");
  });

  test("Three of a Kind Aces", () => {
    const cards = [
      genCard({ cardValue: 1, suiteID: 0 }),
      genCard({ cardValue: 8, suiteID: 1 }),
      genCard({ cardValue: 12, suiteID: 2 }),
      genCard({ cardValue: 1, suiteID: 3 }),
      genCard({ cardValue: 1, suiteID: 0 }),
    ];
    expect(bestHand(cards)).toBe("Three of a Kind");
  });

  test("Four of a Kind Fours", () => {
    const cards = [
      genCard({ cardValue: 4, suiteID: 0 }),
      genCard({ cardValue: 4, suiteID: 1 }),
      genCard({ cardValue: 12, suiteID: 2 }),
      genCard({ cardValue: 4, suiteID: 3 }),
      genCard({ cardValue: 4, suiteID: 0 }),
    ];
    expect(bestHand(cards)).toBe("Four of a Kind");
  });

  test("Two Pair Kings Nines", () => {
    const cards = [
      genCard({ cardValue: 13, suiteID: 0 }),
      genCard({ cardValue: 13, suiteID: 1 }),
      genCard({ cardValue: 12, suiteID: 2 }),
      genCard({ cardValue: 9, suiteID: 3 }),
      genCard({ cardValue: 9, suiteID: 0 }),
    ];
    expect(bestHand(cards)).toBe("Two Pair");
  });

  test("Full House 3 Tens 2 Jacks", () => {
    const cards = [
      genCard({ cardValue: 10, suiteID: 0 }),
      genCard({ cardValue: 10, suiteID: 1 }),
      genCard({ cardValue: 10, suiteID: 2 }),
      genCard({ cardValue: 11, suiteID: 3 }),
      genCard({ cardValue: 11, suiteID: 0 }),
    ];
    expect(bestHand(cards)).toBe("Full House");
  });

  test("Full House 2 Three of a Kind", () => {
    const cards = [
      genCard({ cardValue: 10, suiteID: 0 }),
      genCard({ cardValue: 10, suiteID: 1 }),
      genCard({ cardValue: 10, suiteID: 2 }),
      genCard({ cardValue: 11, suiteID: 3 }),
      genCard({ cardValue: 11, suiteID: 0 }),
      genCard({ cardValue: 11, suiteID: 1 }),
    ];
    expect(bestHand(cards)).toBe("Full House");
  });
});

describe("Check Straight", () => {
  test("Low Straight", () => {
    const cards = [
      genCard({ cardValue: 1, suiteID: 0 }),
      genCard({ cardValue: 2, suiteID: 1 }),
      genCard({ cardValue: 3, suiteID: 2 }),
      genCard({ cardValue: 4, suiteID: 3 }),
      genCard({ cardValue: 5, suiteID: 0 }),
    ];
    expect(bestHand(cards)).toBe("Straight");
  });

  test("Middle Straight", () => {
    const cards = [
      genCard({ cardValue: 2, suiteID: 0 }),
      genCard({ cardValue: 3, suiteID: 1 }),
      genCard({ cardValue: 5, suiteID: 2 }),
      genCard({ cardValue: 6, suiteID: 3 }),
      genCard({ cardValue: 4, suiteID: 0 }),
    ];
    expect(bestHand(cards)).toBe("Straight");
  });

  test("High Straight", () => {
    const cards = [
      genCard({ cardValue: 1, suiteID: 0 }),
      genCard({ cardValue: 11, suiteID: 1 }),
      genCard({ cardValue: 12, suiteID: 2 }),
      genCard({ cardValue: 10, suiteID: 3 }),
      genCard({ cardValue: 13, suiteID: 0 }),
    ];
    expect(bestHand(cards)).toBe("Straight");
  });

  test("Straight with Two Pair", () => {
    const cards = [
      genCard({ cardValue: 8, suiteID: 0 }),
      genCard({ cardValue: 7, suiteID: 1 }),
      genCard({ cardValue: 5, suiteID: 2 }),
      genCard({ cardValue: 5, suiteID: 3 }),
      genCard({ cardValue: 6, suiteID: 0 }),
      genCard({ cardValue: 4, suiteID: 0 }),
      genCard({ cardValue: 4, suiteID: 0 }),
    ];
    expect(bestHand(cards)).toBe("Straight");
  });
});

describe("Check Flush", () => {
  test("Hearts", () => {
    const cards = [
      genCard({ cardValue: 1, suiteID: 0 }),
      genCard({ cardValue: 2, suiteID: 1 }),
      genCard({ cardValue: 3, suiteID: 0 }),
      genCard({ cardValue: 8, suiteID: 0 }),
      genCard({ cardValue: 9, suiteID: 0 }),
      genCard({ cardValue: 7, suiteID: 0 }),
    ];
    expect(bestHand(cards)).toBe("Flush");
  });

  test("Spades with Pair", () => {
    const cards = [
      genCard({ cardValue: 1, suiteID: 0 }),
      genCard({ cardValue: 1, suiteID: 1 }),
      genCard({ cardValue: 3, suiteID: 0 }),
      genCard({ cardValue: 8, suiteID: 0 }),
      genCard({ cardValue: 9, suiteID: 0 }),
      genCard({ cardValue: 7, suiteID: 0 }),
    ];
    expect(bestHand(cards)).toBe("Flush");
  });
});

describe("Check Straight Flush", () => {
  test("Low Straight Flush", () => {
    const cards = [
      genCard({ cardValue: 2, suiteID: 0 }),
      genCard({ cardValue: 3, suiteID: 0 }),
      genCard({ cardValue: 4, suiteID: 0 }),
      genCard({ cardValue: 5, suiteID: 0 }),
      genCard({ cardValue: 6, suiteID: 0 }),
    ];
    expect(bestHand(cards)).toBe("Straight Flush");
  });

  test("Royal Flush", () => {
    const cards = [
      genCard({ cardValue: 13, suiteID: 2 }),
      genCard({ cardValue: 12, suiteID: 2 }),
      genCard({ cardValue: 11, suiteID: 2 }),
      genCard({ cardValue: 10, suiteID: 2 }),
      genCard({ cardValue: 9, suiteID: 2 }),
      genCard({ cardValue: 8, suiteID: 2 }),
      genCard({ cardValue: 1, suiteID: 2 }),
    ];
    expect(bestHand(cards)).toBe("Royal Flush");
  });
});

describe("Bug", () => {
  test("Pair incorrectly throwing error", () => {
    const cards = [
      genCard({ cardValue: 7, suiteID: 0 }),
      genCard({ cardValue: 4, suiteID: 2 }),
      genCard({ cardValue: 1, suiteID: 3 }),
      genCard({ cardValue: 7, suiteID: 3 }),
      genCard({ cardValue: 9, suiteID: 3 }),
      genCard({ cardValue: 11, suiteID: 3 }),
      genCard({ cardValue: 13, suiteID: 1 }),
    ];
    expect(bestHand(cards)).toBe("Pair");
  });
});
