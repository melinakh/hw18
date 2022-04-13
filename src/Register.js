import React from "react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import Passwordshow from "./PasswordShow";
const Register = () => {
  const [showField, setShowFeild] = useState(false);
  const [data, setData] = useState("");

  const myHandleChange = () => {
    setShowFeild(true);
  };

  useEffect(() => {
    axios.get("/city.json").then((res) => setData(res.data));
  }, []);
  const formik = useFormik({
    initialValues: {
      enableReinitialize: true,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      edu: "",
      province: "",
      city: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("لطفا این قسمت را پر کنید"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("لطفا این قسمت را پر کنید"),
      email: Yup.string()
        .email("Invalid email address")
        .required("لطفا این قسمت را پر کنید"),
      password: Yup.string().required("لطفا این قسمت را پر کنید"),
    }),
    onSubmit: (values) => {
      axios.post("http://localhost:3001/profile", {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <h1>رایگان ثبت نام کنید</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="nameParent">
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="نام"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />{" "}
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="error">{formik.errors.firstName}</div>
          ) : null}
          <input
            placeholder="نام خانوداگی"
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />{" "}
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="error">{formik.errors.lastName}</div>
          ) : null}
        </div>
        <div className="maininp">
          <input
            id="email"
            name="email"
            type="email"
            className="email-input"
            placeholder="پست الکترونیکی"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />{" "}
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
          <select onChange={myHandleChange} className="select">
            <option hidden>تحصیلات</option>
            <option value="دیپلم">دیپلم</option>
            <option value="کارشناسی">کارشناسی</option>
            <option value="کارشناسی ارشد">کارشناسی ارشد</option>
          </select>
          {showField ? (
            <input
              type="text"
              className="form-input "
              placeholder="محل تحصیل"
            />
          ) : null}
          {formik.errors.edu && (
            <div className="input-feedback error">{formik.errors.edu}</div>
          )}
          <select
            className="select"
            onChange={formik.handleChange}
            value={formik.values.province}
            name="province"
            style={{ display: "block" }}
          >
            <option hidden>استان</option>
            {Object.keys(data).map((State) => {
              return <option>{State}</option>;
            })}
          </select>
          <select name="city" className="select">
            <option hidden>محل تولد</option>
            {Object.entries(data).map((stateCity) => {
              // console.log(stateCity);
              let ostan = stateCity.splice(0, 1);
              // console.log(ostan);
              stateCity = stateCity[0];
              return stateCity.map(
                (city) =>
                  ostan[0] === formik.values.province && <option>{city}</option>
              );
            })}
          </select>
          <Passwordshow
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            values={formik.values.password}
            name="password"
          />{" "}
          {formik.errors.password && (
            <div className="input-feedback error">{formik.errors.password}</div>
          )}
        </div>
        <button className="my-btn" type="submit">
          ثبت نام
        </button>
      </form>
    </>
  );
};
export default Register;
