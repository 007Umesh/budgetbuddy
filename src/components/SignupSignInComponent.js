import React from "react";
import { useState } from "react";
import CustomInput from "./CustomInput";
import Button from "./CustomButton";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { db, provider } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
function SignupSignInComponent() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [laoding, setLoading] = useState(false);
  const [isGoogleLoading, setGoogleLoading] = useState(false);
  const [loginForm, setLogin] = useState(false);
  const navigate = useNavigate();

  function changeHandler(evt) {
    const { name, value } = evt.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  //login page handler
  function loginFormHandler() {
    setLoading(true);
    if (formData.email !== "" && formData.password !== "") {
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          toast.success("User login successfully");
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All Fields are required");
      setLoading(false);
    }
  }
  //login using email and password
  function signinHandler() {
    setLoading(true);
    if (
      formData.fullName !== "" &&
      formData.email !== "" &&
      formData.password !== "" &&
      formData.confirmPassword !== ""
    ) {
      if (formData.password === formData.confirmPassword) {
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("fomrData", formData);
            toast.success("user created successfully");
            setLoading(false);
            createDoc(user, formData);
            setFormData("");
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("password and confirm password do not match");
        setLoading(false);
      }
    } else {
      toast.error("All Fields are required");
      setLoading(false);
    }
  }

  /* const [password ,setPassword] = useState(false);
   */
  async function createDoc(user, formData) {
    //make sure the doc with the uid doesn't already exist
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName || formData.fullName || "Anonymous",
          email: user.email,
          photoURL: user.photoURL || "",
          createdAt: new Date(),
        });
      } catch (e) {
        toast.error(e.message);
      }
    } else {
    }
  }

  //login using Gmail handler
  const loginWithgoogle = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createDoc(user);
      //toast.success("User Authenticated Successfully!");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setGoogleLoading(false);
      toast.error(error.message);
      console.error("Error signing in with Google: ", error.message);
    }
  };

  return (
    <>
      {loginForm ? (
        <div
          className="w-[70%] max-w-[450px] border-2 border-purple shadow-card
    h-auto rounded-2xl px-[1rem] py-[1rem]  "
        >
          <div>
            <h2 className="text-center m-0 mt-4 font-medium">
              Login to <span className="text-purple font-bold">BudgetBuddy</span>
            </h2>
            <div className="flex flex-col mb-[0.5rem]">
              <p className="capitalize text-[1rem] font-light pt-3">
                Email<sup>*</sup>
              </p>
              <CustomInput
                type="email"
                placeholder="example@gmail.com"
                name="email"
                value={formData.email}
                onChange={changeHandler}
              />

              <p className="capitalize text-[1rem] font-light pt-3">
                {" "}
                Password<sup>*</sup>
              </p>
              <CustomInput
                /* type={password ? ('text'):('password')} */
                type="text"
                placeholder="Atleast 6 characters"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                /*  togglePassword={true}
            showPassword={()=> setPassword(prev => !prev)} */
              />
              <Button
                disabled={laoding}
                onClick={loginFormHandler}
                text={laoding ? "...laoding" : "Login with email and password"}
              />
              <p className="text-center p-2">OR</p>
              <Button
                disabled={isGoogleLoading}
                onClick={loginWithgoogle}
                blue={true}
                text={isGoogleLoading ? "...laoding" : "login with google"}
              />

              <p className="text-center pt-4 capitalize">
                Or don't have an account?{" "}
                <Link onClick={() => setLogin(!loginForm)}>Click Here</Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="w-[70%] max-w-[450px] 
    h-auto rounded-2xl px-[1rem] py-[1rem] border-2 border-purple shadow-card"
        >
          <div>
            <h2 className="text-center m-0 mt-4 font-medium">
              Sign up on{" "}
              <span className="text-purple font-bold">BudgetBuddy</span>
            </h2>
            <div className="flex flex-col mb-[0.5rem]">
              <p className="capitalize text-[1rem] font-light pt-2">
                Full Name<sup>*</sup>
              </p>
              <CustomInput
                type="text"
                placeholder="enter a full name"
                name="fullName"
                value={formData.fullName}
                onChange={changeHandler}
              />

              <p className="capitalize text-[1rem] font-light pt-3">
                Email<sup>*</sup>
              </p>
              <CustomInput
                type="email"
                placeholder="example@gmail.com"
                name="email"
                value={formData.email}
                onChange={changeHandler}
              />

              <p className="capitalize text-[1rem] font-light pt-3">
                {" "}
                Password<sup>*</sup>
              </p>
              <CustomInput
                /* type={password ? ('text'):('password')} */
                type="text"
                placeholder="Atleast 6 characters"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                /*  togglePassword={true}
            showPassword={()=> setPassword(prev => !prev)} */
              />
              <p className="capitalize text-[1rem] font-light pt-3">
                confirm Password<sup>*</sup>
              </p>
              <CustomInput
                /*  type= {password ? ('text'):('password')} */
                type="text"
                placeholder="Atleast 6 characters"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={changeHandler}
                /*  togglePassword={true}
            showPassword={()=> setPassword(prev => !prev)} */
              />

              <Button
                disabled={laoding}
                onClick={signinHandler}
                text={
                  laoding ? "...laoding" : "sign up with email and password"
                }
              />
              <p className="text-center p-2">OR</p>
              <Button
                disabled={isGoogleLoading}
                onClick={loginWithgoogle}
                blue={true}
                text={isGoogleLoading ? "...laoding" : "sign up with google"}
              />

              <p className="text-center pt-4 capitalize">
                Or have an account already?{" "}
                <Link onClick={() => setLogin(!loginForm)}>Click Here</Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignupSignInComponent;
