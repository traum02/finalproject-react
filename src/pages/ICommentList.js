
import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import  '../Css/Content.css';
import ICommentAdd from './ICommentAdd';


class ICommentList extends Component {


    render() {
        return (
            <table className="review-table">
            <tr>
                <td>
                   <input type="hidden" value={this.props.row.iboard_num}></input>
                </td>
            </tr>
            <tr class="review" className="reviewTr">
                <td className="reviewcontent"> 
                    작성자:{this.props.row.member_id}
                    &nbsp;&nbsp;    
                    <i className="date">
                    작성시간:
                    {this.props.row.icomment_date}
                    </i>
                </td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
            </tr>
            <tr>
                <td>
                    댓글내용:
                    {this.props.row.icomment_content}
                </td>
            </tr>
            
            </table>
        );
    }
}

export default ICommentList;


