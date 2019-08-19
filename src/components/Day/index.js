import React, { useRef } from "react";

const Day = props => {
  const dayDescription = useRef(null);

  return (
    <div className="day">
      <div className="day-container">
        <span className="day-container__date">{props.date}</span>
        {props.emtry ? (
          <React.Fragment>
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
          </React.Fragment>
        ) : (
          <div className="day-container__text">{props.text}</div>
        )}
      </div>
    </div>
  );
};
export default Day;
