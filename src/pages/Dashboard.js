import React from "react";
import Cards from "../components/Card";
import NoTransactions from "../components/NoTransactions";
import Chart from "../components/Chart";


function Dashboard({ income, expense, totalBalance, transactions }) {
  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  }); 

  return (
    <div className="h-full flex flex-col w-full  md:pt-6 md:gap-12  items-center ">
      <div className="">
      <Cards
        income={income}
        expense={expense}
        totalBalance={totalBalance}
      ></Cards>
      </div>

      {transactions && transactions.length !== 0 ? (
        
         <div className="w-full flex justify-center"><Chart sortedTransactions={sortedTransactions} income={income}
         expense={expense}
         totalBalance={totalBalance}></Chart></div>
       
      ) : (
        <div>
          <NoTransactions></NoTransactions>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
