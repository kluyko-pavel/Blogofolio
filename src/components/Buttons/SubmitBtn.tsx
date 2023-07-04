import "./SubmitBtn.css";

const SubmitBtn = ({ btnText, type }: { btnText: string; type: any }) => {
  return (
    <button className="submit-btn" type={type}>
      {btnText}
    </button>
  );
};

export default SubmitBtn;
