// import React from 'react';
// import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

// const Services = () => {
//   return (
//     <Container maxWidth="md" style={{ marginTop: '6rem' }}>
//       <Typography variant="h3" gutterBottom>Our Services</Typography>
//       <Grid container spacing={4}>
//         <Grid item xs={12} sm={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>AI Symptom Checker</Typography>
//               <Typography variant="body1">
//                 Our AI-powered Symptom Checker helps you understand your symptoms and provides potential causes.
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>Virtual Consultations</Typography>
//               <Typography variant="body1">
//                 Book virtual consultations with healthcare professionals from the comfort of your home.
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>Health Monitoring Dashboard</Typography>
//               <Typography variant="body1">
//                 Monitor your health metrics in real-time with our comprehensive dashboard.
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>Patient Records</Typography>
//               <Typography variant="body1">
//                 Securely access your medical records anytime, anywhere.
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Services;

import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '6rem' }}>
      <Typography variant="h3" gutterBottom>Our Services</Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Insurance Cost Prediction</Typography>
              <Typography variant="body1" paragraph>
                Estimate your insurance premium based on health and lifestyle data using our machine learning model.
              </Typography>
              <Button variant="outlined" component={Link} to="/insurance">
                Try Insurance Predictor
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>AI Symptom Checker</Typography>
              <Typography variant="body1">
                Our AI-powered Symptom Checker helps you understand your symptoms and provides potential causes.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Virtual Consultations</Typography>
              <Typography variant="body1">
                Book virtual consultations with healthcare professionals from the comfort of your home.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Health Monitoring Dashboard</Typography>
              <Typography variant="body1">
                Monitor your health metrics in real-time with our comprehensive dashboard.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Patient Records</Typography>
              <Typography variant="body1">
                Securely access your medical records anytime, anywhere.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ✅ New Insurance Service Card */}
        {/* <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Insurance Cost Prediction</Typography>
              <Typography variant="body1" paragraph>
                Estimate your insurance premium based on health and lifestyle data using our machine learning model.
              </Typography>
              <Button variant="outlined" component={Link} to="/insurance">
                Try Insurance Predictor
              </Button>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default Services;

