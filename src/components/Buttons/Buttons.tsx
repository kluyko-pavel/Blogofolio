import Button from "./Button";
import "./Buttons.css";

const Buttons = () => {
  return (
    <div className="buttons-wrapper">
      <span style={{ color: "#fff" }}>BUTTONS</span>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          paddingTop: "50px",
          gap: "40px",
        }}
      >
        <div style={{ justifySelf: "center" }}>
          <Button
            content="Primary"
            isActive={true}
            callback={() => console.log(1)}
            buttonStyle={{
              color: "white",
              backgroundColor: "blue",
              border: "none",
            }}
          />
        </div>
        <div style={{ justifySelf: "center" }}>
          <Button
            content="Secondary"
            isActive={true}
            callback={() => console.log(2)}
            buttonStyle={{
              color: "black",
              backgroundColor: "gray",
              border: "none",
            }}
          />
        </div>
        <div style={{ justifySelf: "center" }}>
          <Button
            content="Secondary 2"
            isActive={false}
            callback={() => console.log(3)}
            buttonStyle={{
              color: "red",
              border: "none",
              backgroundColor: "inherit",
            }}
          />
        </div>
        <div style={{ justifySelf: "center" }}>
          <Button
            content="Primary"
            isActive={false}
            callback={() => console.log(4)}
            buttonStyle={{ color: "white", backgroundColor: "blue" }}
          />
        </div>
        <div style={{ justifySelf: "center" }}>
          <Button
            content="Secondary"
            isActive={true}
            callback={() => console.log(5)}
            buttonStyle={{
              color: "black",
              backgroundColor: "gray",
            }}
          />
        </div>
        <div style={{ justifySelf: "center" }}>
          <Button
            content="Secondary 2"
            isActive={true}
            callback={() => console.log(6)}
            buttonStyle={{
              color: "red",
              border: "1px solid gray",
              backgroundColor: "inherit",
            }}
          />
        </div>
        <div style={{ justifySelf: "center" }}>
          <Button
            content="Primary"
            isActive={false}
            callback={() => console.log(7)}
            buttonStyle={{
              color: "black",
              backgroundColor: "gray",
            }}
          />
        </div>
        <div style={{ justifySelf: "center" }}>
          <Button
            content="Secondary"
            isActive={false}
            callback={() => console.log(8)}
            buttonStyle={{
              color: "black",
              backgroundColor: "gray",
            }}
          />
        </div>
        <div style={{ justifySelf: "center" }}>
          <Button
            content="Secondary 2"
            isActive={false}
            callback={() => console.log(9)}
            buttonStyle={{
              color: "black",
              backgroundColor: "inherit",
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Buttons;
