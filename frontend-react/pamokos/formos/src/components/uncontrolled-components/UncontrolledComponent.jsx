import { useRef } from "react";

function UncontrolledComponent() {
  const myRef = useRef(null);

  const handleClick = () => {
    alert(myRef.current);
  };

  return (
    <>
      <input type="text" ref={myRef} className="border" />
      <button onClick={handleClick} className="bg-amber-300 p-1">
        Siųsti
      </button>
    </>
  );
}

export default UncontrolledComponent;
