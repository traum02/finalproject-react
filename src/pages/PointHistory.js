import React,{Component} from 'react';
import '../Css/MainStyle.css'
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import PointHistoryAll from './PointHistoryAll';


class pointHistory extends Component{


    constructor(props)
    {
        super(props);
        this.state={
            pointData:[],
            id:"",
            ptype:"",
            pprice:"",
            pdate:"",
            sort:"desc",
            type:"",
            show:0,
            fromDate:"",
            toDate:""
        }
    }


    //user의 전체 point 정보 가져오기 
    selectAllOfPoint=(x,d)=>{
        // console.log(this.state.type);
        console.log(this.state.sort);
        
        let url="http://localhost:9000/matchplay/pointhistory/all?id="+sessionStorage.id+"&type="+x+"&sort="+this.state.sort+"&fromDate="+this.state.fromDate+"&toDate="+this.state.toDate;
        axios.get(url)
        .then((point)=>{
            console.dir(point.data);
            this.setState({
                pointData:point.data,
                show:1
                
            });
            
        }).catch(err=>{
            console.log("pointlist 오류:"+err)
        });
    }


    typeChange=(e)=>{
        this.selectAllOfPoint(e.target.value,this.state.sort);
        this.setState({
            type:e.target.value
        })
    }

    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        },()=>
        this.selectAllOfPoint(this.state.type,this.state.sort)
        )
    }

    // sortChange=(d)=>{
    //     console.log(d.target.value)
    //     this.setState({
    //         sort:d.target.value
    //     },()=>
    //     this.selectAllOfPoint(this.state.type,this.state.sort)
    //     )
    // }

    //랜더링 직전 호출되는 함수에서 pointlist호출
    componentWillMount(){
        this.selectAllOfPoint("all","desc");
    }

    render(){
        return(
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
                            <NavLink exact to="/Mypage/MyMatchHistory" style={{ textDecoration: 'none',color:'white'}}>
                            <button type="button" 
                                style={{width:'250px', height:'80px',backgroundColor:'black', border:'2px solid white',borderRadius:'20px',boxShadow:'3px 3px 3px 0px gray'}}>Match History</button>
                            </NavLink>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <NavLink exact to="/Mypage/PointHistory" style={{ textDecoration: 'none',color:'white'}}>
                            <button type="button" 
                                style={{width:'250px', height:'80px',backgroundColor:'black', border:'2px solid white',borderRadius:'20px',boxShadow:'3px 3px 3px 0px gray'}}>Point History</button>
                            </NavLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style={{position:'absolute',left:'500px',top:'250px',width:'1200px',height:'50px',border:'1px solid gray'}} align="center">
            <table style={{fontSize:'13pt'}} align="center">
                <tbody align="center">
                    <tr>
                        <td width="100px">날짜조회</td>
                        <td>
                            <input type="Date" name='fromDate' onChange={this.onChange.bind(this)}/> ~ <input type="Date" name='toDate' onChange={this.onChange.bind(this)}/>
                        </td>
                        <td width="150px" >
                            <input type="radio" name="type" defaultChecked="true" value="all"  onClick={this.typeChange.bind(this)} style={{marginLeft:'30px'}}/>전체내역
                        </td>
                        <td width="150px">
                            <input type="radio" name="type" value="charge" onClick={this.typeChange.bind(this)} style={{marginLeft:'20px'}}/>충전내역
                        </td>
                        <td width="150px">
                            <input type="radio" name="type" value="using" onClick={this.typeChange.bind(this)} />사용내역
                        </td>
                        <td width="160px" style={{borderLeft:'1px solid rgba(0,0,0,.1)'}}>
                            정렬방식
                        </td>
                        <td width="100px">
                            <select name="sort" onChange={this.onChange.bind(this)}>
                                <option value="desc">최신순</option>
                                <option value="asc">오래된순</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style={{position:'absolute',left:'500px',top:'300px',width:'1200px',height:'580px',border:'1px solid gray'}} align="center">
            <table className="point_tb">
                <thead align="center">
                    <tr>
                        <th width="250px">
                            날짜
                        </th>
                        <th width="150px">
                            분류
                        </th>
                        <th width="300px">
                            금액 내역
                        </th>
                    </tr>
                </thead>
                
                <tbody>


                    
                    {
                            this.state.pointData.map((row, id)=>(
                                <PointHistoryAll row={row}  key={row.id}/>
                            ))

                    }




                </tbody>
            </table>
        </div>
        </div>
        )
    }
}

export default pointHistory