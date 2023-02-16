export function Deal(props) {
  return (
    <div className="Deal">
      <button
        onClick={() => {
          props.dealPlayer("player", 2);
          props.handleClick("flop");
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
          props.handleClick("deal");
          props.restart();
        }}
      >
        Refresh
      </button>
    </div>
  );
}
