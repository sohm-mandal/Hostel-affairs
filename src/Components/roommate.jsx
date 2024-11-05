// LandingArea.jsx
import React, { useState } from 'react';
import './ButtonCSS.css';
import SearchComponent from './SearchComponent';
import RoomListingForm from './RoomListingForm';
import Character from '../images/Screenshot 2024-04-18 at 9.03.03 AM.png';

export default function LandingPage({onPageChange}) {
  const [selectedButton, setSelectedButton] = useState('');

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  const [selectedOption, setSelectedOption] = useState('Home');

  const handleSelect = (option) => {
    setSelectedOption(option);
};

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap: "100px"}}>
      <div style={{ fontSize: "70px" }}>
        VIT at ONE PLACE.
      </div>
      <div style={{ backgroundColor:'#5199EB', height:"200px", borderRadius:'20px', display:'flex',flexDirection:"row", padding:"0 55px 0 55px"}}>
        <h2 style={{flexBasis:'80%', fontSize:"30px", justifyContent:'center', alignContent:"center", color:"white"}}>
          All utilities at one place.</h2>
        <img src={Character} alt="Character" style={{maxHeight:"200px", flexBasis:"20%"}} />
      </div>

      <div style={{ fontSize: "25px", marginTop:"20px", display: "flex", flexDirection: "row", gap: "50px"}}>
          <div style={{width:'60%', backgroundColor:'#5199EB', borderRadius:'20px', display:'flex',flexDirection:"row", padding:"15px"}}>
            <h3 style={{flexBasis:'80%', fontSize:"20px", justifyContent:'center', alignContent:"center", color:"white"} }  onClick={() => {
                    handleSelect('Roommate');
                    onPageChange('roomate');
                }}>
              Roommate Connect</h3>
          </div>
          <div style={{width:'60%', backgroundColor:'#5199EB', borderRadius:'20px', display:'flex',flexDirection:"row", padding:"15px"}}>
            <h3 style={{flexBasis:'80%', fontSize:"20px", justifyContent:'center', alignContent:"center", color:"white"}}>
              Laundry Management</h3>
          </div>
          <div style={{width:'60%', backgroundColor:'#5199EB', borderRadius:'20px', display:'flex',flexDirection:"row", padding:"15px"}}>
            <h3 style={{flexBasis:'80%', fontSize:"20px", justifyContent:'center', alignContent:"center", color:"white"}}>
              Mess Management</h3>
          </div>
          <div style={{width:'60%', backgroundColor:'#5199EB', borderRadius:'20px', display:'flex',flexDirection:"row", padding:"15px"}}>
            <h3 style={{flexBasis:'80%', fontSize:"20px", justifyContent:'center', alignContent:"center", color:"white"}}>
              Hostel Benefit Hub</h3>
          </div>
          <div style={{width:'60%', backgroundColor:'#5199EB', borderRadius:'20px', display:'flex',flexDirection:"row", padding:"15px"}}>
            <h3 style={{flexBasis:'80%', fontSize:"20px", justifyContent:'center', alignContent:"center", color:"white"}}>
            Taxi Management</h3>
          </div>
        {selectedButton === 'find' && <div style={{ marginTop: "20px" }}>
          <SearchComponent />
        </div>}
        {selectedButton === 'list' && <div style={{ marginTop: "20px" }}>
          <RoomListingForm />
        </div>}
      </div>
    </div>
  );
}
