import "./App.css";
import Expenses from "./components/expenses/Expenses";
import NewExpense from "./components/expenses/NewExpense/NewExpense";
import React, { useState, useEffect, useContext, useCallback } from "react";
import MainHeader from './components/MainHeader/MainHeader';
import Login from './components/Login/Login';
import AuthContext from './store/auth-context';
import Button from './components/ui/Button/Button';
import useHttp from './hook/use-http';

const App = () => {
  const [expenseList, setExpenseList] = useState([]);
  const transformedExpenses = (data) => {
    console.log(data);
    const expenseList = Object.entries(data).map(([key,item]) => {
      return {
        id: item.id,
        title: item.title,
        amount: item.amount,
        date: new Date(item.date)
      };
    });
    setExpenseList(expenseList);
  }
  const { isLoading ,error, sendRequest: fetchDataHandler} = useHttp({
    url: 'https://g1-mart-demo-default-rtdb.firebaseio.com/expense.json',
    method: 'GET',
  }, transformedExpenses);

  useEffect(() => {
    fetchDataHandler();
  }, []);

  const saveExpenseHandler = async (expense) => {
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
    const response = await fetch('https://g1-mart-demo-default-rtdb.firebaseio.com/expense.json',{
      method: 'POST',
      body: JSON.stringify(modifiedExpense)
    });
    const data = await response.json();
    console.log('Expense Data: ', JSON.stringify(data))
  };
  const authCtx = useContext(AuthContext);

  let content = <p>Found no movie</p>
  if(expenseList.length > 0){
    content = <Expenses items={expenseList}></Expenses>;
  }
  if(isLoading){
    content = <p>Loading</p>;
  }
  if(error){
    content = <p>{error}</p>;
  }

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={authCtx.isLoggedIn} />
      <main>
      {!authCtx.isLoggedIn && <Login/>}
      {authCtx.isLoggedIn && 
        <React.Fragment>
          <NewExpense onSaveExpense={saveExpenseHandler}></NewExpense>
          <Button onClick={fetchDataHandler}>
            Load Data
          </Button>
          {content}
        </React.Fragment>
      }
      </main>
      </React.Fragment>
  );
};

export default App;
