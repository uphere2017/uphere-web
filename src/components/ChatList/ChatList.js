import React from 'react';
import s from './ChatList.css';

class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChatIndex: 0
    };
  }

  clickHandler(chat) {
    this.props.showChat(chat);
  }

  _getFriend(chat) {
    const friend = chat.participants.filter((user) => {
      return user.uphere_id !== this.props.user.uphere_id;
    })[0];

    return friend;
  }

  _isYourMessage(message) {
    return message.sender_id === this.props.user.uphere_id;
  }

  render() {

    return (
      <div>
        <div className={`${s.chatlist_header}`}>
          <div>
            <i className="fa fa-cog" aria-hidden="true"></i>
          </div>
          <div>
            <h4>Messenger</h4>
          </div>
          <div>
            <i className="fa fa-commenting-o" aria-hidden="true"></i>
          </div>
        </div>
        <ul className={s.chatlist_container}>
        {this.props.chats.length > 0 && this.props.chats.map((chat, i) => {
          return (
            <li ref="chatroom" key={i}
              className={`${s.chatroom_container} ${this.state.currentChatIndex === i ? s.chatroom_click : ''}`}
              onClick={(e) => {
                e.preventDefault();
                this.setState({
                  currentChatIndex: i
                });
                this.clickHandler(chat);
            }}>
              <img src={this._getFriend(chat).profile_image_url} />
              <span className={`${s.chatroom_username}`}>
                { this._getFriend(chat).name }
              </span>
              <span className={`${s.chatroom_time}`}>
                <i className="fa fa-check" aria-hidden="true">2:09 PM</i>
              </span>
                <span className={`${s.chatroom_preview}`}>
                  {
                    chat.messages.length <= 0 ? null :
                      <span>
                        {
                          this._isYourMessage(chat.messages[chat.messages.length - 1]) ?
                            'You: ' : null
                        }
                        { chat.messages[chat.messages.length - 1].text }
                      </span>
                  }
                </span>
            </li>
          );
        })}
        </ul>
      </div>
    );
  }
}

export default ChatList;
