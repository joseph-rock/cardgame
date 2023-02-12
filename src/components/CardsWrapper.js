import Card from "./Card";
import { numbers, symbols } from "../data";
import useRandomValueFromArray from "../hooks/useRandomValueFromArray";

const CardsWrapper = ({ cardsNumber }) => {
  const cardNumbers = cardsNumber;
  const { randomValueFromArray } = useRandomValueFromArray();

  return (
    <div className="card-wrapper">
      {[...Array(Number(cardNumbers))].map((_numb, index) => {
        index += 1;
        const randomSymbols =
          symbols[Math.floor(Math.random() * symbols.length)];

        return (
          <Card
            key={index}
            name={randomSymbols.name}
            number={randomValueFromArray(numbers).number}
          />
        );
      })}
    </div>
  );
};

export default CardsWrapper;