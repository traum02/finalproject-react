import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/Reservation.css";

class SelectTeam extends Component {
  render() {
    return (
      <div align="center" style={{ height: "500px", lineHeight: "500px" }}>
        <div>
          <Link to={{ pathname: "/SelectPlace/0" }}>
            <div className="selectType">개인</div>
          </Link>
          <Link
            to={{
              pathname: "/SelectPlace/1",
            }}
          >
            <div className="selectType">팀</div>
          </Link>
        </div>
        <Link
          to={{
            pathname: "/",
          }}
        >
          <button>홈</button>
        </Link>
      </div>
    );
  }
}

export default SelectTeam;
