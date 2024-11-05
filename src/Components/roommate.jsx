// LandingArea.jsx
import React, { useState } from 'react';
import './ButtonCSS.css';
import SearchComponent from './SearchComponent';
import RoomListingForm from './RoomListingForm';
import Character from '../images/Screenshot 2024-04-18 at 9.03.03 AM.png';

export default function LandingPage({onPageChange}) {
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
          <div style={{cursor:"pointer", width:'60%', backgroundColor:'#5199EB', borderRadius:'20px', display:'flex',flexDirection:"row", padding:"15px"}} onClick={() => {
                    onPageChange('roommate');
                }}>
            <h3 style={{flexBasis:'80%', fontSize:"20px", justifyContent:'center', alignContent:"center", color:"white"} }  >
              Roommate Connect</h3>
          </div>
          <div style={{cursor:"pointer", width:'60%', backgroundColor:'#5199EB', borderRadius:'20px', display:'flex',flexDirection:"row", padding:"15px"}}onClick={() => {
                    onPageChange('');
                }}>
            <h3 style={{flexBasis:'80%', fontSize:"20px", justifyContent:'center', alignContent:"center", color:"white"}} onClick={() => {
                    onPageChange('');
                }}>
              Laundry Management</h3>
          </div>
          <div style={{cursor:"pointer",width:'60%', backgroundColor:'#5199EB', borderRadius:'20px', display:'flex',flexDirection:"row", padding:"15px"}} onClick={() => {
                    onPageChange('mess');
                }}>
            <h3 style={{flexBasis:'80%', fontSize:"20px", justifyContent:'center', alignContent:"center", color:"white"}}>
              Mess Management</h3>
          </div>
          <div style={{cursor:"pointer",width:'60%', backgroundColor:'#5199EB', borderRadius:'20px', display:'flex',flexDirection:"row", padding:"15px"}} onClick={() => {
                    onPageChange('hostelInfo');
                }}>
            <h3 style={{flexBasis:'80%', fontSize:"20px", justifyContent:'center', alignContent:"center", color:"white"}}>
              Hostel Benefit Hub</h3>
          </div>
          <div style={{cursor:"pointer", width:'60%', backgroundColor:'#5199EB', borderRadius:'20px', display:'flex',flexDirection:"row", padding:"15px"}} onClick={() => {
                    onPageChange('taxiShare');
                }}>
            <h3 style={{flexBasis:'80%', fontSize:"20px", justifyContent:'center', alignContent:"center", color:"white"}}>
            Taxi Management</h3>
          </div>
      </div>
    </div>
  );
}
