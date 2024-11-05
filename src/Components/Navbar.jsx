// Navbar.jsx
import React, { useState } from 'react';
import roomConnectImage from '../images/Profile-Male-PNG.png';
import ProfileDropdown from './ProfileDropdown';
import './Navbar.css';

const Navbar = ({ onPageChange, currentPage }) => {

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(currentPage);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const closeDropdown = () => {
        setDropdownVisible(false);
    };

    const handleSelect = (option) => {
        setSelectedOption(option);
        onPageChange(option);
    };
    console.log(selectedOption);
    console.log(currentPage);

    return (
        <div className="header" style={{ display: 'flex', flexDirection: 'row', alignContent: 'flex-end', width: '100%', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', padding: '10px', fontFamily: 'monospace', justifyContent: "space-around" }}>
            <div className='headname' style={{ display: 'flex', flexBasis: '' }}><span style={{ fontSize: '20px', fontWeight: 'bold', alignContent: "center" }}>Room Connect</span></div>
            <div className='navbar' style={{ display: 'flex', flexDirection: "row", alignItems: 'flex-end', flexBasis: "45%", alignContent: 'space-evenly', fontSize: '16px' }} >
            <div
                className={`nav-option${selectedOption === 'Home' ? ' selected' : ''}`}
                onClick={() => {
                    handleSelect('Home');
                    onPageChange('home');
                }}
            >
                Home
            </div>
            <div
                className={`nav-option${selectedOption === 'Roommate' ? ' selected' : ''}`}
                onClick={() => {
                    handleSelect('Roommate');
                    onPageChange('roomate');
                }}
            >
                Roommate Connect
            </div>
            <div
                className={`nav-option${selectedOption === 'hostels' ? ' selected' : ''}`}
                onClick={() => {
                    handleSelect('hostels');
                    onPageChange('hostelInfo');
                }}
            >
                Laundry Management
            </div>
            <div
                className={`nav-option${selectedOption === 'whatsapp' ? ' selected' : ''}`}
                onClick={() => {
                    handleSelect('mess');
                    onPageChange('mess');
                }}
            >
                Mess Management
            </div>
            <div
                className={`nav-option${selectedOption === 'hostels' ? ' selected' : ''}`}
                onClick={() => {
                    handleSelect('hostels');
                    onPageChange('hostelInfo');
                }}
            >
                Hostel Benefit Hub
            </div>
            <div
                className={`nav-option${selectedOption === 'taxiShare' ? ' selected' : ''}`}
                onClick={() => {
                    handleSelect('taxiShare');
                    onPageChange('taxiShare');
                }}
            >
                TaxiShare
            </div>
            <div
                className={`nav-option${selectedOption === 'About' ? ' selected' : ''}`}
                onClick={() => {
                    handleSelect('About');
                    onPageChange('aboutPage');
                }}
            >
                About
            </div>
            </div>
            <div className='profile_pic'>
                <img src={roomConnectImage} alt="Profile" style={{ height: "30px", cursor: "pointer" }} onClick={toggleDropdown} />
                {dropdownVisible && <ProfileDropdown onPageChange={onPageChange} />}
            </div>
            {dropdownVisible && <div className="overlay" onClick={closeDropdown}></div>}
        </div>
    );
};

export default Navbar;


