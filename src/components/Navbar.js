import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const history = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('token')
    history('/login');
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" href="#">
          SmartNote
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ?"active":""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/add" ?"active":""}`} to="/add">
                Add
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token')?<form className="d-flex" role="search">
            <Link className="btn btn-warning mx-2" to="/Login" role="button">Login</Link>
            <Link className="btn btn-outline-warning" to="/Signup" role="button">SignUp</Link>
          </form>:  <button className="btn btn-outline-warning" onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
