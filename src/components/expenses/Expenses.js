import ExpenseItem from "./ExpenseItem";
import Card from "../ui/Card";
import "./Expenses.css";

const Expenses = (props) => {
  const selectYearHandler = (event) => {
    console.log(event);
    // arr = [option1, option2, option3] => selected = 2, => arr[selected]
    const selectedYear =
      event.target.options[event.target.options.selectedIndex].innerText;
    console.log("selected Year: ", selectedYear);
    props.items = props.items.filter(
      (item) => item.date.getFullYear() == selectedYear
    );
  };
  return (
    <Card className="expenses">
      {/* <ExpenseFilter></ExpenseFilter> */}
      <div>
        <label for="selectYear">Choose year:</label>

        <select
          id="selectYear"
          defaultValue="2021"
          onChange={selectYearHandler}
        >
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>
      {props.items.map((data) => (
        <ExpenseItem
          key={data.id}
          title={data.title}
          amount={data.amount}
          date={data.date}
        ></ExpenseItem>
      ))}
    </Card>
  );
};
export default Expenses;
