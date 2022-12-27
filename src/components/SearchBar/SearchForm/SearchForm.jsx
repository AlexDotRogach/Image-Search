import css from './SearchForm.module.css';
import { BsSearch } from 'react-icons/bs';
const SearchForm = ({ searchData }) => {
  return (
    <>
      <form className={css.searchForm} onSubmit={searchData}>
        <button type="submit" className={css.searchFormButton}>
          <span className="button-label">{<BsSearch></BsSearch>}</span>
        </button>

        <input
          className={css.searchFormInput}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </>
  );
};

export default SearchForm;
