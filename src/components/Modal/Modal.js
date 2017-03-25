import React from 'react';
import s from './Modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{`${s.outerStyle}`, display: this.props.isModalOpen ? 'block' : 'none'}}>
        <div
          className={`${s.overlay}`}
          onClick={this.props.closeModal} />
        <div
          onClick={this.props.closeModal} />
        <div className={`${s.modals}`}>
          <img className={`${s.img_circle}`} src={this.props.userImg}></img>
          <button className={`${s.button}`}onClick={this.props.closeModal}>닫기 X</button>
        </div>
      </div>
    )
  }
}

export default Modal;
