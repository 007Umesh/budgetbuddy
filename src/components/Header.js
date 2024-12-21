import React from "react";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";



function Header({user}) {
 
  const navigate = useNavigate();  

  function logoutHandler() {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Logged out successfully");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error);
        });
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <div
      className="h-screen w-52 bg-white text-white"
    >
      <p
        className="text-purple font-semibold text-xl m-0 tracking-wider text-center pt-6 cursor-pointer "
        onClick={() => navigate("/dashboard")}
      > BudgetBuddy.
      </p>
      {user && (
        <div className="flex items-center gap-6 flex-col justify-between tracking-widest h-[90vh]">
          {/* Add Income Button */}
          <div className="flex  flex-col gap-10 mt-10 "> 
          <button
            className="text-purple font-semibold hover:opacity-80 transition-all duration-300"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <button
            className="text-purple font-semibold hover:opacity-80 transition-all duration-300"
            onClick={() => navigate("/addIncome")}
          >
            Add Income
          </button>

          {/* Add Expense Button */}
          <button
            className="text-purple font-semibold hover:opacity-80 transition-all duration-300"
            onClick={() => navigate("/addExpense")}
          >
            Add Expense
          </button>

          {/* Tables (Links or Navigation) */}
          <button
            className="text-purple font-semibold hover:opacity-80 transition-all duration-300"
            onClick={() => navigate("/records")}
          >
          Records
          </button>
            </div>
          <p
            className=" hover:opacity-[0.8] transition-all duration-[0.3s]
        text-purple font-semibold text-lg m-0 p-4 cursor-pointer"
            onClick={logoutHandler}
          >
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;

