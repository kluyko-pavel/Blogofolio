import "./Input.css";

interface IInput {
  labelName: string;
  type: string;
  name: string;
  callback: Function;
  value?: string;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  isActive?: boolean;
  error?: string;
}

const Input = (props: IInput) => {
  return (
    <>
      <label className="input-label">
        {props.labelName}
        <input
          type={props.type}
          className={
            props.labelName === "Error" ? "input error-input" : "input"
          }
          name={props.name}
          placeholder={props.placeholder}
          required={props.required}
          autoFocus={props.autoFocus}
          disabled={!props.isActive}
          onChange={(e) => props.callback(e)}
        />
      </label>
      <p className="input-error-text">
        {props.labelName === "Error" ? props.error : ""}
      </p>
    </>
  );
};

export default Input;
