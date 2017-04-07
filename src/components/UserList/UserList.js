import React from 'react';
import s from './UserList.css';
import { EMOJI_UNICODE } from './emojiUnicode';

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
    const existingChat = this._getChat(friendID, this.props.user.uphere_id);

    if (existingChat) {
      this.props.showChat(existingChat);
    } else {
      this.props.onNewChat(friendID, this.props.user.uphere_id);
    }
  }

  getEmojiHTML(emotion_status) {
    if (emotion_status === 0) {
      emotion_status = 2;
    } else if (emotion_status < 0) {
      if (emotion_status > -2) {
        emotion_status = 1;
      } else {
        emotion_status = 0;
      }
    } else if (emotion_status > 0) {
      if (emotion_status > 2) {
        emotion_status = 4;
      } else {
        emotion_status = 3;
      }
    }

    const emojiUnicode = EMOJI_UNICODE[emotion_status] || 0;
    return twemoji.parse(twemoji.convert.fromCodePoint(emojiUnicode), { folder: 'svg', ext: '.svg' });
  }

  createEmojiStatus(emotion_status) {
    return { __html: this.getEmojiHTML(emotion_status) };
  }

  render() {
    return (
      <ul className={`${s.ulstyle}`}>
        { this.props.friendList && this.props.friendList.map((friend, i) => {
          return (
            <li className={`${s.listyle}`} key={i} onClick={() => { this.handleClickOnFriend(friend.uphere_id) }}>
              <img src={friend.profile_image_url} className={`${s.img_circle}`} />
              <div className={`${s.name}`}>
                {friend.name}
              </div>
              <span className={`${s.emotion_status}`} dangerouslySetInnerHTML={this.createEmojiStatus(friend.emotion_status)}></span>
              <span className={`${s.on_off_check} ${friend.isOnOff ? s.on_color : s.off_color}`}></span>
            </li>
          );
        })}
        { !this.props.friendList.length && <div className={`${s.default}`}>
          <p className={`${s.default_text}`}>
            You Have No Friends who Use Uphere App!
          </p>
          </div> }
      </ul>
    );
  }
}

export default UserList;
