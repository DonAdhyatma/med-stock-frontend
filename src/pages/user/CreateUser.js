import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LayoutPemilik from '../../layout/LayoutPemilik'
import axios from 'axios'
import Swal from 'sweetalert2'

function CreateUser() {

	const [values, setValues] = useState({
		nama_user: '',
		username: '',
		password: '',
		role: ''
	})

	const [errors, setErrors] = useState({})

	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();

		// Validate form inputs
		const newErrors = {};
		if (!values.nama_user) newErrors.nama_user = 'Nama Lengkap is required';
		if (!values.username) newErrors.username = 'Username is required';
		if (!values.password) newErrors.password = 'Password is required';
		if (!values.role) newErrors.role = 'Role is required';

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		axios.post('http://localhost:8081/tambahuser', values)
			.then(res => {
				console.log(res)
				Swal.fire({
					icon: "success",
					title: "SUCCESS",
					text: "Data Berhasil Disimpan"
				})
				navigate('/user')
			})
			.catch(err => console.log(err));
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value
		});
		setErrors({
			...errors,
			[name]: ''
		});
	}

	return (
		<div className="wrapper">
			<LayoutPemilik />

			<div className="main-panel">
				<div className="content">
					<div className="page-inner">
						<div className="page-header">
							<h4 className="page-title">Create Data User</h4>
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
									<Link to="#">User</Link>
								</li>
							</ul>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div className="card">
									<div className="card-header">
										<div className="d-flex align-items-center">
											<h4 className="card-title">Create Data User</h4>
										</div>
									</div>
									<form onSubmit={handleSubmit}>
										<div className="card-body">
											<div className='form-group'>
												<label>Nama Lengkap</label>
												<input type='text' className={`form-control ${errors.nama_user ? 'is-invalid' : ''}`} name='nama_user' placeholder='Nama Lengkap ...'
													onChange={handleChange} required autoComplete="name" />
												{errors.nama_user && <div className="invalid-feedback">{errors.nama_user}</div>}
											</div>
											<div className='form-group'>
												<label>Username</label>
												<input type='text' className={`form-control ${errors.username ? 'is-invalid' : ''}`} name='username' placeholder='Username ...'
													onChange={handleChange} required autoComplete="username" />
												{errors.username && <div className="invalid-feedback">{errors.username}</div>}
											</div>
											<div className='form-group'>
												<label>Password</label>
												<input type='password' className={`form-control ${errors.password ? 'is-invalid' : ''}`} name='password' placeholder='Password ...'
													onChange={handleChange} required autoComplete="current-password" />
												{errors.password && <div className="invalid-feedback">{errors.password}</div>}
											</div>
											<div className='form-group'>
												<label>Role</label>
												<select className={`form-control ${errors.role ? 'is-invalid' : ''}`} name='role' onChange={handleChange} required>
													<option value="" hidden>-- Pilih Role --</option>
													<option value="pemilik">Pemilik</option>
													<option value="karyawan">Karyawan</option>
												</select>
												{errors.role && <div className="invalid-feedback">{errors.role}</div>}
											</div>
										</div>
										<div className='card-footer'>
											<button type='submit' className='btn btn-primary'><i className='fa fa-save'></i> Simpan Perubahan</button> &nbsp;
											<Link to="/user" className='btn btn-danger'><i className='fa fa-undo'></i> Kembali</Link>
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

export default CreateUser
