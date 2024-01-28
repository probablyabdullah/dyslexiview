import React, { useState } from 'react';

export const Input = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <div className="rounded-box">
      <div className="static-text">Static Text</div>
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleChange} 
        className="rounded-input" 
        placeholder="Enter something..." 
      />
    </div>
  );
}

export default Input;
