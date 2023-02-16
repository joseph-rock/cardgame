import Card from "./Card";
import { numbers, symbols } from "./data.js";

class Deck {
  constructor() {
    this.drawnCards = [];
  }

  drawCard() {
    const value = Math.floor(Math.random() * 13);
    const suite = Math.floor(Math.random() * 4);

    const card = new Card({
      id: value,
      value: numbers[value].number,
      suite: symbols[suite].name,
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
