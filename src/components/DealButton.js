export function Deal(props) {
  return (
    <div className="Deal">
      <button
        onClick={() => {
          props.dealPlayer("player");
          props.dealPlayer("player");
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
          props.dealCommunity("community");
          props.dealCommunity("community");
          props.dealCommunity("community");
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
          props.dealCommunity("community");
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
          props.dealCommunity("community");
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
          window.location.reload(false);
        }}
      >
        Refresh
      </button>
    </div>
  );
}
