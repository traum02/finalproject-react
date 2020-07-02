import React, { Component } from "react";
import LeaguePlan from "./LeaguePlan";
import LeagueRanking from "./LeagueRanking";
import LeagueJoin from "./LeagueJoin";
import "../Css/League.css";
import "../Css/MainStyle.css";

class LeagueMain extends Component {
  render() {
    return (
      <div>
        <div>
          <LeagueJoin></LeagueJoin>
        </div>
        <div>
          <div className="leaguePlan">
            <LeaguePlan></LeaguePlan>
          </div>
          <div className="leagueRanking" align="center">
            <LeagueRanking></LeagueRanking>
          </div>
        </div>
      </div>
    );
  }
}

export default LeagueMain;
