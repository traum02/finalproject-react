import React,{Component} from 'react';
import '../Css/MainStyle.css'
import {NavLink} from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

const ReservationHistory=()=>(
    <div>
        <div style={{position:'absolute',width:'230px',height:'683px',backgroundColor:'#503396',border:'3px'}}>
            <table style={{width:'300px',height:'550px',fontSize:'20pt',border:'2px',marginTop:'62px',marginLeft:'20px'}} className="TemaMenu">
                <tbody>
                    <tr>
                        <td align="center" width="200px">
                            <NavLink exact to="/Mypage" 
                            style={{ textDecoration: 'none',color:'white'}}>
                                <button type="button" name="Hover" className="button-container-2"
                                style={{width:'250px', height:'80px',backgroundColor:'black', border:'2px solid white',borderRadius:'20px',boxShadow:'3px 3px 3px 0px gray'}}>MyPage Main</button>
                            </NavLink>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <NavLink exact to="/Mypage/Account" style={{ textDecoration: 'none',color:'white'}}>
                            <button type="button" 
                                style={{width:'250px', height:'80px',backgroundColor:'black', border:'2px solid white',borderRadius:'20px',boxShadow:'3px 3px 3px 0px gray'}}>Account</button>
                            </NavLink>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <NavLink exact to="/Mypage/ReservationHistory" style={{ textDecoration: 'none',color:'white'}}>
                            <button type="button" 
                                style={{width:'250px', height:'80px',backgroundColor:'black', border:'2px solid white',borderRadius:'20px',boxShadow:'3px 3px 3px 0px gray'}}>Reservation</button>
                            </NavLink>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <NavLink exact to="/Mypage/MyMatchHistory" style={{ textDecoration: 'none',color:'white'}}>
                            <button type="button" 
                                style={{width:'250px', height:'80px',backgroundColor:'black', border:'2px solid white',borderRadius:'20px',boxShadow:'3px 3px 3px 0px gray'}}>Match</button>
                            </NavLink>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <NavLink exact to="/Mypage/PointHistory" style={{ textDecoration: 'none',color:'white'}}>
                            <button type="button" 
                                style={{width:'250px', height:'80px',backgroundColor:'black', border:'2px solid white',borderRadius:'20px',boxShadow:'3px 3px 3px 0px gray'}}>Point</button>
                            </NavLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div align="center" style={{position:'absolute',top:'250px',left:'650px'}}>
        <table style={{fontSize:'13pt'}}>
                <tbody>
                    <tr>
                        <td align="center">
                            <select>
                                <option>전체예약</option>
                                <option>친선경기</option>
                                <option>리그경기</option>
                            </select>
                        </td>
                        <td width="120px" align="center">
                            <b style={{fontSize:'13pt'}}>날짜 선택</b>
                        </td>
                        <td>
                            <input type="Date"/> ~ <input type="Date"/>
                        </td>
                        <td width="120px" align="center">
                            <b style={{fontSize:'13pt'}}>구장명</b>
                        </td>
                        <td>
                            <input type="text"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style={{position:'absolute',left:'500px',top:'320px',width:'1200px',height:'100px',border:'3px'}}>
            <table className="ResTable" style={{fontSize:'13pt'}}>
                <thead align="center">
                    <tr height="50px" style={{backgroundColor:'#503396',color:'white'}}>
                        <td width="140px">경기종류</td>
                        <td width="110px">분류</td>
                        <td width="130px">날짜</td>
                        <td width="100px">예약 시간</td>
                        <td width="300px">구장</td>
                        <td width="450px">위치</td>
                        <td width="120px">예약 현황</td>
                        <td width="150px">경기 여부</td>
                    </tr>
                </thead>
                <tbody align="center">
                    <tr height="40px">
                        <td>Friendly</td>
                        <td>개인전</td>
                        <td>20-06-10</td>
                        <td>10~12</td>
                        <td>도봉 루다 풋살장 A</td>
                        <td>서울 도봉구 방학동 271-2</td>
                        <td>예약완료</td>
                        <td style={{color:'DodgerBlue'}}>
                            경기예정
                        </td>
                    </tr>
                    <tr height="40px">
                        <td>Friendly</td>
                        <td>팀</td>
                        <td>20-06-09</td>
                        <td>16~18</td>
                        <td>도봉 루다 풋살장 A</td>
                        <td>서울 도봉구 방학동 271-2</td>
                        <td>예약완료</td>
                        <td style={{color:'DodgerBlue'}}>
                            경기예정
                        </td>
                    </tr>
                    <tr height="40px">
                        <td>League</td>
                        <td>팀</td>
                        <td>20-06-08</td>
                        <td>06~08</td>
                        <td>도봉 루다 풋살장 A</td>
                        <td>서울 도봉구 방학동 271-2</td>
                        <td>예약완료</td>
                        <td style={{color:'DodgerBlue'}}>
                            경기예정
                        </td>
                    </tr>
                    <tr height="40px">
                        <td>Friendly</td>
                        <td>개인전</td>
                        <td>20-06-07</td>
                        <td>10~12</td>
                        <td>도봉 루다 풋살장 A</td>
                        <td>서울 도봉구 방학동 271-2</td>
                        <td>예약완료</td>
                        <td style={{color:'red'}}>
                            경기불참
                        </td>
                    </tr>
                    <tr height="40px">
                        <td>Friendly</td>
                        <td>개인전</td>
                        <td>20-06-05</td>
                        <td>10~12</td>
                        <td>도봉 루다 풋살장 A</td>
                        <td>서울 도봉구 방학동 271-2</td>
                        <td>예약완료</td>
                        <td style={{color:'red'}}>
                            경기불참
                        </td>
                    </tr>
                    <tr height="40px">
                        <td>Friendly</td>
                        <td>개인전</td>
                        <td>20-06-05</td>
                        <td>10~12</td>
                        <td>도봉 루다 풋살장 A</td>
                        <td>서울 도봉구 방학동 271-2</td>
                        <td>예약완료</td>
                        <td style={{color:'green'}}>
                            경기완료
                        </td>
                    </tr>
                    <tr height="40px">
                        <td>Friendly</td>
                        <td>개인전</td>
                        <td>20-06-05</td>
                        <td>10~12</td>
                        <td>도봉 루다 풋살장 A</td>
                        <td>서울 도봉구 방학동 271-2</td>
                        <td>예약실패</td>
                        <td style={{color:'black'}}>
                            매칭실패
                        </td>
                    </tr>
                    <tr height="40px">
                        <td>Friendly</td>
                        <td>개인전</td>
                        <td>20-06-05</td>
                        <td>10~12</td>
                        <td>도봉 루다 풋살장 A</td>
                        <td>서울 도봉구 방학동 271-2</td>
                        <td>예약완료</td>
                        <td style={{color:'green'}}>
                            경기완료
                        </td>
                    </tr>
                    <tr height="40px">
                        <td>Friendly</td>
                        <td>개인전</td>
                        <td>20-06-05</td>
                        <td>10~12</td>
                        <td>도봉 루다 풋살장 A</td>
                        <td>서울 도봉구 방학동 271-2</td>
                        <td>예약완료</td>
                        <td style={{color:'green'}}>
                            경기완료
                        </td>
                    </tr>
                    <tr height="40px">
                        <td>Friendly</td>
                        <td>개인전</td>
                        <td>20-06-05</td>
                        <td>10~12</td>
                        <td>도봉 루다 풋살장 A</td>
                        <td>서울 도봉구 방학동 271-2</td>
                        <td>예약실패</td>
                        <td style={{color:'black'}}>
                            매칭실패
                        </td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <React.Fragment>
                            <nav aria-label="Page navigation" style={{}}>
                                    <ul className="pagination" style={{fontSize:'13pt'}}>
                                    <li title="이전 페이지보기" className="page-item">
                                        <a className="page-link" href="#" style={{color:'black'}}>◀</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" style={{color:'black'}}>1</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" style={{color:'black'}}>2</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" style={{color:'black'}}>3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" style={{color:'black'}}>4</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" style={{color:'black'}}>5</a></li>
                                    <li title="이후 페이지 보기" className="page-item">
                                        <a className="page-link" href="#" style={{color:'black'}}>▶</a></li>
                                </ul>
                                </nav>
                        </React.Fragment>
        </div>
    </div>
)

export default ReservationHistory