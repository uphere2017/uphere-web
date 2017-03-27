import React from 'react';
import s from './UserList.css';

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className={`${s.ulstyle}`}>
        { this.props.friendList && this.props.friendList.map((friend, i) => {
          return (
            <li className={`${s.listyle}`} key={i}>
              <img src={friend.profilePictureUrl} className={`${s.img_circle}`} />{friend.name}
            </li>
          );
        })}
        { !this.props.friendList && <div>No friends yet</div> }
      </ul>
    );
  }
}

export default UserList;
