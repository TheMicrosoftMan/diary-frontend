import React from "react";
import Modal from "../Modal";

import { ReactComponent as Icon } from "../../images/icon.svg";

const AboutModal = ({ title, show, hide }) => {
  return (
    <Modal title={title} show={show} hide={hide}>
      <div className="aboutModal">
        <div className="title">
          <div className="title__icon">
            <Icon />
          </div>
          <span className="title__text">My React Diary</span>
        </div>
        <div className="body">
          <h4>What is My React Diary?</h4>
          <p>
            My React Diary is a cloud-based super-fast, simple and free diary
            app. You can use My React Diary on all your devices at the same time
            - your day-posts sync seamlessly across any number of your phones,
            tablets or computers.
          </p>
          <h4>Features & roadmap</h4>
          <p>
            <ul>
              <li className="done">Statistics</li>
              <li className="done">Import</li>
              <li className="done">Export</li>
              <li>AES-256 encryption</li>
            </ul>
          </p>
        </div>
        <div className="footer">
          <div className="version">v. 0.9.6</div>
        </div>
      </div>
    </Modal>
  );
};

export default AboutModal;
