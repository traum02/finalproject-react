import React,{Component} from 'react';
import axios from 'axios';
import '../Css/Update.css';
import Drop from './Drop';
import Modal from 'react-modal';
import {NavLink} from 'react-router-dom';
import stop from "../image/stop.png";
import TextField from '@material-ui/core/TextField';

class UserInfo extends Component{

    // //탈퇴 이벤트 
    // onRemove=()=>{
    //     const {row, onDelete} =this.props;
    //     onRemove(row.id);
    // }


    constructor () {
        super();
        this.state = {
          showModal: false,
          memberData:[],
          id:"",
          name:"",
          birth:"",
          email:"",
          addr:"",
          phone:"",
          show:0
        };
        
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
      }
      
      handleOpenModal () {
        this.setState({ showModal: true });
      }
      
      handleCloseModal () {
        this.setState({ showModal: false });
      }

    //정보 출력이벤트
    onSelect= () =>{
        const{row, onSelect} = this.props;

        onSelect(row.id);

    }

    //정보 수정 이벤트
    // onUpdate = () =>{ 
    //     const{row,onUpdateMember} = this.props;
    //     onUpdateMember(row.id);
    // }
    
    
   
    // constructor(props)
    // {
    //     super(props);
    //     this.state={
    //         memberData:[],
    //         id:"",
    //         name:"",
    //         birth:"",
    //         email:"",
    //         addr:"",
    //         phone:"",
    //         show:0,
           
    //     }
    // }

    

    // handleCreate = (data) => {
    //     const { information } = this.state;
    //     this.setState({
    //       information: information.concat({ id: this.id++, ...data })
    //     })
    //   }
    
    //onchange 호출
    onChange = (e) => {
        const { id, value } = e.target;
        this.setState({
          [id]: value,
          
          [e.target.name]:e.target.value
        });
      }
    

    //멤버 정보가져오기 
    onSelectMember=()=>{
        let url="http://localhost:9000/matchplay/mypage/selectmember?id="+ sessionStorage.id;
        axios.post(url)
        .then((member)=>{
            console.log(member.data);
            this.setState({
                id:member.data.id,
                name:member.data.name,
                gender:member.data.gender,
                birth:member.data.birth,
                email:member.data.email,
                addr:member.data.addr,
                phone:member.data.phone,
                show:1
            });
            // this.onSelectMember();
            console.log(this.state.id);
        }).catch(err=>{
            console.log("select 오류:"+err)
        });
    }

    //탈퇴
    onDeleteMember= (e) =>{
        let url="http://localhost:9000/matchplay/mypage/delete?id="+this.state.id;
        console.log(e);
        axios.delete(url)
        .then(res=>{
            this.onSelectMember();
            this.setState({
                birth:"",
                email:"",
                addr:"",
                phone:""
            }) 
        }).catch(err=>{
            console.log("탈퇴오류:" +err);
        })
    }

    //수정
    onUpdateMember = (x) =>{
        x.preventDefault();
        var url="http://localhost:9000/matchplay/mypage/updmem";
        console.log(this.state.id);
        console.log(this.state.name);

        axios.post(url,{id:this.state.id,name:this.state.name,birth:this.state.birth,
                        email:this.state.email,addr:this.state.addr,phone:this.state.phone})
        .then((memberData)=>{
           //var arr=this.state.memberData;
           //arr.push({id:x.id.value,name:x.name.value,birth:x.birth.value,
        //email:x.email.value, addr:x.addr.value,phone:x.phone.value})
        }).catch(err=>{
            console.log("수정오류:" +err)
        });
    }

    componentDidMount(){
        this.onSelectMember();
    }

  
    render(){
        const customStyles = {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)',
              height                : '380px',
              textAlign             : 'center',
              border                : '2px solid #503396'
            }
          };
        return(
            <div className="user_upd">
               <form onSubmit={this.onUpdateMember.bind(this)}>
                   <table class="table table-hover">
                       <tr>
                           <td width="150px" style={{fontWeight:'bold'}}>ID</td>
                           <td>{this.state.id}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:'bold'}}>Name</td>
                           <td>{this.state.name}</td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:'bold'}}>Gender</td>
                           <td>{this.state.gender}</td>
                       </tr>
                       <tr>
                           
                           <td style={{fontWeight:'bold'}}>Birth</td>
                           <td><input type="text" name="birth" value={this.state.birth} onChange={this.onChange.bind(this)}/></td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:'bold'}}>Address</td>
                           <td><input type="text" name="addr" value={this.state.addr} onChange={this.onChange.bind(this)}/></td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:'bold'}}>Phone</td>
                           <td><input type="text" name="phone" value={this.state.phone} onChange={this.onChange.bind(this)}/></td>
                       </tr>
                       <tr>
                           <td style={{fontWeight:'bold'}}>Email</td>
                           {/* <td><input type="text" name="email" value={this.state.email} onChange={this.onChange.bind(this)}/></td> */}
                           <td>
                           <input type="text" name="email" value={this.state.email} onChange={this.onChange.bind(this)}>
                               </input></td>
                       </tr>
                   </table>
                   <div className="btn_upd_user" align="center">
                   <button type="submit" className="userUp_btn">수정</button>
                   <button onClick={this.handleOpenModal} className="userUp_btn">탈퇴</button>
                   <Modal
                        // className="modal"
                        isOpen={this.state.showModal}
                        style={customStyles}
                        contentLabel="onRequestClose Example"
                        onRequestClose={this.handleCloseModal}
                        shouldCloseOnOverlayClick={true}
                        overlayClassName="modal1"
                        >
                        <div>
                                <img src={stop} className="Drop_h" alt="" />
                                <div className="Drop_d">
                                <b className="title_dr">잠깐만요!</b>
                                <b className="fin_dr">
                                    <br />
                                    Match Play를 현재계정으로 이용하지 않으시는분만
                                    <br />
                                    요청 하시기 바랍니다.
                                    <br />
                                    한번 삭제된 계정은 활성화될 수 없습니다.
                                    <br />
                                    영구적으로 계정 탈퇴를 원하시면 확인을 눌러주세요.
                                </b>
                                </div>
                                <button type="button" onClick={this.onDeleteMember.bind(this)} >
                                확인
                                </button>
                            </div>
                        <button type="button" onClick={this.handleCloseModal} 
                        style={{width:'150px', height:'40px',backgroundColor:'#503396',border:'1px solid #503396',color:'white',outline:'none',borderRadius:'10px'}}>
                            취소
                        </button>
                    </Modal>
                   {/* <button onClick={this.onDeleteMember.bind(this)} className="userUp_btn">탈퇴</button> */}
                   </div>
               </form>
            </div>
        )
    }
}

export default UserInfo