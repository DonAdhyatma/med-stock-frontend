import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutKaryawan from '../../layout/LayoutKaryawan';
import axios from 'axios';
import moment from 'moment';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';

function ListObatKeluar() {

	const [data, setData] = useState([]);

	useEffect(() => {
		fetchData();
		$(document).ready(function () {
			setTimeout(function () {
				$('#example').DataTable();
			}, 1000);
		});
	}, []);

	const fetchData = async () => {
		await axios.get('http://localhost:8081/obatkeluar')
			.then(res => setData(res.data))
			.catch(err => console.log(err));
	}

	return (
		<div className="wrapper">
			<LayoutKaryawan />

			<div className="main-panel">
				<div className="content">
					<div className="page-inner">
						<div className="page-header">
							<h4 className="page-title">Data Obat Keluar</h4>
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
									<Link to="#">Data</Link>
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
											<h4 className="card-title">Data Obat Keluar</h4>
											<Link className="btn btn-success btn-round ml-auto" to="/createObatKeluar">
												<i className="fa fa-plus"></i>
												Tambah Data
											</Link>
										</div>
									</div>
									<div className="card-body">
										<div className="table-responsive">
											<table id='example' className="display table table-striped table-hover" >
												<thead>
													<tr>
														<th>No</th>
														<th>Customer</th>
														<th>Nama Obat</th>
														<th>Tgl Keluar</th>
														<th>Stok Keluar</th>
														<th>Tgl Kedaluwarsa</th>
														<th>Total Pendapatan</th>
														<th>Action</th>
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
															<td>
																<Link to={`/detailObatKeluar/${row.id}`} className='btn btn-xs btn-danger'><span className='fw-bold'>Detail</span></Link>&nbsp;
																<Link to={`/cetakObatKeluar/${row.id}`} target='_blank' className='btn btn-xs btn-primary'><i className='fa fa-print'></i></Link>
															</td>
														</tr>
													))}
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

export default ListObatKeluar;
