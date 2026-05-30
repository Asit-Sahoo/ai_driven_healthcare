import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../pages/UserContext";
import { useNavigate } from "react-router-dom";
import API from "../api";


const AdminDashboard = ({ username }) => {
  const [view, setView] = useState("doctor");
  const [showDoctorList, setShowDoctorList] = useState(false);
  const [doctorForm, setDoctorForm] = useState({
    name: "",
    email: "",
    password: "",
    specialize: "",
  });
  const [adminForm, setAdminForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const { logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // axios
      // .get("http://localhost:5000/admin/doctors")
    API.get("/admin/doctors")
      .then((res) => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  const handleChange = (e, formSetter) => {
    const { name, value } = e.target;
    formSetter((prev) => ({ ...prev, [name]: value }));
  };

  const addDoctor = (e) => {
    e.preventDefault();
    // axios
    //   .post("http://localhost:5000/admin/addDoctor", doctorForm)
    API.post("/admin/addDoctor", doctorForm)
      .then((res) => {
        
        setDoctors((prev) => [...prev, res.data]);
        setDoctorForm({ name: "", email: "", password: "", specialize: "" });
        alert("Doctor added successfully!");
      })
      .catch((err) => alert("Error adding doctor:", err));
  };

  const addAdmin = (e) => {
    e.preventDefault();
    // axios
    //   .post("http://localhost:5000/admin/addAdmin", adminForm)
    API.post("/admin/addAdmin", adminForm)
      .then(() => {
        setAdminForm({ username: "", email: "", password: "" });
        alert("Admin added successfully!");
      })
      .catch((err) => alert("Error adding admin:", err));
  };

  const deleteDoctor = (id) => {
    // axios
    //   .delete(`http://localhost:5000/admin/deleteDoctor/${id}`)
    API.delete(`/admin/deleteDoctor/${id}`)
      .then(() => {
        setDoctors((prev) => prev.filter((doctor) => doctor._id !== id));
        alert("Doctor deleted successfully!");
      })
      .catch((err) => alert("Error deleting doctor:", err));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    input: {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
    },
    button: {
      padding: "10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2>Admin Panel</h2>
        <button
          style={{
            ...styles.sidebarButton,
            ...(view === "doctor" ? styles.sidebarButtonActive : {}),
          }}
          onClick={() => setView("doctor")}
        >
          Doctors
        </button>
        <button
          style={{
            ...styles.sidebarButton,
            ...(view === "admin" ? styles.sidebarButtonActive : {}),
          }}
          onClick={() => setView("admin")}
        >
          Add Admin
        </button>
        <button style={styles.sidebarButton} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={styles.content}>
        {view === "doctor" && (
          <div>
            <h2>Doctors</h2>
            <button
              style={styles.button}
              onClick={() => setShowDoctorList(!showDoctorList)}
            >
              {showDoctorList ? "Hide Doctor List" : "Show Doctor List"}
            </button>
            {showDoctorList && (
              <div>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <ul>
                    {doctors.map((doctor) => (
                      <li key={doctor._id}>
                        {doctor.name} ({doctor.specialize})
                        <button onClick={() => deleteDoctor(doctor._id)}>Delete</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <h3>Add Doctor</h3>
            <form onSubmit={addDoctor} style={styles.form}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={doctorForm.name}
                onChange={(e) => handleChange(e, setDoctorForm)}
                style={styles.input}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={doctorForm.email}
                onChange={(e) => handleChange(e, setDoctorForm)}
                style={styles.input}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={doctorForm.password}
                onChange={(e) => handleChange(e, setDoctorForm)}
                style={styles.input}
              />
              <input
                type="text"
                name="specialize"
                placeholder="Specialize"
                value={doctorForm.specialize}
                onChange={(e) => handleChange(e, setDoctorForm)}
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                Add Doctor
              </button>
            </form>
          </div>
        )}

        {view === "admin" && (
          <div>
            <h2>Add Admin</h2>
            <form onSubmit={addAdmin} style={styles.form}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={adminForm.username}
                onChange={(e) => handleChange(e, setAdminForm)}
                style={styles.input}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={adminForm.email}
                onChange={(e) => handleChange(e, setAdminForm)}
                style={styles.input}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={adminForm.password}
                onChange={(e) => handleChange(e, setAdminForm)}
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                Add Admin
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

