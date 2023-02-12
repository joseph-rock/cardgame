import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div className="App">
      <Board />
      <button onClick={() => window.location.reload()}>Reload Cards</button>
    </div>
  );
}

export default App;
