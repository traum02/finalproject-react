import React, { Component } from "react";
import { Route } from "react-router";
import LeaguePlan from "./LeaguePlan";
import LeagueRanking from "./LeagueRanking";
import "../css/League.css";
class LeagueMain extends Component {
  render() {
    return (
      <div>
        <div>소개+신청</div>
        <div className="leaguePlan">
          <LeaguePlan></LeaguePlan>
        </div>
        <div className="leagueRanking">
          <LeagueRanking></LeagueRanking>
        </div>
      </div>
    );
  }
}

export default LeagueMain;
