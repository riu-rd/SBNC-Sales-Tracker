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
import DataEntryForm from '../components/DataEntryForm';
import DeleteButton from '../components/DeleteButton';
import AccessForm from '../components/AccessForm.jsx';

function Home() {
    const navigate = useNavigate();
    // Loading and Updating Users
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    //Filtering Users
    const [searchTerm, setSearchTerm] = useState('');
    //Dropdowns and Popups
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isDataEntryOpen, setIsDataEntryOpen] = useState(false);
    const [isRowClicked, setIsRowClicked] = useState([false, -1]);
    const [isAccessFormOpen, setIsAccessFormOpen] = useState(false);
    //User Variables
    const [currentUser, setCurrentUser] = useState("");
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [toChangeAccess, setToChangeAccess] = useState([]);

    // [CREATE] When Data Entry Submit Button is Clicked
    const handleDataEntrySubmit = (formData) => {
        axios.post('/transactions', formData, {withCredentials: true})
        .then((res) => {
                console.log('Transaction Posted:', res.data);
                fetchUsers();
            })
            .catch((err) => {
                alert("Error submitting new transactions data");
                console.error('Error submitting data:', err.message);
            });
        setIsDataEntryOpen(false);
    };

    // [READ] Call this function when fetching Users from the server
    const fetchUsers = () => {
        axios.get('/users', { withCredentials: true})
        .then((res) => {
            setUsers(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err.message);
            setLoading(false);
          });
    };

    // [UPDATE] Call this function when updating the access level of a user
    const handleAccessChangeApply = (newAccess, updating_user) => {
        axios.patch(`users/access/${updating_user._id}`, {access: newAccess}, { withCredentials: true})
        .then((res) => {
            console.log('User Access Updated:', res.data);
            fetchUsers();
        }).catch((err)=> {
            alert("Error submitting new transactions data");
            console.error('Error submitting data:', err.message);
        });
        setIsAccessFormOpen(false);
    };

    // [DELETE] Call this function when deleting a row
    const handleRowDelete = (userID) => {
        const userConfirmed = window.confirm('Are you sure you want to delete this user?');
        if (userConfirmed) {  
            axios.delete(`/users/delete/${userID}`, {withCredentials: true})
                .then((res) => {
                    console.log("User Deleted", res.data);
                    fetchUsers();
                }).catch((err) => {
                    console.error(err.message);
                });
        }
    };

    // [LOGOUT] Logs out the user
    const handleLogout = () => {
        const userConfirmed = window.confirm('Are you sure you want to logout?');
        if (userConfirmed) {
            axios.delete('/logout', { withCredentials: true })
            .then((res) => {
                console.log('Logout successful:', res.data);
                navigate('/');
            })
            .catch((err) => {
                console.error('Error during logout:', err.message);
            });
        }
    };

    // function used for Filtering
    const filteredUsers = users.filter((user) => {
        const userValues = Object.values(user);

        return (
            userValues.some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    }); 

    // transforming Access Level
    const handleAccessLevel = (level) => {
        switch (level) {
            case 1: return 'Employee';
            case 2: return 'Supervisor';
            case 3: return 'Admin';
        }
    };

    // transforming Verified
    const handleVerified = (verified) => {
        if (verified) {
            return 'Verified';
        }
        return "Not Verified";
    };

    // transforming Approved
    const handleApproved = (approved) => {
        if (approved) {
            return 'Approved';
        }
        return 'Not Approved';
    };

    // when approve/disapprove button is clicked
    const handleApproval = (approval, userID) => {
        const userConfirmed = window.confirm('Are you sure you want to change the approval of this user?');
        
        if (userConfirmed) {
            axios.patch(`/users/approval/${userID}`, {approved: (!approval)}, {withCredentials: true})
            .then((res) => {
                    console.log('User approval changed:', res.data);
                    fetchUsers();
                })
                .catch((err) => {
                    alert("Error changing user approval");
                    console.error('Error changing user approval data:', err.message);
                });
        }
    };
    
    const handleAccessChange = (level, userID) => {
        const userAccessChange = window.confirm('Are you sure you want to change the access level of the user?')

        if (userAccessChange) {
            axios.patch(`/users/access/${userID}`, {withCredentials: true})
            .then((res) => {
                console.log('User access changed:', res.data)

                .catch((err) => {
                    alert('Error changing user access')
                    console.error('Error changing user access data:', err.message);
                }) 
            })
        }
    }

    // when access button is clicked
    const handleAccessClick = (user) => {
        setToChangeAccess(user);
        setIsAccessFormOpen(!isAccessFormOpen);
    }

    // when Delete ALL Unverified Users is clicked
    const handleDeleteAllUnverified = () => {
        const userConfirmed = window.prompt('Are you sure you want to DELETE ALL Unverified Users?\nType "delete all unverified" to confirm');
        if (userConfirmed === "delete all unverified") {
            axios.delete('/users/unverified', {withCredentials: true})
                .then((res) => {
                    console.log("Deleted ALL unverified users", res.data);
                    fetchUsers();
                }).catch((err) => {
                    console.error(err.message);
                });
        }
    };

    // when Delete ALL Unverified Users is clicked
    const handleDeleteAllUnapproved = () => {
        const userConfirmed = window.prompt('Are you sure you want to DELETE ALL Unapproved Users?\nType "delete all unapproved" to confirm');
        if (userConfirmed === "delete all unapproved") {
            axios.delete('/users/unapproved', {withCredentials: true})
                .then((res) => {
                    console.log("Deleted ALL unapproved users", res.data);
                    fetchUsers();
                }).catch((err) => {
                    console.error(err.message);
                });
        }
    };

    // Verify if user is indeed authenticated
    useEffect(() => {
        axios.get('/user', { withCredentials: true })
            .then((res) => {
                if (res.data) {
                    console.log("Currently Logged In: ", res.data.user.name);
                    setCurrentUser(res.data.user);
                }
            })
            .catch((err) => {
                navigate("/");
                console.error(err.message);
            });
    }, [navigate]);

    // Initialize the Date Display
    useEffect(() => {
        fetchUsers();
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <div className="nav">
                <img className='banner' src={banner} alt="" />
                <Link to='/home'><button className="btn-nav">Transactions</button></Link>
                {(// @ts-ignore
                    currentUser.access === 3 || currentUser.access === 2) &&(<Link to='/user-management'><button className="btn-nav">Users</button></Link>)}
                <div className="profile" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
                    <img src={profileIcon} alt="" />
                </div>
                <div className='date-display'><h3>{currentDateTime.toLocaleString()}</h3></div>
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
            <h2 className='greetings'>Logged In: {
                // @ts-ignore
                currentUser.name}</h2>
            <div className='search'>
                <input className='search-user'
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value) }}
                />
                
                
                </div>
            {isDataEntryOpen && (<DataEntryForm onSubmit={handleDataEntrySubmit} onCancel={() => setIsDataEntryOpen(false)}
                // @ts-ignore
                branch={currentUser.branch} currUser={currentUser.name} />)}
            {isAccessFormOpen && (<AccessForm onCancel={()=> setIsAccessFormOpen(false)} updating_user={toChangeAccess} onApply={handleAccessChangeApply}/>)}
            {loading ? (<><Spinner /><table className="transaction-table"><thead>
                    <tr>
                        <th className='operations'></th>
                        <th>Date</th>
                        <th>Branch</th>
                        <th>Name of Customer</th>
                        <th>C-Series</th>
                        <th>OS</th>
                        <th>C-Invoice</th>
                        <th>Seller</th>
                        <th>Assembler</th>
                        <th>Total</th>
                        <th>VAT Sale</th>
                        <th>VAT Amount</th>
                        <th>Added By</th>
                    </tr>
                </thead><tbody></tbody></table></>) : 
            (<table className="transaction-table">
                <thead>
                    <tr>
                        <th className='operations'></th>
                        <th>Created At</th>
                        <th>Name</th>
                        <th>Branch</th>
                        <th>Email</th>
                        <th>Access Level</th>
                        <th>Verified</th>
                        <th>Approved</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredUsers.map((user, index) => (
                            <tr key={user._id} onClick={() => setIsRowClicked([!isRowClicked[0], index])}>
                                {(isRowClicked[0] && isRowClicked[1] === index) ?
                                    (<td className='user-operations'>
                                        <DeleteButton onDelete={() => handleRowDelete(user._id)} />{"                "}
                                        {user.approved ? (<button className="unverify-button" onClick={() => handleApproval(user.approved, user._id)}>Unapprove</button>) :
                                        (<button className='verify-button' onClick={() => handleApproval(user.approved, user._id)}>Approve</button>)}
                                        {"                "}
                                        {(// @ts-ignore
                                            currentUser.access === 3) && <button className='access-button' onClick={()=> handleAccessClick(user)}>Access</button>}
                                        </td>
                                        ) :
                                    (<td className='user-operations'></td>)}
                                <td>{user.createdAt}</td>
                                <td>{user.name}</td>
                                <td>{user.branch}</td>
                                <td>{user.email}</td>
                                <td>{handleAccessLevel(user.access)}</td>
                                {user.verified ? (<td><p className='verified'>{handleVerified(user.verified)}</p></td>) 
                                    : (<td><p className='not-verified'>{handleVerified(user.verified)}</p></td>)}
                                {user.approved ? (<td><p className='verified'>{handleApproved(user.approved)}</p></td>) 
                                : (<td><p className='not-verified'>{handleApproved(user.approved)}</p></td>)}
                            </tr>
                        ))}
                </tbody>
            </table>)}
            <div className='user-delete-btn-container'>
                {(// @ts-ignore
                    currentUser.access === 3 || currentUser.access === 2) && <button className='user-delete-btn' onClick={handleDeleteAllUnapproved}>Delete ALL Unapproved Users</button>}
                {(// @ts-ignore
                    currentUser.access === 3 || currentUser.access === 2) && <button className='user-delete-btn' onClick={handleDeleteAllUnverified}>Delete ALL Unverified Users</button>}
            </div>
        </div>
    );
}

export default Home;