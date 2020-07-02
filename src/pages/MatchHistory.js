import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import '../Css/MainStyle.css'
import { Scrollbars } from 'react-custom-scrollbars';
import Tot from '../image/tottenham.png'
import City from '../image/mancity.png'
import Ever from '../image/everton.png'
import Manu from '../image/manu.png'
import Liver from '../image/liverpool.png'


const MatchHistory=()=>(
    <div>
        <div style={{position:'absolute',width:'230px',height:'683px',backgroundColor:'#503396',border:'3px'}}>
            <table style={{width:'300px',height:'550px',fontSize:'20pt',border:'2px',marginTop:'62px',marginLeft:'20px'}} className="TemaMenu">
                <tbody>
                    <tr>
                        <td align="center" width="200px">
                            <NavLink exact to="/Team/TeamHome" 
                            style={{ textDecoration: 'none',color:'white'}}>
                                <button type="button" name="Hover" className="button-container-2"
                                style={{width:'250px', height:'80px',backgroundColor:'black', border:'2px solid white',borderRadius:'20px',boxShadow:'3px 3px 3px 0px gray'}}>Team Main</button>
                            </NavLink>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <NavLink exact to="/Team/TeamHome/TeamMember" style={{ textDecoration: 'none',color:'white'}}>
                            <button type="button" 
                                style={{width:'250px', height:'80px',backgroundColor:'black', border:'2px solid white',borderRadius:'20px',boxShadow:'3px 3px 3px 0px gray'}}>TeamMember</button>
                            </NavLink>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <NavLink exact to="/Team/TeamHome/MatchHistory" style={{ textDecoration: 'none',color:'white'}}>
                            <button type="button" 
                                style={{width:'250px', height:'80px',backgroundColor:'black', border:'2px solid white',borderRadius:'20px',boxShadow:'3px 3px 3px 0px gray'}}>MatchHistory</button>
                            </NavLink>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <NavLink exact to="/Team/TeamHome/TeamBoard" style={{ textDecoration: 'none',color:'white'}}>
                            <button type="button" 
                                style={{width:'250px', height:'80px',backgroundColor:'black', border:'2px solid white',borderRadius:'20px',boxShadow:'3px 3px 3px 0px gray'}}>TeamBoard</button>
                            </NavLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style={{position:'absolute',left:'550px',top:'210px'}}>
            <b style={{fontSize:'18pt',color:'#503396'}}>일반 경기 전적</b><br/>
            <table className="Record">
                <thead>
                    <tr>
                        <td align="center" style={{width:'60px'}}>
                            <b>총</b>
                        </td >
                        <td align="center" style={{width:'60px'}}>
                            <b>승</b>
                        </td >
                        <td align="center" style={{width:'60px'}}>
                            <b>패</b>
                        </td>
                        <td align="center" style={{width:'60px'}}>
                            <b>무</b>
                        </td>
                        <td align="center" style={{width:'70px'}}>
                            <b>승률</b>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td align="center">
                            <b>29</b>
                        </td>
                        <td align="center">
                            <b>11</b>
                        </td>
                        <td align="center">
                            <b>8</b>
                        </td>
                        <td align="center">
                            <b>10</b>
                        </td>
                        <td align="center">
                            <b>83%</b>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style={{position:'absolute',left:'1150px',top:'210px'}}>
            <b style={{fontSize:'18pt',color:'#503396'}}>리그 전적</b><br/>
            <table className="Record">
                <thead>
                    <tr>
                        <td align="center" style={{width:'60px'}}>
                            <b>총</b>
                        </td >
                        <td align="center" style={{width:'60px'}}>
                            <b>승</b>
                        </td >
                        <td align="center" style={{width:'60px'}}>
                            <b>패</b>
                        </td>
                        <td align="center" style={{width:'60px'}}>
                            <b>무</b>
                        </td>
                        <td align="center" style={{width:'70px'}}>
                            <b>승률</b>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td align="center">
                            <b>29</b>
                        </td>
                        <td align="center">
                            <b>11</b>
                        </td>
                        <td align="center">
                            <b>8</b>
                        </td>
                        <td align="center">
                            <b>10</b>
                        </td>
                        <td align="center">
                            <b>83%</b>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style={{position:'absolute',left:'500px',top:'340px',width:'1200px',height:'100px'}} align="center">
            <table style={{fontSize:'13pt'}}>
                <tbody>
                    <tr>
                        <td align="center">
                            <select>
                                <option>전체경기</option>
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
                            <b style={{fontSize:'13pt'}}>상대 팀명</b>
                        </td>
                        <td>
                            <input type="text"/>
                        </td>
                        <td width="110px" align="center">
                            <b style={{fontSize:'13pt'}}>승/무/패</b>
                        </td>
                        <td width="120px" align="center">
                            <select>
                                <option>경기결과</option>
                                <option>승</option>
                                <option>무</option>
                                <option>패</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Scrollbars className="ReScroll" style={{width:'1200px', height:'493px',position:'absolute',top:'390px',left:'500px'}}>
        <div style={{boder:'3px solid yellow'}}>
            <table style={{border:'2px solid rgba(0,0,0,.1)'}}>
                <tbody>
                    <tr style={{borderBottom:'1px solid rgba(0,0,0,.1)',height:'40px',backgroundColor:'#b3e5fc'}}>
                        <td align="center" style={{border:'1px solid gray'}}>
                            <b style={{fontSize:'15pt'}}>20.06.02(금)</b>
                        </td>
                        <td align="center" style={{border:'1px solid gray',width:'400px'}}>
                            <b style={{fontSize:'15pt'}}>Friendly Match</b>
                        </td>
                        <td align="center" style={{border:'1px solid gray'}}>
                            <b style={{fontSize:'15pt'}}>상대팀 : 맨시티</b>
                        </td>
                        <td style={{border:'1px solid gray'}}>
                            <b style={{fontSize:'15pt',float:'left',color:'blue',float:'right',marginRight:'50px'}}>승리</b>
                        </td>
                    </tr>
                    <tr style={{borderBottom:'1px solid rgba(0,0,0,.1)',backgroundColor:'LightSkyBlue'}}>
                        <td align="center" style={{border:'1px solid gray', width:'200px'}}>
                            <img src={Tot} alt="" style={{width:'100px',paddingTop:'10px',paddingBottom:'10px',border:'1px'}}/>
                        </td>
                        <td align="center" style={{width:'300px',border:'1px solid gray'}}>
                            <b style={{fontSize:'60pt'}}>2 : 0</b>
                        </td>
                        <td style={{border:'1px solid gray', width:'200px'}} align="center">
                            <img src={City} alt="" style={{width:'100px',marginLeft:'0px',paddingTop:'10px',paddingBottom:'10px',border:'1px'}}/>
                        </td>
                        <td width="400px" style={{border:'1px solid gray'}}>
                            <b style={{fontSize:'15pt',marginLeft:'50px'}}>경기 장소 :</b>
                            <b style={{fontSize:'15pt'}}>도봉 루다 풋살장 A</b>
                            <br/>
                            <b style={{fontSize:'15pt',marginLeft:'50px'}}>주소 :</b>
                            <b style={{fontSize:'15pt'}}>서울 도봉구 방학동 271-2</b>    
                        </td>
                    </tr>
                </tbody>
            </table>
            <table style={{border:'2px solid rgba(0,0,0,.1)'}}>
                <tbody>
                    <tr style={{borderBottom:'1px solid rgba(0,0,0,.1)',height:'40px',backgroundColor:'#b3e5fc'}}>
                        <td align="center" style={{border:'1px solid gray'}}>
                            <b style={{fontSize:'15pt'}}>20.06.03(토)</b>
                        </td>
                        <td align="center" style={{border:'1px solid gray',width:'400px'}}>
                            <b style={{fontSize:'15pt'}}>Friendly Match</b>
                        </td>
                        <td align="center" style={{border:'1px solid gray'}}>
                            <b style={{fontSize:'15pt'}}>상대팀 : 에버턴</b>
                        </td>
                        <td style={{border:'1px solid gray'}}>
                            <b style={{fontSize:'15pt',float:'left',color:'blue',float:'right',marginRight:'50px'}}>승리</b>
                        </td>
                    </tr>
                    <tr style={{borderBottom:'1px solid rgba(0,0,0,.1)',backgroundColor:'LightSkyBlue'}}>
                        <td align="center" style={{width:'200px',border:'1px solid gray'}}>
                            <img src={Tot} alt="" style={{width:'100px',paddingTop:'10px',paddingBottom:'10px',border:'1px'}}/>
                        </td>
                        <td align="center" style={{width:'300px',border:'1px solid gray'}}>
                            <b style={{fontSize:'60pt'}}>6 : 2</b>
                        </td>
                        <td style={{border:'1px solid gray', width:'200px'}} align="center">
                            <img src={Ever} alt="" style={{width:'100px',marginLeft:'0px',paddingTop:'10px',paddingBottom:'10px',border:'1px'}}/>
                        </td>
                        <td width="400px" style={{border:'1px solid gray'}}>
                            <b style={{fontSize:'15pt',marginLeft:'50px'}}>경기 장소 :</b>
                            <b style={{fontSize:'15pt'}}>도봉 루다 풋살장 A</b>
                            <br/>
                            <b style={{fontSize:'15pt',marginLeft:'50px'}}>주소 :</b>
                            <b style={{fontSize:'15pt'}}>서울 도봉구 방학동 271-2</b>    
                        </td>
                    </tr>
                </tbody>
            </table>
            <table style={{border:'2px solid rgba(0,0,0,.1)'}}>
                <tbody>
                    <tr style={{borderBottom:'1px solid rgba(0,0,0,.1)',height:'40px',backgroundColor:'tomato'}}>
                        <td align="center" style={{border:'1px solid gray'}}>
                            <b style={{fontSize:'15pt'}}>20.06.04(일)</b>
                        </td>
                        <td align="center" style={{border:'1px solid gray',width:'400px'}}>
                            <b style={{fontSize:'15pt'}}>Friendly Match</b>
                        </td>
                        <td align="center" style={{border:'1px solid gray'}}>
                            <b style={{fontSize:'15pt'}}>상대팀 : 리버풀</b>
                        </td>
                        <td style={{border:'1px solid gray'}}>
                            <b style={{fontSize:'15pt',float:'left',color:'blue',float:'right',marginRight:'50px'}}>패배</b>
                        </td>
                    </tr>
                    <tr style={{borderBottom:'1px solid rgba(0,0,0,.1)',backgroundColor:'Salmon'}}>
                        <td align="center" style={{width:'200px',border:'1px solid gray'}}>
                            <img src={Tot} alt="" style={{width:'100px',paddingTop:'10px',paddingBottom:'10px',border:'1px'}}/>
                        </td>
                        <td align="center" style={{width:'300px',border:'1px solid gray'}}>
                            <b style={{fontSize:'60pt'}}>1 : 2</b>
                        </td>
                        <td style={{border:'1px solid gray', width:'200px'}} align="center">
                            <img src={Liver} alt="" style={{width:'100px',marginLeft:'0px',paddingTop:'10px',paddingBottom:'10px',border:'1px'}}/>
                        </td>
                        <td width="400px" style={{border:'1px solid gray'}}>
                            <b style={{fontSize:'15pt',marginLeft:'50px'}}>경기 장소 :</b>
                            <b style={{fontSize:'15pt'}}>도봉 루다 풋살장 A</b>
                            <br/>
                            <b style={{fontSize:'15pt',marginLeft:'50px'}}>주소 :</b>
                            <b style={{fontSize:'15pt'}}>서울 도봉구 방학동 271-2</b>    
                        </td>
                    </tr>
                </tbody>
            </table>
            <table style={{border:'2px solid rgba(0,0,0,.1)'}}>
                <tbody>
                    <tr style={{borderBottom:'1px solid rgba(0,0,0,.1)',height:'40px',backgroundColor:'rgb(220,220,220)'}}>
                        <td align="center" style={{border:'1px solid gray'}}>
                            <b style={{fontSize:'15pt'}}>20.06.06(월)</b>
                        </td>
                        <td align="center" style={{border:'1px solid gray',width:'400px'}}>
                            <b style={{fontSize:'15pt'}}>League Match</b>
                        </td>
                        <td align="center" style={{border:'1px solid gray'}}>
                            <b style={{fontSize:'15pt'}}>상대팀 : 맨유</b>
                        </td>
                        <td style={{border:'1px solid gray'}}>
                            <b style={{fontSize:'15pt',float:'left',color:'blue',float:'right',marginRight:'50px'}}>무승부</b>
                        </td>
                    </tr>
                    <tr style={{borderBottom:'1px solid rgba(0,0,0,.1)',backgroundColor:'rgb(192,192,192)'}}>
                        <td align="center" style={{width:'200px',border:'1px solid gray'}}>
                            <img src={Tot} alt="" style={{width:'100px',paddingTop:'10px',paddingBottom:'10px',border:'1px'}}/>
                        </td>
                        <td align="center" style={{width:'300px',border:'1px solid gray'}}>
                            <b style={{fontSize:'60pt'}}>1 : 1</b>
                        </td>
                        <td style={{border:'1px solid gray', width:'200px'}} align="center">
                            <img src={Manu} alt="" style={{width:'100px',marginLeft:'0px',paddingTop:'10px',paddingBottom:'10px',border:'1px'}}/>
                        </td>
                        <td width="400px" style={{border:'1px solid gray'}}>
                            <b style={{fontSize:'15pt',marginLeft:'50px'}}>경기 장소 :</b>
                            <b style={{fontSize:'15pt'}}>도봉 루다 풋살장 A</b>
                            <br/>
                            <b style={{fontSize:'15pt',marginLeft:'50px'}}>주소 :</b>
                            <b style={{fontSize:'15pt'}}>서울 도봉구 방학동 271-2</b>    
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </Scrollbars>
    </div>
)

export default MatchHistory