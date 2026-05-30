import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../pages/UserContext.js"; // Ensure this provides user data
import axios from "axios";
import API from "../api";

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#007bff",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sidebarButton: {
    backgroundColor: "transparent",
    color: "white",
    border: "none",
    marginBottom: "10px",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
  },
  sidebarButtonActive: {
    backgroundColor: "#0056b3",
  },
  content: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f7f7f7",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    marginBottom: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    position: "relative",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    position: "absolute",
    right: "20px",
    bottom: "20px",
  },
  popup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "30px",
    width: "400px",
    height: "auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    zIndex: 1000,
    fontFamily: "Arial, sans-serif",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  popupHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  popupCloseButton: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#333",
  },
  popupTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
  },
  textarea: {
    width: "100%",
    marginBottom: "15px",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    resize: "none",
    height: "100px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  submitButton: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userDetails, logout } = useUser();
  const [activeTab, setActiveTab] = useState("requests");
  const [userRequests, setUserRequests] = useState([]);
  const [prescribedRequests, setPrescribedRequests] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [prescription, setPrescription] = useState("");
  const [precaution, setPrecaution] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const doctorId =
          userDetails?.user.userId || JSON.parse(localStorage.getItem("userDetails"))?.user.userId;
        // const response = await axios.get(`http://localhost:5000/doctor/requests/${doctorId}`);
        const response = await API.get(`/doctor/requests/${doctorId}`);
        setUserRequests(response.data.requests || []);
      } catch (error) {
       // console.error("Error fetching user requests:", error);
       
      }
    };

    const fetchPrescribedRequests = async () => {
      try {
        const doctorId =
          userDetails?.user.userId || JSON.parse(localStorage.getItem("userDetails"))?.user.userId;
        // const response = await axios.get(`http://localhost:5000/doctor/donerequests/${doctorId}`);
        const response = await API.get(`/doctor/donerequests/${doctorId}`);
        setPrescribedRequests(response.data.requests || []);
      } catch (error) {
       // console.error("Error fetching prescribed requests:", error);
        alert("Failed to load prescribed requests. Please try again.");
      }
    };

    fetchRequests();
    fetchPrescribedRequests();
  }, [activeTab]); // Fetch data when the active tab changes

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("userDetails");
      alert("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      //console.error("Error during logout:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  const handlePrescribe = (request) => {
    setCurrentRequest(request);
    setShowPopup(true);
  };

  const handleSubmit = async () => {
    if (!prescription || !precaution) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const doctorId = userDetails?.user.userId || JSON.parse(localStorage.getItem("userDetails"))?.user.userId;

      // Optimistically update the UI by removing the current request from the userRequests list
      const updatedUserRequests = userRequests.filter((req) => req.userId !== currentRequest.userId);
      setUserRequests(updatedUserRequests);

      // Add the request to the prescribed list
      const newPrescribedRequest = {
        userId: currentRequest.userId,
        userName: currentRequest.userName,
        gender: currentRequest.gender,
        age: currentRequest.age,
        symptoms: currentRequest.symptoms,
        phone: currentRequest.phone,
        prescription,
        dietPrecaution: precaution,
        lastPrescribedDate: new Date(),
      };
      setPrescribedRequests((prevRequests) => [...prevRequests, newPrescribedRequest]);

      // Make the API call to save the prescription
      console.log(currentRequest.symptoms);
      // await axios.post(`http://localhost:5000/doctor/prescribe`
      await API.post(`/doctor/prescribe`,{
        userId: currentRequest.userId,
        doctorId,
        symptoms: currentRequest.symptoms,
        prescription,
        precaution,
      });

      alert("Successfully prescribed!");
      setShowPopup(false);
      setPrescription("");
      setPrecaution("");
    } catch (error) {
      //console.error("Error submitting prescription:", error);
      alert("Failed to submit prescription. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2>Doctor Dashboard</h2>
        <button
          style={{
            ...styles.sidebarButton,
            ...(activeTab === "requests" ? styles.sidebarButtonActive : {}),
          }}
          onClick={() => setActiveTab("requests")}
        >
          User Requests
        </button>
        <button
          style={{
            ...styles.sidebarButton,
            ...(activeTab === "prescribed" ? styles.sidebarButtonActive : {}),
          }}
          onClick={() => setActiveTab("prescribed")}
        >
          Prescribed Requests
        </button>
        <button style={styles.sidebarButton} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={styles.content}>
        {activeTab === "requests" && (
          <div>
            <h1>User Requests</h1>
            {userRequests.length > 0 ? (
              userRequests.map((req, index) => (
                <div key={index} style={styles.card}>
                  <p><strong>Name:</strong> {req.userName}</p>
                  <p><strong>Gender:</strong> {req.gender}</p>
                  <p><strong>Age:</strong> {req.age}</p>
                  <p><strong>Symptoms:</strong> {req.symptoms}</p>
                  <p><strong>Phone:</strong> {req.phone}</p>
                  <p><strong>Requested At:</strong> {new Date(req.createdAt).toLocaleString()}</p>
                  <button style={styles.button} onClick={() => handlePrescribe(req)}>
                    Prescribe
                  </button>
                </div>
              ))
            ) : (
              <p>No user requests found.</p>
            )}
          </div>
        )}

        {activeTab === "prescribed" && (
          <div>
            <h1>Prescribed Requests</h1>
            {prescribedRequests.length > 0 ? (
              prescribedRequests.map((req, index) => (
                <div key={index} style={styles.card}>
                  <p><strong>Name:</strong> {req.userName}</p>
                  <p><strong>Gender:</strong> {req.gender}</p>
                  <p><strong>Age:</strong> {req.age}</p>
                  <p><strong>Symptoms:</strong> {req.symptoms}</p>
                  <p><strong>Phone:</strong> {req.phone}</p>
                  <p><strong>Prescription:</strong> {req.prescription}</p>
                  <p><strong>Diet Precaution:</strong> {req.dietPrecaution}</p>
                  <p><strong>Last Prescribed Date:</strong> {new Date(req.lastPrescribedDate).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No prescribed requests found.</p>
            )}
          </div>
        )}
      </div>

      {showPopup && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <div style={styles.popupHeader}>
              <h2 style={styles.popupTitle}>Prescribe Medication</h2>
              <button style={styles.popupCloseButton} onClick={() => setShowPopup(false)}>
                &times;
              </button>
            </div>
            <textarea
              style={styles.textarea}
              placeholder="Enter prescription..."
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
            />
            <textarea
              style={styles.textarea}
              placeholder="Enter diet precaution..."
              value={precaution}
              onChange={(e) => setPrecaution(e.target.value)}
            />
            <div style={styles.buttonContainer}>
              <button style={styles.submitButton} onClick={handleSubmit}>
                Submit Prescription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;


