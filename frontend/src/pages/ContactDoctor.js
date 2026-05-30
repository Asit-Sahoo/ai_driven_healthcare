import React, { useState, useEffect } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box, Card } from "@mui/material";
import axios from "axios";
import { useUser } from "../pages/UserContext.js";
import API from "../api";

const ContactDoctor = () => {
  const [specialization, setSpecialization] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [formData, setFormData] = useState({
    userName: "",
    gender: "",
    age: "",
    symptoms: "",
    phone: "",
    doctorId: "",
    userId: "", // Include userId in formData
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch all doctors
    // axios
    //   .get("http://localhost:5000/doctor/viewdoctor")
    API
      .get("/doctor/viewdoctor")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  // Simulate fetching userId (use actual authentication in production)
  useEffect(() => {
    
    const mockUserId =JSON.parse(localStorage.getItem("userDetails"))?.user.userId;
    setFormData((prevData) => ({ ...prevData, userId: mockUserId }));
  }, []);

  const handleSpecializationChange = (e) => {
    const value = e.target.value;
    setSpecialization(value);
    setFilteredDoctors(
      value
        ? doctors.filter((doctor) => doctor.specialize.toLowerCase().includes(value.toLowerCase()))
        : doctors
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // axios
    //   .post("http://localhost:5000/doctor/submitRequest", formData)
    API
      .post("/doctor/submitRequest", formData)
      .then(() => {
        alert("Request submitted successfully!");
        setFormData({ userName: "", gender: "", age: "", symptoms: "", phone: "", doctorId: "", userId: formData.userId });
        setShowForm(false);
      })
      .catch((err) => console.error("Error submitting request:", err));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Contact a Doctor
      </Typography>

      {/* Specialization Search */}
      <FormControl fullWidth margin="normal">
        <InputLabel style={{ position: "relative", top: "-10px" }}>Search by Specialization</InputLabel>
        <Select value={specialization} onChange={handleSpecializationChange}>
          <MenuItem value="">All</MenuItem>
          {doctors
            .map((doc) => doc.specialize)
            .filter((value, index, self) => self.indexOf(value) === index) // Get unique specializations
            .map((spec, idx) => (
              <MenuItem key={idx} value={spec}>
                {spec}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {/* List of Doctors */}
      <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <Box
              key={doctor._id}
              border={1}
              p={2}
              borderRadius={2}
              width="250px"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Typography variant="body1">
                <strong>Name:</strong> {doctor.name}
              </Typography>
              <Typography variant="body1">
                <strong>Specialization:</strong> {doctor.specialize}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setFormData({ ...formData, doctorId: doctor._id });
                  setShowForm(true);
                }}
              >
                Choose
              </Button>
            </Box>
          ))
        ) : (
          <Typography variant="body1">No doctors found</Typography>
        )}
      </Box>

      {/* Form Modal */}
      {showForm && (
        <>
          {/* Overlay Background */}
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
              zIndex: 1, // To make sure it's below the form card
            }}
            onClick={() => setShowForm(false)} // Close form on background click
          />

          {/* Form Card */}
          <Card
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)", // Center the card
              zIndex: 2, // Higher than the overlay
              maxWidth: "600px",
              width: "100%",
              padding: 3,
            }}
          >
            {/* Custom Close Button */}
            <Button
              style={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={() => setShowForm(false)}
              variant="contained"
              color="secondary"
            >
              Close
            </Button>

            <Typography variant="h6" gutterBottom>
              Fill out the form to contact the doctor
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                name="userName"
                label="Your Name"
                value={formData.userName}
                onChange={handleInputChange}
                required
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select name="gender" value={formData.gender} onChange={handleInputChange} required>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                name="age"
                label="Age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                name="symptoms"
                label="Symptoms / Disease Description"
                multiline
                rows={4}
                value={formData.symptoms}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                name="phone"
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                inputProps={{
                  maxLength: 10,
                  pattern: "\\d{10}",
                  title: "Phone number must be exactly 10 digits."
                }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Book a Call
              </Button>
            </form>
          </Card>
        </>
      )}
    </Box>
  );
};

export default ContactDoctor;



