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
          {this.props.placeName}
          {"id" + this.props.row.place_id}
          {this.props.date}
          {this.props.row.place_name}
          {this.props.row.place_price}
          {this.props.row.place_addr}
          <img
            src={
              "http://localhost:9000/matchplay/image/" +
              this.props.row.place_pic
            }
            style={{ maxWidth: "100px" }}
            alt=""
          />
          <div>
            {this.state.time.map((item, idx) => (
              <TimeTable item={item} key={idx} />
            ))}
          </div>
          {this.props.row.place_id}
          {this.props.row.place_etc}
          <Link
            to={{
              pathname: "/SelectDetail",
              state: {
                place_id: this.props.row.place_id,
                type: this.props.row.type,
                date: this.props.date,
              },
            }}
          >
            <button>선택</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default PlaceItem;
