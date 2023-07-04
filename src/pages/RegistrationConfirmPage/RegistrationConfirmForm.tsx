import { NavLink } from "react-router-dom";
import "./RegistrationConfirmPage.css";
import { useSelector } from "react-redux";
import { IStoreState } from "../../types";

const RegistrationConfirmForm = () => {
  const userEmail = useSelector((state: IStoreState) => state.user.user.email);
  return (
    <form
      className="entry-form reg-confirm-form"
      action="#"
      name="reg-confirm-form"
    >
      <p className="reg-confirm-form__text">
        Please activate your account with the activation link in the email
        <b> {userEmail}</b>. <br></br>Please, check your email
      </p>
      <NavLink to="/posts" className="submit-btn reg-confirm-form__btn">
        Go Home
      </NavLink>
    </form>
  );
};

export default RegistrationConfirmForm;
