import React from 'react';
import Banner from '../MainComponents/Banner'
import ReactWeeklyDayPicker from 'react-weekly-day-picker'
import '../Css/Calender.css'
import '../Css/MainStyle.css'
import { Scrollbars } from 'react-custom-scrollbars';
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import Reservation from '../pages/Reservation'
import Thum from '../image/dobongA.jpg'

const Gujang=()=>(
    <div style={{border:'10px', height:'700px'}} className="Gujang">
            <ReactWeeklyDayPicker
                className="picker"
                startDay={new Date()} // First day as Date Object or 22 June 2016
                selectedDays={['10 June 2020', new Date()]} // Selected days list
                multipleDaySelect={false} //enables multiple day selection
            />
        <div className="GujangList" style={{border:'2px', position:"absolute", top:'330px',left:'0px', width:'100%', height:'512px'}}>
            <table style={{width:'1000px' ,border:'2px',position:'relative', left:'350px', top:'10px', fontSize:'13pt'}}>
                <tbody>
                    <tr align="center">
                        <td style={{width:'200px'}}>지역 선택</td>
                        <td>
                            <select className="form-control" style={{width:'300px',fontSize:'13pt'}}>
                                <option>서울</option>
                                <option>인천,경기</option>
                                <option>강원</option>
                                <option>경남</option>
                            </select>
                        </td>
                        <td style={{width:'200px'}}>지역/구장 검색</td>
                        <td>
                            <input type="text" className="form-control" style={{width:'200px',fontSize:'13pt'}}></input>    
                        </td>
                        <td style={{width:'130px'}}>
                            <button type="button" 
                            style={{backgroundColor:'#503396', width:'100px', border:'1px solid #503396',borderRadius:'10px', color:'white', outline:'none'}}>검색하기</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <hr/>
            <Scrollbars className="scroll" style={{width:'1350px', height:'480px', border:'2px'}}>
                <div style={{border:'2px',width:'1200px'}}  className="GujangTableDiv">
                <table className="MatchList" style={{border:'2px solid #503396',width:'1342px', top:'10px',verticalAlign:'top'}}>
                    <tbody>
                        <tr style={{border:'2px solid #503396'}}>
                            <td width="300px" style={{border:"2px solid #503396",height:'150px'}}>
                                <img src={Thum} alt="" style={{width:'301px' ,height:'190px',marginLeft:'3px',marginRight:'-9px'}}/>
                            </td>
                            <td width="1000px" valign="top" style={{paddingTop:'10px',fontSize:'11pt',height:'200px'}}>
                                <b style={{fontSize:'20pt', marginLeft:'10px'}}>도봉 라온 풋살장 A</b><br/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>주소 : 서울시 도봉구 방학동 553-2</b><br/>
                                <hr/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>예약시간</b><br/>
                                <button >6~8</button>
                                <button >8~10</button>
                                <button >10~12</button>
                                <button>12~14</button>
                                <button >14~16</button>
                                <button >16~18</button>
                                <button>20~22</button>
                                <button>22~24</button>
                                <NavLink to="/Match/Gujang/Reservation" style={{ textDecoration: 'none' }}>
                                <button style={{width:'150px',height:'30px',backgroundColor:'black',marginLeft:'150px'}}>예약하기</button>
                                </NavLink>
                            </td>
                        </tr>    
                        <tr style={{border:'2px solid #503396'}}>
                            <td width="300px" style={{border:"2px solid #503396",height:'150px'}}>
                                <img src={Thum} alt="" style={{width:'301px' ,height:'190px',marginLeft:'3px',marginRight:'-9px'}}/>
                            </td>
                            <td width="1000px" valign="top" style={{paddingTop:'10px',fontSize:'11pt',height:'200px'}}>
                                <b style={{fontSize:'20pt', marginLeft:'10px'}}>도봉 라온 풋살장 A</b><br/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>주소 : 서울시 도봉구 방학동 553-2</b><br/>
                                <hr/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>예약시간</b><br/>
                                <button >6~8</button>
                                <button >8~10</button>
                                <button >10~12</button>
                                <button>12~14</button>
                                <button >14~16</button>
                                <button >16~18</button>
                                <button>20~22</button>
                                <button>22~24</button>
                                <NavLink to="/Match/Gujang/Reservation" style={{ textDecoration: 'none' }}>
                                <button style={{width:'150px',height:'30px',backgroundColor:'black',marginLeft:'150px'}}>예약하기</button>
                                </NavLink>
                            </td>
                        </tr>    
                        <tr style={{border:'2px solid #503396'}}>
                            <td width="300px" style={{border:"2px solid #503396",height:'150px'}}>
                                <img src={Thum} alt="" style={{width:'301px' ,height:'190px',marginLeft:'3px',marginRight:'-9px'}}/>
                            </td>
                            <td width="1000px" valign="top" style={{paddingTop:'10px',fontSize:'11pt',height:'200px'}}>
                                <b style={{fontSize:'20pt', marginLeft:'10px'}}>도봉 라온 풋살장 A</b><br/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>주소 : 서울시 도봉구 방학동 553-2</b><br/>
                                <hr/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>예약시간</b><br/>
                                <button >6~8</button>
                                <button >8~10</button>
                                <button >10~12</button>
                                <button>12~14</button>
                                <button >14~16</button>
                                <button >16~18</button>
                                <button>20~22</button>
                                <button>22~24</button>
                                <NavLink to="/Match/Gujang/Reservation" style={{ textDecoration: 'none' }}>
                                <button style={{width:'150px',height:'30px',backgroundColor:'black',marginLeft:'150px'}}>예약하기</button>
                                </NavLink>
                            </td>
                        </tr>    
                        <tr style={{border:'2px solid #503396'}}>
                            <td width="300px" style={{border:"2px solid #503396",height:'150px'}}>
                                <img src={Thum} alt="" style={{width:'301px' ,height:'190px',marginLeft:'3px',marginRight:'-9px'}}/>
                            </td>
                            <td width="1000px" valign="top" style={{paddingTop:'10px',fontSize:'11pt',height:'200px'}}>
                                <b style={{fontSize:'20pt', marginLeft:'10px'}}>도봉 라온 풋살장 A</b><br/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>주소 : 서울시 도봉구 방학동 553-2</b><br/>
                                <hr/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>예약시간</b><br/>
                                <button >6~8</button>
                                <button >8~10</button>
                                <button >10~12</button>
                                <button>12~14</button>
                                <button >14~16</button>
                                <button >16~18</button>
                                <button>20~22</button>
                                <button>22~24</button>
                                <NavLink to="/Match/Gujang/Reservation" style={{ textDecoration: 'none' }}>
                                <button style={{width:'150px',height:'30px',backgroundColor:'black',marginLeft:'150px'}}>예약하기</button>
                                </NavLink>
                            </td>
                        </tr>    
                        <tr style={{border:'2px solid #503396'}}>
                            <td width="300px" style={{border:"2px solid #503396",height:'150px'}}>
                                <img src={Thum} alt="" style={{width:'301px' ,height:'190px',marginLeft:'3px',marginRight:'-9px'}}/>
                            </td>
                            <td width="1000px" valign="top" style={{paddingTop:'10px',fontSize:'11pt',height:'200px'}}>
                                <b style={{fontSize:'20pt', marginLeft:'10px'}}>도봉 라온 풋살장 A</b><br/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>주소 : 서울시 도봉구 방학동 553-2</b><br/>
                                <hr/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>예약시간</b><br/>
                                <button >6~8</button>
                                <button >8~10</button>
                                <button >10~12</button>
                                <button>12~14</button>
                                <button >14~16</button>
                                <button >16~18</button>
                                <button>20~22</button>
                                <button>22~24</button>
                                <NavLink to="/Match/Gujang/Reservation" style={{ textDecoration: 'none' }}>
                                <button style={{width:'150px',height:'30px',backgroundColor:'black',marginLeft:'150px'}}>예약하기</button>
                                </NavLink>
                            </td>
                        </tr>    
                        <tr style={{border:'2px solid #503396'}}>
                            <td width="300px" style={{border:"2px solid #503396",height:'150px'}}>
                                <img src={Thum} alt="" style={{width:'301px' ,height:'190px',marginLeft:'3px',marginRight:'-9px'}}/>
                            </td>
                            <td width="1000px" valign="top" style={{paddingTop:'10px',fontSize:'11pt',height:'200px'}}>
                                <b style={{fontSize:'20pt', marginLeft:'10px'}}>도봉 라온 풋살장 A</b><br/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>주소 : 서울시 도봉구 방학동 553-2</b><br/>
                                <hr/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>예약시간</b><br/>
                                <button >6~8</button>
                                <button >8~10</button>
                                <button >10~12</button>
                                <button>12~14</button>
                                <button >14~16</button>
                                <button >16~18</button>
                                <button>20~22</button>
                                <button>22~24</button>
                                <NavLink to="/Match/Gujang/Reservation" style={{ textDecoration: 'none' }}>
                                <button style={{width:'150px',height:'30px',backgroundColor:'black',marginLeft:'150px'}}>예약하기</button>
                                </NavLink>
                            </td>
                        </tr>    
                        <tr style={{border:'2px solid #503396'}}>
                            <td width="300px" style={{border:"2px solid #503396",height:'150px'}}>
                                <img src={Thum} alt="" style={{width:'301px' ,height:'190px',marginLeft:'3px',marginRight:'-9px'}}/>
                            </td>
                            <td width="1000px" valign="top" style={{paddingTop:'10px',fontSize:'11pt',height:'200px'}}>
                                <b style={{fontSize:'20pt', marginLeft:'10px'}}>도봉 라온 풋살장 A</b><br/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>주소 : 서울시 도봉구 방학동 553-2</b><br/>
                                <hr/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>예약시간</b><br/>
                                <button >6~8</button>
                                <button >8~10</button>
                                <button >10~12</button>
                                <button>12~14</button>
                                <button >14~16</button>
                                <button >16~18</button>
                                <button>20~22</button>
                                <button>22~24</button>
                                <NavLink to="/Match/Gujang/Reservation" style={{ textDecoration: 'none' }}>
                                <button style={{width:'150px',height:'30px',backgroundColor:'black',marginLeft:'150px'}}>예약하기</button>
                                </NavLink>
                            </td>
                        </tr>    
                        <tr style={{border:'2px solid #503396'}}>
                            <td width="300px" style={{border:"2px solid #503396",height:'150px'}}>
                                <img src={Thum} alt="" style={{width:'301px' ,height:'190px',marginLeft:'3px',marginRight:'-9px'}}/>
                            </td>
                            <td width="1000px" valign="top" style={{paddingTop:'10px',fontSize:'11pt',height:'200px'}}>
                                <b style={{fontSize:'20pt', marginLeft:'10px'}}>도봉 라온 풋살장 A</b><br/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>주소 : 서울시 도봉구 방학동 553-2</b><br/>
                                <hr/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>예약시간</b><br/>
                                <button >6~8</button>
                                <button >8~10</button>
                                <button >10~12</button>
                                <button>12~14</button>
                                <button >14~16</button>
                                <button >16~18</button>
                                <button>20~22</button>
                                <button>22~24</button>
                                <NavLink to="/Match/Gujang/Reservation" style={{ textDecoration: 'none' }}>
                                <button style={{width:'150px',height:'30px',backgroundColor:'black',marginLeft:'150px'}}>예약하기</button>
                                </NavLink>
                            </td>
                        </tr>    
                        <tr style={{border:'2px solid #503396'}}>
                            <td width="300px" style={{border:"2px solid #503396",height:'150px'}}>
                                <img src={Thum} alt="" style={{width:'301px' ,height:'190px',marginLeft:'3px',marginRight:'-9px'}}/>
                            </td>
                            <td width="1000px" valign="top" style={{paddingTop:'10px',fontSize:'11pt',height:'200px'}}>
                                <b style={{fontSize:'20pt', marginLeft:'10px'}}>도봉 라온 풋살장 A</b><br/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>주소 : 서울시 도봉구 방학동 553-2</b><br/>
                                <hr/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>예약시간</b><br/>
                                <button >6~8</button>
                                <button >8~10</button>
                                <button >10~12</button>
                                <button>12~14</button>
                                <button >14~16</button>
                                <button >16~18</button>
                                <button>20~22</button>
                                <button>22~24</button>
                                <NavLink to="/Match/Gujang/Reservation" style={{ textDecoration: 'none' }}>
                                <button style={{width:'150px',height:'30px',backgroundColor:'black',marginLeft:'150px'}}>예약하기</button>
                                </NavLink>
                            </td>
                        </tr>        
                        <tr style={{border:'2px solid #503396'}}>
                            <td width="300px" style={{border:"2px solid #503396",height:'150px'}}>
                                <img src={Thum} alt="" style={{width:'301px' ,height:'190px',marginLeft:'3px',marginRight:'-9px'}}/>
                            </td>
                            <td width="1000px" valign="top" style={{paddingTop:'10px',fontSize:'11pt',height:'200px'}}>
                                <b style={{fontSize:'20pt', marginLeft:'10px'}}>도봉 라온 풋살장 A</b><br/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>주소 : 서울시 도봉구 방학동 553-2</b><br/>
                                <hr/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>예약시간</b><br/>
                                <button >6~8</button>
                                <button >8~10</button>
                                <button >10~12</button>
                                <button>12~14</button>
                                <button >14~16</button>
                                <button >16~18</button>
                                <button>20~22</button>
                                <button>22~24</button>
                                <NavLink to="/Match/Gujang/Reservation" style={{ textDecoration: 'none' }}>
                                <button style={{width:'150px',height:'30px',backgroundColor:'black',marginLeft:'150px'}}>예약하기</button>
                                </NavLink>
                            </td>
                        </tr>    
                        <tr style={{border:'2px solid #503396'}}>
                            <td width="300px" style={{border:"2px solid #503396",height:'150px'}}>
                                <img src={Thum} alt="" style={{width:'301px' ,height:'190px',marginLeft:'3px',marginRight:'-9px'}}/>
                            </td>
                            <td width="1000px" valign="top" style={{paddingTop:'10px',fontSize:'11pt',height:'200px'}}>
                                <b style={{fontSize:'20pt', marginLeft:'10px'}}>도봉 라온 풋살장 A</b><br/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>주소 : 서울시 도봉구 방학동 553-2</b><br/>
                                <hr/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>예약시간</b><br/>
                                <button >6~8</button>
                                <button >8~10</button>
                                <button >10~12</button>
                                <button>12~14</button>
                                <button >14~16</button>
                                <button >16~18</button>
                                <button>20~22</button>
                                <button>22~24</button>
                                <NavLink to="/Match/Gujang/Reservation" style={{ textDecoration: 'none' }}>
                                <button style={{width:'150px',height:'30px',backgroundColor:'black',marginLeft:'150px'}}>예약하기</button>
                                </NavLink>
                            </td>
                        </tr>    
                        <tr style={{border:'2px solid #503396'}}>
                            <td width="300px" style={{border:"2px solid #503396",height:'150px'}}>
                                <img src={Thum} alt="" style={{width:'301px' ,height:'190px',marginLeft:'3px',marginRight:'-9px'}}/>
                            </td>
                            <td width="1000px" valign="top" style={{paddingTop:'10px',fontSize:'11pt',height:'200px'}}>
                                <b style={{fontSize:'20pt', marginLeft:'10px'}}>도봉 라온 풋살장 A</b><br/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>주소 : 서울시 도봉구 방학동 553-2</b><br/>
                                <hr/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>예약시간</b><br/>
                                <button >6~8</button>
                                <button >8~10</button>
                                <button >10~12</button>
                                <button>12~14</button>
                                <button >14~16</button>
                                <button >16~18</button>
                                <button>20~22</button>
                                <button>22~24</button>
                                <NavLink to="/Match/Gujang/Reservation" style={{ textDecoration: 'none' }}>
                                <button style={{width:'150px',height:'30px',backgroundColor:'black',marginLeft:'150px'}}>예약하기</button>
                                </NavLink>
                            </td>
                        </tr>    
                        <tr style={{border:'2px solid #503396'}}>
                            <td width="300px" style={{border:"2px solid #503396",height:'150px'}}>
                                <img src={Thum} alt="" style={{width:'301px' ,height:'190px',marginLeft:'3px',marginRight:'-9px'}}/>
                            </td>
                            <td width="1000px" valign="top" style={{paddingTop:'10px',fontSize:'11pt',height:'200px'}}>
                                <b style={{fontSize:'20pt', marginLeft:'10px'}}>도봉 라온 풋살장 A</b><br/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>주소 : 서울시 도봉구 방학동 553-2</b><br/>
                                <hr/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>예약시간</b><br/>
                                <button >6~8</button>
                                <button >8~10</button>
                                <button >10~12</button>
                                <button>12~14</button>
                                <button >14~16</button>
                                <button >16~18</button>
                                <button>20~22</button>
                                <button>22~24</button>
                                <NavLink to="/Match/Gujang/Reservation" style={{ textDecoration: 'none' }}>
                                <button style={{width:'150px',height:'30px',backgroundColor:'black',marginLeft:'150px'}}>예약하기</button>
                                </NavLink>
                            </td>
                        </tr>    
                        <tr style={{border:'2px solid #503396'}}>
                            <td width="300px" style={{border:"2px solid #503396",height:'150px'}}>
                                <img src={Thum} alt="" style={{width:'301px' ,height:'190px',marginLeft:'3px',marginRight:'-9px'}}/>
                            </td>
                            <td width="1000px" valign="top" style={{paddingTop:'10px',fontSize:'11pt',height:'200px'}}>
                                <b style={{fontSize:'20pt', marginLeft:'10px'}}>도봉 라온 풋살장 A</b><br/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>주소 : 서울시 도봉구 방학동 553-2</b><br/>
                                <hr/>
                                <b style={{fontSize:'15pt', marginLeft:'10px'}}>예약시간</b><br/>
                                <button >6~8</button>
                                <button >8~10</button>
                                <button >10~12</button>
                                <button>12~14</button>
                                <button >14~16</button>
                                <button >16~18</button>
                                <button>20~22</button>
                                <button>22~24</button>
                                <NavLink to="/Match/Gujang/Reservation" style={{ textDecoration: 'none' }}>
                                <button style={{width:'150px',height:'30px',backgroundColor:'black',marginLeft:'150px'}}>예약하기</button>
                                </NavLink>
                            </td>
                        </tr>    

                    </tbody>
                </table>
            </div>
            </Scrollbars>
        </div>
    </div>
)


export default Gujang;
