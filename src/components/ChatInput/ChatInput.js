import React, { Component } from 'react';

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }

  onChange(e) {
    e.preventDefault();

    this.setState({
      text: e.target.value
    });
  }

  render() {
    return (<form>
              <div>
                <input type="text" id="talk" value={this.state.text} onChange={this.onChange.bind(this)} />
              </div>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  this.props.newMessage(this.state.text, this.props.chat, this.props.user);
                  this.setState({ text: '' });
                }}
              >
                전송
              </button>
            </form>);
  }
}

export default ChatRoom;
