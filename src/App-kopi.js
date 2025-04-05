import React, { useState } from "react";
import './App.css';
import data from './data.json';
import background from './assets/baggrund.jpg';
import logo from './assets/logo.png';

function App() {
  const [selectedObject, setSelectedObject] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [statusDescription, setStatusDescription] = useState('');
  const [result, setResult] = useState(null);
  const [rolledNumber, setRolledNumber] = useState(null);

  const handleObjectChange = (e) => {
    setSelectedObject(e.target.value);
    setSelectedStatus('');
    setStatusDescription('');
    setResult(null);
    setRolledNumber(null);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    setStatusDescription(data[selectedObject][status]?.description || '');
    setResult(null);
    setRolledNumber(null);
  };

  const handleClick = () => {
    if (!selectedObject || !selectedStatus) {
      alert("Please select both an object and a status");
      return;
    }

    const randomNumber = Math.floor(Math.random() * 20) + 1;
    setRolledNumber(randomNumber);

    const selectedItems = data[selectedObject][selectedStatus].actions;
    const foundItem = selectedItems.find(item => item.numbers.includes(randomNumber));
    setResult(foundItem || { title: 'No result', description: 'No description available' });
  };

  const handleReset = () => {
    setSelectedObject('');
    setSelectedStatus('');
    setStatusDescription('');
    setResult(null);
    setRolledNumber(null);
  };

  const objectOptions = Object.keys(data).map(key => (
    <option key={key} value={key}>{key}</option>
  ));

  const statusOptions = selectedObject
    ? Object.keys(data[selectedObject]).map(key => (
        <option key={key} value={key}>{key}</option>
      ))
    : [];

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <img src={logo} alt="Blackstone Fortress Logo" style={{ width: '200px', marginBottom: '20px' }} />
        
        {/* Select Object */}
        <div>
          <label>
            <select value={selectedObject} onChange={handleObjectChange}>
              <option value="">- Choose hostile -</option>
              {objectOptions}
            </select>
          </label>
        </div>

        {/* Conditionally render Select Status if an object is selected */}
        {selectedObject && (
          <div>
            <label>
              <select value={selectedStatus} onChange={handleStatusChange}>
                <option value="">- Behaviour -</option>
                {statusOptions}
              </select>
            </label>
          </div>
        )}

        {/* Display status description if a status is selected */}
        {statusDescription && (
          <div>
            <p>{statusDescription}</p>
          </div>
        )}

        {/* Conditionally render Generate Random Action button if a status is selected */}
        {selectedStatus && (
          <button onClick={handleClick}>Generate Random Action</button>
        )}

        {/* Display result and rolled number only if result is set */}
        {result && (
          <div>
            <p>You rolled {rolledNumber}</p>
            <h3>{result.title}</h3>
            <p>{result.description}</p>
          </div>
        )}

        <button onClick={handleReset} style={{ marginTop: '20px' }}>Reset</button>
      </header>
    </div>
  );
}

export default App;