function Flop(props) {
  return (
    <div className="Flop">
      <button
        onClick={() => {
          props.handleClick("turn");
          props.dealCommunity();
        }}
      >
        Turn
      </button>
    </div>
  );
}

export default Flop;
