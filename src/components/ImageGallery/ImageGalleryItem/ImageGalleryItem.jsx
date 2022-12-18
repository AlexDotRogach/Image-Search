import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ data: { webformatURL, largeImageURL, tags } }) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};

export default ImageGalleryItem;
