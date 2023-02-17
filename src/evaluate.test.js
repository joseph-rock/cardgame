import { symbols, numbers } from "./data.js";
import Card from "./Card.js";
import { bestHand, evaluate, HAND } from "./evaluate.js";

function genCard({ cardValue, suiteID } = {}) {
  const id = cardValue - 1;
  return new Card({
    id: id,
    value: numbers[id].number,
    suite: symbols[suiteID].name,
  });
}

function compare(a, b) {
  return a.every((card, index) => card.equals(b[index]));
}

describe("Check High Card", () => {
  test("King High", () => {
    const a = genCard({ cardValue: 13, suiteID: 0 });
    const b = genCard({ cardValue: 8, suiteID: 1 });
    const c = genCard({ cardValue: 7, suiteID: 2 });
    const d = genCard({ cardValue: 2, suiteID: 3 });
    const e = genCard({ cardValue: 9, suiteID: 0 });
    const f = genCard({ cardValue: 3, suiteID: 1 });
    const g = genCard({ cardValue: 4, suiteID: 1 });

    const cards = [a, b, c, d, e, f, g];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.HIGH_CARD);
    expect(hand.bestCards).toStrictEqual([a, e, b, c, g]);
  });

  test("Ace High", () => {
    const a = genCard({ cardValue: 1, suiteID: 0 });
    const b = genCard({ cardValue: 8, suiteID: 1 });
    const c = genCard({ cardValue: 7, suiteID: 2 });
    const d = genCard({ cardValue: 2, suiteID: 3 });
    const e = genCard({ cardValue: 9, suiteID: 0 });

    const cards = [a, b, c, d, e];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.HIGH_CARD);
    expect(hand.bestCards).toStrictEqual([a, e, b, c, d]);
  });
});

describe("Check Pairs", () => {
  test("Pair of Twos", () => {
    const a = genCard({ cardValue: 1, suiteID: 0 });
    const b = genCard({ cardValue: 8, suiteID: 1 });
    const c = genCard({ cardValue: 2, suiteID: 2 });
    const d = genCard({ cardValue: 2, suiteID: 3 });
    const e = genCard({ cardValue: 9, suiteID: 0 });

    const cards = [a, b, c, d, e];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.PAIR);
    expect(hand.bestCards).toStrictEqual([c, d, a, e, b]);
  });

  test("Three of a Kind Aces", () => {
    const a = genCard({ cardValue: 1, suiteID: 0 });
    const b = genCard({ cardValue: 8, suiteID: 1 });
    const c = genCard({ cardValue: 12, suiteID: 2 });
    const d = genCard({ cardValue: 1, suiteID: 3 });
    const e = genCard({ cardValue: 1, suiteID: 0 });

    const cards = [a, b, c, d, e];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.THREE_OF_A_KIND);
    expect(hand.bestCards).toStrictEqual([a, d, e, c, b]);
  });

  test("Four of a Kind Fours", () => {
    const a = genCard({ cardValue: 4, suiteID: 0 });
    const b = genCard({ cardValue: 4, suiteID: 1 });
    const c = genCard({ cardValue: 12, suiteID: 2 });
    const d = genCard({ cardValue: 4, suiteID: 3 });
    const e = genCard({ cardValue: 4, suiteID: 0 });

    const cards = [a, b, c, d, e];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.FOUR_OF_A_KIND);
    expect(hand.bestCards).toStrictEqual([a, b, d, e, c]);
  });

  test("Two Pair Kings Nines", () => {
    const a = genCard({ cardValue: 13, suiteID: 0 });
    const b = genCard({ cardValue: 13, suiteID: 1 });
    const c = genCard({ cardValue: 12, suiteID: 2 });
    const d = genCard({ cardValue: 9, suiteID: 3 });
    const e = genCard({ cardValue: 9, suiteID: 0 });

    const cards = [a, b, c, d, e];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.TWO_PAIR);
    expect(hand.bestCards).toStrictEqual([a, b, d, e, c]);
  });

  test("Full House 3 Tens 2 Jacks", () => {
    const a = genCard({ cardValue: 10, suiteID: 0 });
    const b = genCard({ cardValue: 10, suiteID: 1 });
    const c = genCard({ cardValue: 10, suiteID: 2 });
    const d = genCard({ cardValue: 11, suiteID: 3 });
    const e = genCard({ cardValue: 11, suiteID: 0 });

    const cards = [a, b, c, d, e];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.FULL_HOUSE);
    expect(hand.bestCards).toStrictEqual([a, b, c, d, e]);
  });

  test("Full House 2 Three of a Kind", () => {
    const a = genCard({ cardValue: 10, suiteID: 0 });
    const b = genCard({ cardValue: 10, suiteID: 1 });
    const c = genCard({ cardValue: 10, suiteID: 2 });
    const d = genCard({ cardValue: 11, suiteID: 3 });
    const e = genCard({ cardValue: 11, suiteID: 0 });
    const f = genCard({ cardValue: 11, suiteID: 1 });

    const cards = [a, b, c, d, e, f];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.FULL_HOUSE);
    expect(hand.bestCards).toStrictEqual([d, e, f, a, b]);
  });
});

