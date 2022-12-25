import css from './Button.module.css';

const Button = ({ addPage }) => {
  return (
    <button onClick={addPage} className={css.button}>
      Load more
    </button>
  );
};

export default Button;
