import React, { useRef, useEffect, useState } from "react";
import Modal from "react-modal";
import logo from "../image/logo.png";
import kickin from "../image/kickin.png";
import hand from "../image/hand.png";
import time from "../image/time.jpg";
import backpass from "../image/backpass.png";
import goal from "../image/goal.png";
import foul from "../image/foul.png";
import img from "../image/x-img.png";
import Axios from "axios";

const modalstyles = {
  content: {
    top: "40%",
    left: "20%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
};
function MakeLeaguePlan() {
  // const url = "http://192.168.0.108:9000/matchplay/makeLeaguePlan";
  const url = "http://localhost:9000/matchplay/makeLeaguePlan";

  Axios.post(url)
    .then((res) => {
      alert("리그 일정 생성 완료");
    })
    .catch((err) => {
      console.log(err);
    });
}

function LeagueJoin() {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [chkVal, setChkVal] = useState("off");
  const chkApp = useRef();
  function openModal() {
    setIsOpen(true);
  }
  const onChange = (e) => {
    if (e.target.value === "off") {
      setChkVal("on");
    } else {
      setChkVal("off");
    }
  };
  const chk = (e) => {
    if (chkVal === "off") {
      alert("리그 참여 신청에는 동의가 필요합니다.");
      return;
    }
    joinLeague();
  };

  const joinLeague = () => {
    alert("join");
    // const url = "http://192.168.0.108:9000/matchplay/joinLeague";
    const url = "http://localhost:9000/matchplay/joinLeague";

    Axios.post(url)
      .then(() => {
        console.log("참여");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [memberData, setMemberData] = useState([]);

  function GetMemberData() {
    // const url = "http://192.168.0.108:9000/matchplay/memberdata?id=";
    const url = "http://localhost:9000/matchplay/memberdata?id=";

    Axios.get(url + window.sessionStorage.getItem("id"))
      .then((res) => {
        setMemberData(res.data);
        console.log(memberData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log("Asdasd");
    GetMemberData();
  }, []);

  return (
    <div>
      <div className="information">
        <div align="center">
          <div className="leagueText txt8">
            <div className="txt5 leagueNotice" align="center">
              리그 안내
            </div>
            <div align="left">
              1. 팀 또는 클럽에 소속된 풋살인이면 누구나 참가할 수 있습니다.
              <br></br> 2. 리그는 현재 서울의 모든 풋살인들이 참가할 수 있으며
              서울 25개구에서 개최되는 지역리그로 서울의 풋살인과 자웅을 겨루게
              됩니다.<br></br>
              3. 1년에 상하반기 두 번의 리그가 진행됩니다<br></br>
              4. 참가 기간에는 제한있으며 리그 시작 전까지 신청 가능합니다.
              <br></br>5. 참가 신청은 팀장만 가능합니다.
            </div>
          </div>
          <button
            onClick={
              window.sessionStorage.getItem("id") == null
                ? () => alert("로그인필요")
                : openModal
            }
            className="leaguejoin"
          >
            참가 신청
          </button>
          {window.sessionStorage.getItem("id") != null &&
            memberData.grade !== 0 && (
              <button
                onClick={MakeLeaguePlan.bind(this)}
                style={{
                  float: "right",
                  position: "relative",
                  top: "50px",
                  right: "20px",
                  backgroundColor: "#aa3f68",
                }}
                className="leaguejoin"
              >
                일정 생성
              </button>
            )}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onafterOepn={afterOpenModal}
          onREquestClose={closeModal}
          style={modalstyles}
          contentLable="Example Modal"
        >
          <div align="center">
            <div>
              <div
                // className="x"
                onClick={closeModal}
                style={{
                  position: "relative",
                  top: "0px",
                  right: "-180px",
                  border: "none",
                  cursor: "pointer",
                  width: "24px",
                }}
              >
                <img classNmame="img" src={img} alt="" />
              </div>
            </div>
            <div>
              <img src={logo} className="logo" alt="" />
            </div>
            <div align="center">
              <table
                class="table table-bordered roleguide"
                style={{
                  width: "300px",
                  marginLeft: "0px",
                }}
              >
                <tr>
                  <td colspan="2">
                    <b>Role Guide</b>
                  </td>
                </tr>
                <tr>
                  <td width="300">
                    <img src={kickin} className="emogi" alt="" />
                    <br />

                    <b>킥인은 발로</b>
                  </td>
                  <td width="300">
                    <img src={hand} className="emogi" alt="" />
                    <br />
                    <b>골킥은 손으로</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={time} className="emogi" alt="" />
                    <br />
                    <b>킥은 4초이내</b>
                  </td>
                  <td>
                    <img src={backpass} className="emogi" alt="" />
                    <br />
                    <b>백패스 금지</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={foul} className="emogi" alt="" />
                    <br />
                    <b>파울은 5회까지만</b>
                  </td>
                  <td>
                    <img src={goal} className="emogi" alt="" />
                    <br />
                    <b>위반시 간접 프리킥</b>
                  </td>
                </tr>
              </table>
            </div>
            <div className="schedule">
              <b style={{ color: "red" }}>Schedule & Place</b>
              <p>
                경기 일정 및 경기장소는 경기일정에 따라 임의로 지정됨을
                알려드립니다.
              </p>
              <p>일정 및 장소는 변경이 불가하며</p>
              <p>불가피한 사정으로 경기 불참시 기권패로 처리합니다.</p>
              <p>경기 일정 및 경기장소는 리그개막 후 확인하실 수 있습니다.</p>
            </div>
            <div className="refund">
              <b style={{ color: "red" }}>Charge & Refund</b>
              <p>리그 참여 비용은 60만포인트 입니다.</p>
              <p>리그 신청기간에만 환불정책따라 환불이 가능합니다.</p>
              <p>신청 기간 이후에는 환불이 불가 하며,</p>
              <p>이를 숙지 후 리그 신청 바랍니다.</p>
            </div>
            <form onSubmit={chk.bind(this)}>
              <div className="leagueagree">
                <b style={{ color: "red" }}>Application</b>
                <p>위의 사항에 동의하며,</p>
                <p>리그에 참여 합니다.</p>
                <b>동의</b>
                <input
                  type="checkbox"
                  ref={chkApp}
                  name="leagueAgree"
                  onChange={onChange.bind(this)}
                  value={chkVal}
                ></input>
              </div>
              <button type="submit" className="agbtn">
                참여하기
              </button>
              &nbsp;&nbsp;&nbsp;
              <button onClick={closeModal} className="agbtn">
                닫기
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default LeagueJoin;
