import React, { Component } from "react";
import axios from "axios";

class TeamMemberApply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team_member_grade: "",
      team_member_num: "",
      grade: "",
    };
  }

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

  JoinMember = () => {
    let url = "http://localhost:9000/matchplay/teammember/update";
    axios
      .put(url, {
        team_member_grade: "member",
        team_member_num: this.props.row.TEAM_MEMBER_NUM,
      })

      .then((responsedata) => {
        this.props.onList();
        this.props.onApplyList();
        console.dir("값값값" + this.state.team_member_grade);

        this.setInt();
      })

      .catch((err) => {
        console.log("승인오류" + err);
      });
  };

  setInt = () => {
    let url =
      "http://localhost:9000/matchplay/member/setint?team_int=" +
      this.props.setteam_num +
      "&name=" +
      this.props.row.name;
    axios
      .get(url)
      .then((res) => {})
      .catch((err) => {
        console.log("셋인트 오류" + err);
      });
  };

  //제명
  getOut = () => {
    if (window.confirm("정말로 거절하시겠습니까?")) {
      let url =
        "http://localhost:9000/matchplay/teammember/delete?team_member_num=" +
        this.props.row.TEAM_MEMBER_NUM;
      axios
        .delete(url)
        .then((res) => {
          this.props.onList();
          this.props.onApplyList();
        })
        .catch((err) => {
          console.log("거절오류" + err);
        });
    } else {
      return false;
    }
  };

  componentWillMount() {
    this.getGrade();
    console.log("팀넘버" + this.props.setteam_num);
  }
  render() {
    return (
      <tr>
        <input type="hidden" value={this.props.row.TEAM_MEMBER_NUM} />

        <td style={{ textAlign: "center" }}>{this.props.row.name}</td>
        <td style={{ textAlign: "center" }}>{this.props.row.gender}</td>
        <td style={{ textAlign: "center" }}>{this.props.row.addr}</td>

        <td style={{ textAlign: "center" }}>
          {this.state.grade == "master" ? (
            <button
              type="button"
              onClick={this.JoinMember.bind(this)}
              style={{
                float: "right",
                width: "60px",
                height: "28px",
                marginRight: "10px",
              }}
            >
              승인
            </button>
          ) : (
            ""
          )}
        </td>
        <td>
          {this.state.grade == "master" ? (
            <button
              type="button"
              onClick={this.getOut.bind(this)}
              style={{
                float: "right",
                width: "60px",
                height: "28px",
                marginRight: "10px",
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

export default TeamMemberApply;
