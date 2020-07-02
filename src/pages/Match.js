import React from 'react';
import Banner from '../MainComponents/Banner'
import {NavLink,Route } from "react-router-dom";
import Gujang from "./Match_Gujang";
import logo2 from '../image/logo2.png';
import '../Css/MainStyle.css';
import User from '../image/user.png'
import Users from '../image/users.png'
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button'


const Match=()=>(
    <div className="MatchDiv" style={{backgroundColor:'white', align:'center',margin:'0 auto', height:'580px'}}>
        <Banner/>
        <img src={logo2} className="logo2" alt="" />
        <div className="Match1" style={{align:'center',margin:'0 auto'}}>
            <table style={{align:"center", width:'1200px',marginTop:'120px'}}>
                <tbody>
                    <tr>
                        <td style={{width:'400px',align:'center', textAlign:'center'}}>
                            <NavLink to="/Match/Gujang" style={{ textDecoration: 'none' }}>
                                <button type="button" className="MatchButton" style={{width:'370px', height:'370px'}}>
                                    <img src={User} alt="" className="User" style={{display: 'block', margin: '0px auto'}}/>
                                </button>
                                <b style={{textAlign:'center',display: 'block', margin: '0px auto',fontSize:'35pt', color:'black'}}>개인전</b>
                            </NavLink>
                        </td>
                        <td style={{width:'400px', align:'center',textAlign:'center'}}>
                                <NavLink to="/Match/Gujang" style={{ textDecoration: 'none' }}>
                                    <button type="button" className="MatchButton" style={{width:'370px', height:'370px'}}>
                                            <img src={Users} alt="" className="Users" style={{display: 'block', margin: '0px auto'}}/>
                                    </button>
                                    <b style={{textAlign:'center',display: 'block',fontSize:'35pt', color:'black'}}>팀전</b>
                                </NavLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
)

// const goGujang=()=>{
//     return (
//         <div className="Route">
//           <BrowserRouter>
//             <Route path="/Match/Gujang" exact component={Gujang} />
//           </BrowserRouter>
//         </div>
//       )
// }
// const Gujang=()=>(
//     document.location.href = "/Match/Gujang"
// )
  
export default Match;