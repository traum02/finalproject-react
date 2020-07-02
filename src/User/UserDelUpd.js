import React from "react";
import "../Css/Update.css";
import Drop from "./Drop.js";
import img from "../image/user_info.png";
import "./UserInfo.js";
import axios from "axios";


class UserDelUpd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: 1,
      id: "",
      memberData: [],
    };
  }

  onUpdateCacel = () => {
    this.setState({
      idx: 1,
    });
  };

  //목록에서 수정을 누르면 호출
  onUpdateForm = (id) => {
    console.log(id);
    this.setState({
      idx: 2,
    });
    console.log("updateForm호출");
    var url = "http://localhost:9000/matchplay/member/updateform?id=" + id;
    axios
      .get(url)
      .then((memberData) => {
        console.log(memberData.data);
        this.setState({
          id: memberData.data,
        });
      })
      .catch((err) => {
        console.log("updateform err:" + err);
      });
  };

  //이벤트-수정폼으로부터 입력값받아서 스프링 보내기
  onMemberUpdate = (x) => {
    console.log("onUpdate호출:" + x.id);
    var url = "http://localhost:9000/matchplay/mypage/memberupdate";
    axios
      .put(url, {
        id: x.id,
        name: x.name,
        birth: x.birth,
        email: x.email,
        addr: x.addr,
        phone: x.phone,
      })
      .then((memberData) => {
        this.setState({
          idx: 1,
        });
        this.onSelect();
      })
      .catch((err) => {
        console.log("update 에러발생" + err);
      });
  };

  componentWillMount() {
    console.log("componentWillMount");
    this.onSelect();
  }

  // //수정 이벤트
  // onUpdate =() =>{
  //     const {row, onUpdate} = this.props;

  //     onUpdate(row.id);
  // }

  // handleToggleEdit = () => {
  //     const { editing } = this.state;
  //     this.setState({ editing: !editing });
  //   }

  //         // onUpdate = (e) => {
  //         //     const {birth,id,name,phone,email,addr, value} =e.target;
  //         //     // const {pass, value} =e.target;
  //         //     this.setState({
  //         //         [birth]:value,
  //         //         [id]:value,
  //         //         [name]:value,
  //         //         [phone]:value,
  //         //         [email]:value,
  //         //         [addr]:value
  //         //     });
  //         // }

  //   componentDidUpdate(prevProps, prevState) {
  //     const { row, onUpdate } = this.props;
  //     if(!prevState.editing && this.state.editing) {
  //       this.setState({
  //           id:row.id,
  //           birth:row.birth,
  //         name: row.name,
  //         phone: row.phone,
  //         email:row.email,
  //         addr:row.addr
  //       });
  //     }

  //     if (prevState.editing && !this.state.editing) {
  //       onUpdate(row.id, {
  //           id:this.state.id,
  //           birth:row.birth,
  //         name: this.state.name,
  //         phone: this.state.phone,
  //         email:this.state.email,
  //         addr:this.state.addr
  //       });
  //     }
  //   }
  render() {
    const style = {
      border: "1px solid black",
      padding: "8px",
      margin: "8px",
    };

    // const { editing } =this.state;

    if (this.state.idx === 2) {
      //수정
      return (
        <div style={style} className="user_upd">
          <img src={img} className="user_png" />

          <form>
            <table class="table table-hover">
              <tr>
                <td>
                  <b className="upd_tit">id</b>
                </td>
                <td>
                  <input
                    value={this.state.selectMember.id}
                    className="user_input"
                    name="id"
                    placeholder="ID"
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b className="upd_tit">이름</b>
                </td>
                <td>
                  <input
                    value={this.state.selectMember.name}
                    className="user_input"
                    name="name"
                    placeholder="이름"
                    readOnly
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <b className="upd_tit">전화번호</b>
                </td>
                <td>
                  <input
                    value={this.state.selectMember.phone}
                    name="phone"
                    placeholder="전화번호"
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b className="upd_tit">E-mail</b>
                </td>
                <td>
                  <input
                    value={this.state.selectMember.email}
                    name="email"
                    placeholder="이메일"
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b className="upd_tit">주소</b>
                </td>
                <td>
                  <input
                    value={this.state.selectMember.addr}
                    name="addr"
                    placeholder="주소"
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
            </table>
            <div className="btn_upd_user">
              <button className="userUp_btn" onClick={this.onUpdate.bind(this)}>
                변경하기
              </button>
              <button className="userUp_btn">뒤로가기</button>
            </div>
          </form>
        </div>
      );
    }
    const { id, birth, name, phone, email, addr } = this.props.row;
    return (
      <div className="user_info">
        <form>
          <hr />
          <table class="table table-bordered">
            <tr>
              <td className="user_ti">이름</td>
              <td value={this.onSelect.bind(this)}>{this.props.row.name}</td>
            </tr>
            <tr>
              <td>아이디</td>
              <td value={this.onSelect.bind(this)}>{this.props.row.id}</td>
            </tr>
            <tr>
              <td>생년월일</td>
              <td value={this.onSelect.bind(this)}>{this.props.row.birth}</td>
            </tr>
            {/* <tr>
                    <td>
                        성별
                    </td>
                    <td>
                        {gender}
                    </td>
                </tr>  */}
            <tr>
              <td className="user_ti">전화번호</td>
              <td value={this.onSelect.bind(this)}>{this.props.row.phone}</td>
            </tr>
            <tr>
              <td>E-mail</td>
              <td value={this.onSelect.bind(this)}>{this.props.row.email}</td>
            </tr>
            <tr>
              <td calssName="user_ti">주소</td>
              <td value={this.onSelect.bind(this)}>{this.props.row.addr}</td>
            </tr>
          </table>
          <button className="userUp_btn" onClick={this.onUpdate.bind(this)}>
            수정
          </button>
          {/* <button className="userUp_btn" onClick={Drop}>탈퇴</button> */}
        </form>
      </div>
    );
  }
}

export default UserDelUpd;
