import React from 'react';
import {Route} from 'react-router-dom';
// pages폴더안에있는 index.js를 호출(안에 있는 클래스 home, about을 가져온다는 의미)
import {LoginForm, JoinForm, JoinFinal} from './index';
// import LoginForm from './LoginForm';
// import JoinForm from './JoinForm';
// import JoinFinal from './JoinFinal';
import Root from './Root';

const Title=()=>{
    return (
        <div>

            <Route path="/Login" component={LoginForm}/>
            <Route path="/JoinForm" component={JoinForm}/>
            <Route path="/JoinFinal" component={JoinFinal}/>
           
            
            

          

        </div>
    ) 
}
export default Title;