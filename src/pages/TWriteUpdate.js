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

    this.state = {
      updateData: "",
      tboard_num: this.tboard_num,
      // member_id:"",
      tboard_title: "",
      tboard_content: "",
      tboard_photo: "",

      select_photo: "",

      grade: "",

      //이미지 미리보기
      previewurl: "",
    };
  }

  //시작하자마자 호출
  componentWillMount() {
    this.onSelctData(); //호출

    console.log("번호 잘 넘어오나 확인" + this.state.tboard_num);
  }

  //공개 여부
  onPublic = (e) => {
    this.setState(
      {
        tboard_public: e.target.value,
      },
      () => console.log(this.state.tboard_public)
    );
  };

  //tboard_num 을 통해 모든 데이터 출력
  onSelctData = () => {
    let url =
      "http://localhost:9000/matchplay/tboard/select?tboard_num=" +
      this.state.tboard_num;
    axios
      .get(url)
      .then((res) => {
        this.setState({
          updateData: res.data,
          tboard_title: res.data.tboard_title,
          tboard_content: res.data.tboard_content,
          member_id: res.data.member_id,
          tboard_num: res.data.tboard_num,
          select_photo: res.data.tboard_photo,
        });
      })
      .catch((err) => {
        console.log("select 에러:" + err);
      });
  };

  //스프링으로 보내는 수정함수
  onTboardUpdate = () => {
    console.log("실제 수정할 onTboardUpdate 호출:");
    var url = "http://localhost:9000/matchplay/tboard/update";

    axios
      .put(url, {
        tboard_title: this.state.tboard_title,
        tboard_content: this.state.tboard_content,
        tboard_num: this.state.tboard_num,
        tboard_photo: this.state.tboard_photo,
      })
      .then((responsedata) => {
        this.props.history.goBack();
      })
      .catch((error) => {
        console.log("onTboardUpdate 오류:" + error);
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value, //text 창에 다시 입력할 수 있도록
    });
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

  //부모컴포넌트의 이벤트 호출하기 위한 함수
  onUpdate = (e) => {
    e.preventDefault();
    this.onTboardUpdate();
  };

  render() {
    let udata = this.state.updateData;
    let { previewurl } = this.state;
    const url = "http://localhost:9000/matchplay/image/"; //저장된 이미지 출력 위함

    return (
      <div className="TWR" align="center">
        <img src={typing} className="typing" alt="" />
        <div>
          {/* <img src={previewurl} alt="" style={{maxWidth:"300px", maxHeight:"300px",float:"right",marginTop:"120px",marginRight:"150px"}}></img>  */}
          {/* <img src={previewurl} alt="" style={{maxWidth:"300px", maxHeight:"300px",float:"right",marginTop:"120px",marginRight:"150px"}}></img>  */}
          <div align="right" style={{ float: "right", marginRight: "200px" }}>
            <span>새로올릴 이미지</span>
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
          {/* 저장된 이미지 */}

          {/* <img src={url + udata.tboard_photo} alt="" style={{maxWidth:"500px",maxHeight:"500px",float:"right",marginRight:"300px"}}/> */}

          <div align="left" style={{ marginLeft: "200px" }}>
            <span>현재 저장되어 있는 이미지</span>
            <div style={{ width: "420px" }}>
              {this.state.select_photo.split("/").map((item, i) =>
                i != 0 && i % 4 == 0 ? (
                  <div>
                    <img
                      style={{ width: "200px" }}
                      src={"http://localhost:9000/matchplay/image/" + item}
                      alt=""
                    ></img>
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
        <form onSubmit={this.onUpdate.bind(this)}>
          <input type="hidden" value={udata.tboard_num} name="tboard_num" />
          <div className="twtable">
            <table class="table table-bordered">
              <tr>
                <td className="twnick">
                  <b style={{ fontSize: "13pt" }}>{this.state.member_id}</b>
                </td>
                {/* <td>
                                <select value={this.state.tboard_public} className="twsel" style={{fontSize:'13pt'}} onChange={this.onPublic.bind(this)}>
                                    <option value="">공개여부   </option>
                                    <option value="all">전체공개</option>
                                    <option value={this.state.team_num}>멤버공개</option>    
                                </select> 
                                <br></br> <br></br>
                     
                             </td> */}
              </tr>
              <tr>
                <td colSpan="2" style={{ fontSize: "13pt" }}>
                  글제목&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="Text"
                    name="tboard_title"
                    value={this.state.tboard_title}
                    className="twtitle"
                    onChange={this.handleChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  {/* <textarea  ref="tboard_content" placeholder="※멤버들에게 남기고싶은 말을 작성하세요." className="twtext" required></textarea> */}
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
                    data={this.state.tboard_content}
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
