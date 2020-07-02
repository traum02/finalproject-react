import React from 'react';
import MainVideo from '../image/mainVideo.mp4';

const Body=()=>(
    <div className="video">
        <video autoPlay loop muted>
            <source src={MainVideo} type='video/mp4'/>
        </video>
    </div>
)

export default Body;