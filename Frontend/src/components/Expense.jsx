import React from 'react'

function Expense({id,title,category,amount}) {
  return (
    <div className='flex justify-around mt-2 border p-2 rounded-md '>
        <div>Title: {title}</div>
        <div>Category: {category}</div>
        <div> Amount: {amount}</div>
    </div>
  )
}

export default Expense