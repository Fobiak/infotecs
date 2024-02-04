import React, { useState } from 'react';

const SearchInput = ({ onSearch }) => {
    const [searchKey, setSearchKey] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        onSearch(searchKey, searchValue);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter search key"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter search value"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchInput;
