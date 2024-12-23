import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignupSignIn from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TransactionTable from "./pages/TransactionTable";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./Firebase";
import toast from "react-hot-toast";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import AddIncome from "./pages/AddIncome";
import AddExpense from "./pages/AddExpense";
import Header from "./components/Header";
import { useLocation } from "react-router-dom";

function App() {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, settotalBalance] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [fields , setField] =useState([])
  const [imported, setImported] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    // Hide header if the current path is "/"
    setShowHeader(location.pathname !== "/");
  }, [location]);

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      name: values.name,
      source: values.source,
    };

    addTransaction(newTransaction);
  };

  async function addTransaction(transaction,disableToast = false) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with id:", docRef.id);
      if (!imported && !disableToast) {
        toast.success("transaction added successfully");
        setImported(true); 
      }
      setTransactions((prevTransactions) => [...prevTransactions, transaction]);
      calculatBalance();
    } catch (err) {
      console.error("error in adding a transaction", err);
      toast.error("couldn't add a transaction");
    }
  }

  useEffect(() => {
    async function fetchTransaction() {
      setLoading(true);
      if (user) {
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnapshot = await getDocs(q);
        let transactionsArray = [];
        let fieldArray =[];

        querySnapshot.forEach((doc) => {
          /* transactionsArray.push(doc.data()); */
          const transaction = { ...doc.data(), key: doc.id }; 
          transactionsArray.push(transaction);
          if(fieldArray.length === 0){
            fieldArray = Object.keys(doc.data());
          }
        });
        setTransactions(transactionsArray);
        setField(fieldArray);
        toast.success("transactions Fetched!");
      }
      setLoading(false);
    }
    fetchTransaction();
  }, [user]); // Fetch transactions when user is defined

  function calculatBalance() {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "incomedetails") {
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    settotalBalance(incomeTotal - expenseTotal);
  }

  useEffect(() => {
    calculatBalance();
  }, [transactions]);

  
 
  return (
    <div className=" relative md:flex w-screen h-screen">
      {showHeader && (
        <div className="hidden md:flex">
          <Header user={user}/>
        </div>
      )}
      {
        showHeader && !isHeaderVisible &&(
          <button
          className="fixed top-3 left-4 z-50 bg-purple-600 text-purple p-2 rounded-md shadow-md md:hidden bg-glass"
          onClick={() => setIsHeaderVisible(true)}
        >
          ☰
        </button>
       )}
       {showHeader && isHeaderVisible && (
        <div className="fixed top-0 left-0 w-52 h-full bg-black z-40 md:hidden">
          <Header user={user} />
          <button
            className="absolute top-4 right-4 text-black font-bold"
            onClick={() => setIsHeaderVisible(false)}
          >
            ✕
          </button>
        </div>
      )}
      <div className="md:flex w-screen h-screen md:w-full md:h-full">
        <Routes>
          <Route path="/" element={!user ? <SignupSignIn /> : <Navigate to="/dashboard"/>} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                loading={loading}
                income={income}
                expense={expense}
                totalBalance={totalBalance}
                transactions={transactions}
              />
            }
          />
          <Route
            path="/records"
            element={
              <TransactionTable transactions={transactions} loading={loading} fields={fields} addTransaction={addTransaction} />
            }
          />
          <Route
            path="/addIncome"
            element={<AddIncome onFinish={onFinish} />}
          />
          <Route
            path="/addExpense"
            element={<AddExpense onFinish={onFinish} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
