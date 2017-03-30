import React from 'react';
import s from './ChatList.css';

class ChatList extends React.Component {
  constructor(props) {
    super(props);
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
    let lastmsgDate = create_at => {
      let date = new Date(Date.parse(create_at)).toString();
      let month = create_at[5] === '0' ? create_at.slice(6, 7) : create_at.slice(5, 7);
      let day = date.split(' ')[2];
      return `${month}/${day} ${date.slice(0, 3)}`; 
    };
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
            <li ref="chatroom" className={`${s.chatroom_container}`} key={i} onClick={(e) => {
              e.preventDefault();
              this.clickHandler(chat);
            }}>
              <img src={this._getFriend(chat).profile_image_url} />
              <span className={`${s.chatroom_username}`}>
                { this._getFriend(chat).name }
              </span>
              <span className={`${s.chatroom_titme}`}>
                <i className="fa fa-check" aria-hidden="true">{lastmsgDate(chat.messages[chat.messages.length - 1].created_at)}</i>
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
