import React, {Component} from "react";
import { Link } from "react-router-dom";

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';


import axios from 'axios';
import Modal from 'react-modal';
import icon from '../image/search-icon.png';
import lock from '../image/lock.png';
import IboardItemPwdCheck from './IboardItemPwdCheck';


class IboardItem extends Component{

   
    
    // //onUpdateFrom 이라는 이름으로 보냄
    // onUpdateClick=()=>{
    //     const {row,onUpdateForm}=this.props;
    //     onUpdateForm(row.tboard_num);
    // }

    state={
           
      }
      constructor(props)
      {
        super(props);
        this.state={
          
        }       
      }

    //this.props.row.iboard_secpwd
    //<Link to={"/iboard/select/" + this.props.row.iboard_num}></Link>
    render(){
        return(
            
            <tr style={{ backgroundColor: this.props.row.iboard_notice === "notice" ? 'rgba(215,204,238,0.5)': ''}}>
                <td>
                    {this.props.row.iboard_num}
                </td>
                <td>
                    {this.props.row.iboard_type}
                </td>
                <td>
                    {/* 클릭 시 디테일 페이지로 이동 */}
                    {
                        this.props.row.iboard_notice === "notice" ?
                        
                        <Link to={"/iboard/select/" + this.props.row.iboard_num + '/' + this.props.row.preidx}>
                        {this.props.row.iboard_title}
                        </Link>
                        :
                        <Link to={"/iboard/secpwd/" + this.props.row.iboard_num + '/' + this.props.row.preidx}>
                        {this.props.row.iboard_title}
                        </Link>
                    }
                </td>
                <td>
                    {this.props.row.member_id}
                </td>
                <td>
                    {this.props.row.iboard_date}
                </td>
            </tr>
            
        );
    };

}

export default IboardItem;