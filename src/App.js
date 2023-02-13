import "./App.css";
import Board from "./components/Board";
import drawCard from "./drawCard.js";

function App() {
  let currentCards = [];
  let handCards = [];
  let communityCards = [];

  while (communityCards.length < 5) {
    communityCards.push(drawCard(currentCards));
  }

  while (handCards.length < 2) {
    handCards.push(drawCard(currentCards));
  }

  return (
    <div className="App">
      <Board community={communityCards} hand={handCards} />
      <button onClick={() => window.location.reload()}>Reload Cards</button>
    </div>
  );
}

export default App;
