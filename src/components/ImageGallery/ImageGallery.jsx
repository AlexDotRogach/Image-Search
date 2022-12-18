import css from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ images }) => {
  console.log(images);
  return (
    <ul className={css.imageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags = [] }) => {
        return (
          <ImageGalleryItem
            key={id}
            data={{ webformatURL, largeImageURL, tags }}
          ></ImageGalleryItem>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
