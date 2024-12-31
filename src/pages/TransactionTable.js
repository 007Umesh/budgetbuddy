import { Radio, Select, Table } from "antd";
import React, { useState } from "react";
import Button from "../components/CustomButton";
import { jsonToCSV } from "react-papaparse";
import toast from "react-hot-toast";
import Papa from "papaparse";
import Loader from "../components/Loader";
import { useMediaQuery } from 'react-responsive';

function TransactionTable({ transactions, loading, fields, addTransaction,deleteTransaction }) {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Source of I/E",
      dataIndex: "source",
      key: "source",
    },
    {
      title: 'Edit',
        dataIndex: '',
        key: 'x',
        render: (text, record) => (
          <span
          className="text-red-600 cursor-pointer"
          onClick={() => {
            const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
            if (confirmDelete) {
              deleteTransaction(record.key); // Call the delete function passed as prop
            }
          }}
          >
            Delete
          </span>
        ),
    }
  ];

  let filterTransactions = transactions.filter(
    (item) =>
      (item.name || "Null").toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(filter)
  );
  const sortedTransactions = [...filterTransactions].sort((a, b) => {
    if (sort === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sort === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  const exportCsv = () => {
    if (transactions.length === 0) {
      toast.error("transactions is empty");
    }
    console.log("Transactions to export:", transactions);
    console.log("Fields to export:", fields);
    const csv = jsonToCSV({
      fields: fields,
      data: transactions,
    });
    if (!csv) {
      toast.error("Failed to generate CSV.");
      return;
    }
    const data = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const csvURL = window.URL.createObjectURL(data);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.download = "transactions.csv";
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    console.log(csv);
  };

  const importCsv = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          // Filter out empty or whitespace rows
          const filteredData = results.data.filter((row) => {
            return (
              row.amount?.trim() &&
              row.date?.trim() &&
              row.source?.trim() &&
              row.name?.trim() &&
              row.type?.trim()
            );
          });

          for (const transaction of filteredData) {
            const amount = parseFloat(transaction.amount.trim());
            const date = transaction.date.trim();
            const source = transaction.source.trim();
            const name = transaction.name.trim();
            const type = transaction.type.trim();

            // Check if fields are not empty and proceed
            if (!name || !amount || !date || !source || !type) {
              toast.error("Invalid data in CSV file. All fields are required.");
              return;
            }

            const newTransaction = {
              amount,
              date,
              source,
              name,
              type,
            };

            await addTransaction(newTransaction, true);
          }
          toast.success("All Transactions Added");
          e.target.files = null;
        },
        error: (error) => {
          toast.error(error.message);
        },
      });
    }
  };


  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <div className="flex items-center justify-center h-screen w-full md:mt-0 overflow-hidden">
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <div className="flex flex-col items-center gap-0 md:gap-1 justify-center h-screen  md:h-[80vh] md:p-10 rounded-xl md:shadow-card  md:ml-0 ">
            <h1 className="font-bold text-purple text-lg md:text-2xl tracking-widest">
              My Transactions
            </h1>
            <div className="flex  gap-4 md:gap-10 p-4">
              <div className="flex">
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Search By Name"
                  className="border border-gray-300 
                  rounded-md p-2   
                  focus:outline-none 
                  md:w-fit w-44 h-6 md:h-8
                  capitalize"
                ></input>
              </div>

              <Select
                className="w-fit sm:w-auto"
                onChange={(value) => setFilter(value)}
                value={filter}
                placeholder="Filter"
                allowClear
              >
                <Option value="">All</Option>
                <Option value="incomedetails">Income</Option>
                <Option value="expensedetails">Expense</Option>
              </Select>

              <Radio.Group
                className=""
                onChange={(e) => setSort(e.target.value)}
                value={sort}
              >
                <Radio.Button value="">Default</Radio.Button>
                <Radio.Button value="date">Date</Radio.Button>
                <Radio.Button value="amount">Amount</Radio.Button>
              </Radio.Group>
            </div>

            <div className=" p-3"
             style={{ scrollBehavior: 'smooth' }}>
              <Table
                dataSource={sortedTransactions}
                columns={columns}
                pagination={{ pageSize: 5 }}
                style={isMobile ? { maxWidth:350 } : undefined}
                scroll={isMobile ? { x: 700 } : undefined}
              />
              <div className="flex flex-col md:flex-row justify-center">
                <Button text={"EXPORT TO CSV"} onClick={exportCsv}></Button>
                <label
                  className=" text-center text-[0.9rem] mx-[0.5rem] p-2 border-[1px] rounded-md 
                cursor-pointer h-auto transition duration-500 bg-white text-purple border-theme
                 hover:bg-purple hover:text-white mt-5 capitalize"
                >
                  IMPORT FROM CSV
                  <input
                    type="file"
                    accept=".csv"
                    required
                    onChange={importCsv}
                    className="hidden"
                  ></input>
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TransactionTable;
/*  */
