import React, { useState, useEffect } from 'react';
import './App.css';
import { FaHeart } from 'react-icons/fa';


function App() {
  const [attendees, setAttendees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [companyOptions, setCompanyOptions] = useState([]);

  useEffect(() => {
    fetch('/attendees.json')
      .then(response => response.json())
      .then(data => {
        setAttendees(data);
        const companies = data.map(attendee => attendee.company);
        const uniqueCompanies = [...new Set(companies)];
        setCompanyOptions(uniqueCompanies);
      })
      .catch(error => console.error('Error fetching attendees:', error));
  }, []);

  const sortedAttendees = [...attendees].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredAttendees = sortedAttendees.filter(attendee => 
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCompany === '' || attendee.company === filterCompany)
  );

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleFilterCompany = (e) => {
    setFilterCompany(e.target.value);
  };

  return (
    
    <div className="App">
     
      <div className='nav-bar'>
        <dotlottie-player src="https://lottie.host/e91ec6ca-28eb-4ff6-afd6-89609dc8ba8c/VONcoIIQ0r.json" background="transparent" speed="1" style={{ width: '100px', height: '100px' }} loop autoplay></dotlottie-player>
        <h1>ReactNexus Attendees</h1>
        <dotlottie-player src="https://lottie.host/e91ec6ca-28eb-4ff6-afd6-89609dc8ba8c/VONcoIIQ0r.json" background="transparent" speed="1" style={{ width: '100px', height: '100px' }} loop autoplay></dotlottie-player>
      </div>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <select
        value={filterCompany}
        onChange={handleFilterCompany}>
        <option className="option" value="">All Companies...</option>
        {companyOptions.map((company, index) => (
          <option className="option" key={index} value={company}>{company}</option>
        ))}
      </select>


      <div className="sort-buttons">
        <button onClick={() => handleSort('name')}>Sort by Name</button>
        <button onClick={() => handleSort('age')}>Sort by Age</button>
      </div>
      <ul>
        {filteredAttendees.map((attendee, index) => (
          <li key={index} className="enter">
            <h2>{attendee.name}</h2>
            <p>Age: {attendee.age}</p>
            <p>Company: {attendee.company}</p>
          </li>
        ))}
      </ul>
      <h3>
         Made with <FaHeart style={{ color: 'red', marginTop: '10px' }}/> by Garvit Dadheech
      </h3>


    </div>
  );
}

export default App;
