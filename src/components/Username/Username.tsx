import "./Username.css";

interface IUsername {
  username: string;
}

const Username = ({ username }: IUsername) => {
  return (
    <div className="username">
      <h3 className="username__initials">
        {username.split("_").map((el) => el[0].toUpperCase())}
      </h3>
      <p className="username__full-name">{username.replaceAll("_", " ")}</p>
    </div>
  );
};
export default Username;
