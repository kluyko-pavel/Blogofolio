import { useDispatch, useSelector } from "react-redux";
import "./Modal.css";
import { IStoreState } from "../../types";
import { toggleModal } from "../../redux/action-creators/ui-action_creators";
import { THEMES } from "../../constants/theme-constants";

export const Modal = () => {
  const text = useSelector((state: IStoreState) => state.ui.modalInfo?.text);
  const theme = useSelector((state: IStoreState) => state.ui.theme);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(toggleModal({ text: "", showModal: false }));
  };
  return (
    <div className="modal-wrapper">
      <div className={theme === THEMES.LIGHT ? "modal" : "modal dark"}>
        <h3 className="modal__title">{text}</h3>
        <button className="modal__btn" onClick={handleCloseModal}>
          close
        </button>
      </div>
    </div>
  );
};
