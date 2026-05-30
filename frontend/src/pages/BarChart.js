import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the required components with Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = ({ data, onClick }) => {
  // Generate random colors for each bar
  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.6)`; // Add transparency
  };

  const chartData = {
    labels: data.map((item) => item.disease),
    datasets: [
      {
        label: 'Probability (%)',
        data: data.map((item) => item.probability * 100),
        backgroundColor: data.map(() => generateRandomColor()), // Generate a unique color for each bar
        borderColor: data.map(() => 'rgba(0, 0, 0, 1)'), // Optional: make borders black
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 40, // Adds extra space below the chart
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Probability (%)',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Diseases',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          autoSkip: false, // Prevents skipping labels
          maxRotation: 0,  // Prevent rotation
          minRotation: 0,  // Prevent rotation
          callback: function (value, index, values) {
            const label = this.getLabelForValue(value);
            // Split the label into multiple lines if it's long
            if (label.length > 20) {
              return label.match(/.{1,20}/g); // Split the label every 20 characters
            }
            return label;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend if unnecessary
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            // Customize tooltip to show full disease name
            const disease = data[context.dataIndex]?.disease || '';
            const probability = context.raw;
            return `${disease}: ${probability.toFixed(2)}%`;
          },
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const selectedDisease = data[index];
        onClick(selectedDisease); // Pass clicked data back to parent
      }
    },
  };

  const styles = {
    chartContainer: {
      width: '100%',
      maxWidth: '800px',
      height: '500px',
      margin: '20px auto',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      backgroundColor: '#fff',
      position: 'relative',
    },
    title: {
      textAlign: 'center',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.chartContainer}>
      <h3 style={styles.title}>Disease Probability Chart</h3>
      <Bar
        data={chartData}
        options={options}
        style={{ cursor: 'pointer' }} // Make bars clickable
      />
    </div>
  );
};

export default BarChart;







