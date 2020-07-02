import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import  '../Css/Content.css';
import ICommentList from './ICommentList.js';
import ICommentAdd from './ICommentAdd';

class Content extends Component{

  constructor({match}){
    super();
    //match 객체로부터 받은 iboard_num을 멤버 변수에 저장
    this.iboard_num = match.params.iboard_num;
    this.preidx = match.params.preidx;
    this.state = {
        member_id:sessionStorage.id,
        chk_grade:0,
        selectData:"",
        icommentData:[],
        icommentAddData:[]
    };
  }
  //iboard_num을 통해 모든 데이터를 출력
  onSelctData = () => {
    let url = "http://localhost:9000/matchplay/iboard/select?iboard_num="+this.iboard_num+"&preidx="+this.preidx;
    axios
        .get(url)
        .then((res)=>{
            this.setState({
                selectData: res.data,
            });
        })
        .catch((err)=>{
            console.log("select 에러:"+err);
        });
  };


  //삭제 함수
  onIboardDelete = () => {
    let url = "http://localhost:9000/matchplay/iboard/delete?iboard_num="+this.iboard_num;
    axios
    .delete(url)
    .then((res)=>{
        this.props.history.push("/QnA")
    })
    .catch((err)=>{
        console.log("삭제오류:"+err);
    });
  };

  //댓글 출력하는 이벤트
  clist = () => {
    let url ="http://localhost:9000/matchplay/select/iboard/icomment?iboard_num="
    + this.iboard_num;
    axios
    .get(url)
    .then((responsedata)=>{
        console.log("clist:"+responsedata.data) //잘 찍힘
        this.setState({
            icommentData:responsedata.data
        },()=>console.log("clist2:"+this.state.icommentData));
    })
    .catch((error)=>{
        console.log("댓글list 에러"+error);
    });
};


AddData = () => {
  let url ="http://localhost:9000/matchplay/icomment/add/?iboard_num="
  + this.iboard_num;
  axios
  .get(url)
  .then((responsedata)=>{
      console.log("AddData:"+responsedata.data) //잘 찍힘
      this.setState({
        icommentAddData:responsedata.data
      },()=>console.log("AddData2:"+this.state.icommentAddData));
  })
  .catch((error)=>{
      console.log("댓글list 에러"+error);
  });
};



findGrade=(e)=>{
  let url="http://localhost:9000/matchplay/member/findGrade?id="+this.state.member_id;  //http://localhost:9000/matchplay/member/add
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


  goBack = () => {
    this.props.history.push("/QnA/" + this.preidx)
  }
  componentWillMount() {
    
    this.onSelctData(); //페이지가 시작되자마자 호출
    this.clist();
    this.AddData();
    this.findGrade();
  }
  componentDidMount(){
    
    this.onSelctData(); //페이지가 시작되자마자 호출
    this.clist();
    this.AddData();
  }
  
    render(){
      let idata = this.state.selectData;
        return(

            <div className="ct">
              
              <h1 className="contType">*{idata.iboard_type}</h1>
               
               <table className="ctTitle">
                   <tr>
                      <td>
                       <b className="b">글 제목 : {idata.iboard_title}</b>
                       <hr/>
                      </td>
                        
                   </tr>
                   
                   <tr>
                       <td>
                       <b className="b">작성자 : {idata.member_id}</b>
                       </td>
                   </tr>
               </table>
                
              
               <form>
                  
                  <table class="table table-bordered">
                    <tr>
                      <td className="content">내용<hr/>{idata.iboard_content}</td>
                    </tr>
                    <tr class="review">
                      <td><b>댓글<ICommentAdd num={this.iboard_num} history={this.props.history}
                          clist={this.clist.bind(this)}/>
                      </b></td>
                    </tr>
                    <div>
                    <table class="table table-bordered1">
                    <tbody>
                      {
                          this.state.icommentData.map((row,idx)=>(               
                          <ICommentList 
                              row={row}
                              key={row.icomment_num}
                              />
                      ))  
                      }       
                    </tbody>
                    </table>
                    </div>
                  </table>
                  <div className="btn-cont">
                    {
                        idata.iboard_notice ==="notice" ?                        
                          this.state.chk_grade===1 ? <Link to={"/iboard/update/" + this.iboard_num}><button type="button" className="cont-btn">수정</button></Link>: ''
                        :
                        <Link to={"/iboard/update/" + this.iboard_num}><button type="button" className="cont-btn">수정</button></Link>
                    }

                    {
                        idata.iboard_notice ==="notice" ?
                        this.state.chk_grade===1 ? <button type="button" className="cont-btn" onClick={this.onIboardDelete.bind(this)}>삭제</button>: ''
                        :
                        <button type="button" className="cont-btn" onClick={this.onIboardDelete.bind(this)}>삭제</button>
                    }
                      <button type="button" className="cont-btn" onClick={this.goBack.bind(this)}>목록으로</button>
                  </div>

                </form>

                </div> 
        )
        }
      }
export default Content

