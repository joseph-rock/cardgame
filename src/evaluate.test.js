import { SUITE, VALUE, HAND } from "./data.js";
import Card from "./Card.js";
import evaluate from "./evaluate.js";

function genCard({ value, suite } = {}) {
  return new Card({
    number: value.number,
    name: value.name,
    suite: suite.name,
  });
}

describe("Check High Card", () => {
  test("King High", () => {
    const a = genCard({ value: VALUE.KING, suite: SUITE.CLUBS });
    const b = genCard({ value: VALUE.EIGHT, suite: SUITE.DIAMONDS });
    const c = genCard({ value: VALUE.SEVEN, suite: SUITE.HEARTS });
    const d = genCard({ value: VALUE.TWO, suite: SUITE.SPADES });
    const e = genCard({ value: VALUE.NINE, suite: SUITE.CLUBS });
    const f = genCard({ value: VALUE.THREE, suite: SUITE.DIAMONDS });
    const g = genCard({ value: VALUE.FOUR, suite: SUITE.DIAMONDS });

    const cards = [a, b, c, d, e, f, g];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.HIGH_CARD);
    expect(hand.bestCards).toStrictEqual([a, e, b, c, g]);
  });

  test("Ace High", () => {
    const a = genCard({ value: VALUE.ACE, suite: SUITE.CLUBS });
    const b = genCard({ value: VALUE.EIGHT, suite: SUITE.DIAMONDS });
    const c = genCard({ value: VALUE.SEVEN, suite: SUITE.HEARTS });
    const d = genCard({ value: VALUE.TWO, suite: SUITE.CLUBS });
    const e = genCard({ value: VALUE.NINE, suite: SUITE.CLUBS });

    const cards = [a, b, c, d, e];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.HIGH_CARD);
    expect(hand.bestCards).toStrictEqual([a, e, b, c, d]);
  });
});

describe("Check Pairs", () => {
  test("Pair of Twos", () => {
    const a = genCard({ value: VALUE.ACE, suite: SUITE.CLUBS });
    const b = genCard({ value: VALUE.EIGHT, suite: SUITE.DIAMONDS });
    const c = genCard({ value: VALUE.TWO, suite: SUITE.CLUBS });
    const d = genCard({ value: VALUE.TWO, suite: SUITE.CLUBS });
    const e = genCard({ value: VALUE.NINE, suite: SUITE.CLUBS });

    const cards = [a, b, c, d, e];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.PAIR);
    expect(hand.bestCards).toStrictEqual([c, d, a, e, b]);
  });
  test("Three of a Kind Aces", () => {
    const a = genCard({ value: VALUE.ACE, suite: SUITE.CLUBS });
    const b = genCard({ value: VALUE.EIGHT, suite: SUITE.CLUBS });
    const c = genCard({ value: VALUE.QUEEN, suite: SUITE.CLUBS });
    const d = genCard({ value: VALUE.ACE, suite: SUITE.CLUBS });
    const e = genCard({ value: VALUE.ACE, suite: SUITE.DIAMONDS });

    const cards = [a, b, c, d, e];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.THREE_OF_A_KIND);
    expect(hand.bestCards).toStrictEqual([a, d, e, c, b]);
  });
  test("Four of a Kind Fours", () => {
    const a = genCard({ value: VALUE.FOUR, suite: SUITE.CLUBS });
    const b = genCard({ value: VALUE.FOUR, suite: SUITE.DIAMONDS });
    const c = genCard({ value: VALUE.QUEEN, suite: SUITE.SPADES });
    const d = genCard({ value: VALUE.FOUR, suite: SUITE.HEARTS });
    const e = genCard({ value: VALUE.FOUR, suite: SUITE.SPADES });

    const cards = [a, b, c, d, e];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.FOUR_OF_A_KIND);
    expect(hand.bestCards).toStrictEqual([a, b, d, e, c]);
  });
  test("Two Pair Kings Nines", () => {
    const a = genCard({ value: VALUE.KING, suite: SUITE.CLUBS });
    const b = genCard({ value: VALUE.KING, suite: SUITE.DIAMONDS });
    const c = genCard({ value: VALUE.QUEEN, suite: SUITE.CLUBS });
    const d = genCard({ value: VALUE.NINE, suite: SUITE.CLUBS });
    const e = genCard({ value: VALUE.NINE, suite: SUITE.DIAMONDS });

    const cards = [a, b, c, d, e];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.TWO_PAIR);
    expect(hand.bestCards).toStrictEqual([a, b, d, e, c]);
  });
  test("Full House 3 Tens 2 Jacks", () => {
    const a = genCard({ value: VALUE.TEN, suite: SUITE.SPADES });
    const b = genCard({ value: VALUE.TEN, suite: SUITE.CLUBS });
    const c = genCard({ value: VALUE.TEN, suite: SUITE.DIAMONDS });
    const d = genCard({ value: VALUE.JACK, suite: SUITE.SPADES });
    const e = genCard({ value: VALUE.JACK, suite: SUITE.DIAMONDS });

    const cards = [a, b, c, d, e];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.FULL_HOUSE);
    expect(hand.bestCards).toStrictEqual([a, b, c, d, e]);
  });
  test("Full House 2 Three of a Kind", () => {
    const a = genCard({ value: VALUE.TEN, suite: SUITE.SPADES });
    const b = genCard({ value: VALUE.TEN, suite: SUITE.HEARTS });
    const c = genCard({ value: VALUE.TEN, suite: SUITE.CLUBS });
    const d = genCard({ value: VALUE.JACK, suite: SUITE.SPADES });
    const e = genCard({ value: VALUE.JACK, suite: SUITE.HEARTS });
    const f = genCard({ value: VALUE.JACK, suite: SUITE.CLUBS });

    const cards = [a, b, c, d, e, f];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.FULL_HOUSE);
    expect(hand.bestCards).toStrictEqual([d, e, f, a, b]);
  });
});

