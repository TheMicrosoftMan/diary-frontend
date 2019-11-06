import React, { useState, useReducer } from "react";
import Modal from "../Modal";
import { Spinner, SpinnerSize } from "office-ui-fabric-react";

const loadFile = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const messageInitialState = { type: null, message: "" };

const messageReducer = (state, action) => {
  switch (action.type) {
    case "pending":
      return messageInitialState;
    case "error":
      return { type: "error", message: action.payload };
    case "success":
      return { type: "success", message: "Done" };

    default:
      return messageInitialState;
  }
};

const ExportModal = ({ title, show, hide, user, upload, pending }) => {
  const [selectedFile, setFile] = useState();
  const [messageResult, messageDispatch] = useReducer(
    messageReducer,
    messageInitialState
  );

  return (
    <Modal title={title} show={show} hide={hide}>
      <div className="exportModal">
        <div className="exportModal__file">
          <span className="exportModal__file_name">
            {selectedFile ? selectedFile.name : "No file selected"}
          </span>
          <input
            name="file"
            id="file"
            className="exportModal__file_inp"
            onChange={e => {
              setFile(e.target.files[0]);
            }}
            type="file"
            accept=".csv"
          />
          <label for="file" className="exportModal__file_label">
            Choose a file
          </label>
        </div>
        <div className="exportModal__footer">
          <button
            className="exportModal__footer_btn"
            onClick={async () => {
              try {
                messageDispatch({ type: "pending" });
                const base64 = await loadFile(selectedFile);
                await upload(user.token, user.id, base64);
                messageDispatch({ type: "success" });
              } catch (err) {
                console.log(err);
                messageDispatch({ type: "error", payload: err });
              }
            }}
          >
            Export
          </button>
          {pending && (
            <div className="exportModal__footer_spinner">
              <Spinner size={SpinnerSize.small} />
            </div>
          )}
          {messageResult && (
            <span
              className={`exportModal__footer_message-result ${messageResult.type}`}
            >
              {messageResult.message}
            </span>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ExportModal;
