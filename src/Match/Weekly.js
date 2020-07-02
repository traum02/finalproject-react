import React, { Component } from "react";
import "../Css/Weekly.css";
import ArrowRight from "../image/next.png";
import ArrowLeft from "../image/back.png";
import Axios from "axios";
import Rain from "../image/rain.png";
import Sunny from "../image/sunny.png";
import Cloudy from "../image/cloudy.png";

class Weekly extends Component {
  state = {
    val: "",
    weather: [],
    weather2: [],
  };

  onPressArrowLeft = (e) => {
    // e.preventDefault();
    this.setState(
      {
        a: "1",
      },
      () => this.changeClass()
    );

    this.props.onLeft();
  };
  onPressArrowRight = (e) => {
    // e.preventDefault();
    this.setState(
      {
        a: "1",
      },
      () => this.changeClass()
    );

    this.props.onRight();
  };
  list = (e) => {
    let val = e.currentTarget.getAttribute("val");
    this.setState(
      {
        val: val,
      },
      () => this.changeClass()
    );
    // console.log(val + "vals");
    this.props.list(val);
    // this.changeClass();
  };
  changeClass = (e) => {
    for (
      let index = 0;
      index < document.querySelector(".weekly").parentElement.childElementCount;
      index++
    ) {
      document
        .querySelector(".weekly")
        .parentNode.children.item(index)
        .classList.remove("selected");
      if (
        document
          .querySelector(".weekly")
          .parentNode.children.item(index)
          .getAttribute("val") === this.state.val
      ) {
        document
          .querySelector(".weekly")
          .parentNode.children.item(index)
          .classList.add("selected");
      }
    }
  };

