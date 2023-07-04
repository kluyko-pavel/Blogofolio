interface ITab {
  label: string;
  active: string;
  disabled?: boolean;
  handlerClick: Function;
}

const Tab = ({ label, active, disabled, handlerClick }: ITab) => {
  return (
    <li
      className={
        disabled
          ? "tab tab--disabled"
          : label === active
          ? "tab tab--active"
          : "tab"
      }
      onClick={disabled ? () => {} : () => handlerClick()}
    >
      {label}
    </li>
  );
};

export default Tab;
