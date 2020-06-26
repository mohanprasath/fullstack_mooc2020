import React from 'react';

const PhoneBookFilter = ({ filter, handleFilterChange }) => (
  <div>
    filter shown with:
    {' '}
    <input value={filter} onChange={handleFilterChange} />
  </div>
);

export default PhoneBookFilter;
