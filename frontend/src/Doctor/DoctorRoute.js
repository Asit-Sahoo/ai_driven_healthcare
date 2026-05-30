import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../pages/UserContext';  // Importing the useUser hook to get user details

const DoctorRoute = ({ element }) => {
  const { userDetails } = useUser();  // Access user details from context

  // Fallback to check localStorage if userDetails is not yet available
  const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
  const isDoctor = userDetails?.isDoctor || storedUserDetails?.isDoctor; // Use context or localStorage value

  return isDoctor ? element : <Navigate to="/" />;
};

export default DoctorRoute;
