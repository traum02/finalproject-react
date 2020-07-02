import React, { Component, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Xicon from "../image/x-img.png";
import Gaip from "../image/gaip.png";

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

class TeamItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectData: [],
      showModal: false,

      myteamnum: -1,

      team_num: "",
      //가입신청용
      member_id: "7", //팀멤버 테이블과 조인한 member 테이블의 primary key.
      // team_num:"",
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
        // this.props.Onlist();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //team_num 을 통해 값 가져오기. 로고 출력 위함
  onSelctData = () => {
    let url =
      "http://localhost:9000/matchplay/team/select?team_num=" +
      this.props.row.team_num;
    axios
      .get(url)
      .then((res) => {
        this.setState({
          selectData: res.data,
        });
      })
      .catch((err) => {
        console.log("select 에러:" + err);
      });
  };

  componentWillMount() {
    this.onSelctData();
    this.getMyTeamNum();
    setTimeout(() => {
      this.getResultCount();
    }, 50);
  }
  //가입신청을 누를 시
  handleOpenModal() {
    if (this.state.myteamnum != -1) {
      alert("이미 팀이 있습니다");
      return false;
    } else {
      this.setState({ showModal: true });

      let url = "http://localhost:9000/matchplay/teammember/join?=member_id";
      //   let joinData = this.state;
      axios
        .post(url, {
          member_id: window.sessionStorage.getItem("id"),
          team_num: this.props.row.team_num,
        })
        .then((res) => {
          //   this.props.history.push("/Team/TeamHome/TeamBoard/list/:team_num")
        })
        .catch((error) => {
          console.log("추가부분 에러" + error);
        });
    }
  }
  getResultCount = () => {
    let url =
      "http://localhost:9000/matchplay/team/resultcount?team_num=" +
      this.props.row.team_num;
    axios
      .get(url)
      .then((res) => {
        this.setState(
          {
            teamWin: res.data[0],
            teamDraw: res.data[1],
            teamLose: res.data[2],
          },
          () => console.log(this.props.row.team_num, this.state.teamWin)
        );
      })
      .catch((err) => {
        console.log("팀장구하기 에러" + err);
      });
  };

  handleCloseModal() {
    this.setState({ showModal: false });
    window.location.reload();
  }

  render() {
    let tdata = this.state.selectData;
    const url = "http://localhost:9000/matchplay/teamimage/";
    let total = tdata.team_win + tdata.team_lose + tdata.team_draw;

    return (
      <tr>
        <input type="hidden" value={this.props.row.team_num}></input>
        {/* <td style={{width:"60px", border:"solid"}}>
            <img src={url + tdata.team_photo} alt="" style={{maxWidth:"50px",maxHeight:"50px"}}/>
            </td> */}
        <td>
          <img
            src={url + tdata.team_photo}
            alt=""
            style={{ width: "30px", height: "30px" }}
          />
          &nbsp;&nbsp;
          {this.props.row.team_name}
        </td>
        <td>
          {this.state.teamWin + this.state.teamDraw + this.state.teamLose}
        </td>
        <td>{this.state.teamWin}</td>

        <td>{this.state.teamDraw}</td>
        <td>{this.state.teamLose}</td>
        <td>{this.props.row.team_area}</td>
        <td>{this.props.row.team_age}</td>
        <td>
          <button onClick={this.handleOpenModal}>가입신청</button>
        </td>
        <Modal
          // className="modal"
          isOpen={this.state.showModal}
          style={customStyles}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={true}
          overlayClassName="modal1"
        >
          <br />
          <img src={Gaip} alt="" style={{ width: "150px" }} />
          <br />
          <br />
          <b style={{ fontSize: "18pt", border: "2px", color: "#503396" }}>
            가입신청이 완료되었습니다.
          </b>
          <br />
          <br />
          <button
            type="button"
            onClick={this.handleCloseModal}
            style={{
              width: "150px",
              height: "40px",
              backgroundColor: "#503396",
              border: "1px solid #503396",
              color: "white",
              outline: "none",
              borderRadius: "10px",
            }}
          >
            확인
          </button>
        </Modal>
      </tr>
    );
  }
}

export default TeamItem;
