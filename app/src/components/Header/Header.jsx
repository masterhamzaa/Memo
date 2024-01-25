import React from "react";
import { useNavigate } from "react-router-dom";
const Header = (props) => {
  const go = useNavigate();
  const logout = async () => {

    const bye = async () => {
      const req = await axios.delete(`https://master-api-62tp.onrender.com/logout/pass/${props.user}`);
      return req.data;
    };

    bye().then((res) => {
      if (!res.err) {
        console.log(res.message)
        localStorage.removeItem("user");
        go("/")
      } else {
        alert(res.err)
      }})
    
  }
  return (
    <div className="container hidr">
      <div className="w3-container w3-pale-green w3-round h">
        <h4
          className="w3-left"
          style={{ textShadow: "1.4px 1px 10 white", paddingTop: 6 }}
        >
          {props.username.toUpperCase()}
        </h4>
        <div className="w3-right" style={{ marginTop: "14px" }}>
          <button
            className="w3-button w3-round w3-white w3-padding-3"
            style={{ marginBottom: 12,transition:"1ms" }}
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              go("/");
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;
