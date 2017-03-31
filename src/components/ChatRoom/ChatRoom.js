import React, { Component } from 'react';
import ChatInput from '../ChatInput/ChatInput';
import s from './ChatRoom.css';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate () {
    let node = this.refs.scroll;
    this.scrollHeight = node.scrollHeight;
    this.scrollTop = node.scrollTop;
  }

  componentDidUpdate () {
    let node = this.refs.scroll;
    if(node.scrollTop !== node.scrollHeight){
      node.scrollTop = this.scrollHeight
    } else {
      node.scrollTop = this.scrollTop + (node.scrollHeight - this.scrollHeight);
    }
  }

  _findSenderById(id) {
    if (id && this.props.chat.participants && this.props.chat.participants.length > 0) {
      return this.props.chat.participants.filter((user) => {
        return user.uphere_id === id;
      })[0];
    }
    return {};
  }

  render() {
    let messages = this.props.chat.messages && this.props.chat.messages.length > 0 ? this.props.chat.messages : [];
    messages = messages.sort((x, y) => x.uphere_id - y.uphere_id);
    let msgDate = create_at => {
      let date = new Date(Date.parse(create_at)).toString();
      let month = create_at[5] === '0' ? create_at.slice(6, 7) : create_at.slice(5, 7);
      let day = date.split(' ')[2];
      let time = date.split(' ')[4];
      return `${month}/${day} ${date.slice(0, 3)} ${time.slice(0, 5)}`;
    };
    return (
        <div className={`${s.container}`} >
          <div className={`${s.content}`} ref="scroll">
            <ul className={`${s.chatlog}`}>
              { messages.map((message, i) => {
                  return <li key={i}
                             className={message.sender_id === this.props.user.uphere_id ? `${s.chatlog_entry_user} ${s.chatlog_entry}` : `${s.chatlog_entry}`}
                         >
                            {message.sender_id !== this.props.user.uphere_id && <img className={`${s.chatlog_avatar}`} src={this._findSenderById(message.sender_id).profile_image_url}/>}
                            <p className={`${s.chatlog_message}`}>{message.text}</p>
                            <span className={`${s.message_time}`}>{msgDate(message.created_at)}</span>
                         </li>
                })
              }
            </ul>
          </div>
          <div className={`${s.footer}`}>
            <ChatInput
              user={this.props.user}
              chat={this.props.chat}
              newMessage={this.props.newMessage}
            />
          </div>
        </div>
    );
  }
}

export default ChatRoom;
