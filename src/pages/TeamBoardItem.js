import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class TboardItem extends Component {
  constructor(props) {
    super(props);
    this.tboard_num = this.props.row.tboard_num;
    this.start = this.props.startnum;
    this.state = {
      commentcount: [],
    };
  }

  //tboard_num을 통해 모든 댓글 갯수
  getCommentCount = () => {
    let url =
      "http://localhost:9000/matchplay/select/tboard/tcount?tboard_num=" +
      this.tboard_num;
    axios
      .get(url)

      .then((res) => {
        this.setState({
          commentcount: res.data,
        });
        console.dir("댓글 갯수 확인" + this.state.commentcount);
      })
      .catch((err) => {
        console.log("select 에러:" + err);
      });
  };

  componentWillMount() {
    this.getCommentCount();
    console.log("프랍스넘" + this.props.startnum);
  }

  render() {
    console.log("현재페이지" + this.start);
    console.log("세션확인:" + window.sessionStorage.getItem("id"));

    let comment = this.state.commentcount;

    return (
      <tr
        className="body_T"
        style={{
          backgroundColor:
            this.props.row.tboard_notice === "notice" ? "pink" : "white",
          height: "30px",
        }}
      >
        <td>{this.props.row.tboard_num}</td>
        <td>
          {this.props.row.tboard_public == "all" ? "전체공개" : "팀"}
          {/* {this.props.row.tboard_public} */}
        </td>

        <input type="hidden" value={this.props.row.team_num} />

        <td>
          {/* 클릭 시 디테일 페이지로 이동 */}
          <Link
            to={
              "/Team/TeamHome/TeamBoard/TContent/" +
              this.props.row.tboard_num +
              "&start/" +
              this.start
            }
          >
            {this.props.row.tboard_title}
          </Link>
          {/* 이미지가 있으면 제목 옆에 클립 표시 */}
          {this.props.row.tboard_photo != null ? (
            <span
              class="glyphicon glyphicon-paperclip"
              style={{ width: "10px" }}
            ></span>
          ) : (
            ""
          )}
          {this.state.commentcount != 0 ? <span>[{comment}]</span> : ""}
        </td>
        <td>{this.props.row.member_id}</td>

        <td>{this.props.row.tboard_date}</td>
        <td>{this.props.row.tboard_viewcount}</td>

        <input type="hidden" value={this.props.row.tboard_notice}></input>
      </tr>
    );
  }
}

export default TboardItem;