describe("Check Straight", () => {
  test("Low Straight", () => {
    const a = genCard({ cardValue: 1, suiteID: 0 });
    const b = genCard({ cardValue: 2, suiteID: 1 });
    const c = genCard({ cardValue: 3, suiteID: 2 });
    const d = genCard({ cardValue: 4, suiteID: 3 });
    const e = genCard({ cardValue: 5, suiteID: 0 });

    const cards = [a, b, c, d, e];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.STRAIGHT);
    expect(hand.bestCards).toStrictEqual([e, d, c, b, a]);
  });

  test("Middle Straight", () => {
    const a = genCard({ cardValue: 2, suiteID: 0 });
    const b = genCard({ cardValue: 3, suiteID: 1 });
    const c = genCard({ cardValue: 5, suiteID: 2 });
    const d = genCard({ cardValue: 6, suiteID: 3 });
    const e = genCard({ cardValue: 4, suiteID: 0 });

    const cards = [a, b, c, d, e];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.STRAIGHT);
    expect(hand.bestCards).toStrictEqual([d, c, e, b, a]);
  });

  test("High Straight", () => {
    const a = genCard({ cardValue: 1, suiteID: 0 });
    const b = genCard({ cardValue: 11, suiteID: 1 });
    const c = genCard({ cardValue: 12, suiteID: 2 });
    const d = genCard({ cardValue: 10, suiteID: 3 });
    const e = genCard({ cardValue: 13, suiteID: 0 });

    const cards = [a, b, c, d, e];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.STRAIGHT);
    expect(hand.bestCards).toStrictEqual([a, e, c, b, d]);
  });

  test("Straight with Two Pair", () => {
    const a = genCard({ cardValue: 8, suiteID: 0 });
    const b = genCard({ cardValue: 7, suiteID: 1 });
    const c = genCard({ cardValue: 5, suiteID: 2 });
    const d = genCard({ cardValue: 5, suiteID: 3 });
    const e = genCard({ cardValue: 6, suiteID: 0 });
    const f = genCard({ cardValue: 4, suiteID: 0 });
    const g = genCard({ cardValue: 4, suiteID: 1 });

    const cards = [a, b, c, d, e, f, g];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.STRAIGHT);
    expect(hand.bestCards).toStrictEqual([a, b, e, d, g]);
  });
});

describe("Check Flush", () => {
  test("Hearts", () => {
    const a = genCard({ cardValue: 1, suiteID: 0 });
    const b = genCard({ cardValue: 2, suiteID: 1 });
    const c = genCard({ cardValue: 3, suiteID: 0 });
    const d = genCard({ cardValue: 8, suiteID: 0 });
    const e = genCard({ cardValue: 9, suiteID: 0 });
    const f = genCard({ cardValue: 7, suiteID: 0 });

    const cards = [a, b, c, d, e, f];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.FLUSH);
    expect(hand.bestCards).toStrictEqual([a, e, d, f, c]);
  });

  test("Spades with Pair", () => {
    const a = genCard({ cardValue: 1, suiteID: 0 });
    const b = genCard({ cardValue: 1, suiteID: 1 });
    const c = genCard({ cardValue: 3, suiteID: 0 });
    const d = genCard({ cardValue: 8, suiteID: 0 });
    const e = genCard({ cardValue: 9, suiteID: 0 });
    const f = genCard({ cardValue: 7, suiteID: 0 });

    const cards = [a, b, c, d, e, f];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.FLUSH);
    expect(hand.bestCards).toStrictEqual([a, e, d, f, c]);
  });
});

describe("Check Straight Flush", () => {
  test("Middle Straight Flush", () => {
    const a = genCard({ cardValue: 2, suiteID: 0 });
    const b = genCard({ cardValue: 3, suiteID: 0 });
    const c = genCard({ cardValue: 4, suiteID: 0 });
    const d = genCard({ cardValue: 5, suiteID: 0 });
    const e = genCard({ cardValue: 6, suiteID: 0 });
    const f = genCard({ cardValue: 6, suiteID: 1 });

    const cards = [a, b, c, d, e, f];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.STRAIGHT_FLUSH);
    expect(hand.bestCards).toStrictEqual([e, d, c, b, a]);
  });

  test("Royal Flush", () => {
    const a = genCard({ cardValue: 13, suiteID: 2 });
    const b = genCard({ cardValue: 12, suiteID: 2 });
    const c = genCard({ cardValue: 11, suiteID: 2 });
    const d = genCard({ cardValue: 10, suiteID: 2 });
    const e = genCard({ cardValue: 9, suiteID: 2 });
    const f = genCard({ cardValue: 8, suiteID: 2 });
    const g = genCard({ cardValue: 1, suiteID: 2 });

    const cards = [a, b, c, d, e, f, g];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.ROYAL_FLUSH);
    expect(hand.bestCards).toStrictEqual([g, a, b, c, d]);
  });
});

describe("Bug", () => {
  test("Pair incorrectly throwing error", () => {
    const a = genCard({ cardValue: 7, suiteID: 0 });
    const b = genCard({ cardValue: 4, suiteID: 2 });
    const c = genCard({ cardValue: 1, suiteID: 3 });
    const d = genCard({ cardValue: 7, suiteID: 3 });
    const e = genCard({ cardValue: 9, suiteID: 3 });
    const f = genCard({ cardValue: 11, suiteID: 3 });
    const g = genCard({ cardValue: 13, suiteID: 1 });

    const cards = [a, b, c, d, e, f, g];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.PAIR);
    expect(hand.bestCards).toStrictEqual([a, d, c, g, f]);
  });

  test("Straight wrong order", () => {
    const a = genCard({ cardValue: 6, suiteID: 0 });
    const b = genCard({ cardValue: 3, suiteID: 2 });
    const c = genCard({ cardValue: 5, suiteID: 3 });
    const d = genCard({ cardValue: 5, suiteID: 3 });
    const e = genCard({ cardValue: 11, suiteID: 3 });
    const f = genCard({ cardValue: 7, suiteID: 3 });
    const g = genCard({ cardValue: 4, suiteID: 1 });

    const cards = [a, b, c, d, e, f, g];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.STRAIGHT);
    expect(hand.bestCards).toStrictEqual([f, a, c, g, b]);
  });
});
