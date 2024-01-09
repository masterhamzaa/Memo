import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Swal from 'sweetalert2';

export default function Login() {
  const [load, setLoad] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  //Navigation
  const go = useNavigate();


  useEffect(() => {
    setLoad(false)
    const Boot = async () => {
      const req = await axios.get("https://master-api-62tp.onrender.com/msg");
      return req.data;
    };
    Boot().then((data) => {
      if (data.message) { setLoad(true) } else setLoad(false)
    });
    setLoad(true)
    // eslint-disable-next-line
  }, [load])


  //Login Process
  function onLogin(e) {
    e.preventDefault();
    const transfert = async () => {
      const req = await axios.post("https://master-api-62tp.onrender.com/login", data);
      return req.data;
    };

    transfert().then((res) => {

      if (!res.err) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userid", data.email);
        go("/Postits")
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email or Password invalid !',
        })
      }
    });
  }
  return (
    <>

          <div className="container">
            <div className="w3-container w3-pale-green w3-round h">
              <h4
                className="w3-left"
                style={{ textShadow: "1.4px 1px 10 white", paddingTop: 6 }}
              >
                P O S T I T
              </h4>
              <div className="w3-right" style={{ marginTop: "14px" }}>
                <Link to="/Signup" style={{ textDecoration: "none" }}>
                  <button
                    className="w3-button w3-round w3-white w3-padding-3"
                    style={{ marginBottom: 12 }}
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>

            <div className="containerr">
              <div className="wrapper">
              {!load && <div style={{ marginTop: "30px" }} id="loader"></div>}
                {load && <>
                  <form method="post" onSubmit={onLogin}>
                  <div className="row">
                    <i className="fas fa-user"></i>
                    <input
                      className="w3-input formControl__input"
                      name="email"
                      id="email"
                      type="email"
                      autoFocus
                      placeholder="hamza404@example.com"
                      onChange={(e) => {
                        setData({ ...data, [e.target.name]: e.target.value });
                      }}
                      required
                    />
                  </div>
                  <div className="row">
                    <i className="fas fa-lock"></i>
                    <input
                      className="w3-input formControl__input"
                      name="password"
                      id="password"
                      type="password"
                      placeholder="*********"
                      onChange={(e) => {
                        setData({ ...data, [e.target.name]: e.target.value });
                      }}
                      required
                    />
                  </div>

                  <div className="row button">
                    <button style={{ padding: "5px 30px 5px 30px", borderRadius: "8px" }} className="w3-btn w3-blue" formMethod="post" type="submit">
                      Login
                    </button>
                  </div>
                </form>
                </>}
              </div>
            </div>
          </div>
        </>
   
  );
}
