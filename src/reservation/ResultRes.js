import React, { Component } from "react";
import { Link } from "react-router-dom";

class ResultRes extends Component {
  render() {
    return (
      <div>
        asdasdas
        <Link to={{ pathname: "/" }}>
          <div className="selectType">Home</div>
        </Link>
      </div>
    );
  }
}

export default ResultRes;
