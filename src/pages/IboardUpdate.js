import React,{Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import  '../Css/Content.css';
import css from '../Css/Write.css';
import axios from 'axios';

class IboardUpdate extends Component{
   

    constructor({match}){
        super();
        //match 객체로부터 받은 tboard_num을 멤버 변수에 저장
        
        this.state = {
            updateData:"",
            iboard_num:match.params.iboard_num,
            member_id:sessionStorage.id,
            iboard_title: "",       
            iboard_content:"",     
            chk_grade:0,
            iboard_secpwd:"",
            iboard_type:"",
            iboard_notice:""
        };
        
    }

    //iboard_num 을 통해 모든 데이터 출력
    onSelctData = () => {
        let url = "http://localhost:9000/matchplay/iboard/select1?iboard_num=" + this.state.iboard_num;
        axios
            .get(url)
            .then((res)=>{
                this.setState({
                    updateData: res.data,
                    iboard_title: res.data.iboard_title,
                    iboard_content: res.data.iboard_content,
                    member_id:res.data.member_id,
                    iboard_num:res.data.iboard_num,
                    iboard_type:res.data.iboard_type
                });
            })
            .catch((err)=>{
                console.log("select 에러:"+err);
            });
    };
    
    //시작하자마자 호출
    componentWillMount() {
        this.onSelctData(); //호출
   }

      //스프링으로 보내는 수정함수
      //미구현 
      onIboardUpdate = () => {
        console.log("실제 수정할 onIboardUpdate 호출:");
        var url = "http://localhost:9000/matchplay/iboard/update"
        
        axios
        .put(url,{iboard_title:this.state.iboard_title, iboard_content:this.state.iboard_content,iboard_num:this.state.iboard_num,member_id:this.state.member_id})
        .then((responsedata)=>{
            this.props.history.push("/QnA")
        })
        .catch((error)=>{
            console.log("onTboardUpdate 오류:" + error);
        });
    }


    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value //text 창에 다시 입력할 수 있도록
        })
    }

    //부모컴포넌트의 이벤트 호출하기 위한 함수
    onUpdate=(e)=>{
        e.preventDefault();
       this.onIboardUpdate();
    }

   render(){
        let udata = this.state.updateData;
       
        return(
            <div className="ct">
            <form onSubmit={this.onUpdate.bind(this)}>
                <input type="hidden" value={udata.iboard_num} name="iboard_num" />
            <table className="ctTitle">
                <h1 className="contType">{this.state.iboard_type}</h1>
                <tr>
                    <td className="Subject"><b>제목</b>
                    <input className="b" type="text" name="iboard_title" value={this.state.iboard_title}
                    onChange={this.handleChange.bind(this)}></input>
                    </td> 
                </tr>
                <tr>
                    <td>
                    <b className="b">작성자 : {this.state.member_id}</b>
                    </td>
                </tr>
            </table>
            <table class="table table-bordered">
                <tr>
                    <td className="content">
                    <textarea className="text1" type="text" name="iboard_content" value={this.state.iboard_content}  onChange={this.handleChange.bind(this)}>
                    </textarea>  
                    </td>
                </tr>
                </table>
                <div className="btn-cont">
                <button type="submit" className="cont-btn">수정</button>
                <NavLink exact to="/QnA"><button type="button" className="backbtn">뒤로가기</button>
                </NavLink>
                </div>
            </form>
            </div> 
        )
    }
}

export default IboardUpdate;