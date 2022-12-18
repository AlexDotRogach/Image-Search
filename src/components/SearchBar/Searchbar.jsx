import css from './Searchbar.module.css';
import SearchForm from './SearchForm';

const Searchbar = ({ searchData }) => {
  return (
    <header className={css.searchbar}>
      <SearchForm searchData={searchData}></SearchForm>
    </header>
  );
};

export default Searchbar;
