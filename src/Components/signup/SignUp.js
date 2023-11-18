import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { actions } from "../../store/index";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../../config/firebase";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Enter valid name"),
  phone: yup.string().required("Enter valid phone number"),
  password: yup
    .string()
    .min(6, "password is too small")
    .required("password is required"),
  email: yup.string().required("Enter valid email"),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const addUser = async (user) => {
    const userCollection = collection(db, "shopUsers");
    const data = await addDoc(userCollection, user);

    dispatch(
      actions.changeCurrentUser({ ...user, id: data.id })
    );
  };

  const signIn = async (values) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);

      addUser({ email: values.email, name: values.name, phone: values.phone });
      navigate("/");
      // console.log(auth?.currentUser);
    } catch (err) {
      //setSignedIn(false);
      setError(err);
      //console.log('hello');
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Sign Up</h2>
      <Formik
        initialValues={{ email: "", password: "", name: "", phone: "" }}
        validationSchema={signUpSchema}
        onSubmit={(values) => {
          signIn(values);
        }}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          errors,
          touched,
        }) => (
          <form noValidate onSubmit={handleSubmit} className="form">
            <input
              name="name"
              type="text"
              placeholder="Enter name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input"
            />
            {touched.name && errors.name && (
              <div className="error">{errors.name}</div>
            )}
            <input
              name="phone"
              type="text"
              placeholder="Enter phone number"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input"
            />
            {touched.phone && errors.phone && (
              <div className="error">{errors.phone}</div>
            )}
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input"
            />
            {touched.email && errors.email && (
              <div className="error">{errors.email}</div>
            )}

            <input
              name="password"
              type="password"
              placeholder="Enter password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="input"
            />
            {touched.password && errors.password && (
              <div className="error">{errors.password}</div>
            )}

            <button type="submit" className="login-button">
              Sign up
            </button>
          </form>
        )}
      </Formik>

      {error && (
        <div className="login-text login-error">
          You already have an account
        </div>
      )}
      <div className="login-text">
        <span>Already have an account? </span>
        <Link to="/login" className="signin-link">
          {" "}
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
