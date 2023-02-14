import CardImage from "./CardImage";
import CardImagePlaceholder from "./CardImagePlaceholder";

function Board({ community, hand }) {
  return (
    <div className="board">
      <div className="community">
        {Array(5)
          .fill(<CardImagePlaceholder />)
          .map((current, index) =>
            index < community.length ? (
              <CardImage
                key={community[index].id}
                suite={community[index].suite}
                value={community[index].value}
              />
            ) : (
              current
            )
          )}
      </div>
      <div className="hand">
        {Array(2)
          .fill(<CardImagePlaceholder />)
          .map((current, index) =>
            index < hand.length ? (
              <CardImage
                key={hand[index].id}
                suite={hand[index].suite}
                value={hand[index].value}
              />
            ) : (
              current
            )
          )}
      </div>
    </div>
  );
}

export default Board;
