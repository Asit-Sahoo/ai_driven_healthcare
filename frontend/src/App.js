// // import React from "react";
// // import { Routes, Route } from "react-router-dom";
// // import Header from "./components/Header.js";
// // import Footer from "./components/Footer.js";
// // import Home from "./pages/Home.js";
// // import About from "./pages/About.js";
// // import Services from "./pages/Services.js";
// // import Contact from "./pages/Contact.js";
// // import Dashboard from "./components/Dashboard.js";
// // import PatientRecords from "./components/PatientRecords.js";
// // import Chatbot from "./components/Chatbot.js";
// // import Login from "./Login.js"; // Create this component
// // import SignUp from "./SignUp.js";
// // import Additional from "./pages/Additional.js";
// // import { UserProvider } from "./pages/UserContext.js";
// // // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// // function App() {
  
// //   return (
// //     <div>
// //        <UserProvider>
// //       <Header />
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/additional" element={<Additional/>} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/signup" element={<SignUp />} />
// //         <Route path="/about" element={<About />} />
// //         <Route path="/services" element={<Services />} />
// //         <Route path="/contact" element={<Contact />} />
// //         <Route path="/dashboard" element={<Dashboard />} />
// //         <Route path="/records" element={<PatientRecords />} />
// //       </Routes>
      
// //      <Chatbot />
// //        <Footer/>
// //       </UserProvider>
      
// //     </div>
// //   );
// // }

// // export default App;

// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header.js";
// import Footer from "./components/Footer.js";
// import Home from "./pages/Home.js";
// import About from "./pages/About.js";
// import Services from "./pages/Services.js";
// import Contact from "./pages/Contact.js";
// import Dashboard from "./components/Dashboard.js";
// import PatientRecords from "./components/PatientRecords.js";
// import Chatbot from "./components/Chatbot.js";
// import Login from "./Login.js";
// import SignUp from "./SignUp.js";
// import Additional from "./pages/Additional.js";
// import { UserProvider, useUser } from "./pages/UserContext.js";
// import AdminDashboard from './Admin/AdminDashboard';
// import AdminRoute from "./Admin/AdminRoute.js";
// function AppContent() {
//   const { isLoggedIn } = useUser(); // Access login state

//   return (
//     <div>
      
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/additional" element={<Additional />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/records" element={<PatientRecords />} />
//          {/* Protected Route for Admin */}
//          <Route path="/admin-dashboard" element={<AdminRoute element={<AdminDashboard />} />} />

//       </Routes>

//       {/* Conditionally render Chatbot */}
//       {isLoggedIn && <Chatbot />}
//       <Footer />
//     </div>
//   );
// }

// function App() {
//   return (
//     <UserProvider>
//       <AppContent />
//     </UserProvider>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Services from "./pages/Services.js";
import Contact from "./pages/Contact.js";
import Dashboard from "./components/Dashboard.js";
import PatientRecords from "./components/PatientRecords.js";
import Chatbot from "./components/Chatbot.js";
import Login from "./Login.js";
import SignUp from "./SignUp.js";
import Additional from "./pages/Additional.js";
import { UserProvider, useUser } from "./pages/UserContext.js";
import AdminDashboard from './Admin/AdminDashboard';
import AdminRoute from "./Admin/AdminRoute.js";
import DoctorComponent from "./Doctor/DoctorComponent.js";
import DoctorRoute from "./Doctor/DoctorRoute.js";
import ContactDoctor from "./pages/ContactDoctor.js";
import InsurancePage from "./pages/InsurancePage.js";

function AppContent() {
  const { isLoggedIn } = useUser(); // Access login state
  const [isUser, setIsUser] = useState(false); // New state for checking user

  useEffect(() => {
    // Get stored user details from localStorage
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));

    // Check if the user is logged in and if they are not an admin
    if ((storedUserDetails && storedUserDetails.isUser) || !isLoggedIn || useUser.isUser ) {
      setIsUser(true); // Set isUser to true if the user is logged in
    } else {
      setIsUser(false); // Set isUser to false if not logged in
    }
  }, [isLoggedIn]);

  return (
    <div>
      {/* Conditionally render the Header based on isUser */}
      {isUser && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/additional" element={<Additional />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/records" element={<PatientRecords />} />
        <Route path="/ContactDoctor" element={<ContactDoctor/>} />
        {/* Protected Route for Admin */}
        <Route path="/admin-dashboard" element={<AdminRoute element={<AdminDashboard />} />} />
        <Route path="/doctor-dashboard" element={<DoctorRoute element={<DoctorComponent />} />} />
        <Route path="/insurance" element={<InsurancePage />} />

      </Routes>

      {/* Conditionally render Chatbot */}
      {isUser && isLoggedIn && <Chatbot />}
      {/* <Footer /> */}
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;


