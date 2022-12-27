import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
const modalContainer = document.querySelector('#modal-root');

const Modal = ({ data }) => {
  const {
    toggle,
    imgInfo: { src, alt },
  } = data;

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = e => {
    if (e.code !== 'Escape') return '';
    toggle();
  };
  const hideModal = e => {
    if (e.target === e.currentTarget) toggle();
  };

  return createPortal(
    <div className={css.overlay} onClick={hideModal}>
      <div className={css.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalContainer
  );
};

export default Modal;
