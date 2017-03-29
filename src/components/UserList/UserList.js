import React from 'react';
import s from './UserList.css';

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  _getChat(friendID, hostID) {
    let existingChat;

    this.props.chats.forEach((chat) => {
      let allUserIDs = chat.participants.map((user) => user.uphere_id);

      if (allUserIDs.indexOf(friendID) >= 0 && allUserIDs.indexOf(hostID) >= 0) {
        existingChat = chat;
      }
    });

    return existingChat || null;
  }

  handleClickOnFriend(friendID) {
    const existingChat = this._getChat(friendID, this.props.user.uphereID);

    if (existingChat) {
      this.props.showChat(existingChat);
    } else {
      this.props.onNewChat(friendID, this.props.user.uphereID);
    }
  }

  render() {
    return (
      <ul className={`${s.ulstyle}`}>
        { this.props.friendList && this.props.friendList.map((friend, i) => {
          return (
            <li className={`${s.listyle}`} key={i} onClick={() => { this.handleClickOnFriend(friend.uphereID) }}>
              <img src={friend.profilePictureUrl} className={`${s.img_circle}`} />
              <div className={`${s.name}`}>
                {friend.name}<br/><span className={`${s.active}`}>15분 전에 활동</span>
              </div>
            </li>
          );
        })}
        { this.props.friendList && this.props.friendList.map((friend, i) => {
          return (
            <li className={`${s.listyle}`} key={i} onClick={() => { this.handleClickOnFriend(friend.uphereID) }}>
              <img src={friend.profilePictureUrl} className={`${s.img_circle}`} />
              <div className={`${s.name}`}>
                {friend.name}<br/><span className={`${s.active}`}>15분 전에 활동</span>
              </div>
            </li>
          );
        })}
        { this.props.friendList && this.props.friendList.map((friend, i) => {
          return (
            <li className={`${s.listyle}`} key={i} onClick={() => { this.handleClickOnFriend(friend.uphereID) }}>
              <img src={friend.profilePictureUrl} className={`${s.img_circle}`} />
              <div className={`${s.name}`}>
                {friend.name}<br/><span className={`${s.active}`}>15분 전에 활동</span>
              </div>
            </li>
          );
        })}
        { this.props.friendList && this.props.friendList.map((friend, i) => {
          return (
            <li className={`${s.listyle}`} key={i} onClick={() => { this.handleClickOnFriend(friend.uphereID) }}>
              <img src={friend.profilePictureUrl} className={`${s.img_circle}`} />
              <div className={`${s.name}`}>
                {friend.name}<br/><span className={`${s.active}`}>15분 전에 활동</span>
              </div>
            </li>
          );
        })}
        { this.props.friendList && this.props.friendList.map((friend, i) => {
          return (
            <li className={`${s.listyle}`} key={i} onClick={() => { this.handleClickOnFriend(friend.uphereID) }}>
              <img src={friend.profilePictureUrl} className={`${s.img_circle}`} />
              <div className={`${s.name}`}>
                {friend.name}<br/><span className={`${s.active}`}>15분 전에 활동</span>
              </div>
            </li>
          );
        })}
        { this.props.friendList && this.props.friendList.map((friend, i) => {
          return (
            <li className={`${s.listyle}`} key={i} onClick={() => { this.handleClickOnFriend(friend.uphereID) }}>
              <img src={friend.profilePictureUrl} className={`${s.img_circle}`} />
              <div className={`${s.name}`}>
                {friend.name}<br/><span className={`${s.active}`}>15분 전에 활동</span>
              </div>
            </li>
          );
        })}
        { !this.props.friendList && <div>No friends yet</div> }
      </ul>
    );
  }
}

export default UserList;
