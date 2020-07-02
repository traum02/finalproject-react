import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Title from './Title';

const Root=()=>{
    return(
        <BrowserRouter> {/*새로고침하지 않고도 페이지 주소를 교체할수 있다. */}
            <Title/>
        </BrowserRouter>
    )
}

export default Root;