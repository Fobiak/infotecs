import React, { useState, useEffect } from 'react';
import './usertable.css';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const fetchData = async () => {
        try {
            let url = 'https://dummyjson.com/users';

            if (searchKey && searchValue) {
                url = `https://dummyjson.com/users/filter?key=${searchKey}&value=${searchValue}`;
            }

            const response = await fetch(url);
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchKey, searchValue]);

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
            <table className="user-table">
                <thead>
                <tr>
                    <th>ФИО</th>
                    <th>Возраст</th>
                    <th>Пол</th>
                    <th>Номер телефона</th>
                    <th>Адрес</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{`${user.firstName} ${user.lastName}`}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                        <td>{user.phone}</td>
                        <td>{`${user.address.city}, ${user.address.address}`}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
