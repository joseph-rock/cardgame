class Card {
  constructor({ id, value, suite }) {
    this.id = id;
    this.value = value;
    this.suite = suite;
  }

  equals(card) {
    return (
      this.id === card.id &&
      this.value === card.value &&
      this.suite === card.suite
    );
  }
}

export default Card;
