import React,{Component} from 'react';
import UserDelUpd from './UserDelUpd';

class UserList extends Component{
    static defaultProps = {
        list: [],
        onRemove: () => console.log('onRemove'),
        onUpdate: () => console.log('onUpdate')
    }
    render(){
        const { data, onRemove, onUpdate } = this.props;
        const list = data.map(
            info => (
                <UserDelUpd
                key={info.id}
                info={info}
                onRemove={onRemove}
                onUpdate={onUpdate}
            />) 
        );
        return(
            <div>
                {list}
            </div>
        )
    }
}

export default UserList