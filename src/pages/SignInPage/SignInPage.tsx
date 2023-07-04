import { useSelector } from "react-redux";
import { EntryTemplatePage } from "../EntryTemplatePage";
import SignInForm from "./SignInForm";
import { IStoreState } from "../../types";
import { Loader } from "../../components";

export const SignInPage = () => {
  const isLoading = useSelector((state: IStoreState) => state.ui.isLoading);

  return isLoading ? (
    <Loader />
  ) : (
    <EntryTemplatePage pageTitle="Sign In">
      <SignInForm />
    </EntryTemplatePage>
  );
};
