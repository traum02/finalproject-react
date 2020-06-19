import React, { Component } from "react";
import axios from "axios";
import TimeTable from "./TimeTable";
import MapContent from "./MapContent";
import "./input.css";
import { Redirect } from "react-router";

class SelectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dData: [],
      time: [],
      mapShow: "block",
      selectTime: "",
      selectTeam: "",
      textMap: "보기",
      selectType: this.props.location.state.type,
    };
  }
  detailData = () => {
    let id = this.props.location.state.place_id;
    console.log(id);
    // const url = "http://192.168.0.108:9000/matchplay/placelist/detail?id=";
    const url = "http://localhost:9000/matchplay/placelist/detail?id=";

    axios
      .get(url + id)
      .then((res) => {
        this.setState({
          dData: res.data,
        });
        console.log(this.state.dData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTime = () => {
    let id = this.props.location.state.place_id;
    let type = this.props.location.state.type;
    let date = this.props.location.state.date;
    console.log(date + "type123");
    // const url =
    //   "http://192.168.0.108:9000/matchplay/placelist/gettime?place_id=";
    const url = "http://localhost:9000/matchplay/placelist/gettime?place_id=";

    axios
      .get(url + id + "&res_type=" + type + "&res_time=" + date)
      .then((res) => {
        this.setState({
          time: res.data,
        });
        console.log(this.state.time);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  checkMax = (e) => {
    let checkTeam = this.state.selectTeam;
    let checkCon;
    const checkDate = this.state.res_date;
    if (checkTeam === "1팀") {
      checkTeam = this.state.team1;
    } else {
      checkTeam = this.state.team2;
    }
    if (this.state.selectType === "0") {
      checkCon = checkTeam >= this.state.dData.place_max / 2;
    } else {
      checkCon = checkTeam >= 1;
    }
    if (checkCon) {
      alert("max");
      e.preventDefault();
    } else if (checkDate === undefined || checkDate === null) {
      alert(checkDate);
      this.addRes();
    } else {
      alert("update");
      this.updateRes();
    }
  };
  addRes = (e) => {
    // e.preventDefault();
    const {
      member_id,
      place_id,
      res_type,
      res_time,
      time_id,
      selectTeam,
    } = this.refs;
    // let url = "";
    // if (this.state.res_date === undefined || this.state.res_date === null) {
    // url = "http://192.168.0.108:9000/matchplay/placelist/addRes";
    const url = "http://localhost:9000/matchplay/placelist/addRes";
    // } else {
    // url = "http://192.168.0.108:9000/matchplay/placelist/updateRes";
    // url = "http://localhost:9000/matchplay/placelist/updateRes";
    // }
    axios
      .post(url, {
        member_id: member_id.value,
        place_id: place_id.value,
        res_type: res_type.value,
        res_time: res_time.value,
        time_id: time_id.value,
        selectTeam: selectTeam.value,
      })
      .then(() => {
        alert("ASDASDSA");
        document.location.href = "/";
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  updateRes = (e) => {
    const {
      member_id,
      place_id,
      res_type,
      res_time,
      time_id,
      selectTeam,
    } = this.refs;
    const url = "http://localhost:9000/matchplay/placelist/updateRes";
    alert(selectTeam.value + "+" + url);
    axios
      .post(url, {
        member_id: member_id.value,
        place_id: place_id.value,
        res_type: res_type.value,
        res_time: res_time.value,
        time_id: time_id.value,
        selectTeam: selectTeam.value,
      })
      .then((e) => {
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  showMap = () => {
    if (this.state.mapShow === "block") {
      this.setState({
        mapShow: "none",
        textMap: "보기",
      });
    } else {
      this.setState({
        mapShow: "block",
        textMap: "닫기",
      });
    }
  };

  selectTime = (time, team1, team2, res_date) => {
    this.setState({
      selectTime: time,
      team1: team1,
      team2: team2,
      res_date: res_date,
    });
  };

  selectTeam = (e) => {
    this.setState({
      selectTeam: e.currentTarget.textContent,
    });
  };

  componentDidMount() {
    this.detailData();
    this.getTime();
    this.setState({
      mapShow: "none",
    });
  }

  render() {
    const mapShow = {
      display: this.state.mapShow,
    };
    return (
      <div>
        <div id="mapcontainer" style={mapShow}>
          <MapContent dData={this.state.dData}></MapContent>
        </div>
        <button onClick={this.showMap.bind(this)}>
          지도 {this.state.textMap}
        </button>
        <div>
          {this.props.location.state.date}
          <br></br>
          {this.state.dData.place_name}
          <br></br>
          {this.state.dData.place_etc}
          <br></br>
          {this.state.dData.place_lat}
          <br></br>
          {this.state.dData.place_lng}
          <br></br>
          {"가격 : " + this.state.dData.place_price}
          <br></br>
          {"주소 : " + this.state.dData.place_addr}
          <br></br>
          {this.state.time.map((item, idx) => (
            <TimeTable
              selectTime={this.selectTime.bind(this)}
              item={item}
              key={idx}
              max={this.state.dData.place_max}
              type="select"
              selectType={this.props.location.state.type}
            />
          ))}
        </div>
        <div align="center" style={{ margin: "50px" }}>
          <div style={{ display: "inline-block" }}>
            <div
              style={{
                border: "1px solid gray",
                width: "200px",
                height: "200px",
                lineHeight: "200px",
                marginRight: "100px",
              }}
              onClick={
                (this.state.selectType === "0" &&
                  this.state.team1 !== undefined &&
                  this.state.dData.place_max / 2 - this.state.team1 !== 0) ||
                (this.state.selectType === "1" && this.state.team1 === "0")
                  ? this.selectTeam.bind(this)
                  : ""
              }
            >
              1팀
            </div>
            <div style={{ marginRight: "100px" }}>
              <div>
                {this.state.team1 === undefined
                  ? ""
                  : this.state.selectType === "0"
                  ? "참가 가능 인원 : " +
                    (this.state.dData.place_max / 2 - this.state.team1)
                  : this.state.team1 === "0"
                  ? "참가 가능"
                  : "참가 불가"}
              </div>
              {this.state.selectType === "0"
                ? "총 인원 : " + this.state.dData.place_max / 2
                : ""}
            </div>
          </div>
          <div style={{ display: "inline-block" }}>
            <div
              style={{
                border: "1px solid gray",
                width: "200px",
                height: "200px",
                lineHeight: "200px",
              }}
              onClick={
                (this.state.selectType === "0" &&
                  this.state.team2 !== undefined &&
                  this.state.dData.place_max / 2 - this.state.team2 !== 0) ||
                (this.state.selectType === "1" && this.state.team2 === "0")
                  ? this.selectTeam.bind(this)
                  : ""
              }
            >
              2팀
            </div>
            <div>
              <div>
                {this.state.team2 === undefined
                  ? ""
                  : this.state.selectType === "0"
                  ? "참가 가능 인원 : " +
                    (this.state.dData.place_max / 2 - this.state.team2)
                  : this.state.team2 === "0"
                  ? "참가 가능"
                  : "참가 불가"}
              </div>
              {this.state.selectType === "0"
                ? "총 인원 : " + this.state.dData.place_max / 2
                : ""}
            </div>
          </div>
        </div>

        <form onSubmit={this.checkMax.bind(this)}>
          <div>
            {this.state.selectTime}
            <br></br>
            {this.state.selectTeam}
            <br></br>
            {this.state.selectType + "타입"}
            <br></br>
            memberid<input type="text" ref="member_id"></input>
            <input
              type="hidden"
              value={this.state.dData.place_id}
              ref="place_id"
            ></input>
            <input
              type="hidden"
              value={this.state.selectType}
              ref="res_type"
            ></input>
            <input
              type="hidden"
              value={this.props.location.state.date}
              ref="res_time"
            ></input>
            <input
              type="hidden"
              value={this.state.selectTime}
              ref="time_id"
            ></input>
            <input
              type="hidden"
              value={this.state.selectTeam}
              ref="selectTeam"
            ></input>
          </div>
          <div>
            <button type="submit">예약</button>
            <button
              type="button"
              onClick={this.props.history.goBack.bind(this)}
            >
              back
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SelectDetail;
