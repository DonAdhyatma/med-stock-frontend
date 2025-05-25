import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LayoutGudang from '../../layout/LayoutKaryawan';
import axios from 'axios';
import moment from 'moment';

function DetailObatKeluar() {
    const { id } = useParams();
    const [barangkeluar, setBarangKeluar] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8081/detailobatkeluar/' + id)
            .then(res => {
                console.log(res);
                setBarangKeluar(res.data[0]);
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className="wrapper">
            <LayoutGudang />
            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">
                        <div className="page-header">
                            <h4 className="page-title">Detail Data Obat Keluar</h4>
                            <ul className="breadcrumbs">
                                <li className="nav-home">
                                    <Link to="#">
                                        <i className="flaticon-home"></i>
                                    </Link>
                                </li>
                                <li className="separator">
                                    <i className="flaticon-right-arrow"></i>
                                </li>
                                <li className="nav-item">
                                    <Link to="#">Detail Data</Link>
                                </li>
                                <li className="separator">
                                    <i className="flaticon-right-arrow"></i>
                                </li>
                                <li className="nav-item">
                                    <Link to="#">Obat Keluar</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <h4 className="card-title">Detail Data Obat Keluar</h4>
                                            <Link className="btn btn-success btn-round ml-auto" to="/obatkeluar">
                                                <i className="fa fa-undo"></i>
                                                Kembali
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='table-responsive'>
                                                    <table className='table'>
                                                        <tbody>
                                                            <tr>
                                                                <th>Tanggal Keluar</th>
                                                                <td>: {moment(barangkeluar.tgl_keluar).format('DD/MM/YYYY')}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Nama Customer</th>
                                                                <td>: {barangkeluar.nama_customer}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className='table-responsive'>
                                                    <table className='table'>
                                                        <tbody>
                                                            <tr>
                                                                <th>No Handphone</th>
                                                                <td>: {barangkeluar.nohp_customer}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Alamat</th>
                                                                <td>: {barangkeluar.alamat_customer}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='table-responsive'>
                                            <table className='table table-bordered'>
                                                <thead>
                                                    <tr>
                                                        <th>Nama Obat</th>
                                                        <th>Harga</th>
                                                        <th>Stok Keluar</th>
                                                        <th>Tanggal Kedaluwarsa</th>
                                                        <th>Total Pendapatan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{barangkeluar.nama_barang}</td>
                                                        <td>Rp. {parseInt(barangkeluar.harga).toLocaleString()}</td>
                                                        <td>{barangkeluar.stok_keluar} Pcs</td>
                                                        <td>{moment(barangkeluar.tgl_kedaluwarsa).format('DD/MM/YYYY')}</td>
                                                        <td>Rp. {parseInt(barangkeluar.total).toLocaleString()}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailObatKeluar;
