import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Empty from "../image/img.png";
import "../Css/MainStyle.css";
import { Scrollbars } from "react-custom-scrollbars";
import ReactDOM from "react-dom";
import axios from "axios";

class CreateTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team_name: "",
      team_photo: "",
      team_area: "",
      team_age: "",
      team_intro: "",
      creator: "",

      //팀명 중복체크용
      chk_tname: "",

      //이미지 미리보기
      previewurl: "",
    };
  }

  //팀 생성

  teamCreate = () => {
    // console.log("값 들어오는거 확인"+member_id,tboard_title,tboard_content)
    let url = "http://localhost:9000/matchplay/team/add";
    let uploadData = this.state;
    axios
      .post(url, {
        team_name: this.refs.team_name.value,
        team_intro: this.refs.team_intro.value,
        team_area: uploadData.team_area,
        team_age: uploadData.team_age,
        team_photo: uploadData.team_photo,
        creator: window.sessionStorage.getItem("id"),
      })
      .then((res) => {
        this.props.history.push("/Team/CreateTeam/Success");
      })
      .catch((error) => {
        console.log("추가부분 에러" + error);
      });
  };

  //이미지 업로드
  onImageUpload = (e) => {
    const uploadFile = e.target.files[0];
    const team_photo = e.target.files[0].name;
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ previewurl: reader.result });
    };
    reader.readAsDataURL(uploadFile);
    this.setState({
      team_photo,
    });

    //서버로 파일 업로드
    const teamfile = new FormData();
    teamfile.append("uploadFile", uploadFile);
    console.log(teamfile);
    axios({
      method: "post",
      url: "http://localhost:9000/matchplay/team/upload",
      data: teamfile,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        console.log("이미지명:" + res.data);
        console.log(
          "연령대" +
            this.state.team_age +
            "연고" +
            this.state.team_area +
            "팀명" +
            this.refs.team_name.value +
            "이미지명" +
            this.state.team_photo
        );
      })
      .catch((err) => {
        console.log("업로드 오류" + err);
      });
  };

  //팀명 중복체크
  checkTname = (e) => {
    let url =
      "http://localhost:9000/matchplay/team/check?team_name=" + e.target.value;

    axios
      .get(url)
      .then((responseData) => {
        //url 로부터 받은 데이타 state 변수에 넣기
        console.log("중복체크 responseData.데이터=" + responseData.data);

        this.setState({
          chk_tname: responseData.data,
        });

        //return responseData.data;
        //console.log("this.state.chk_num:"+this.state.chk_num);
      })
      .catch((error) => {
        console.log("체크 에러:" + error);
        //return 0;
      });
  };

  handleChange = (e) => {
    this.setState(
      {
        team_area: e.target.value,
      },
      () => console.log(this.state.team_area)
    );
  };

  handleChange2 = (e) => {
    this.setState(
      {
        team_age: e.target.value,
      },
      () => console.log(this.state.team_age)
    );
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.chk_tname === 1) {
      alert("이미 등록되어 있는 팀명입니다.");
      return 0;
    }

    this.teamCreate();
  };

  render() {
    let { previewurl } = this.state;

    const array = [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성복구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ];
    const options = array.map((item) => {
      return <option value={item}>{item}</option>;
    });

    const array2 = [
      "10~20대",
      "10~30대",
      "10~40대 이상",
      "20~30대",
      "20~40대 이상",
      "30~40대 이상",
    ];
    const options2 = array2.map((item) => {
      return <option value={item}>{item}</option>;
    });

    return (
      <div align="center">
        {/* <b style={{fontSize:'25pt', marginLeft:'-800px'}}>팀 생성하기</b> */}
        <form onSubmit={this.onSubmit.bind(this)}>
          <table
            className="CreatTable"
            style={{
              fontSize: "20pt",
              border: "2px",
              width: "1200px",
              marginTop: "65px",
              marginLeft: "100px",
            }}
          >
            <tbody>
              <tr>
                <td
                  width="350px"
                  height="90px"
                  align="center"
                  style={{
                    backgroundColor: "#503396",
                    border: "1px solid white",
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "3px 3px 3px black",
                    borderRadius: "10px",
                  }}
                >
                  팀명
                </td>
                <td>
                  <input
                    type="text"
                    className="Input1"
                    ref="team_name"
                    required
                    onKeyUp={this.checkTname.bind(this)}
                  />
                  <span style={{ fontSize: "10pt" }}>
                    {this.state.chk_tname === 1
                      ? "이미 존재하는 팀명입니다."
                      : "-"}
                  </span>
                </td>
              </tr>
              <tr>
                <td
                  align="center"
                  height="90px"
                  style={{
                    backgroundColor: "#503396",
                    border: "1px solid white",
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "3px 3px 3px black",
                    borderRadius: "10px",
                  }}
                >
                  팀 로고
                </td>
                <td>
                  <input
                    type="file"
                    className="Input1"
                    name="team_photo"
                    required
                    onChange={this.onImageUpload.bind(this)}
                  />
                </td>
              </tr>
              <tr>
                <td
                  align="center"
                  height="90px"
                  style={{
                    backgroundColor: "#503396",
                    border: "1px solid white",
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "3px 3px 3px black",
                    borderRadius: "10px",
                  }}
                >
                  선호 지역
                </td>

                <td>
                  <select
                    className="Input1"
                    value={this.state.team_area}
                    onChange={this.handleChange.bind(this)}
                    required
                  >
                    <option selected value="">
                      선택하세요
                    </option>
                    {options}
                  </select>
                </td>
              </tr>
              <tr>
                <td
                  align="center"
                  height="90px"
                  style={{
                    backgroundColor: "#503396",
                    border: "1px solid white",
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "3px 3px 3px black",
                    borderRadius: "10px",
                  }}
                >
                  연령대
                </td>
                <td>
                  <select
                    className="Input1"
                    value={this.state.team_age}
                    onChange={this.handleChange2.bind(this)}
                    required
                  >
                    <option selected value="">
                      선택하세요
                    </option>
                    {options2}
                  </select>
                </td>
              </tr>
              <tr>
                <td
                  align="center"
                  height="90px"
                  required
                  style={{
                    backgroundColor: "#503396",
                    border: "1px solid white",
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "3px 3px 3px black",
                    borderRadius: "10px",
                  }}
                >
                  팀 소개
                </td>
                <td>
                  <textarea
                    className="Input2"
                    ref="team_intro"
                    required
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <img
              src={previewurl}
              alt=""
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
                float: "right",
                marginTop: "60px",
                marginRight: "150px",
              }}
            ></img>
          </div>

          <hr style={{ marginTop: "45px" }} />

          <button
            type="submit"
            style={{
              marginTop: "30px",
              width: "150px",
              height: "40px",
              backgroundColor: "black",
              border: "1px solid #503396",
              color: "white",
              outline: "none",
              borderRadius: "10px",
              fontSize:'15pt'
            }}
          >
            작성 완료
          </button>
        </form>
      </div>
    );
  }
}

export default CreateTeam;
