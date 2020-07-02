import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../Css/MainStyle.css";
import axios from "axios";

class TeamMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myteamnum: -1,

      // 등급
      grade: "",

      start: 0,
    };
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

        // this.props.Onlist();
      })
      .catch((err) => {
        console.log("팀 넘버 구하기 에러" + err);
      });
  };

  //현재 접속자의 권한 구하기

  getGrade = () => {
    const url =
      "http://localhost:9000/matchplay/teammember/teammaster?member_id=";

    axios
      .get(url + window.sessionStorage.getItem("id"))
      .then((res) => {
        this.setState({
          grade: res.data,
        });
        console.log("본인의 등급은? ===" + this.state.grade);
        // this.props.Onlist();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentWillMount() {
    this.getMyTeamNum();
    this.getGrade();
  }

  notMaster = () => {
    alert("팀장만 접속 할 수 있는 페이지 입니다");
  };

  render() {
    let myteamnum = this.state.myteamnum;

    return (
      <div
        style={{
          position: "absolute",
          width: "230px",
          height: "683px",
          backgroundColor: "#503396",
          border: "3px",
        }}
      >
        <table
          style={{
            width: "300px",
            height: "550px",
            fontSize: "20pt",
            border: "2px",
            marginTop: "62px",
            marginLeft: "20px",
          }}
          className="TemaMenu"
        >
          <tbody>
            <tr>
              <td align="center" width="200px">
                <NavLink
                  exact
                  to={"/Team/TeamHome/" + myteamnum}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <button
                    type="button"
                    name="Hover"
                    className="button-container-2"
                    style={{
                      width: "250px",
                      height: "80px",
                      backgroundColor: "black",
                      border: "2px solid white",
                      borderRadius: "20px",
                      boxShadow: "3px 3px 3px 0px gray",
                    }}
                  >
                    Team Main
                  </button>
                </NavLink>
              </td>
            </tr>
            <tr>
              <td align="center">
                <NavLink
                  exact
                  to={"/Team/TeamHome/TeamMember/" + myteamnum}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <button
                    type="button"
                    style={{
                      width: "250px",
                      height: "80px",
                      backgroundColor: "black",
                      border: "2px solid white",
                      borderRadius: "20px",
                      boxShadow: "3px 3px 3px 0px gray",
                    }}
                  >
                    TeamMember
                  </button>
                </NavLink>
              </td>
            </tr>
            <tr>
              <td align="center">
                <NavLink
                  exact
                  to={"/Team/TeamHome/MatchHistory/" + myteamnum}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <button
                    type="button"
                    style={{
                      width: "250px",
                      height: "80px",
                      backgroundColor: "black",
                      border: "2px solid white",
                      borderRadius: "20px",
                      boxShadow: "3px 3px 3px 0px gray",
                    }}
                  >
                    MatchHistory
                  </button>
                </NavLink>
              </td>
            </tr>
            <tr>
              <td align="center">
                <NavLink
                  exact
                  to={
                    "/Team/TeamHome/TeamBoard/list/" +
                    myteamnum +
                    "&start/" +
                    this.state.start
                  }
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <button
                    type="button"
                    style={{
                      width: "250px",
                      height: "80px",
                      backgroundColor: "black",
                      border: "2px solid white",
                      borderRadius: "20px",
                      boxShadow: "3px 3px 3px 0px gray",
                    }}
                  >
                    TeamBoard
                  </button>
                </NavLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default TeamMenu;
