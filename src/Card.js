class Card {
  constructor({ number, name, suite }) {
    this.number = number;
    this.name = name;
    this.suite = suite;
  }

  equals(card) {
    return (
      this.number === card.number &&
      this.name === card.name &&
      this.suite === card.suite
    );
  }
}

export default Card;
