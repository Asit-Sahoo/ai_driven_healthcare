import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import axios from "axios";
import API from "../api";

const PatientRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mockUserId = JSON.parse(localStorage.getItem("userDetails"))?.user
    .userId;

  const fetchAppointmentHistory = async () => {
    if (!mockUserId) {
      alert("User ID not found.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // const response = await axios.get(
      //   `http://localhost:5000/doctor/appointment`,
      //   {
      //     params: { userId: mockUserId },
      //   }
      // );
      const response = await API.get(
        `/doctor/appointment`,
        {
          params: { userId: mockUserId },
        }
      );

      // Debugging the response structure
      // console.log("Backend response:", response.data);

      if (response.data && Array.isArray(response.data)) {
        setRecords(response.data); // Set data directly
      } else {
        setRecords([]); // Fallback to empty array if data is invalid
        console.error("Unexpected response structure:", response.data);
      }
    } catch (err) {
      console.error("Error fetching appointment history:", err);
      setError("Failed to fetch appointment history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "6rem" }}>
      <Typography variant="h4" gutterBottom>
        Patient Records
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={fetchAppointmentHistory}
        style={{ marginBottom: "20px" }}
      >
        Show Your Appointment History
      </Button>

      {loading && <Typography>Loading appointments...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <Box mt={2} p={2}>
        {records.length > 0 ? (
          <Grid container spacing={2}>
            {records.map((record, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      Doctor: {record.doctorName}
                    </Typography>
                    <Typography variant="body1">
                      Specialization: {record.doctorSpecialize}
                    </Typography>
                    <Typography variant="body2">
                      Symptoms: {record.symptoms}
                    </Typography>
                    <Typography variant="body2">
                      Prescription: {record.prescription}
                    </Typography>
                    <Typography variant="body2">
                      Diet Precaution: {record.dietPrecaution}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Date: {new Date(record.dateTime).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          !loading && (
            <Typography>
              You haven't taken an appointment yet. Please take one.
            </Typography>
          )
        )}
      </Box>
    </Container>
  );
};

export default PatientRecords;
