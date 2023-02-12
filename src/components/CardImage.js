const CardImage = ({ value, suite }) => {
  let cardImage = require(`../../public/images/${suite}_${value}.png`);
  return (
    <div className="card-container">
      {<img src={cardImage} alt={`${value} ${suite}`}></img>}
    </div>
  );
};

export default CardImage;
