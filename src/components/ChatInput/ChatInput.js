import React, { Component } from 'react';

const ChatRoom = props => (
  <form>
    <div className="mdl-textfield mdl-js-textfield">
      <input className="mdl-textfield__input" type="text" id="talk" value={props.text}  onChange={props.onChange} />
      {props.text ? '' :
        <label className="mdl-textfield__label" htmlFor="talk">Talk</label>}
    </div>
    <button
      className="mdl-button mdl-js-button mdl-js-ripple-effect"
      onClick={(event) => props.sendMessage(event, props.text)}
    >
      전송
    </button>
  </form>
);

export default ChatRoom;
