import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Empty from "../image/img.png";
import "../Css/MainStyle.css";
import { Scrollbars } from "react-custom-scrollbars";
import ReactDOM from "react-dom";
import TeamMenu from "./TeamMenu";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-modal";

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
import "../Css/TeamCal.css"; //캘린더

class TeamHome extends Component {
  constructor({ match }) {
    super();
    //match 객체로부터 받은 team_num 을 멤버 변수에 저장
    this.team_num = match.params.team_num;
    this.state = {
      selectTeamData: "",
      events: [],
      date: "2020-06-22",

      //전체 팀 멤버
      member_count: "",

      //팀장 이름
      master: "",

      //나의 팀 넘버
      myteamnum: -1,

      //보낼 팀 넘버
      team_num: -1,

      //팀 소개글
      team_intro: "",

      //달력
      data: [],

      //이미지수정
      team_photo: "",
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  //소속된 팀 num 구하기
  getMyTeamNum = () => {
    const url =
      "http://localhost:9000/matchplay/teammember/myteamnum?member_id=";

    axios
      .get(url + window.sessionStorage.getItem("id"))
      .then((res) => {
        console.log("1:" + res.data);
        this.setState(
          {
            myteamnum: res.data,
          },
          () => console.log("내 팀넘버===" + this.state.myteamnum)
        );
        // this.props.Onlist();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //캘린더 출력용 일정 구하기
  getMyTeamRes = () => {
    const url = "http://localhost:9000/matchplay/team/myteamres?team_num=";

    axios
      .get(url + this.state.myteamnum)
      .then((res) => {
        console.log("1:" + res.data);
        this.setState(
          {
            data: res.data,
          },
          () => console.log(this.state.data)
        );
        // this.props.Onlist();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //team_num 을 통해 값 가져오기
  onSelctData = () => {
    let url =
      "http://localhost:9000/matchplay/teampage?team_num=" +
      this.state.myteamnum;
    axios
      .get(url)
      .then((res) => {
        this.setState({
          selectTeamData: res.data,
        });
      })
      .catch((err) => {
        console.log("select 에러:" + err);
      });
  };

  //전체 팀 멤버 인원 구하기
  onMemberCount = () => {
    let url =
      "http://localhost:9000/matchplay/teammember/count?team_num=" +
      this.state.myteamnum;
    axios
      .get(url)
      .then((res) => {
        this.setState({
          member_count: res.data,
        });
      })
      .catch((err) => {
        console.log("카운트 에러:" + err);
      });
  };

  //팀장 이름 구하기
  onMasterName = () => {
    let url =
      "http://localhost:9000/matchplay/teammember/master?team_num=" +
      this.state.myteamnum;
    axios
      .get(url)
      .then((res) => {
        this.setState({
          master: res.data.member_id,
        });
      })
      .catch((err) => {
        console.log("팀장구하기 에러" + err);
      });
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

  componentDidMount() {
    this.getMyTeamNum();
    setTimeout(() => {
      this.onMemberCount();
      this.onMasterName();

      console.log(this.state.myteamnum); // -1

      this.onSelctData();
      this.getResultCount();
      this.getMyTeamRes();
    }, 200);
  }

  //소개글 수정하기
  onTeamIntro = () => {
    let url = "http://localhost:9000/matchplay/team/update";

    axios
      .put(url, {
        team_intro: this.refs.team_intro.value,
        team_num: this.state.myteamnum,
      })
      .then((res) => {
        console.dir(
          "인트로내용" + this.state.team_intro + "팀넘버" + this.state.team_num
        );
        window.location.replace("/Team/TeamHome/" + this.state.myteamnum);
        //  this.setState({ showModal: false });
      })
      .catch((error) => {
        console.log("추가부분 에러" + error);
      });
  };

  //로고 수정하기
  changeLogo = () => {
    let url = "http://localhost:9000/matchplay/team/updatelogo";

    axios
      .put(url, {
        team_photo: this.state.team_photo,
        team_num: this.state.myteamnum,
      })
      .then((res) => {
        window.location.replace("/Team/TeamHome/" + this.state.myteamnum);
        //  this.setState({ showModal: false });
      })
      .catch((error) => {
        console.log("로고부분 에러" + error);
      });
  };

  //이미지 업로드
  uploadImage = (e) => {
    // e.preventDefault()
    const uploadFile = e.target.files[0];
    const team_photo = e.target.files[0].name;

    this.setState({
      //filename:filename // 양쪽 이름이 같을 경우 생략 가능
      team_photo,
    });

    //FormData 형식으로 만들기
    const teamFile = new FormData();
    teamFile.append("uploadFile", uploadFile);

    //console.log(tboard_photo)
    //   e.preventDefault();

    // reader.onloadend = () => {
    //     this.setState({previewurl:reader.result})
    // };
    // reader.readAsDataURL(uploadFile);

    axios({
      method: "post",
      url: "http://localhost:9000/matchplay/team/upload",
      data: teamFile,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log("업로드한 파일명:" + res.data);
        this.changeLogo();
      })
      .catch((err) => {
        console.log("업로드 오류:" + err);
      });
  };

  eventtt = () => {
    document.getElementById("file-input").click();
  };

  test = () => {
    console.log(this.refs.team_intro.value);
  };
  render() {
    let tdata = this.state.selectTeamData;
    const url = "http://localhost:9000/matchplay/image/";

    let tot = tdata.team_win + tdata.team_lose + tdata.team_draw;
    let avg = tot / 3;

    let myteamnum = this.state.myteamnum;
    let eventData = [];
    for (let i = 0; i < this.state.data.length; i++) {
      eventData.push({ title: "- 경기 -", date: this.state.data[i].res_time });
    }

    return (
      <div>
        <TeamMenu></TeamMenu>
        <Scrollbars
          className="scroll2"
          style={{
            width: "1210px",
            height: "680px",
            border: "5px solid yellow",
            left: "500px",
          }}
        >
          <div>
            <div
              style={{
                position: "absolute",
                top: "0px",
                backgroundColor: "#503396",
                width: "1200px",
              }}
            >
              <img
                src={Empty}
                alt=""
                onClick={this.eventtt.bind(this)}
                style={{ width: "250px" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: "0px",
                backgroundColor: "#503396",
                width: "1200px",
              }}
            >
              <img
                src={url + tdata.team_photo}
                alt=""
                onClick={this.eventtt.bind(this)}
                style={{
                  height: "230px",
                  width: "220px",
                  borderRadius: "100%",
                  marginTop: "10px",
                  marginLeft: "20px",
                  cursor: "pointer",
                }}
              />
            </div>
            <input
              id="file-input"
              type="file"
              name="name"
              style={{ display: "none" }}
              onChange={this.uploadImage.bind(this)}
            />

            <div
              style={{
                position: "absolute",
                left: "280px",
                top: "20px",
                backgroundColor: "#503396",
                width: "",
              }}
            >
              <b style={{ fontSize: "25pt", color: "white", marginLeft: "0" }}>
                {tdata.team_name}
              </b>
              <br />
              <b style={{ color: "white", marginLeft: "0" }}>
                팀 등록일 {tdata.team_date}
              </b>
              <br />
              <hr style={{ borderColor: "white" }} />
              <table
                className="THomeMain"
                style={{ width: "350px", color: "white", height: "120px" }}
              >
                <tbody>
                  <b style={{ marginLeft: "0" }}>팀 전적</b>
                  <tr style={{ border: "1px solid white" }}>
                    <td align="center" style={{ width: "60px" }}>
                      <b>총</b>
                    </td>
                    <td align="center" style={{ width: "60px" }}>
                      <b>승</b>
                    </td>
                    <td align="center" style={{ width: "60px" }}>
                      <b>패</b>
                    </td>
                    <td align="center" style={{ width: "60px" }}>
                      <b>무</b>
                    </td>
                    <td align="center" style={{ width: "70px" }}>
                      <b>승률</b>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <b>
                        {this.state.teamWin +
                          this.state.teamDraw +
                          this.state.teamLose}
                      </b>
                    </td>
                    <td align="center">
                      <b>{this.state.teamWin}</b>
                    </td>
                    <td align="center">
                      <b>{this.state.teamDraw}</b>
                    </td>
                    <td align="center">
                      <b>{this.state.teamLose}</b>
                    </td>
                    <td align="center">
                      <b>
                        {(this.state.teamWin /
                          (this.state.teamWin +
                            this.state.teamDraw +
                            this.state.teamLose)) *
                          100}
                        %
                      </b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ position: "absolute", left: "700px", top: "20px" }}>
              <b style={{ fontSize: "13pt", color: "white", marginLeft: "0" }}>
                팀 장
              </b>
              <b style={{ fontSize: "13pt", color: "white", marginLeft: "0" }}>
                {" "}
                / 현재 팀원 {this.state.member_count}명
              </b>
              <br />
              <b style={{ fontSize: "20pt", color: "white", marginLeft: "0" }}>
                {this.state.master}
              </b>
              {/* <b style={{fontSize:'13pt',color:'white',position:'absolute',left:'270px', top:'40px'}}>메세지 보내기</b> */}
              <button
                onClick={this.handleOpenModal}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  float: "right",
                  height: "40px",
                  fontSize: "15pt",
                }}
              >
                소개글 수정
              </button>
              <Modal
                // className="modal"
                isOpen={this.state.showModal}
                contentLabel="onRequestClose Example"
                onRequestClose={this.handleCloseModal}
                shouldCloseOnOverlayClick={true}
              >
                <br />
                <b style={{ fontSize: "20pt", color: "#503396" }}>
                  소개글 수정하기
                </b>
                <br />
                <br />
                <hr></hr>
                <br />
                <br />
                <b style={{ fontSize1: "13pt" }}>
                  새로운 소개글을 입력해주세요.
                </b>
                <br />
                <br />
                <textarea
                  name="team_intro"
                  ref="team_intro"
                  style={{ width: "400px", height: "100px" }}
                  onChange={this.test.bind(this)}
                  required
                />
                <br />
                <br />
                <br />
                <button
                  type="button"
                  onClick={this.onTeamIntro.bind(this)}
                  style={{
                    width: "100px",
                    height: "40px",
                    backgroundColor: "#503396",
                    border: "1px solid #503396",
                    color: "white",
                    outline: "none",
                    borderRadius: "10px",
                    fontSize: "13pt",
                  }}
                >
                  수정완료
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  type="button"
                  onClick={this.handleCloseModal}
                  style={{
                    width: "100px",
                    height: "40px",
                    backgroundColor: "black",
                    border: "1px solid #503396",
                    color: "white",
                    outline: "none",
                    borderRadius: "10px",
                    fontSize: "13pt",
                  }}
                >
                  닫기
                </button>
              </Modal>
              <hr style={{ borderColor: "white" }} />
              <b style={{ fontSize: "13pt", color: "white", marginLeft: "0" }}>
                팀 소개
              </b>
              <br />
              <textarea
                readOnly
                style={{
                  width: "400px",
                  height: "100px",
                  fontSize: "13pt",
                  borderRadius: "10px",
                }}
                value={tdata.team_intro}
              ></textarea>
              <div
                style={{
                  // float: "left",
                  marginLeft: "-600px",
                  marginRight: "150px",
                  marginTop: "40px",
                  zIndex: "0",
                  width: "1000px",
                }}
                align="center"
              >
                <FullCalendar
                  height={380}
                  handleWindowResize={true}
                  defaultView="dayGridMonth"
                  plugins={[dayGridPlugin]}
                  events={eventData}
                  eventColor={"#abc2f7"}
                  font-size={"20pt"}

                  //  events={[
                  //     { title: '이벤트입니다.', date: '2020-06-30' },
                  //     { title: '이벤트입니다.', date: this.state.date },

                  //   ]}
                />
              </div>
            </div>
          </div>
          <div style={{ width: "1200px" }}></div>
        </Scrollbars>
      </div>
    );
  }
}
export default TeamHome;
