import React from 'react';

const DownloadAnalysis = ({ symptoms, results }) => {
  const downloadTextFile = () => {
    const header = 'Health Prediction Report\n\n';
    const symptomText = `Symptoms: ${symptoms}\n\n`;
    const tableHeader = 'Disease | Probability (%) | Description\n';
    const tableDivider = '-----------------------------------------\n';

    const tableBody = results
      .map(
        (item) =>
          `${item.disease} | ${(item.probability * 100).toFixed(2)} | ${
            item.description || 'No detailed description available'
          }`
      )
      .join('\n');

    const content = header + symptomText + tableHeader + tableDivider + tableBody;

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Health_Analysis_Report.txt';
    link.click();
  };

  return (
    <button onClick={downloadTextFile} style={styles.button}>
      Download Analysis
    </button>
  );
};

const styles = {
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '10px',
    width: '100%',
  },
};

export default DownloadAnalysis;


