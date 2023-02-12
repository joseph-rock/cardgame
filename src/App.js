import "./App.css";
import CardsWrapper from "./components/CardsWrapper";

function App() {
  return (
    <div className="App">
      <CardsWrapper cardsNumber="5" />
      <CardsWrapper cardsNumber="2" />
      <button onClick={() => window.location.reload()}>Reload Cards</button>
    </div>
  );
}

export default App;