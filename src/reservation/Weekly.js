import React, { Component } from "react";

class Weekly extends Component {
  state = {
    active: false,
  };

  onPressArrowLeft = (e) => {
    e.preventDefault();
    this.props.onLeft();
  };
  onPressArrowRight = (e) => {
    e.preventDefault();
    this.props.onRight();
  };
  list = (e) => {
    let val = e.currentTarget.getAttribute("val");
    console.log(val + "vals");
    this.props.list(val);
    this.toggle.bind(this);
  };
  toggle(e) {
    this.setState({ active: !this.state.active });
    for (
      let index = 0;
      index < document.querySelector(".weekly").parentElement.childElementCount;
      index++
    ) {
      document
        .querySelector(".weekly")
        .parentNode.children.item(index).style.backgroundColor = "white";
    }
    document.querySelector(".weekly").parentElement.style.backgroundColor = "";
    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    this.list(e);
  }
  render() {
    const e = [];
    for (let i = 0; i < this.props.info.length; i++) {
      let week = this.props.info[i].toString();
      let tmp = this.props.info[i].toLocaleString();
      let t = week.indexOf(",");
      tmp = tmp.substring(t + 1);
      let l = tmp.split(".");
      let val = "";
      for (let j = 0; j < 3; j++) {
        l[j] = l[j].replace(/ /gi, "");
      }
      for (let j = 0; j < 3; j++) {
        if (l[j].length === 1) {
          val += "0";
        }
        val += l[j];
      }

      //   val += l[0];
      //   if (l[1].length == 1) {
      //     val += "0";
      //   }
      //   val += l[1];
      //   if (l[2].length == 1) {
      //     val += "0";
      //   }
      //   val += l[2];
      //   val = val.substring(0, val.lastIndexOf("-")).replace(/ /g, "");
      let date = week.substring(t + 8, t + 11);
      week = week.substring(t + 1, t + 4);
      // let list = week + " " + date;
      e.push(
        <div
          className="weekly"
          onClick={this.list.bind(this)}
          key={i}
          val={val}
          style={{
            display: "inline-block",
            border: "1px solid gray",
            width: "80px",
            height: "80px",
            lineHeight: "25px",
            textAlign: "center",
            color: week === "Sun" ? "red" : "black",
            fontWeight: "bolder",
            borderRadius: "100px",
            margin: "10px",
            outline: "none",
            cursor: "pointer",
            backgroundColor: "white",
          }}
          onClick={this.toggle.bind(this)}
        >
          <div tabIndex={val} style={{ outline: "none", marginTop: "10px" }}>
            {week}
            {this.state.active}
          </div>
          <div tabIndex={val} style={{ fontSize: "20pt", outline: "none" }}>
            {date}
          </div>
        </div>
      );
    }
    return (
      <div>
        <div align="center">
          <div
            onClick={this.onPressArrowLeft.bind(this)}
            style={{ display: "inline-block" }}
          >
            --
          </div>
          <div style={{ display: "inline-block" }}>{e}</div>
          <div
            onClick={this.onPressArrowRight.bind(this)}
            style={{ display: "inline-block" }}
          >
            ++
          </div>
        </div>
      </div>
    );
  }
}

export default Weekly;
