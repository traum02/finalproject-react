import React, { Component } from "react";
import "../Css/TimeTable.css";

class TimeTable extends Component {
  state = {
    val: "",
  };

  selectTime = (e) => {
    if (this.props.type === "select") {
      let time = e.currentTarget.getAttribute("val");
      let team1 = e.currentTarget.getAttribute("team1");
      let team2 = e.currentTarget.getAttribute("team2");
      let res_date = this.props.item.res_time;
      let ckClass = e.currentTarget.getAttribute("class").indexOf("enable");
      if (ckClass === -1) {
        this.props.selectTime(
          time,
          team1,
          team2,
          res_date,
          e.currentTarget.getAttribute("home_member_id"),
          e.currentTarget.getAttribute("away_member_id")
        );
      }
      this.setState(
        {
          val: time,
        },
        () => this.changeClass()
      );
    }
  };
  changeClass = (e) => {
    for (
      let index = 0;
      index <
      document.querySelector(".timeTable").parentElement.childElementCount;
      index++
    ) {
      document
        .querySelector(".timeTable")
        .parentNode.children.item(index)
        .classList.remove("selected");
      if (
        document
          .querySelector(".timeTable")
          .parentNode.children.item(index)
          .getAttribute("val") === this.state.val
      ) {
        document
          .querySelector(".timeTable")
          .parentNode.children.item(index)
          .classList.add("selected");
      }
    }
  };

  render() {
    let today = new Date();
    let now = new Date().toTimeString().substring(0, 2);
    // alert(now < this.props.item.time_val.substring(0, 2));
    let todaystr =
      today.getFullYear() +
      ((today.getMonth() + 1 + "").length === 1
        ? "0" + (today.getMonth() + 1 + "")
        : today.getMonth() + 1 + "") +
      ((today.getDate() + "").length === 1
        ? "0" + (today.getDate() + "")
        : today.getDate() + "");

    return (
      <div
        // style={normal}
        max={this.props.max}
        val={this.props.item.time_id}
        class={
          this.props.max -
            this.props.item.res_team1 -
            this.props.item.res_team2 ===
            0 ||
          (this.props.item.res_type !== null &&
            this.props.item.res_type !== this.props.selectType) ||
          (this.props.item.res_type === "1" &&
            2 - this.props.item.res_team1 - this.props.item.res_team2 === 0) ||
          (now >= this.props.item.time_val.substring(0, 2) &&
            this.props.res_date == todaystr)
            ? "timeTable enable"
            : "timeTable able"
        }
        onClick={this.selectTime.bind(this)}
        team1={this.props.item.res_team1}
        team2={this.props.item.res_team2}
        home_member_id={this.props.item.home_member_id}
        away_member_id={this.props.item.away_member_id}
      >
        {this.props.item.time_val.replace(/(.{2})/, "$1~")}
      </div>
    );
  }
}

export default TimeTable;
