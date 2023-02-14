import "./App.css";
import { useState } from "react";
import Board from "./components/Board";
import drawCard from "./drawCard.js";

import Start from "./components/Start";
import Deal from "./components/Deal";
import Flop from "./components/Flop";
import Turn from "./components/Turn";
import River from "./components/River";

function App() {
  let currentCards = [];
  const [communityCards, setCommunityCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [game, setGame] = useState("start");

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
          case "start":
            return <Start handleClick={handleClick} dealPlayer={dealPlayer} />;
          case "deal":
            return (
              <Deal handleClick={handleClick} dealCommunity={dealCommunity} />
            );
          case "flop":
            return (
              <Flop handleClick={handleClick} dealCommunity={dealCommunity} />
            );
          case "turn":
            return (
              <Turn handleClick={handleClick} dealCommunity={dealCommunity} />
            );
          case "river":
            return <River />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default App;
