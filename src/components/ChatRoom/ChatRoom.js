import React, { Component } from 'react';
import ChatMessages from '../ChatMessages/ChatMessages';
import ChatInput from '../ChatInput/ChatInput';
import s from '../ChatList/ChatList.css';

// mock ChatData
import ChatData from './ChatData';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.showMessages = null;
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
        text: ''
      });
    }
  }

  render () {
    let sortedMessages = this.props.chat.messages && this.props.chat.messages.sort((a, b) => a.uphere_id - b.uphere_id);
    let participants = this.props.chat.participants;
    return (
        <div>
          <ul>
            { sortedMessages ? sortedMessages.map((message, i) => {
              return <div key={i}>
                       <div className={`${s.img_divide}`} style={{ width: "200px" }}>
                         <img src={participants[i].uphere_id === message.sender_id ? participants[i].profile_image_url : i ? 0 : 1}/>
                         <span style={{ marginLeft: "20px" }}>{message.text}</span>
                       </div>
                     </div>
            }) : <p>No Content Yet</p>
          }
          </ul>
          <ChatInput onChange={this.handleChange} text={this.state.text} sendMessage={this.sendMessage} />
        </div>
    );
  }
}

export default ChatRoom;
