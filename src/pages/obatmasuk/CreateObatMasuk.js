import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LayoutKaryawan from '../../layout/LayoutKaryawan'
import axios from 'axios'
import Swal from 'sweetalert2'

function CreateObatMasuk() {

	const navigate = useNavigate();

	const [values, setValues] = useState({
		id_supplier: '',
		id_barang: '',
		tgl_masuk: '',
		stok_masuk: '',
		tgl_kedaluwarsa: '' // Tambahkan state untuk tanggal kedaluwarsa
	})

	const [barangList, setBarang] = useState([]);
	const [supplierList, setSupplier] = useState([]);

	const fetchBarang = async () => {
		const response = await axios.get('http://localhost:8081/getobat');

		setBarang(response.data.map(barang => ({
			label: barang.nama_barang,
			value: barang.id
		})))
	}

	useEffect(() => {
		fetchBarang();
	}, []);

	const fetchSupplier = async () => {
		const response = await axios.get('http://localhost:8081/getsupplier');

		setSupplier(response.data.map(supplier => ({
			label: supplier.nama_supplier,
			value: supplier.id
		})))
	}

	useEffect(() => {
		fetchSupplier();
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
		axios.post('http://localhost:8081/tambahobatmasuk', values)
			.then(res => {
				if (res.data.Status === "Success") {
					Swal.fire({
						icon: "success",
						title: "SUCCESS",
						text: "Data Berhasil Disimpan"
					})
					navigate('/obatmasuk');
				} else {
					Swal.fire({
						icon: "error",
						title: "ERROR",
						text: res.data.Error
					})
				}
			})
			.then(err => console.log(err));
	}

	return (
		<div className="wrapper">
			<LayoutKaryawan />
			<div className="main-panel">
				<div className="content">
					<div className="page-inner">
						<div className="page-header">
							<h4 className="page-title">Create Data Obat Masuk</h4>
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
									<Link to="#">Obat Masuk</Link>
								</li>
							</ul>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div className="card">
									<div className="card-header">
										<div className="d-flex align-items-center">
											<h4 className="card-title">Create Data Obat Masuk</h4>
										</div>
									</div>
									<form onSubmit={handleSubmit}>
										<div className="card-body">
											<div className='form-group'>
												<label>Nama Supplier</label>
												<select className='form-control' name='id_supplier' onChange={handleChange} required>
													<option value="" hidden>-- Pilih Supplier --</option>
													{
														supplierList.map(supplier =>
															<option key={supplier.value} value={supplier.value}> {supplier.label}</option>
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
												<label>Tgl Masuk</label>
												<input type='date' className='form-control' name='tgl_masuk'
													onChange={handleChange} required />
											</div>
											<div className="form-group">
												<label>Stok Masuk</label>
												<div className="input-group mb-3">
													<input type="number" className="form-control" placeholder="Stok Masuk ..." name='stok_masuk'
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
											<Link to="/obatmasuk" className='btn btn-danger'><i className='fa fa-undo'></i> Kembali</Link>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreateObatMasuk
