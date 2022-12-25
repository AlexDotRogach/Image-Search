import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
const modalContainer = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = e => {
    if (e.code !== 'Escape') return '';
    this.props.data.toggle();
  };

  hideModal = e => {
    if (e.target === e.currentTarget) this.props.data.toggle();
  };

  render() {
    const {
      data: { src, alt },
    } = this.props;

    return createPortal(
      <div className={css.overlay} onClick={this.hideModal}>
        <div className={css.modal}>
          <img src={src} alt={alt} />
        </div>
      </div>,
      modalContainer
    );
  }
}

export default Modal;