describe("Check Straight", () => {
  test("Low Straight", () => {
    const a = genCard({ value: VALUE.ACE, suite: SUITE.SPADES });
    const b = genCard({ value: VALUE.TWO, suite: SUITE.SPADES });
    const c = genCard({ value: VALUE.THREE, suite: SUITE.SPADES });
    const d = genCard({ value: VALUE.FOUR, suite: SUITE.DIAMONDS });
    const e = genCard({ value: VALUE.FIVE, suite: SUITE.DIAMONDS });

    const cards = [a, b, c, d, e];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.STRAIGHT);
    expect(hand.bestCards).toStrictEqual([e, d, c, b, a]);
  });

  test("Middle Straight", () => {
    const a = genCard({ value: VALUE.TWO, suite: SUITE.SPADES });
    const b = genCard({ value: VALUE.THREE, suite: SUITE.SPADES });
    const c = genCard({ value: VALUE.FIVE, suite: SUITE.SPADES });
    const d = genCard({ value: VALUE.SIX, suite: SUITE.SPADES });
    const e = genCard({ value: VALUE.FOUR, suite: SUITE.DIAMONDS });

    const cards = [a, b, c, d, e];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.STRAIGHT);
    expect(hand.bestCards).toStrictEqual([d, c, e, b, a]);
  });

  test("High Straight", () => {
    const a = genCard({ value: VALUE.ACE, suite: SUITE.SPADES });
    const b = genCard({ value: VALUE.JACK, suite: SUITE.SPADES });
    const c = genCard({ value: VALUE.QUEEN, suite: SUITE.SPADES });
    const d = genCard({ value: VALUE.TEN, suite: SUITE.SPADES });
    const e = genCard({ value: VALUE.KING, suite: SUITE.HEARTS });

    const cards = [a, b, c, d, e];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.STRAIGHT);
    expect(hand.bestCards).toStrictEqual([a, e, c, b, d]);
  });

  test("Straight with Two Pair", () => {
    const a = genCard({ value: VALUE.EIGHT, suite: SUITE.SPADES });
    const b = genCard({ value: VALUE.SEVEN, suite: SUITE.SPADES });
    const c = genCard({ value: VALUE.FIVE, suite: SUITE.SPADES });
    const d = genCard({ value: VALUE.FIVE, suite: SUITE.HEARTS });
    const e = genCard({ value: VALUE.SIX, suite: SUITE.HEARTS });
    const f = genCard({ value: VALUE.FOUR, suite: SUITE.SPADES });
    const g = genCard({ value: VALUE.FOUR, suite: SUITE.HEARTS });

    const cards = [a, b, c, d, e, f, g];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.STRAIGHT);
    expect(hand.bestCards).toStrictEqual([a, b, e, d, g]);
  });
});

describe("Check Flush", () => {
  test("Hearts", () => {
    const a = genCard({ value: VALUE.ACE, suite: SUITE.HEARTS });
    const b = genCard({ value: VALUE.TWO, suite: SUITE.SPADES });
    const c = genCard({ value: VALUE.THREE, suite: SUITE.HEARTS });
    const d = genCard({ value: VALUE.EIGHT, suite: SUITE.HEARTS });
    const e = genCard({ value: VALUE.NINE, suite: SUITE.HEARTS });
    const f = genCard({ value: VALUE.SEVEN, suite: SUITE.HEARTS });

    const cards = [a, b, c, d, e, f];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.FLUSH);
    expect(hand.bestCards).toStrictEqual([a, e, d, f, c]);
  });

  test("Spades with Pair", () => {
    const a = genCard({ value: VALUE.ACE, suite: SUITE.SPADES });
    const b = genCard({ value: VALUE.ACE, suite: SUITE.HEARTS });
    const c = genCard({ value: VALUE.THREE, suite: SUITE.SPADES });
    const d = genCard({ value: VALUE.EIGHT, suite: SUITE.SPADES });
    const e = genCard({ value: VALUE.NINE, suite: SUITE.SPADES });
    const f = genCard({ value: VALUE.SEVEN, suite: SUITE.SPADES });

    const cards = [a, b, c, d, e, f];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.FLUSH);
    expect(hand.bestCards).toStrictEqual([a, e, d, f, c]);
  });
});

