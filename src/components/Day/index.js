import React, { useRef, useEffect } from "react";

const Day = props => {
  return (
    <div className="day">
      <div className="day-container">
        <span className="day-container__date">{props.date}</span>
        <div className="day-container__text">{props.text}</div>
      </div>
    </div>
  );
};

const NewDay = props => {
  const dayDescription = useRef(null);
  useEffect(() => {
    dayDescription.current.value = props.initialValue;
  });

  return (
    <div className="day">
      <div className="day-container">
        <span className="day-container__date">{props.date}</span>
        <div className="day-container__text">
          <textarea
            className="day-container__text_area"
            placeholder="Enter your day..."
            ref={dayDescription}
          />
        </div>
        <button
          className="day-container__save-btn"
          onClick={() => props.save(dayDescription.current.value)}
        >
          Save
        </button>
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

export { Day, NewDay, MiniDay };
