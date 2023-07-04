import { EntryTemplatePage } from "../EntryTemplatePage";
import { default as RegistrationConfirmForm } from "./RegistrationConfirmForm";

const RegistrationConfirmPage = () => {
  return (
    <EntryTemplatePage pageTitle="Registration Confirmation">
      <RegistrationConfirmForm />
    </EntryTemplatePage>
  );
};

export default RegistrationConfirmPage;
