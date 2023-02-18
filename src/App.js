import "./App.css";
import { useEffect, useState } from "react";

import Board from "./components/Board";
import HandDescription from "./components/HandDescription";
import { Deal, Flop, Turn, River, Refresh } from "./components/DealButton.js";

import Deck from "./Deck";
import evaluate from "./evaluate";
import { DEAL_ACTION, GAME_STATE } from "./data";

const DECK = new Deck();

function App() {
  const [gameState, setGameState] = useState(GAME_STATE.DEAL);
  const [communityCards, setCommunityCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);

  const [handDescription, setHandDescription] = useState("Best Hand");
  const [bestCards, setBestCards] = useState([]);

  useEffect(() => {
    if (communityCards.length !== 0) {
      const hand = evaluate([...communityCards, ...playerCards]);
      setHandDescription(hand.handDescription);
      setBestCards(hand.bestCards);
    }
  }, [communityCards, playerCards]);

  const dealCard = (action, amount) => {
    switch (action) {
      case DEAL_ACTION.PLAYER:
        for (let i = 0; i < amount; i++) {
          setPlayerCards((cards) => [...cards, DECK.drawCard()]);
        }
        break;
      case DEAL_ACTION.COMMUNITY:
        for (let i = 0; i < amount; i++) {
          setCommunityCards((cards) => [...cards, DECK.drawCard()]);
        }
        break;
      default:
        break;
    }
  };

  const restart = () => {
    DECK.reset();
    setPlayerCards([]);
    setCommunityCards([]);
    setHandDescription("Best Hand");
    setBestCards([]);
  };

  const handleClick = (gameState) => {
    setGameState(gameState);
  };

  return (
    <div className="App">
      <HandDescription
        handDescription={handDescription}
        bestCards={bestCards}
      />
      <Board community={communityCards} hand={playerCards} />
      {(() => {
        switch (gameState) {
          case GAME_STATE.DEAL:
            return <Deal handleClick={handleClick} dealCard={dealCard} />;
          case GAME_STATE.FLOP:
            return <Flop handleClick={handleClick} dealCard={dealCard} />;
          case GAME_STATE.TURN:
            return <Turn handleClick={handleClick} dealCard={dealCard} />;
          case GAME_STATE.RIVER:
            return <River handleClick={handleClick} dealCard={dealCard} />;
          case GAME_STATE.REFRESH:
            return <Refresh handleClick={handleClick} restart={restart} />;
          default:
            return <Refresh handleClick={handleClick} restart={restart} />;
        }
      })()}
    </div>
  );
}

export default App;
