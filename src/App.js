import "./App.css";
import Expenses from "./components/expenses/Expenses";
import NewExpense from "./components/expenses/NewExpense/NewExpense";
import React, { useState, useEffect } from "react";
import MainHeader from './components/MainHeader/MainHeader';
import Login from './components/Login/Login';

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
      {!isLoggedIn && <Login onLogin={loginHandler} />}
      {isLoggedIn && 
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
