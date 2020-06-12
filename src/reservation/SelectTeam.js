import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/Reservation.css";

class SelectTeam extends Component {
  render() {
    return (
      <div align="center" style={{ height: "500px", lineHeight: "500px" }}>
        <Link
          to={{ pathname: "/SelectPlace/type=0", state: { selectType: "0" } }}
        >
          <div className="selectType">개인</div>
        </Link>
        <Link
          to={{
            pathname: "/SelectPlace/type=1",
            state: { selectType: "1" },
          }}
        >
          <div className="selectType">팀</div>
        </Link>
      </div>
    );
  }
}

export default SelectTeam;
