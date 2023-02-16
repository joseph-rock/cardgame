import "./App.css";
import { useState } from "react";
import Board from "./components/Board";
import Deck from "./Deck";
import { Deal, Flop, Turn, River, Refresh } from "./components/DealButton.js";
import bestHand from "./evaluate";

const DEAL_ACTION = {
  PLAYER: "player",
  COMMUNITY: "community",
};

const GAME_STATE = {
  DEAL: "deal",
  FLOP: "flop",
  TURN: "turn",
  RIVER: "river",
  REFRESH: "refresh",
};

const deck = new Deck();

function App() {
  const [communityCards, setCommunityCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [game, setGame] = useState("deal");
  const [handDescription, setHandDescription] = useState("");

  const handleClick = (gameState) => {
    setGame(gameState);
  };

  const dealCard = (action) => {
    const card = deck.drawCard();
    switch (action) {
      case DEAL_ACTION.PLAYER:
        setPlayerCards((cards) => [...cards, card]);
        break;
      case DEAL_ACTION.COMMUNITY:
        setCommunityCards((cards) => [...cards, card]);
        break;
      default:
        return;
    }
    evaluate();
  };

  const evaluate = () => {
    setHandDescription(() => bestHand([...communityCards, ...playerCards]));
  };

  return (
    <div className="App">
      <label>Best Hand: {handDescription}</label>
      <Board community={communityCards} hand={playerCards} />
      {(() => {
        switch (game) {
          case GAME_STATE.DEAL:
            return <Deal handleClick={handleClick} dealPlayer={dealCard} />;
          case GAME_STATE.FLOP:
            return <Flop handleClick={handleClick} dealCommunity={dealCard} />;
          case GAME_STATE.TURN:
            return <Turn handleClick={handleClick} dealCommunity={dealCard} />;
          case GAME_STATE.RIVER:
            return <River handleClick={handleClick} dealCommunity={dealCard} />;
          case GAME_STATE.REFRESH:
            return <Refresh />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default App;
