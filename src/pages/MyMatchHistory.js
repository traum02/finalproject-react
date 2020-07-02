import React, { Component } from "react";
import Axios from "axios";
import MyMatchItem from "./MyMatchItem";
import pageNext from "../image/pageNext.png";
import { NavLink } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";
import MyPageSidebar from "./MyPageSidebar";

class MyMatchHistory extends Component {
  state = {
    myRes: [],
    pageNum: 1,
    startNum: 1,
    totalRes: 0,
    searchType: "",
    fromDate: "",
    untilDate: "",
    memberData: [],
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
        this.state.untilDate +
        "&resStatus=N"
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
        this.state.untilDate +
        "&resStatus=N"
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
  componentDidMount() {
    this.getMemberData();
    this.getMyRes();
    this.getTotalOfMyRes();
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
        <div align="center">
          <div
            style={{
              fontSize: "15pt",
              // width: "1000px",
              backgroundColor: "#503396",
              color: "white",
              paddingLeft: "30px",
              height: "40px",
              lineHeight: "40px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              width: "1200px",
              position: "absolute",
              top: "240px",
              left: "500px",
            }}
            align="left"
          >
            <b style={{ fontSize: "20pt" }}>
              {window.sessionStorage.getItem("id")}
            </b>
            님의 경기 내역
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
                right: "25%",
                top: "24%",
                border: "none",
                backgroundColor: "#503396",
                color: "white",
                fontSize: "11pt",
                borderRadius: "5px",
                height: "30px",
                lineHeight: "30px",
              }}
              onClick={this.reload.bind(this)}
            >
              전체일정
            </button>
          </div>
          <Scrollbars
            className="ReScroll"
            style={{
              width: "1200px",
              height: "551px",
              position: "absolute",
              top: "280px",
              left: "500px",
            }}
          >
            <table style={{ width: "1200px" }}>
              {/* <thead>
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
            </thead> */}
              <tbody
                align="center"
                style={{
                  height: "50px",
                  // fontWeight: "bold",
                  fontSize: "11pt",
                }}
              >
                {this.state.myRes.length === 0 ? (
                  <div
                    style={{
                      padding: "200px",
                      fontSize: "13pt",
                      fontWeight: "bold",
                    }}
                  >
                    경기 내역이 없습니다.
                  </div>
                ) : (
                  this.state.myRes.map((row, idx) => (
                    <MyMatchItem
                      row={row}
                      memberData={this.state.memberData}
                    ></MyMatchItem>
                  ))
                )}
              </tbody>
            </table>
          </Scrollbars>
          <div>
            <tr>
              <td colSpan="8">
                <div
                  style={{
                    fontSize: "15pt",
                    // width: "1000px",
                    backgroundColor: "#503396",
                    color: "white",
                    paddingLeft: "30px",
                    height: "40px",
                    lineHeight: "40px",
                    borderBottomRightRadius: "15px",
                    borderBottomLeftRadius: "15px",
                    width: "1200px",
                    position: "absolute",
                    top: "831px",
                    left: "500px",
                  }}
                  // style={{
                  //   paddingTop: "15px",
                  //   paddingBottom: "15px",
                  //   backgroundColor: "#503396",
                  //   width: "1000px",
                  // }}
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
                        marginTop: "5px",
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
                        marginTop: "5px",
                      }}
                      alt=""
                    ></img>
                  </div>
                </div>
              </td>
            </tr>
          </div>
        </div>
      </div>
    );
  }
}

export default MyMatchHistory;
