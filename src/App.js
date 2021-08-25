import "./App.css";
import Expenses from "./components/expenses/Expenses";
import NewExpense from "./components/expenses/NewExpense/NewExpense";
import React, { useState, useEffect, useContext } from "react";
import MainHeader from './components/MainHeader/MainHeader';
import Login from './components/Login/Login';
import AuthContext from './store/auth-context';

const App = () => {
  const expenses = [
    { id: "1", title: "First", amount: 100, date: new Date(2020, 1, 1) },
    { id: "2", title: "Second", amount: 200, date: new Date() },
  ];
  const [expenseList, setExpenseList] = useState(expenses);
  const saveExpenseHandler = (expense) => {
    console.log("App: ", expense);
    // never work, must use setState
    //expenses.push(expense);
    // convert to date type
    const modifiedExpense = {
      ...expense,
      date: new Date(expense.date),
      id: Math.random(2).toString(),
    };
    setExpenseList((prevState) => {
      return [modifiedExpense, ...prevState];
    });
    console.log("expenseList: ", expenseList);
  };
  const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={authCtx.isLoggedIn} />
      <main>
      {!authCtx.isLoggedIn && <Login/>}
      {authCtx.isLoggedIn && 
        <React.Fragment>
          <NewExpense onSaveExpense={saveExpenseHandler}></NewExpense>
          <Expenses items={expenseList}></Expenses>
        </React.Fragment>
      }
      </main>
      </React.Fragment>
  );
};

export default App;
