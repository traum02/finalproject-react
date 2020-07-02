import React, { Component } from "react";
import logo from "../image/logo.png";

class LeaguePlanItem extends Component {
  render() {
    return (
      <div
        style={{
          // padding: "10px",
          fontSize: "12pt",
          width: "95%",
        }}
      >
        <div style={{ display: "inline-block" }}>
          <img
            src={logo}
            style={{ width: "50px" }}
            title={this.props.item.team1_name}
            alt={logo}
          ></img>
          <br></br>
          {this.props.item.team1_name}
        </div>
        {/* 차후에 팀로고로 교체 요망 */}
        {/* {this.props.item.round_status === "N"
          ? this.props.item.team1_name + " vs " + this.props.item.team2_name
          : this.props.item.team1_name +
            " " +
            this.props.item.league_team1goal +
            " vs " +
            this.props.item.league_team2goal +
            " " +
            this.props.item.team2_name} */}
        <div
          style={{
            display: "inline-block",
            marginLeft: "10px",
            marginRight: "10px",
            fontWeight: "bold",
            fontSize: "17pt",
          }}
        >
          {this.props.item.round_status === "N"
            ? ""
            : this.props.item.league_team1goal +
              ":" +
              this.props.item.league_team2goal}
          <br></br>
          vs
        </div>
        <div style={{ display: "inline-block" }}>
          <img
            src={logo}
            style={{ width: "50px" }}
            title={this.props.item.team2_name}
            alt={logo}
          ></img>
          <br></br>
          {this.props.item.team2_name}
        </div>
        <hr></hr>
      </div>
    );
  }
}

export default LeaguePlanItem;
