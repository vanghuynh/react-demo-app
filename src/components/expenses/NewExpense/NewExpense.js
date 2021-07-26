import React from 'react';
import './NewExpense.css';
import ExpenseForm from './ExpenseForm';

const NewExpense = (props) => {

  const getSaveFormValue = (data, currentTime) => {
    console.log('submited form data', data);
    console.log('Current time: ', currentTime);
    // forward data to parent again
    // day du lieu len cho cha cua no
    props.onSaveExpense(data);
  }
  return (
    <div className='new-expense'>
      <ExpenseForm onSaveExpenseClick={getSaveFormValue}></ExpenseForm>
    </div>
  )
}
export default NewExpense;