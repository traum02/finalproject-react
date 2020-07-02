import React, { Component, Fragment } from "react";
import "../Css/Content.css";
import axios from "axios";
import TContentComment from "./TContentComment";
import { Link } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TWriteUpdate from "./TWriteUpdate";

class TContent extends Component {
  constructor({ match }, props) {
    super(props);

    //match 객체로부터 받은 tboard_num을 멤버 변수에 저장
    const n = match.params.tboard_num;
    this.tboard_num = n.split("&")[0];
    this.start = match.params.start;
    this.state = {
      selectData: "",
      tcommentData: [],
      content: "",
      tboard_num: this.tboard_num,
      myteamnum: "",
      tboard_photo: "",
    };
  }
  componentWillMount() {
    this.onSelctData(); //페이지가 시작되자마자 호출
    this.getMyTeamNum();
    console.log("this.tboard_num=" + this.state.tboard_num);
    this.clist();
    console.log(this.tboard_num); //페이지번호
    console.log("티보드넘버" + this.state.tboard_num);
    console.log("스타트" + this.start);
  }

  //소속된 팀 num 구하기
  getMyTeamNum = () => {
    const url =
      "http://localhost:9000/matchplay/teammember/myteamnum?member_id=";

    axios
      .get(url + window.sessionStorage.getItem("id"))
      .then((res) => {
        this.setState({
          myteamnum: res.data,
        });
        console.log("내 팀넘버===" + this.state.myteamnum);
        // this.props.Onlist();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //tboard_num을 통해 모든 데이터를 출력
  onSelctData = () => {
    let url =
      "http://localhost:9000/matchplay/tboard/select?tboard_num=" +
      this.tboard_num;
    axios
      .get(url)

      .then((res) => {
        this.setState(
          {
            selectData: res.data,
            content: res.data.tboard_content,
            tboard_photo: res.data.tboard_photo,
          },
          () => console.dir("res확인" + res.data.tboard_num)
        );
        console.dir(this.state.selectData);
      })
      .catch((err) => {
        console.log("select 에러:" + err);
      });
  };

  //댓글
  clist = () => {
    let url =
      "http://localhost:9000/matchplay/select/tboard/tcomment?tboard_num=" +
      this.state.tboard_num;
    axios
      .get(url)
      .then((responsedata) => {
        console.dir(responsedata.data); //잘 찍힘

        this.setState(
          {
            tcommentData: responsedata.data,
          },
          () => console.log("댓글렝스" + this.state.tcommentData.length)
        );
      })
      .catch((error) => {
        console.log("댓글list 에러" + error);
      });
  };

  test = () => {
    console.log(this.refs.tcomment_content.value);
  };

  //삭제 함수
  onTboardDelete = () => {
    let url =
      "http://localhost:9000/matchplay/tboard/delete?tboard_num=" +
      this.tboard_num;
    axios
      .delete(url)
      .then((res) => {
        this.props.history.goBack();
      })
      .catch((err) => {
        console.log("삭제오류:" + err);
      });
  };

  //댓글추가
  onTcommentInsert = () => {
    console.log(1);
    let url = "http://localhost:9000/matchplay/select/tboard/addcomment";
    console.log(1);
    axios
      .post(url, {
        tboard_num: this.state.tboard_num,
        tcomment_content: this.refs.tcomment_content.value,
        member_id: window.sessionStorage.getItem("id"),
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log("추가부분 에러" + error);
      });
  };

  onSubmit = (e) => {
    this.onTcommentInsert();
  };

  goList = (e) => {
    this.props.history.push(
      "/Team/TeamHome/TeamBoard/list/" +
        this.state.myteamnum +
        "&start/" +
        this.start
    );
  };

  //댓글 값 얻기 확인용
  test = () => {
    console.log(this.refs.tcomment_content.value);
  };

  render() {
    let tdata = this.state.selectData;

    let content = this.state.content.substring(
      this.state.content.indexOf("<p>") + 3,
      this.state.content.indexOf("</p>")
    );
    // let content2 = this.state.content.substring(0, 5);
    const url = "http://localhost:9000/matchplay/image/"; //저장된 이미지 출력 위함

    return (
      <div className="ct">
        <h1 className="contType">TYPE</h1>
        <table className="ctTitle">
          <tr>
            <td>
              <b className="b">TITLE : {tdata.tboard_title}</b>
            </td>
          </tr>
          <tr>
            <td>
              <b className="b">WRITER : {tdata.member_id}</b>
            </td>
          </tr>
        </table>
        {/* 저장된 이미지 */}
        {/* <img src={url + tdata.tboard_photo} alt="" style={{maxWidth:"500px",maxHeight:"500px",float:"right",marginRight:"300px"}}/> */}
        <div align="left" style={{ marginLeft: "30px" }}>
          <div style={{ width: "420px" }}>
            {this.state.tboard_photo.split("/").map((item, i) =>
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

        <form onSubmit={this.onSubmit.bind(this)}>
          <table class="table table-bordered">
            <tr>
              <td className="content">{content}</td>
            </tr>
            <tr class="review">
              <td>
                <b>댓글</b>{" "}
                <button type="submit" className="reviewbtn2">
                  등록
                </button>
              </td>
            </tr>

            {/* <tr>
                      <td className="reviewcontent">  
                        <b>닉네임</b><br/>
                        content<br></br>
                        <i className="date">2020.06.17 15:58</i> &nbsp;
                         {/* <button type="button" class="reviewbtn">답글쓰기</button> 
                         
                      </td>
                      
                    </tr> */}

            {this.state.tcommentData.map((row, idx) => (
              <TContentComment
                row={row}
                key={row.tcomment_num}
                onClist={this.clist.bind(this)}
              />
            ))}

            <tr>
              <td>
                <div className="review_border">
                  <p class="nick">{window.sessionStorage.getItem("id")}</p>
                  <input
                    type="text"
                    ref="tcomment_content"
                    className="reviewin"
                    onKeyUp={this.test.bind(this)}
                    placeholder="댓글을 남겨보세요."
                    required
                  ></input>
                </div>
              </td>
            </tr>
          </table>

          <div className="btn-cont">
            {window.sessionStorage.getItem("id") == tdata.member_id ? (
              <button
                type="button"
                className="cont-btn"
                onClick={() => {
                  this.props.history.push(
                    "/Team/TeamHome/TeamBoard/update/TWriteUpdate/" +
                      this.tboard_num
                  );
                }}
              >
                글 수정하기
              </button>
            ) : (
              ""
            )}
            {window.sessionStorage.getItem("id") == tdata.member_id ? (
              <button
                type="button"
                className="cont-btn"
                onClick={this.onTboardDelete.bind(this)}
              >
                삭제
              </button>
            ) : (
              ""
            )}

            {/* <Link to={"/Team/TeamHome/TeamBoard/update/TWriteUpdate/"+this.state.selectData.tboard_num}> */}

            {/* </Link> */}
            <button
              type="button"
              className="cont-btn"
              onClick={this.goList.bind(this)}
            >
              목록으로
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default TContent;
