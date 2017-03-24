import React, { Component } from 'react';
import ChatMessages from '../ChatMessages/ChatMessages';
import ChatInput from '../ChatInput/ChatInput';

// mock ChatData
import ChatData from './ChatData';

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: ChatData,
      text: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  handleChange(e) {
    this.setState({
      text: e.target.value,
      isEmpty: false
    });
  }

  sendMessage(event, message) {
    event.preventDefault();
    if (message) {
      this.setState({
        messages: this.state.messages.concat({text: message, timestamp: Date.now(), senderName: 'me'}),
        text: ''
      });
    }
  }

  render () {
    var sortedMessages = this.state.messages.sort((a, b) => a.timestamp - b.timestamp);
    return (
      <div>
        <ul className="demo-list-three mdl-list">
        {sortedMessages.map((message, i) => {
          return <ChatMessages message={message} key={i} />
        })}
        </ul>
        <ChatInput onChange={this.handleChange} text={this.state.text} sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default ChatRoom;
