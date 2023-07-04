import { NavLink } from "react-router-dom";
import { SubmitBtn } from "../../components/Buttons";
import { Input } from "../../components/Inputs";
import "./SignInPage.css";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/action-creators";
import { useState } from "react";

const SignInForm = () => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handlerSignIn = (e: any) => {
    e.preventDefault();
    dispatch(signIn({ email: userEmail, password: userPassword }));
  };
  return (
    <form
      className="entry-form"
      action="#"
      name="sign-in-form"
      onSubmit={(e) => handlerSignIn(e)}
    >
      <Input
        labelName="Email"
        type="email"
        name="email"
        placeholder="Your email"
        isActive={true}
        callback={(e: any) => setUserEmail(e.target.value)}
      />
      <Input
        labelName="Password"
        type="password"
        name="password"
        placeholder="Your password"
        isActive={true}
        callback={(e: any) => setUserPassword(e.target.value)}
      />
      <span className="sign-in-form__forgot-password">Forgot password?</span>
      <SubmitBtn btnText="Sign In" type="submit" />
      <p className="entry-form__sign">
        Don't have an account?
        <NavLink to="/sign-up">
          <span className="entry-form__sign-link"> Sign Up</span>
        </NavLink>
      </p>
    </form>
  );
};

export default SignInForm;
