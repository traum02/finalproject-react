import React, { Component } from "react";
import { NavLink, Route, Link } from "react-router-dom";
import "../Css/JoinForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Title from './Title.js';
import axios from "axios";

class joinForm extends Component {
  state = {
    chk_num: "",
    chk_email: "",
  };
  constructor(props) {
    super(props);
    this.state = {
      memberData: [],
    };
  }

  onMemberInsert = (d) => {
    let url = "http://localhost:9000/matchplay/member/add";
    // let url = "http://192.168.0.108:9000/matchplay/member/add";
    axios
      .post(url, {
        name: d.name.value,
        birth: d.birth.value,
        id: d.id.value,
        pwd: d.pwd.value,
        email: d.email.value,
        gender: d.gender.value,
        addr: d.addr.value,
        phone: d.phone.value,
      })
      .then((res) => {})
      .catch((error) => {
        console.log("데이타 추가에러:" + error);
      });
  };

  checkId = (e) => {
    let url =
      "http://localhost:9000/matchplay/member/select?id=" + e.target.value;
    // "http://192.168.0.108:9000/matchplay/member/select?id=" + e.target.value;

    axios
      .get(url)
      .then((responseData) => {
        //url 로부터 받은 데이타 state 변수에 넣기
        console.log("select 함수 내 responseData.data1=" + responseData.data);

        this.setState({
          chk_num: responseData.data,
        });

        //return responseData.data;
        //console.log("this.state.chk_num:"+this.state.chk_num);
      })
      .catch((error) => {
        console.log("list 에러:" + error);
        //return 0;
      });
  };

  checkEmail = (e) => {
    let url =
      "http://localhost:9000/matchplay/member/selEmail?email=" +
      // "http://192.168.0.108:9000/matchplay/member/selEmail?email=" +
      e.target.value;

    axios
      .get(url)
      .then((responseData) => {
        //url 로부터 받은 데이타 state 변수에 넣기
        console.log(
          "select 함수 내 responseData.data_email=" + responseData.data
        );

        this.setState({
          chk_email: responseData.data,
        });

        //return responseData.data;
        //console.log("this.state.chk_num:"+this.state.chk_num);
      })
      .catch((error) => {
        console.log("list 에러:" + error);
        //return 0;
      });
  };

  componentDidUpdate = (prevProps, prevState) => {};

  onSubmit = (e) => {
    e.preventDefault();
    console.log("onSubmit");

    var regExp_pwd = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; //  8 ~ 10자 영문, 숫자 조합
    var chk_pwd = false;
    chk_pwd = regExp_pwd.test(this.refs.pwd.value); // 형식에 맞는 경우 true 리턴

    if (!this.refs.confirm.checked) {
      alert("약관동의 후 회원가입이 가능합니다.");
      return 0;
    }

    if (this.refs.pwd.value !== this.refs.re_pwd.value) {
      alert("비밀번호가 일치하지 않습니다.");
      return 0;
    }
    if (!chk_pwd) {
      alert("8~10자 영문, 숫자 조합 입력");
      return 0;
    }
    if (this.state.chk_num === 1) {
      alert("이미 등록된 아이디입니다.");
      return 0;
    }

    var regExp_email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    var chk_email = false;
    chk_email = regExp_email.test(this.refs.email.value); // 형식에 맞는 경우 true 리턴
    if (!chk_email) {
      alert("이메일 형식이 정확하지 않습니다.");
      return 0;
    }

    //Insert 함수 호출
    this.onMemberInsert(this.refs);

    //this.PageMove();
    this.props.history.push("/Login/JoinForm/JoinFinal");

    //입력값 초기화
    this.refs.name.value = "";
    this.refs.birth.value = "";
    this.refs.id.value = "";
    this.refs.pwd.value = "";
    this.refs.email.value = "";
    this.refs.gender.value = "남";
    this.refs.addr.value = "";
    this.refs.phone.value = "";
    this.refs.re_pwd.value = "";
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <table className="Join">
            <hr />
            <h5 className="Title">가입 정보 입력</h5>
            <span className="Context">
              로그인 정보 및 가입 정보를 입력하세요.
            </span>
            <hr />
            <strong>·아이디</strong>
            <br />
            <input
              type="text"
              className="Input"
              ref="id"
              placeholder="아이디 입력"
              onKeyUp={this.checkId.bind(this)}
            />
            {this.state.chk_num === 1 ? "사용할 수 없는 아이디입니다." : ""}
            <br />

            <strong>·비밀번호</strong>
            <br />
            <input
              type="password"
              className="Input"
              ref="pwd"
              placeholder="영문+숫자 최소 8~10글자"
            />
            <br />

            <strong>·비밀번호 확인</strong>
            <br />
            <input
              type="password"
              className="Input"
              ref="re_pwd"
              placeholder="비밀번호 확인"
            />
            <br />

            <strong>·이메일주소</strong>
            <br />
            <input
              type="text"
              className="Input"
              ref="email"
              placeholder="ex) abc@matchground.com"
              onKeyUp={this.checkEmail.bind(this)}
            />
            {this.state.chk_email === 1 ? "사용할 수 없는 이메일입니다." : ""}
            <br />

            <strong>·이름</strong>
            <br />
            <input
              type="text"
              className="Input"
              ref="name"
              placeholder="이름 입력"
            />
            <br />

            <strong>·생년월일</strong>
            <br />
            <input
              type="text"
              className="Input"
              ref="birth"
              placeholder="ex)1992년10월30일->19921030"
            ></input>
            <br />

            <strong>·성별</strong>
            <br />
            <div className="gender">
              <label>
                <select
                  ref="gender"
                  className="form-control"
                  placeholder="남"
                  style={{ width: "250px" }}
                >
                  <option value="남">남</option>
                  <option value="여">여</option>
                </select>
              </label>
            </div>

            <strong>·주소</strong>
            <br />
            <input
              type="text"
              ref="addr"
              className="addr"
              placeholder="서울시 용산구 한남동(이 예시대로 작성)"
              style={{ width: "400px" }}
            />

            <strong>·휴대폰번호</strong>
            <br />
            <input
              type="text"
              className="Input"
              ref="phone"
              placeholder="'-'없이 입력->01012345678"
            ></input>
            <br />
            <div className="Agree">
              <h4>개인정보 수집 이용 안내 </h4>
              <hr />
              <br />
              <strong>수집목적</strong>
              <hr />
              <p>
                고객맞춤형 상품및 서비스 추천,당사 신규 상품/ 서비스 안내 및
                권유 사은/할인 행사 등 각종 이벤트 정보 등의 안내 및 권유{" "}
              </p>
              <strong>수집항목</strong>
              <hr />
              <p>
                이메일, 휴대폰번호, 주소 , 생년월일, 포인트 적립 및 사용 정보,
                접속로그{" "}
              </p>
              <strong>보유기간</strong>
              <hr />
              <p>회원 탈퇴 시 혹은 이용 목적 달성 시 까지 </p>
              <div className="AgreeContent">
                <label>
                  <input type="checkbox" ref="confirm" id="confirm" />
                  동의
                </label>
                &nbsp;&nbsp;&nbsp;
              </div>
            </div>
            <br />
            <br />
          </table>

          <button type="submit" className="joinbtn" id="submit_btn">
            회원가입
          </button>

          <NavLink exact to="/">
            <button type="submit" className="backbtn">
              뒤로가기
            </button>
          </NavLink>
        </form>
      </div>
    );
  }
}

export default joinForm;
