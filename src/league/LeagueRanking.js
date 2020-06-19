import React, { Component } from "react";
import axios from "axios";

class LeagueRanking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagueDatas: [],
    };
  }

  list = (e) => {
    let url =
      // "http://192.168.0.108:9000/matchplay/leagueRanking";
      "http://localhost:9000/matchplay/leagueRanking";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          leagueDatas: response.data,
        });
        console.log(this.state.leagueDatas);
      })
      .catch((error) => {
        console.log("list 에러:" + error);
      });
  };
  componentDidMount() {
    this.list();
  }
  render() {
    return (
      <div>
        순위
        {this.state.leagueDatas.map((item) => {
          if (item.league_join === "Y") {
            // eslint-disable-next-line no-lone-blocks
            {
              return (
                <div>{item.league_team_id + " " + item.league_team_name}</div>
              );
            }
          }
        })}
      </div>
    );
  }
}

export default LeagueRanking;
