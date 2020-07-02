import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Modal from 'react-modal';
import '../css/LoginForm.css';
import JoinForm from './JoinForm.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from './x-img.png';
import {NavLink,Route}  from 'react-router-dom';
import Title from './Title.js';





Modal.setAppElement('#root')
function LoginForm() {
    const [modalIsOpen, setModalIsOpen ] =useState(false)
    const [idx,setIdx]=useState(0);
        
    const Find = (
        <div className="Find-Modal" >
            
        <Modal isOpen={modalIsOpen}>
         <Tabs defaultIndex={0} onSelect={index => console.log(index)}>
        <TabList className="Tab">
          <Tab>아이디 찾기</Tab>
          <Tab>비밀번호 찾기</Tab>
        </TabList>

        <TabPanel>
          
          <form className="form">
             <br/>
            <strong>·이름</strong><br/>
                <input type="text" className="Input1" placeholder="이름 입력"/><br/>
            <strong>·생년월일</strong><br/>
                <input type="text" className="Input1" placeholder="ex)19921030"/><br/>
            <strong>·E-mail</strong><br/>
                <input type="text" className="Input1" placeholder="ex) abc@matchground.com"/><br/>
            <button type="submit" class="btn btn-Info">아이디찾기</button>
            <button type="button" class="btn btn-Info" onClick={()=> setModalIsOpen(false)}>닫기</button>                
            </form>
        </TabPanel>
        <TabPanel>
          <form className="form">
            <br/>
            <strong>·아이디</strong><br/>
                <input type="text" className="Input1" placeholder="아이디 입력"/><br/>
            <strong>·이름</strong><br/>
                <input type="text" className="Input1" placeholder="이름 입력"/><br/>
            <strong>·생년월일</strong><br/>
                <input type="text" className="Input1" placeholder="ex)19921030"/><br/>
            <strong>·E-mail</strong><br/>
                <input type="text" className="Input1" placeholder="ex) abc@matchground.com"/>
            <br/>
            <button type="submit" class="btn btn-Info">비밀번호찾기</button>
            <button type="button" class="btn btn-Info" onClick={()=> setModalIsOpen(false)}>닫기</button>
            </form>
         </TabPanel>
    </Tabs>
    </Modal>

    </div>
);


    
        return(
            

            <div className="Login-Modal">
                <button onClick={() => setModalIsOpen(true)}>Login</button>
            <Modal isOpen={modalIsOpen} >           
            <div>
            <h3 className="Head">로그인</h3>
            <button className="x" onClick={() => setModalIsOpen(false)}><img  classNmame="img" src={img} alt=""/></button>
            </div>
            <form>
               
                      <input type="text" className="Id"  
                        placeholder="아이디"></input>
            
                        <input type="password" className="Password" 
                        placeholder="비밀번호"></input>  

                        <input type="checkbox" className="SaveId"/>
                        <label htmlFor="SaveID">아이디 저장</label>
                <br/>
                <button className="btn btn-dark">Login</button> <br/>
                
               
              <div className="FindDiv" onClick={()=>{
                 setIdx(1)
              }} style={{cursor:'pointer'}}>ID/PW찾기<b>   |</b></div>

              {idx===1?Find:''}

              
              <NavLink className="link" to="/JoinForm">회원가입</NavLink>
              
            </form>
            
            </Modal>
        </div>
        )
    }


    
export default LoginForm

