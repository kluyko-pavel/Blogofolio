import { IButton } from "../../types";
const Button = (props: IButton) => {
  const { content, isActive, callback, buttonStyle } = props;
  return (
    <button
      className="custom-button"
      disabled={!isActive}
      onClick={() => callback()}
      style={{
        opacity: isActive ? 1 : 0.5,
        cursor: isActive ? "pointer" : "not-allowed",
        ...buttonStyle,
      }}
    >
      {props.children || content}
    </button>
  );
};

export default Button;
