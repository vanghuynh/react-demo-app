import React, {useState, useReducer, useEffect} from 'react';
import styles from  './ExpenseForm.module.css';

const titleReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return {
      value: action.val,
      isValid: action.val.trim().length > 0 
    }
  }
  if(action.type === 'USER_BLUR'){
    return {
      value: state.value,
      isValid: state.value.trim().length > 0 
    }
  }
  if(action.type === 'USER_SUBMITTED'){
    return {
      value: '',
      isValid: true 
    }
  }
  return {value: '', isValid: true}
}

const amountReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return {
      value: action.val,
      isValid: action.val.trim().length > 0 
    }
  }
  if(action.type === 'USER_BLUR'){
    return {
      value: state.value,
      isValid: state.value.trim().length > 0 
    }
  }
  if(action.type === 'USER_SUBMITTED'){
    return {
      value: '',
      isValid: true 
    }
  }
  return {value: '', isValid: true}
}

const ExpenseForm = (props) => {

  const [titleState, dispatchTitle] = useReducer(titleReducer, {value: '', isValid: true});
  const [amountState, dispatchAmount] = useReducer(amountReducer, {value: '', isValid: true});

  const [date, setDate] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  const titleChangeHandler = (event) => {
    dispatchTitle({type: 'USER_INPUT', val: event.target.value});
    // setFormIsValid(event.target.value.trim().length > 0 && amountState.value.trim().length > 0);
  }
  const titleValidateHandler = (event) => {
    dispatchTitle({type: 'USER_BLUR'})
  }
  const amountChangeHandler = (event) => {
    dispatchAmount({type: 'USER_INPUT', val: event.target.value});
    // setFormIsValid(event.target.value.trim().length > 0 && titleState.value.trim().length > 0);
  }
  const amountValidateHandler = (event) => {
    dispatchTitle({type: 'USER_BLUR'});
  }

  const { isValid: titleIsValid } = titleState; // object destructuring with alias
  const { isValid: amountIsValid } = amountState; // object destructuring with alias


  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Check form validity!!!')
      setFormIsValid(amountIsValid && titleIsValid);
    }, 500);
    return () => {
      console.log('CLEAN-UP')
      clearTimeout(identifier);
    }
  }, [titleIsValid, amountIsValid]);

  const dateChangeHandler = (event) => {
    setDate(event.target.value);
    console.log(date);
  }
  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log('formSubmitHandler!!');
    console.log('Title value: ', titleState.value);
    const newExpenseData = {
      title: titleState.value,
      amount: amountState.value,
      date: date
    }
    const now = new Date();
    console.log('Form data', newExpenseData);
    // pass data to parent
    props.onSaveExpenseClick(newExpenseData, now)
    // Reset form value ???
    dispatchTitle({type: 'USER_SUBMITTED'})
    dispatchAmount({type: 'USER_SUBMITTED'});
    setDate('');
  }
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={styles['new-expense__controls']}>
        <div className={`${styles['new-expense__control']} ${titleState.isValid === false ? styles['invalid'] : ''}`}>
          <label>Title</label>
          <input type='text'
          onChange={titleChangeHandler}
          onBlur={titleValidateHandler}
          value={titleState.value} 
          ></input>
        </div>
        <div className={`${styles['new-expense__control']} ${amountState.isValid === false ? styles['invalid'] : ''}`}>
          <label>Amount</label>
          <input type='number' min='0.01' step='0.01'
            value={amountState.value}
            onChange={amountChangeHandler}
            onBlur={amountValidateHandler}
          ></input>
        </div>
        <div className={styles['new-expense__control']}>
          <label>Date</label>
          <input type='date'  min='2021-01-01' max='2025-01-01'
            value={date}
            onChange={dateChangeHandler}
          ></input>
        </div>
        <div className={`${styles['new-expense__actions']} ${!formIsValid ? styles['disabled'] : ''}`}>
          <button disabled={!formIsValid} type='submit'>Add Expense</button>
        </div>
      </div>
    </form>
  );
}
export default ExpenseForm;