import React from 'react';
import data from './data.js';
import s from './ChatList.css';

class ChatList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chatRooms : []
    };
  }

  componentDidMount() {
    this.setState({
      chatRooms : data
    });
  }

  render() {
    return (
      <div>
        {this.state.chatRooms.map((chatData, i) => {
          return (
            <div className={`${s.chatroom_container}`} key={i}>
              <div className={`${s.img_divide}`}>
                { <img src={chatData.messages[0].sender.picture.large} /> }
              </div>
              <div className={`${s.usernames}`}>
                <h4>
                  { chatData.messages[0].sender.senderName }
                </h4>
                <p>
                  <span className={`${s.latest_text}`}>{ chatData.messages[0].text }</span>
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
