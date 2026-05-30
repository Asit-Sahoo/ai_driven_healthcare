import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../pages/UserContext';  // Importing the useUser hook to get user details

const AdminRoute = ({ element }) => {
  const { userDetails } = useUser();  // Access user details from context

  // Fallback to check localStorage if userDetails is not yet available
  const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
  const isAdmin = userDetails?.isAdmin || storedUserDetails?.isAdmin; // Use context or localStorage value

  return isAdmin ? element : <Navigate to="/" />;
};

export default AdminRoute;
