import styles from './Input.module.css';

const Input = (props) => {
  return (
    <div className={`${styles['new-expense__control']} ${props.isValid === false ? styles['invalid'] : ''}`}>
      <label>{props.label}</label>
      <input type={props.type}
      onChange={props.onChange}
      onBlur={props.onBlur}
      value={props.value} 
      ></input>
    </div>
  );
}

export default Input;