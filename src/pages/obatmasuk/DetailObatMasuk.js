import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LayoutKaryawan from '../../layout/LayoutKaryawan';
import axios from 'axios';
import moment from 'moment';

function DetailObatMasuk() {
    const { id } = useParams();
    const [barangmasuk, setBarangMasuk] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8081/detailobatmasuk/${id}`)
            .then(res => {
                console.log(res);
                setBarangMasuk(res.data[0]);
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className="wrapper">
            <LayoutKaryawan />
            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">
                        <div className="page-header">
                            <h4 className="page-title">Detail Data Obat Masuk</h4>
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
                                    <Link to="#">Obat Masuk</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <h4 className="card-title">Detail Data Obat Masuk</h4>
                                            <Link className="btn btn-success btn-round ml-auto" to="/obatmasuk">
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
                                                                <th>Tanggal Masuk</th>
                                                                <td>: {moment(barangmasuk.tgl_masuk).format('DD/MM/YYYY')}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Nama Supplier</th>
                                                                <td>: {barangmasuk.nama_supplier}</td>
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
                                                                <td>: {barangmasuk.nohp_supplier}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Alamat</th>
                                                                <td>: {barangmasuk.alamat_supplier}</td>
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
                                                        <th>Stok Masuk</th>
                                                        <th>Tanggal Kedaluwarsa</th>
                                                        <th>Total Biaya</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{barangmasuk.nama_barang}</td>
                                                        <td>Rp. {parseInt(barangmasuk.harga).toLocaleString()}</td>
                                                        <td>{barangmasuk.stok_masuk} Pcs</td>
                                                        <td>{moment(barangmasuk.tgl_kedaluwarsa).format('DD/MM/YYYY')}</td>
                                                        <td>Rp. {parseInt(barangmasuk.total).toLocaleString()}</td>
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
    );
}

export default DetailObatMasuk;
