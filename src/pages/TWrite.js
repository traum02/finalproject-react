import React, { Component } from "react";
import typing from "../image/typing.png";
import "../Css/TWrite.css";
import axios from "axios";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class TWrite extends Component {
  constructor({ match }, props) {
    super(props);

    //match 객체로부터 받은 tboard_num을 멤버 변수에 저장
    this.tboard_num = match.params.tboard_num;
    this.start = 0;
    this.state = {
      member_id: "",
      tboard_title: "",
      tboard_content: "",
      tboard_photo: "",
      tboard_public: "",
      tboard_notice: "",
      team_num: "",
      grade: "",

      //이미지 미리보기
      previewurl: "",
    };
  }

  //소속된 팀 num 구하기
  getMyTeamNum = () => {
    const url =
      "http://localhost:9000/matchplay/teammember/myteamnum?member_id=";

    axios
      .get(url + window.sessionStorage.getItem("id"))
      .then((res) => {
        this.setState({
          team_num: res.data,
        });
        console.log("내 팀넘버===" + this.state.team_num);
        // this.props.Onlist();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //현재 접속자의 권한 구하기

  getGrade = () => {
    const url =
      "http://localhost:9000/matchplay/teammember/teammaster?member_id=";

    axios
      .get(url + window.sessionStorage.getItem("id"))
      .then((res) => {
        this.setState({
          grade: res.data,
        });
        console.log("현재 접속자 등급? ===" + this.state.grade);
        // this.props.Onlist();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //공지사항 여부
  onNotice = (e) => {
    this.setState(
      {
        tboard_notice: e.target.value,
      },
      () => console.log(this.state.tboard_notice)
    );
  };

  //공개 여부
  onPublic = (e) => {
    this.setState(
      {
        tboard_public: e.target.value,
      },
      () => console.log(this.state.tboard_public)
    );
  };

  //이미지 업로드
  onImageUpload = (e) => {
    e.preventDefault();
    const uploadFile = e.target.files;
    // const tboard_photo = e.target.files[0].name;
    let filename = "";
    let reader = new FileReader();

    for (let i = 0; i < e.target.files.length; i++) {
      filename += e.target.files[i].name + "/";
    }
    //console.log(tboard_photo)
    e.preventDefault();

    // reader.onloadend = () => {
    //     this.setState({previewurl:reader.result})
    // };
    // reader.readAsDataURL(uploadFile);

    //서버로 파일 업로드
    const tboardfile = new FormData();
    for (let i = 0; i < uploadFile.length; i++) {
      tboardfile.append("uploadFile", uploadFile[i]);
    }
    // tboardfile.append("uploadFile",uploadFile);
    console.log(tboardfile);
    axios({
      method: "post",
      url: "http://localhost:9000/matchplay/tboard/upload",
      data: tboardfile,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        this.setState({
          tboard_photo: filename,
        });

        console.log("이미지명:" + res.data);
      })
      .catch((err) => {
        console.log("업로드 오류" + err);
      });
  };

  //추가
  onTboardInsert = () => {
    // console.log("값 들어오는거 확인"+member_id,tboard_title,tboard_content)
    let url = "http://localhost:9000/matchplay/tboard/add";
    let uploadData = this.state;
    axios
      .post(url, {
        tboard_title: this.refs.tboard_title.value,
        tboard_content: uploadData.tboard_content,
        tboard_photo: uploadData.tboard_photo,
        tboard_notice: uploadData.tboard_notice,
        tboard_public: uploadData.tboard_public,
        member_id: window.sessionStorage.getItem("id"),
      })
      .then((res) => {
        this.props.history.push(
          "/Team/TeamHome/TeamBoard/list/" +
            this.state.team_num +
            "&start/" +
            this.start
        );
      })
      .catch((error) => {
        console.log("추가부분 에러" + error);
      });
  };

  //서브밋시 호출되는 함수 (onTboardInsert 호출)
  onSubmit = (e) => {
    e.preventDefault();
    console.log("content=" + this.state.tboard_content);

    console.log("refs확인" + this.refs.tboard_title.value);

    this.onTboardInsert();
  };

  componentWillMount() {
    this.getMyTeamNum();
    this.getGrade();
  }

  render() {
    // let {previewurl} =this.state;

    return (
      <div className="TWR" align="center">
        <img src={typing} className="typing" alt="" />
        <div>
          {/* <img src={previewurl} alt="" style={{maxWidth:"300px", maxHeight:"300px",float:"right",marginTop:"120px",marginRight:"150px"}}></img>  */}
          <div align="center">
            <div style={{ width: "420px" }}>
              {this.state.tboard_photo.split("/").map((item, i) =>
                i != 0 && i % 4 == 0 ? (
                  <div>
                    <img
                      style={{ width: "200px" }}
                      src={"http://localhost:9000/matchplay/image/" + item}
                      alt=""
                    ></img>
                    <br></br>
                  </div>
                ) : (
                  <img
                    style={{ width: "200px" }}
                    src={"http://localhost:9000/matchplay/image/" + item}
                    alt=""
                  ></img>
                )
              )}
            </div>
          </div>
        </div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="twtable">
            <table class="table table-bordered">
              <tr>
                <td className="twnick">
                  <b style={{ fontSize: "13pt" }}>{this.state.member_id}</b>
                </td>
                <td>
                  <select
                    value={this.state.tboard_public}
                    className="twsel"
                    style={{ fontSize: "13pt", width: "111px" }}
                    onChange={this.onPublic.bind(this)}
                  >
                    <option value="all">전체공개</option>
                    <option value={this.state.team_num}>멤버공개</option>
                  </select>
                  <br></br> <br></br>
                  {this.state.grade == "master" ? (
                    <select
                      value={this.state.tboard_notice}
                      style={{ fontSize: "13pt" }}
                      onChange={this.onNotice.bind(this)}
                    >
                      <option value="">일반게시물</option>
                      <option value="notice">공지사항</option>
                    </select>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ fontSize: "13pt" }}>
                  글제목&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="Text"
                    ref="tboard_title"
                    className="twtitle"
                  ></input>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  {/* <textarea  ref="tboard_content" placeholder="※멤버들에게 남기고싶은 말을 작성하세요." className="twtext" required></textarea>
                   */}
                  <CKEditor
                    ref="tboard_content"
                    editor={ClassicEditor}
                    config={{
                      ckfinder: {
                        uploadUrl:
                          "http://localhost:9000/matchplay/tboard/upload",
                        connectorPath: "api/ckfinder/connector",
                        filebrowserBrowseUrl: "/ckfinder/browser",
                        filebrowserImageBrowseUrl:
                          "api/ckfinder/browser?type=Images",
                        filebrowserUploadUrl:
                          "api/ckfinder/connector?command=QuickUpload&type=Files",
                        filebrowserImageUploadUrl:
                          "api/ckfinder/connector?command=QuickUpload&type=Images",

                        options: {
                          resourceType: "Images",
                        },
                      },
                    }}
                    data="내용"
                    //편집기가 초기화 될 때 호출되는 함수
                    onInit={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    //데이터가 바뀌면 호출되는 함수
                    onChange={(event, editor) => {
                      const tboard_content = editor.getData();
                      console.log("tboard_content=" + tboard_content);

                      this.setState({
                        tboard_content: tboard_content,
                      });
                    }}
                    //포커스해제
                    onBlur={(editor) => {
                      console.log("Blur.", editor);
                    }}
                    //포커스
                    onFocus={(editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  {/* 파일 업로드 */}
                  <input
                    type="file"
                    multiple
                    accept="image/jpg,impge/png,image/jpeg,image/gif"
                    name="tboard_photo"
                    onChange={this.onImageUpload.bind(this)}
                  />
                </td>
              </tr>
            </table>
          </div>
          <hr />
          <div class="twsavebtn" style={{ marginBottom: "150px" }}>
            <button type="submit" class="twsvbtn">
              저장하기
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              type="button"
              class="twsvbtn"
              onClick={this.props.history.goBack.bind(this)}
            >
              돌아가기
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default TWrite;
