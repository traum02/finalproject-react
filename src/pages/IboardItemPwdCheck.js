import React, {Component} from "react";
import { Link } from "react-router-dom";

import Dialog from '@material-ui/core/Dialog';

import DialogActions from '@material-ui/core/DialogActions';

import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

import {withStyles} from '@material-ui/core/styles';

import axios from 'axios';
import  '../Css/Content.css';

const styles = theme=>({
    hidden:{
        display:'none'
    }
});

class IboardItemPwdCheck extends Component{
    
    constructor({match},props) {
        super(props);
        //alert("id="+match.params.iboard_num)
        this.state = {
            open: true,
            iboard_num:match.params.iboard_num,
            preidx: match.params.preidx,
            pwd:''
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }    


    handleFormSubmit=(e)=>{
        e.preventDefault();
        if(this.state.chk_pwd===1)
        {
            alert("비밀번호 일치");
            this.props.history.push("/iboard/select/" + this.state.iboard_num + '/' + this.state.preidx);
        }else{
            alert("비밀번호 불일치");
            this.setState({
                pwd: ''
            })         
            }
    }    

    //this.props.history.push("/Login/JoinForm/JoinFinal");
    //<Link to={"/iboard/secpwd/" + this.props.row.iboard_num}></Link>

    handleValueChange(e) {

        let nextState = {};
        
        nextState[e.target.name] = e.target.value;
        
        this.setState(nextState);
        
    }


    handleClose() {
        this.setState({
        open: false
        })
        // alert(this.state.iboard_num);
        // alert(this.state.pwd);
        //alert(this.state.preidx);
        this.props.history.push("/QnA/" + this.state.preidx);
    }


    

    checkLpwd=(e)=>{
        let url="http://localhost:9000/matchplay/iboard/checkPwd?iboard_num="+this.state.iboard_num+"&iboard_secpwd="+e.target.value;
      
        axios.get(url)
        .then((responseData)=>{
            //url 로부터 받은 데이타 state 변수에 넣기
            console.log("select 함수 내 responseData.data2="+responseData.data);
            
            this.setState({
                chk_pwd:responseData.data
            });    
            
        }).catch((error)=>{
            console.log("list 에러:"+error);
            //return 0;
        });
    }

render() {

const { classes } = this.props;

return (

<div>

{/* <Button variant="contained" color="primary" onClick={this.handleClickOpen} className="ctTitle1">
문의글 비밀번호 입력 선택
</Button> */}

<Dialog open={this.state.open} onClose={this.handleClose}>

<DialogTitle align="center">
    <p style={{fontSize:'20pt'}}>문의글 비밀번호 입력</p>
</DialogTitle>

<DialogContent align="center" style={{width:'500px',fontSize:'15pt'}}>
    <TextField style={{width:'300px'}} 
    inputProps={{style:{fontSize:30}}}
    label="비밀번호" type="password" name="pwd" id="pwd" onChange={this.handleValueChange} onKeyUp={this.checkLpwd.bind()}/><br/>
</DialogContent>

<DialogActions>

<Button variant="outlined" color="primary" onClick={this.handleFormSubmit} style={{fontSize:'10pt'}}>입력</Button>
<Button variant="outlined" color="primary" onClick={this.handleClose} style={{fontSize:'10pt'}}>닫기</Button>

</DialogActions>

</Dialog>

</div>

)

}

}

export default withStyles(styles)(IboardItemPwdCheck);

