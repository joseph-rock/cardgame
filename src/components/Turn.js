function Turn(props) {
  return (
    <div className="Turn">
      <button
        onClick={() => {
          props.handleClick("river");
          props.dealCommunity();
        }}
      >
        River
      </button>
    </div>
  );
}

export default Turn;
