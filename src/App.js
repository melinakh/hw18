import { React, useState, useRef } from "react";
import "./index.css";
import AuthContext from "./AuthContext";
import Register from "./Register";
import Login from "./login";

function App() {
  const [loggedInUsers, setLoggedInUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const colorRef = useRef();
  const colorLog = useRef();
  const handelLogin = () => {
    setIsShow(true);
    colorLog.current.style.backgroundColor = "#198754";
    colorRef.current.style.backgroundColor = "gray";
  };
  const handelRegister = () => {
    setIsShow(false);
    colorRef.current.style.backgroundColor = "#198754";
    colorLog.current.style.backgroundColor = "gray";
  };
  {
    return isLoggedIn ? (
      <button onClick={() => alert("hi Mahyar")}>logOut</button>
    ) : (
      <AuthContext.Provider value={loggedInUsers}>
        <div className="App">
          <div className="btns">
            <button className="main log" onClick={handelLogin} ref={colorLog}>
              ورود
            </button>
            <button className="main" onClick={handelRegister} ref={colorRef}>
              ثبت نام
            </button>
          </div>
          {isShow ? (
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setLoggedInUsers={setLoggedInUsers}
              loggedInUsers={loggedInUsers}
            />
          ) : (
            <Register />
          )}
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
