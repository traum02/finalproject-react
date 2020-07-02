import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/List.css'
import icon from '../image/search-icon.png';
import lock from '../image/lock.png';
import IboardItem from './IboardItem';
import axios from 'axios';

class List extends Component{
    constructor({match},props) {
        super(props)

        this.state = {
            iboardData: [],
            selectData: [],
            
            //페이징용
            page:  1,
            preidx: (match.params.preidx !== undefined) ? match.params.preidx : 0,
            start: (match.params.preidx !== undefined) ? match.params.preidx : 0,
            end: 5,
            flag: false,
            flag2: false,

            //검색용
            option: "",
            keyword:"",
            
            //list or searchlist 스위칭용
            idx: 1,
            totalCount:""
           
        };
        
    }


    componentDidMount(){
      console.log("componentDidMount")
      this.setState({
        
      })
    }

    //목록을 출력하는 list 함수
    list = () => {
        
        this.setState({
          idx : 1
        });
        
        //alert('list()=>this.state.start => ' + this.state.start);
        console.log('list()=>this.state.preidx => ' + this.props.match.params.preidx);

        let url ="http://localhost:9000/matchplay/iboard/list?start=" + this.state.start + "&preidx=" + this.state.preidx;
        axios
        .get(url)
        .then((responsedata) => {
            this.setState({
                totalCount: responsedata.data[0].totalCount,
                iboardData: responsedata.data,
            });

            console.log("total Count1:"+responsedata.data[0].totalCount);
            console.log("total Count2:"+responsedata.data.totalCount);
        })
        .catch((error)=>{
            console.log("list 에러" + error);
        });
    };


    //검색목록 출력하는 list 함수
    searchlist = () => {
        this.setState({
          idx : 2,
        });
        let url ="http://localhost:9000/matchplay/iboard/searchlist?start=" + this.state.start +
            "&option=" + this.state.option + "&keyword=" + this.refs.keyword.value;


        // let searchData = this.state;
        axios
        .post(url, {
          keyword :this.refs.keyword.value,
        })
        .then((responsedata) => {
            this.setState({
                iboardData: responsedata.data,
                option : this.state.option,

            });
        })
        .catch((error)=>{
            console.log("list 에러" + error);
        });
    };
    


    onClickNext = () => {
        if (this.state.iboardData.length === 10) {
          let pre = this.state.start;
          this.setState({
            preidx: pre
          });
          this.setState((prevState, props) => ({
            start: prevState.start + 10,
            flag: true
          }));
        }
    };

    onClickPre = () => {
        if (this.state.start > 0) {
          let pre = this.state.start;
          this.setState({
            preidx: pre
          });
          this.setState((prevState, props) => ({
            start: prevState.start - 10,
            flag2: true
          }));
        }
    };


    onSubmit =(e)=>{
        e.preventDefault();
        this.setState({
          idx : 2
        })
        this.searchlist();
        console.log(this.state.option + this.refs.keyword.value);
      }


    handleSearchType = (e) =>{
        if(e.target.checked){
          this.setState({
            option: e.target.value,
          },()=>console.log(this.state.option + this.refs.keyword.value));
        }
      }

      onSelectSearch = (e) =>{
        this.setState({
          option:e.target.value
        },()=>console.log(this.state.option));
      }

    //페이지가 시작하자마자 리스트 호출
    componentWillMount() {
        this.setState({
          
        })
        this.list()    
      }
      
  
      componentDidUpdate = () => {
          if (this.state.flag) {
            this.list();
            this.setState({
              flag: false
            });
          } else if (this.state.flag2) {
            this.list();
            this.setState({
              flag2: false
            });
          }
        };

   MoveHref = () =>{
        if(sessionStorage.length===1)
        {
            this.props.history.push("/QnA/1/Write");
            //alert(sessionStorage.id);
        }else{
            alert("로그인이 필요합니다.");
        }
   }


   pageWrite=(i)=>{
    let pre = this.state.start;
    this.setState({
      preidx: pre
    });
    this.setState({
      start:((i-1)*10)
    })
    setTimeout(() => {
      this.list();
    }, 50);
  }
    

