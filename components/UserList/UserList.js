import React from 'react';
import s from './UserList.css';
import data from './data.js';

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className={`${s.ulstyle}`}>
        {this.props.friendList.map((friend, i) => {
            {console.log(friend)}
          return (
            <li className={`${s.listyle}`} key={i}>
              <img src={friend.profile_image_url} className={`${s.img_circle}`} />{friend.name}
            </li>
          )
        })}
      </ul>
    );
  }
}

export default UserList;
