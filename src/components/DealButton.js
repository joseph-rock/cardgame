export function Deal(props) {
  return (
    <div className="Deal">
      <button
        onClick={() => {
          props.dealPlayer("player", 2);
          props.handleClick("flop");
          props.evaluate();
        }}
      >
        Deal
      </button>
    </div>
  );
}

export function Flop(props) {
  return (
    <div className="Flop">
      <button
        onClick={() => {
          props.dealCommunity("community", 3);
          props.handleClick("turn");
          props.evaluate();
        }}
      >
        Flop
      </button>
    </div>
  );
}

export function Turn(props) {
  return (
    <div className="Turn">
      <button
        onClick={() => {
          props.dealCommunity("community", 1);
          props.handleClick("river");
          props.evaluate();
        }}
      >
        Turn
      </button>
    </div>
  );
}

export function River(props) {
  return (
    <div className="River">
      <button
        onClick={() => {
          props.dealCommunity("community", 1);
          props.handleClick("refresh");
          props.evaluate();
        }}
      >
        River
      </button>
    </div>
  );
}

export function Refresh(props) {
  return (
    <div className="Refresh">
      <button
        onClick={() => {
          window.location.reload(false);
        }}
      >
        Refresh
      </button>
    </div>
  );
}
