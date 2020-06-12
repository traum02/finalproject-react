import React, { Component } from "react";
import Axios from "axios";
import TimeTable from "./TimeTable";
import MapContent from "./MapContent";

class SelectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dData: [],
      time: [],
      mapShow: "block",
    };
  }

  detailData = () => {
    let id = this.props.location.state.place_id;
    console.log(id);
    Axios.get("http://localhost:9000/matchplay/placelist/detail?id=" + id)
      .then((res) => {
        this.setState({
          dData: res.data,
        });
        console.log(this.state.dData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTime = () => {
    let id = this.props.location.state.place_id;
    let type = this.props.location.state.type;
    let date = this.props.location.state.date;
    console.log(date + "type123");
    Axios.get(
      "http://localhost:9000/matchplay/placelist/gettime?place_id=" +
        id +
        "&res_type=" +
        type +
        "&res_time=" +
        date
    )
      .then((res) => {
        this.setState({
          time: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  showMap = () => {
    if (this.state.mapShow === "block") {
      this.setState({
        mapShow: "none",
      });
    } else {
      this.setState({
        mapShow: "block",
      });
    }
  };
  componentDidMount() {
    this.detailData();
    this.getTime();
    this.setState({
      mapShow: "none",
    });
  }
  render() {
    const mapShow = {
      display: this.state.mapShow,
    };

    return (
      <div>
        <div id="mapcontainer" style={mapShow}>
          <MapContent></MapContent>
        </div>
        <button onClick={this.showMap.bind(this)}>위치</button>
        <div>
          {this.props.location.state.date}
          <br></br>
          {this.state.dData.place_name}
          <br></br>
          {this.state.dData.place_etc}
          <br></br>
          {this.state.dData.place_lat}
          <br></br>
          {this.state.dData.place_lng}
          <br></br>
          {this.state.dData.place_price}
          <br></br>
          {this.state.time.map((item, idx) => (
            <TimeTable item={item} key={idx} />
          ))}
        </div>
        <div align="center" style={{ margin: "50px" }}>
          <div
            style={{
              border: "1px solid gray",
              width: "100px",
              height: "100px",
              lineHeight: "100px",
              display: "inline-block",
            }}
          >
            1팀
          </div>
          <div
            style={{
              border: "1px solid gray",
              width: "100px",
              height: "100px",
              lineHeight: "100px",
              display: "inline-block",
            }}
          >
            2팀
          </div>
        </div>
        <button type="button" onClick={this.props.history.goBack.bind(this)}>
          back
        </button>
        <div>
          <button>예약</button>
        </div>
      </div>
    );
  }
}

export default SelectDetail;
