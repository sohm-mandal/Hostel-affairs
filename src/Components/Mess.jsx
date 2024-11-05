import React, { useState } from "react";

import Character from '../images/Screenshot 2024-04-18 at 9.03.03 AM.png';
function Mess() {
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCaterer, setSelectedCaterer] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleHostelClick = (hostel) => {
    setSelectedHostel(hostel);
    setSelectedOption(null);
    setSelectedCaterer(null);
    setSelectedMenu(null);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedCaterer(null);
    setSelectedMenu(null);
  };

  const handleCatererClick = (caterer) => {
    setSelectedCaterer(caterer);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="dropdown" style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
        <div style={{ backgroundColor:'#5199EB', height:"200px", width: "60vw", borderRadius:'20px', display:'flex',flexDirection:"row", padding:"0 55px 0 55px"}}>
        <h2 style={{flexBasis:'80%', fontSize:"30px", justifyContent:'center', alignContent:"center", color:"white"}}>
          Mess Management</h2>
        <img src={Character} alt="Character"  style={{height:"200px"}}/>
      </div>
      <h2>Select Hostel</h2>
      <div className="dropdown-buttons">
        <button onClick={() => handleHostelClick("Men's Hostel")}>
          Men's Hostel
        </button>
        <button onClick={() => handleHostelClick("Ladies Hostel")}>
          Ladies Hostel
        </button>
      </div>

      {selectedHostel && (
        <>
          <h2>Options</h2>
          <div className="dropdown-buttons">
            <button onClick={() => handleOptionClick("Select Caterer")}>
              Select Caterer
            </button>
            <button onClick={() => handleOptionClick("View Menu")}>
              View Menu
            </button>
          </div>
        </>
      )}

      {selectedOption === "Select Caterer" && (
        <>
          <h2>Select Caterer</h2>
          <div className="dropdown-buttons">
            <button onClick={() => handleCatererClick("Darling")}>Darling</button>
            <button onClick={() => handleCatererClick("PR")}>PR</button>
            <button onClick={() => handleCatererClick("Zenith")}>Zenith</button>
          </div>
        </>
      )}

      {selectedOption === "View Menu" && (
        <>
          <h2>View Menu</h2>
          <div className="dropdown-buttons">
            <button onClick={() => handleMenuClick("Veg Mess")}>Veg Mess</button>
            <button onClick={() => handleMenuClick("Non-Veg Mess")}>
              Non-Veg Mess
            </button>
            <button onClick={() => handleMenuClick("Special Mess")}>
              Special Mess
            </button>
          </div>
        </>
      )}

      {(selectedCaterer || selectedMenu) && (
        <div className="menu-display">
          <h2>Mess Menu</h2>
          <p>
            {selectedCaterer
              ? `Menu for Caterer: ${selectedCaterer}`
              : `Menu Type: ${selectedMenu}`}
          </p>
        </div>
      )}
    </div>
  );
}

export default Mess;
