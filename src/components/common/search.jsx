import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="search"
      placeholder="Search..."
      className="form-control searchInput"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default Search;
