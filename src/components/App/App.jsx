import { useState, useEffect, useLayoutEffect } from 'react';
import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { toastSetting } from '../services/const';
import api from '../services/api';
import SearchBar from 'components/SearchBar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';

const App = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('init');
  const [page, setPage] = useState(10);
  const [searchString, setSearchString] = useState('');
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    if (!searchString) return;

    api(searchString, page).then(({ hits: images }) => {
      console.log(images);
      // no images
      if (!images) {
        setIsFinish(!isFinish);
        return '';
      }

      if (images.length === 0) {
        toast('no result', toastSetting);
        setData([]);
        setStatus('fail');
        return '';
      }

      if (page > 1) {
        setData([...data, ...images]);
        return '';
      }

      setData([...images]);
      setStatus('loaded');
    });
  }, [searchString, page]);

  const searchDataSubmit = evt => {
    evt.preventDefault();

    const {
      currentTarget: {
        elements: {
          search: { value: searchString },
        },
      },
    } = evt;

    if (!searchString) return '';

    setStatus('loading');
    setSearchString(searchString);
    setPage(1);
  };

  const statusRender = status => {
    switch (status) {
      case 'init':
        return <span>write smth</span>;
      case 'loading':
        return <Loader></Loader>;
      case 'loaded':
        return (
          <>
            <ImageGallery images={data}></ImageGallery>
            {!isFinish ? (
              <Button
                addPage={() => {
                  setPage(page + 1);
                }}
              ></Button>
            ) : (
              <p className={css.btnText}>no data</p>
            )}
          </>
        );
      case 'fail':
        return <span>no result</span>;
      default:
        return <span>no status</span>;
    }
  };

  return (
    <div className={css.app}>
      <SearchBar searchData={searchDataSubmit}></SearchBar>
      {statusRender(status)}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default App;
