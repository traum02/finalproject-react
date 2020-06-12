import React, { Component } from "react";

class TimeTable extends Component {
  render() {
    return (
      <div
        style={{
          display: "inline-block",
          border: "1px solid gray",
          backgroundColor:
            this.props.item.time_id !== 0 ? "lightgray" : "lightyellow",
          width: "80px",
        }}
      >
        {this.props.item.time_val}
      </div>
    );
  }
}

export default TimeTable;
