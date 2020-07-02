import React,{useState} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';
import css from './Find.css';

// Modal.setAppElement('#root')

    function Find(){
        const [modalIsOpen, setModalIsOpen ] =useState(false)
   
        
        const Find = (
            <div className="Find-Modal">
                <button onClick={() => setModalIsOpen(true)}>찾기</button>
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
                    <input type="text" className="Input" placeholder="이름 입력"/><br/>
                <strong>·생년월일</strong><br/>
                    <input type="text" className="Input" placeholder="ex)19921030"/><br/>
                <strong>·E-mail</strong><br/>
                    <input type="text" className="Input" placeholder="ex) abc@matchground.com"/><br/>
                <button type="submit" class="btn btn-dark">아이디찾기</button>
                <button type="button" class="btn btn-dark" onClick={()=> setModalIsOpen(false)}>닫기</button>                </form>
            </TabPanel>
            <TabPanel>
              <form className="form">
                <br/>
                <strong>·아이디</strong><br/>
                    <input type="text" className="Input" placeholder="아이디 입력"/><br/>
                <strong>·이름</strong><br/>
                    <input type="text" className="Input" placeholder="이름 입력"/><br/>
                <strong>·생년월일</strong><br/>
                    <input type="text" className="Input" placeholder="ex)19921030"/><br/>
                <strong>·E-mail</strong><br/>
                    <input type="text" className="Input" placeholder="ex) abc@matchground.com"/>
                <br/>
                <button type="submit" class="btn btn-dark">비밀번호찾기</button>
                <button type="button" class="btn btn-dark" onClick={()=> setModalIsOpen(false)}>닫기</button>
                </form>
             </TabPanel>
        </Tabs>
        </Modal>

        </div>
);
    
        return(
            <div className="Find">
                {Find}
            </div>
        )
    }


export default Find