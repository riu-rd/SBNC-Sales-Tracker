import React from 'react';
import '../assets/css/profile-page.css';
import profileIcon from '../assets/images/account (2).png';

const ProfilePage = () => {
    
  return (
    <div class = "profile-container">
        <img src={profileIcon} alt="" />
        <h1>Sample User</h1><br></br><br></br><br></br>
        <h4>Email Address</h4>
        <h5>sample.user@gmail.com</h5><br></br><br></br><br></br>
        <h4>Contact No.</h4>
        <h5>0917 *** ****</h5>
    </div>
  )
}

export default ProfilePage;