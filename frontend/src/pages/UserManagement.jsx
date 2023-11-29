import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/style.css';
// import logoImage from './assets/sbnc_logo.png';
import { Link } from 'react-router-dom';
// @ts-ignore
import profileIcon from '../assets/images/account (1).png';
// @ts-ignore
import banner from '../assets/images/sbnc_banner.png';
import axios from '../axios-config.js';

import Spinner from '../components/Spinner';
import DeleteButton from '../components/DeleteButton';

function Home() {
    const navigate = useNavigate();
    // Loading and Updating Users
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    //Filtering Users
    const [searchTerm, setSearchTerm] = useState('');
    //Dropdowns and Popups
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isRowClicked, setIsRowClicked] = useState([false, -1]);
    //User Variables
    const [username, setUsername] = useState("");

    // [READ] Call this function when fetching Users from the server
    const fetchAndUpdateUsers = () => {
        axios.get('http://localhost:8080/transactions', { withCredentials: true })
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err.message);
                setLoading(false);
            });
    };

    // [Update] Call this function when updating a row

    // [DELETE] Call this function when deleting a row
    const handleRowDelete = (transactionID) => {
        const userConfirmed = window.confirm('Are you sure you want to delete?');
        if (userConfirmed) {
            axios.delete(`http://localhost:8080/transactions/${transactionID}`, { withCredentials: true })
                .then((res) => {
                    console.log("Transaction Deleted", res.data);
                    fetchAndUpdateUsers();
                }).catch((err) => {
                    console.error(err.message);
                });
            console.log(`Row deleted with ID: ${transactionID}`);
        }
    };

    // [LOGOUT] Logs out the user
    const handleLogout = () => {
        axios.delete('http://localhost:8080/logout', { withCredentials: true })
            .then((res) => {
                console.log('Logout successful:', res.data);
                navigate('/');
            })
            .catch((err) => {
                console.error('Error during logout:', err.message);
            });
    };

    // function used for Filtering
    const filteredUsers = users.filter((user) => {
        const userValues = Object.values(user);

        return (
            userValues.some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            ))
    });

    // Initialize the table
    useEffect(() => {
        setLoading(true);
        fetchAndUpdateUsers();
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/user', { withCredentials: true })
            .then((res) => {
                if (res.data) {
                    console.log("Currently Logged In: ", res.data.user.name);
                    setUsername(res.data.user.name);
                }
            })
            .catch((err) => {
                navigate("/");
                console.error(err.message);
            });
    }, [navigate]);

    return (
        <div>
            <div className="nav">
                <img className='banner' src={banner} alt="" />
                <Link to='/home'><button className="btn-nav">Transactions</button></Link>
                <Link to='/user-management'><button className="btn-nav">Users</button></Link>
                <div className="profile" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
                    <img src={profileIcon} alt="" />
                </div>
                {isProfileDropdownOpen && (
                    <div className="profile-dropdown">
                        <ul>
                            <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                                <li>Profile</li>
                            </Link>
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                )}
            </div>
            <h2 className='greetings'>{/*Welcome {username}!*/}Under Construction!</h2>

            <div className='search'>

                <input className='search-input'
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); }}
                />
                <button className='transac-btn main-buttons'>Clear Not Approved</button></div>
            {loading ? (<Spinner />) : (<table className="transaction-table">
                <thead>
                    <tr>
                        <th className='operations'></th>
                        <th>Created At</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Access Level</th>
                        <th>Verified</th>
                        <th>Approved</th>
                    </tr>
                </thead>
                <tbody>
                    {/*
                                filteredUsers.map((transaction, index) => (
                                <tr key={transaction._id} onClick={()=> setIsRowClicked([!isRowClicked[0], index])}>
                                    {(isRowClicked[0] && isRowClicked[1] === index) ? 
                                    (<td className='operations'>
                                    <DeleteButton onDelete={() => handleRowDelete(transaction._id)}/></td>) : 
                                    (<td className='operations'></td>)}
                                    <td>{transaction.date}</td>
                                    <td>{transaction.branch}</td>
                                    <td>{transaction.name}</td>
                                    <td>{transaction.series}</td>
                                    <td>{transaction.os}</td>
                                    <td>{transaction.invoice}</td>
                                    <td>{transaction.seller}</td>
                                    <td>{transaction.assembler}</td>
                                    <td>{transaction.total}</td>
                                    <td>{transaction.vatsale}</td>
                                    <td>{transaction.vatamount}</td>
                                </tr>
                            )) */}
                </tbody>
            </table>)}
        </div>

    );
}

export default Home;