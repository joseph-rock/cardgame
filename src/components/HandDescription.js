import CardImage from "./CardImage";
import CardImagePlaceholder from "./CardImagePlaceholder";

const HandDescription = ({ handDescription, bestCards }) => {
  return (
    <div className="hand-description">
      <div>{<label>{handDescription}</label>}</div>
      <div className="community">
        {Array(5)
          .fill(<CardImagePlaceholder />)
          .map((current, index) =>
            index < bestCards.length ? (
              <CardImage
                key={bestCards[index].suite + bestCards[index].name}
                suite={bestCards[index].suite}
                value={bestCards[index].name}
              />
            ) : (
              current
            )
          )}
      </div>
    </div>
  );
};

export default HandDescription;
