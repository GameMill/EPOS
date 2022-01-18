import React from "react";


import {
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import { LoadController } from '../Main.js'

import ProductsPage from './Pages/ProductsPage.js'
import DashboardPage from './Pages/DashboardPage.js'


class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    LoadController("Admin")

  }

  render() {
    return <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark" style={{ "maxWidth": "159px" }}>
          <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100" >
            <a class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span class="fs-5 d-none d-sm-inline">Menu</span>
            </a>
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start " id="menu">
              <li class="nav-item ">
                <NavLink className="nav-link align-middle px-0 text-white" to="/Dashboard" >
                  <i class="bi-house" style={{ "fontSize": "25px", "width": "100%" }}></i> <span class="ms-1 d-none d-sm-inline">To Cart</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link align-middle px-0" to="/admin/" >
                  <i class="bi-speedometer2" style={{ "fontSize": "25px" }}></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span>
                </NavLink>
              </li>
              <li>
                <a class="nav-link px-0 align-middle ">
                  <i class="bi-table" style={{ "fontSize": "25px" }}></i> <span class="ms-1 d-none d-sm-inline">Orders</span></a>
              </li>
              <li>
                <a data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
                  <i class="bi-bootstrap" style={{ "fontSize": "25px" }}></i> <span class="ms-1 d-none d-sm-inline">Bootstrap</span></a>
              </li>
              <li>
                <NavLink className="nav-link align-middle px-0" to="/admin/products/" isActive={(match, location) => { console.log(match, location); return match; }} >
                  <i class="bi-grid" style={{ "fontSize": "25px" }}></i> <span class="ms-1 d-none d-sm-inline">Products</span>
                </NavLink>


              </li>
              <li>
                <a class="nav-link px-0 align-middle">
                  <i class="bi-people" style={{ "fontSize": "25px" }}></i> <span class="ms-1 d-none d-sm-inline">Customers</span> </a>
              </li>
            </ul>

            <hr />
            {/*<div class="dropdown pb-4">
              <a class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle" />
                <span class="d-none d-sm-inline mx-1">loser</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                <li><a class="dropdown-item">New project...</a></li>
                <li><a class="dropdown-item">Settings</a></li>
                <li><a class="dropdown-item">Profile</a></li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li><a class="dropdown-item">Sign out</a></li>
              </ul>
            </div>*/}
          </div>
        </div>
        <div class="col py-3">
          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Routes>
            <Route exact path="/" element={<DashboardPage />} />
            <Route path="/products/*" element={<ProductsPage />} />
            <Route path="*" element={<A404 />} />
          </Routes>
        </div>
      </div>
    </div>
  }
}

function About() {
  return <h2>About</h2>
}

function A404() {
  return <h2>_404</h2>
}
export default AdminPage;
