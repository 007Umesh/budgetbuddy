import React from 'react';
import { Bar, Pie } from '@ant-design/charts';

function Chart({ sortedTransactions,income,expense,totalBalance }) {
   
  const aggregateByMonth = (transactions)=>{
    const allMonths = Array.from({length : 12}, (_ ,i) => i+1);
    const groupData = transactions.reduce((acc, item)=>{
      const month = new Date(item.date).getMonth()+1;
      if(!acc[month]){
        acc[month] = {incomes : 0 , expenses: 0};
      }
      if(item.type === 'incomeDetails'){
        acc[month].incomes += item.amount;
      }
      else if(item.type === 'expenseDetails'){
        acc[month].expenses += item.amount;
      }
      return acc;
    },{})
   return allMonths.flatMap((month)=>[
    {
      month: String(month),
      type: 'Income',
      amount: groupData[month]?.incomes || 0,
    },
    {
      month: String(month),
      type: 'Income',
      amount: groupData[month]?.expenses || 0,
    }
   ]) 
  }

  const barData = aggregateByMonth(sortedTransactions);
  

  const barConfig = {
    data: barData,
    isGroup: true, 
    xField: 'amount',
    yField: 'month',
    seriesField: 'type',
    marginRatio: 0.1,
    color: ['#1f77b4', '#ff7f0e'], 
    barWidthRatio: 0.4, 
    label: {
      style: {
        fontSize:12,
      },
    },
    tooltip: {
      formatter: (datum) => ({
        name: datum.type,
        value: `$${datum.amount.toFixed(2)}`,
      }),
    },
    title: {
      visible: true,
      text: 'Monthly Income and Expenses',
    },
    xAxis: {
      title: {
        text: 'Month',
      },
    },
    yAxis: {
      title: {
        text: 'Amount ($)',
      },
    },
    width:800,
    height:400,
  };


  const spendingData =  [
    { type: 'Income', amount: income },
    { type: 'Expenses', amount: expense },
    { type: 'Balance', amount: totalBalance },
  ];
  
  const pieConfig = {
    data: spendingData,
    width: 400,
    height: 400,
    angleField: 'amount',
    colorField: 'type',
    radius: 0.9,
    label: {
      position: 'spider', 
      content: '{name} ({percentage})',
    },
    tooltip: {
      showTitle: true,
      formatter: (datum) => ({ name: datum.type, value: `$${datum.amount}` }),
    },
    title: {
      visible: true,
      text: 'Spending Distribution by Source',
    },
  };
  

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className=" p-4 rounded-lg shadow-soft font-bold md:w-auto w[250px]">
        <h2 className="text-center text-lg">Line Chart</h2>
        <Bar {...barConfig} />
      </div >
      <div className=" p-4 rounded-lg shadow-soft font-bold items-center w[250px]">
        <h2 className="text-center text-lg">Pie Chart</h2>
        <Pie {...pieConfig} />
      </div>
    </div>
  );
}

export default Chart;
