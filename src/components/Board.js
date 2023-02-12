import drawCard from "../drawCard.js";
import CardImage from "./CardImage";

function Board() {
  let currentCards = [];
  let hand = [];
  let community = [];

  while (community.length < 5) {
    community.push(drawCard(currentCards));
  }

  while (hand.length < 2) {
    hand.push(drawCard(currentCards));
  }

  return (
    <div className="board">
      <div className="community">
        {community.map((card) => (
          <CardImage key={card.id} suite={card.suite} value={card.value} />
        ))}
      </div>
      <div className="hand">
        {hand.map((card) => (
          <CardImage key={card.id} suite={card.suite} value={card.value} />
        ))}
      </div>
    </div>
  );
}

export default Board;
