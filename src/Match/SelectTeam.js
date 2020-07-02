import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../Css/Reservation.css";
import User from "../image/user.png";
import Users from "../image/users.png";
import logo2 from "../image/logo2.png";
import Axios from "axios";

class SelectTeam extends Component {
  state = {
    memberData: [],
  };
  getMemberData = () => {
    // const url = "http://192.168.0.108:9000/matchplay/memberdata?id=";
    const url = "http://localhost:9000/matchplay/memberdata?id=";

    Axios.get(url + window.sessionStorage.getItem("id"))
      .then((res) => {
        this.setState({
          memberData: res.data,
        });
        console.log(this.state.memberData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.getMemberData();
  }
  render() {
    return (
      <div
        className="MatchDiv"
        align="center"
        style={{
          backgroundColor: "white",
          align: "center",
          margin: "0 auto",
          height: "580px",
        }}
      >
        <img src={logo2} className="logo2" alt="" />
        <div className="Match1" style={{ align: "center", margin: "0 auto" }}>
          {/* <NavLink to="/Match/Gujang">Match/Gujang</NavLink> */}
          <table
            style={{ align: "center", width: "1200px", marginTop: "120px" }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    width: "400px",
                    align: "center",
                    textAlign: "center",
                  }}
                >
                  {window.sessionStorage.getItem("id") == null ? (
                    <div>
                      <button
                        type="button"
                        className="MatchButton"
                        style={{ width: "370px", height: "370px" }}
                        onClick={() => alert("로그인이 필요한 메뉴입니다.")}
                      >
                        <img
                          src={User}
                          alt=""
                          className="User"
                          style={{ display: "block", margin: "0px auto" }}
                        />
                      </button>
                      <b
                        style={{
                          textAlign: "center",
                          display: "block",
                          margin: "0px auto",
                          fontSize: "35pt",
                          color: "black",
                        }}
                      >
                        개인전
                      </b>
                    </div>
                  ) : (
                    <NavLink
                      to={{ pathname: "/SelectPlace/0" }}
                      style={{ textDecoration: "none" }}
                    >
                      <button
                        type="button"
                        className="MatchButton"
                        style={{ width: "370px", height: "370px" }}
                      >
                        <img
                          src={User}
                          alt=""
                          className="User"
                          style={{ display: "block", margin: "0px auto" }}
                        />
                      </button>
                      <b
                        style={{
                          textAlign: "center",
                          display: "block",
                          margin: "0px auto",
                          fontSize: "35pt",
                          color: "black",
                        }}
                      >
                        개인전
                      </b>
                    </NavLink>
                  )}
                </td>
                <td
                  style={{
                    width: "400px",
                    align: "center",
                    textAlign: "center",
                  }}
                >
                  {this.state.memberData.team_int === 0 ||
                  window.sessionStorage.getItem("id") == null ? (
                    <div>
                      <button
                        type="button"
                        className="MatchButton"
                        style={{ width: "370px", height: "370px" }}
                        onClick={() =>
                          alert(
                            this.state.memberData.team_int === 0
                              ? "팀에 소속된 인원만 참가 가능합니다."
                              : "로그인이 필요한 메뉴입니다."
                          )
                        }
                      >
                        <img
                          src={Users}
                          alt=""
                          className="Users"
                          style={{ display: "block", margin: "0px auto" }}
                        />
                      </button>
                      <b
                        style={{
                          textAlign: "center",
                          display: "block",
                          fontSize: "35pt",
                          color: "black",
                        }}
                      >
                        팀전
                      </b>
                    </div>
                  ) : (
                    <NavLink
                      to={{ pathname: "/SelectPlace/1" }}
                      style={{ textDecoration: "none" }}
                    >
                      <button
                        type="button"
                        className="MatchButton"
                        style={{ width: "370px", height: "370px" }}
                      >
                        <img
                          src={Users}
                          alt=""
                          className="Users"
                          style={{ display: "block", margin: "0px auto" }}
                        />
                      </button>
                      <b
                        style={{
                          textAlign: "center",
                          display: "block",
                          fontSize: "35pt",
                          color: "black",
                        }}
                      >
                        팀전
                      </b>
                    </NavLink>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default SelectTeam;
