import React, { Component } from "react";
import axios from "axios";
import LeagueRankRow from "./LeagueRankRow";
import LeagueName from "./LeagueName";
import Scrollbars from "react-custom-scrollbars";

class LeagueRanking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagueDatas: [],
      leagueName: "",
      leagueId: 0,
      pageNum: 0,
    };
  }
  nextSeason = (e) => {
    this.setState(
      {
        pageNum:
          this.state.leagueName != undefined
            ? this.state.pageNum + 1
            : this.state.pageNum,
      },
      () => this.leagueName()
    );
  };
  prevSeason = (e) => {
    this.setState(
      {
        pageNum:
          this.state.pageNum == 0 ? this.state.pageNum : this.state.pageNum - 1,
      },
      () => this.leagueName()
    );
  };
  leagueName = (e) => {
    // let url = "http://192.168.0.108:9000/matchplay/leagueName";
    let url = "http://localhost:9000/matchplay/leagueName";
    axios
      .get(url + "?pageNum=" + this.state.pageNum)
      .then((response) => {
        this.setState(
          {
            leagueName: response.data.league_name,
            leagueId: response.data.league_id,
          },
          () => this.list()
        );
      })
      .catch((error) => {
        console.log("list 에러:" + error);
      });
  };

  list = (e) => {
    if (this.state.leagueId === undefined) {
      return;
    }
    // let url =
    //   "http://192.168.0.108:9000/matchplay/leagueRanking?id=" +
    //   this.state.leagueId;
    let url =
      "http://localhost:9000/matchplay/leagueRanking?id=" + this.state.leagueId;
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
  reload = () => {
    window.location.reload();
  };
  componentDidMount() {
    this.leagueName();
  }
  render() {
    return (
      <div style={{ width: "95%" }}>
        <div
          style={{
            position: "absolute",
            paddingTop: "20px",
            paddingLeft: "20px",
            // width: "100%",
          }}
          className="txt8"
          align="left"
        >
          <span style={{ color: "#503396", fontWeight: "bolder" }}>
            {this.state.leagueName}
          </span>{" "}
          리그 순위{" "}
        </div>
        <div>
          <button
            style={{
              float: "right",
              position: "relative",
              right: "5%",
              bottom: "-15px",
              border: "none",
              backgroundColor: "#503396",
              color: "white",
              fontSize: "11pt",
              borderRadius: "5px",
              height: "30px",
            }}
            onClick={this.reload.bind(this)}
          >
            현재
          </button>
        </div>
        <div>
          <LeagueName
            prev={this.prevSeason.bind(this)}
            next={this.nextSeason.bind(this)}
            name={this.state.leagueName}
          ></LeagueName>
        </div>
        <div align="center">
          <table className="rankingTable txt8">
            <thead>
              <tr>
                <th
                  width="80"
                  style={{
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                  }}
                >
                  순위
                </th>
                <th width="300">팀</th>
                <th width="111">경기수</th>
                <th width="100">승</th>
                <th width="100">무</th>
                <th width="100">패</th>
                <th
                  width="75"
                  style={{
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                  }}
                >
                  승점
                </th>
              </tr>
            </thead>
          </table>
          <table className="rankingTable txt8" style={{}}>
            <tbody>
              <Scrollbars
                className="ReScroll"
                style={{
                  width: "900px",
                  height: "250px",
                }}
                align="center"
              >
                {this.state.leagueDatas.map((item, idx) => {
                  return <LeagueRankRow row={item} idx={idx}></LeagueRankRow>;
                })}
              </Scrollbars>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default LeagueRanking;
