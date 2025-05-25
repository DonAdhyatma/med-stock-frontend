import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';

function CetakObatMasuk() {
    const { id } = useParams();
    const [barangmasuk, setBarangMasuk] = useState({});

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Cetak Obat Masuk',
        // onAfterPrint: () => alert('Print Success')
    });

    useEffect(() => {
        axios.get(`http://localhost:8081/cetakobatmasuk/${id}`)
            .then(res => {
                console.log(res);
                setBarangMasuk(res.data[0]);
            })
            .catch(err => console.log(err));
    }, [id]);

    useEffect(() => {
        if (Object.keys(barangmasuk).length !== 0) {
            handlePrint();
        }
    }, [handlePrint, barangmasuk]);

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
                                            <br />08565316351
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <hr style={{ "border": "0", "borderStyle": "inset", "borderTop": "1px solid #000" }} />
                        <p align="center">
                            CETAK OBAT MASUK
                        </p>

                        <hr />

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
                                        <th>Total</th>
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
    )
}

export default CetakObatMasuk;
