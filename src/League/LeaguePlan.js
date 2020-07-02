import React, { Component } from "react";
import Axios from "axios";
import LeaguePlanItem from "./LeaguePlanItem";
import LeagueDate from "./LeagueDate";
import Scrollbars from "react-custom-scrollbars";

class LeaguePlan extends Component {
  state = {
    leaguePlan: [],
    leagueDate: "",
    pageNum: 0,
  };
  leaguePlan = (e) => {
    // let url = "http://192.168.0.108:9000/matchplay/leaguePlan";
    let url = "http://localhost:9000/matchplay/leaguePlan";
    Axios.get(url)
      .then((response) => {
        this.setState({
          leaguePlan: response.data,
        });
        console.log(this.state.leaguePlan);
      })
      .catch((error) => {
        console.log("list 에러:" + error);
      });
  };

  leagueDate = (e) => {
    // let url = "http://192.168.0.108:9000/matchplay/leagueDate";
    let url = "http://localhost:9000/matchplay/leagueDate";
    Axios.get(url + "?id=" + 5 + "&pageNum=" + this.state.pageNum)
      .then((response) => {
        this.setState(
          {
            leagueDate: response.data,
          },
          () => console.log(this.state.leagueDate)
        );
      })
      .catch((error) => {
        console.log("list 에러:" + error);
      });
  };
  nextRound = (e) => {
    this.setState(
      {
        pageNum:
          this.state.leagueDate != ""
            ? this.state.pageNum + 1
            : this.state.pageNum,
      },
      () => this.leagueDate()
    );
  };
  prevRound = (e) => {
    this.setState(
      {
        pageNum:
          this.state.pageNum == 0 ? this.state.pageNum : this.state.pageNum - 1,
      },
      () => this.leagueDate()
    );
  };
  componentDidMount() {
    this.leaguePlan(); //날짜별 경기
    this.leagueDate(); //날짜
  }

  render() {
    return (
      <div align="center">
        <div
          style={{
            backgroundColor: "#503396",
            height: "50px",
            lineHeight: "50px",
            borderRadius: "5px",
          }}
        >
          <LeagueDate
            date={this.state.leagueDate}
            next={this.nextRound.bind(this)}
            prev={this.prevRound.bind(this)}
          ></LeagueDate>
        </div>
        <hr></hr>
        <Scrollbars
          className="ReScroll"
          style={{
            width: "100%",
            height: "250px",
          }}
        >
          {this.state.leaguePlan.map((item, idx) =>
            item.round_date == this.state.leagueDate ? (
              <LeaguePlanItem
                searchDate={this.state.leagueDate}
                item={item}
                key={idx}
              ></LeaguePlanItem>
            ) : (
              ""
            )
          )}
        </Scrollbars>
      </div>
    );
  }
}

export default LeaguePlan;
