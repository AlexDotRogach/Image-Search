import { Component } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from 'components/Modal';
import { nanoid } from 'nanoid';

class ImageGallery extends Component {
  state = {
    isShow: false,
    imageInfo: {
      src: '',
      alt: '',
    },
  };

  onClickGallery = ({ target: elem }) => {
    this.setState({
      imageInfo: {
        src: elem.getAttribute('data-src'),
        alt: elem.alt,
      },
    });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(prevState => {
      return {
        isShow: !prevState.isShow,
      };
    });
  };

  render() {
    const { images } = this.props;
    const { imageInfo, isShow } = this.state;

    return (
      <>
        <ul className={css.imageGallery} onClick={this.onClickGallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags = [] }) => {
            return (
              <ImageGalleryItem
                key={nanoid()}
                data={{ webformatURL, largeImageURL, tags }}
              ></ImageGalleryItem>
            );
          })}
        </ul>
        {isShow && (
          <Modal data={{ ...imageInfo, toggle: this.toggleModal }}></Modal>
        )}
      </>
    );
  }
}

export default ImageGallery;
