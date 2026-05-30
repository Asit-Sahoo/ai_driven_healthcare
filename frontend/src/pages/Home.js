import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import SymptomDropdown from './SymptomDropdown';
import axios from 'axios';
import Footer from '../components/Footer';
import BarChart from './BarChart'; // Import BarChart component
import ResultsButtons from './ResultsButtons'; // Import ResultsButtons component
import DetailedView from './DetailedView'; // Import DetailedView component
import Loader from './Loader'; // Import Loader (if used)
import DownloadAnalysis from './DownloadAnalysis';
import API from '../api'; // adjust path if needed

const Home = () => {
  const { isLoggedIn,userEmail } = useUser();
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState('');
  const [results, setResults] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [selectedResultType, setSelectedResultType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please log in to predict.');
      navigate('/login');
      return;
    }
    if (!symptoms.trim()) {
      alert('Please enter symptoms before predicting.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      console.log(userEmail);
      const response = await API.post('/api/general', {
        symptoms,
        email: userEmail,
      });

      console.log(response.data);
      setResults(response.data);
      setSelectedDisease(null);
      setSelectedResultType(null);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setError('An error occurred while fetching predictions.');
    } finally {
      setLoading(false);
    }
  };

  


  const handleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
  
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false; // Only get final results
    recognition.maxAlternatives = 1;
  
    recognition.onstart = () => {
      setIsListening(true);
      console.log('Speech recognition started');
    };
  
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript.trim();
      console.log('Speech recognized:', speechResult);
  
      setSymptoms((prevSymptoms) => 
        prevSymptoms.trim() ? `${prevSymptoms}, ${speechResult}` : speechResult
      );
    };
  
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      alert('Speech recognition error: ' + event.error);
      setIsListening(false);
    };
  
    recognition.onend = () => {
      console.log('Speech recognition ended');
      setIsListening(false);
    };
  
    recognition.start();
  };
  

  const handleClear = () => {
    setSymptoms('');
    setResults([]);
    setSelectedDisease(null);
    setSelectedResultType(null);
  };

  // Define handleDiseaseSelection
  const handleDiseaseSelection = (disease) => {
    setSelectedDisease(disease);
    setSelectedResultType(null);
  };

  // Define handleResultTypeSelection
  const handleResultTypeSelection = (resultType) => {
    if (!selectedDisease) {
      alert('Please select a disease from the chart first.');
      return;
    }
    setSelectedResultType(resultType);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        <div style={styles.mainSection}>
          <h1 style={styles.header}>Health Care Center</h1>
          <div style={styles.card}>
            {/* <SymptomDropdown setSymptoms={setSymptoms} /> */}
            <input
              type="text"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Enter symptoms..."
              style={styles.input}
            />
            <div style={styles.buttonGroup}>
              <button
                onClick={handleSpeechRecognition}
                style={styles.button}
                disabled={isListening}
              >
                {isListening ? 'Listening...' : 'Start Speech Recognition'}
              </button>
              <button
                style={styles.button}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <Loader /> : 'Predict'}
              </button>
              {results.length > 0 && (
                <DownloadAnalysis symptoms={symptoms} results={results} />
              )}
              <button style={styles.button} onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </div>
  <div style={styles.resultsSection}>
  {results.length > 0 && (
    <div style={styles.barChartContainer}>
      <BarChart data={results} onClick={handleDiseaseSelection} />
    </div>
  )}
  {error && <p style={styles.errorText}>{error}</p>}

  {selectedDisease && (
    <>
      <ResultsButtons onClick={handleResultTypeSelection} />
      <div style={styles.detailedViewContainer}>
        <DetailedView
          disease={selectedDisease}
          resultType={selectedResultType}
        />
      </div>
    </>
  )}
</div>

      </div>
      <Footer/>
    </div>
    
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    marginTop: '64px',
  },
  contentWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  mainSection: {
  
    display: 'flex',
    flexDirection: 'column',
    marginLeft:'45px',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '800px',
    flex: 1,
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
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
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
  },
  resultsSection: {
    textAlign: 'center',
    marginTop: '30px',
    width: '100%',
    maxWidth: '800px',
    flexShrink: 0,
    marginBottom: '20px',  // Added margin to avoid overlap with other components
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  barChartContainer: {
    marginBottom: '60px',  // Adds spacing below the BarChart component
  },
  detailedViewContainer: {
    marginTop: '20px',     // Adds spacing above the DetailedView component
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
};

export default Home;










