import {   Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
 ArcElement,
  Tooltip,
  Legend,CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { useEffect, useState } from "react";


ChartJS.register(
 ArcElement,
  Tooltip,
  Legend,CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
)



function Chart({sortedTransactions,income, expense, totalBalance}){
   

  const data={
    labels:["Current Balance", "Income", "Expense"],
    datasets: [
        {
            label:"Transaction statistics",
            data:[totalBalance, income, expense],
            backgroundColor:[
                "#3CB371",
                "#1E90FF",
                "#FF6347",
            ]
        }
    ]
  }

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        boxWidth: 40,
        padding: 15,
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.raw;
          return `${context.label}: ₹${value.toFixed(2)}`;
        },
      },
    },
  },
};

const [incomeData, setIncomeData] = useState([]);
const [expenseData, setExpenseData] = useState([]);
const [months, setMonths] = useState([]);

// Function to aggregate monthly income and expense data
const aggregateData = (transactions) => {
  let incomeMap = {};
  let expenseMap = {};
  let monthList = [];

  transactions.forEach((transaction) => {
    const month = new Date(transaction.date).toLocaleString("default", {
      month: "long",
    });
    if (!monthList.includes(month)) {
      monthList.push(month);
    }

    if (transaction.type === "incomedetails") {
      incomeMap[month] = (incomeMap[month] || 0) + transaction.amount;
    } else if (transaction.type === "expensedetails") {
      expenseMap[month] = (expenseMap[month] || 0) + transaction.amount;
    }
  });

  const incomeData = monthList.map((month) => incomeMap[month] || 0);
  const expenseData = monthList.map((month) => expenseMap[month] || 0);

  setIncomeData(incomeData);
  setExpenseData(expenseData);
  setMonths(monthList);
};

// Update the data whenever `sortedTransactions` changes
useEffect(() => {
  aggregateData(sortedTransactions);
}, [sortedTransactions]);

// calculate max and min values for the Y-axis
const maxData = Math.max(...incomeData, ...expenseData);
const minData = Math.min(...incomeData, ...expenseData);

// Data object for the chart
const linedata = {
  labels: months,
  datasets: [
    {
      label: "Income",
      data: incomeData,
      borderColor: "#FF4500", // Green color for income
      backgroundColor: "rgba(76, 175, 80, 0.2)",
      tension: 0.4,
      fill: false, // No fill under the line
    },
    {
      label: "Expense",
      data: expenseData,
      borderColor: "#32CD32 ", // Red color for expense
      backgroundColor: "rgba(244, 67, 54, 0.2)",
      tension: 0.4,
      fill: false, // No fill under the line
    },
  ],
};

// Options for dynamic Y-axis scaling
const optionsLine = {
  responsive: true,
  aspectRatio: 2,
  plugins: {
    legend: {
      position: "top",
      labels: {
        boxWidth: 20,
        padding: 15,
      },
    },
    title: {
      display: true,
      text: "Income and Expense Over Time", 
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      min: Math.max(minData, 200), // Add a small buffer below the minimum value
      max: maxData + 1000, // Add a small buffer above the maximum value
      ticks: {
        stepSize: (maxData - minData) / 5, // Step size based on the data range
      },
    },
  },
};

    return(
     <div className="flex md:flex-row md:h-[70vh] h-auto pt-5 flex-col gap-8 items-center px-4 w-full">      
          <div className=" flex items-center w-full md:w-[65%] pl-5 h-full md:h-[500px] rounded-2xl shadow-card "> <Line data={linedata} options={optionsLine}></Line></div>
          <div className="flex items-center justify-center w-full md:w-[30%] rounded-2xl  h-full md:h-[500px] shadow-card  "> <Doughnut data={data} options={options} ></Doughnut></div>
        
     </div>
    )
}

export default Chart;