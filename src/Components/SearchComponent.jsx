import React, { useState, useEffect } from 'react';
import { query} from 'firebase/database'; // Import necessary Firebase database functions
import { firestore } from '../firebase';
import { collection, getDocs, where } from 'firebase/firestore';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const collectionRef = collection(firestore, "rooms");
    
        // Using `startAt` and `endAt` to perform range queries for each field
        const stateQuery = query(
          collectionRef,
          where("state", ">=", searchQuery),
          where("state", "<=", searchQuery + "\uf8ff")
        );
    
        const hobbiesQuery = query(
          collectionRef,
          where("hobbies", ">=", searchQuery),
          where("hobbies", "<=", searchQuery + "\uf8ff")
        );
    
        const messQuery = query(
          collectionRef,
          where("mess", ">=", searchQuery),
          where("mess", "<=", searchQuery + "\uf8ff")
        );
    
        // Execute all queries and merge the results
        const [stateSnapshot, hobbiesSnapshot, messSnapshot] = await Promise.all([
          getDocs(stateQuery),
          getDocs(hobbiesQuery),
          getDocs(messQuery),
        ]);
    
        // Collect all matching documents
        const searchData = [];
    
        const processSnapshot = (snapshot) => {
          snapshot.forEach((doc) => {
            const { name, blockName, regNo, email, phoneNumber, state, hobbies, mess } = doc.data();
            searchData.push({ name, blockName, regNo, email, phoneNumber, state, hobbies, mess });
          });
        };
    
        // Process each snapshot
        processSnapshot(stateSnapshot);
        processSnapshot(hobbiesSnapshot);
        processSnapshot(messSnapshot);
    
        // Remove duplicates if necessary
        const uniqueSearchData = Array.from(new Set(searchData.map(JSON.stringify))).map(JSON.parse);
    
        setSearchResults(uniqueSearchData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    

    if (searchQuery) {
      getData();
    } else {
      setSearchResults([]); // Clear search results if search query is empty
    }
  }, [searchQuery]);

  const handleSearch = () => {
    // Trigger useEffect by updating searchQuery state
    setSearchQuery(searchQuery);
  };

  return (
    <div style={{ fontSize: '25px'}}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        style={{ padding: '8px', marginRight: '8px', border: '1px solid #ccc', borderRadius: '20px', boxSizing: 'border-box', width: '500px' }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Search
      </button>
      <div className="search-results" style={{marginTop:"20px"}}>
        {loading ? (
          <div className="loading-message">Loading...</div>
        ) : searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <div key={index} className="search-result-item" style={{ padding: '8px', borderBottom: '1px solid #ccc', border:'2px solid black', borderRadius:'20px', display:'flex', flexDirection:'column', alignItems:"flex-start"}}>
             <div>Name: {result.name}</div>
             <div>Room Number: {result.roomNumber}</div>
              <div>Block: {result.blockName}</div>
              <div>Phone Number: {result.phoneNumber}</div>
              <div>Email: {result.email}</div>
            </div>
          ))
        ) : (
          <div className="no-results-message" style={{ padding: '8px', color: '#777' }}>No results found</div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
