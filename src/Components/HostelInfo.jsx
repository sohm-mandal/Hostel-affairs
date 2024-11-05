import React, { useState, useEffect } from 'react';
import hostelData from './images.json'; // Import the JSON file
import Tiles from './Tiles';

const HostelInfo = ({ onPageChange }) => {
  const [tilesData, setTilesData] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Home');

    const handleSelect = (option) => {
      setSelectedOption(option);
  };

  useEffect(() => {
    // Modify the hostelData to include both image URL and hostel name
    const modifiedData = hostelData.map(hostel => ({
      imageUrl: hostel.url,
      hostelName: hostel.hostelName,
    }));
    setTilesData(modifiedData);
  }, []);

  return (
    <div>
      <h1>Hostel Info</h1>
      <Tiles tilesData={tilesData} />
      <div
                className={`nav-option${selectedOption === 'whatsapp' ? ' selected' : ''}`}
                onClick={() => {
                    handleSelect('whatsapp');
                    onPageChange('whatsApp');
                }}
            >
                Whatsapp
            </div>
    </div>
  );
};

export default HostelInfo;
