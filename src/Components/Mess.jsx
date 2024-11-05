import React, { useState } from "react";
import Character from '../images/Screenshot 2024-04-18 at 9.03.03 AM.png';

function Mess() {
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCaterer, setSelectedCaterer] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");

  // Menu details for different caterers
  const catererMenus = {
    "Darling Mess": {
      breakfast: "Pancakes, Fruit Salad, Coffee",
      lunch: "Pasta, Caesar Salad, Garlic Bread",
      snacks: "Brownies, Tea, Cookies",
      dinner: "Grilled Chicken, Rice, Veggies",
    },
    "PR Mess": {
      breakfast: "Omelette, Toast, Orange Juice",
      lunch: "Chicken Biryani, Raita, Papad",
      snacks: "Samosa, Chai",
      dinner: "Fish Curry, Steamed Rice, Salad",
    },
    "Zenith Mess": {
      breakfast: "Idli, Coconut Chutney, Filter Coffee",
      lunch: "Paneer Tikka, Naan, Dal Makhani",
      snacks: "Pakoras, Lemonade",
      dinner: "Mutton Rogan Josh, Rice, Pickle",
    },
  };

  const menuDetails = {
    "Veg Mess": {
      breakfast: "Vegetable Upma, Tea",
      lunch: "Veg Pulao, Raita, Mixed Veg",
      snacks: "Fruit Chaat, Coconut Ladoo",
      dinner: "Aloo Gobi, Roti, Salad",
    },
    "Non-Veg Mess": {
      breakfast: "Egg Bhurji, Toast, Coffee",
      lunch: "Chicken Curry, Rice, Salad",
      snacks: "Fish Fry, Green Chutney",
      dinner: "Mutton Biryani, Raita",
    },
    "Special Mess": {
      breakfast: "Avocado Toast, Smoothie",
      lunch: "Grilled Veg Sandwich, Soup",
      snacks: "Mini Tacos, Guacamole",
      dinner: "Lobster Pasta, Garlic Bread",
    },
  };

  const handleHostelClick = (hostel) => {
    setSelectedHostel(hostel);
    setSelectedOption(null);
    setSelectedCaterer("");
    setSelectedMenu("");
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedCaterer("");
    setSelectedMenu("");
  };

  const handleCatererChange = (event) => {
    setSelectedCaterer(event.target.value);
  };

  const handleMenuChange = (event) => {
    setSelectedMenu(event.target.value);
  };

  return (
    <div className="dropdown" style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <div style={{ backgroundColor: '#5199EB', height: "200px", width: "60vw", borderRadius: '20px', display: 'flex', flexDirection: "row", padding: "0 55px" }}>
        <h2 style={{ flexBasis: '80%', fontSize: "30px", justifyContent: 'center', alignContent: "center", color: "white" }}>
          Mess Management
        </h2>
        <img src={Character} alt="Character" style={{ height: "200px" }} />
      </div>

      <h2 style={{ margin: "20px 0" }}>Select Hostel</h2>
      <div className="dropdown-buttons">
        <button
          onClick={() => handleHostelClick("Men's Hostel")}
          className={selectedHostel === "Men's Hostel" ? "highlighted" : ""}
        >
          Men's Hostel
        </button>
        <button
          onClick={() => handleHostelClick("Ladies Hostel")}
          className={selectedHostel === "Ladies Hostel" ? "highlighted" : ""}
        >
          Ladies Hostel
        </button>
      </div>

      {selectedHostel && (
        <>
          <h2>Options</h2>
          <div className="dropdown-buttons">
            <button
              onClick={() => handleOptionClick("Select Caterer")}
              className={selectedOption === "Select Caterer" ? "highlighted" : ""}
            >
              Select Caterer
            </button>
            <button
              onClick={() => handleOptionClick("View Menu")}
              className={selectedOption === "View Menu" ? "highlighted" : ""}
            >
              View Menu
            </button>
          </div>
        </>
      )}

      {selectedOption === "Select Caterer" && (
        <>
          <h2>Select Caterer</h2>
          <select
            value={selectedCaterer}
            onChange={handleCatererChange}
            className={selectedCaterer ? "highlighted" : ""}
          >
            <option value="" disabled>
              Choose a Caterer
            </option>
            <option value="Darling Mess">Darling Mess</option>
            <option value="PR Mess">PR Mess</option>
            <option value="Zenith Mess">Zenith Mess</option>
          </select>

          {selectedCaterer && (
            <div className="menu-display">
              <h2>{selectedCaterer} Menu</h2>
              <p><strong>Breakfast:</strong> {catererMenus[selectedCaterer].breakfast}</p>
              <p><strong>Lunch:</strong> {catererMenus[selectedCaterer].lunch}</p>
              <p><strong>Snacks:</strong> {catererMenus[selectedCaterer].snacks}</p>
              <p><strong>Dinner:</strong> {catererMenus[selectedCaterer].dinner}</p>
            </div>
          )}
        </>
      )}

      {selectedOption === "View Menu" && (
        <>
          <h2>View Menu</h2>
          <select
            value={selectedMenu}
            onChange={handleMenuChange}
            className={selectedMenu ? "highlighted" : ""}
          >
            <option value="" disabled>
              Choose a Menu
            </option>
            <option value="Veg Mess">Veg Mess</option>
            <option value="Non-Veg Mess">Non-Veg Mess</option>
            <option value="Special Mess">Special Mess</option>
          </select>

          {selectedMenu && (
            <div className="menu-display">
              <h2>{selectedMenu} Menu</h2>
              <p><strong>Breakfast:</strong> {menuDetails[selectedMenu].breakfast}</p>
              <p><strong>Lunch:</strong> {menuDetails[selectedMenu].lunch}</p>
              <p><strong>Snacks:</strong> {menuDetails[selectedMenu].snacks}</p>
              <p><strong>Dinner:</strong> {menuDetails[selectedMenu].dinner}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Mess;
