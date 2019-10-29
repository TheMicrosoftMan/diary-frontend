import React, { useState } from "react";
import { TextField } from "office-ui-fabric-react";

const Day = props => {
  const [text, setText] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="day">
      <div className="day-container">
        <span className="day-container__date">{props.date}</span>
        {props.day && (
          <div
            className="day-container__text"
            onClick={() => {
              setText(props.day.day);
              setIsEdit(true);
            }}
          >
            {props.day.day}
          </div>
        )}
        {(!props.day || isEdit) && (
          <React.Fragment>
            <div className="day-container__text">
              <TextField
                className="day-container__text_area"
                placeholder="Enter your day..."
                multiline
                autoAdjustHeight
                value={text}
                onChange={e => setText(e.target.value)}
              />
            </div>
            {props.day ? (
              <React.Fragment>
                <button
                  className="day-container__btn"
                  onClick={() => {
                    props.edit(props.day._id, text);
                    setIsEdit(false);
                  }}
                >
                  Edit
                </button>
                <button
                  className="day-container__btn"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <button
                  className="day-container__btn"
                  onClick={() => props.save(text)}
                >
                  Save
                </button>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

const MiniDay = props => {
  return (
    <div className="day mini-day" onClick={props.onClick}>
      <div className="day-container">
        <span className="day-container__date">{props.date}</span>
        <div className="day-container__text">
          {props.text.length < 140
            ? props.text
            : `${props.text.slice(0, 140)}...`}
        </div>
      </div>
    </div>
  );
};

export { Day, MiniDay };
