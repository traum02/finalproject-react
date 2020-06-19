import React, { Component } from "react";

class TimeTable extends Component {
  selectTime = (e) => {
    if (this.props.type === "select") {
      let time = e.currentTarget.getAttribute("val");
      let team1 = e.currentTarget.getAttribute("team1");
      let team2 = e.currentTarget.getAttribute("team2");
      let res_date = this.props.item.res_time;
      if (e.currentTarget.style.backgroundColor !== "lightgray") {
        this.props.selectTime(time, team1, team2, res_date);
      }
    }
  };
  render() {
    return (
      <div
        style={{
          display: "inline-block",
          border: "1px solid gray",
          backgroundColor:
            this.props.max -
              this.props.item.res_team1 -
              this.props.item.res_team2 ===
              0 ||
            (this.props.item.res_type !== null &&
              this.props.item.res_type !== this.props.selectType) ||
            (this.props.item.res_type === "1" &&
              2 - this.props.item.res_team1 - this.props.item.res_team2 === 0)
              ? "lightgray"
              : "#503396",
          width: "70px",
          height: "30px",
          lineHeight: "30px",
          borderRadius: "5px",
          margin: "1px",
          color: "white",
          cursor: "pointer",
        }}
        max={this.props.max}
        val={this.props.item.time_id}
        className="timeTable"
        onClick={this.selectTime.bind(this)}
        team1={this.props.item.res_team1}
        team2={this.props.item.res_team2}
      >
        {this.props.item.time_val.replace(/(.{2})/, "$1~")}
      </div>
    );
  }
}

export default TimeTable;
