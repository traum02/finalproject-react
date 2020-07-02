import React, { Component } from "react";
import Axios from "axios";
import MyResItem from "./MyResItem";
import pageNext from "../image/pageNext.png";
import { NavLink } from "react-router-dom";
import MyPageSidebar from "./MyPageSidebar";

class MyRes extends Component {
  state = {
    myRes: [],
    memberData: [],
    pageNum: 1,
    startNum: 1,
    totalRes: 0,
    searchType: "",
    fromDate: "",
    untilDate: "",
  };

  nextPage = (e) => {
    this.setState(
      {
        pageNum:
          this.state.totalRes / 10 + 1 > 5
            ? this.state.pageNum + 5
            : this.state.pageNum,
        startNum:
          this.state.totalRes / 10 + 1 > 5
            ? this.state.startNum + 5
            : this.state.startNum,
      },
      () => this.getMyRes()
    );
  };
  prevPage = (e) => {
    this.setState(
      {
        pageNum:
          this.state.pageNum <= 5 ? this.state.pageNum : this.state.pageNum - 5,
        startNum:
          this.state.startNum <= 5
            ? this.state.startNum
            : this.state.startNum - 5,
      },
      () => this.getMyRes()
    );
  };

  getTotalOfMyRes = () => {
    const url = "http://localhost:9000/matchplay/totalmyres?member_id=";
    // const url = "http://192.168.0.108:9000/matchplay/totalmyres?member_id=";

    Axios.get(
      url +
        window.sessionStorage.getItem("id") +
        "&res_type=" +
        this.state.searchType +
        "&fromDate=" +
        this.state.fromDate +
        "&untilDate=" +
        this.state.untilDate
    )
      .then((res) => {
        this.setState({
          totalRes: res.data,
        });
        console.log(this.state.myRes);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
        pageNum: 1,
      },
      () => {
        this.getTotalOfMyRes();
        this.getMyRes();
      }
    );
  };
  reload = () => {
    window.location.reload();
  };

