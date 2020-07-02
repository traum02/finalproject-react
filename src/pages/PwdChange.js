import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import '../Css/MainStyle.css'

const PwdChange=()=>(
    <div align="center">
        <table style={{border:'2px solid rgba(0,0,0,.1)',marginTop:'130px', width:'450px'}}>
            <tbody>
                <tr height="70px">
                    <td align="center" width="400px" style={{fontSize:'18pt'}}>
                        <br/>변경하실 비밀번호를 입력해주세요.
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <input type="password" style={{width:'370px',height:'40px',marginTop:'10px',border:'2px solid Gainsboro'}}/>
                    </td>
                </tr>
                <tr height="60px">
                    <td align="center" style={{fontSize:'18pt'}}>
                        <br/>비밀번호 확인
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <input type="password" style={{width:'370px',height:'40px',marginTop:'10px',border:'2px solid Gainsboro'}}/>
                    </td>
                </tr>
                <tr height="100px">
                    <td align="center">
                        <NavLink exact to="/Mypage/Account" style={{ textDecoration: 'none',color:'white',fontSize:'20pt'}}>
                            <button type="button" 
                                style={{width:'150px', height:'50px',backgroundColor:'black', border:'2px solid white',borderRadius:'10px',boxShadow:'3px 3px 3px 0px gray'}}>변경 완료</button>
                        </NavLink>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
)

export default PwdChange