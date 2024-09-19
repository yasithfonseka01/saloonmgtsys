import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Login from './components/Login';
import CustomerManage from './components/CustomerManage';
import EmployeeManage from './components/EmployeeManage';
import ServiceManage from './components/ServiceManage';
import AppointmentManage from './components/AppointmentManage';
import './App.css';



const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Main App Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Content />} />
          <Route path="/employee" element={<EmployeeManage />} />
          <Route path="/service" element={<ServiceManage />} />
          <Route path="/appointment" element={<AppointmentManage />} />
          <Route path="/customer" element={<CustomerManage />} />
        </Route>
      </Routes>
    </Router>
  );
};

// Layout component to include Sidebar and Content
const Layout = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='dashboard--content'>
        <Outlet /> {/* Renders the matched child route */}
      </div>
    </div>
  );
};

export default App;
