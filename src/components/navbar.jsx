import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/books" className="navbar-brand">
          Bookshop <i className="fa fa-film"></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/books" className="nav-link">
                Books
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/favourite-books" className="nav-link">
                Favourite Books
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/admin" className="nav-link">
                Manage Books
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/login" className="nav-link">
                Sign in
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/register" className="nav-link">
                Sign up
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/logout" className="nav-link">
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
