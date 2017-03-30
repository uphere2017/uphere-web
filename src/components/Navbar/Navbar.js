import React, { Component } from 'react';
import s from './styles.css';

class Navbar extends Component {
  constructor(props) {
    super(props);

  }

  _getFriendName() {
    if (this.props.friends.participants && this.props.friends.participants.length > 0) {
      return this.props.friends.participants.filter((friend) => {
        return friend.name !== this.props.user.name;
      })[0];
    }

    return {};
  }

  render() {
    return (
      <nav className={`${s.navbar}`}>
        <i className={`fa fa-user-circle-o fa-lg ${s.user_icon}`} aria-hidden="true"></i><b><span>{this._getFriendName().name}</span></b>
      </nav>
    );
  }
}

export default Navbar;