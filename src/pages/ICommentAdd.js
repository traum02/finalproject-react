import React, { Component } from 'react';
import axios from 'axios';
import {NavLink,Route, Link} from 'react-router-dom';

class ICommentAdd extends Component {

    constructor(props){
        super(props);
        console.log(props.history);
        console.log(this.props.history);
        console.log("test:"+this.props.num);
        this.state = {
           icomment_content:"",
           member_id:"",
           iboard_num:this.props.num,
           selectData:"",
            icommentData:[],
            icommentAddData:[]
        };
    }   


    //goBack
    goBack = () => {
        this.props.history.goBack();
    };

    //댓글 추가
    onIcommentInsert = () => {
        let url = "http://localhost:9000/matchplay/select/iboard/addcomment"
        
        axios
        .post(url,  {
            icomment_content:this.refs.icomment_content.value,
            member_id:sessionStorage.id,
            iboard_num:this.state.iboard_num
        }) 
    .then((res)=>{
    
    })
    .catch((error)=>{
        console.log("추가부분 에러"+error);
    });
        
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.onIcommentInsert();
        console.log("submit");
        //this.goBack();
        this.props.clist();
        //this.props.history.push("/iboard/select/"+this.props.num);
        window.location.reload();
        this.refs.icomment_content.value='';
        alert("댓글이 등록되었습니다.");
    }

    test = () => {
        console.log(this.refs.icomment_content.value);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
            <textarea ref="icomment_content" onKeyUp={this.test.bind(this)} style={{width:"500px"}}>
            </textarea>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="submit" style={{position:"relative" ,color: "blue", fontWeight: "bold", marginTop: "0.5rem", top: "-45px", left:"510px"}}>댓글등록</button>
            </form>
        );
    }
}

export default ICommentAdd;