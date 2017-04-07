import React from 'react';
import s from './UserList.css';
import { EMOJI_UNICODE } from './emojiUnicode';
import defaultImage from './list.png';

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
        { !this.props.friendList.length && 
          <div className={`${s.default}`}>
            <p className={`${s.default_text}`}>
              <i className="fa fa-user-plus" aria-hidden="true" />
              You Have No Friends who Use Uphere App!
            </p>
            <img src={`${defaultImage}`} className={`${s.default_img}`} />
            <p className={`${s.default_text_KR}`}>
              <b>Uphere에서 함께하고 싶은 친구를 초대해보세요</b><br/>
              페이스북 친구와 간편하게 메세지를 주고 받을 수 있어요.
              대화를 통해 친구의 감정상태를 알수있어요. 메세지에 감정을 담아 보내보세요!
            </p>
            <div className={`${s.default_btn}`}>
              <i className="fa fa-link" aria-hidden="true"/>
              친구초대하기
            </div>
          </div> }
      </ul>
    );
  }
}

export default UserList;
