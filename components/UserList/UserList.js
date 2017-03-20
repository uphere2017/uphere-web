import React from 'react';
import s from './UserList.css';
import data from './data.js';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.setState({
      users: data
    });
  }

  render() {
    return (
      <ul className={`${s.ulstyle}`}>
        {this.state.users.map((user, i) => <li className={`${s.listyle}`} key={i}><img src={user.picture.large} className={`${s.img_circle}`} />{user.name.first} {user.name.last}</li>)}    
      </ul>
    );
  }
}

export default UserList;
