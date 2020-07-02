import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../Css/MainStyle.css";
import LoginForm from "../pages/LoginForm";
import Axios from "axios";

const Menu = (props) => {
  const [myteamnum, setMyteamnum] = useState(0);

  //소속된 팀 num 구하기
  const getMyTeamNum = (e) => {
    const url =
      "http://localhost:9000/matchplay/teammember/myteamnum?member_id=";

    Axios.get(url + window.sessionStorage.getItem("id"))
      .then((res) => {
        setMyteamnum(res.data);

        console.log("내 팀넘버===" + res.data);

        // this.props.Onlist();
      })
      .catch((err) => {
        console.log("팀 넘버 구하기 에러" + err);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      getMyTeamNum();
    });
  }, []);

  const notTeam = () => {
    alert("로그인을 해주세요");
    return false;
  };

  const MoveHref = () =>{
    alert("로그인이 필요합니다.");
  }

  return (
    <div className="Menu5">
      <div className="Menu1">
        <ul>
          <li>
            <NavLink exact to="/" style={{ textDecoration: "none" }}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/Reservation" style={{ textDecoration: "none" }}>
              Match
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/League" style={{ textDecoration: "none" }}>
              League
            </NavLink>
          </li>
          <li>
          {sessionStorage.length === 1 ? (
            <NavLink
              exact
              to={"/Team/" + myteamnum}
              style={{ textDecoration: "none" }}
            >
              Team
            </NavLink>
             ) : ( 
             <NavLink
              exact
              to="/"
              style={{ textDecoration: "none" }}
              onClick={() => notTeam()}
            >
              Team
            </NavLink>
            )}
          </li>
          <li>
            <NavLink to="/QnA" style={{ textDecoration: "none" }}>
              QnA
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="Menu2">
        <ul>
        <li>
            {
                sessionStorage.length===1
                ?
                <NavLink exact to="/MyPage" style={{ textDecoration: 'none' }}>MyPage</NavLink>
                :
                <NavLink exact to="" onClick={MoveHref} style={{ textDecoration: 'none' }}>MyPage</NavLink>   
            } 
        </li>
          <li style={{ width: "200px" }} align="right">
            {/* <NavLink exact to="/Login" style={{ textDecoration: 'none' }}>Login</NavLink> */}
            <LoginForm> </LoginForm>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
