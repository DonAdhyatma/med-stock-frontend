import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';

function CetakAllObatKeluar() {
    const [data, setData] = useState([]);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Laporan Obat Keluar',
        // onAfterPrint: () => alert('Print Success')
    });

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            handlePrint();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const fetchData = async () => {
        await axios.get('http://localhost:8081/cetakallobatkeluar')
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="row" ref={componentRef}>
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <table style={{ width: "100%" }}>
                            <tbody>
                                <tr>
                                    <td align="center">
                                        <span style={{ lineHeight: 1.6, fontWeight: "bold" }}>
                                            APOTEK MURAH BUNG TOMO
                                            <br />SAMARINDA
                                            <br />08653254523
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <hr style={{ border: "0", borderStyle: "inset", borderTop: "1px solid #000" }} />
                        <p align="center">
                            CETAK LAPORAN OBAT KELUAR
                        </p>

                        <hr />

                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Customer</th>
                                        <th>Obat</th>
                                        <th>Tanggal Keluar</th>
                                        <th>Stok Keluar</th>
                                        <th>Tanggal Kedaluwarsa</th>
                                        <th>Total Pendapatan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((row, key) => (
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>{row.nama_customer}</td>
                                            <td>{row.nama_barang}</td>
                                            <td>{moment(row.tgl_keluar).format('DD/MM/YYYY')}</td>
                                            <td>{row.stok_keluar} Pcs</td>
                                            <td>{moment(row.tgl_kedaluwarsa).format('DD/MM/YYYY')}</td>
                                            <td>Rp. {row.total.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CetakAllObatKeluar;
