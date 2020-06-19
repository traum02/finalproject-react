import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import TimeTable from "./TimeTable";

class PlaceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: [],
    };
  }

  getTime = () => {
    let id = this.props.row.place_id;
    let type = this.props.type;
    let date = this.props.date;
    // const url =
    // "http://192.168.0.108:9000/matchplay/placelist/gettime?place_id=";
    const url = "http://localhost:9000/matchplay/placelist/gettime?place_id=";

    Axios.get(url + id + "&res_type=" + type + "&res_time=" + date)
      .then((res) => {
        this.setState({
          time: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getTime();
  }
  // getSnapshotBeforeUpdate
  componentDidUpdate(prevProps) {
    if (this.props.row !== prevProps.row) this.getTime();
  }
  render() {
    return (
      <div>
        <div style={{ border: "1px solid gray" }}>
          <div style={{ display: "inline-block" }}>
            <img
              src={
                // "http://192.168.0.108:9000/matchplay/image/" +
                "http://localhost:9000/matchplay/image/" +
                this.props.row.place_pic
              }
              style={{ maxHeight: "150px" }}
              alt=""
            />
          </div>
          <div
            style={{
              display: "inline-block",
              lineHeight: "50px",
            }}
          >
            <div
              style={{ fontSize: "20pt", fontWeight: "bolder" }}
              align="left"
            >
              <div style={{ marginBottom: "-20px", paddingLeft: "15px" }}>
                {this.props.row.place_name}
              </div>
              {/* {this.props.row.place_price} */}
              <span style={{ fontSize: "15pt", padding: "35px" }}>
                {"주소 : " + this.props.row.place_addr}
              </span>
            </div>
            <div>
              {this.state.time.map((item, idx) => (
                <TimeTable
                  item={item}
                  key={idx}
                  max={this.props.row.place_max}
                  selectType={this.props.type}
                />
              ))}
            </div>
            {this.props.row.place_etc}
            <Link
              to={{
                pathname: "/SelectDetail",
                state: {
                  place_id: this.props.row.place_id,
                  type: this.props.type,
                  date: this.props.date,
                },
              }}
            >
              <button
                style={{
                  border: "1px solid black",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "5px",
                  width: "100px",
                  height: "30px",
                  cursor: "pointer",
                }}
              >
                선택
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PlaceItem;
