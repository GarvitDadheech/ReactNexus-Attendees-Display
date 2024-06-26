import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [attendees, setAttendees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetch('/attendees.json')
      .then(response => response.json())
      .then(data => setAttendees(data))
      .catch(error => console.error('Error fetching attendees:', error));
  }, []);


  const sortedAttendees = [...attendees].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredAttendees = sortedAttendees.filter(attendee => 
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    attendee.company.toLowerCase().includes(filterCompany.toLowerCase())
  );

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className="App">
      <h1>ReactNexus Attendees</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by company..."
        value={filterCompany}
        onChange={e => setFilterCompany(e.target.value)}
      />
      <div className="sort-buttons">
        <button onClick={() => handleSort('name')}>Sort by Name</button>
        <button onClick={() => handleSort('age')}>Sort by Age</button>
        <button onClick={() => handleSort('company')}>Sort by Company</button>
      </div>
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
