import React from 'react';
import s from './ChatList.css';

class ChatList extends React.Component {
  constructor(props) {
    super(props);

    const defaultCurrentChatIndex = this.props.chats.map(chat => chat.uphere_id).indexOf(this.props.currentChatID);

    this.state = {
      currentChatIndex: defaultCurrentChatIndex < 0 ? 0 : defaultCurrentChatIndex,
      showModal: false,
      showDeleteCog: false,
      showDeleteChatModal: false,
      currentChatId: 0
    };
  }

  componentDidMount() {
    document.onclick = (e) => {
      if (e.target !== this.outermodal &&
        e.target !== this.innermodal &&
        e.target !== this.configBtn &&
        this.outermodal.className !== `${s.hide_outer_modal}`) {
        this.setState((prevState, prevProps) => {
          return {
            showModal: !prevState.showModal
          };
        });
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const defaultCurrentChatIndex = nextProps.chats.map(chat => chat.uphere_id).indexOf(nextProps.currentChatID);
    const newCurrentChatIndex = defaultCurrentChatIndex < 0 ? 0 : defaultCurrentChatIndex;

    this.setState({
      currentChatIndex: newCurrentChatIndex
    });
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

    const logoutModal = (
      <div ref={(ref) => { this.outermodal = ref; }} className={this.state.showModal ? `${s.not_hide_outer_modal}` : `${s.hide_outer_modal}`}>
        <div ref={(ref) => { this.innermodal = ref; }} className={`${s.show_logout_inner_modal}`}>
          <span onClick={(e) => {
            e.preventDefault();
            this.setState((prevState, prevProps) => {
              return {
                showModal: !prevState.showModal
              };
            });
          }} className={`${s.logout}`}><i className="fa fa-sign-out" aria-hidden="true"></i></span>
          <span className={`${s.logoutMsg}`} >See ya~</span>
        </div>
      </div>
    );

    const chatDeleteModal = (
      <div ref={(ref) => { this.deleteModal = ref; }} className={this.state.showDeleteChatModal ? `${s.not_hide_outer_delete_modal}` : `${s.hide_outer_modal}`}>
        <div ref={(ref) => { this.innerDeleteModal = ref; }} className={`${s.show_inner_modal}`}>
          <li className={`${s.on_delete}`} onClick={(e) => {
            e.preventDefault();
            this.props.deleteChat(this.state.currentChatId);
            this.setState((prevState) => {
              return {
                showDeleteChatModal: !prevState.showDeleteChatModal,
                showDeleteCog: !prevState.showDeleteCog
              };
            });
          }}>
            <hr/>
            <span className={`${s.logoutMsg}`} >Delete</span>
            <hr/>
          </li>
        </div>
      </div>
    );

    return (
      <div>
        <div className={`${s.chatlist_header}`}>
          <div>
            <i ref={(ref) => { this.configBtn = ref; }} className="fa fa-cog fa-lg" aria-hidden="true" onClick={(e) => {
              e.preventDefault();
              this.setState((prevState, prevProps) => {
                return {
                  showModal: !prevState.showModal
                };
              });
            }} ></i>
          </div>
          <div>
            <h4>Messenger</h4>
          </div>
          <div>
            <i className="fa fa-commenting-o fa-lg" aria-hidden="true"></i>
          </div>
        </div>
        <ul className={s.chatlist_container}>
         {logoutModal}
         {chatDeleteModal}
        {this.props.chats.length > 0 && this.props.chats.map((chat, i) => {
          return (
            <li ref="chatroom" key={i}
              className={`${s.chatroom_container} ${this.state.currentChatIndex === i ? s.chatroom_click : ''}`}
              onMouseEnter={(e) => {
                e.preventDefault();
                if (!this.state.showDeleteChatModal) {
                  this.setState((prevState, prevProps) => {
                    return {
                      showDeleteCog: !prevState.showDeleteCog,
                      currentChatId: this.props.chats[i].uphere_id,
                      currentChatIndex: i
                    };
                  });
                }
              }}
              onMouseLeave={(e) => {
                e.preventDefault();
                if (!this.state.showDeleteChatModal) {
                  this.setState((prevState, prevProps) => {
                    return {
                      showDeleteCog: !prevState.showDeleteCog
                    };
                  });
                }
              }}
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
              <div className={`${s.chatroom_time}`}>
                <i className={`fa fa-check ${s.chatroom_check}`} aria-hidden="true">{chat.messages.length > 0 ? lastmsgDate(chat.messages[chat.messages.length - 1].created_at) : null}</i>
                <div className={`${this.state.showDeleteCog && this.state.currentChatIndex === i ? s.chat_cog : s.hide_chat_cog}`}>
                  <i id="deleteCog" ref={(ref) => { this.deleteCog = ref; }} className={`fa fa-cog fa-lg ${s.deleteCog}`} aria-hidden="true" onClick={(e) => {
                    e.preventDefault();
                    this.deleteModal.style.top = `${e.pageY + 20}px`;
                    this.deleteModal.style.left = `${e.pageX - 15}px`;
                    if (this.state.currentChatIndex === i) {
                      this.setState((prevState, prevProps) => {
                        return {
                          showDeleteChatModal: !prevState.showDeleteChatModal
                        };
                      });
                    }
                  }} >
                  </i>
                </div>
              </div>
              <div className={`${s.chatroom_preview}`}>
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
              </div>
            </li>
          );
        })}
        </ul>
      </div>
    );
  }
}

export default ChatList;
