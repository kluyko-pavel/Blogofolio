import { useSelector } from "react-redux";
import { IStoreState } from "../../types";
import { NavLink } from "react-router-dom";
import { THEMES } from "../../constants/theme-constants";
import "./EntryTemplatePage.css";

const EntryTemplatePage = (props: { children: any; pageTitle: string }) => {
  const theme = useSelector((state: IStoreState) => state.ui.theme);

  return (
    <section className="entry-page">
      <div className="container">
        <NavLink to="/posts">
          <span
            className={
              theme === THEMES.LIGHT
                ? "entry-page__home-link"
                : "entry-page__home-link dark"
            }
          >
            Back to home
          </span>
        </NavLink>
        <h1 className="entry-page__title">{props.pageTitle}</h1>
        {props.children}
      </div>
    </section>
  );
};

export default EntryTemplatePage;
