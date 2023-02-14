function Start(props) {
  return (
    <div className="Start">
      <button
        onClick={() => {
          props.handleClick("deal");
          props.dealPlayer();
          props.dealPlayer();
        }}
      >
        Deal
      </button>
    </div>
  );
}

export default Start;
