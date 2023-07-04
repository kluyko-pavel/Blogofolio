import { NavLink } from "react-router-dom";
import { SubmitBtn } from "../../components/Buttons";
import { Input } from "../../components/Inputs";
import { useDispatch } from "react-redux";
import { signUp, toggleModal } from "../../redux/action-creators";
import { useState } from "react";

const SignUpForm = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const dispatch = useDispatch();

  const handlerSignUp = (e: any) => {
    e.preventDefault();
    if (userPassword === userPasswordConfirm) {
      dispatch(
        signUp({ username: userName, email: userEmail, password: userPassword })
      );
    } else {
      dispatch(
        toggleModal({ showModal: true, text: `Passwords don't match!` })
      );
    }
  };

  return (
    <form
      className="entry-form sign-up-form"
      action="#"
      name="sign-up-form"
      onSubmit={(e) => handlerSignUp(e)}
      method="post"
    >
      <Input
        labelName="Name"
        type="text"
        name="sign-up-name"
        placeholder="Your name"
        isActive={true}
        value={userName}
        callback={(e: any) => setUserName(e.target.value)}
      />
      <Input
        labelName="Email"
        type="email"
        name="sign-up-email"
        placeholder="Your email"
        isActive={true}
        value={userEmail}
        callback={(e: any) => setUserEmail(e.target.value)}
      />
      <Input
        labelName="Password"
        type="password"
        name="sign-up-password"
        placeholder="Your password"
        isActive={true}
        value={userPassword}
        callback={(e: any) => setUserPassword(e.target.value)}
      />
      <Input
        labelName="Confirm password"
        type="password"
        name="sign-up-confirm-password"
        placeholder="Confirm password"
        isActive={true}
        value={userPasswordConfirm}
        callback={(e: any) => setUserPasswordConfirm(e.target.value)}
      />

      <SubmitBtn btnText="Sign Up" type="submit" />
      <p className="entry-form__sign">
        Already have an account?
        <NavLink to="/sign-in">
          <span className="entry-form__sign-link"> Sign In</span>
        </NavLink>
      </p>
    </form>
  );
};

export default SignUpForm;
