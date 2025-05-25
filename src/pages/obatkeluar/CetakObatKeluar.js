import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';

function CetakObatKeluar() {
    const { id } = useParams();
    const [barangkeluar, setBarangKeluar] = useState({});

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Cetak Obat Keluar',
        // onAfterPrint: () => alert('Print Success')
    });

    useEffect(() => {
        axios.get(`http://localhost:8081/cetakobatkeluar/${id}`)
            .then(res => {
                console.log(res);
                setBarangKeluar(res.data[0]);
            })
            .catch(err => console.log(err));
    }, [id]);

    useEffect(() => {
        if (Object.keys(barangkeluar).length !== 0) {
            handlePrint();
        }
    }, [barangkeluar, handlePrint]);

    return (
        <div className="row" ref={componentRef}>
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <table style={{ "width": "100%" }}>
                            <tbody>
                                <tr>
                                    <td align="center">
                                        <span style={{ "lineHeight": 1.6, "fontWeight": "bold" }}>
                                            APOTEK MURAH BUNG TOMO
                                            <br />SAMARINDA
                                            <br />086537994583
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <hr style={{ "border": "0", "borderStyle": "inset", "borderTop": "1px solid #000" }} />
                        <p align="center">
                            CETAK OBAT KELUAR
                        </p>
                        <hr />
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
    )
}

export default CetakObatKeluar;
