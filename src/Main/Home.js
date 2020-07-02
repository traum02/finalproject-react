import React,{Component} from 'react';
import Banner from './Banner';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

import '../Css/MainStyle.css';


class Home extends Component{

    render(){
        return(
            <div>
                <Banner/>
                <Header/>
                <Body/>
                <Footer/>
            </div>
        )
    }
}

export default Home;