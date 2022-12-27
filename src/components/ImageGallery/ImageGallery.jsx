import { useState, useEffect } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from 'components/Modal';
import { nanoid } from 'nanoid';

const ImageGallery = ({ images }) => {
  const [show, setShow] = useState(false);
  const [imgInfo, setImgInfo] = useState({});

  const toggleModal = () => {
    setShow(!show);
  };

  const onClickGallery = ({ target: elem }) => {
    setImgInfo({
      src: elem.getAttribute('data-src'),
      alt: elem.alt,
    });

    toggleModal();
  };

  return (
    <>
      <ul className={css.imageGallery} onClick={onClickGallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags = [] }) => {
          return (
            <ImageGalleryItem
              key={nanoid()}
              data={{ webformatURL, largeImageURL, tags }}
            ></ImageGalleryItem>
          );
        })}
      </ul>
      {show && <Modal data={{ imgInfo, toggle: toggleModal }}></Modal>}
    </>
  );
};

export default ImageGallery;
