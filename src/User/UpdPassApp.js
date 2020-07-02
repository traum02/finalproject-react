import React,{Component} from 'react';

class UpdPassApp extends Component{

    state = {
        password:'',
        confirmpassword:''
    }

    handleOnPwInput(PwInput) {
        this.setState({ password: PwInput });
    }

    handleOnPwInputConfirm(PwInputConfirm){
        this.setState({ confirmpassword: PwInputConfirm});
    }

    //새패스워드 일치여부확인
    PasswordMatch() {
        const { password, confirmPassword } = this.state;
        return password === confirmPassword;
      }

    //새패스워드 일치시 css넣을때 사용
      confirmPasswordClassName() {
        const { confirmPassword } = this.state;
      
        if (confirmPassword) {
          return this.PasswordMatch() ? 'is-valid' : 'is-invalid';
        }
      }

      //일치하지 않을때 메세지
      renderFeedbackMessage() {
        const { confirmPassword } = this.state;
      
        if (confirmPassword) {
          if (!this.PasswordMatch()) {
            return (
              <div className="invalid-feedback">패스워드가 일치하지 않습니다</div>
            );
          }
        }
      }
    render(){
        return(
            <div>
                
            </div>
        )
    }
}

export default UpdPassApp
