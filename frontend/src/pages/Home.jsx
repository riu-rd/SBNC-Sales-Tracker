import React, { useEffect, useState } from 'react';
import '../assets/css/style.css';
// import logoImage from './assets/logo2.png';
// import { Link } from 'react-router-dom';
import profileIcon from '../assets/images/account (1).png';
import Spinner from '../components/Spinner';
import DataEntryForm from '../components/DataEntryForm';
import axios from 'axios';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';

function Home() {
    // Loading and Updating Transactions
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    //Filtering Transactions
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    //Dropdowns and Popups
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isDataEntryOpen, setIsDataEntryOpen] = useState(false);

    // When Data Entry Cancel Button is clicked
    const handleDataEntryCancel = () => {
        setIsDataEntryOpen(false);
    };

    // When Data Entry Submit Button is Clicked
    const handleDataEntrySubmit = (formData) => {
        axios.post('http://localhost:8080/transactions', formData)
            .then((res) => {
                console.log('Transaction Posted:', res.data);
                // Fetch new Transactions list
                fetchAndUpdateTransactions();
            })
            .catch((err) => {
                console.error('Error submitting data:', err.message);
            });
        setIsDataEntryOpen(false);
    };

    // Call this function when fetching Transactions from the server
    const fetchAndUpdateTransactions = () => {
        axios.get('http://localhost:8080/transactions')
          .then((res) => {
            setTransactions(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err.message);
            setLoading(false);
          });
    };

    // function used for Filtering
    const filteredTransactions = transactions.filter((transaction) => {
        const transactionValues = Object.values(transaction);
        return (
            transactionValues.some((value) =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            ) &&
            (startDate === '' || transaction.date >= startDate) &&
            (endDate === '' || transaction.date <= endDate)
        );
    }); 

    // Function used for turning filteredTransactions into an Excel File
    const handleOnExport = async () => {
        if (filteredTransactions && filteredTransactions.length > 0) {
            const wb = new ExcelJS.Workbook();
            const ws = wb.addWorksheet('Transactions');

            ws.columns = [
                {header: "DATE", key: "date", width: 30},
                {header: "BRANCH", key: "branch", width: 30},
                {header: "NAME OF CUSTOMER", key: "name", width: 30},
                {header: "C-SERIES", key: "series", width: 30},
                {header: "OS", key: "os", width: 30},
                {header: "C-INVOICE", key: "invoice", width: 30},
                {header: "SELLER", key: "seller", width: 30},
                {header: "ASSEMBLER", key: "assembler", width: 30},
                {header: "TOTAL", key: "total", width: 30},
                {header: "VAT SALE", key: "vatsale", width: 30},
                {header: "VAT AMOUNT", key: "vatamount", width: 30},
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

    // Initialize the table
    useEffect(() => {
        setLoading(true);
        fetchAndUpdateTransactions();
    }, []);

    return (
        <div>
            <div className="nav">
                <div className="profile" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
                    <img src={profileIcon} alt="" />
                </div>
                {isProfileDropdownOpen && (
                    <div className="profile-dropdown">
                        <ul>
                            <li>Profile</li>
                            <li>Logout</li>
                        </ul>
                    </div>
                )}
            </div>

            <div className='search'>

                <input className='search-input'
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className='date'>
                    <div className='startDate'>  <p className='startLabel'>Start Date</p>
                        <input
                            type="date"
                            placeholder="Start Date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        /></div>

                    <div className='endDate'>
                        <p className='endLabel'>End Date</p>
                        <input
                            type="date"
                            placeholder="End Date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                </div>
                <button className='transac-btn' onClick={() => setIsDataEntryOpen(!isDataEntryOpen)}>Add Transaction</button></div>
                {isDataEntryOpen && (<DataEntryForm onSubmit={handleDataEntrySubmit} onCancel={handleDataEntryCancel}/>)}
            {loading ? (<Spinner />) : (<table className="transaction-table">
                <thead>
                    <tr>
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
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.map((transaction, index) => (
                        <tr key={transaction._id}>
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
                            {isDataEntryOpen && <td></td>}
                        </tr>
                    ))}
                </tbody>
            </table>)}

            <button className='spreadsheet-btn' onClick={handleOnExport}>Download Spreadsheet</button>

        </div>
    );
}

export default Home;