import { DEAL_ACTION, GAME_STATE } from "../data";

export function Deal(props) {
  return (
    <div className="Deal">
      <button
        onClick={() => {
          props.dealCard(DEAL_ACTION.PLAYER, 2);
          props.handleClick(GAME_STATE.FLOP);
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
          props.dealCard(DEAL_ACTION.COMMUNITY, 3);
          props.handleClick(GAME_STATE.TURN);
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
          props.dealCard(DEAL_ACTION.COMMUNITY, 1);
          props.handleClick(GAME_STATE.RIVER);
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
          props.dealCard(DEAL_ACTION.COMMUNITY, 1);
          props.handleClick(GAME_STATE.REFRESH);
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
          props.handleClick(GAME_STATE.DEAL);
          props.restart();
        }}
      >
        Refresh
      </button>
    </div>
  );
}
