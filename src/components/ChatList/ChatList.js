import React from 'react';
import s from './ChatList.css';

class ChatList extends React.Component {
  constructor(props) {
    super(props);
  }

  clickHandler(chat) {
    this.props.showChat(chat);
  }

  render() {
    return (
      <div>
        {this.props.chats && this.props.chats.map((chat, i) => {
          return (
            <div ref="chatroom" className={`${s.chatroom_container}`} key={i} onClick={(e) => {
              e.preventDefault();
              this.clickHandler(chat);
            }} >
              <div className={`${s.img_divide}`} >
                { <img src={chat.participants[1].profile_image_url} /> }
              </div>
              <div className={`${s.usernames}`}>
                <h4>
                  { chat.participants[1].name }
                </h4>
                <p>
                  <span className={`${s.latest_text}`}>{ chat.messages[chat.messages.length - 1].text }</span>
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
