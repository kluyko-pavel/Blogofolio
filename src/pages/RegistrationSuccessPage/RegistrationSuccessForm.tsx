import { NavLink } from "react-router-dom";
import "./RegistrationSuccessPage.css";

const RegistrationSuccessForm = () => {
  return (
    <form
      className="entry-form reg-success-form"
      action="#"
      name="reg-success-form"
    >
      <p className="reg-success-form__text">
        Email confirmed. <br />
        Your registration is now completed
      </p>
      <NavLink to="/posts" className="submit-btn reg-success-form__btn">
        Go Home
      </NavLink>
    </form>
  );
};

export default RegistrationSuccessForm;
