import React from "react";


import {
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import { LoadController, SendToServer } from '../../GlobalFunctions.js'

import ProductsPage from './Pages/ProductsPage.js'
import DashboardPage from './Pages/DashboardPage.js'
import OrdersPage from './Pages/OrdersPage.js'
import AccountsPage from './Pages/AccountsPage.js'
import SettingsPage from './Pages/SettingsPage.js'

import InnerHTML from 'dangerously-set-html-content'

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ExtraURLs:[]
    };
    LoadController("Admin")
  }

  render() {
    return <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark" style={{ "maxWidth": "159px" }}>
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100" >
            <a className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-5 d-none d-sm-inline">Menu</span>
            </a>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start " id="menu">
              <li className="nav-item ">
                <NavLink className="nav-link align-middle px-0 text-white" to="/Dashboard" >
                  <i className="bi-house" style={{ "fontSize": "25px", "width": "100%" }}></i> <span className="ms-1 d-none d-sm-inline">To Cart</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link align-middle px-0" to="/admin/" >
                  <i className="bi-speedometer2" style={{ "fontSize": "25px" }}></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link align-middle px-0" to="/admin/orders/">
                  <i className="bi-table" style={{ "fontSize": "25px" }}></i> <span className="ms-1 d-none d-sm-inline">Orders</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link align-middle px-0" to="/admin/products/">
                  <i className="bi-grid" style={{ "fontSize": "25px" }}></i> <span className="ms-1 d-none d-sm-inline">Products</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link align-middle px-0" to="/admin/account/">
                  <i className="bi-archive-fill" style={{ "fontSize": "25px" }}></i> <span className="ms-1 d-none d-sm-inline">Account</span>
                </NavLink>
              </li>
              <li>
                <a className="nav-link px-0 align-middle">
                  <i className="bi-people" style={{ "fontSize": "25px" }}></i> <span className="ms-1 d-none d-sm-inline">Customers</span> </a>
              </li>

              <li>
                <button className="nav-link px-0 align-middle" onClick={() => SendToServer("ResetPage", null)}>
                  <i className="fas fa-sync" style={{ "fontSize": "25px" }}></i> <span className="ms-1 d-none d-sm-inline">Reset</span>
                </button>
              </li>
              <li>
                <NavLink className="nav-link align-middle px-0" to="/admin/settings/">
                  <i className="bi-archive-fill" style={{ "fontSize": "25px" }}></i> <span className="ms-1 d-none d-sm-inline">Settings</span>
                </NavLink>
              </li>
              <li>
                <button className="nav-link px-0 align-middle" onClick={() => SendToServer("exit", null)}>
                  <i className="fas fa-door-open" style={{ "fontSize": "25px" }}></i> <span className="ms-1 d-none d-sm-inline">Exit</span>
                </button>
              </li>
              <li>
                <button className="nav-link px-0 align-middle" onClick={() => SendToServer("test", null)}>
                  <i className="fas fa-door-open" style={{ "fontSize": "25px" }}></i> <span className="ms-1 d-none d-sm-inline">Test</span>
                </button>
              </li>


            </ul>

            {/*<div className="dropdown pb-4">
              <a className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                <span className="d-none d-sm-inline mx-1">loser</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                <li><a className="dropdown-item">New project...</a></li>
                <li><a className="dropdown-item">Settings</a></li>
                <li><a className="dropdown-item">Profile</a></li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li><a className="dropdown-item">Sign out</a></li>
              </ul>
            </div>*/}
          </div>
        </div>
        <div className="col py-3">
          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Routes>
            <Route exact path="/" element={<DashboardPage />} />
            <Route path="/products/*" element={<ProductsPage />} />
            <Route path="/orders/*" element={<OrdersPage />} />
            <Route path="/account/*" element={<AccountsPage />} />
            <Route path="/settings/*" element={<SettingsPage />} />
            <Route path="*" element={<A404 />} />
          </Routes>
          <CustomPage html='<h1>Hello world</h1><script>console.log(this);alert("Hello! I am an alert box!!");</script>' />
        </div>
      </div>
    </div>
  }
}

function CustomPage(props) {
  return <InnerHTML html={props.html} />;
}

function About() {
  return <h2>About</h2>
}

function A404() {
  return <h2>_404</h2>
}
export default AdminPage;
