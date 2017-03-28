import React, { Component } from 'react'

const ChatMessages = ({ message, participant }) => (
  <li className="mdl-list__item mdl-list__item--three-line mdl-shadow--2dp">
    {message.senderName !== 'me' ?
      <span className="mdl-list__item-primary-content">
        <img className="mdl-chip__contact" src={message.profile}></img>
        <span>{message.senderName}</span>
        <span className="mdl-list__item-text-body">
          {message.text}
        </span>
      </span>
        :
      <span className="mdl-list__item-primary-content">
        <span className="mdl-list__item-text-body mdl-textfield--align-right">
          {message.text}
        </span>
      </span>
    }
  </li>
);

export default ChatMessages
