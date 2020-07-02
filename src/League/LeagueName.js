import React, { Component } from "react";
import next from "../image/next.png";

class LeagueName extends Component {
  nextSeason = () => {
    this.props.next();
  };
  prevSeason = () => {
    this.props.prev();
  };
  render() {
    return (
      <div className="txt7">
        <div
          style={{ display: "inline-block", margin: "10px", cursor: "pointer" }}
          onClick={this.nextSeason.bind(this)}
        >
          <img
            src={next}
            style={{
              transform: "rotate(180deg)",
              height: "10px",
            }}
            alt=""
          ></img>
        </div>
        <div style={{ display: "inline-block", fontWeight: "bolder" }}>
          {this.props.name !== undefined ? this.props.name : "이전 일정 없음"}
        </div>
        <div
          style={{ display: "inline-block", cursor: "pointer" }}
          onClick={this.prevSeason.bind(this)}
        >
          <img
            src={next}
            style={{ height: "10px", margin: "10px" }}
            alt=""
          ></img>
        </div>
      </div>
    );
  }
}

export default LeagueName;
