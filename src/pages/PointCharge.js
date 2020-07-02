import React, { Component } from "react";
import "../Css/MainStyle.css";
import { NavLink } from "react-router-dom";
import Axios from "axios";

class PointCharge extends Component {
  state = {
    memberData: [],
    name: "",
    point: 0,
  };
  getMemberData = () => {
    // const url = "http://192.168.0.108:9000/matchplay/memberdata?id=";
    const url = "http://localhost:9000/matchplay/memberdata?id=";

    Axios.get(url + window.sessionStorage.getItem("id"))
      .then((res) => {
        this.setState(
          {
            memberData: res.data,
          },
          () => console.log(this.state.memberData)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = () => {
    if (this.state.point < 1000 || this.state.point % 1000 !== 0) {
      alert("1000원 단위로 입력해 주세요.");
      return;
    } else {
      this.onInsertPoint();
    }
  };

  onInsertPoint = () => {
    const url = "http://localhost:9000/matchplay/mypage/chargepoint";

    Axios.post(url, { id: sessionStorage.id, point: this.state.point })
      .then((res) => {
        alert(this.state.point + "원이 충전되었습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getMemberData();
  }

  render() {
    return (
      <div align="center" style={{ marginTop: "60px" }}>
        <b style={{ fontSize: "13pt", marginLeft: "-290px", color: "DimGrey" }}>
          현재 나의 포인트 잔액{" "}
        </b>
        <br />
        <b style={{ fontSize: "20pt", marginLeft: "-300px" }}>
          {this.state.memberData.point} Point
        </b>
        <br />
        <br />
        <div
          style={{
            border: "3px solid #503396",
            width: "500px",
            height: "400px",
            borderRadius: "30px",
            backgroundColor: "",
          }}
        >
          <form onSubmit={this.onSubmit.bind(this)}>
            <table width="500px">
              <tbody>
                <tr>
                  <td colSpan="2" valign="bottom" style={{ height: "65px" }}>
                    <span style={{ marginLeft: "150px", fontSize: "10pt" }}>
                      1,000원 단위로 충전이 가능합니다.
                    </span>
                  </td>
                </tr>
                <tr valign="top">
                  <td
                    align="center"
                    width="150px"
                    height="50px"
                    style={{ fontSize: "15pt" }}
                  >
                    충전금액
                  </td>
                  <td style={{ fontSize: "15pt" }}>
                    <input
                      type="text"
                      placeholder="충전할 금액을 입력하세요."
                      name="point"
                      style={{
                        width: "280px",
                        height: "40px",
                        fontSize: "15pt",
                      }}
                      onChange={this.onChange.bind(this)}
                    />
                    <span style={{ marginLeft: "15px" }}>원</span>
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    width="150px"
                    height="80px"
                    style={{ fontSize: "15pt" }}
                  >
                    입금자명
                  </td>
                  <td>
                    <input
                      name="name"
                      type="text"
                      placeholder="입금자 이름"
                      style={{
                        width: "280px",
                        height: "40px",
                        fontSize: "15pt",
                      }}
                      onChange={this.onChange.bind(this)}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    align="center"
                    style={{ fontSize: "11pt", height: "120px" }}
                  >
                    위의 입력한 입금자명으로 정확한 금액을 입금해주세요.
                    <br />
                    입력한 정보와 다를 시 포인트충전이 지연될 수 있습니다.
                    <br />
                    <br />
                    <span style={{ color: "#503396", fontWeight: "bold" }}>
                      현재는 무통장 입금만 가능합니다.
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" align="center">
                    <button
                      type="submit"
                      style={{
                        borderRadius: "20px",
                        borderColor: "#503396",
                        backgroundColor: "#503396",
                        color: "white",
                        width: "200px",
                        height: "40px",
                        fontSize: "15pt",
                        marginTop: "10px",
                      }}
                    >
                      충전 신청
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <b>MatchPlay - Best Fusal Flatform</b>
      </div>
    );
  }
}

export default PointCharge;
