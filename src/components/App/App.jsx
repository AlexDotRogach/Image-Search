import { Component } from 'react';
import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { toastSetting } from '../services/const';
import api from '../services/api';
import SearchBar from 'components/SearchBar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';

class App extends Component {
  state = {
    data: [],
    status: 'init',
    page: 26,
    searchString: '',
    isFinish: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.findImages(this.state.searchString);
    }

    if (prevState.searchString !== this.state.searchString) {
      this.setState({
        data: [],
      });
      this.findImages(this.state.searchString);
    }
  }

  searchData = evt => {
    evt.preventDefault();

    const {
      currentTarget: {
        elements: {
          search: { value: searchString },
        },
      },
    } = evt;

    if (searchString === this.state.searchString) return '';

    this.setState({
      status: 'loading',
      searchString,
    });

    this.findImages(searchString);
  };

  findImages = url => {
    api(url, this.state.page).then(({ hits: images }) => {
      // no request
      if (!images) {
        this.setState(prevState => {
          return { isFinish: !prevState.isFinish };
        });
        return '';
      }
      // no images
      if (images.length === 0) {
        toast('no result', toastSetting);
        this.setState({ data: [], status: 'fail' });
        return '';
      }
      // all is good
      this.setState(prevState => {
        return {
          data: [...prevState.data, ...images],
          status: 'loaded',
        };
      });
    });
  };

  nextPage = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  statusRender(status) {
    const { data, isFinish } = this.state;

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
              <Button addPage={this.nextPage}></Button>
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
  }

  render() {
    const { status } = this.state;

    return (
      <div className={css.app}>
        <SearchBar searchData={this.searchData}></SearchBar>
        {this.statusRender(status)}
        <ToastContainer></ToastContainer>
      </div>
    );
  }
}

export default App;
