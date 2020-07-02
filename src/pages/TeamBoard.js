import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import "../Css/MainStyle.css";
import eye from "../image/eyes.png";
import pen from "../image/pen1.png";
import icon from "../image/search-icon2.png";
import "../Css/TList.css";
import TeamBoardItem from "./TeamBoardItem";
import axios from "axios";
import TeamMenu from "./TeamMenu";
import "../Css/TList.css";

class TeamBoard extends Component {
  constructor({ match }) {
    super(match);
    this.state = {
      tboardData: [],
      selectData: [],

      //페이징용
      start: match.params.start,
      startarray: [],
      flag: false,
      flag2: false,
      totalCount: "",

      //검색용
      option: "",
      keyword: "",

      //list or searchlist 스위칭용
      idx: 1,
      activePage: 1,

      //팀 게시물만 보기
      tboard_public: "all",

      //팀 번호
      myteamnum: "",
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
        console.log(err);
      });
  };

  //목록을 출력하는 list 함수
  list = () => {
    this.setState({
      idx: 1,
    });

    let url =
      "http://localhost:9000/matchplay/tboard/list?start=" + this.state.start;
    axios
      .get(url)
      .then((responsedata) => {
        this.setState({
          totalCount: responsedata.data[0].totalCount,
          tboardData: responsedata.data,
        });
        console.log(responsedata.data[0].totalCount);
        console.dir(responsedata.data.totalCount);
      })
      .catch((error) => {
        console.log("list 에러" + error);
      });
  };

  //팀 게시물 목록을 출력하는 list 함수
  listTeam = (e) => {
    if (e.target.checked) {
      this.setState({
        idx: 3,
        tboard_public: e.target.value,
      });

      setTimeout(() => {
        let url =
          "http://localhost:9000/matchplay/tboard/list/team?start=" +
          this.state.start +
          "&tboard_public=" +
          this.state.tboard_public;
        axios
          .get(url)
          .then((responsedata) => {
            this.setState({
              totalCount: responsedata.data[0].totalCount,
              tboardData: responsedata.data,
            });
            console.log(responsedata.data[0].totalCount);
            console.dir("팀 체크" + this.state.tboard_public);
          })
          .catch((error) => {
            console.log("list 에러" + error);
          });
      }, 50);
    } else {
      setTimeout(() => {
        this.list();
      }, 50);
    }
  };

  //검색목록 출력하는 list 함수
  searchlist = () => {
    this.setState({
      idx: 4,
    });

    let url =
      "http://localhost:9000/matchplay/tboard/searchlist?start=" +
      this.state.start +
      "&option=" +
      this.state.option +
      "&keyword=" +
      this.refs.keyword.value;

    // let searchData = this.state;
    axios
      .post(url, {
        keyword: this.refs.keyword.value,
      })
      .then((responsedata) => {
        this.setState({
          totalCount: responsedata.data[0].totalCount,
          tboardData: responsedata.data,
          option: this.state.option,
        });
      })
      .catch((error) => {
        console.log("list 에러" + error);
      });
  };

  //페이지가 시작하자마자 리스트 호출
  componentWillMount() {
    this.list();
    this.getMyTeamNum();
  }

  onClickNext = () => {
    if (this.state.tboardData.length !== 0) {
      this.setState((prevState, props) => ({
        start: prevState.start + 10,

        flag: true,
      }));
    }
  };

  onClickPre = () => {
    if (this.state.start > 0) {
      this.setState((prevState, props) => ({
        start: prevState.start - 10,
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

  //검색 셀렉트창
  onSelectSearch = (e) => {
    this.setState(
      {
        option: e.target.value,
      },
      () => console.log(this.state.option)
    );
  };

  //검색창
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      idx: 2,
    });
    this.searchlist();
    console.log(this.state.option + this.refs.keyword.value);
  };

  pageWrite = (i) => {
    this.setState({
      start: (i - 1) * 10,
    });
    setTimeout(() => {
      this.list();
    }, 50);
  };

  render() {
    // let allpages = countPlus<=totalc.length;
    // let countPlus = count++;
    //  console.log(allpages)
    // let start = this.state.start; //0 이자 start
    let totalc = this.state.totalCount; //전체 값이자 end

    let pageCount = 10;

    console.log("토탈c" + totalc);

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
          {this.state.start === (i - 1) * 10 ? (
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

    // let pages =[count++>=totalc.length]

    // let pages = [1,2,3,4,5]

    // console.log(pages)

    // let pages = (1, pageCount +1) // _.range ([시작], 중지, [단계])
    return (
      <div>
        <TeamMenu></TeamMenu>
        <div
          style={{
            position: "absolute",
            left: "400px",
            width: "1000px",
            height: "683px",
            border: "3px solid red",
          }}
        >
          <form className="form_T">
            <Link
              exact
              to="/Team/TeamHome/TeamBoard/add/TWrite"
              style={{
                textDecoration: "none",
                color: "white",
                marginLeft: "140px",
              }}
            >
              <button
                style={{ marginRight: "-900px" }}
                type="button"
                className="wbtn_T"
              >
                <img src={pen} className="pen" />
              </button>
            </Link>
            <table
              class="table table-bordered"
              width="1000px"
              style={{ marginTop: "-80px", width: "800px", height: "600px" }}
            >
              <thead class="head_T">
                <tr>
                  <th className="no_T">No</th>
                  <th className="type_T">Type</th>
                  <th className="title_T">TiTle</th>
                  <th className="member_T">Member</th>
                  <th className="date_T">Date</th>
                  <th>
                    <img src={eye} className="eye" alt="" />
                  </th>
                </tr>
              </thead>
              <tbody className="tbody_T">
                {this.state.tboardData.map((row, idx) => (
                  // 하위 컴포넌트인 TboardItem 에서 데이터를 받아 출력
                  <TeamBoardItem
                    row={row}
                    key={row.tboard_num}
                    startnum={this.state.start}
                  />
                ))}
              </tbody>
            </table>
          </form>

          <nav
            aria-label="Page navigation"
            style={{ position: "absolute", left: "550px" }}
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

              {/* {pages.map(page => (
                                               <li key={page} className="page-item" style={{ cursor: "pointer" }}>
                                               <a className="page-link">{page}</a>
                                             </li>
                                            ))}  */}

              {/* <li className="page-item">
                            <a className="page-link" href="#" style={{color:'black'}}>1</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#" style={{color:'black'}}>2</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#" style={{color:'black'}}>3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#" style={{color:'black'}}>4</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#" style={{color:'black'}}>5</a></li> */}

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

          <input
            type="checkbox"
            style={{ position: "absolute", left: "50px" }}
            value={this.state.myteamnum}
            onClick={this.listTeam.bind(this)}
          ></input>
          <span
            style={{
              float: "left",
              marginLeft: "65px",
              marginTop: "0px",
              fontSize: "10pt",
            }}
          >
            우리팀 게시글만 보기
          </span>

          <div className="boardT_search">
            <select
              className="select_T"
              value={this.state.option}
              onChange={this.onSelectSearch.bind(this)}
            >
              <option value="" selected>
                선택하세요
              </option>
              <option value="tboard_title and tboard_content">제목+내용</option>
              <option value="tboard_title">제목</option>
              <option value="tboard_content">내용</option>
              <option value="member_id">작성자</option>
            </select>

            {/* <select className="select_T">
                            <option>제목+내용</option>
                            <option>제목만</option>
                            <option>작성자</option>
                        </select> */}
            {/* <input type="text" ></input> */}
            <form onSubmit={this.onSubmit.bind(this)}>
              <input type="text" ref="keyword"></input>
              <button classname="btnsearch" class="search">
                <img className="icon" src={icon} alt="" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TeamBoard;
