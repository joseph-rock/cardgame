function River(props) {
  return (
    <div className="River">
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

export default River;
