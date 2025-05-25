import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import LayoutPemilik from '../../layout/LayoutPemilik'

function EditUser() {

	const navigate = useNavigate();
	const { id } = useParams();

	const [values, setValues] = useState({
		nama_user: '',
		username: '',
		password: '',
		role: ''
	});

	useEffect(() => {
		axios.get(`http://localhost:8081/edituser/${id}`)
			.then(res => {
				setValues({
					nama_user: res.data[0].nama_user,
					username: res.data[0].username,
					password: '', // initialize password as empty for security reasons
					role: res.data[0].role
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
		axios.put(`http://localhost:8081/updateuser/${id}`, values)
			.then(res => {
				console.log(res)
				Swal.fire({
					icon: "success",
					title: "SUCCESS",
					text: "Data Berhasil Diubah"
				});
				navigate('/user');
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
							<h4 className="page-title">Edit Data User</h4>
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
									<Link to="#">User</Link>
								</li>
							</ul>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div className="card">
									<div className="card-header">
										<div className="d-flex align-items-center">
											<h4 className="card-title">Edit Data User</h4>
										</div>
									</div>
									<form onSubmit={handleUpdate}>
										<div className="card-body">
											<div className='form-group'>
												<label>Nama Lengkap</label>
												<input type='text' className='form-control' name='nama_user' placeholder='Nama Lengkap ...'
													value={values.nama_user} onChange={handleChange} required />
											</div>
											<div className='form-group'>
												<label>Username</label>
												<input type='text' className='form-control' name='username' placeholder='Username ...'
													value={values.username} onChange={handleChange} required autoComplete="username" />
											</div>
											<div className='form-group'>
												<label>Password</label>
												<input type='password' className='form-control' name='password' placeholder='Password ...'
													value={values.password} onChange={handleChange} required autoComplete="username" />
											</div>
											<div className='form-group'>
												<label>Role</label>
												<select className='form-control' name='role' value={values.role} onChange={handleChange} required>
													<option value="pemilik">Pemilik</option>
													<option value="karyawan">Karyawan</option>
												</select>
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

export default EditUser
