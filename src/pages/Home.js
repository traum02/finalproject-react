import React from 'react';
import Banner from '../MainComponents/Banner'
import Main from '../MainComponents/Main'
import Footer from '../MainComponents/Footer'
import Menu from '../MainComponents/Menu'

import logo2 from '../image/logo2.png';
import '../Css/MainStyle.css';

const Home=()=>{
    return(
        <div className="Menu5">
            {/* <Banner/>
            <Menu/> */}
            <img src={logo2} className="logo2" alt="" />
            <Main/>
            <Footer/>
        </div>

    )
}

export default Home;