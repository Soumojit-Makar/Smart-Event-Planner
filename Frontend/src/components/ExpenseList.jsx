import React, { useEffect, useState } from 'react'
import Expense from './Expense'
import ExpenseForm from './ExpenseForm'
import { getUserExpanse } from '../services/Expense.service';

function ExpenseList() {
  const [expenses, setExpenses] = useState([
    
  ]);

  useEffect(()=>{
    getUserExpanse()
    .then((res)=>{
      // console.log(res.data)
      setExpenses(res.data)
    })
  },[expenses])
  const addExpense = (newExpense) => {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      { ...newExpense, id: prevExpenses.length + 1 }, 
    ]);
  };

  return (
    <div className="flex flex-col mt-2 mb-2">
      <ExpenseForm addExpense={addExpense} />
      {expenses.length>0?(
       <>
         {expenses.map((item) => (
        <Expense
          amount={item.amount}
          title={item.title}
          category={item.category}
          key={item.id}
          id={item.id}
        />
      ))}
       
       </>
      ):(
        <h1 className='text-center'>No Previous Expenses Found</h1>
      )}
      
    </div>
  );
}

export default ExpenseList;
