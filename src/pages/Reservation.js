import React, { Component } from 'react';
import {NavLink,Route } from "react-router-dom";
import Slider from 'infinite-react-carousel';
import { Scrollbars } from 'react-custom-scrollbars';
import Table from 'react-bootstrap/Table'
import '../Css/MainStyle.css'
import Carousel from 'nuka-carousel';
import Man from '../image/jinman.png'
import Match from '../image/jinmatch.png'
import Vs from '../image/jinvs.png'
import JinShoes from '../image/jinshoes.jpg'
import Parking from '../image/parking.png'
import Football from '../image/football.png'
import Uniform from '../image/uniform.png'
import Shower from '../image/shower.png'
import Shoes from '../image/shoes.png'

const Reservation=()=>(
  <div>
    <Scrollbars className="ReScroll" style={{width:'100%', height:'683px', border:'2px'}}>
    <Carousel
      className="Carousel"
      width="100%"
      autoplay="true"
      autoplayInterval="2000"
      wrapAround="true"
      // framePadding="50px 0 200px 0"
      cellAlign="center"
      // slideWidth="600px"
      style={{height:'600px',border:'2px'}}>
        <img src="https://plab-football.s3.amazonaws.com/media/dobong_coner.jpg" alt="First Slide" style={{border:'2px'}}/>
        <img src="https://plab-football.s3.amazonaws.com/media/doboal_goal.jpg" alt=""/>
        <img src="https://plab-football.s3.amazonaws.com/media/player_fJKkASh.jpg" alt=""/>
    </Carousel>
    <div style={{width:'1342px', height:'1500px', border:'2px', position:'relative', left:'450px', marginTop:'-30px'}}>
      <br/>
      <b className="txt1">도봉 루다 풋살장</b><br/>
      <b className="txt2">서울 도봉구 방학동 271-2 </b>
      <b className="txt3">// 지도보기</b><br/><br/>
      <b className="txt4">참가비</b><br/>
      <b className="txt5">10,000원</b>
      <hr style={{width:'1000px', marginLeft:'0px'}}/>
      <b className="txt6">진행방식</b><br/><br/>
      <table>
        <tbody>
          <tr>
            <td align="center" width="200px" style={{border:'1px solid rgba(0,0,0,.1)', height:'200px'}}>
              <img src={Vs} alt="" style={{width:'120px'}}/><br/>
              <b>5 vs 5 매치</b>
            </td>
            <td align="center" width="200px" style={{border:'1px solid rgba(0,0,0,.1)'}}>
              <img src={Match} alt="" style={{width:'140px', height:'140px', marginTop:'-20px'}}/><br/>
              <b>친선 경기</b>
            </td>
            <td align="center" width="200px" style={{border:'1px solid rgba(0,0,0,.1)'}}>
              <img src={Man} alt="" style={{width:'120px', height:'120px'}}/><br/>
              <b>남성 매치</b>
            </td>
            <td align="center" width="200px" style={{border:'1px solid rgba(0,0,0,.1)'}}>
              <img src={JinShoes} alt="" style={{width:'120px', height:'120px'}}/><br/>
              <b>풋살화 착용</b>
            </td>
          </tr>
        </tbody>
      </table>
      <br/>
      {/* <hr/> */}
      <table className="ReButton" style={{border:'2px'}}>
        <tbody>
          <tr>
          <td width="700px" valign="top" style={{paddingTop:'10px',fontSize:'11pt',height:'100px'}}>
            <b className="txt7" >예약시간</b><br/>
            <b className="txt8" >예약 시간을 선택해주세요.</b><br/>
            <button >6~8</button>
            <button >8~10</button>
            <button >10~12</button>
            <button>12~14</button>
            <button >14~16</button>
            <button >16~18</button>
            <button>20~22</button>
            <button className="disbtn">22~24</button>
            </td>
          </tr>
        </tbody>
      </table>
      <br/>
      {/* <hr/> */}
      <div>
      <Table bordered className="table table-bodered" style={{width:'1000px',border:'2px'}}>
        <tbody>
          <tr>
            <td colSpan="2" align="center" style={{fontSize:'40pt',fontWeight:'bold'}}>
              5 vs 5 일반매치 경기
            </td>
          </tr>
          <tr>
            <td align="center">
              <b style={{fontSize:'15pt'}}>총 인원 : 5</b><br/>
              <b style={{fontSize:'25pt'}}>Home</b><br/>
            </td>
            <td align="center">
              <b style={{fontSize:'15pt'}}>총 인원 : 5</b><br/>
              <b style={{fontSize:'25pt'}}>Away</b><br/>
            </td>
          </tr>
          <tr>
            <td align="center">
              <b style={{fontSize:'15pt'}}>현재 참여 가능 인원</b><br/>
              <b style={{fontSize:'80pt'}}>3</b><br/><br/>
              <NavLink to="/Match/Gujang/Reservation/Payment" style={{ textDecoration: 'none' }}>
              <button style={{width:'140px',height:'40px',backgroundColor:'#503396',color:'white',fontSize:'15pt',border:'#503396',outline:'none'}}>예약하기</button>
              </NavLink>
            </td>
            <td align="center">
              <b style={{fontSize:'15pt'}}>현재 참여 가능 인원</b><br/>
              <b style={{fontSize:'80pt'}}>2</b><br/><br/>
              <NavLink to="/Match/Gujang/Reservation/Payment" style={{ textDecoration: 'none' }}>
              <button style={{width:'140px',height:'40px',backgroundColor:'#503396',color:'white',fontSize:'15pt',border:'#503396',outline:'none'}}>예약하기</button>
              </NavLink>
            </td>
          </tr>
        </tbody>
      </Table>
      </div>
      {/* <hr/> */}
      <br/>
      <b className="txt6">구장 시설</b><br/><br/>
      <table>
        <tbody>
          <tr>
            <td align="center" width="200px" style={{border:'1px solid rgba(0,0,0,.1)', height:'200px'}}>
              <img src={Parking} alt="" style={{width:'120px'}}/><br/>
              <b>주차</b>
            </td>
            <td align="center" width="200px" style={{border:'1px solid rgba(0,0,0,.1)'}}>
              <img src={Football} alt="" style={{width:'120px', height:'120px'}}/><br/>
              <b>공 대여</b>
            </td>
            <td align="center" width="200px" style={{border:'1px solid rgba(0,0,0,.1)'}}>
              <img src={Shower} alt="" style={{width:'120px', height:'120px'}}/><br/>
              <b>샤워 시설</b>
            </td>
            <td align="center" width="200px" style={{border:'1px solid rgba(0,0,0,.1)'}}>
              <img src={Shoes} alt="" style={{width:'120px', height:'70px', marginTop:'30px'}}/><br/><br/>
              <b>풋살화 대여</b>
            </td>
            <td align="center" width="200px" style={{border:'1px solid rgba(0,0,0,.1)'}}>
              <img src={Uniform} alt="" style={{width:'120px', height:'120px'}}/><br/>
              <b>유니폼 대여</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </Scrollbars>
  </div>
)

export default Reservation;