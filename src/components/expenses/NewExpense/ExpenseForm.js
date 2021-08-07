import React, {useState, useRef} from 'react';
import styles from  './ExpenseForm.module.css';

const ExpenseForm = (props) => {

  const titleRef = useRef();
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
    console.log(amount);
  }
  const dateChangeHandler = (event) => {
    setDate(event.target.value);
    console.log(date);
  }
  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log('formSubmitHandler!!');
    console.log('Title Ref: ', titleRef.current.value);
    const newExpenseData = {
      title: titleRef.current.value,
      amount:amount,
      date: date
    }
    const now = new Date();
    console.log('Form data', newExpenseData);
    // pass data to parent
    props.onSaveExpenseClick(newExpenseData, now)
    // Reset form value ???
    titleRef.current.value = '';
    setAmount('');
    setDate('');
  }
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={styles['new-expense__controls']}>
        <div className={styles['new-expense__control']}>
          <label>Title</label>
          <input type='text'
          ref={titleRef}
          ></input>
        </div>
        <div className={styles['new-expense__control']}>
          <label>Amount</label>
          <input type='number' min='0.01' step='0.01'
            value={amount}
            onChange={amountChangeHandler}
          ></input>
        </div>
        <div className={styles['new-expense__control']}>
          <label>Date</label>
          <input type='date'  min='2021-01-01' max='2025-01-01'
            value={date}
            onChange={dateChangeHandler}
          ></input>
        </div>
        <div className={styles['new-expense__actions']}>
          <button type='submit'>Add Expense</button>
        </div>
      </div>
    </form>
  );
}
export default ExpenseForm;