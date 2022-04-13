import React from "react";
import { useState} from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const Passwordshowlogin = ({ handleBlur, handleChange, values, name }) => {
  let [showPass, setshowPass] = useState(false);

  return (
    <>
      <div style={{ position: "relative" }}>
        <input
          type={showPass ? "text" : "password"}
          placeholder="کلمه عبور"
          className="log-input"
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        <span onClick={() => setshowPass(!showPass)}>
          {showPass ? (
            <AiFillEyeInvisible className="icon2" />
          ) : (
            <AiFillEye className="icon2" />
          )}
        </span>
      </div>
    </>
  );
};

export default Passwordshowlogin;