    render(){
        let totalc=this.state.totalCount; //전체 값이자 end
        let pageCount=10;
        console.log("토탈c:"+totalc);
        const p=[];

        for(let i=1;i<totalc/pageCount+1;i++){
          p.push(
            <div style={{border:'1px solid #503396',width:"80px",textAlign:"center"}}>
                {this.state.start===(i-1)*10
                ?
                <a className="page-link" onClick={this.pageWrite.bind(this,i)} style={{color:'red',cursor:'pointer',backgroundColor:'#503396',color:'white'}}>{i}</a>
                :
                <a className="page-link" onClick={this.pageWrite.bind(this,i)} style={{color:'black',cursor:'pointer'}}>{i}</a>
                }                
            </div>
          );
       }

        return(

            <div>
                <div className="cscenter">
                    <div className="cscenter1">
                      <hr/>
                      <span className="cc">Customer Center</span>
                      <hr/>
                      <b style={{fontSize:'25pt'}}>070-1234-1234</b>
                      <br/>
                      <b style={{fontSize:'13pt'}}>open Am 10:30/Close PM17:30</b><br/>
                      <b className="holiday">토,일요일,공휴일</b><b style={{fontSize:'13pt'}}>은 휴무입니다.</b>
                    </div>
                </div>
                
                <button type="button" class="btnmun2" onClick={this.MoveHref}
                style={{width:'150px',height:'50px',fontWeight:'bold'}}>문의하기</button>
                <table className="qnatable" style={{textAlign:'center'}}>
                        <thead className="head" >
                            <tr> 
                                <th style={{width:'80px'}}>No.</th>
                                <th style={{width:'200px'}}>Type</th>
                                <th style={{width:'500px'}}>Title</th>
                                <th style={{width:'200px'}}>Writer</th>
                                <th style={{width:'200px'}}>Date</th>
                            </tr>
                        </thead>
                        <tbody className="body">
                            {
                                this.state.iboardData.map((row, idx) =>(
                                    // 하위 컴포넌트인 IboardItem 에서 데이터를 받아 출력
                                    <IboardItem
                                        row={row}
                                        key={row.iboard_num}
                                        // onUpdateForm={this.onUpdateForm.bind(this)}
                                    />
                                ))
                            }
                        </tbody>
                </table>

                
                <form  className="paging" align="center">
                    <React.Fragment>
                         <nav aria-label="Page navigation" style={{position:'relative', left:'-150px', top:'00px'}}>
                          <ul className="pagination" style={{fontSize:'13pt'}}>
                            <li title="이전 페이지보기" className="page-item">
                              <button type="button" className="page-link"  style={{color:'#503396'}}
                              onClick={this.onClickPre}>◀</button> 
                            </li>                                            
			                        {p}  
                            <li title="이후 페이지 보기" className="page-item">
                              <button type="button" className="page-link"  style={{color:'#503396'}}
                              onClick={this.onClickNext}>▶</button>
                            </li>
                          </ul>
                         </nav>     
                    </React.Fragment>
                </form>
                    {/* <div className="board_search">
                    <input type="checkbox" name="option" value="iboard_title" onClick={this.handleSearchType.bind()}></input>
                    <span>제목</span>
                    <input type="checkbox" name="option" value="iboard_content" onClick={this.handleSearchType.bind()}></input>
                    <span>내용</span>
                    <input type="checkbox" name="option" value="member_id" onClick={this.handleSearchType.bind()}></input>
                    <span>작성자</span> 
                    <form onSubmit={this.onSubmit.bind(this)}>
                              <input type="text" ref="keyword"></input>
                              <button type="submit">검색하기</button>
                    </form>
                    </div> */}
                    <div className="board_search">
                    <select className="select_T" value={this.state.option} onChange={this.onSelectSearch.bind(this)}>
                        <option value="" selected>선택하세요</option>
                        <option value="iboard_title">제목</option>
                        <option value="iboard_content">내용</option>
                        <option value="member_id">작성자</option>
                    </select>
                    <form onSubmit={this.onSubmit.bind(this)}>
                              <input type="text" ref="keyword" className="select_I"></input>
                              <button type="submit" className="select_B">검색하기</button>
                    </form>          
                    </div>


            </div>
        )
    }
}





export default List