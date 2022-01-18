import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



import LoginPage from "./Components/Login/LoginPage.js"

import DashboardPage from "./Components/Dashboard/DashboardPage.js"
import AdminPage from "./Components/Admin/AdminPage.js"



class App extends React.Component 
{
  constructor(props) {
    super(props);
    this.state = {
      User:null,
      IsAdminPage: false,
    };
  }
  render() {
    return <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
        <Route path='/*' element={<LoginPage />} />
      </Routes>
    </Router>
    /*if(this.state.IsAdminPage == false && this.state.User != null){
      return <AdminPage />
    }
    else if(this.state.IsAdminPage){
      return <DashboardPage />
    }
    else{
      return <LoginPage />
    }*/
  }


}

export default App;
