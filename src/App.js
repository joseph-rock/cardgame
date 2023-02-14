import "./App.css";
import { useState } from "react";
import Board from "./components/Board";
import drawCard from "./drawCard.js";
import { Deal, Flop, Turn, River, Refresh } from "./components/DealButton.js";

function App() {
  let currentCards = [];
  const [communityCards, setCommunityCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [game, setGame] = useState("deal");

  const handleClick = (gameState) => {
    setGame(gameState);
  };

  const dealPlayer = () => {
    setPlayerCards((cards) => [...cards, drawCard(currentCards)]);
  };

  const dealCommunity = () => {
    setCommunityCards((cards) => [...cards, drawCard(currentCards)]);
  };

  return (
    <div className="App">
      <Board community={communityCards} hand={playerCards} />
      {(() => {
        switch (game) {
          case "deal":
            return <Deal handleClick={handleClick} dealPlayer={dealPlayer} />;
          case "flop":
            return (
              <Flop handleClick={handleClick} dealCommunity={dealCommunity} />
            );
          case "turn":
            return (
              <Turn handleClick={handleClick} dealCommunity={dealCommunity} />
            );
          case "river":
            return (
              <River handleClick={handleClick} dealCommunity={dealCommunity} />
            );
          case "refresh":
            return <Refresh />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default App;
