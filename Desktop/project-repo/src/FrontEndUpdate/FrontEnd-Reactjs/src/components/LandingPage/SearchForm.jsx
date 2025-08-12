import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    const categories = {
      'textiles': 'Textiles',
      'furniture': 'Furniture',
      'lighting': 'Lighting',
      'wallart': 'WallArt'
    };

    if (categories[query]) {
      navigate(`/${query}`);
    } else {
      navigate('/');
    }
    setSearchQuery(''); 
  };

  return (
    <form onSubmit={handleSearch} className="d-flex">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search By Category"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ 
          width: 350, 
          padding: '10px 20px', 
          fontSize: '18px', 
          textAlign: 'center', 
          height: '50px' 
        }} 
      />
      <button type="submit" className="btn btn-warning btn-lg" style={{ color: 'black' }}>Search</button>
    </form>
  );
};

export default SearchForm;