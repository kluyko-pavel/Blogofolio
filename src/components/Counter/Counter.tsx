import { useState } from "react";
import Changer from "./Changer";

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div style={{ display: "flex", marginTop: "10px" }}>
      <Changer count={count} setCount={setCount} />
    </div>
  );
};

export default Counter;
