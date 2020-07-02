import React, { Component } from "react";
import stop from "../image/stop.png";
import "./UserDelUpd.js";
import "../Css/Drop.css";
class Drop extends Component {
      
  
  //탈퇴 이벤트 
    onRemove=()=>{
      console.log(window.sessionStorage.getItem("id"));
        // const {row, onDeleteMember} =this.props;
        this.props.onDeleteMember(window.sessionStorage.getItem("id"));
    }
  
  render() {
    return (
      
      <div>
        <img src={stop} className="Drop_h" alt="" />
        <div className="Drop_d">
          <b className="title_dr">잠깐만요!</b>
          <b className="fin_dr">
            <br />
            Match Play를 현재계정으로 이용하지 않으시는분만
            <br />
            요청 하시기 바랍니다.
            <br />
            한번 삭제된 계정은 활성화될 수 없습니다.
            <br />
            영구적으로 계정 탈퇴를 원하시면 확인을 눌러주세요.
          </b>
        </div>
        <button type="button" onClick={this.onRemove.bind(this)} >
          확인
        </button>
      </div>
    );
  }
}

export default Drop;
