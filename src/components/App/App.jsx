import { Component } from 'react';
import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { toastSetting } from '../services/const';
import api from '../services/api';
import SearchBar from 'components/SearchBar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';

class App extends Component {
  state = {
    data: [],
    status: 'init',
  };

  componentDidUpdate(prevProps, prevState) {}

  searchData = evt => {
    evt.preventDefault();
    this.setState({
      status: 'loading',
    });

    const {
      currentTarget: {
        elements: {
          search: { value: searchString },
        },
      },
    } = evt;

    api(searchString).then(({ hits: images }) => {
      if (images.length === 0) toast('no result', toastSetting);

      this.setState({
        data: images,
      });

      this.setState(prevState => {
        const status = prevState.data.length > 0 ? 'loaded' : 'fail';
        return {
          status: status,
        };
      });
    });
  };

  statusRender(status) {
    const { data } = this.state;

    switch (status) {
      case 'init':
        return <span>write smth</span>;
      case 'loading':
        return <Loader></Loader>;
      case 'loaded':
        return <ImageGallery images={data}></ImageGallery>;
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
