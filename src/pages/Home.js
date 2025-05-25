import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutPemilik from '../layout/LayoutPemilik';
import LayoutKaryawan from '../layout/LayoutKaryawan';
import axios from 'axios';

function Home() {
	const [nama_user, setNama] = useState('');
	const [role, setRole] = useState('');

	axios.defaults.withCredentials = true;

	useEffect(() => {
		axios.get('http://localhost:8081')
			.then(res => {
				if (res.data.Status === "Success") {
					setNama(res.data.nama_user);
					setRole(res.data.role);
				} else {
					console.error(res.data.Error); // Log error message to the console
				}
			})
			.catch(err => console.log(err));
	}, []);

	useEffect(() => {
		document.title = "Apotek Murah";
	}, []);

	return (
		<div className="wrapper">
			{role === "pemilik" && <LayoutPemilik />}
			{role === "karyawan" && <LayoutKaryawan />}

			<div className="main-panel">
				<div className="content">
					<div className="page-inner">
						<div className="page-header">
							<h4 className="page-title">Dashboard</h4>
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
									<Link to="#">Dashboard</Link>
								</li>
							</ul>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div className="card">
									<div className="card-body">
										<div className="text-center">
											<h2 className='fw-bold'>SISTEM INFORMASI PERSEDIAAN OBAT APOTEK MURAH BUNG TOMO</h2><br />
											<h3 className='fw-bold'>SELAMAT DATANG ({nama_user})</h3>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >
	);
}

export default Home;
