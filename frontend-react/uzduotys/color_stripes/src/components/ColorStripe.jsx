const ColorStripe = ({ color }) => {
  return (
    <div className="color-stripe" style={{ backgroundColor: color }}>
      <span>{color}</span>
    </div>
  );
};

export default ColorStripe;
