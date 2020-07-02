import React, { Component } from "react";
import axios from "axios";

class TeamMemberItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team_member_grade: "",
      team_member_num: "",
      myteamnum: "",
      beforemaster: "",
      grade: "",
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

  componentWillMount() {
    this.getMyTeamNum();
    this.getGrade();
  }

  //검색 셀렉트
  ongrade = (e) => {
    const team_member_grade = this.props.row.TEAM_MEMBER_GRADE;

    if (e.target.value === team_member_grade) {
      alert("이미 같은 등급입니다");
      return false;
    } else if (e.target.value === "submaster") {
      if (window.confirm("이 멤버를 부팀장으로 임명하시겠습니까?")) {
        this.setState(
          {
            team_member_grade: e.target.value,
          },
          () => console.log("grade 값" + this.state.team_member_grade)
        );
        console.log("권한 실제 수정");
        let url = "http://localhost:9000/matchplay/teammember/update";
        axios
          .put(url, {
            team_member_grade: e.target.value,
            team_member_num: this.props.row.TEAM_MEMBER_NUM,
          })

          .then((responsedata) => {
            this.props.onList();
            window.location.reload();
            console.dir("값값값" + this.state.team_member_grade);
          })

          .catch((err) => {
            console.log("저장오류" + err);
          });
      } else {
        return false;
      }
    } else if (e.target.value === "master") {
      if (window.confirm("정말로 이 멤버에게 팀장을 양도하겠습니까?")) {
        this.setState(
          {
            team_member_grade: e.target.value,
          },
          () => console.log("grade 값" + this.state.team_member_grade)
        );
        console.log("권한 실제 수정");
        let url = "http://localhost:9000/matchplay/teammember/update";
        axios
          .put(url, {
            team_member_grade: e.target.value,
            team_member_num: this.props.row.TEAM_MEMBER_NUM,
            beforemaster: window.sessionStorage.getItem("id"),
          })

          .then((responsedata) => {
            this.props.onList();
            window.location.reload();
            console.dir("값값값" + this.state.beforemaster);
          })

          .catch((err) => {
            console.log("저장오류" + err);
          });
      } else {
        return false;
      }
    } else if (e.target.value === "member") {
      if (window.confirm("일반 팀원으로 임명하시겠습니까?")) {
        this.setState(
          {
            team_member_grade: e.target.value,
          },
          () => console.log("grade 값" + this.state.team_member_grade)
        );
        console.log("권한 실제 수정");
        let url = "http://localhost:9000/matchplay/teammember/update";
        axios
          .put(url, {
            team_member_grade: e.target.value,
            team_member_num: this.props.row.TEAM_MEMBER_NUM,
          })

          .then((responsedata) => {
            this.props.onList();
            window.location.reload();
            console.dir("값값값" + this.state.team_member_grade);
          })

          .catch((err) => {
            console.log("저장오류" + err);
          });
      } else {
        return false;
      }
    }
  };

  //제명
  getOut = () => {
    if (window.confirm("정말로 이 멤버를 제명하시겠습니까?")) {
      let url =
        "http://localhost:9000/matchplay/teammember/delete?team_member_num=" +
        this.props.row.TEAM_MEMBER_NUM;
      axios
        .delete(url)
        .then((res) => {
          this.props.onList();
        })
        .catch((err) => {
          console.log("제명오류" + err);
        });
    } else {
      return false;
    }
  };

  render() {
    return (
      <tr>
        <td style={{ textAlign: "center" }}>
          {this.props.row.TEAM_MEMBER_NUM}
        </td>
        <td style={{ textAlign: "center" }}>
          {this.props.row.TEAM_MEMBER_GRADE}
        </td>
        <td style={{ textAlign: "center" }}>{this.props.row.name}</td>
        <td style={{ textAlign: "center" }}>{this.props.row.gender}</td>
        <td style={{ textAlign: "center" }}>{this.props.row.addr}</td>
        <td style={{ textAlign: "center" }}>
          {this.props.row.TEAM_MEMBER_DATE}
        </td>

        <td style={{ textAlign: "center" }}>
          {this.state.grade == "master" &&
          this.props.row.TEAM_MEMBER_GRADE != "master" ? (
            <select
              style={{ width: "100px" }}
              value={this.state.team_member_num}
              onChange={this.ongrade.bind(this)}
            >
              <option value="">등급변경</option>
              <option value="submaster">부팀장</option>
              <option value="member">팀원</option>
              <option value="master">팀장위임</option>
            </select>
          ) : (
            ""
          )}
        </td>
        <td>
          {this.state.grade == "master" &&
          this.props.row.TEAM_MEMBER_GRADE != "master" ? (
            <button
              type="button"
              onClick={this.getOut.bind(this)}
              style={{
                float: "right",
                width: "30px",
                height: "28px",
                marginRight: "15px",
              }}
            >
              X
            </button>
          ) : (
            ""
          )}
        </td>
      </tr>
    );
  }
}

export default TeamMemberItem;
