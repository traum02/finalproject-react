import React, { Component } from "react";

class MypageResItem extends Component {
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
      this.props.row.home_member_id.includes("1")
    ) {
      team = "Home";
    } else if (
      this.props.row.res_type === "1" &&
      this.props.row.away_member_id.includes("1")
    ) {
      team = "Away";
    }
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

    return (
      <tr>
        <td>{this.props.row.res_etc == null ? "Friendly" : "League"}</td>
        <td>{this.props.row.res_time}</td>
        <td>{this.props.row.res_type === "0" ? "개인전" : "팀전"}</td>
        <td width="80px">
          {team === "Home"
            ? this.props.row.res_team1goal
            : this.props.row.res_team2goal}{" "}
          :{" "}
          {team === "Home"
            ? this.props.row.res_team2goal
            : this.props.row.res_team1goal}
        </td>
        <td width="80px">{result}</td>
        <td>{this.props.row.place_name}</td>
        <td>{this.props.row.place_addr}</td>
      </tr>
    );
  }
}

export default MypageResItem;
