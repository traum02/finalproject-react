import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../Css/MainStyle.css";
import img from "../image/check-icon.png";
import axios from "axios";

class TCSuccess extends Component {
  constructor() {
    super();
    this.state = {
      //나의 팀 넘버
      myteamnum: -1,

      member_id: "",

      creator: "",

      team_num: "",
    };
  }
  //소속된 팀 num 구하기
  getCreator = () => {
    const url = "http://localhost:9000/matchplay/team/creatornum?creator=";

    axios
      .get(url + window.sessionStorage.getItem("id"))
      .then((res) => {
        console.log("1:" + res.data);
        this.setState({
          creator: res.data,
          myteamnum: res.data,
        });
        console.log("창단자의 팀넘버===" + this.state.creator);
        // this.props.Onlist();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //추가
  onMasterInsert = () => {
    // console.log("값 들어오는거 확인"+member_id,tboard_title,tboard_content)
    let url =
      "http://localhost:9000/matchplay/teammember/createmaster?member_id=" +
      window.sessionStorage.getItem("id") +
      "&team_num=" +
      this.state.creator;
    console.log("유알엘" + url);
    axios
      .get(url)
      .then((res) => {
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log("추가부분 에러" + error);
      });
  };

  setInt = () => {
    let url =
      "http://localhost:9000/matchplay/member/createsetint?team_int=" +
      this.state.myteamnum +
      "&id=" +
      window.sessionStorage.getItem("id");
    axios
      .get(url)
      .then((res) => {})
      .catch((err) => {
        console.log("셋인트 오류" + err);
      });
  };

  componentWillMount() {
    this.getCreator();
    setTimeout(() => {
      this.setInt();
    }, 200);
  }

  render() {
    return (
      <div>
        <div align="center">
          <div style={{ marginTop: "100px" }}>
            <img src={img} alt="" style={{ width: "250px" }} />
            <br />
            <b style={{ fontSize: "35pt" }}>팀 생성이 완료 되었습니다.</b>
            <br />
            <span style={{ fontSize: "20pt" }}>
              팀 페이지에서 바로 확인가능합니다.
            </span>
            <br />
            {/* <NavLink to="/Team/"style={{ textDecoration: 'none',fontSize:'15pt' }}> */}
            <button
              onClick={this.onMasterInsert.bind(this)}
              style={{
                marginTop: "30px",
                width: "300px",
                height: "40px",
                backgroundColor: "black",
                border: "1px solid #503396",
                color: "white",
                outline: "none",
                borderRadius: "10px",
                fontSize:'15pt'
              }}
            >
              홈으로 바로가기
            </button>
            {/* </NavLink>  */}
          </div>
        </div>
      </div>
    );
  }
}

export default TCSuccess;
