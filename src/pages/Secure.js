import React,{Component} from 'react';
import '../Css/Secure.css';
import key from '../image/keys.png'

class Secure extends Component{

    render(){
        return(
            <div className="sc">
                <h1 class="scTitle">Q & A</h1>
                <div className="scform">
                    <h1>비밀글 보기<img src={key} className="key"></img></h1>
                    <b>이글은 비밀글입니다.<br/>
                    비밀번호를 입력하여 주세요</b><br/><br/><br/>
                    <b>▹&nbsp;비밀번호&nbsp;&nbsp;&nbsp;&nbsp;</b>
                    <input type="password"></input> <br/><br/><br/>
                    <button type="button" className="scbtn">확인</button>&nbsp;&nbsp;
                    <button type="button" className="scbtn">뒤로가기</button>
                </div>
            </div>
        )
    }
}

export default Secure

