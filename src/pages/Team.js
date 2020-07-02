import React, { Component, useState } from "react";
import Empty from "../image/img.png";
import { NavLink, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import Xicon from "../image/x-img.png";
import Gaip from "../image/gaip.png";
import "../Css/MainStyle.css";
import axios from "axios";

import TeamItem from "./TeamItem";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "380px",
    textAlign: "center",
    border: "2px solid #503396",
  },
};

//팀 리스트 페이지

class Team extends React.Component {
  constructor() {
    super();
    this.state = {
      // showModal: false,

      teamData: [],

      //자기팀 간단정보
      selectTeamData: "",

      //페이징용
      start: 0,
      flag: false,
      flag2: false,
      totalCount: "",

      //
      team_num: "",

      //검색용
      keyword: "",

      //소속팀 num 구하기
      myteamnum: -1,

      //접속자 팀 내 등급
      membergrade: "",
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  //소속된 팀 num 구하기
  getMyTeamNum = () => {
    const url =
      "http://localhost:9000/matchplay/teammember/myteamnum?member_id=";

    axios
      .get(url + window.sessionStorage.getItem("id"))
      .then((res) => {
        this.setState({
          myteamnum: res.data,
        });
        console.log("내 팀넘버===" + this.state.myteamnum);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //team_num 을 통해 값 가져오기
  onSelctData = () => {
    let url =
      "http://localhost:9000/matchplay/team/select?team_num=" +
      this.state.myteamnum;
    axios
      .get(url)
      .then((res) => {
        this.setState({
          selectTeamData: res.data,
        });
        console.dir("값 확인" + this.state.selectTeamData);
      })
      .catch((err) => {
        console.log("select 에러:" + err);
      });
  };

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  //페이지가 시작하자마자 리스트 호출
  componentWillMount() {
    this.list();

    this.getMyTeamNum();
    this.getGrade();
    setTimeout(() => {
      this.onSelctData();
      this.getResultCount();
    }, 200);
  }

  goBack = () => {
    this.props.history.push("/");
  };

  //팀 목록 출력
  list = () => {
    let url =
      "http://localhost:9000/matchplay/team/list?start=" + this.state.start;
    axios
      .get(url)
      .then((responsedata) => {
        this.setState({
          totalCount: responsedata.data[0].totalCount,
          teamData: responsedata.data,
        });
      })
      .catch((error) => {
        console.log("teamlist 에러" + error);
      });
  };

  onClickNext = () => {
    if (this.state.teamData.length !== 0) {
      this.setState((prevState, props) => ({
        start: prevState.start + 10,
        flag: true,
      }));
    }
  };

  onClickPre = () => {
    if (this.state.start > 0) {
      this.setState((prevState, props) => ({
        start: prevState.start - 10,
        flag2: true,
      }));
    }
  };
  getResultCount = () => {
    let url =
      "http://localhost:9000/matchplay/team/resultcount?team_num=" +
      this.state.myteamnum;
    axios
      .get(url)
      .then((res) => {
        this.setState({
          teamWin: res.data[0],
          teamDraw: res.data[1],
          teamLose: res.data[2],
        });
        console.log(this.state.teamWin);
      })
      .catch((err) => {
        console.log("팀장구하기 에러" + err);
      });
  };

  componentDidUpdate = () => {
    if (this.state.flag) {
      this.list();
      this.setState({
        flag: false,
      });
      console.log("Asd");
    } else if (this.state.flag2) {
      this.list();
      this.setState({
        flag2: false,
      });
      console.log("Asd");
    }
  };

  //검색
  searchlist = () => {
    this.setState({
      idx: 2,
    });

    let url =
      "http://localhost:9000/matchplay/team/searchlist?start=" +
      this.state.start +
      "&keyword=" +
      this.refs.keyword.value;

    // let searchData = this.state;
    axios
      .post(url, {
        keyword: this.refs.keyword.value,
      })
      .then((responsedata) => {
        this.setState({
          teamData: responsedata.data,
        });
      })
      .catch((error) => {
        console.log("list 에러" + error);
      });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.searchlist();
    console.log();
  };

  pageWrite = (i) => {
    this.setState({
      start: (i - 1) * 5,
    });
    setTimeout(() => {
      this.list();
    }, 50);
  };

  //현재 접속자의 권한이 승인 대기자가 아닌지 체크하기

  getGrade = () => {
    const url =
      "http://localhost:9000/matchplay/teammember/teammaster?member_id=";

    axios
      .get(url + window.sessionStorage.getItem("id"))
      .then((res) => {
        this.setState({
          membergrade: res.data,
        });
        console.log("당신의 등급은? ===" + this.state.membergrade);
        // this.props.Onlist();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let tdata = this.state.selectTeamData;
    const url = "http://localhost:9000/matchplay/image/";

    let total =
      this.state.teamWin * 1 +
      this.state.teamLose * 1 +
      this.state.teamDraw * 1;
    let avg = (this.state.teamWin / total) * 100;

    let totalc = this.state.totalCount; //전체 값이자 end
    let pageCount = 10;

    const p = [];
    for (let i = 1; i < totalc / pageCount + 1; i++) {
      p.push(
        <div
          style={{
            border: "1px solid black",
            width: "70px",
            textAlign: "center",
          }}
        >
          <a
            className="page-link"
            onClick={this.pageWrite.bind(this, i)}
            style={{ color: "black", cursor: "pointer" }}
          >
            {i}
          </a>
        </div>
      );
    }

    return (
      <div>
        <div
          style={{ width: "450px", height: "683px", border: "1px solid gray" }}
        >
          <table style={{ width: "450px", border: "1px" }}>
            <tbody>
              <tr>
                {this.state.membergrade != "no" &&
                this.state.myteamnum != -1 ? (
                  <td align="center">
                    <img
                      src={url + tdata.team_photo}
                      alt=""
                      style={{
                        width: "180px",
                        outline: "none",
                        border: "none",
                        borderRadius: "100%",
                        marginTop: "30px",
                        height: "180px",
                      }}
                    />
                  </td>
                ) : (
                  ""
                )}
              </tr>
              <tr>
                <td align="center">
                  {this.state.membergrade != "no" &&
                  this.state.myteamnum != -1 ? (
                    <b style={{ fontSize: "16pt" }}>{tdata.team_name}</b>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          {this.state.membergrade != "no" && this.state.myteamnum != -1 ? (
            <div align="center" className="TeamTable">
              <table style={{ width: "350px", height: "120px" }}>
                <tbody>
                  <b>팀 전적</b>
                  <tr style={{ border: "1px solid gray" }}>
                    <td
                      align="center"
                      style={{
                        width: "60px",
                        border: "1px solid rgba(0,0,0,.1)",
                      }}
                    >
                      <b>승</b>
                    </td>
                    <td
                      align="center"
                      style={{
                        width: "60px",
                        border: "1px solid rgba(0,0,0,.1)",
                      }}
                    >
                      <b>패</b>
                    </td>
                    <td
                      align="center"
                      style={{
                        width: "60px",
                        border: "1px solid rgba(0,0,0,.1)",
                      }}
                    >
                      <b>무</b>
                    </td>
                    <td
                      align="center"
                      style={{
                        width: "70px",
                        border: "1px solid rgba(0,0,0,.1)",
                      }}
                    >
                      <b>승률</b>
                    </td>
                  </tr>
                  <tr>
                    <td
                      align="center"
                      style={{ border: "1px solid rgba(0,0,0,.1)" }}
                    >
                      <b>{this.state.teamWin}</b>
                    </td>
                    <td
                      align="center"
                      style={{ border: "1px solid rgba(0,0,0,.1)" }}
                    >
                      <b>{this.state.teamLose}</b>
                    </td>
                    <td
                      align="center"
                      style={{ border: "1px solid rgba(0,0,0,.1)" }}
                    >
                      <b>{this.state.teamDraw}</b>
                    </td>
                    <td
                      align="center"
                      style={{ border: "1px solid rgba(0,0,0,.1)" }}
                    >
                      <b>{avg}%</b>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <NavLink
                to={"/Team/TeamHome/" + this.state.myteamnum}
                style={{ textDecoration: "none" }}
              >
                <button style={{ fontSize: "13pt", height: "35px" }}>
                  팀 페이지 바로가기
                </button>
              </NavLink>
            </div>
          ) : (
            <div
              align="center"
              style={{
                position: "absolute",
                left: "55px",
                top: "430px",
                border: "3px",
              }}
            >
              <b style={{ fontSize: "20pt" }}>현재 가입된 팀이 없습니다.</b>
              <br />
              <b style={{ fontSize: "14pt", color: "gray" }}>
                팀 생성 또는 가입신청을 하시기 바랍니다.
              </b>
              <br />
              <br />
              <br />
              <NavLink
                to="/Team/Create/CreateTeam"
                style={{ textDecoration: "none" }}
              >
                <button
                  style={{
                    fontSize: "13pt",
                    height: "40px",
                    width: "200px",
                    backgroundColor: "#503396",
                    color: "white",
                  }}
                >
                  팀 생성하기
                </button>
              </NavLink>
            </div>
          )}
        </div>
        <div
          align="center"
          className="TeamTable"
          textAlign="center"
          style={{
            position: "absolute",
            left: "490px",
            top: "203px",
            width: "1400px",
            height: "683px",
            border: "3px",
          }}
        >
          <br />
          <form onSubmit={this.onSubmit.bind(this)}>
            <b style={{ fontSize: "17pt", marginTop: "-30px" }}>팀 검색</b>
            <input
              type="text"
              ref="keyword"
              style={{ width: "300px", height: "35px", marginLeft: "30px" }}
            />
            <button
              type="submit"
              style={{
                height: "35px",
                marginLeft: "30px",
                width: "100px",
                fontSize: "13pt",
              }}
            >
              검색하기
            </button>
          </form>
          <br />
          <br />
          <table
            className="team1"
            style={{
              height: "500px",
              border: "1px solid rgba(0,0,0,.1)",
              fontSize: "13pt",
            }}
          >
            <thead
              textAlign="center"
              verticalAlign="middle"
              style={{
                backgroundColor: "#503396",
                color: "white",
                fontSize: "13pt",
                border: "1px solid white",
              }}
            >
              <tr align="center">
                <td
                  style={{ height: "100px", border: "1px solid white" }}
                  rowSpan="2"
                  width="350px"
                >
                  팀 명
                </td>
                <td
                  colSpan="4"
                  style={{ width: "400px", border: "1px solid white" }}
                >
                  전 적
                </td>
                <td
                  rowSpan="2"
                  style={{ width: "200px", border: "1px solid white" }}
                >
                  연 고
                </td>
                <td
                  rowSpan="2"
                  style={{ width: "200px", border: "1px solid white" }}
                >
                  연령대
                </td>
                <td
                  rowSpan="2"
                  style={{ width: "150px", border: "1px solid white" }}
                >
                  가입신청
                </td>
              </tr>
              <tr align="center">
                <td style={{ width: "100px", border: "1px solid white" }}>
                  경기
                </td>
                <td style={{ width: "100px", border: "1px solid white" }}>
                  승
                </td>
                <td style={{ width: "100px", border: "1px solid white" }}>
                  무
                </td>
                <td style={{ width: "100px", border: "1px solid white" }}>
                  패
                </td>
              </tr>
            </thead>
            <tbody align="center"></tbody>
            {this.state.teamData.map((row) => (
              <TeamItem row={row} key={row.team_num} />
            ))}
          </table>
          <br />

          <nav
            aria-label="Page navigation"
            style={{ position: "absolute", left: "550px" }}
          >
            <ul className="pagination" style={{ fontSize: "13pt" }}>
              <li title="이전 페이지보기" className="page-item">
                <button
                  type="button"
                  className="page-link"
                  style={{ color: "white" }}
                  onClick={this.onClickPre}
                >
                  ◀
                </button>
              </li>
              {p}
              <li title="이후 페이지 보기" className="page-item">
                <button
                  type="button"
                  className="page-link"
                  style={{ color: "white" }}
                  onClick={this.onClickNext}
                >
                  ▶
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

const props = {};

//   ReactDOM.render(<Team {...props} />, document.getElementById('main'))

export default Team;
