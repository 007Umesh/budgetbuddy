import React from 'react'
import transactions from "../assets/transactions.svg"

function NoTransactions() {
  return (
    <div className='flex justify-center items-center w-full flex-col mb-8'>
        <img src={transactions}
        className='w-[200px]  md:w-[400px] m-14'></img>
        <p className='text-[1rem] md:text-[1.25rem] font-montserrat tracking-widest'>You Have No Transactions Currently</p></div>
  )
}

export default NoTransactions