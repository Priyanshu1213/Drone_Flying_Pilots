import React from 'react';


const Filters = ({ aetRange }) => {
  const handleRangeChange = (e) => {
    aetRange(e.target.value);
  };

  return (
    <div className="filters">
      <label htmlFor="range">Range (km): </label>
      <input
        type="number"
        id="range"
        name="range"
        defaultValue={0}
        onChange={handleRangeChange}
      />
    </div>
  );
};

export default Filters;
