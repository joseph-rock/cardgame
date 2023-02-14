export function Deal(props) {
  return (
    <div className="Deal">
      <button
        onClick={() => {
          props.handleClick("flop");
          props.dealPlayer();
          props.dealPlayer();
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
          props.handleClick("turn");
          props.dealCommunity();
          props.dealCommunity();
          props.dealCommunity();
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
          props.handleClick("river");
          props.dealCommunity();
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
          props.handleClick("refresh");
          props.dealCommunity();
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
