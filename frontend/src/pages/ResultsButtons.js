import React from 'react';

const ResultsButtons = ({ onClick }) => {
  const resultTypes = [
    'Disease',
    'Description',
    'Precaution',
    'Medications',
    'Workouts',
    'Diets',
  ];

  return (
    <div style={styles.buttonGroup}>
      {resultTypes.map((type) => (
        <button key={type} onClick={() => onClick(type)} style={styles.resultButton}>
          {type}
        </button>
      ))}
    </div>
  );
};

const styles = {
    resultsSection: {
      textAlign: 'center',
      marginTop: '30px',
      width: '100%',
      maxWidth: '800px',
      flexShrink: 0,
      marginBottom: '20px', // Added margin to avoid overlap with other components
    },
    barChartContainer: {
      marginBottom: '30px', // Adds spacing below the BarChart
      width: '100%',         // Ensure BarChart takes full width within the container
      padding: '0 20px',     // Adds padding to avoid touching edges
      display: 'flex',
      justifyContent: 'center', // Centers BarChart component horizontally
    },
    detailedViewContainer: {
      marginTop: '20px',   // Adds spacing above the DetailedView component
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      width: '100%',
      maxWidth: '800px',
      marginBottom: '20px', // Adds spacing below DetailedView
      display: 'flex',
      flexDirection: 'column', // Ensures content inside DetailedView stays vertical
      justifyContent: 'flexStart',
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'row',   // Arrange buttons horizontally
      gap: '10px',             // Adds gap between buttons
      justifyContent: 'center', // Center buttons horizontally
      marginTop: '20px',      // Adds spacing above the button group
      flexWrap: 'wrap',       // Allows buttons to wrap if screen is narrow
    },
    resultButton: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px 20px',   // Adds horizontal padding for better button width
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      width: 'auto',           // Adjust button width to content
      maxWidth: '200px',       // Set a max width for larger screens
      textAlign: 'center',     // Centers text inside the button
      display: 'inline-block', // Ensures buttons behave like inline elements
    },
  };
  

export default ResultsButtons;