  getWeather = () => {
    // const url = "http://192.168.0.108:9000/matchplay/getWeather";
    const url = "http://localhost:9000/matchplay/getWeather";

    Axios.get(url)
      .then((res) => {
        this.setState({
          weather: res.data.item,
        });
        console.log(this.state.weather);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getWeather2 = () => {
    // const url = "http://192.168.0.108:9000/matchplay/getWeather2";
    const url = "http://localhost:9000/matchplay/getWeather2";

    Axios.get(url)
      .then((res) => {
        this.setState({
          weather2: res.data,
        });
        console.log(this.state.weather2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getWeather();
    this.getWeather2();
  }
  render() {
    const e = [];
    let t = new Date();
    let tmp = this.state.weather2.today + "";
    let today = new Date(
      tmp.substring(0, 4),
      tmp.substring(4, 6) - 1,
      tmp.substring(6)
    );
    let todaystr =
      t.getFullYear() +
      ((t.getMonth() + 1 + "").length === 1
        ? "0" + (t.getMonth() + 1 + "")
        : t.getMonth() + 1 + "") +
      ((t.getDate() + "").length === 1
        ? "0" + (t.getDate() + "")
        : t.getDate() + "");
    let today3 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 3
    );
    let today4 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 4
    );
    let today5 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 5
    );
    let today6 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 6
    );
    let today7 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7
    );
    let today8 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 8
    );
    let today9 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 9
    );
    let today10 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 10
    );

    for (let i = 0; i < this.props.info.length; i++) {
      let week = this.props.info[i].toString();
      let tmp = this.props.info[i].toLocaleString();
      let t = week.indexOf(",");
      tmp = tmp.substring(t + 1);
      let l = tmp.split(".");
      let val = "";
      for (let j = 0; j < 3; j++) {
        l[j] = l[j].replace(/ /gi, "");
      }
      for (let j = 0; j < 3; j++) {
        if (l[j].length === 1) {
          val += "0";
        }
        val += l[j];
      }

      let date = week.substring(t + 8, t + 11);
      week = week.substring(t + 1, t + 4);
      let weather1 = "";
      let weather2 = "";
      let weather1SKY = "";
      let weather2SKY = "";
      e.push(
        <div
          className={
            val == todaystr
              ? "weekly selected"
              : val < todaystr
              ? "weekly disabled"
              : "weekly"
          }
          onClick={val < todaystr ? "" : this.list.bind(this)}
          key={i}
          val={val}
          style={{
            color: week === "Sun" ? "red" : "black",
            verticalAlign: "top",
          }}
        >
          <div tabIndex={val} style={{ outline: "none", marginTop: "10px" }}>
            {week}
            {this.state.active}
          </div>
          <div tabIndex={val} style={{ fontSize: "20pt", outline: "none" }}>
            {date}
          </div>
          {this.state.weather.map((item, i) => {
            if (
              item.fcstDate === val &&
              item.fcstTime <= 1200 &&
              item.category === "PTY"
            ) {
              if (weather1 !== "1") {
                weather1 = item.fcstValue;
              }
            } else if (
              item.fcstDate === val &&
              item.fcstTime > 1200 &&
              item.category === "PTY"
            ) {
              if (weather2 !== "1") {
                weather2 = item.fcstValue;
              }
            } else if (item.fcstDate === "") {
              weather1 = "";
              weather2 = "";
            }
            if (
              weather1 === "0" &&
              item.fcstDate === val &&
              item.fcstTime < 1200 &&
              item.category === "SKY"
            ) {
              weather1SKY = item.fcstValue;
            } else if (
              weather2 === "0" &&
              item.fcstDate === val &&
              item.fcstTime > 1200 &&
              item.category === "SKY"
            ) {
              weather2SKY = item.fcstValue;
            }
            if (
              today3.getFullYear() +
                ((today3.getMonth() + 1 + "").length === 1
                  ? "0" + (today3.getMonth() + 1 + "")
                  : today3.getMonth() + 1 + "") +
                ((today3.getDate() + "").length === 1
                  ? "0" + (today3.getDate() + "")
                  : today3.getDate() + "") ===
              val
            ) {
              //중기예보
              weather1 =
                this.state.weather2.wf3 == null
                  ? this.state.weather2.wf3Am
                  : this.state.weather2.wf3;
              weather2 =
                this.state.weather2.wf3 == null
                  ? this.state.weather2.wf3Pm
                  : this.state.weather2.wf3;
            } else if (
              today4.getFullYear() +
                ((today4.getMonth() + 1 + "").length === 1
                  ? "0" + (today4.getMonth() + 1 + "")
                  : today4.getMonth() + 1 + "") +
                ((today4.getDate() + "").length === 1
                  ? "0" + (today4.getDate() + "")
                  : today4.getDate() + "") ===
              val
            ) {
              weather1 =
                this.state.weather2.wf4 == null
                  ? this.state.weather2.wf4Am
                  : this.state.weather2.wf4;
              weather2 =
                this.state.weather2.wf4 == null
                  ? this.state.weather2.wf4Pm
                  : this.state.weather2.wf4;
            } else if (
              today5.getFullYear() +
                ((today5.getMonth() + 1 + "").length === 1
                  ? "0" + (today5.getMonth() + 1 + "")
                  : today5.getMonth() + 1 + "") +
                ((today5.getDate() + "").length === 1
                  ? "0" + (today5.getDate() + "")
                  : today5.getDate() + "") ===
              val
            ) {
              weather1 =
                this.state.weather2.wf5 == null
                  ? this.state.weather2.wf5Am
                  : this.state.weather2.wf5;
              weather2 =
                this.state.weather2.wf5 == null
                  ? this.state.weather2.wf5Pm
                  : this.state.weather2.wf5;
            } else if (
              today6.getFullYear() +
                ((today6.getMonth() + 1 + "").length === 1
                  ? "0" + (today6.getMonth() + 1 + "")
                  : today6.getMonth() + 1 + "") +
                ((today6.getDate() + "").length === 1
                  ? "0" + (today6.getDate() + "")
                  : today6.getDate() + "") ===
              val
            ) {
              weather1 =
                this.state.weather2.wf6 == null
                  ? this.state.weather2.wf6Am
                  : this.state.weather2.wf6;
              weather2 =
                this.state.weather2.wf6 == null
                  ? this.state.weather2.wf6Pm
                  : this.state.weather2.wf6;
            } else if (
              today7.getFullYear() +
                ((today7.getMonth() + 1 + "").length === 1
                  ? "0" + (today7.getMonth() + 1 + "")
                  : today7.getMonth() + 1 + "") +
                ((today7.getDate() + "").length === 1
                  ? "0" + (today7.getDate() + "")
                  : today7.getDate() + "") ===
              val
            ) {
              weather1 =
                this.state.weather2.wf7 == null
                  ? this.state.weather2.wf7Am
                  : this.state.weather2.wf7;
              weather2 =
                this.state.weather2.wf7 == null
                  ? this.state.weather2.wf7Pm
                  : this.state.weather2.wf7;
            } else if (
              today8.getFullYear() +
                ((today8.getMonth() + 1 + "").length === 1
                  ? "0" + (today8.getMonth() + 1 + "")
                  : today8.getMonth() + 1 + "") +
                ((today8.getDate() + "").length === 1
                  ? "0" + (today8.getDate() + "")
                  : today8.getDate() + "") ===
              val
            ) {
              weather1 =
                this.state.weather2.wf8 == null
                  ? this.state.weather2.wf8Am
                  : this.state.weather2.wf8;
              weather2 =
                this.state.weather2.wf8 == null
                  ? this.state.weather2.wf8Pm
                  : this.state.weather2.wf8;
            } else if (
              today9.getFullYear() +
                ((today9.getMonth() + 1 + "").length === 1
                  ? "0" + (today9.getMonth() + 1 + "")
                  : today9.getMonth() + 1 + "") +
                ((today9.getDate() + "").length === 1
                  ? "0" + (today9.getDate() + "")
                  : today9.getDate() + "") ===
              val
            ) {
              weather1 =
                this.state.weather2.wf9 == null
                  ? this.state.weather2.wf9Am
                  : this.state.weather2.wf9;
              weather2 =
                this.state.weather2.wf9 == null
                  ? this.state.weather2.wf9Pm
                  : this.state.weather2.wf9;
            } else if (
              today10.getFullYear() +
                ((today10.getMonth() + 1 + "").length === 1
                  ? "0" + (today10.getMonth() + 1 + "")
                  : today10.getMonth() + 1 + "") +
                ((today10.getDate() + "").length === 1
                  ? "0" + (today10.getDate() + "")
                  : today10.getDate() + "") ===
              val
            ) {
              weather1 =
                this.state.weather2.wf10 == null
                  ? this.state.weather2.wf10Am
                  : this.state.weather2.wf10;

              weather2 =
                this.state.weather2.wf10 == null
                  ? this.state.weather2.wf10Pm
                  : this.state.weather2.wf10;
            }
          })}
          {(weather1SKY === "1" || weather1 === "맑음") && (
            <img src={Sunny} alt="" title="맑음"></img>
          )}
          {(weather1 === "1" || weather1 === "흐리고 비") && (
            <img src={Rain} alt="" title="비"></img>
          )}
          {weather1 !== "1" &&
            (weather1 === "흐림" ||
              weather1 === "구름많음" ||
              weather1SKY === "3" ||
              weather1SKY === "4") && (
              <img src={Cloudy} alt="" title="흐림"></img>
            )}
          {weather1 !== "" && (
            <span style={{ color: "rgb(80, 51, 150)" }}>/</span>
          )}
          {(weather2SKY === "1" || weather2 === "맑음") && (
            <img src={Sunny} alt="" title="맑음"></img>
          )}
          {(weather2 === "1" || weather2 === "흐리고 비") && (
            <img src={Rain} alt="" title="비"></img>
          )}
          {weather2 !== "1" &&
            (weather2 === "흐림" ||
              weather2 === "구름많음" ||
              weather2SKY === "3" ||
              weather2SKY === "4") && (
              <img src={Cloudy} alt="" title="흐림"></img>
            )}
        </div>
      );
    }
    return (
      <div>
        <div align="center">
          <div
            onClick={this.onPressArrowLeft.bind(this)}
            style={{
              display: "inline-block",
              cursor: "pointer",
              verticalAlign: "top",
              paddingTop: "30px",
            }}
          >
            <img src={ArrowLeft} style={{ width: "40px" }} alt=""></img>
          </div>
          <div
            style={{
              display: "inline-block",
            }}
          >
            {e}
          </div>
          <div
            onClick={this.onPressArrowRight.bind(this)}
            style={{
              display: "inline-block",
              cursor: "pointer",
              verticalAlign: "top",
              paddingTop: "30px",
            }}
          >
            <img src={ArrowRight} style={{ width: "40px" }} alt=""></img>
          </div>
        </div>
      </div>
    );
  }
}

export default Weekly;
