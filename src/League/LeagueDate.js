import React, { Component } from "react";
import next from "../image/next.png";

class LeagueDate extends Component {
  nextRound = () => {
    this.props.next();
  };
  prevRound = () => {
    this.props.prev();
  };
  render() {
    return (
      <div className="txt7" style={{ color: "white" }}>
        <div
          style={{
            display: "inline-block",
            marginRight: "10px",
            cursor: "pointer",
          }}
          onClick={this.prevRound.bind(this)}
        >
          <img
            src={next}
            style={{
              transform: "rotate(180deg)",
              height: "15px",
              filter: "invert(100%)",
              marginTop: "-4px",
            }}
            alt=""
          ></img>
        </div>
        <div style={{ display: "inline-block" }}>
          {this.props.date !== "" ? this.props.date : "이후 일정 없음"}
        </div>
        <div
          style={{ display: "inline-block", cursor: "pointer" }}
          onClick={this.nextRound.bind(this)}
        >
          <img
            src={next}
            style={{
              height: "15px",
              marginLeft: "10px",
              filter: "invert(100%)",
              marginTop: "-4px",
            }}
            alt=""
          ></img>
        </div>
      </div>
    );
  }
}

export default LeagueDate;
