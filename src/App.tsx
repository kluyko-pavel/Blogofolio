import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Header, MainFooter, Modal } from "./components";
import {
  ContentPage,
  MainPage,
  StartPage,
  SignUpPage,
  SignInPage,
  RegistrationConfirmPage,
  RegistrationSuccessPage,
  SearchResPage,
  AddPostPage,
  MyPostsPage,
} from "./pages";
import { THEMES } from "./constants/theme-constants";
import "./config.css";
import { IStoreState } from "./types";
import SignUpActivation from "./pages/SignUpActivationPage";

function App() {
  const theme = useSelector((state: IStoreState) => state.ui.theme);
  const currentUser = useSelector((state: IStoreState) => state.user.user);
  const isModal = useSelector(
    (state: IStoreState) => state.ui.modalInfo.showModal
  );
  const isAuthorized = !!currentUser?.id;
  document.body.style.backgroundColor =
    theme === THEMES.LIGHT ? "#ffff" : "#313037";
  document.body.style.color = theme === THEMES.LIGHT ? "#313037" : "#ffff";
  return (
    <div className="wrapper">
      <BrowserRouter>
        {isModal && <Modal />}
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/">
              <Route index element={<StartPage />} />
              <Route path="posts">
                <Route index element={<MainPage />} />
                <Route
                  path=":postId"
                  element={
                    isAuthorized ? <ContentPage /> : <Navigate to="/sign-in" />
                  }
                />
                <Route path="search" element={<SearchResPage />} />
                <Route
                  path="addPost"
                  element={
                    isAuthorized ? <AddPostPage /> : <Navigate to="/sign-in" />
                  }
                />
                <Route
                  path="myPosts"
                  element={
                    isAuthorized ? <MyPostsPage /> : <Navigate to="/sign-in" />
                  }
                />
              </Route>
              <Route path="sign-in">
                <Route index element={<SignInPage />} />
              </Route>
              <Route path="sign-up">
                <Route index element={<SignUpPage />} />
                <Route
                  path="reg-confirm"
                  element={<RegistrationConfirmPage />}
                />
                <Route
                  path="reg-success"
                  element={<RegistrationSuccessPage />}
                />
              </Route>
              <Route
                path="activate/:uid/:token"
                element={<SignUpActivation />}
              />
            </Route>
          </Routes>
        </div>
        <MainFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
