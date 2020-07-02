import React from "react";

import MainVideo from "../image/mainVideo.mp4";

import "../Css/MainStyle.css";

const Main = () => {
  return (
    <div className="Main">
      <div>
        <video className="videoTag" autoPlay loop muted>
          <source src={MainVideo} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Main;
