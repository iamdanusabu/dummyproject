import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CustomerItemManagement from './components/CustomerItemManagement';
import TransactionList from './components/TransactionList';
import TransactionDetail from './components/TransactionDetail';
import StatusManagement from './components/StatusManagement';
import Billing from './components/Billing';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customer-item" element={<CustomerItemManagement />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/transaction/:id" element={<TransactionDetail />} />
          <Route path="/status-management" element={<StatusManagement />} />
          <Route path="/billing/:id" element={<Billing />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
