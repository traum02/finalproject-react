import React, { Component } from "react";
import axios from "axios";
import TimeTable from "./TimeTable";
import MapContent from "./MapContent";
import "../Css/MainStyle.css";
import Carousel from "nuka-carousel";
import Scrollbars from "react-custom-scrollbars";
import Table from "react-bootstrap/Table";
import Man from "../image/jinman.png";
import Match from "../image/jinmatch.png";
import Vs from "../image/jinvs.png";
import JinShoes from "../image/jinshoes.jpg";
import Parking from "../image/parking.png";
import Football from "../image/football.png";
import Uniform from "../image/uniform.png";
import Shower from "../image/shower.png";
import Shoes from "../image/shoes.png";
import GoBack from "./GoBack";

class SelectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dData: [],
      pics: [],
      etc: [],
      time: [],
      mapShow: "block",
      carousel: "600px",
      selectTime: "",
      selectTeam: "",
      textMap: "보기",
      selectType: "",
      memberData: [],
      home_member_id: "",
      away_member_id: "",
    };
  }

  getMemberData = () => {
    // const url = "http://192.168.0.108:9000/matchplay/memberdata?id=";
    const url = "http://localhost:9000/matchplay/memberdata?id=";

    axios
      .get(url + window.sessionStorage.getItem("id"))
      .then((res) => {
        this.setState(
          {
            memberData: res.data,
          },
          () => console.log(this.state.memberData)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  detailData = () => {
    let id = this.props.location.state.place_id;
    console.log(id);
    // const url = "http://192.168.0.108:9000/matchplay/placelist/detail?id=";
    const url = "http://localhost:9000/matchplay/placelist/detail?id=";

    axios
      .get(url + id)
      .then((res) => {
        this.setState(
          {
            dData: res.data,
            etc: res.data.place_etc.split("/"),
            pics: res.data.place_pic.split("/"),
          },
          () => console.log(this.state.dData)
        );
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
    const url =
      // "http://192.168.0.108:9000/matchplay/placelist/gettime?place_id=";
      "http://localhost:9000/matchplay/placelist/gettime?place_id=";

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
    if (
      (this.state.home_member_id != null &&
        this.state.home_member_id.includes(
          window.sessionStorage.getItem("id")
        )) ||
      (this.state.away_member_id != null &&
        this.state.away_member_id.includes(window.sessionStorage.getItem("id")))
    ) {
      alert("이미 예약한 경기 입니다.");
      e.preventDefault();
    } else {
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
      // alert(
      //   this.state.selectType === "0"
      //     ? this.state.dData.place_price / this.state.dData.place_max
      //     : this.state.dData.place_price / 2
      // );
      // alert(checkDate);
      if (
        this.state.memberData.point <
        (this.state.selectType === "0"
          ? this.state.dData.place_price / this.state.dData.place_max
          : this.state.dData.place_price / 2)
      ) {
        alert("포인트가 부족합니다.\n충전 후에 다시 예약해주세요.");
        e.preventDefault();
      } else {
        if (checkCon) {
          alert("남아있는 자리가 없습니다.\n다시 선택하세요.");
          e.preventDefault();
        } else if (checkDate == undefined || checkDate == null) {
          this.addRes();
        } else {
          this.updateRes();
        }
      }
    }
  };
  usePoint = () => {
    const url =
      "http://localhost:9000/matchplay/usepoint?id=" +
      window.sessionStorage.getItem("id") +
      "&usingPoint=" +
      (this.state.selectType === "0"
        ? this.state.dData.place_price / this.state.dData.place_max
        : this.state.dData.place_price / 2);
    // const url = "http://192.168.0.108:9000/matchplay/usepoint";
    // alert("userid=" + window.sessionStorage.getItem("id"));
    // alert(
    //   "usingPoint=" +
    //     (this.state.selectType === "0"
    //       ? this.state.dData.place_price / this.state.dData.place_max
    //       : this.state.dData.place_price / 2)
    // );
    // alert(url);
    axios
      .get(url)
      .then((e) => {})
      .catch((err) => {
        alert(err);
      });
  };
  addRes = (e) => {
    // alert("addRes");
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
    // const url = "http://192.168.0.108:9000/matchplay/placelist/addRes";

    // } else {
    // url = "http://192.168.0.108:9000/matchplay/placelist/updateRes";
    // url = "http://localhost:9000/matchplay/placelist/updateRes";
    // }
    axios
      .post(url, {
        member_id:
          res_type.value == 0
            ? member_id.value
            : this.state.memberData.team_int,
        place_id: place_id.value,
        res_type: res_type.value,
        res_time: res_time.value,
        time_id: time_id.value,
        selectTeam: selectTeam.value,
      })
      .then(() => {
        this.usePoint();
        this.props.history.push("/ResultRes");
      })
      .catch((err) => {
        alert(err);
      });
  };
  updateRes = (e) => {
    // alert("update");
    const {
      member_id,
      place_id,
      res_type,
      res_time,
      time_id,
      selectTeam,
    } = this.refs;
    const url = "http://localhost:9000/matchplay/placelist/updateRes";
    // const url = "http://192.168.0.108:9000/matchplay/placelist/updateRes";
    // alert(selectTeam.value + "+" + url);
    axios
      .post(url, {
        member_id:
          res_type.value == 0
            ? member_id.value
            : this.state.memberData.team_int,
        place_id: place_id.value,
        res_type: res_type.value,
        res_time: res_time.value,
        time_id: time_id.value,
        selectTeam: selectTeam.value,
      })
      .then((e) => {
        this.usePoint();
        this.props.history.push("/ResultRes");
      })
      .catch((err) => {
        alert(err);
      });
  };

  showMap = () => {
    if (this.state.mapShow === "block") {
      this.setState({
        mapShow: "none",
        carousel: "600px",
        textMap: "보기",
      });
    } else {
      this.setState({
        mapShow: "block",
        carousel: "220px",
        textMap: "닫기",
      });
    }
  };

  selectTime = (
    time,
    team1,
    team2,
    res_date,
    home_member_id,
    away_member_id
  ) => {
    this.setState(
      {
        selectTime: time,
        team1: team1,
        team2: team2,
        res_date: res_date,
        home_member_id: home_member_id,
        away_member_id,
        away_member_id,
      },
      () => console.log(this.state.res_date)
    );
  };

  selectTeam = (e) => {
    this.setState({
      selectTeam: e.currentTarget.getAttribute("team"),
    });
    this.changeClass(e);
  };
  changeClass = (e) => {
    for (
      let index = 0;
      index < document.getElementsByClassName("btnSelectTeam").length;
      index++
    ) {
      if (
        document.getElementsByClassName("btnSelectTeam").item(index).style
          .backgroundColor !== "lightgray"
      ) {
        document
          .getElementsByClassName("btnSelectTeam")
          .item(index).style.backgroundColor = "#503396";
      }
    }
    e.currentTarget.style.backgroundColor = "rgba(80, 51, 150, 0.5)";
  };

  componentDidMount() {
    this.getMemberData();
    this.detailData();
    this.getTime();
    this.setState(
      {
        mapShow: "none",
        selectType: this.props.location.state.type,
      },
      () => console.log(this.state.selectType)
    );
  }

  render() {
    const mapShow = {
      display: this.state.mapShow,
      marginBottom: "30px",
    };
    const carouselShow = {
      height: this.state.carousel,
      border: "2px",
    };
    const place_pics = [];
    for (let i = 0; i < this.state.pics.length; i++) {
      if (this.state.pics[i] !== "") {
        place_pics.push(
          <img
            src={"http://localhost:9000/matchplay/image/" + this.state.pics[i]}
            // src={
            //   "http://192.168.0.108:9000/matchplay/image/" + this.state.pics[i]
            // }
            alt=""
            style={{ border: "2px" }}
          />
        );
      }
    }
    return (
      <div className="txt8" style={{ marginLeft: "0px" }}>
        <Scrollbars
          className="ReScroll"
          style={{ width: "100%", height: "710px" }}
        >
          <Carousel
            className="Carousel"
            width="100%"
            autoplay="true"
            autoplayInterval="2000"
            wrapAround="true"
            cellAlign="center"
            style={carouselShow}
          >
            {place_pics}
            <img
              src="https://plab-football.s3.amazonaws.com/media/player_fJKkASh.jpg"
              alt=""
            />
          </Carousel>
          <div id="mapcontainer" style={mapShow}>
            <MapContent dData={this.state.dData}></MapContent>
          </div>

          <div
            style={{
              width: "1342px",
            }}
            align="left"
          >
            <b className="txt1">{this.state.dData.place_name}</b>
            <br></br>
            <b className="txt2">{this.state.dData.place_addr + " "}</b>
            <button
              className="txt3"
              style={{
                width: "100px",
                height: "35px",
                backgroundColor: "#503396",
                color: "white",
                fontSize: "13pt",
                border: "#503396",
                outline: "none",
                borderRadius: "10px",
              }}
              onClick={this.showMap.bind(this)}
            >
              지도{this.state.textMap}
            </button>
            <br></br>
            <br></br>
            <b className="txt4">참가비</b>
            <br></br>
            <b className="txt5">
              {this.state.selectType === "0"
                ? this.state.dData.place_price / this.state.dData.place_max +
                  "원"
                : this.state.dData.place_price / 2 + "원"}
            </b>
            <hr />
            <b className="txt6">진행방식</b>
            <br />
            <table>
              <tbody>
                <tr>
                  <td
                    align="center"
                    width="200px"
                    style={{
                      border: "1px solid rgba(0,0,0,.1)",
                      height: "200px",
                    }}
                  >
                    <img src={Vs} alt="" style={{ width: "120px" }} />
                    <br />
                    <b>
                      {this.state.dData.place_max / 2} vs{" "}
                      {this.state.dData.place_max / 2} 매치
                    </b>
                  </td>
                  <td
                    align="center"
                    width="200px"
                    style={{ border: "1px solid rgba(0,0,0,.1)" }}
                  >
                    <img
                      src={Match}
                      alt=""
                      style={{
                        width: "140px",
                        height: "140px",
                        marginTop: "-20px",
                      }}
                    />
                    <br />
                    <b>친선 경기</b>
                  </td>
                  <td
                    align="center"
                    width="200px"
                    style={{ border: "1px solid rgba(0,0,0,.1)" }}
                  >
                    <img
                      src={Man}
                      alt=""
                      style={{ width: "120px", height: "120px" }}
                    />
                    <br />
                    <b>남성 매치</b>
                  </td>
                  <td
                    align="center"
                    width="200px"
                    style={{ border: "1px solid rgba(0,0,0,.1)" }}
                  >
                    <img
                      src={JinShoes}
                      alt=""
                      style={{ width: "120px", height: "120px" }}
                    />
                    <br />
                    <b>풋살화 착용</b>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr />
            <div style={{ padding: "10px" }}>
              <b className="txt7">예약시간</b>
              <br></br>
              <b className="txt8">예약 시간을 선택해주세요.</b>
              <br></br>
              <div style={{ marginTop: "10px" }}>
                {this.state.time.map((item, idx) => (
                  <TimeTable
                    selectTime={this.selectTime.bind(this)}
                    item={item}
                    key={idx}
                    max={this.state.dData.place_max}
                    type="select"
                    selectType={this.props.location.state.type}
                    res_date={this.props.location.state.date}
                  />
                ))}
              </div>
            </div>
            <div align="center">
              <Table
                bordered
                className="table table-bodered"
                style={{ width: "1000px", border: "2px", marginLeft: "0px" }}
              >
                <tbody>
                  <tr>
                    <td
                      colSpan="2"
                      align="center"
                      style={{
                        fontSize: "40pt",
                        fontWeight: "bold",
                        width: "1000px",
                      }}
                    >
                      {this.state.selectType === "0"
                        ? this.state.dData.place_max / 2 +
                          " vs " +
                          this.state.dData.place_max / 2 +
                          " "
                        : ""}
                      {this.state.selectType === "0" ? "개인" : "팀"} 일반매치
                      경기
                    </td>
                  </tr>
                  <tr>
                    <td align="center" width="500">
                      <b style={{ fontSize: "15pt" }}>
                        {this.state.selectType === "0"
                          ? "총 인원 : " + this.state.dData.place_max / 2
                          : "총 팀 : " + 1}
                      </b>
                      <br />
                      <b style={{ fontSize: "25pt" }}>Home</b>
                      <br />
                    </td>
                    <td align="center" width="500">
                      <b style={{ fontSize: "15pt" }}>
                        {this.state.selectType === "0"
                          ? "총 인원 : " + this.state.dData.place_max / 2
                          : "총 팀 : " + 1}
                      </b>
                      <br />
                      <b style={{ fontSize: "25pt" }}>Away</b>
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <b style={{ fontSize: "15pt" }}>현재 참여 가능 인원</b>
                      <br />
                      <b style={{ fontSize: "80pt" }}>
                        {this.state.team1 === undefined
                          ? ""
                          : this.state.selectType === "0"
                          ? this.state.dData.place_max / 2 - this.state.team1
                          : this.state.team1 === "0"
                          ? "가능"
                          : "불가"}
                      </b>
                      <br />
                      <br />
                      <button
                        className="btnSelectTeam"
                        team="1팀"
                        style={{
                          width: "140px",
                          height: "40px",
                          backgroundColor:
                            this.state.team1 === undefined
                              ? "lightgray"
                              : (this.state.selectType === "0" &&
                                  this.state.dData.place_max / 2 -
                                    this.state.team1 ===
                                    0) ||
                                (this.state.selectType !== "0" &&
                                  this.state.team1 !== "0")
                              ? "lightgray"
                              : "#503396",
                          color: "white",
                          fontSize: "15pt",
                          border: "#503396",
                          outline: "none",
                          borderRadius: "10px",
                        }}
                        onClick={
                          (this.state.selectType === "0" &&
                            this.state.team1 !== undefined &&
                            this.state.dData.place_max / 2 -
                              this.state.team1 !==
                              0) ||
                          (this.state.selectType === "1" &&
                            this.state.team1 === "0")
                            ? this.selectTeam.bind(this)
                            : ""
                        }
                      >
                        선택하기
                      </button>
                    </td>
                    <td align="center">
                      <b style={{ fontSize: "15pt" }}>현재 참여 가능 인원</b>
                      <br />
                      <b style={{ fontSize: "80pt" }}>
                        {this.state.team1 === undefined
                          ? ""
                          : this.state.selectType === "0"
                          ? this.state.dData.place_max / 2 - this.state.team2
                          : this.state.team2 === "0"
                          ? "가능"
                          : "불가"}
                      </b>
                      <br />
                      <br />
                      <button
                        className="btnSelectTeam"
                        team="2팀"
                        style={{
                          width: "140px",
                          height: "40px",
                          backgroundColor:
                            this.state.team2 === undefined
                              ? "lightgray"
                              : (this.state.selectType === "0" &&
                                  this.state.dData.place_max / 2 -
                                    this.state.team2 ===
                                    0) ||
                                (this.state.selectType !== "0" &&
                                  this.state.team2 !== "0")
                              ? "lightgray"
                              : "#503396",
                          color: "white",
                          fontSize: "15pt",
                          border: "#503396",
                          outline: "none",
                          borderRadius: "10px",
                        }}
                        onClick={
                          (this.state.selectType === "0" &&
                            this.state.team2 !== undefined &&
                            this.state.dData.place_max / 2 -
                              this.state.team2 !==
                              0) ||
                          (this.state.selectType === "1" &&
                            this.state.team2 === "0")
                            ? this.selectTeam.bind(this)
                            : ""
                        }
                      >
                        선택하기
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div>
                <form onSubmit={this.checkMax.bind(this)}>
                  <div>
                    {/* {this.state.selectTeam} */}
                    <br></br>
                    <input
                      type="hidden"
                      ref="member_id"
                      value={
                        this.state.selectType === "0"
                          ? window.sessionStorage.getItem("id")
                          : this.state.memberData.team_int
                      }
                    ></input>
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
                  <div align="center">
                    <button
                      type="submit"
                      style={{
                        width: "140px",
                        height: "40px",
                        backgroundColor: "#503396",
                        color: "white",
                        fontSize: "15pt",
                        border: "#503396",
                        outline: "none",
                        borderRadius: "10px",
                      }}
                    >
                      예약
                    </button>
                    <br></br>
                    <br></br>
                  </div>
                </form>
              </div>
            </div>
            <div>
              <b className="txt6">구장 시설</b>
              <br />
              <br />
              {/* {this.state.etc} */}
              <div style={{ paddingLeft: "50px" }}>
                <table>
                  <tbody>
                    <tr>
                      {this.state.etc.includes("주차") === true ? (
                        <td
                          align="center"
                          width="200px"
                          style={{
                            border: "1px solid rgba(0,0,0,.1)",
                            height: "200px",
                          }}
                        >
                          <img
                            src={Parking}
                            alt=""
                            style={{ width: "120px" }}
                          />
                          <br />
                          <b>주차</b>
                        </td>
                      ) : (
                        ""
                      )}
                      {this.state.etc.includes("공") === true ? (
                        <td
                          align="center"
                          width="200px"
                          style={{ border: "1px solid rgba(0,0,0,.1)" }}
                        >
                          <img
                            src={Football}
                            alt=""
                            style={{ width: "120px", height: "120px" }}
                          />
                          <br />
                          <b>공 대여</b>
                        </td>
                      ) : (
                        ""
                      )}
                      {this.state.etc.includes("샤워") === true ? (
                        <td
                          align="center"
                          width="200px"
                          style={{ border: "1px solid rgba(0,0,0,.1)" }}
                        >
                          <img
                            src={Shower}
                            alt=""
                            style={{ width: "120px", height: "120px" }}
                          />
                          <br />
                          <b>샤워 시설</b>
                        </td>
                      ) : (
                        ""
                      )}
                      {this.state.etc.includes("풋살화") === true ? (
                        <td
                          align="center"
                          width="200px"
                          style={{ border: "1px solid rgba(0,0,0,.1)" }}
                        >
                          <img
                            src={Shoes}
                            alt=""
                            style={{
                              width: "120px",
                              height: "70px",
                              marginTop: "30px",
                            }}
                          />
                          <br />
                          <br />
                          <b>풋살화 대여</b>
                        </td>
                      ) : (
                        ""
                      )}
                      {this.state.etc.includes("유니폼") === true ? (
                        <td
                          align="center"
                          width="200px"
                          style={{ border: "1px solid rgba(0,0,0,.1)" }}
                        >
                          <img
                            src={Uniform}
                            alt=""
                            style={{ width: "120px", height: "120px" }}
                          />
                          <br />
                          <b>유니폼 대여</b>
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <GoBack el="ReScroll" history={this.props.history}></GoBack>
          <br></br>
          <br></br>
          <br></br>
        </Scrollbars>
      </div>
    );
  }
}

export default SelectDetail;