  getMyRes = () => {
    const url = "http://localhost:9000/matchplay/myres?member_id=";
    // const url = "http://192.168.0.108:9000/matchplay/myres?member_id=";

    Axios.get(
      url +
        window.sessionStorage.getItem("id") +
        "&pageNum=" +
        this.state.pageNum +
        "&res_type=" +
        this.state.searchType +
        "&fromDate=" +
        this.state.fromDate +
        "&untilDate=" +
        this.state.untilDate
    )
      .then((res) => {
        this.setState({
          myRes: res.data,
        });
        console.log(this.state.myRes);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  clickPage = (e) => {
    this.setState(
      {
        pageNum: e.currentTarget.textContent,
      },
      () => this.getMyRes()
    );
    for (
      let index = 0;
      index < document.querySelectorAll(".selected").length;
      index++
    ) {
      document.querySelector(".selected").style.color = "gray";
      document.querySelector(".selected").classList.remove("selected");
    }
    // console.log(document.querySelectorAll(".selected"));
    e.currentTarget.classList.add("selected");
    e.currentTarget.style.color = "white";
  };
  getMemberData = () => {
    // const url = "http://192.168.0.108:9000/matchplay/memberdata?id=";
    const url = "http://localhost:9000/matchplay/memberdata?id=";

    Axios.get(url + window.sessionStorage.getItem("id"))
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

  componentDidMount() {
    this.getMyRes();
    this.getTotalOfMyRes();
    this.getMemberData();
  }
  render() {
    const page = [];
    for (
      let i = this.state.startNum;
      i <
      (this.state.totalRes / 10 + 1 > this.state.startNum + 4
        ? this.state.startNum + 4
        : this.state.totalRes / 10 + 1);
      i++
    ) {
      page.push(
        <div
          className="page"
          style={{
            display: "inline-block",
            // border: "1px solid #503396",
            height: "30px",
            width: "30px",
            lineHeight: "30px",
            fontSize: "12pt",
            fontWeight: "bold",
            cursor: "pointer",
            color: "gray",
          }}
          onClick={this.clickPage.bind(this)}
        >
          {i}
        </div>
      );
    }
    return (
      <div>
        <MyPageSidebar></MyPageSidebar>
        <div
          align="center"
          style={{
            paddingTop: "20px",
            position: "absolute",
            top: "220px",
            left: "600px",
          }}
        >
          <div
            style={{
              fontSize: "15pt",
              width: "1000px",
              backgroundColor: "#503396",
              color: "white",
              paddingLeft: "30px",
              height: "40px",
              lineHeight: "40px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
            align="left"
          >
            <b style={{ fontSize: "20pt" }}>
              {window.sessionStorage.getItem("id")}
            </b>
            님의 예약 내역
            <select
              onChange={this.onChange.bind(this)}
              name="searchType"
              style={{
                backgroundColor: "#503396",
                fontSize: "11pt",
                marginLeft: "50px",
                border: "none",
                cursor: "pointer",
              }}
            >
              <option value="">전체</option>
              <option value="0">개인</option>
              <option value="1">팀</option>
              <option value="2">리그</option>
            </select>
            <input
              type="date"
              name="fromDate"
              onChange={this.onChange.bind(this)}
              style={{
                backgroundColor: "#503396",
                fontSize: "11pt",
                marginLeft: "20px",
                height: "25px",
                width: "150px",
                outline: "none",
                textAlign: "right",
                border: "none",
                borderBottom: "1px solid white",
              }}
            ></input>
            ~
            <input
              type="date"
              name="untilDate"
              onChange={this.onChange.bind(this)}
              style={{
                backgroundColor: "#503396",
                fontSize: "11pt",
                height: "25px",
                width: "150px",
                outline: "none",
                textAlign: "right",
                border: "none",
                borderBottom: "1px solid white",
              }}
            ></input>
            <button
              style={{
                // float: "right",
                position: "absolute",
                right: "23%",
                top: "30px",
                border: "none",
                backgroundColor: "#503396",
                color: "white",
                fontSize: "11pt",
                borderRadius: "5px",
                height: "30px",
                lineHeight: "30px",
                outline: "none",
              }}
              onClick={this.reload.bind(this)}
            >
              전체일정
            </button>
            {this.state.memberData.grade !== 0 && (
              <div
                style={{
                  position: "absolute",
                  right: "10%",
                  top: "30px",
                  height: "30px",
                  lineHeight: "30px",
                }}
              >
                <NavLink to={"/MngRes"}>
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "white",
                      color: "#503396",
                      fontSize: "11pt",
                      borderRadius: "5px",
                      height: "30px",
                      lineHeight: "30px",
                    }}
                  >
                    경기 관리
                  </button>
                </NavLink>
              </div>
            )}
          </div>
          <table style={{ width: "1000px" }}>
            <thead>
              <tr
                align="center"
                style={{
                  backgroundColor: "#503396",
                  color: "white",
                  height: "50px",
                  // fontWeight: "bold",
                  fontSize: "13pt",
                }}
              >
                <th style={{ width: "100px" }}>경기종류</th>
                <th style={{ width: "100px" }}>분류</th>
                <th style={{ width: "100px" }}>날짜</th>
                <th style={{ width: "100px" }}>예약 시간</th>
                <th style={{ width: "150px" }}>구장</th>
                <th>위치</th>
                <th style={{ width: "100px" }}>예약 현황</th>
                <th style={{ width: "100px" }}>경기 결과</th>
              </tr>
            </thead>
            <tbody
              align="center"
              style={{
                color: "gray",
                height: "50px",
                // fontWeight: "bold",
                fontSize: "11pt",
              }}
            >
              {this.state.myRes.length === 0 ? (
                <tr
                  style={{
                    padding: "200px",
                    fontSize: "13pt",
                    fontWeight: "bold",
                  }}
                >
                  <td colSpan="8" style={{ height: "200px" }}>
                    경기 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                this.state.myRes.map((row, idx) => (
                  <MyResItem row={row}></MyResItem>
                ))
              )}
              <tr>
                <td colSpan="8">
                  <div
                    style={{
                      paddingTop: "15px",
                      paddingBottom: "15px",
                      backgroundColor: "#503396",
                      width: "1000px",
                      borderBottomRightRadius: "15px",
                      borderBottomLeftRadius: "15px",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        height: "30px",
                        width: "30px",
                        lineHeight: "30px",
                        border: "1px solid #503396",
                        verticalAlign: "top",
                        cursor: "pointer",
                      }}
                      onClick={this.nextPage.bind(this)}
                    >
                      <img
                        src={pageNext}
                        style={{
                          height: "15px",
                          transform: "rotate(180deg)",
                          filter: "invert(100%)",
                          marginBottom: "5px",
                        }}
                        alt=""
                      ></img>
                    </div>
                    {page}
                    <div
                      style={{
                        display: "inline-block",
                        height: "30px",
                        width: "30px",
                        lineHeight: "30px",
                        border: "1px solid #503396",
                        verticalAlign: "top",
                        cursor: "pointer",
                      }}
                      onClick={this.nextPage.bind(this)}
                    >
                      <img
                        src={pageNext}
                        style={{
                          height: "15px",
                          filter: "invert(100%)",
                          marginBottom: "5px",
                        }}
                        alt=""
                      ></img>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default MyRes;
