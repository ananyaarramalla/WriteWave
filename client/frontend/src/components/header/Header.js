import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../redux/slices/userAuthorSlice";

function Header() {
  let {  loginUserStatus, currentUser } = useSelector(
    (state) => state.userAuthoruserAuthorLoginReducer
  );
  let dispatch = useDispatch();

  function signout(){
    dispatch(resetState())
  }
  return (
    <nav className="navbar navbar-expand-sm" style={{ backgroundColor: "var(--gold)" }}>
      <div className="container-fluid">
        <NavLink className="navbar-brand ms-5" to="/">
          <img src={logo} alt="Logo" width="120px" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {loginUserStatus === false ? (
              <>
                <li className="nav-item">
                <button className="nav-link btn btn-link" style={{ border: 'none'}}>
                    <NavLink className="text" to="">
                      Home
                    </NavLink>
                  </button>
                </li>
                <li className="nav-item ps-3">
                  <button className="nav-link btn btn-link" style={{ border: 'none' }}>
                    <NavLink className="text" to="/about">
                      About
                    </NavLink>
                  </button>
                </li>
                <li className="nav-item ps-3">
                  <button className="nav-link btn btn-link" style={{ border: 'none' }}>
                    <NavLink className="text" to="/signup">
                      SignUp
                    </NavLink>
                  </button>
                </li>
                <li className="nav-item ps-3 me-3">
                  <button className="nav-link btn btn-link" style={{ border: 'none' }}>
                    <NavLink className="text" to="/signin">
                      SignIn
                    </NavLink>
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
               
                <NavLink
                  className="nav-link"
                  to="signin"
                  style={{ color: "var(--light-grey)" }}
                  onClick={signout}
                >
                   <span className="lead  fs-4 me-3 fw-1"  style={{ color: "#C1B9AB" ,fontWeight:'bold',fontSize:'1.3rem',textTransform:'capitalize',fontFamily:'Franklin Gothic Medium'}}>{currentUser.username}
                   <sup style={{color:'#C1B9AB',fontSize:'1rem'}}>({currentUser.userType})</sup>
                   </span>
                  Signout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;