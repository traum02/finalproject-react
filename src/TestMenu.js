import React, { Component } from "react";
import { Link } from "react-router-dom";

class TestMenu extends Component {
  render() {
    return (
      <div align="center" style={{ height: "500px", lineHeight: "500px" }}>
        <Link to={{ pathname: "/Reservation" }}>
          <div className="selectType">match</div>
        </Link>
        <Link
          to={{
            pathname: "/League",
          }}
        >
          <div className="selectType">리그</div>
        </Link>
      </div>
    );
  }
}

export default TestMenu;
