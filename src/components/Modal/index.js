import React from "react";
import { CSSTransition } from "react-transition-group";

const Modal = props => {
  return (
    <CSSTransition
      in={props.show}
      timeout={400}
      classNames="diary-container__main_calendar-container-animation"
      unmountOnExit
    >
      <div className="modal">
        <div className="modal__block">
          <div className="modal__block_container">
            <div className="modal__block_container_header">
              <div className="modal__block_container_header_title">
                <span>{props.title}</span>
              </div>
              <div className="modal__block_container_header_options">
                <button
                  className="modal__block_container_header_options_btn"
                  onClick={props.hide}
                >
                  <i className="mi mi-ChromeClose"></i>
                </button>
              </div>
            </div>
            <div className="modal__block_container_body">{props.children}</div>
          </div>
        </div>
        <div className="modal__shadow" onClick={props.hide} />
      </div>
    </CSSTransition>
  );
};

export default Modal;
