import React from 'react';
import s from './ChatList.css';

class ChatList extends React.Component {
  constructor(props) {
    super(props);
  }

  clickHandler(e) {
    e.preventDefault();
    this.props.showChat(this.props.chats[0]);
  }

  render() {
    return (
      <div>
        {this.props.chats && this.props.chats.map((chat, i) => {
          return (
            <div ref="chatroom" className={`${s.chatroom_container}`} key={i} onClick={this.clickHandler.bind(this)} >
              <div className={`${s.img_divide}`} >
                { <img src={chat.participants[0].profile_image_url} /> }
              </div>
              <div className={`${s.usernames}`}>
                <h4>
                  { chat.participants[0].name }
                </h4>
                <p>
                  <span className={`${s.latest_text}`}>{ chat.messages[0][0].text }</span>
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
