import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class MyPageSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // memberData: this.props.memberData,
    };
  }

  render() {
    return (
      <div
        style={{
          position: "absolute",
          width: "230px",
          height: "700px",
          backgroundColor: "#503396",
          border: "3px",
        }}
      >
        <table
          style={{
            width: "300px",
            height: "550px",
            fontSize: "20pt",
            border: "2px",
            marginTop: "62px",
            marginLeft: "20px",
          }}
          className="TemaMenu"
        >
          <tbody>
            <tr>
              <td align="center" width="200px">
                <NavLink
                  exact
                  to="/Mypage"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <button
                    type="button"
                    name="Hover"
                    className="button-container-2"
                    style={{
                      width: "250px",
                      height: "80px",
                      backgroundColor: "black",
                      border: "2px solid white",
                      borderRadius: "20px",
                      boxShadow: "3px 3px 3px 0px gray",
                    }}
                  >
                    MyPage Main
                  </button>
                </NavLink>
              </td>
            </tr>
            <tr>
              <td align="center">
                <NavLink
                  exact
                  to="/Mypage/Account"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <button
                    type="button"
                    style={{
                      width: "250px",
                      height: "80px",
                      backgroundColor: "black",
                      border: "2px solid white",
                      borderRadius: "20px",
                      boxShadow: "3px 3px 3px 0px gray",
                    }}
                  >
                    Account
                  </button>
                </NavLink>
              </td>
            </tr>
            <tr>
              <td align="center">
                <NavLink
                  exact
                  to={{
                    pathname: "/Mypage/ReservationHistory",
                    // state: { name: this.state.memberData.name },
                  }}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <button
                    type="button"
                    style={{
                      width: "250px",
                      height: "80px",
                      backgroundColor: "black",
                      border: "2px solid white",
                      borderRadius: "20px",
                      boxShadow: "3px 3px 3px 0px gray",
                    }}
                  >
                    Reservation
                  </button>
                </NavLink>
              </td>
            </tr>
            <tr>
              <td align="center">
                <NavLink
                  exact
                  to="/Mypage/MyMatchHistory"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <button
                    type="button"
                    style={{
                      width: "250px",
                      height: "80px",
                      backgroundColor: "black",
                      border: "2px solid white",
                      borderRadius: "20px",
                      boxShadow: "3px 3px 3px 0px gray",
                    }}
                  >
                    Match
                  </button>
                </NavLink>
              </td>
            </tr>
            <tr>
              <td align="center">
                <NavLink
                  exact
                  to="/Mypage/PointHistory"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <button
                    type="button"
                    style={{
                      width: "250px",
                      height: "80px",
                      backgroundColor: "black",
                      border: "2px solid white",
                      borderRadius: "20px",
                      boxShadow: "3px 3px 3px 0px gray",
                    }}
                  >
                    Point
                  </button>
                </NavLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default MyPageSidebar;
