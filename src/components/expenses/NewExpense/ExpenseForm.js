import React, {useState, useReducer, useEffect} from 'react';
import Input from '../../ui/Input/Input';
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
        <Input
          onChange={titleChangeHandler}
          onBlur={titleValidateHandler}
          label='Title'
          type='text'
          isValid={titleState.isValid}
          value={titleState.value}
        />
        <Input
          onChange={amountChangeHandler}
          onBlur={amountValidateHandler}
          label='Amount'
          type='number'
          isValid={amountState.isValid}
          value={amountState.value}
        />
        <Input
          onChange={dateChangeHandler}
          label='Date'
          type='date'
          value={date}
        />
        <div className={`${styles['new-expense__actions']} ${!formIsValid ? styles['disabled'] : ''}`}>
          <button disabled={!formIsValid} type='submit'>Add Expense</button>
        </div>
      </div>
    </form>
  );
}
export default ExpenseForm;