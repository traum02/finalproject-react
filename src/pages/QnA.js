import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/List.css'
import icon from '../image/search-icon.png';
import lock from '../image/lock.png';
import {NavLink} from 'react-router-dom';

class QnA extends Component{

    render(){
        return(
            <div >
                <div className="cscenter" style={{border:'3px solid red'}}>
                    <b className="cc">customer center</b>
                    <hr/>
                    <br/>
                    <h2>070-7619-3519</h2>
                    <b>open Am 10:30/Close PM17:30</b><br/>
                    <b className="holiday">토,일요일,공휴일</b><b>은 휴무입니다.</b>
                </div>
                <form>
                    <NavLink exact to="/QnA/Write" style={{ textDecoration: 'none',color:'white'}}>
                    <button type="button" class="btn btn-dark">문의하기</button>
                    </NavLink>
                    <table className="table table-bordered" style={{textAlign:'center'}}>
                        <thead className="head" >
                            <tr> 
                                <th style={{width:'5%'}}>No.</th>
                                <th style={{width:'15%'}}>Type</th>
                                <th style={{width:'40%'}}>Subject</th>
                                <th style={{width:'20%'}}>Writer</th>
                                <th style={{width:'20%'}}>Date</th>
                                
                            </tr>
                        </thead>

                        <tbody className="body">
                            <tr className="notice"> 
                                <td>1</td>
                                <td>공지사항</td>
                                <td>test</td>
                                <td>관리자</td>
                                <td>2020-05-11</td>
                            </tr>
                            <tr className="notice">
                                <td>2</td>
                                <td>공지사항</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳test2</td>
                                <td>관리자</td>
                                <td>2020-06-16</td>    
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>예약관련문의</td>
                                <td>예약시 전화번호관련문의&nbsp;&nbsp;<img className="lock" src={lock}/></td>
                                <td>뮹뮹</td>
                                <td>2020-06-14</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>예약관련문의</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳매치플레이입니다. 답변드립니다.^_^&nbsp;&nbsp;<img className="lock" src={lock}/></td>
                                <td>관리자</td>
                                <td>2020-06-14</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>매니저관련문의</td>
                                <td>매니저는 ??</td>
                                <td>묭묭</td>
                                <td>2020-06-15</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>매니저관련문의</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳매치플레이입니다. 답변드립니다. ʕʘ̅͜ʘ̅̅ʔ </td>
                                <td>관리자</td>
                                <td>2020-06-16</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>매니저관련문의</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳&nbsp;↳아니이해가안되요</td>
                                <td>묭묭</td>
                                <td>2020-06-16</td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>매니저관련문의</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳&nbsp;↳&nbsp;↳매치플레이입니다. 답변드립니다. ƪ( ˘ ⌣˘ )ʃ </td>
                                <td>관리자</td>
                                <td>2020-06-16</td>
                            </tr>
                        </tbody>
                       
                    </table>
                    <React.Fragment>
                        <nav aria-label="Page navigation">
                             <ul className="pagination">
                                <li title="이전 페이지보기" className="page-item">
                                    <a className="page-link" href="#">◀</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#">1</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#">2</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#">4</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#">5</a></li>
                                <li title="이후 페이지 보기" className="page-item">
                                    <a className="page-link" href="#">▶</a></li>
                            </ul>
                         </nav>
                    </React.Fragment>
                </form>
                    <div className="board_search">
                    <select>
                        <option>제목+내용</option>
                        <option>제목만</option>
                        <option>작성자</option>
                    </select>
                    <input type="text" ></input>
                    <button classname="btnsearch" class="search"><img  className="icon" src={icon} alt=""/></button>
                    </div>
            </div>
        )
    }
}

export default QnA