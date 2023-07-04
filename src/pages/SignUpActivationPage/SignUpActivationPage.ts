import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { signUpActivation } from "../../redux/action-creators";

const SignUpActivation = () => {
  const { uid = "", token = "" } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      signUpActivation({
        uid,
        token,
      })
    );
  }, []);
  return null;
};

export default SignUpActivation;
