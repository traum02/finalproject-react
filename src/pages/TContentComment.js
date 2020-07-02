import React, { Component, Fragment } from "react";
import axios from "axios";

class TCommentComment extends Component {
  onDeleteComment = () => {
    let url =
      "http://localhost:9000/matchplay/select/tboard/deletecomment?tcomment_num=" +
      this.props.row.tcomment_num;
    axios
      .delete(url)
      .then((res) => {
        this.props.onClist();
      })
      .catch((err) => {
        console.log("삭제오류:" + err);
      });
  };

  render() {
    return (
      <Fragment>
        <tr>
          <td>
            <input type="hidden" value={this.props.row.tboard_num}></input>
            작성자 : {this.props.row.member_id}
            <br></br>
            <br></br>
            {this.props.row.tcomment_content}
            {window.sessionStorage.getItem("id") == this.props.row.member_id ? (
              <button
                type="button"
                className="cont-btn"
                onClick={this.onDeleteComment.bind(this)}
                style={{
                  width: "50px",
                  float: "right",
                  marginRight: "30px",
                  marginTop: "30px",
                }}
              >
                삭제
              </button>
            ) : (
              ""
            )}
          </td>
          <br></br>
        </tr>
      </Fragment>
    );
  }
}

export default TCommentComment;
