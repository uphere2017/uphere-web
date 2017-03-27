import React from 'react';
import s from './ChatList.css';

class ChatList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.chats.map((chat, i) => {
          return (
            <div className={`${s.chatroom_container}`} key={i}>
              <div className={`${s.img_divide}`}>
                { <img src={chat.messages[0].sender.profilePictureUrl} /> }
              </div>
              <div className={`${s.usernames}`}>
                <h4>
                  { chat.messages[0].sender.name }
                </h4>
                <p>
                  <span className={`${s.latest_text}`}>{ chat.messages[0].text }</span>
                </p> 
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ChatList;
