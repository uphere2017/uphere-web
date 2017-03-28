import React, { Component } from 'react'

const ChatMessages = ({ message, participant }) => (
  <li>
    {message.senderName !== 'me' ?
      <span>
        <img src={message.profile}></img>
        <span>{message.senderName}</span>
        <span>
          {message.text}
        </span>
      </span>
        :
      <span>
        <span>
          {message.text}
        </span>
      </span>
    }
  </li>
);

export default ChatMessages
