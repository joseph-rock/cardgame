function Deal(props) {
  return (
    <div className="Deal">
      <button
        onClick={() => {
          props.handleClick("flop");
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

export default Deal;
