import React, { Component } from 'react';
import ChatMessages from '../ChatMessages/ChatMessages';
import ChatInput from '../ChatInput/ChatInput';
import s from '../ChatList/ChatList.css';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }

  _findSenderById(id) {
    if (id && this.props.chat.participants && this.props.chat.participants.length > 0) {
      return this.props.chat.participants.filter((user) => {
        return user.uphere_id === id;
      })[0];
    }

    return {};
  }

  render () {
    let messages = this.props.chat.messages && this.props.chat.messages.length > 0 ? this.props.chat.messages : [];
    messages = messages.sort((x, y) => x.uphere_id - y.uphere_id);

    return (
        <div>
          <ul>
            { messages.map((message, i) => {
              return <div key={i}>
                       <div>
                         <img src={this._findSenderById(message.sender_id).profile_image_url}/>
                         <span>{message.text}</span>
                       </div>
                     </div>
              })
            }
          </ul>
          <ChatInput
            user={this.props.user}
            chat={this.props.chat}
            newMessage={this.props.newMessage}
          />
        </div>
    );
  }
}

export default ChatRoom;
