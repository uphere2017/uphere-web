import React, { Component } from 'react';
import s from './ChatInput.css';

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.chat || nextProps.chat.uphere_id === null) {
      this.refs.text.disabled = true;
    } else {
      this.refs.text.disabled = false;
    }
  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      text: e.target.value
    });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      if (e.target.value.trim() === '' || e.altKey ) {
        this.setState((prevState) => {
          return {
            text: prevState.text + "\n"
          };
        });
      } else if (!e.altKey) {
        e.preventDefault();
        this.props.newMessage(e.target.value, this.props.chat, this.props.user);
        this.setState({ text: '' });
      }
    }
  }

  render() {
    return (
              <div className={`${s.text_field}`}>
                <div className={`${s.input_wrapper}`}>
                  <textarea
                    ref="text"
                    className={`${s.text}`}
                    placeholder={'메시지를 입력하세요...'}
                    type="text" id="talk"
                    rows="4"
                    value={this.state.text}
                    onChange={this.onChange.bind(this)}
                    onKeyDown={this.onKeyPress.bind(this)}
                    disabled
                  >
                  </textarea>
                </div>
                <div className={`${s.button_wrapper}`}>
                  <div
                    onClick={(event) => {
                      if (this.state.text.trim() === '') {
                        return;
                      } else {
                        event.preventDefault();
                        this.props.newMessage(this.state.text, this.props.chat, this.props.user);
                        this.setState({ text: '' });
                      }
                    }}
                    className={`${s.button}`}
                  >
                    SEND
                  </div>
                </div>
              </div>
            );
  }
}

export default ChatInput;
