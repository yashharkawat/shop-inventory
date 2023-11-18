import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { actions } from "../../store/index";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const SignInSchema = yup.object().shape({
  email: yup.string().required("email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const getUser = async (email) => {
    const userCollection = collection(db, "shopUsers");
    const data = await getDocs(userCollection);
    const filterData = data.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));
    console.log({ filterData }, 'here');
    const currentUser = filterData.filter((data) => data.email === email)[0];
    console.log({currentUser});
    dispatch(actions.changeCurrentUser(currentUser));
    navigate("/");
  };
  const signInWithEmail = async (values) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      // console.log(values, 'here');
      const confirmUser = user.user;

      getUser(values.email);
      
      // console.log(selector);
    } catch (err) {
      console.log('err');
      setError(err);
    }
  };

  return (
    <div className="login-container">
      <h3 className="login-title">Sign In</h3>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={(values) => {
          signInWithEmail(values);
        }}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <form noValidate onSubmit={handleSubmit} className="login-form">
            <div>
              <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
                placeholder="Enter email"
                className="login-input"
              />

              {touched.email && !!errors.email && (
                <div className="login-error">{errors.email}</div>
              )}
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="current-password"
                placeholder="Enter password"
                className="login-input"
              />
              {touched.password && !!errors.password && (
                <div className="login-error">{errors.password}</div>
              )}
            </div>
            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>
        )}
      </Formik>
      {error && (
        <div className="login-text login-error">
          Incorrect email or password
        </div>
      )}

      {/* <button className="login-button" onClick={signInWithGoogle}>
        Sign in with google
      </button> */}
      <div className="login-text">
        <span>Don't have an account? </span>
        <Link to="/signup" className="signin-link">
          {" "}
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
