import { useState } from "react";
import { ImagesUploader, Loader } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { ImageListType, ImageType } from "react-images-uploading";
import { NavLink } from "react-router-dom";
import "./AddPostPage.css";
import { IStoreState } from "../../types";
import { THEMES } from "../../constants/theme-constants";
import { addPost } from "../../redux/action-creators";

export const AddPostPage = () => {
  const theme = useSelector((state: IStoreState) => state.ui.theme);
  const isLoading = useSelector((state: IStoreState) => state.ui.isLoading);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [lesson, setLesson] = useState(0);
  const [image, setImage] = useState({} as ImageType);

  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const handleChangeText = (e: any) => {
    setText(e.target.value);
  };
  const handleChangeLesson = (e: any) => {
    setLesson(e.target.value);
  };
  const handleImageChange = (imageList: ImageListType) => {
    setImage(imageList[0]);
  };
  const handleAddPost = (e: any) => {
    e.preventDefault();
    dispatch(addPost({ title, text, lesson_num: +lesson, image: image.file }));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <section className="add-post-page">
      <div className="container">
        <nav className="add-post-page__navigation">
          <NavLink to={"/posts"}>
            <span
              className={
                theme === THEMES.LIGHT
                  ? "add-post-page__navigation-home"
                  : "add-post-page__navigation-home dark"
              }
            >
              Home
            </span>
          </NavLink>
          <span className="add-post-page__navigation-line"></span>
          <p className="add-post-page__navigation-title">Add post</p>
        </nav>
        <h1 className="add-post-page__title">Add post</h1>
        <form
          action="#"
          className="add-post-page__form"
          name="add-post-page-form"
          onSubmit={(e) => handleAddPost(e)}
        >
          <label className="add-post-page__label">
            Title
            <input
              className="add-post-page__input"
              name="add-post-page-input-title"
              type="text"
              placeholder="Add your title"
              required
              onChange={(e) => handleChangeTitle(e)}
            />
          </label>
          <label className="add-post-page__label">
            Lesson number
            <input
              className="add-post-page__input add-post-page__input-lesson"
              name="add-post-page-input-lesson-num"
              type="number"
              placeholder="Add your lesson number"
              required
              onChange={(e) => handleChangeLesson(e)}
            />
          </label>
          <label className="add-post-page__label">
            Image
            <ImagesUploader
              image={image}
              onChange={handleImageChange}
              onRemove={() => setImage({})}
            />
          </label>
          <label className="add-post-page__label">
            Text
            <textarea
              className="add-post-page__input add-post-page__textarea"
              name="add-post-page-textarea-text"
              placeholder="Add your text"
              required
              onChange={(e) => handleChangeText(e)}
            ></textarea>
          </label>
          <div className="add-post-page__btns">
            <button className="add-post-page__btns-cancel" type="button">
              Cancel
            </button>
            <button className="add-post-page__btns-add" type="submit">
              Add post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
