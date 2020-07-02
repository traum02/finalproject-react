import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import logo2 from '../image/logo2.png';
import Match from '../pages/Match';


const Header=()=>(
    <div>
        <img src={logo2} className="logo2" alt="" />
        <Router>
            <Switch>
                <Route exact path='/Match' component={Match}/>
            </Switch>
        </Router>
        <a href='/Match'>Match</a>
    </div>
)


export default Header;