//viewMatches.js
import React from 'react';

const ViewMatches = ({ matches }) => {
  return (
    <div>
      <h3>Roommate Matches</h3>
      {matches.length > 0 ? (
        <ul>
          {matches.map((match, index) => (
            <li key={index} className="match-item">
              <p><strong>Name:</strong> {match.name}</p>
              <p><strong>Registration No:</strong> {match.reg_no}</p>
              <p><strong>Phone No:</strong> {match.phone_no}</p>
              <p><strong>State:</strong> {match.state}</p>
              <p><strong>Hobbies:</strong> {match.hobbies}</p>
              <p><strong>Mess Type:</strong> {match.messtype}</p>
              <p><strong>Match Percentage:</strong> {match.matchPercentage}%</p>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default ViewMatches;
