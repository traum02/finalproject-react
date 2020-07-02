import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import css from '../Css/Write.css';
import keys from '../image/keys.png';
import qnaim from '../image/qnaim.png';
import axios from 'axios';

class Write extends Component{

    
    constructor(props){
        super(props);
        
        
        this.state = {      
            member_id:sessionStorage.id,
            chk_grade:0,
            iboard_title:"",
            iboard_content:"",
            iboard_secpwd:"",
            iboard_type:"",
            iboard_notice:"notice"
        };
    } 



    //member 아이디의 grade의 값을 읽어온다.(0이면 일반회원-공지사항 작성 불가)
    //(1이면 관리자-공지사항 작성 가능)
    // /member/findGrade 
    findGrade=(e)=>{
        let url="http://localhost:9000/matchplay/member/findGrade?id="+this.state.member_id;
        console.log("this.state.member_id.value="+this.state.member_id);
        axios.get(url)
        .then((responseData)=>{
            //url 로부터 받은 데이타 state 변수에 넣기
            console.log("select 함수 내 responseData.data1="+responseData.data);
            
            this.setState({
              chk_grade:responseData.data
            });
            
            //return responseData.data;
            console.log("this.state.chk_grade:"+this.state.chk_grade);
        }).catch((error)=>{
            console.log("list 에러:"+error);
            //return 0;
        });
       }


    componentDidMount(){
        this.findGrade();
        console.log("로그인한 회원의 권한을 확인합니다.");
    }

    
    //추가 함수 1(공지사항 작성-iboard_notice 칼럼에 notice 값을 추가)
    onIboardInsert = () => {
        // console.log("값 들어오는거 확인"+member_id,tboard_title,tboard_content)
        let url = "http://localhost:9000/matchplay/iboard/add";
        axios
        .post(url,  {
                member_id : sessionStorage.id,
                iboard_title: this.refs.title.value,
                iboard_content: this.refs.content.value,
                iboard_secpwd: this.refs.secpwd.value,
                iboard_type: this.refs.type.value,
                iboard_notice: this.state.iboard_notice
        }) 
        .then((res)=>{
            this.props.history.push("/QnA")
        })
        .catch((error)=>{
            console.log("추가부분 에러"+error);
        });
     };


     //추가 함수 2(공지사항 외 작성-iboard_notice 칼럼 null)
    onIboardInsert1 = () => {
        // console.log("값 들어오는거 확인"+member_id,tboard_title,tboard_content)
        let url = "http://localhost:9000/matchplay/iboard/add";
        axios
        .post(url,  {
                member_id : sessionStorage.id,
                iboard_title: this.refs.title.value,
                iboard_content: this.refs.content.value,
                iboard_secpwd: this.refs.secpwd.value,
                iboard_type: this.refs.type.value
        }) 
        .then((res)=>{
            this.props.history.push("/QnA")
        })
        .catch((error)=>{
            console.log("추가부분 에러"+error);
        });
     };


     //서브밋시 호출되는 함수 (onTboardInsert 호출)
    onSubmit = (e) => {
        e.preventDefault();
        //alert(this.state.chk_grade);
        if(this.refs.type.value==="공지사항" && this.state.chk_grade===1)
        {
            alert("공지사항 선택");
            this.onIboardInsert();
        }

        if(this.refs.type.value==="공지사항" && this.state.chk_grade===0)
        {
            alert("일반회원은 공지사항 작성을 할 수 없습니다.");
            return 0;
        }

        if(this.refs.type.value!=="공지사항" && this.state.chk_grade===0)
        {
            alert("문의글 작성을 완료했습니다.");
            this.onIboardInsert1();
        }
        if(this.refs.type.value!=="공지사항" && this.state.chk_grade===1)
        {
            alert("문의글 작성을 완료했습니다.");
            this.onIboardInsert1();
        }
        console.log("Add");
    //    this.props.onSave(this.refs.member_id.value,this.refs.tboard_title.value,this.state.tboard_content); //list에서 보낸 insert url 메소드
    }


    MoveBack = () =>{
        this.props.history.push("/QnA");
    }
    
    render(){
        return(
            <div className="write">
                <form onSubmit={this.onSubmit.bind(this)}>
                  <b className="question">문의<img className="qnaimg" src={qnaim}/><br/></b>
                  <br/>
                   <div className="explain">
                       <ul>
                           <li>문의하시기 전 <b>공지사항</b>을 확인하시면 궁금증을 더욱 빠르게 해결하실 수 있습니다.</li>
                            <li>문의글 답변 운영시간 09:00 ~ 21:00</li>
                       </ul>
                   </div>
                   
                    <table className="table table-bordered" style={{textAlign:'center;'}}>
                    
                        <tr>
                            <td class="Type"><b>문의유형</b></td>
                                <td >
                                <select className="selectop" ref="type" required>
                                    <option value="공지사항">공지사항</option>
                                    <option value="구장관련문의">구장관련문의</option>
                                    <option value="예약관련문의">예약관련문의</option>
                                    <option value="포인트관련문의">포인트관련문의</option>
                                    <option value="매니저관련문의">매니저관련문의</option>
                                </select>
                            </td>
                            
                        </tr>
                        <tr>
                            <td className="writer"><b>작성자</b></td>
                            <td>{sessionStorage.id}</td>
                        </tr>
                        <tr>
                            <td className="secure"><b>비밀글</b></td>
                            <td>
                            <input type="password" ref="secpwd" className="secureip" placeholder="※문의글 비밀번호 입력" required></input>
                            &nbsp;&nbsp;&nbsp;
                            <img src={keys} className="key"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="Subject"><b>제목</b></td>
                            <td><input type="text" className="subjectip" ref="title" required></input></td>
                        </tr> 
                        <tr>
                            <td className="Content" style={{width:'80px;'}}><b>내용</b></td>
                            <td>
                                <textarea className="text" ref="content" required placeholder="※불편사항이나 문의 사항을 남겨주시면 신속하게 답변드리겠습니다.">
                                </textarea>
                            </td>
                        </tr>   
                    </table>
                    <div className="button">
                    <button type="submit" class="btn btn-dark1">저장</button>
                    <button type="button" class="btn btn-dark2" onClick={this.MoveBack}>뒤로가기</button>
                    </div>
                    <hr/>
                </form>
            </div>
        )
    }
}

export default Write;
