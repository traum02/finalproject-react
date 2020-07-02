import React, { Component } from "react";
import Weekly from "./Weekly";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      week: [],
    };
  }

  componentDidMount = () => {
    let now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let week = this.makeWeekArr(now);
    this.setState({
      date,
      week,
    });
  };

  makeWeekArr = (date) => {
    let week = [];
    for (let i = 0; i < 7; i++) {
      let newDate = new Date(date.valueOf() + 86400000 * i);
      week.push([i, newDate]);
    }
    return week;
  };

  onPressArrowLeft = () => {
    let newDate = new Date(this.state.date.valueOf() - 86400000 * 7);
    let newWeek = this.makeWeekArr(newDate);
    this.setState({
      date: newDate,
      week: newWeek,
    });
  };

  onPressArrowRight = () => {
    let newDate = new Date(this.state.date.valueOf() + 86400000 * 7);
    let newWeek = this.makeWeekArr(newDate);
    this.setState({
      date: newDate,
      week: newWeek,
    });
  };

  list = (e) => {
    this.props.list(e);
  };
  reload = () => {
    window.location.reload();
  };

  render() {
    return (
      <div>
        <div>
          <span
            style={{
              color: "rgb(80, 51, 150)",
              fontSize: "20pt",
              fontWeight: "bold",
            }}
          >
            {this.state.date.toLocaleString().substring(6, 7) + "월"}{" "}
          </span>{" "}
          <div>
            <button
              style={{
                // float: "right",
                position: "absolute",
                right: "25%",
                top: "25%",
                border: "none",
                backgroundColor: "#503396",
                color: "white",
                fontSize: "11pt",
                borderRadius: "5px",
                height: "30px",
              }}
              onClick={this.reload.bind(this)}
            >
              오늘
            </button>
          </div>
        </div>
        <Weekly
          date={this.state.date}
          info={this.state.week}
          list={this.list.bind(this)}
          onLeft={this.onPressArrowLeft.bind(this)}
          onRight={this.onPressArrowRight.bind(this)}
        ></Weekly>
      </div>
    );
  }
}

export default Calendar;
