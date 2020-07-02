import React,{Component} from 'react';
import {NavLink,Route} from 'react-router-dom';
import css from '../css/JoinForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Title from './Title.js';
class joinForm extends Component{

   
    render(){
        
        

        return(
            <div>
                
                 <form>
                     <table className='Join'>
                        <hr/>
                        <h5 className='Title'>가입 정보 입력</h5>
                        <span className="Context">로그인 정보 및 가입 정보를 입력하세요.</span>
                        <hr/>
                        <strong class="lititle">·아이디</strong><br/>
                         <input type="text" className="Input" placeholder="아이디 입력"/><br/>

                        <strong >·비밀번호</strong><br/>
                         <input type="password" className="Input" placeholder="특수문자를 포함한 8 ~ 15 입력"/><br/>

                        <strong>·비밀번호 확인</strong><br/>
                         <input type="password" className="Input" placeholder="비밀번호 확인"/><br/>

                        <strong>·이메일주소</strong><br/>
                         <input type="text" className="Input" placeholder="ex) abc@matchground.com"/><br/>

                        <strong>·이름</strong><br/>
                         <input type="text" className="Input" placeholder="이름 입력"/><br/>

                        <strong>·생년월일</strong><br/>
                         <input type="text" className="Input" placeholder="ex)1992년10월30일->19921030"></input><br/>

                        
                        <strong>·성별</strong><br/>
                        <div className="gender">
                          <label>
                            <input type="radio" value="option1" checked={true} name="gender"/>
                              여자
                             </label>
                             &nbsp;&nbsp;&nbsp;
                            <label>
                            <input type="radio" value="option2" name="gender" />
                             남자
                         </label>  
                         </div>                 

                        <strong>·주소</strong><br/>
                            <input type="text" className="addr" placeholder="읍/면/동/리 까지 입력"/><br/>
                            <input type="text" className="Input" placeholder="상세주소입력"/><br/><br/>

                        
                        <strong>·휴대폰번호</strong><br/>
                            <input type="text" className="Input" placeholder="'-'없이 입력->01012345678"></input><br/>
                        <div className="Agree">
                            
                            <h4>개인정보 수집 이용 안내 </h4><hr/><br/>
                            <strong>수집목적</strong><hr/>
                            <p>고객맞춤형 상품및 서비스 추천,당사 신규 상품/ 서비스 안내 및 권유 사은/할인 행사 등
                                각종 이벤트 정보 등의 안내 및 권유 </p>
                            <strong>수집항목</strong><hr/>
                            <p>이메일, 휴대폰번호, 주소 , 생년월일, 포인트 적립 및 사용 정보, 접속로그 </p>
                            <strong>보유기간</strong><hr/>
                            <p>회원 탈퇴 시 혹은 이용 목적 달성 시 까지 </p>
                            <div className="AgreeContent">
                          <label>
                            <input type="radio" value="0" checked={true} name="AgreeContent"/>
                              동의
                             </label>
                             &nbsp;&nbsp;&nbsp;
                            <label>
                            <input type="radio" value="1" name="AgreeContent" />
                             미동의
                         </label>  
                         </div>     
                            
                        </div>
                        <br/><br/>
                    </table>
                
                    <div className="joinbtn">
                    <NavLink to="/JoinFinal"  ><button className="joinbtn">회원가입</button></NavLink>
                    <button type="submit" className="backbtn">뒤로가기</button>
                    </div>
                </form>
            </div>
        )


    }
}

export default joinForm;