import React from 'react';
import '../assets/css/operations-button.css';

const EditButton = ({onEdit}) => {
  return (
    <button className="btn edit" onClick={onEdit}>
      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='icon'>
        <path d="M14 2L18 6L7 17L3 17L3 13L14 2Z"></path>
        <line x1="3" y1="22" x2="21" y2="22"></line>
      </svg>
    </button>
  );
}

export default EditButton;
