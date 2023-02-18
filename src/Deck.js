import Card from "./Card";
import { SUITE, VALUE } from "./data.js";

class Deck {
  constructor() {
    this.drawnCards = [];
  }

  drawCard() {
    const value = Object.keys(VALUE)[Math.floor(Math.random() * 13)];
    const suite = Object.keys(SUITE)[Math.floor(Math.random() * 4)];

    const card = new Card({
      number: VALUE[value].number,
      name: VALUE[value].name,
      suite: SUITE[suite].name,
    });

    if (this.drawnCards.some((item) => card.equals(item))) {
      return this.drawCard();
    }

    this.drawnCards.push(card);
    return card;
  }

  reset() {
    this.drawnCards = [];
  }
}

export default Deck;
