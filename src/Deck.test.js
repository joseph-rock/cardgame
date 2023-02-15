import Deck from "./Deck";

const deck = new Deck();

describe("Check Deck", () => {
  test("Only Unique Cards", () => {
    let card = deck.drawCard();
    for (let i = 0; i < 51; i++) {
      let prevCards = [...deck.drawnCards];
      card = deck.drawCard();
      expect(prevCards.some((prevCard) => card.equals(prevCard))).toBe(false);
    }
  });
  test("Deck Size to be 52", () => {
    expect(deck.drawnCards.length).toBe(52);
  });
});
