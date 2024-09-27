import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";


import AdminLayout from "layouts/admin";
import LoginAdmin from "views/tg_admin/auth/LoginAdmin";
import ForgotPassword from "views/tg_admin/auth/ForgetPassword";
// import AuthLayout from "layouts/auth";

import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';          // Core CSS
import 'primeicons/primeicons.css';                        // Icons


const App = () => {
  return (
    <Routes>
    
      <Route path="/" element={<LoginAdmin/>} />
      <Route path="/forget-password" element={<ForgotPassword/>} />
      <Route path="admin/*" element={<AdminLayout />} />


        {/* <Route path="auth/*" element={<AuthLayout />} /> */}
      {/* <Route path="rtl/*" element={<RtlLayout />} /> */}
     
    </Routes>
  );
};

export default App;
