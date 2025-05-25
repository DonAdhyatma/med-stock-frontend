import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import LayoutPemilik from '../../layout/LayoutPemilik'

function EditCustomer() {

	const navigate = useNavigate();
	const { id } = useParams();

	const [values, setValues] = useState({
		nama_customer: '',
		nohp_customer: '',
		email_customer: '',
		alamat_customer: ''
	})

	useEffect(() => {
		axios.get(`http://localhost:8081/editcustomer/${id}`)
			.then(res => {
				console.log(res)
				setValues({
					nama_customer: res.data[0].nama_customer,
					nohp_customer: res.data[0].nohp_customer,
					email_customer: res.data[0].email_customer,
					alamat_customer: res.data[0].alamat_customer
				});
			})
			.catch(err => console.log(err));
	}, [id])

	const handleUpdate = (event) => {
		event.preventDefault();
		axios.put(`http://localhost:8081/updatecustomer/${id}`, values)
			.then(res => {
				console.log(res)
				Swal.fire({
					icon: "success",
					title: "SUCCESS",
					text: "Data Berhasil Diubah"
				})
				navigate('/customer')
			})
			.catch(err => console.log(err));
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues((prevValues) => ({ ...prevValues, [name]: value }));
	};

	return (
		<div className="wrapper">
			<LayoutPemilik />

			<div className="main-panel">
				<div className="content">
					<div className="page-inner">
						<div className="page-header">
							<h4 className="page-title">Edit Data Customer</h4>
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
									<Link to="#">Customer</Link>
								</li>
							</ul>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div className="card">
									<div className="card-header">
										<div className="d-flex align-items-center">
											<h4 className="card-title">Edit Data Customer</h4>
										</div>
									</div>
									<form onSubmit={handleUpdate}>
										<div className="card-body">
											<div className='form-group'>
												<label>Nama Customer</label>
												<input type='text' className='form-control' name='nama_customer' placeholder='Nama Customer ...'
													value={values.nama_customer} onChange={handleChange} required />
											</div>
											<div className='form-group'>
												<label>No Handphone</label>
												<input type='number' className='form-control' name='nohp_customer' placeholder='No Handphone ...'
													value={values.nohp_customer} onChange={handleChange} required />
											</div>
											<div className='form-group'>
												<label>Email</label>
												<input type='email' className='form-control' name='email_customer' placeholder='Email ...'
													value={values.email_customer} onChange={handleChange} required />
											</div>
											<div className='form-group'>
												<label>Alamat</label>
												<textarea className='form-control' rows='5' name='alamat_customer' placeholder='Alamat ...'
													value={values.alamat_customer} onChange={handleChange} required ></textarea>
											</div>
										</div>
										<div className='card-footer'>
											<button type='submit' className='btn btn-primary'><i className='fa fa-save'></i>Simpan Perubahan</button> &nbsp;
											<Link to="/customer" className='btn btn-danger'><i className='fa fa-undo'></i> Kembali</Link>
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

export default EditCustomer
