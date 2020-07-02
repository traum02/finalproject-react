import React, { Component } from "react";
import Axios from "axios";

class MyMatchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamInfo: [],
      oppoTeamInfo: [],
      teamnum: "",
      memberData: [],
    };
  }

  getMemberData = () => {
    // const url = "http://192.168.0.108:9000/matchplay/memberdata?id=";
    const url = "http://localhost:9000/matchplay/memberdata?id=";

    Axios.get(url + window.sessionStorage.getItem("id"))
      .then((res) => {
        this.setState(
          {
            memberData: res.data,
          },
          () => this.getTeamInfo()
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTeamInfo = () => {
    if (this.props.row.res_type !== "0") {
      const url =
        "http://localhost:9000/matchplay/myhistory/teaminfo?team_num=";
      // const url = "http://192.168.0.108:9000/matchplay/myhistory/teaminfo?member_id=";
      // let teamnum = this.props.memberData.team_int;
      let teamnum = this.state.memberData.team_int;
      Axios.get(url + teamnum)
        .then((res) => {
          this.setState(
            {
              teamInfo: res.data,
            },
            () => this.getOppoTeamInfo()
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  getOppoTeamInfo = () => {
    let team = "";
    if (
      this.props.row.res_type === "0" &&
      this.props.row.home_member_id.includes(
        window.sessionStorage.getItem("id")
      )
    ) {
      team = "Home";
    } else if (
      this.props.row.res_type === "0" &&
      this.props.row.away_member_id.includes(
        window.sessionStorage.getItem("id")
      )
    ) {
      team = "Away";
    } else if (
      this.props.row.res_type === "1" &&
      this.props.row.home_member_id.includes(this.state.memberData.team_int)
    ) {
      team = "Home";
    } else if (
      this.props.row.res_type === "1" &&
      this.props.row.away_member_id.includes(this.state.memberData.team_int)
    ) {
      team = "Away";
    }
    if (this.props.row.res_type !== "0") {
      const url =
        "http://localhost:9000/matchplay/myhistory/teaminfo?team_num=";
      // const url = "http://192.168.0.108:9000/matchplay/myhistory/teaminfo?member_id=";
      let oppoteamnum =
        team === "Home"
          ? this.props.row.away_member_id
          : this.props.row.home_member_id;
      Axios.get(url + oppoteamnum)
        .then((res) => {
          this.setState({
            oppoTeamInfo: res.data,
          });
          console.log(this.state.oppoTeamInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  componentWillMount() {}

  componentDidMount() {
    this.getMemberData();
    // this.getTeamInfo();
    // this.getOppoTeamInfo();
  }
  render() {
    let team = "";
    if (
      this.props.row.res_type === "0" &&
      this.props.row.home_member_id.includes(
        window.sessionStorage.getItem("id")
      )
    ) {
      team = "Home";
    } else if (
      this.props.row.res_type === "0" &&
      this.props.row.away_member_id.includes(
        window.sessionStorage.getItem("id")
      )
    ) {
      team = "Away";
    } else if (
      this.props.row.res_type === "1" &&
      this.props.row.home_member_id.includes(this.props.memberData.team_int)
    ) {
      team = "Home";
    } else if (
      this.props.row.res_type === "1" &&
      this.props.row.away_member_id.includes(this.props.memberData.team_int)
    ) {
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
    // let resResult = "";
    // if (this.props.row.res_status === "Y") {
    //   resResult =
    //     this.props.row.res_team1goal + " : " + this.props.row.res_team2goal;
    // } else if (resStatus === "예약실패") {
    //   resResult = "매칭실패";
    // } else {
    //   if (
    //     new Date() <
    //     new Date(
    //       this.props.row.res_time.substring(0, 4),
    //       this.props.row.res_time.substring(5, 7) - 1,
    //       this.props.row.res_time.substring(8, 10),
    //       this.props.row.time_val.substring(0, 2)
    //     )
    //   ) {
    //     resResult = "경기예정";
    //   } else {
    //     resResult = "정산중";
    //   }
    // }
    let result = "";
    if (team === "Home") {
      if (this.props.row.res_team1goal > this.props.row.res_team2goal) {
        result = "승리";
      } else if (
        this.props.row.res_team1goal === this.props.row.res_team2goal
      ) {
        result = "무승부";
      } else {
        result = "패배";
      }
    } else if (team === "Away") {
      if (this.props.row.res_team1goal < this.props.row.res_team2goal) {
        result = "승리";
      } else if (
        this.props.row.res_team1goal === this.props.row.res_team2goal
      ) {
        result = "무승부";
      } else {
        result = "패배";
      }
    }
    // "rgb(220,220,220)"
    return (
      <div>
        <tr
          style={{
            borderBottom: "1px solid rgba(0,0,0,.1)",
            height: "40px",
            backgroundColor:
              result === "승리"
                ? "#b3e5fc"
                : result === "무승부"
                ? "rgb(220,220,220)"
                : "tomato",
          }}
        >
          <td align="center" style={{ border: "1px solid gray" }}>
            <b style={{ fontSize: "15pt" }}>{this.props.row.res_time}</b>
          </td>
          <td
            align="center"
            style={{ border: "1px solid gray", width: "400px" }}
          >
            <b style={{ fontSize: "15pt" }}>
              {this.props.row.res_etc != null ? "League" : "Friendly"} Match
            </b>
          </td>
          <td align="center" style={{ border: "1px solid gray" }}>
            <b style={{ fontSize: "15pt" }}>
              상대팀 :{" "}
              {this.props.row.res_type !== "0"
                ? this.state.oppoTeamInfo.team_name
                : "개인전"}
            </b>
          </td>
          <td style={{ border: "1px solid gray" }} align="right">
            <b
              style={{
                fontSize: "15pt",
                color: "blue",
                marginRight: "50px",
                lineHeight: "40px",
              }}
            >
              {result}
            </b>
          </td>
        </tr>
        <tr
          style={{
            borderBottom: "1px solid rgba(0,0,0,.1)",
            backgroundColor: "LightSkyBlue",
          }}
        >
          <td
            align="center"
            style={{
              width: "200px",
              border: "1px solid gray",
              verticalAlign: "middle",
            }}
          >
            <img
              src={
                "http://localhost:9000/matchplay/image/" +
                this.state.teamInfo.team_photo
              }
              alt=""
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                paddingTop: "10px",
                paddingBottom: "10px",
                border: "1px",
              }}
            />
          </td>
          <td
            align="center"
            style={{ width: "300px", border: "1px solid gray" }}
          >
            <b style={{ fontSize: "60pt" }}>
              {team === "Home"
                ? this.props.row.res_team1goal
                : this.props.row.res_team2goal}{" "}
              :{" "}
              {team === "Home"
                ? this.props.row.res_team2goal
                : this.props.row.res_team1goal}
            </b>
          </td>
          <td
            style={{
              border: "1px solid gray",
              width: "200px",
              verticalAlign: "middle",
            }}
            align="center"
          >
            <img
              src={
                "http://localhost:9000/matchplay/image/" +
                this.state.oppoTeamInfo.team_photo
              }
              alt=""
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                paddingTop: "10px",
                paddingBottom: "10px",
                border: "1px",
              }}
            />
          </td>
          <td
            width="400px"
            style={{ border: "1px solid gray", verticalAlign: "middle" }}
            align="left"
          >
            <b style={{ fontSize: "15pt", marginLeft: "50px" }}>장소 : </b>
            <b style={{ fontSize: "15pt" }}>{this.props.row.place_name}</b>
            <br />
            <b style={{ fontSize: "15pt", marginLeft: "50px" }}>주소 : </b>
            <b style={{ fontSize: "15pt" }}>{this.props.row.place_addr}</b>
          </td>
        </tr>
      </div>

      //   <tr style={{ borderBottom: "1px solid gray", height: "45px" }}>
      //     <td>
      //       {this.props.row.res_etc != null ? "리그" : "친선"}({team})
      //     </td>
      //     <td>{this.props.row.res_type === "0" ? "개인" : "팀"}</td>
      //     <td>{this.props.row.res_time}</td>
      //     <td>
      //       {this.props.row.time_val.substring(0, 2) +
      //         "시~" +
      //         this.props.row.time_val.substring(2, 4) +
      //         "시"}
      //     </td>
      //     <td>{this.props.row.place_name}</td>
      //     <td>{this.props.row.place_addr}</td>
      //     {/* <td>{resStatus}</td> */}
      //     {/* <td>{this.props.row.res_date}</td> */}
      //     <td>{resStatus}</td>
      //     <td>{resResult}</td>
      //   </tr>
      // <div>
      //   <div className="txt5" align="center">
      //     {"소속팀 = " + team}
      //     <br></br>
      //     {"Home " +
      //       this.props.row.res_team1goal +
      //       " : " +
      //       this.props.row.res_team2goal +
      //       " Away"}
      //     <br></br>
      //     {"장소 = " + this.props.row.place_name}
      //     <br></br>
      //     {"주소 = " + this.props.row.place_addr}
      //     <br></br>
      //     {"경기일 = " + this.props.row.res_time}
      //     <br></br>
      //     {"경기시간 = " +
      //       this.props.row.time_val.substring(0, 2) +
      //       "~" +
      //       this.props.row.time_val.substring(2, 4)}
      //     <br></br>
      //     경기 타입 = {this.props.row.res_type === "0" ? "개인" : "팀"}
      //     <br></br>
      //     진행여부 = {this.props.row.res_status === "0" ? "미진행" : "진행"}
      //   </div>
      //   <hr></hr>
      // </div>
    );
  }
}

export default MyMatchItem;
