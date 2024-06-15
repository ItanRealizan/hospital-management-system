import './App.css';
import './assets/style.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './frontend/Home';
import Header from './frontend/includes/Header';
import Login from './frontend/Login';
import Registration from './frontend/Registration';
import Logout from './frontend/Logout';




import HomePage from './components/admin/homepage';
import ManageUserPage from './components/admin/manageuser';
import ManageDoctorPage from './components/admin/managedoctor';



import MyAppointment from './components/doctor/myAppointment';
import Homepagedoctor from './components/doctor/homepageDoctor';
import DoctorPage from './components/doctor/doctorpage';
import MedicalRecords from './components/doctor/medicalrecords';




import Homepagereceptionist from './components/receptionist/homepagereceptionist';
import Appointment from './components/receptionist/appointment';
import ManagePatient from './components/receptionist/managepatient';




import UserPage from './components/user/userpage';
import Homepageuser from './components/user/homepageuser';
import AppointmentDoctor from './components/user/appointmentDoctor';
import MyMedicalRecord from './components/user/mymedicalrecord';

function App() {
  const [cart, setCart] = useState(0);
  let user = JSON.parse(localStorage.getItem('user-info'));
  let userId = user ? user.id : '';

  function userUpdate() {
    user = JSON.parse(localStorage.getItem('user-info'));
    userId = user ? user.id : '';
  }

  useEffect(() => {
    // cartItems();
  }, []);

  async function cartItems() {
    let result = await fetch('http://127.0.0.1:8000/api/cartitem/' + userId);
    result = await result.json();
    setCart(result);
  }

  function emptyCart() {
    setCart(0);
  }

  return (
    <BrowserRouter>
      <Header items={cart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login userUpdate={userUpdate} cartItem={cartItems} />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/logout" element={<Logout />} />


        <Route path="/appointmentDoctor" element={<AppointmentDoctor />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/user" element={<Homepageuser />} />
        <Route path="/mymedicalrecord" element={<MyMedicalRecord />} />

        {/* <Route path="/doctor" element={<DoctorPage />} /> */} eto yung patient ko
        <Route path="/doctor" element={<MyAppointment />} />
        <Route path="/homepagereceptionist" element={<Homepagereceptionist />} />
        <Route path="/receptionist" element={<Homepagereceptionist />} />
        
        <Route path="/managepatient" element={<ManagePatient />} />

        <Route path="/appointment" element={<Appointment />} />
        <Route path="/managedoctor" element={<ManageDoctorPage />} />
        <Route path="/manageuser" element={<ManageUserPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/admin" element={<HomePage />} />

        <Route path="/HomepageDoctor" element={<Homepagedoctor />} />
        <Route path="/doctorpage" element={<DoctorPage />} />
        <Route path="/myAppointment" element={<MyAppointment />} />
        <Route path="/medicalrecords" element={<MedicalRecords />} />


      
        <Route path="/doctorpage" element={<DoctorPage />} />
        <Route path="/myAppointment" element={<MyAppointment />} />
        <Route path="/medicalrecords" element={<MedicalRecords />} />
      

      </Routes>
    </BrowserRouter>
  );
}

export default App;
