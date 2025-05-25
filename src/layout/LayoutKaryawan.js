import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Profile from '../user.png';

function LayoutKaryawan() {
    const [nama_user, setNama] = useState('');
    const [role, setRole] = useState('');

    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                if (res.data.Status === "Success") {
                    setNama(res.data.nama_user);
                    setRole(res.data.role);
                } else {
                    console.log(res.data.Error);
                    navigate('/'); // Redirect to login if not authenticated
                }
            })
            .catch(err => {
                console.log(err);
                navigate('/');
            });
    }, [navigate]);

    const handleLogout = () => {
        axios.post('http://localhost:8081/logout')
            .then(res => {
                Swal.fire({
                    icon: "success",
                    title: "SUCCESS",
                    text: "Logout Berhasil"
                });
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "ERROR",
                    text: "Logout Gagal"
                });
            });
    };

    return (
        <div>
            <div className="main-header" data-background-color="purple">
                <div className="logo-header">
                    <Link to="#" className="logo">
                        <font size="5" style={{ color: "white" }} className="navbar-brand">APOTEK MURAH</font>
                    </Link>
                    <button className="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                            <i className="fa fa-bars"></i>
                        </span>
                    </button>
                    <button className="topbar-toggler more"><i className="fa fa-ellipsis-v"></i></button>
                    <div className="navbar-minimize">
                        <button className="btn btn-minimize btn-rounded">
                            <i className="fa fa-bars"></i>
                        </button>
                    </div>
                </div>
                <nav className="navbar navbar-header navbar-expand-lg"></nav>
            </div>

            <div className="sidebar">
                <div className="sidebar-wrapper scrollbar-inner">
                    <div className="sidebar-content">
                        <div className="user">
                            <div className="avatar-sm float-left mr-2">
                                <img src={Profile} alt="..." className="avatar-img rounded-circle" />
                            </div>
                            <div className="info">
                                <a data-toggle="collapse" href="#collapseExample" aria-expanded="true">
                                    <span>
                                        {nama_user}
                                        <span className="user-level">{role}</span>
                                    </span>
                                </a>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        <ul className="nav">
                            <li className="nav-item">
                                <Link to="/home">
                                    <i className="fas fa-home"></i>
                                    <p>Dashboard</p>
                                </Link>
                            </li>
                            <li className="nav-section">
                                <span className="sidebar-mini-icon">
                                    <i className="fa fa-ellipsis-h"></i>
                                </span>
                                <h4 className="text-section">Features</h4>
                            </li>
                            <li className="nav-item">
                                <Link to="/obatmasuk">
                                    <i className="fas fa-book"></i>
                                    <p>Data Obat Masuk</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/obatkeluar">
                                    <i className="fas fa-truck"></i>
                                    <p>Data Obat Keluar</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt"></i>
                                    <p>Logout</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayoutKaryawan;
