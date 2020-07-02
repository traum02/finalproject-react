import React,{Component} from 'react';
import Match from './Match';

const Payment=()=>(
    <div align="center" style={{border:'1px'}}>
        <div style={{border:'2px solid #503396',width:'1000px',marginTop:'70px'}}>
        <table style={{marginTop:'50px'}}>
            <tbody>
                <tr>
                    <td align="center">
                        <b style={{fontSize:'20pt',color:'RoyalBlue'}}>2020년 6월 5일(금) 20~22 시</b><br/>
                        <b style={{fontSize:'15pt'}}>해당 경기를 예약하시면 
                        <b style={{fontSize:'25pt',color:'Salmon'}}>참가비 10,000 포인트</b></b>
                        <b style={{fontSize:'15pt'}}>가 차감되오며,</b><br/>
                        <b style={{fontSize:'15pt'}}>예약 후 환불은 불가하오니 신중히 진행해주시기 바랍니다.</b>
                    </td>
                </tr>
                <tr>
                    <td align="center" width="200px">
                        <b style={{fontSize:'15pt'}}>예약하시겠습니까?</b><br/>
                        <hr/>
                        <button type="button" style={{width:'200px',height:'50px',fontSize:'15pt',backgroundColor:'#503396',color:'white'}}>
                            예약하기
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <br/><br/>
        <div style={{border:'2px solid red', width:'600px'}}>
        <b style={{fontSize:'15pt'}}>〈 주의 사항 〉</b><br/><br/>
        <ul style={{width:'600px',listStylePosition:'inside',fontSize:'13pt',marginLeft:'0px'}} align="left">
            <li>
                다른 참가자들을 위해 시간을 준수해 주세요.
            </li>
            <li>
                풋살장에서는 반드시 풋살화를 착용하셔야 입장이 가능합니다.<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;(축구화 금지, 선수 안전과 풋살장 매너를 위해 꼭 지켜주세요)
            </li>
            <li>
                불필요한 언행, 지시 등은 삼가해주세요.
            </li>
            <li>
                과도한 경쟁, 승부욕은 나와 상대방의 부상을 야기할 수 있습니다.
            </li>
            <li>
                폭언, 폭행은 이용 정지의 심각한 사유가 될 수 있습니다.
            </li>
        </ul>
        </div>
        </div>
    </div>
)

export default Payment