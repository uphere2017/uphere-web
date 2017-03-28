import React, { Component } from 'react';

const ChatRoom = props => (
  <form>
    <div>
      <input type="text" id="talk" value={props.text}  onChange={props.onChange} />
      {props.text ? '' :
        <label htmlFor="talk">Talk</label>}
    </div>
    <button
      onClick={(event) => {
        event.preventDefault();
        props.newMessage(props.text, props.chat, props.user);
      }}
    >
      전송
    </button>
  </form>
);

export default ChatRoom;
