import ExpenseItem from './ExpenseItem';
import Card from '../ui/Card';
import './Expenses.css';

const Expenses = (props) => {
  return (
    <Card className='expenses'>
      {
      props.items.map(data => 
      <ExpenseItem
      key={data.id}
      title={data.title}
      amount={data.amount}
      date={data.date}
      ></ExpenseItem>)
      }
    </Card>
  );
}
export default Expenses;