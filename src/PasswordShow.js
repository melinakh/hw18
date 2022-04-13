import React from "react";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const Passwordshow = ({ handleBlur, handleChange, values, name }) => {
  let [showPass, setshowPass] = useState(false);

  return (
    <>
      <div style={{ position: "relative" }}>
        <input
          type={showPass ? "text" : "password"}
          placeholder="کلمه عبور"
          className="inp passinp form-input"
          onBlur={handleBlur}
          onChange={handleChange}
          name={name}
          value={values}
        />

        <span className="icon" onClick={() => setshowPass(!showPass)}>
          {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
      </div>
    </>
  );
};

export default Passwordshow;
