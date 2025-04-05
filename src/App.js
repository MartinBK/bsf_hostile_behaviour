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
    setStatusDescription(data.statuses[status]?.description || '');
    setResult(null);
    setRolledNumber(null);
  };

   /* Fejlhåndtering, som nu vist er lidt ligegyldigt */
  const handleClick = () => {
    if (!selectedObject || !selectedStatus) {
      alert("Please select both a hostile and a status");
      return;
    }

    /* Lav et random tal, som vi også kan gemme til at vise */
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    setRolledNumber(randomNumber);

    const selectedItems = data.objects[selectedObject][selectedStatus].actions;
    const foundAction = selectedItems.find(item => item.numbers.includes(randomNumber));
    const actionDescription = data.actionDescriptions[foundAction?.title] || 'Description not available';

    setResult({
      title: foundAction?.title || 'No result',
      description: actionDescription
    });
  };

  const handleReset = () => {
    setSelectedObject('');
    setSelectedStatus('');
    setStatusDescription('');
    setResult(null);
    setRolledNumber(null);
  };

  const objectOptions = Object.keys(data.objects).map(key => (
    <option key={key} value={key}>{key}</option>
  ));

  const statusOptions = selectedObject
    ? Object.keys(data.objects[selectedObject]).map(key => (
        <option key={key} value={key}>{key}</option>
      ))
    : [];

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <img src={logo} alt="Blackstone Fortress Logo" style={{ width: '200px', marginBottom: '20px' }} />
        
        {/* vælg en hostile */}
        <div>
          <label>
            <select value={selectedObject} onChange={handleObjectChange}>
              <option value="">- Choose hostile -</option>
              {objectOptions}
            </select>
          </label>
        </div>

        {/* vis adfærd hvis en hostile er valgt */}
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

        {/* hvis beskrivelse af adfærd, hvis én er valgt */}
        {statusDescription && (
          <div>
            <p>{statusDescription}</p>
          </div>
        )}

        {/* Hvis random-knappen, hvis der er valgt en adfærd */}
        {selectedStatus && (
          <button onClick={handleClick}>Generate Random Action</button>
        )}

        {/* Hvis resultat og det nummer du kastede med "terningen", hvis der er et resultat */}
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