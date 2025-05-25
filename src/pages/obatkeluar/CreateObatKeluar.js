import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LayoutKaryawan from '../../layout/LayoutKaryawan';
import axios from 'axios';
import Swal from 'sweetalert2';

function CreateObatKeluar() {

	const navigate = useNavigate();

	const [values, setValues] = useState({
		id_customer: '',
		id_barang: '',
		tgl_keluar: '',
		stok_keluar: '',
		tgl_kedaluwarsa: ''
	});

	const [barangList, setBarang] = useState([]);
	const [customerList, setCustomer] = useState([]);

	const fetchBarang = async () => {
		const response = await axios.get('http://localhost:8081/getobat');

		setBarang(response.data.map(barang => ({
			label: barang.nama_barang,
			value: barang.id
		})));
	};

	useEffect(() => {
		fetchBarang();
	}, []);

	const fetchCustomer = async () => {
		const response = await axios.get('http://localhost:8081/getcustomer');

		setCustomer(response.data.map(customer => ({
			label: customer.nama_customer,
			value: customer.id
		})));
	};

	useEffect(() => {
		fetchCustomer();
	}, []);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({
			...values,
			[name]: value
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.post('http://localhost:8081/tambahobatkeluar', values)
			.then(res => {
				if (res.data.Status === "Success") {
					Swal.fire({
						icon: "success",
						title: "SUCCESS",
						text: "Data Berhasil Disimpan"
					});
					navigate('/obatkeluar');
				} else {
					Swal.fire({
						icon: "error",
						title: "ERROR",
						text: res.data.Error
					});
				}
			})
			.catch(err => console.log(err));
	};

	return (
		<div className="wrapper">
			<LayoutKaryawan />
			<div className="main-panel">
				<div className="content">
					<div className="page-inner">
						<div className="page-header">
							<h4 className="page-title">Create Data Obat Keluar</h4>
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
									<Link to="#">Create Data</Link>
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
											<h4 className="card-title">Create Data Obat Keluar</h4>
										</div>
									</div>
									<form onSubmit={handleSubmit}>
										<div className="card-body">
											<div className='form-group'>
												<label>Nama Customer</label>
												<select className='form-control' name='id_customer' onChange={handleChange} required>
													<option value="" hidden>-- Pilih Customer --</option>
													{
														customerList.map(customer =>
															<option key={customer.value} value={customer.value}> {customer.label}</option>
														)}
												</select>
											</div>
											<div className='form-group'>
												<label>Nama Obat</label>
												<select className='form-control' name='id_barang' onChange={handleChange} required>
													<option value="" hidden>-- Pilih Obat --</option>
													{
														barangList.map(barang =>
															<option key={barang.value} value={barang.value}> {barang.label}</option>
														)}
												</select>
											</div>
											<div className='form-group'>
												<label>Tgl Keluar</label>
												<input type='date' className='form-control' name='tgl_keluar'
													onChange={handleChange} required />
											</div>
											<div className="form-group">
												<label>Stok Keluar</label>
												<div className="input-group mb-3">
													<input type="number" className="form-control" placeholder="Stok Keluar ..." name='stok_keluar'
														onChange={handleChange} required />
													<div className="input-group-prepend">
														<span className="input-group-text" id="basic-addon1">Pcs</span>
													</div>
												</div>
											</div>
											<div className='form-group'>
												<label>Tgl Kedaluwarsa</label>
												<input type='date' className='form-control' name='tgl_kedaluwarsa'
													onChange={handleChange} required />
											</div>
										</div>
										<div className='card-footer'>
											<button type='submit' className='btn btn-primary'><i className='fa fa-save'></i> Simpan Perubahan</button> &nbsp;
											<Link to="/obatkeluar" className='btn btn-danger'><i className='fa fa-undo'></i> Kembali</Link>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateObatKeluar;
