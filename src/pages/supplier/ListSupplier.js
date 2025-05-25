import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LayoutPemilik from '../../layout/LayoutPemilik'
import axios from 'axios'
import Swal from 'sweetalert2'

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

function ListSupplier() {

	const [data, setData] = useState([]);

	useEffect(() => {
		fetchData()
		$(document).ready(function () {
			setTimeout(function () {
				$('#example').DataTable();
			}, 1000);
		});
	}, [])

	const fetchData = async () => {
		await axios.get('http://localhost:8081/supplier')
			.then(res => setData(res.data))
			.catch(err => console.log(err));
	}

	const handleDelete = async (id) => {
		const isConfirm = await Swal.fire({
			title: 'Apakah kamu yakin?',
			text: 'Kamu tidak dapat mengembalikan data ini lagi!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Ya, Hapus!',
			cancelButtonText: 'Batal'
		}).then((result) => {
			return result.isConfirmed
		});

		if (!isConfirm) {
			return;
		}

		axios.delete('http://localhost:8081/deletesupplier/' + id)
			.then(res => {
				console.log(res)
				Swal.fire({
					icon: "success",
					title: "SUCCESS",
					text: "Data Berhasil Dihapus"
				})
				fetchData()
			}).catch(err => console.log(err));
	}

	return (
		<div className="wrapper">
			<LayoutPemilik />
			<div className="main-panel">
				<div className="content">
					<div className="page-inner">
						<div className="page-header">
							<h4 className="page-title">Data Supplier</h4>
							<ul className="breadcrumbs">
								<li className="nav-home">
									<Link href="#">
										<i className="flaticon-home"></i>
									</Link>
								</li>
								<li className="separator">
									<i className="flaticon-right-arrow"></i>
								</li>
								<li className="nav-item">
									<Link href="#">Data</Link>
								</li>
								<li className="separator">
									<i className="flaticon-right-arrow"></i>
								</li>
								<li className="nav-item">
									<Link href="#">Supplier</Link>
								</li>
							</ul>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div className="card">
									<div className="card-header">
										<div className="d-flex align-items-center">
											<h4 className="card-title">Data Supplier</h4>
											<Link className="btn btn-success btn-round ml-auto" to="/createSupplier">
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
														<th>Supplier</th>
														<th>No Handphone</th>
														<th>Email</th>
														<th>Action</th>
													</tr>
												</thead>
												<tbody>
													{data.map((row, key) => (
														<tr key={key}>
															<td>{key + 1}</td>
															<td>{row.nama_supplier}</td>
															<td>{row.nohp_supplier}</td>
															<td>{row.email_supplier}</td>
															<td>
																<Link to={`/editSupplier/${row.id}`} className='btn btn-xs btn-primary'><i className='fa fa-edit'></i> Ubah</Link> &nbsp;
																<button onClick={() => handleDelete(row.id)} className='btn btn-xs btn-danger'><i className='fa fa-trash'></i> Hapus</button>
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

export default ListSupplier
