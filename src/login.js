import React from "react";
import { Formik } from "formik";
import PasswordshowLogin from "./PasswordShowLogin";
import axios from "axios";
import userContext from "./AuthContext";
const Login = ({
  setLoggedInUsers,
  setIsLoggedIn,
  isLoggedIn,
  loggedInUsers,
}) => {
  return (
    <>
      <div className="signin-form parent">
        <h1>خوش آمدید</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "لطفا پست الکترونیکی خود را وارد کنید!";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "پست الکترونیکی وارد شده صحیح نیست";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
            axios.get("http://localhost:3001/profile").then((res) => {
              res.data.map((item) => {
                if (
                  item.email === values.email &&
                  item.password === values.password
                ) {
                  setLoggedInUsers((preveState) => [...preveState, item]);
                  setIsLoggedIn((isLoggedIn = true));
                  loggedInUsers = item;
                }
              });
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="inputs">
                <input
                  className="log-input "
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="پست الکترونیک"
                />
                <p className="error">
                  {errors.email && touched.email && errors.email}
                </p>

                <PasswordshowLogin
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  values={values}
                  name="password"
                />
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
              </div>

              <button className="my-btn" type="submit" disabled={isSubmitting}>
                ورود
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
