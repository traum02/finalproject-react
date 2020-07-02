import React, { Component } from "react";
import img from "../image/x-img.png";
import Modal from "react-modal";
import Axios from "axios";

class MyResItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
  }

  setModalIsOpen = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  updateRes = () => {
    const url = "http://localhost:9000/matchplay/manage/updateres";
    // const url = "http://192.168.0.108:9000/matchplay/manage/updateres";

    Axios.post(url, {
      res_id: this.props.row.res_id,
      res_team1goal: this.state.res_team1goal,
      res_team2goal: this.state.res_team2goal,
      res_type: this.props.row.res_type,
      home_member_id: this.props.row.home_member_id,
      away_member_id: this.props.row.away_member_id,
    })
      .then(() => {})
      .catch((err) => {
        alert(err);
      });
  };
  render() {
    let team = "";
    if (
      this.props.row.home_member_id.includes(
        window.sessionStorage.getItem("id")
      )
    ) {
      team = "Home";
    } else {
      team = "Away";
    }
    let resStatus = "";
    if (
      ((this.props.row.place_max -
        this.props.row.res_team1 -
        this.props.row.res_team2 !==
        0 &&
        this.props.row.res_type === "0") ||
        (this.props.row.res_type === "1" &&
          (this.props.row.res_team1 == 0 || this.props.row.res_team2 == 0))) &&
      new Date() >
        new Date(
          this.props.row.res_time.substring(0, 4),
          this.props.row.res_time.substring(5, 7) - 1,
          this.props.row.res_time.substring(8, 10),
          this.props.row.time_val.substring(0, 2)
        )
    ) {
      resStatus = "예약실패";
      // } else if (this.props.row.res_status !== "Y") {
      //   resStatus = "예약완료";
    } else {
      resStatus = "예약완료";
    }
    let resResult = "";
    if (this.props.row.res_status === "Y") {
      resResult =
        this.props.row.res_team1goal + " : " + this.props.row.res_team2goal;
    } else if (resStatus === "예약실패") {
      resResult = "매칭실패";
    } else {
      if (
        new Date() <
        new Date(
          this.props.row.res_time.substring(0, 4),
          this.props.row.res_time.substring(5, 7) - 1,
          this.props.row.res_time.substring(8, 10),
          this.props.row.time_val.substring(0, 2)
        )
      ) {
        resResult = "경기예정";
      } else {
        resResult = "정산중";
      }
    }

    return (
      <tr style={{ borderBottom: "1px solid gray", height: "45px" }}>
        <td>
          {this.props.row.res_etc != null ? "리그" : "친선"}({team})
        </td>
        <td>{this.props.row.res_type === "0" ? "개인" : "팀"}</td>
        <td>{this.props.row.res_time}</td>
        <td>
          {this.props.row.time_val.substring(0, 2) +
            "시~" +
            this.props.row.time_val.substring(2, 4) +
            "시"}
        </td>
        <td>{this.props.row.place_name}</td>
        <td>{this.props.row.place_addr}</td>
        {/* <td>{resStatus}</td> */}
        {/* <td>{this.props.row.res_date}</td> */}
        <td>{resResult}</td>
        <td>
          {/* <NavLink to={"/MngRes"}> */}
          {resResult === "정산중" && (
            <button
              style={{
                border: "none",
                backgroundColor: "#503396",
                color: "white",
                fontSize: "11pt",
                borderRadius: "5px",
                height: "30px",
                lineHeight: "30px",
              }}
              onClick={
                resResult === "정산중" ? this.setModalIsOpen.bind(this) : ""
              }
            >
              점수입력
            </button>
          )}
          {/* </NavLink> */}
        </td>
        <Modal isOpen={this.state.modalIsOpen}>
          <div align="center">
            <p style={{ fontSize: "18pt", fontWeight: "bold" }}>결과 입력</p>
            <button className="x" onClick={() => this.setModalIsOpen()}>
              <img classNmame="img" src={img} alt="" />
            </button>
            <hr></hr>
          </div>
          <div style={{ marginTop: "20px", padding: "20px" }}>
            <div style={{ fontSize: "15pt", fontWeight: "bold" }}>
              {this.props.row.res_type === "0" ? "개인" : "팀"}
              {this.props.row.res_etc != null ? "리그" : "친선"}경기
              <br></br>
              {this.props.row.place_name}
            </div>
            <div style={{ fontSize: "12pt" }}>
              {this.props.row.res_time}{" "}
              {this.props.row.time_val.substring(0, 2) +
                "시~" +
                this.props.row.time_val.substring(2, 4) +
                "시"}
            </div>
            <hr></hr>
          </div>
          <div style={{ marginTop: "30px" }}>
            <form
              align="center"
              className="txt7"
              onSubmit={this.updateRes.bind(this)}
            >
              <input
                type="hidden"
                value={this.props.row.res_id}
                name="res_id"
              ></input>
              <input
                type="hidden"
                value={this.props.row.res_etc}
                name="res_etc"
              ></input>
              <input
                type="hidden"
                value={this.props.row.home_member_id}
                name="home_member_id"
              ></input>
              <input
                type="hidden"
                value={this.props.row.away_member_id}
                name="away_member_id"
              ></input>
              <span>Home Score</span>
              <input
                type="text"
                name="res_team1goal"
                placeholder="홈팀"
                style={{
                  width: "100px",
                  height: "40px",
                  border: "none",
                  borderBottom: "1px solid #503396",
                  marginLeft: "10px",
                  textAlign: "center",
                }}
                onChange={this.onChange.bind(this)}
              ></input>
              <br></br>
              <br></br>
              <span>Away Score</span>
              <input
                type="text"
                style={{
                  width: "100px",
                  height: "40px",
                  border: "none",
                  marginLeft: "10px",
                  marginBottom: "50px",
                  borderBottom: "1px solid #503396",
                  textAlign: "center",
                }}
                name="res_team2goal"
                placeholder="원정팀"
                onChange={this.onChange.bind(this)}
              ></input>
              <br />
              <hr></hr>
              <div align="center">
                <button
                  type="submit"
                  style={{
                    width: "95%",
                    marginTop: "20px",
                    border: "none",
                    backgroundColor: "#503396",
                    color: "white",
                    fontSize: "11pt",
                    borderRadius: "5px",
                    height: "40px",
                    lineHeight: "40px",
                  }}
                >
                  결과 입력
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </tr>
    );
  }
}

export default MyResItem;
