import React, { useState, Component, useEffect, Link } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Modal from "react-modal";
import "../Css/LoginForm.css";
import JoinForm from "./JoinForm.js";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "../image/x-img.png";
import { NavLink, Route } from "react-router-dom";
import axios from "axios";

Modal.setAppElement("#root");

function LoginForm() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [idx, setIdx] = useState(0);

  const [id, setId] = useState(0);
  const [name, setName] = useState(0);
  const [birth, setBirth] = useState(0);
  const [email, setEmail] = useState(0);
  const [chk_name, setChkName] = useState(0);
  const [chk_email, setChkEmail] = useState(0);
  const [chk_birth, setChkBirth] = useState(0);
  const [chk_id, setChkId] = useState(0);
  const [pwd, setPwd] = useState(0);

  const [Lid, setLid] = useState(0);
  const [Lpwd, setLpwd] = useState(0);
  const [Lchk_pwd, setLchk_pwd] = useState(0);

  const [logged, setLogged] = useState("");

  const getLogged = () => {
    if (sessionStorage.length === 1) {
      setLogged(true);
    }
  };

  //Logout Func
  const onLogout = () => {
    setLogged(false);
    //SessionStorage clear
    window.sessionStorage.clear();
    alert("로그아웃되었습니다.");
    window.location.assign("/");
  };

  useEffect(() => {
    setTimeout(() => {
      getLogged();
    });
  }, []);

  const checkId = (e) => {
    let url = "http://localhost:9000/matchplay/login/selId?id=" + id;
    // let url = "http://192.168.0.108:9000/matchplay/login/selId?id=" + id;

    axios
      .get(url)
      .then((responseData) => {
        //url 로부터 받은 데이타 state 변수에 넣기
        console.log(
          "select 함수 내 responseData.data1(id)=" + responseData.data
        );

        setChkId(responseData.data);

        //return responseData.data;
        console.log("chk_id:" + chk_id);
      })
      .catch((error) => {
        console.log("list 에러:" + error);
        //return 0;
      });
  };

  const checkName = (e) => {
    let url = "http://localhost:9000/matchplay/member/selName?name=" + name;
    // let url = "http://192.168.0.108:9000/matchplay/member/selName?name=" + name;

    axios
      .get(url)
      .then((responseData) => {
        //url 로부터 받은 데이타 state 변수에 넣기
        console.log("select 함수 내 responseData.data1=" + responseData.data);

        setChkName(responseData.data);

        //return responseData.data;
        console.log("chk_name:" + chk_name);
      })
      .catch((error) => {
        console.log("list 에러:" + error);
        //return 0;
      });
  };

  const checkName1 = (e) => {
    let url =
      "http://localhost:9000/matchplay/member/searchName?id=" +
      // "http://192.168.0.108:9000/matchplay/member/searchName?id=" +
      id +
      "&name=" +
      name;

    axios
      .get(url)
      .then((responseData) => {
        //url 로부터 받은 데이타 state 변수에 넣기
        console.log(
          "select 함수 내 responseData.data2(name)=" + responseData.data
        );

        setChkName(responseData.data);

        //return responseData.data;
        console.log("this.state.chk_name:" + chk_name);
      })
      .catch((error) => {
        console.log("list 에러:" + error);
        //return 0;
      });
  };

  const checkBirth = (e) => {
    let url =
      "http://localhost:9000/matchplay/member/selBirth?name=" +
      // "http://192.168.0.108:9000/matchplay/member/selBirth?name=" +
      name +
      "&birth=" +
      birth;

    axios
      .get(url)
      .then((responseData) => {
        //url 로부터 받은 데이타 state 변수에 넣기
        console.log("select 함수 내 responseData.data2=" + responseData.data);

        setChkBirth(responseData.data);

        //return responseData.data;
        console.log("this.state.chk_birth:" + chk_birth);
      })
      .catch((error) => {
        console.log("list 에러:" + error);
        //return 0;
      });
  };

  const checkEmail = (e) => {
    let url =
      "http://localhost:9000/matchplay/member/searchEmail?name=" +
      // "http://192.168.0.108:9000/matchplay/member/searchEmail?name=" +
      name +
      "&email=" +
      email;

    axios
      .get(url)
      .then((responseData) => {
        //url 로부터 받은 데이타 state 변수에 넣기
        console.log("select 함수 내 responseData.data2=" + responseData.data);
        findId();
        findPwd();
        setChkEmail(responseData.data);

        //return responseData.data;
        console.log("this.state.chk_email:" + chk_email);
      })
      .catch((error) => {
        console.log("list 에러:" + error);
        //return 0;
      });
  };

  const findId = (e) => {
    let url = "http://localhost:9000/matchplay/member/findId?email=" + email;
    // let url =
    //   "http://192.168.0.108:9000/matchplay/member/findId?email=" + email;

    axios
      .get(url)
      .then((responseData) => {
        //url 로부터 받은 데이타 state 변수에 넣기
        console.log("select 함수 내 responseData.data1=" + responseData.data);

        setId(responseData.data);

        //return responseData.data;
        console.log("this.state.id:" + id);
      })
      .catch((error) => {
        console.log("list 에러:" + error);
        //return 0;
      });
  };

  const checkLpwd = (e) => {
    let url =
      "http://localhost:9000/matchplay/login/selPwd?id=" +
      // "http://192.168.0.108:9000/matchplay/login/selPwd?id=" +
      Lid +
      "&pwd=" +
      Lpwd;

    axios
      .get(url)
      .then((responseData) => {
        //url 로부터 받은 데이타 state 변수에 넣기
        console.log("select 함수 내 responseData.data2=" + responseData.data);

        setLchk_pwd(responseData.data);

        //return responseData.data;
        console.log("Lchk_pwd:" + Lchk_pwd);
      })
      .catch((error) => {
        console.log("list 에러:" + error);
        //return 0;
      });
  };

  const _changeName = function() {
    const name_v = document.getElementsByName("name")[0].value;
    setName(name_v);
  };

  const _changeBirth = function() {
    const birth_v = document.getElementsByName("birth")[0].value;
    setBirth(birth_v);
  };

  const _changeEmail = function() {
    const email_v = document.getElementsByName("email")[0].value;
    setEmail(email_v);
  };

  const _changeId = function() {
    const id_v = document.getElementsByName("id")[0].value;
    setId(id_v);
  };

  const _changeLid = function() {
    const Lid_v = document.getElementById("Id").value;
    setLid(Lid_v);
  };

  const _changeLpassword = function() {
    const Lpassword_v = document.getElementById("Password").value;
    setLpwd(Lpassword_v);
  };

  const findPwd = (e) => {
    let url = "http://localhost:9000/matchplay/member/findPwd?id=" + id;
    // let url = "http://192.168.0.108:9000/matchplay/member/findPwd?id=" + id;

    axios
      .get(url)
      .then((responseData) => {
        //url 로부터 받은 데이타 state 변수에 넣기
        console.log("select 함수 내 responseData.data(5)=" + responseData.data);

        setPwd(responseData.data);

        //return responseData.data;
        console.log("this.state.pwd:" + pwd);
      })
      .catch((error) => {
        console.log("list 에러:" + error);
        //return 0;
      });
  };

  const onSubmit1 = (e) => {
    e.preventDefault();

    if (chk_name === 1 && chk_birth === 1 && chk_email === 1) {
      alert("아이디는 " + id + " 입니다.");
    } else {
      alert("아이디를 찾을 수 없습니다.");
      return 0;
    }
  };

  const onSubmit2 = (e) => {
    e.preventDefault();

    if (chk_id === 1 && chk_name === 1 && chk_birth === 1 && chk_email === 1) {
      alert("비밀번호는 " + pwd + " 입니다.");
    } else {
      alert("비밀번호를 찾을 수 없습니다.");
      return 0;
    }
  };

  const LoginEvent = function() {
    if (Lchk_pwd === 0) {
      alert("비밀번호가 일치하지 않습니다.");
      return 0;
    }
    if (Lchk_pwd === 1) {
      alert("로그인 성공");
      window.sessionStorage.setItem("id", Lid);
      setLogged(true);
      setModalIsOpen(false);
      window.location.reload();
    }
  };

  const Find = (
    <div className="Find-Modal">
      <Modal isOpen={modalIsOpen}>
        <Tabs defaultIndex={0} onSelect={(index) => console.log(index)}>
          <TabList className="Tab">
            <Tab>아이디 찾기</Tab>
            <Tab>비밀번호 찾기</Tab>
          </TabList>

          <TabPanel>
            <form className="form" onSubmit={onSubmit1}>
              <br />
              <strong>·이름</strong>
              <br />
              <input
                type="text"
                name="name"
                className="Input1"
                placeholder="이름 입력"
                onChange={() => _changeName()}
                onKeyUp={checkName.bind()}
              />
              <br />

              <strong>·생년월일</strong>
              <br />
              <input
                type="text"
                className="Input1"
                name="birth"
                placeholder="ex)19921030"
                onChange={() => _changeBirth()}
                onKeyUp={checkBirth.bind()}
              />
              <br />

              <strong>·E-mail</strong>
              <br />
              <input
                type="text"
                className="Input1"
                name="email"
                placeholder="ex) abc@matchground.com"
                onChange={() => _changeEmail()}
                onKeyUp={checkEmail.bind()}
              />
              <br />
              <button type="submit" class="btn btn-Info">
                아이디찾기
              </button>
              <button
                type="button"
                class="btn btn-Info"
                onClick={() => setModalIsOpen(false)}
              >
                닫기
              </button>
            </form>
          </TabPanel>
          <TabPanel>
            <form className="form" onSubmit={onSubmit2}>
              <br />
              <strong>·아이디</strong>
              <br />
              <input
                type="text"
                className="Input1"
                name="id"
                placeholder="아이디 입력"
                onChange={() => _changeId()}
                onKeyUp={checkId.bind()}
              />
              <br />

              <strong>·이름</strong>
              <br />
              <input
                type="text"
                className="Input1"
                name="name"
                placeholder="이름 입력"
                onChange={() => _changeName()}
                onKeyUp={checkName1.bind()}
              />
              <br />
              <strong>·생년월일</strong>
              <br />
              <input
                type="text"
                className="Input1"
                name="birth"
                placeholder="ex)19921030"
                onChange={() => _changeBirth()}
                onKeyUp={checkBirth.bind()}
              />
              <br />
              <strong>·E-mail</strong>
              <br />
              <input
                type="text"
                className="Input1"
                name="email"
                placeholder="ex) abc@matchground.com"
                onChange={() => _changeEmail()}
                onKeyUp={checkEmail.bind()}
              />
              <br />
              <br />
              <button type="submit" class="btn btn-Info">
                비밀번호찾기
              </button>
              <button
                type="button"
                class="btn btn-Info"
                onClick={() => setModalIsOpen(false)}
              >
                닫기
              </button>
            </form>
          </TabPanel>
        </Tabs>
      </Modal>
    </div>
  );

  return (
    <div className="Login-Modal" style={{ width: "100%" }}>
      {logged ? (
        <div align="right">
          <span style={{ fontSize: "10pt" }}>
            {window.sessionStorage.getItem("id") + "님 접속중"}
          </span>{" "}
          <button
            class="loginbtn"
            onClick={() => {
              onLogout();
            }}
            style={{ fontWeight: "bolder" }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div align="right">
          <button
            class="loginbtn"
            onClick={() => {
              setModalIsOpen(true);
              setIdx(0);
            }}
            style={{ fontWeight: "bolder" }}
          >
            Login
          </button>
        </div>
      )}
      <Modal isOpen={modalIsOpen}>
        <div>
          <h1 className="Head">로그인</h1>
          <button className="x" onClick={() => setModalIsOpen(false)}>
            <img classNmame="img" src={img} alt="" />
          </button>
        </div>
        <form>
          <input
            type="text"
            className="Id"
            name="Id"
            id="Id"
            placeholder="아이디"
            onChange={() => _changeLid()}
          ></input>

          <input
            type="password"
            className="Password"
            name="Password"
            id="Password"
            placeholder="비밀번호"
            onChange={() => _changeLpassword()}
            onKeyUp={checkLpwd.bind()}
          ></input>

          {/* <input type="checkbox" className="SaveId"/>
                <label htmlFor="SaveID">아이디 저장</label> */}
          <br />

          <button type="button" onClick={LoginEvent} className="loginbtn1">
            Login
          </button>
          <div
            className="FindDiv"
            onClick={() => {
              setIdx(1);
            }}
            style={{ cursor: "pointer" }}
          >
            ID/PW찾기&nbsp;&nbsp;<b>  |  </b>
          </div>

          {idx === 1 ? Find : LoginForm}
        </form>
        &nbsp;&nbsp;&nbsp;
        <NavLink
          onClick={() => setModalIsOpen(false)}
          class="link"
          exact
          to="/Login/JoinForm"
        >
          &nbsp;&nbsp;&nbsp;회원가입
        </NavLink>
      </Modal>
    </div>
  );
}

export default LoginForm;
