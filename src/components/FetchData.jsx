import React, { useState } from 'react';
import axios from 'axios';

const FetchData = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    if (!apiUrl) {
      setError('Please enter a valid API URL.');
      return;
    }

    setError(null); // Clear any previous errors
    setLoading(true);

    try {
      const headers = apiKey
        ? { Authorization: `Bearer ${apiKey}` } // Use the API key if provided
        : {};

      const response = await axios.get(apiUrl, { headers });

      console.log('API Response:', response.data); // Log the API response
      setData(response.data.article || response.data); // Adjust based on API structure
      setLoading(false);
    } catch (error) {
      console.error('Fetch Error:', error);
      if (error.response) {
        setError(
          `Error: ${error.response.status} - ${
            error.response.data.message || 'Something went wrong'
          }`
        );
      } else if (error.request) {
        setError('Error: No response received from the server. Please try again later.');
      } else {
        setError('Error: Failed to fetch data. Please check your network connection.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="fetch-data">
      {/* Input Fields */}
      <div className="input-container">
        <label>
          API URL:
          <input
            type="text"
            placeholder="Enter API URL"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
          />
        </label>
        <label>
          API Key (Optional):
          <input
            type="text"
            placeholder="Enter API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </label>
        <button onClick={handleFetch} disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Data'}
        </button>
      </div>

      {/* Loading State */}
      {loading && <p className="loading">Loading...</p>}

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Data Display */}
      {!loading && !error && data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Active Status</th>
              <th>Automation Running</th>
              <th>Domain</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <a href={item.URL} target="_blank" rel="noopener noreferrer">
                    {item.URL}
                  </a>
                </td>
                <td>{item['Active Status'] ? 'Yes' : 'No'}</td>
                <td>{item.is_automation_running ? 'Yes' : 'No'}</td>
                <td>{item.Domain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* No Data Case */}
      {!loading && !error && data.length === 0 && apiUrl && (
        <p>No data available to display. Check your API response structure.</p>
      )}
    </div>
  );
};

export default FetchData;
