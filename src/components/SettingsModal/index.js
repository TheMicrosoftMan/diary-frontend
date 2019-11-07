import React from "react";
import Modal from "../Modal";

const SettingsModal = ({ title, show, hide, pending, options }) => {
  return (
    <Modal title={title} show={show} hide={hide}>
      <div className="settingsModal">
        <button
          className="settingsModal__delete-btn"
          onClick={options.deleteAll}
        >
          Delete all posts
        </button>
      </div>
    </Modal>
  );
};

export default SettingsModal;
