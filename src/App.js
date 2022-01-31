import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



import LoginPage from "./Pages/Login/LoginPage.js"

import DashboardPage from "./Pages/Dashboard/DashboardPage.js"
import AdminPage from "./Pages/Admin/AdminPage.js"

import CustomerScreen from "./CustomerScreen.js"

class App extends React.Component 
{

  render() {
    return <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
        <Route path="/customerScreen" element={<CustomerScreen />} />
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
