import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import LayoutPemilik from '../../layout/LayoutPemilik'

function EditObat() {

	const navigate = useNavigate();
	const { id } = useParams();

	const [values, setValues] = useState({
		nama_barang: '',
		harga: '',
		stok: '',
		gol_obat: '',
		keterangan: ''
	});

	useEffect(() => {
		axios.get('http://localhost:8081/editobat/' + id)
			.then(res => {
				setValues({
					nama_barang: res.data[0].nama_barang,
					harga: res.data[0].harga,
					stok: res.data[0].stok,
					gol_obat: res.data[0].gol_obat,
					keterangan: res.data[0].keterangan
				});
			})
			.catch(err => console.log(err));
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues((prevValues) => ({ ...prevValues, [name]: value }));
	};

	const handleUpdate = (event) => {
		event.preventDefault();
		axios.put('http://localhost:8081/updateobat/' + id, values)
			.then(res => {
				Swal.fire({
					icon: "success",
					title: "SUCCESS",
					text: "Data Berhasil Diubah"
				});
				navigate('/obat');
			})
			.catch(err => console.log(err));
	};

	return (
		<div className="wrapper">
			<LayoutPemilik />
			<div className="main-panel">
				<div className="content">
					<div className="page-inner">
						<div className="page-header">
							<h4 className="page-title">Edit Data Obat</h4>
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
									<Link to="#">Edit Data</Link>
								</li>
								<li className="separator">
									<i className="flaticon-right-arrow"></i>
								</li>
								<li className="nav-item">
									<Link to="#">Obat</Link>
								</li>
							</ul>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div className="card">
									<div className="card-header">
										<div className="d-flex align-items-center">
											<h4 className="card-title">Edit Data Obat</h4>
										</div>
									</div>
									<form onSubmit={handleUpdate}>
										<div className="card-body">
											<div className='form-group'>
												<label>Nama Obat</label>
												<input type='text' className='form-control' name='nama_barang' placeholder='Nama Obat ...'
													value={values.nama_barang} onChange={handleChange} required />
											</div>
											<div className="form-group">
												<label>Harga</label>
												<div className="input-group mb-3">
													<div className="input-group-prepend">
														<span className="input-group-text" id="basic-addon1">Rp</span>
													</div>
													<input type="number" className="form-control" placeholder="Harga ..." name='harga'
														value={values.harga} onChange={handleChange} required />
												</div>
											</div>
											<div className="form-group">
												<label>Stok</label>
												<div className="input-group mb-3">
													<input type="number" className="form-control" placeholder="Stok ..." name='stok'
														value={values.stok} onChange={handleChange} required />
													<div className="input-group-prepend">
														<span className="input-group-text" id="basic-addon1">Pcs</span>
													</div>
												</div>
											</div>
											<div className="form-group">
												<label>Golongan Obat</label>
												<select className="form-control" name="gol_obat" value={values.gol_obat} onChange={handleChange} required>
													<option value="" hidden>Pilih Golongan Obat</option>
													<option value="bebas">Bebas</option>
													<option value="bebas terbatas">Bebas Terbatas</option>
													<option value="keras">Keras</option>
													<option value="jamu">Jamu</option>
												</select>
											</div>
											<div className='form-group'>
												<label>Keterangan</label>
												<textarea className='form-control' rows='5' name='keterangan' placeholder='Keterangan ...'
													value={values.keterangan} onChange={handleChange} required ></textarea>
											</div>
										</div>
										<div className='card-footer'>
											<button type='submit' className='btn btn-primary'><i className='fa fa-save'></i> Simpan Perubahan</button> &nbsp;
											<Link to="/obat" className='btn btn-danger'><i className='fa fa-undo'></i> Kembali</Link>
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

export default EditObat
