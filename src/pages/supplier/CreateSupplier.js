import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LayoutPemilik from '../../layout/LayoutPemilik'
import axios from 'axios'
import Swal from 'sweetalert2'

function CreateSupplier() {

	const [values, setValues] = useState({
		nama_supplier: '',
		nohp_supplier: '',
		email_supplier: '',
		alamat_supplier: ''
	})

	const navigate = useNavigate();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({
			...values,
			[name]: value
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.post('http://localhost:8081/tambahsupplier', values)
			.then(res => {
				console.log(res)
				Swal.fire({
					icon: "success",
					title: "SUCCESS",
					text: "Data Berhasil Disimpan"
				})
				navigate('/supplier')
			})
			.catch(err => console.log(err));
	}

	return (
		<div className="wrapper">
			<LayoutPemilik />

			<div className="main-panel">
				<div className="content">
					<div className="page-inner">
						<div className="page-header">
							<h4 className="page-title">Create Data Supplier</h4>
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
									<Link href="#">Create Data</Link>
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
											<h4 className="card-title">Create Data Supplier</h4>
										</div>
									</div>
									<form onSubmit={handleSubmit}>
										<div className="card-body">
											<div className='form-group'>
												<label>Nama Supplier</label>
												<input type='text' className='form-control' name='nama_supplier' placeholder='Nama Supplier ...'
													onChange={handleChange} required />
											</div>
											<div className='form-group'>
												<label>No Handphone</label>
												<input type='number' className='form-control' name='nohp_supplier' placeholder='No Handphone ...'
													onChange={handleChange} required />
											</div>
											<div className='form-group'>
												<label>Email</label>
												<input type='email' className='form-control' name='email_supplier' placeholder='Email ...'
													onChange={handleChange} required />
											</div>
											<div className='form-group'>
												<label>Alamat</label>
												<textarea className='form-control' rows='5' name='alamat_supplier' placeholder='Alamat ...'
													onChange={handleChange} required ></textarea>
											</div>
										</div>
										<div className='card-footer'>
											<button type='submit' className='btn btn-primary'><i className='fa fa-save'></i> Simpan Perubahan</button> &nbsp;
											<Link to="/supplier" className='btn btn-danger'><i className='fa fa-undo'></i> Kembali</Link>
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

export default CreateSupplier
