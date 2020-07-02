import React, { Component } from "react";
import goBack from "../image/goback.png";

class GoBack extends Component {
  toTop = () => {
    window.scroll(0, 0);
  };

  render() {
    return (
      <div>
        {this.props.el === "window" && (
          <div
            style={{
              position: "fixed",
              right: "50px",
              bottom: "150px",
              // border: "1px solid #503396",
              // backgroundColor: "#503396",
              height: "50px",
              width: "50px",
              lineHeight: "50px",
              borderRadius: "50px",
              color: "white",
              cursor: "pointer",
            }}
            onClick={this.toTop.bind(this)}
          >
            <img
              src={goBack}
              style={{ width: "48px", transform: "rotate(90deg)" }}
              alt=""
            ></img>
          </div>
        )}
        <div
          style={{
            position: "fixed",
            right: "50px",
            bottom: "100px",
            // border: "1px solid #503396",
            // backgroundColor: "#503396",
            height: "50px",
            width: "50px",
            lineHeight: "50px",
            borderRadius: "50px",
            color: "white",
            cursor: "pointer",
          }}
          onClick={this.props.history.goBack.bind(this)}
        >
          <img src={goBack} style={{ width: "48px" }} alt=""></img>
        </div>
      </div>
    );
  }
}

export default GoBack;
