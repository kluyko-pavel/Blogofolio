import { useState } from "react";
import { default as Button } from "./Button";

const notOutlined = {
  color: "white",
  backgroundColor: "blue",
  marginTop: "10px",
};

const outlined = {
  color: "red",
  outline: "2px solid red",
  backgroundColor: "white",
  marginTop: "10px",
};

const StateButton = () => {
  const [isOutlined, setIsOutlined] = useState(true);
  return (
    <Button
      content="Primary"
      isActive={true}
      callback={() => setIsOutlined(!isOutlined)}
      buttonStyle={isOutlined ? outlined : notOutlined}
    >
      <span>StateButton</span>
    </Button>
  );
};

export default StateButton;
