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
    const url =
      // "http://192.168.0.108:9000/matchplay/placelist/gettime?place_id=";
      "http://localhost:9000/matchplay/placelist/gettime?place_id=";

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
        <div
          style={{
            border: "2px solid #503396",
            width: "1342px",
            // top: "10px",
            height: "190px",
            // verticalAlign: "top",
          }}
          align="left"
        >
          <div
            style={{
              height: "186px",
              width: "300px",
              display: "inline-block",
              verticalAlign: "top",
              borderRight: "2px solid #503396",
              overflow: "hidden",
            }}
            align="center"
          >
            <img
              src={
                // "http://192.168.0.108:9000/matchplay/image/" +
                "http://localhost:9000/matchplay/image/" +
                this.props.row.place_pic.split("/")[0]
              }
              style={{ height: "230px", width: "350px" }}
              alt=""
            />
          </div>
          <div
            style={{
              width: "1036px",
              display: "inline-block",
              lineHeight: "50px",
              height: "190px",
            }}
          >
            <div
              style={{
                fontSize: "20pt",
                fontWeight: "bolder",
                marginBottom: "-10px",
              }}
              align="left"
            >
              <div style={{ marginBottom: "-20px", paddingLeft: "15px" }}>
                {this.props.row.place_name}
              </div>
              {/* {this.props.row.place_price} */}
              <span style={{ fontSize: "15pt", padding: "35px" }}>
                {"주소 : " + this.props.row.place_addr}
              </span>
              {this.props.memberData.grade !== 0 && (
                <div style={{ float: "right", marginRight: "45px" }}>
                  <Link
                    to={{
                      pathname: "/Updateplace",
                      state: {
                        place_id: this.props.row.place_id,
                        type: this.props.type,
                        date: this.props.date,
                      },
                    }}
                    // style={{ float: "right" }}
                  >
                    <button
                      style={{
                        border: "1px solid gray",
                        backgroundColor: "#aa3f68",
                        color: "white",
                        borderRadius: "5px",
                        width: "100px",
                        height: "30px",
                        cursor: "pointer",
                        lineHeight: "25px",
                        fontSize: "12pt",
                      }}
                    >
                      구장 수정
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <hr style={{ width: "1040px" }}></hr>
            <div>
              <div
                align="left"
                style={{ display: "inline-block", margin: "15px" }}
              >
                {this.state.time.map((item, idx) => (
                  <TimeTable
                    item={item}
                    key={idx}
                    max={this.props.row.place_max}
                    selectType={this.props.type}
                    res_date={this.props.date}
                  />
                ))}
              </div>
              {/* <div style={{ display: "inline-block", paddingLeft: "40px" }}>
              {this.props.row.place_etc}
            </div> */}
              <Link
                to={{
                  pathname: "/SelectDetail",
                  state: {
                    place_id: this.props.row.place_id,
                    type: this.props.type,
                    date: this.props.date,
                  },
                }}
                // style={{ float: "right" }}
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
                    lineHeight: "25px",
                  }}
                >
                  선택
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlaceItem;
