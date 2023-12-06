import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import { Link } from "react-router-dom";
// @ts-ignore
import profileIcon from "../assets/images/account (1).png";
// @ts-ignore
import banner from "../assets/images/sbnc_banner.png";
import "../assets/css/style.css";
import axios from "../axios-config.js";

function Profile() {
    const navigate = useNavigate();
    const [defaultStartDate, setDefaultStartDate] = useState(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            .toISOString()
            .split("T")[0]
    );
    const [defaultEndDate, setDefaultEndDate] = useState(
        new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
            .toISOString()
            .split("T")[0]
    );
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        axios
            .get("/user", { withCredentials: true })
            .then((res) => {
                setDefaultStartDate(
                    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                        .toISOString()
                        .split("T")[0]
                );
                setDefaultEndDate(
                    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
                        .toISOString()
                        .split("T")[0]
                );
                if (res.data) {
                    setCurrentUser(res.data.user);
                }
            })
            .catch((err) => {
                navigate("/");
                console.error(err.message);
            });
    }, [navigate]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleLogout = () => {
        axios
            .delete("/logout", { withCredentials: true })
            .then((res) => {
                console.log("Logout successful:", res.data);
                navigate("/");
            })
            .catch((err) => {
                console.error("Error during logout:", err.message);
            });
    };

    const getRole = () => {
        // @ts-ignore
        switch (currentUser.access) {
            case 1:
                return "Employee";
            case 2:
                return "Supervisor";
            case 3:
                return "Admin";
        }
    };

    const handlePasswordChange = async () => {
        try {
            const response = await axios.post(
                "/changepassword",
                {
                    currentPassword,
                    newPassword,
                    confirmPassword,
                },
                { withCredentials: true }
            );
            setErrorMessage(response.data.message);
            setTimeout(() => {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setIsChangePasswordOpen(false);
                setErrorMessage("");
            }, 800);
        } catch (error) {
            console.error("Error changing password:", error.message);
            setErrorMessage(error.response?.data.message || "An error occurred");
        }
    };

    return (
        <div>
            <div className="nav">
                <img className="banner" src={banner} alt="" />
                <Link to="/home">
                    <button className="btn-nav">Transactions</button>
                </Link>
                <Link to="/user-management">
                    <button className="btn-nav">Users</button>
                </Link>
                <div
                    className="profile"
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                    <img src={profileIcon} alt="" />
                </div>
                <div className="date-display">
                    <h3>{currentDateTime.toLocaleString()}</h3>
                </div>

                {isProfileDropdownOpen && (
                    <div className="profile-dropdown">
                        <ul>
                            <Link
                                to="/profile"
                                style={{ textDecoration: "none", color: "black" }}
                            >
                                <li>Profile</li>
                            </Link>
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="container">
                <div className="profile-form">
                    <h1 className="center">Your Profile</h1>
                    <div className="profile-info">
                        <p>Name: {// @ts-ignore
                            currentUser.name}</p>
                        <p>Email: {// @ts-ignore
                            currentUser.email}</p>
                        <p>Branch: {// @ts-ignore
                            currentUser.branch}</p>
                        <p>Access: {getRole()}</p>
                    </div>
                    <hr className="divider" />
                    <div className="status">
                        <p>
                            Verified: {// @ts-ignore
                                currentUser.verified ? "Verified" : "Not Verified"}
                        </p>
                        <p>
                            Approved: {// @ts-ignore
                                currentUser.approved ? "Approved" : "Not Approved"}
                        </p>
                    </div>
                    <hr className="divider2" />
                    <div className="buttons">
                        <div className="password">
                            <p>
                                Password:{" "}
                                <button
                                    className="pass-btn"
                                    onClick={() => setIsChangePasswordOpen(true)}
                                >
                                    Change Password
                                </button>{" "}
                            </p>
                        </div>
                        <div className="close-btn">

                            <Link to="/home">
                                <button className="closeBtn">Close</button>
                            </Link>
                        </div>
                    </div>

                    {isChangePasswordOpen && (
                        <>
                            <div
                                className="modal-overlay"
                            >
                            <div className="modal">

                                <h2>Change Password</h2>
                                <form>
                                    <div className="current-password">
                                        <label>Current Password:</label>
                                        <input
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="new-password">
                                        <label>New Password:</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="confirm-password">
                                        <label>Confirm Password:</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    {errorMessage && (
                                        <div className="error-message">
                                            <p>{errorMessage}</p>
                                        </div>
                                    )}
                                    <div className="btns">
                                        <button
                                            type="button"
                                            onClick={handlePasswordChange}
                                            className="confirm-btn"
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsChangePasswordOpen(false)}
                                            className="cancel-btn"
                                        >
                                            Cancel
                                        </button>
                                    </div>

                                </form>
                            </div>
                            </div>
                        </>
                    )}


                </div>
            </div>
        </div>
    );
}

export default Profile;
