import React from "react";

const Preloader = props => {
  switch (props.mode) {
    case "fullscreen":
      return (
        <div className="preloader-fullscreen">
          <div className="preloader-fullscreen__block">
            <div className="preloader">
              <div className="second-hand" />
              <div className="big-hand" />
              <div className="small-hand" />
            </div>
          </div>
        </div>
      );
    case "mini":
      return (
        <div className="preloader-mini">
          <div className="preloader">
            <div className="second-hand" />
            <div className="big-hand" />
            <div className="small-hand" />
          </div>
        </div>
      );
    default:
      return (
        <div className="preloader">
          <div className="second-hand" />
          <div className="big-hand" />
          <div className="small-hand" />
        </div>
      );
  }
};

export default Preloader;
