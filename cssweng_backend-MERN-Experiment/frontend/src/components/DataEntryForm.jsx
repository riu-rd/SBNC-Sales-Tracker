import React from 'react';
import { useState } from 'react';
import '../assets/css/data-entry-form.css';

const DataEntryForm = ({onSubmit, onCancel, branch, currUser}) => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        branch: branch,
        addedby: currUser,
        name: '',
        series: '',
        os: '',
        invoice: '',
        seller: '',
        assembler: '',
        total: '',
        vatsale: 0.0,
        vatamount: 0.0,
    });

    // Function is called whenever data in the form changes
    const handleChange = (e) => {
        let value;
        const commonProperties = ["date", "branch", "name", "seller", "assembler", "addedby"];
        const numericProperties = ["series", "os", "invoice"];

        // Make sure that values match their data type
        if (commonProperties.includes(e.target.name)) {
            value = e.target.value;
        }
        else if (numericProperties.includes(e.target.name)) {
            value = parseInt(e.target.value);
        }
        else {
            value = parseFloat(e.target.value);
        }

        const updatedFormData = {
            ...formData,
            [e.target.name]: value
        };

        // If the value in Total changes, automatically update vatsale and vatamount
        if (e.target.name === "total") {
            const total = parseFloat(value);
            const rate = 0.8929;
            const vatsale = parseFloat((total * rate).toFixed(2));
            const vatamount = parseFloat((total - vatsale).toFixed(2));
    
            updatedFormData.vatsale = vatsale;
            updatedFormData.vatamount = vatamount;
        }

        setFormData(updatedFormData);
    };

    // Upon clicking submit, send the data back to Home
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

  return (
    <div className='data-container'>
        <h2>Data Entry Form</h2>
        <form id='addForm' onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor='addDate'>Date: </label>
                <input type='date' id="addDate" name='date' value={formData.date} onChange={handleChange} required/>
                <label htmlFor='addBranch'>Branch: </label>
                <input type='text' id="addBranch" name='branch' value={formData.branch} onChange={handleChange} required disabled/>
                <label htmlFor='addAddedBy'>Added By: </label>
                <input type='text' id="addAddedBy" name='addedby' value={formData.addedby} onChange={handleChange} required disabled/>
            </fieldset>
            <fieldset>
                <label htmlFor='addSeries'>C-Series: </label>
                <input type='number' id="addSeries" name='series' value={formData.series} onChange={handleChange} required/>
                <label htmlFor='addOS'>OS: </label>
                <input type='number' id="addOS" name='os' value={formData.os} onChange={handleChange} required/>
                <label htmlFor='addInvoice'>C-Invoice: </label>
                <input type='number' id="addInvoice" name='invoice' value={formData.invoice} onChange={handleChange} required/>
            </fieldset>
            <fieldset>
                <label htmlFor='addName'>Customer Name: </label>
                <input type='text' id="addName" name='name' value={formData.name} onChange={handleChange} required/>
                <label htmlFor='addSeller'>Seller: </label>
                <input type='text' id="addSeller" name='seller' value={formData.seller} onChange={handleChange} required/>
                <label htmlFor='addAssembler'>Assembler: </label>
                <input type='text' id="addAssembler" name='assembler' value={formData.assembler} onChange={handleChange} required/>
            </fieldset>
            <fieldset>
                <label htmlFor='addTotal'>Total: </label>
                <input type='number' id="addTotal" name='total' step="0.01" value={formData.total} onChange={handleChange} required/>
                <label htmlFor='addVatsale'>VAT Sale: </label>
                <input type='number' id="addVatsale" name='vatsale' step="0.01" value={formData.vatsale} required disabled/>
                <label htmlFor='addVatamount'>VAT Amount: </label>
                <input type='number' id="addVatamount" name='vatamount' step="0.01" value={formData.vatamount} required disabled/>
            </fieldset>
            <button type='submit' id='submitBtn' value='submit'>Submit</button>
            <button type='reset' id='cancelBtn' value='reset' onClick={onCancel}>Cancel</button>
        </form>
    </div>
  )
}

export default DataEntryForm