import React from 'react';

const DetailedView = ({ disease, resultType }) => {
  if (!resultType) return null;

  const renderContent = () => {
    switch (resultType) {
      case 'Disease':
        return <p>{disease.disease}</p>;
      case 'Description':
        return <p>{disease.description}</p>;
      case 'Precaution':
        return (
          <ul style={styles.list}>
            {disease.precautions.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        );
      case 'Medications':
        return (
          <ul style={styles.list}>
            {disease.medications[0].split(', ').map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        );
      case 'Workouts':
        return (
          <ul style={styles.list}>
            {disease.workout.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        );
      case 'Diets':
        return (
          <ul style={styles.list}>
            {disease.diets[0].split(', ').map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.detailedView}>
      {renderContent()}
      <div style={styles.buttonGroup}>
        {/* Example Button, you can add more actions or functionality */}
       
      </div>
    </div>
  );
};


const styles = {
  detailedView: {
    marginTop: '20px',
    padding: '20px', // Increased padding for spacing
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    width: '100%',
    maxWidth: '800px', // Keeps the detailed view within a reasonable width
    marginBottom: '20px', // Adds space after the detailed view
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle shadow
    overflow: 'auto', // Ensures long content is scrollable instead of overflowing
    textAlign: 'center', // Ensures text aligns properly
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    marginTop: '10px',
    fontSize: '16px',
    lineHeight: '1.5', // Improves readability of list items
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row', // Align buttons horizontally
    flexWrap: 'wrap', // Ensure buttons wrap if they overflow
    gap: '10px',
    marginTop: '15px', // Adds space above the button group
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    flex: '1', // Make the button adjust to the container width
    minWidth: '120px', // Ensures buttons don’t shrink too much
    textAlign: 'center', // Centers the text inside buttons
  },
};


export default DetailedView;



