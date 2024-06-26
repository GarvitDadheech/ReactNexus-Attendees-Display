import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [attendees, setAttendees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState('');

  useEffect(() => {
    fetch('/attendees.json')
      .then(response => response.json())
      .then(data => setAttendees(data))
      .catch(error => console.error('Error fetching attendees:', error));
  }, []);

  const filteredAttendees = attendees.filter(attendee => 
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    attendee.company.toLowerCase().includes(filterCompany.toLowerCase())
  );

  return (
    <div className="App">
      <h1>ReactNexus Attendees</h1>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {/* Filter by Company */}
      <input
        type="text"
        placeholder="Filter by company..."
        value={filterCompany}
        onChange={e => setFilterCompany(e.target.value)}
      />
      {/* Attendee List */}
      <ul>
        {filteredAttendees.map((attendee, index) => (
          <li key={index}>
            <h2>{attendee.name}</h2>
            <p>Age: {attendee.age}</p>
            <p>Company: {attendee.company}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
