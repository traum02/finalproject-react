import React, { Component } from "react";
import "../Css/MainStyle.css";
import { NavLink } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import MyPageSidebar from "./MyPageSidebar";
import Axios from "axios";
import MypageResItem from "./MypageResItem";

class Mypage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberData: [],
      myRes: [],
      pageNum: 1,
      startNum: 1,
      totalRes: 0,
      searchType: "",
      fromDate: "",
      untilDate: "",
    };
  }
  getMyRes = () => {
    const url = "http://localhost:9000/matchplay/myres?member_id=";
    // const url = "http://192.168.0.108:9000/matchplay/myres?member_id=";

    Axios.get(
      url +
        window.sessionStorage.getItem("id") +
        "&pageNum=" +
        1 +
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
    this.getMemberData();
    this.getMyRes();
  }

  render() {
    return (
      <div>
        <div>
          <MyPageSidebar></MyPageSidebar>
          <div
            style={{
              width: "1200px",
              height: "125px",
              border: "5px",
              position: "absolute",
              left: "500px",
              backgroundColor: "#503396",
              marginTop: "15px",
            }}
          >
            <table style={{ marginTop: "15px", marginLeft: "20px" }}>
              <tbody>
                <tr>
                  <td>
                    <span style={{ fontSize: "18pt", color: "white" }}>
                      안녕하세요 {this.state.memberData.name}님😄
                    </span>
                    <br />
                  </td>
                </tr>
                <tr>
                  <td height="60px">
                    <b
                      style={{
                        fontSize: "20pt",
                        color: "white",
                        textDecorationLine: "underline",
                        textDecorationColor: "yellow",
                        textUnderlinePosition: "under",
                      }}
                    >
                      현재 잔여 포인트 : {this.state.memberData.point}Point
                    </b>
                    <NavLink
                      exact
                      to="/Mypage/PointCharge"
                      style={{ textDecoration: "none", marginLeft: "500px" }}
                    >
                      <button
                        type="button"
                        style={{
                          backgroundColor: "black",
                          border: "0.1px solid white",
                          borderRadius: "10px",
                          width: "100px",
                          height: "40px",
                          color: "white",
                          fontSize: "13pt",
                        }}
                      >
                        충전하기
                      </button>
                    </NavLink>
                    <NavLink
                      exact
                      to="/Mypage/PointHistory"
                      style={{
                        textDecoration: "none",
                        color: "blue",
                        fontSize: "13pt",
                        marginLeft: "30px",
                      }}
                    >
                      <button
                        type="button"
                        style={{
                          backgroundColor: "black",
                          border: "0.1px solid white",
                          borderRadius: "10px",
                          width: "100px",
                          height: "40px",
                          color: "white",
                          fontSize: "13pt",
                        }}
                      >
                        내역보기
                      </button>
                    </NavLink>
                  </td>
                </tr>
                {/* <tr>
                        <td style={{border:'1px solid gray',width:'1200px',height:'300px'}}>
                            <span style={{fontSize:'15pt'}}>최근 나의 경기</span>
                            <NavLink exact to="/Mypage/MyMatchHistory" style={{ textDecoration: 'none',color:'blue',fontSize:'15pt',marginLeft:'920px'}}>
                                자세히 보기
                            </NavLink><br/>
                        </td>
                    </tr> */}
              </tbody>
            </table>
            {/* <hr/> */}
          </div>
          <div
            style={{
              width: "1200px",
              height: "200px",
              border: "5px",
              position: "absolute",
              left: "500px",
              top: "355px",
            }}
          >
            <b style={{ fontSize: "15pt" }}>최근 나의 경기</b>
            <NavLink
              exact
              to="/Mypage/MyMatchHistory"
              style={{
                textDecoration: "none",
                color: "blue",
                fontSize: "13pt",
                marginLeft: "30px",
              }}
            >
              자세히 보기
            </NavLink>
            <br />
            <br />
            <table
              className="MyMatch"
              style={{ width: "1200px", fontSize: "13pt" }}
            >
              <thead align="center">
                <tr
                  style={{
                    backgroundColor: "#503396",
                    color: "white",
                    height: "40px",
                  }}
                >
                  <td width="150px">경기종류</td>
                  <td width="130px">날짜</td>
                  <td width="80px">분류</td>
                  <td colSpan="2">결과</td>
                  <td>구장</td>
                  <td>위치</td>
                </tr>
              </thead>
              <tbody align="center">
                {this.state.myRes.map((item, idx) =>
                  idx < 4 ? (
                    <MypageResItem row={item} key={idx}></MypageResItem>
                  ) : (
                    ""
                  )
                )}
              </tbody>
            </table>
            <br />
            {/* <hr style={{marginTop:'5px'}}/> */}
          </div>
          <div
            style={{
              width: "1210px",
              height: "200px",
              border: "5px",
              position: "absolute",
              left: "500px",
              top: "620px",
            }}
          >
            <b style={{ fontSize: "15pt" }}>최근 문의 내역</b>
            <NavLink
              exact
              to="/QnA"
              style={{
                textDecoration: "none",
                color: "blue",
                fontSize: "13pt",
                marginLeft: "30px",
              }}
            >
              자세히 보기
            </NavLink>
            <br />
            <br />
            <table
              className="MyMatch"
              style={{ width: "1200px", fontSize: "13pt" }}
            >
              <thead align="center">
                <tr
                  style={{
                    backgroundColor: "#503396",
                    color: "white",
                    height: "40px",
                  }}
                >
                  <td width="130px">문의유형</td>
                  <td width="130px">작성일</td>
                  <td width="350px">제목</td>
                  <td width="130px">답변유무</td>
                  <td width="130px">답변날짜</td>
                </tr>
              </thead>
              <tbody align="center">
                <tr>
                  <td>예약문의</td>
                  <td>20-06-10</td>
                  <td>예약이 실패했는데 확인 부탁드려요~</td>
                  <td>문의확인</td>
                  <td>문의확인</td>
                </tr>
                <tr>
                  <td>매니저문의</td>
                  <td>20-06-09</td>
                  <td>1명이 부족한데 매니저님 포함해서 신청가능한가요?</td>
                  <td>답변완료</td>
                  <td>20-06-10</td>
                </tr>
                <tr>
                  <td>매칭문의</td>
                  <td>20-06-08</td>
                  <td>팀전은 개인은 신청 못하나요?</td>
                  <td>답변완료</td>
                  <td>20-06-09</td>
                </tr>
                <tr>
                  <td>팀생성문의</td>
                  <td>20-06-08</td>
                  <td>팀 로고는 제작 요청이 가능한가요?</td>
                  <td>답변완료</td>
                  <td>20-06-08</td>
                </tr>
                {/* <tr>
                        <td>예약문의</td>
                        <td>20-06-05</td>
                        <td>예약 취소 좀요</td>
                        <td>답변완료</td>
                        <td>20-06-05</td>
                    </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Mypage;
