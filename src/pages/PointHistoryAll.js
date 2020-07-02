import React,{Component} from 'react';

class PointHistoryAll extends Component{

    //point 목록 
    onAllPoint =()=>{
        const{row, onAllPoint}=this.props;
        onAllPoint(row.id);
    }
    render(){
        return(
           
                <tr>
                    <td>{this.props.row.pdate}</td>
                    <td>{this.props.row.ptype}</td>
                    <td>{this.props.row.pprice}</td>
                </tr>
        )
    }
}

export default PointHistoryAll