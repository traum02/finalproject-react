import React,{Component} from 'react';
import Modal from 'react-modal';
import logo from '../image/logo.png';
import kickin from '../image/kickin.png';
import hand from '../image/hand.png';
import time from '../image/time.jpg';
import backpass from '../image/backpass.png';
import goal from '../image/goal.png';
import foul from '../image/foul.png';
import '../Css/League.css';

const modalstyles = {
    content : {
      top                   : '40%',
      left                  : '20%',
      right                 : 'auto',
    
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      textAlign             : 'center',
     
    }
  };
function League(){
    var subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal(){
        subtitle.style.color= '#f00';
    }

    function closeModal(){
        setIsOpen (false);
    }
    return(
        <div>
            <div className="information">
            <button onClick={openModal} className="leaguejoin">참 가 신 청</button>
            <Modal 
                isOpen={modalIsOpen}
                onafterOepn={afterOpenModal}
                onREquestClose={closeModal}
                style={modalstyles}
                contentLable="Example Modal">

          
              <img src={logo} className="logo"/>
                
                <div className="roleguide">
                    
                    <table class="table table-bordered">
                        <tr>
                            <td colspan='2'><b>Role Guide</b></td>
                        </tr>
                        <tr>
                            <td>
                                <img src={kickin} className="emogi"/><br/>
                                
                                     <b>킥인은 발로</b>
                            </td>
                            <td>
                                <img src={hand} className="emogi"/><br/>
                                    <b>골킥은 손으로</b>
       
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src={time} className="emogi"/><br/>
                                    <b>킥은 4초이내</b>
                            </td>
                            <td>
                                <img src={backpass} className="emogi"/><br/>
                                    <b>백패스 금지</b>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src={foul} className="emogi"/><br/>   
                                    <b>파울은 5회까지만</b>
                            </td>
                            <td>
                                <img src={goal} className="emogi"/><br/>
                                    <b>위반시 간접 프리킥</b>
                            </td>
                        </tr>    
                    </table>
                   

                </div>
               
                    
                <div className="schedule">
                <b style={{color:'red'}}>Schedule & Place</b>
                    <p>경기 일정및 경기장소는 경기일정에 따라 임의로 지정됨을 알려드립니다</p>
                    <p>일정및 장소는 변경이 불가하며</p>
                    <p>불가피한 사정으로 경기 불참시 기권패로 처리합니다.</p>
                    <p>경기 일정및 경기장소는 리그개막후 확인하실 수 있습니다.</p>
                </div>
                <div className="refund">
                    <b style={{color:'red'}}>Charge & Refund</b>
                    <p>리그 참여 비용은 60만포인트 입니다.</p>
                    <p>리그 신청기간에만 환불정책따라 환불이 가능합니다.</p>
                    <p>신청 기간 이후에는 환불이 불가 하며,</p>
                    <p>이를 숙지 후 리그 신청 바랍니다.</p>
                </div>
                <div className="leagueagree">
                    <b style={{color:'red'}}>Application</b>
                    <p>위의 사항에 동의하며,</p>
                    <p>리그에 참여 합니다.</p>
                    <b>동의</b><input type="checkbox"></input>
                </div>
                <button type="button" className='agbtn'>참여하기</button>&nbsp;&nbsp;&nbsp;
                <button onClick={closeModal} className="agbtn">닫기</button>
            </Modal>
        </div>
    </div>
    )
}

// const League=()=>(
//     <div>
//         <div>
//             리그
           
//         </div>

//     </div>
// )

export default League