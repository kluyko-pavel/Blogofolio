import Button from "../Buttons/Button";

type ChangerType = {
  count: number;
  setCount: Function;
};

const Changer = ({ count, setCount }: ChangerType) => {
  return (
    <Button
      isActive
      content={`Clicks: ${count}`}
      callback={() => setCount(count + 1)}
      buttonStyle={{ color: "white", backgroundColor: "blue" }}
    />
  );
};

export default Changer;
