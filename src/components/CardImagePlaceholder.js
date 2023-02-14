const CardImagePlaceholder = () => {
  let cardImage = require("./images/card_placeholder.png");
  return (
    <div className="cardplaceholder-container">
      {<img src={cardImage} alt={""}></img>}
    </div>
  );
};

export default CardImagePlaceholder;
