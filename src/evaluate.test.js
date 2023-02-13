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

describe("Check Single Pair", () => {
  test("Pair of twos", () => {
    const cards = [
      genCard({ cardValue: 1, suiteID: 0 }),
      genCard({ cardValue: 8, suiteID: 1 }),
      genCard({ cardValue: 2, suiteID: 2 }),
      genCard({ cardValue: 2, suiteID: 3 }),
      genCard({ cardValue: 9, suiteID: 0 }),
    ];
    expect(bestHand(cards)).toBe("Pair");
  });

  test("Pair of aces", () => {
    const cards = [
      genCard({ cardValue: 1, suiteID: 0 }),
      genCard({ cardValue: 8, suiteID: 1 }),
      genCard({ cardValue: 12, suiteID: 2 }),
      genCard({ cardValue: 2, suiteID: 3 }),
      genCard({ cardValue: 1, suiteID: 0 }),
    ];
    expect(bestHand(cards)).toBe("Pair");
  });
});

describe("Check Straight", () => {
  test("Low Straight", () => {
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
