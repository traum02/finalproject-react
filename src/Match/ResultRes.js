import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Home from "../image/home.png";

class ResultRes extends Component {
  render() {
    return (
      <div style={{ marginTop: "100px" }}>
        <div align="center">
          <div
            style={{
              border: "1px solid gray",
              width: "1000px",
              height: "200px",
              lineHeight: "200px",
              backgroundColor: "rgba(80, 51, 150, 0.3)",
            }}
          >
            <div className="txt5">예약이 완료되었습니다.</div>
            <div
              style={{
                height: "50px",
                lineHeight: "50px",
                border: "1px solid #503396",
                width: "140px",
                color: "white",
                backgroundColor: "#503396",
                marginTop: "-50px",
              }}
            >
              <NavLink to={{ pathname: "/" }}>
                <div style={{ width: "140px" }}>
                  <img
                    src={Home}
                    style={{
                      height: "30px",
                      filter: "invert(100%)",
                      marginTop: "-15px",
                    }}
                    alt=""
                  ></img>
                  <span
                    className="txt7"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      WebkitTextDecorationLine: "none",
                    }}
                  >
                    홈으로
                  </span>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResultRes;
