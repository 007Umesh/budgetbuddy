import React from "react";
import "./Cards.css";

function Cards({
  income,
  expense,
  totalBalance
}) {
  return (
      <div className="flex gap-3 p-3 justify-center items-center lg:gap-10 lg:flex lg:flex-row flex-col">
        <div className=" w-60 md:w-96 custom-card balance font-montserrat rounded-lg p-6 shadow-card">
          <div className="card-title text-center">
            <span className="text-white block text-lg font-semibold">
              Current Balance
            </span>
            <p className="card-p ">
            ₹ {totalBalance}
            </p>
          </div>
        </div>

       
        <div className=" w-60 md:w-96 custom-card income font-montserrat rounded-lg p-6 shadow-lg">
          <div className="card-title text-center">
            <span className="text-white block text-lg font-semibold">
              Total Income
            </span>
            <p className="card-p">
            ₹ {income}
            </p>
          </div>
        </div>

    
        <div className="w-60 md:w-96 custom-card expense font-montserrat rounded-lg p-6 shadow-lg">
          <div className="card-title text-center">
            <span className="text-white block text-lg font-semibold">
              Total Expense
            </span>
            <p className="card-p">
            ₹ {expense}
            </p>
          </div>
        </div>
      </div>
  );
}

export default Cards;
