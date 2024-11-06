// SearchComponent.jsx

import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const collectionRef = collection(firestore, 'rooms');
        
        // Construct query for each field
        const stateQuery = query(collectionRef, where('state', '>=', searchQuery), where('state', '<=', searchQuery + '\uf8ff'));
        const hobbiesQuery = query(collectionRef, where('hobbies', '>=', searchQuery), where('hobbies', '<=', searchQuery + '\uf8ff'));
        const messQuery = query(collectionRef, where('mess', '>=', searchQuery), where('mess', '<=', searchQuery + '\uf8ff'));
        
        // Execute queries in parallel
        const [stateSnapshot, hobbiesSnapshot, messSnapshot] = await Promise.all([
          getDocs(stateQuery),
          getDocs(hobbiesQuery),
          getDocs(messQuery),
        ]);

        // Process and combine results, removing duplicates
        const searchData = new Set();
        
        const processSnapshot = (snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            searchData.add(JSON.stringify(data)); // Add as string to avoid duplicates
          });
        };

        processSnapshot(stateSnapshot);
        processSnapshot(hobbiesSnapshot);
        processSnapshot(messSnapshot);

        // Parse unique data back into objects
        const uniqueSearchData = Array.from(searchData).map(JSON.parse);
        
        setSearchResults(uniqueSearchData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      getData();
    } else {
      setSearchResults([]); // Clear results if search query is empty
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div style={{ fontSize: '20px' }}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by State, Hobbies, or Mess Type..."
        style={{
          padding: '8px',
          marginRight: '8px',
          border: '1px solid #ccc',
          borderRadius: '20px',
          boxSizing: 'border-box',
          width: '500px',
        }}
      />
      <button
        onClick={() => searchQuery && setSearchQuery(searchQuery)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
      
      <div className="search-results" style={{ marginTop: '20px' }}>
        {loading ? (
          <div className="loading-message">Loading...</div>
        ) : searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <div
              key={index}
              className="search-result-item"
              style={{
                padding: '8px',
                borderBottom: '1px solid #ccc',
                border: '2px solid black',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginBottom: '10px',
              }}
            >
              <div>Name: {result.name}</div>
              {/* <div>Room Number: {result.roomNumber}</div> */}
              {/* <div>Block: {result.blockName}</div> */}
              <div>Phone Number: {result.phoneNumber}</div>
              <div>Register Number: {result.regNo}</div>
              <div>Email: {result.email}</div>
              <div>State: {result.state}</div>
              <div>Hobbies: {result.hobies}</div>
              <div>Mess Type: {result.mess}</div>
            </div>
          ))
        ) : (
          <div className="no-results-message" style={{ padding: '8px', color: '#777' }}>
            No results found
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
