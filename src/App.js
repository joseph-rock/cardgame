import "./App.css";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (communityCards.length !== 0) {
      setHandDescription(bestHand([...communityCards, ...playerCards]));
    }
  }, [communityCards, playerCards]);

  const handleClick = (gameState) => {
    setGame(gameState);
  };

  const dealCard = (action, amt) => {
    switch (action) {
      case DEAL_ACTION.PLAYER:
        for (let i = 0; i < amt; i++) {
          setPlayerCards((cards) => [...cards, deck.drawCard()]);
        }
        break;
      case DEAL_ACTION.COMMUNITY:
        for (let i = 0; i < amt; i++) {
          setCommunityCards((cards) => [...cards, deck.drawCard()]);
        }
        break;
      default:
        return;
    }
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
