import { numbers, symbols } from "./data.js";
import Card from "./Card.js";

function drawCard(drawnCards = []) {
  const value = Math.floor(Math.random() * 13);
  const suite = Math.floor(Math.random() * 4);

  const card = new Card({
    id: value,
    value: numbers[value].number,
    suite: symbols[suite].name,
  });

  if (drawnCards.some((item) => card.equals(item))) {
    return drawCard(drawnCards);
  }

  drawnCards.push(card);
  return card;
}

export default drawCard;