describe("Check Straight Flush", () => {
  test("Middle Straight Flush", () => {
    const a = genCard({ value: VALUE.TWO, suite: SUITE.DIAMONDS });
    const b = genCard({ value: VALUE.THREE, suite: SUITE.DIAMONDS });
    const c = genCard({ value: VALUE.FOUR, suite: SUITE.DIAMONDS });
    const d = genCard({ value: VALUE.FIVE, suite: SUITE.DIAMONDS });
    const e = genCard({ value: VALUE.SIX, suite: SUITE.DIAMONDS });
    const f = genCard({ value: VALUE.SIX, suite: SUITE.SPADES });

    const cards = [a, b, c, d, e, f];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.STRAIGHT_FLUSH);
    expect(hand.bestCards).toStrictEqual([e, d, c, b, a]);
  });

  test("Royal Flush", () => {
    const a = genCard({ value: VALUE.KING, suite: SUITE.HEARTS });
    const b = genCard({ value: VALUE.QUEEN, suite: SUITE.HEARTS });
    const c = genCard({ value: VALUE.JACK, suite: SUITE.HEARTS });
    const d = genCard({ value: VALUE.TEN, suite: SUITE.HEARTS });
    const e = genCard({ value: VALUE.NINE, suite: SUITE.HEARTS });
    const f = genCard({ value: VALUE.EIGHT, suite: SUITE.HEARTS });
    const g = genCard({ value: VALUE.ACE, suite: SUITE.HEARTS });

    const cards = [a, b, c, d, e, f, g];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.ROYAL_FLUSH);
    expect(hand.bestCards).toStrictEqual([g, a, b, c, d]);
  });
});

describe("Bug", () => {
  test("Pair incorrectly throwing error", () => {
    const a = genCard({ value: VALUE.SEVEN, suite: SUITE.CLUBS });
    const b = genCard({ value: VALUE.FOUR, suite: SUITE.HEARTS });
    const c = genCard({ value: VALUE.ACE, suite: SUITE.SPADES });
    const d = genCard({ value: VALUE.SEVEN, suite: SUITE.SPADES });
    const e = genCard({ value: VALUE.NINE, suite: SUITE.SPADES });
    const f = genCard({ value: VALUE.JACK, suite: SUITE.SPADES });
    const g = genCard({ value: VALUE.KING, suite: SUITE.HEARTS });

    const cards = [a, b, c, d, e, f, g];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.PAIR);
    expect(hand.bestCards).toStrictEqual([a, d, c, g, f]);
  });

  test("Straight wrong order", () => {
    const a = genCard({ value: VALUE.SIX, suite: SUITE.CLUBS });
    const b = genCard({ value: VALUE.THREE, suite: SUITE.HEARTS });
    const c = genCard({ value: VALUE.FIVE, suite: SUITE.DIAMONDS });
    const d = genCard({ value: VALUE.FIVE, suite: SUITE.SPADES });
    const e = genCard({ value: VALUE.JACK, suite: SUITE.SPADES });
    const f = genCard({ value: VALUE.SEVEN, suite: SUITE.SPADES });
    const g = genCard({ value: VALUE.FOUR, suite: SUITE.DIAMONDS });

    const cards = [a, b, c, d, e, f, g];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.STRAIGHT);
    expect(hand.bestCards).toStrictEqual([f, a, d, g, b]);
  });

  test("Two Pair wrong order", () => {
    const a = genCard({ value: VALUE.ACE, suite: SUITE.CLUBS });
    const b = genCard({ value: VALUE.SEVEN, suite: SUITE.DIAMONDS });
    const c = genCard({ value: VALUE.FIVE, suite: SUITE.SPADES });
    const d = genCard({ value: VALUE.JACK, suite: SUITE.HEARTS });
    const e = genCard({ value: VALUE.FIVE, suite: SUITE.DIAMONDS });
    const f = genCard({ value: VALUE.TWO, suite: SUITE.CLUBS });
    const g = genCard({ value: VALUE.TWO, suite: SUITE.HEARTS });

    const cards = [a, b, c, d, e, f, g];
    const hand = evaluate(cards);

    expect(hand.handDescription).toBe(HAND.TWO_PAIR);
    expect(hand.bestCards).toStrictEqual([c, e, f, g, a]);
  });
});
