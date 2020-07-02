import React,{Component,useState, useEffect, Link} from 'react';
import {NavLink} from 'react-router-dom';
import '../Css/MainStyle.css'
import axios from 'axios';

function PwdCheck() {

    const [Lpwd,setLpwd]=useState(0);
    const [Lchk_pwd,setLchk_pwd]=useState(0);

    const _changeLpassword = function() {
        const Lpassword_v=document.getElementById('Password').value;
        setLpwd(Lpassword_v);
        console.log(Lpassword_v);
    }



    const checkLpwd=(e)=>{
        let url="http://localhost:9000/matchplay/login/selPwd?id="+sessionStorage.id+"&pwd="+Lpwd;
      
        axios.get(url)
        .then((responseData)=>{
            //url 로부터 받은 데이타 state 변수에 넣기
            console.log("select 함수 내 responseData.data2="+responseData.data);
            
            setLchk_pwd(responseData.data);
            
            //return responseData.data;
            console.log("Lchk_pwd:"+Lchk_pwd);
        }).catch((error)=>{
            console.log("list 에러:"+error);
            //return 0;
        });
       }
    

       const onSubmit=(e)=>{
        e.preventDefault();
        //alert("비밀번호 일치여부 : "+Lchk_pwd);
        if(Lchk_pwd===1)
        {
            alert("비밀번호가 일치합니다.");
            window.location="/Mypage/Account/PwdCheck/PwdChange";         
        }else{
            alert("비밀번호가 일치하지 않습니다.");
        }
      }
       
    return(
    <div align="center">
        <form onSubmit={onSubmit}>
        <table style={{border:'2px solid rgba(0,0,0,.1)',marginTop:'160px'}}>
            <tbody>
                <tr height="80px">
                    <td align="center" style={{fontSize:'20pt',width:'400px'}}>
                        <br/>현재 비밀번호를 입력해주세요.
                    </td>
                </tr>

                <tr height="50px">
                    <td align="center">
                        <input type="password" 
                        name="Password" id="Password"
                        placeholder="비밀번호" onChange={() => _changeLpassword() } onKeyUp={checkLpwd.bind()}
                        style={{width:'370px',height:'40px',marginTop:'30px',border:'2px solid Gainsboro'}}/>
                    </td>
                </tr>
                
                <tr height="100px">
                    <td align="center">
                            <button type="submit" 
                                style={{width:'150px', height:'50px',backgroundColor:'black', border:'2px solid white',borderRadius:'10px',boxShadow:'3px 3px 3px 0px gray',textDecoration: 'none', color:'white',fontSize:'20pt' }}>확인</button>
                    </td>
                </tr>
                
            </tbody>
        </table>
        </form>
    </div>
)
}

export default PwdCheck