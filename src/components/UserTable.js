import React, { useState, useEffect } from 'react';
import './usertable.css';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: '',
        direction: '',
    });
    const [sortEnabled, setSortEnabled] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    const keyExtractor = (user, key) => {
        switch (key) {
            case 'fullName':
                return `${user.firstName} ${user.lastName}`;
            case 'address':
                return `${user.address.city}, ${user.address.address}`;
            default:
                return user[key];
        }
    };

    const fetchData = async () => {
        try {
            let url = 'https://dummyjson.com/users';

            if (searchKey && searchValue) {
                url = `https://dummyjson.com/users/filter?key=${searchKey}&value=${searchValue}`;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchKey, searchValue]);

    const handleSort = (key) => {
        if (!sortEnabled) return;
        let direction = 'asc';

        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key, direction });
    };

    const handleUserClick = (user) => {
        console.log('Clicked user:', user);
        setSelectedUser(user);
    };

    const sortedUsers = sortEnabled ? users.slice().sort((a, b) => {
        const keyA = String(keyExtractor(a, sortConfig.key));
        const keyB = String(keyExtractor(b, sortConfig.key));

        if (sortConfig.direction === 'asc') {
            return keyA.localeCompare(keyB);
        } else if (sortConfig.direction === 'desc') {
            return keyB.localeCompare(keyA);
        }

        return 0;
    }) : users;

    return (
        <div>
            <div>
                <label>Search Key:</label>
                <input
                    type="text"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                />
            </div>
            <div>
                <label>Search Value:</label>
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={sortEnabled}
                        onChange={() => setSortEnabled(!sortEnabled)}
                    />
                    Enable Sorting
                </label>
            </div>
            <table className="user-table">
                <thead>
                <tr>
                    <th onClick={() => handleSort('fullName')}>Full Name</th>
                    <th onClick={() => handleSort('age')}>Age</th>
                    <th onClick={() => handleSort('gender')}>Gender</th>
                    <th>Phone Number</th>
                    <th onClick={() => handleSort('address')}>Address</th>
                </tr>
                </thead>
                <tbody>
                {sortedUsers.map((user) => (
                    <tr key={user.id} onClick={() => handleUserClick(user)}>
                        <td>{`${user.firstName} ${user.lastName}`}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                        <td>{user.phone}</td>
                        <td>{`${user.address.city}, ${user.address.address}`}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedUser && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setSelectedUser(null)}>&times;</span>
                        <h2>{`${selectedUser.firstName} ${selectedUser.lastName}`}</h2>
                        <p>Age: {selectedUser.age}</p>
                        <p>Address: {`${selectedUser.address.city}, ${selectedUser.address.address}`}</p>
                        <p>Height: {selectedUser.height}</p>
                        <p>Weight: {selectedUser.weight}</p>
                        <p>Phone: {selectedUser.phone}</p>
                        <p>Email: {selectedUser.email}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserTable;
