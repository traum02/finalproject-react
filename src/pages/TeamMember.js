import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../Css/MainStyle.css";
import Modal from "react-modal";
import TeamMemberItem from "./TeamMemberItem";
import axios from "axios";
import TeamMenu from "./TeamMenu";
import TeamMemberApply from "./TeamMemberApply";
import ReactPlayer from "react-player";

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

class TeamMember extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      tmemberData: [],

      applyData: [],

      //검색용
      option: "",
      keyword: "",

      //페이징용
      start: 0,
      startarray: [],
      flag: false,
      flag2: false,
      totalCount: -1,

      //내 팀 넘버
      myteamnum: "",
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
        console.log("현재 접속자 등급? ===" + this.state.grade);
        // this.props.Onlist();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //team_num을 통해 값 가져오기
  list = () => {
    let url =
      "http://localhost:9000/matchplay/teammember/list?team_num=" +
      this.state.myteamnum +
      "&start=" +
      this.state.start;
    axios
      .get(url)
      .then((responsedata) => {
        this.setState({
          tmemberData: responsedata.data,
        });
        console.dir(responsedata.data);
      })
      .catch((err) => {
        console.log("아무튼 에러" + err);
      });
  };

  //team_num을 통해 승인 대기자 가져오기
  applylist = () => {
    let url =
      "http://localhost:9000/matchplay/teammember/applylist?team_num=" +
      this.state.myteamnum +
      "&start=" +
      this.state.start;
    axios
      .get(url)
      .then((responsedata) => {
        this.setState({
          applyData: responsedata.data,
        });
        console.dir("어플리데이터" + responsedata.data);
      })
      .catch((err) => {
        console.log("아무튼 에러" + err);
      });
  };

  //team_num을 통해 자기 팀 인원을 불러오기
  memberTotal = () => {
    let url =
      "http://localhost:9000/matchplay/teammember/count?team_num=" +
      this.state.myteamnum;
    axios
      .get(url)
      .then((responsedata) => {
        this.setState({
          totalCount: responsedata.data,
        });
        console.dir("카운트" + responsedata.data);
      })
      .catch((err) => {
        console.log("토탈카운트에러" + err);
      });
  };

  //페이지가 시작하자마자 리스트 호출
  componentWillMount() {
    this.getMyTeamNum();
    this.getGrade();

    setTimeout(() => {
      this.list();
      this.applylist();
      this.memberTotal();
    }, 200);
  }

  //검색목록 출력하는 list 함수
  searchlist = () => {
    this.setState({
      idx: 2,
    });

    let url =
      "http://localhost:9000/matchplay/teammember/searchlist?start=" +
      this.state.start +
      "&option=" +
      this.state.option +
      "&keyword=" +
      this.refs.keyword.value;

    // let searchData = this.state;
    axios
      .get(url)
      .then((responsedata) => {
        this.setState({
          tmemberData: responsedata.data,
          option: this.state.option,
          keyword: this.refs.keyword.value,
        });
        console.dir("검색리스트 호출 옵션" + this.state.option);
      })
      .catch((error) => {
        console.log("list 에러" + error);
      });
  };

  //검색
  onSearch = (e) => {
    e.preventDefault();
    this.setState({
      idx: 2,
    });

    this.searchlist();

    console.log(
      "검색하기 누른 후 값" + this.state.option + this.refs.keyword.value
    );
  };

  //검색 셀렉트
  onSelectSearch = (e) => {
    this.setState(
      {
        option: e.target.value,
      },
      () =>
        console.log("옵션값 확인" + this.state.option + this.refs.keyword.value)
    );
  };

  pageWrite = (i) => {
    this.setState({
      start: (i - 1) * 5,
    });
    setTimeout(() => {
      this.list();
    }, 50);
  };

  onClickNext = () => {
    if (this.state.tmemberData.length !== 0) {
      this.setState((prevState, props) => ({
        start: prevState.start + 5,

        flag: true,
      }));
    }
  };

  onClickPre = () => {
    if (this.state.start > 0) {
      this.setState((prevState, props) => ({
        start: prevState.start - 5,
        flag2: true,
      }));
    }
  };

  componentDidUpdate = () => {
    if (this.state.flag) {
      this.list();
      this.setState({
        flag: false,
      });
    } else if (this.state.flag2) {
      this.list();
      this.setState({
        flag2: false,
      });
    }
  };

  render() {
    let totalc = this.state.totalCount;
    let pageCount = 5;

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
          {/* <a className="page-link" onClick={this.pageWrite.bind(this,i)} style={{color:'black',cursor:'pointer'}}>{i}</a> */}
          {this.state.start === (i - 1) * 5 ? (
            <a
              className="page-link"
              onClick={this.pageWrite.bind(this, i)}
              style={{
                color: "red",
                cursor: "pointer",
                backgroundColor: "#503396",
              }}
            >
              {i}
            </a>
          ) : (
            <a
              className="page-link"
              onClick={this.pageWrite.bind(this, i)}
              style={{ color: "black", cursor: "pointer" }}
            >
              {i}
            </a>
          )}
        </div>
      );
    }

    return (
      <div className="TeamMember">
        <TeamMenu></TeamMenu>
        <div
          className="TeamMember"
          align="center"
          style={{
            position: "absolute",
            left: "450px",
            top: "200px",
            border: "3px",
            marginTop: "10px",
          }}
        >
          <br />
          <br />
          <form onSubmit={this.onSearch.bind(this)}>
            <table
              style={{ border: "none", fontSize: "13pt" }}
              className="TeamMember"
            >
              <tbody align="center">
                <tr>
                  <td width="150px">
                    <b style={{ fontSize: "13pt" }}>팀원 검색</b>
                  </td>
                  <td width="150px">
                    <select
                      style={{ width: "100px" }}
                      value={this.state.option}
                      onChange={this.onSelectSearch.bind(this)}
                    >
                      <option value="" selected>
                        선택하세요
                      </option>
                      <option value="m.name">아이디</option>
                      <option value="t.team_member_grade">등급</option>

                      <option value="m.gender">성별</option>
                      <option value="m.addr">지역</option>
                    </select>
                  </td>
                  <td width="350px">
                    <input
                      type="text"
                      ref="keyword"
                      style={{ width: "300px" }}
                    />
                  </td>
                  <td width="150px">
                    <button
                      type="submit"
                      style={{
                        width: "100px",
                        backgroundColor: "#503396",
                        color: "white",
                      }}
                      onSubmit={this.onSearch.bind(this)}
                    >
                      검색하기
                    </button>
                  </td>
                  {/*                         
                        <td style={{float:'right', width:'200px'}}>
                            <button onClick={this.handleOpenModal} style={{backgroundColor:'black',color:'white'}}>팀원 초대하기</button>    
                                    <Modal
                                        // className="modal"
                                        isOpen={this.state.showModal}
                                        style={customStyles}
                                        contentLabel="onRequestClose Example"
                                        onRequestClose={this.handleCloseModal}
                                        shouldCloseOnOverlayClick={true}
                                        >
                                        <br/>
                                        <b style={{fontSize:'20pt',color:'#503396'}}>팀원 초대하기</b><br/><br/>
                                        <hr></hr><br/><br/>
                                        <b style={{fontSize:'13pt'}}>아이디를 입력해주세요.</b><br/><br/>
                                        <input type="text" style={{width:'200px',height:'30px'}}/>
                                        <br/><br/><br/>
                                        <button type="button" onClick={this.handleCloseModal} 
                                        style={{width:'100px', height:'40px',backgroundColor:'#503396',border:'1px solid #503396',color:'white',outline:'none',borderRadius:'10px',fontSize:'13pt'}}>
                                            초대하기
                                        </button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <button type="button" onClick={this.handleCloseModal} 
                                        style={{width:'100px', height:'40px',backgroundColor:'black',border:'1px solid #503396',color:'white',outline:'none',borderRadius:'10px',fontSize:'13pt'}}>
                                            닫기
                                        </button>
                                    </Modal>    
                        </td> */}
                </tr>
              </tbody>
            </table>
          </form>
          <br />
          <br />
          <table style={{ fontSize: "13pt" }} className="MemberList">
            <thead
              align="center"
              style={{ color: "white", backgroundColor: "#503396" }}
            >
              <tr style={{ height: "50px" }}>
                <td width="60px">번호</td>
                <td width="100px">등급</td>
                <td width="200px">아이디</td>
                <td width="80px">성별</td>
                <td width="200px">지역</td>
                {/* <td width="100px">
                            경기참여수
                        </td> */}
                <td width="130px">가입일</td>
                <td width="180px">등급수정</td>
                <td width="60px">제명</td>
              </tr>
            </thead>
            <tbody>
              {this.state.tmemberData.map((row, idx) => (
                <TeamMemberItem
                  row={row}
                  key={idx}
                  onList={this.list.bind(this)}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="paging">
          <React.Fragment>
            <nav
              aria-label="Page navigation"
              style={{
                position: "absolute",
                left: "400px",
                marginTop: "300px",
              }}
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
          </React.Fragment>
        </div>
        <div style={{ position: "absolute", left: "650px", top: "550px" }}>
          <br></br>
          <span
            style={{
              fontSize: "13pt",
              textAlign: "center",
              position: "absolute",
              left: "230px",
            }}
          >
            가입 대기자 목록
          </span>
          <br></br> <br></br> <br></br>
          <form>
            <table style={{ fontSize: "13pt" }} className="AppyList">
              <thead
                align="center"
                style={{ color: "white", backgroundColor: "#503396" }}
              >
                <tr style={{ height: "50px" }}>
                  <td width="200px">아이디</td>
                  <td width="80px">성별</td>
                  <td width="200px">지역</td>

                  <td width="60px">승인</td>
                  <td width="60px">거절</td>
                </tr>
              </thead>
              <tbody>
                {this.state.applyData.map((row, idx) => (
                  <TeamMemberApply
                    row={row}
                    key={idx}
                    onApplyList={this.applylist.bind(this)}
                    onList={this.list.bind(this)}
                    setteam_num={this.state.myteamnum}
                  />
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    );
  }
}

export default TeamMember;
