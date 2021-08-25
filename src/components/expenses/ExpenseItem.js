import React, { useState } from 'react';
import ExpenseDate from './ExpenseDate';
import './ExpenseItem.css';
import Card from '../ui/Card/Card';

const ExpenseItem = (props) => {
  const [title, setTitle] = useState(props.title);
  console.log('init ExpenseItem');
  const buttonClickedHandler = () => {
    setTitle('Updated...');
    console.log('Click!!!', title);
  }
  return (
    <Card className='expense-item'>
      <ExpenseDate date={props.date}/>
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">{props.amount}</div>
      </div>
      <div className="expense-item__action">
        <button onClick={buttonClickedHandler}>Change Title</button>
      </div>
    </Card>
  );
}

export default ExpenseItem;