import "./App.css";
import { useEffect, useState } from "react";
import Board from "./components/Board";
import Deck from "./Deck";
import HandDescription from "./components/HandDescription";
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
  const [gameState, setGameState] = useState("deal");
  const [communityCards, setCommunityCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [handDescription, setHandDescription] = useState("Best Hand");

  const handleClick = (gameState) => {
    setGameState(gameState);
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
        break;
    }
  };

  const restart = () => {
    deck.reset();
    setPlayerCards([]);
    setCommunityCards([]);
    setHandDescription("Best Hand");
  };

  useEffect(() => {
    if (communityCards.length !== 0) {
      setHandDescription(bestHand([...communityCards, ...playerCards]));
    }
  }, [communityCards, playerCards]);

  return (
    <div className="App">
      <HandDescription handDescription={handDescription} />
      <Board community={communityCards} hand={playerCards} />
      {(() => {
        switch (gameState) {
          case GAME_STATE.DEAL:
            return <Deal handleClick={handleClick} dealPlayer={dealCard} />;
          case GAME_STATE.FLOP:
            return <Flop handleClick={handleClick} dealCommunity={dealCard} />;
          case GAME_STATE.TURN:
            return <Turn handleClick={handleClick} dealCommunity={dealCard} />;
          case GAME_STATE.RIVER:
            return <River handleClick={handleClick} dealCommunity={dealCard} />;
          case GAME_STATE.REFRESH:
            return <Refresh handleClick={handleClick} restart={restart} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default App;
