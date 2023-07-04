import { useSelector } from "react-redux";
import { EntryTemplatePage } from "../EntryTemplatePage";
import SignUpForm from "./SignUpForm";
import { IStoreState } from "../../types";
import { Loader } from "../../components";

const SignUpPage = () => {
  const isLoading = useSelector((state: IStoreState) => state.ui.isLoading);

  return isLoading ? (
    <Loader />
  ) : (
    <EntryTemplatePage pageTitle="Sign Up">
      <SignUpForm />
    </EntryTemplatePage>
  );
};

export default SignUpPage;
