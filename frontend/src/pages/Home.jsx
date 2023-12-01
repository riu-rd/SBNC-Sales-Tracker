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
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';

import Spinner from '../components/Spinner';
import DataEntryForm from '../components/DataEntryForm';
import UpdateForm from '../components/UpdateForm';
import DeleteButton from '../components/DeleteButton';
import EditButton from '../components/EditButton';

function Home() {
    const navigate = useNavigate();
    // Loading and Updating Transactions
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    //Filtering Transactions
    const [defaultStartDate, setDefaultStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]);
    const [defaultEndDate, setDefaultEndDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);
    //Dropdowns and Popups
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isDataEntryOpen, setIsDataEntryOpen] = useState(false);
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
    const [isRowClicked, setIsRowClicked] = useState([false, -1]);
    //User Variables
    const [currentUser, setCurrentUser] = useState("");
    const [transactionCount, setTransactionCount] = useState(0);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const[toUpdate, setToUpdate] = useState([]);

    // [CREATE] When Data Entry Submit Button is Clicked
    const handleDataEntrySubmit = (formData) => {
        axios.post('/transactions', formData, {withCredentials: true})
        .then((res) => {
                console.log('Transaction Posted:', res.data);
                fetchAndUpdateTransactions();
            })
            .catch((err) => {
                alert("Error submitting new transactions data");
                console.error('Error submitting data:', err.message);
            });
        setIsDataEntryOpen(false);
    };

    // [READ] Call this function when fetching Transactions from the server
    const fetchAndUpdateTransactions = () => {
        axios.get(`/transactions/${startDate}/${endDate}`, {withCredentials: true})
        .then((res) => {
            setTransactions(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err.message);
            setLoading(false);
          });
    };

    // [Update] Call this function when updating a row
    const handleUpdateFormSubmit = (formData) => {
        axios.put(`/transactions/${formData._id}`, formData, {withCredentials: true})
        .then((res) => {
            console.log('Transaction Updated:', res.data);
            fetchAndUpdateTransactions();
        })
        .catch((err) => {
            alert("Error updating transactions data");
            console.error('Error updating data:', err.message);
        });
        setIsUpdateFormOpen(false);
    };

    // [DELETE] Call this function when deleting a row
    const handleRowDelete = (transactionID) => {
        const userConfirmed = window.confirm('Are you sure you want to delete this transaction?');
        if (userConfirmed) {  
            axios.delete(`/transactions/${transactionID}`, {withCredentials: true})
                .then((res) => {
                    console.log("Transaction Deleted", res.data);
                    fetchAndUpdateTransactions();
                }).catch((err) => {
                    console.error(err.message);
                });
        }
    };

    // [DOWNLOAD] Function used for turning filteredTransactions into an Excel File
    const handleOnExport = async () => {
        if (filteredTransactions && filteredTransactions.length > 0 &&
            window.confirm('Download Current Spreadsheet?')) {
            const wb = new ExcelJS.Workbook();
            const ws = wb.addWorksheet('Transactions');

            ws.columns = [
                { header: "DATE", key: "date", width: 30 },
                { header: "BRANCH", key: "branch", width: 30 },
                { header: "NAME OF CUSTOMER", key: "name", width: 30 },
                { header: "C-SERIES", key: "series", width: 30 },
                { header: "OS", key: "os", width: 30 },
                { header: "C-INVOICE", key: "invoice", width: 30 },
                { header: "SELLER", key: "seller", width: 30 },
                { header: "ASSEMBLER", key: "assembler", width: 30 },
                { header: "TOTAL", key: "total", width: 30 },
                { header: "VAT SALE", key: "vatsale", width: 30 },
                { header: "VAT AMOUNT", key: "vatamount", width: 30 },
            ];

            // Set fill color and font color for column headers
            ws.getRow(1).eachCell((cell) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'ff0c2075' },
                };
                cell.font = {
                    bold: true,
                    color: { argb: 'ffffffff' },
                };
            });

            filteredTransactions.forEach((transaction) => {
                ws.addRow({
                    date: transaction.date,
                    branch: transaction.branch,
                    name: transaction.name,
                    series: transaction.series,
                    os: transaction.os,
                    invoice: transaction.invoice,
                    seller: transaction.seller,
                    assembler: transaction.assembler,
                    total: transaction.total,
                    vatsale: transaction.vatsale,
                    vatamount: transaction.vatamount
                });
            });

            ws.eachRow((row, rowNumber) => {
                row.alignment = { vertical: 'middle', horizontal: 'center' };
            });

            const blob = await wb.xlsx.writeBuffer();
            saveAs(new Blob([blob]), 'transactions.xlsx');
        }
    };

    // [LOGOUT] Logs out the user
    const handleLogout = () => {
        const userConfirmed = window.confirm('Are you sure you want to logout?');
        if (userConfirmed) {
            axios.delete('/logout', {withCredentials: true})
            .then((res) => {
                console.log('Logout successful:', res.data);
                navigate('/');
            })
            .catch((err) => {
                console.error('Error during logout:', err.message);
            });
        }
    };

    // When Update Button is clicked
    const handleOnUpdate = (clickedRow) => {
        setIsUpdateFormOpen(true);
        setToUpdate(clickedRow);
    };

    // function used for Filtering
    const filteredTransactions = transactions.filter((transaction) => {
        const transactionValues = Object.values(transaction);

        return (
            transactionValues.some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    });

    const convertAccess = (access) => {
        switch (access) {
            case 1: return "Employee";
            case 2: return "Supervisor";
            case 3: return "Admin";
            default: return null;
        }
    }

    // Filter the table based on date
    useEffect(() => {
        setLoading(true);
        fetchAndUpdateTransactions();
    }, [startDate, endDate]);

    // Verify if user is indeed authenticated
    useEffect(() => {
        axios.get('/user', {withCredentials: true})
            .then((res) => {
                setDefaultStartDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]);
                setDefaultEndDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]);
                if (res.data) {
                    setCurrentUser(res.data.user);
                }
            })
            .catch((err) => {
                navigate("/");
                console.error(err.message);
            });
    }, [navigate]);

    // Set transaction count when the table changes
    useEffect(() => {
        setTransactionCount(filteredTransactions.length);
    }, [filteredTransactions]);

    // Initialize the Date Display
    useEffect(() => {
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
            <h2 className='greetings'>Logged In [{convertAccess(currentUser.
// @ts-ignore
            access)} Access]: {
                // @ts-ignore
                currentUser.name}</h2>
            <div className='search'>
                <div className='total-container'><h3>Sales Count</h3><h4>{transactionCount}</h4></div>
                <input className='search-input'
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value) }}
                />
                <div className='date'>
                    <div className='startDate'>  <p className='startLabel'>Start Date</p>
                        <input
                            type="date"
                            placeholder="Start Date"
                            value={startDate}
                            onChange={(e) => { e.target.value === '' ? setStartDate(defaultStartDate) : setStartDate(e.target.value) }}
                        /></div>

                    <div className='endDate'>
                        <p className='endLabel'>End Date</p>
                        <input
                            type="date"
                            placeholder="End Date"
                            value={endDate}
                            onChange={(e) => { e.target.value === '' ? setEndDate(defaultEndDate) : setEndDate(e.target.value) }}
                        />
                    </div>

                </div>
                <button className='transac-btn main-buttons' onClick={() => setIsDataEntryOpen(!isDataEntryOpen)}>Add Transaction</button></div>
            {isDataEntryOpen && (<DataEntryForm onSubmit={handleDataEntrySubmit} onCancel={() => setIsDataEntryOpen(false)}
                // @ts-ignore
                branch={currentUser.branch} currUser={currentUser.name} />)}
            {isUpdateFormOpen && (<UpdateForm onSubmit={handleUpdateFormSubmit} 
                                    onCancel={()=>setIsUpdateFormOpen(false)} updateData={toUpdate} />)}
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
                </thead>
                <tbody>
                    {
                        filteredTransactions.map((transaction, index) => (
                            <tr key={transaction._id} onClick={() => setIsRowClicked([!isRowClicked[0], index])}>
                                {(isRowClicked[0] && isRowClicked[1] === index) ?
                                    (<td className='operations'>
                                        { (currentUser.
// @ts-ignore
                                        access > 1) && <EditButton onEdit={() => handleOnUpdate(transaction)} />}
                                        {"                "}
                                        { (currentUser.
// @ts-ignore
                                        access > 1) &&<DeleteButton onDelete={() => handleRowDelete(transaction._id)} />}
                                        </td>
                                        ) :
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
                                <td>{transaction.addedby}</td>
                            </tr>
                        ))}
                </tbody>
            </table>)}
            <button className='spreadsheet-btn main-buttons' onClick={handleOnExport} disabled={currentUser.
// @ts-ignore
            access === 1}>Download Spreadsheet</button>
        </div>
    );
}

export default Home;