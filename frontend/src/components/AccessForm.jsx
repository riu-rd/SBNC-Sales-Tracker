import React from 'react';
import "../assets/css/access-form.css";
import { useState } from 'react';

const AccessForm = ({onCancel, onApply, updating_user}) => {

    // Upon clicking submit, send the data back to Home
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const checkedValue = form.querySelector('input[name="value-radio"]:checked').value;
        onApply(checkedValue, updating_user)
    };

  return (
    <div className='modal-overlay'>
    <div className='data-container-access'>
        <h2>Access Level of {updating_user.name}</h2>
        <div className="radio-input">
            <form className='accessForm' onSubmit={handleSubmit}>
                <input value="2" name="value-radio" id="2" type="radio" defaultChecked={updating_user.access === 2}/>
                <label htmlFor="2">Supervisor</label>
                <input value="1" name="value-radio" id="1" type="radio" defaultChecked={updating_user.access === 1}/>
                <label htmlFor="1">Employee</label>
                <button type='submit' id='submitBtn' className='extra-features' value='submit'>Apply</button>
                <button type='reset' id='cancelBtn' className='extra-features' onClick={onCancel} value='reset' >Cancel</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default AccessForm;