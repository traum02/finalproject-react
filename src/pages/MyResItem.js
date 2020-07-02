import React, { Component } from "react";

class MyResItem extends Component {
  render() {
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
        <td>{this.props.row.res_etc != null ? "리그" : "친선"}</td>
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
        <td>{resStatus}</td>
        <td>{resResult}</td>
      </tr>
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

export default MyResItem;
