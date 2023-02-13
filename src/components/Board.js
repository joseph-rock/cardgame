import CardImage from "./CardImage";

function Board({ community, hand }) {
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
