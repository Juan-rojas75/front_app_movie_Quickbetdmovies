export default function Rating({total ,  thickness = 10  , size=70}) {
  const totalValue = total
  const angle = (totalValue / 10) * 360;
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    background: `conic-gradient(#4ade80 ${angle}deg, #d1d5db ${angle}deg)`,
  };
  return (
    <div className="w-full">
      <div
        className="relative flex items-center justify-center rounded-full"
        style={containerStyle}
      >
        <div
          className="flex items-center justify-center rounded-full bg-black"
          style={{
            width: `${size - thickness * 2}px`,
            height: `${size - thickness * 2}px`,
          }}
        >
          <span className="text-green-500 font-semibold text-xs">
            {" "}
            <span className="text-white">{totalValue}%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
