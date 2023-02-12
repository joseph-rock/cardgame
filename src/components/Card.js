
const Card = ({ number, name }) => {
  let cardImage = require(`./images/${name}_${number}.png`)
  return (
    <div className="card-container">
      {
      <img src={cardImage} alt={`${number} ${name}`}></img>
      }
    </div>
  );
};

export default Card;