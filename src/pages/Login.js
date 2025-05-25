import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactTypingEffect from 'react-typing-effect';

function Login({ title, description }) {
    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validasi input username dan password
        if (!values.username || !values.password) {
            alert('Username dan password harus diisi');
            return;
        }

        axios
            .post('http://localhost:8081/login', values)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'SUCCESS',
                        text: 'Login Berhasil',
                    });
                    navigate('/home');
                } else {
                    // Menampilkan pesan error dari server
                    alert(res.data.Error || 'Login gagal. Terjadi kesalahan pada server.');
                }
            })
            .catch((err) => {
                // Menampilkan pesan error jika terjadi kesalahan saat request
                console.log(err);
                if (err.response) {
                    alert(err.response.data.Error || 'Login gagal. Terjadi kesalahan pada server.');
                } else {
                    alert('Login gagal. Tidak dapat terhubung ke server.');
                }
            });
    };

    useEffect(() => {
        document.title = 'Apotek Bung Tomo - Login';
    }, []);

    return (
        <div className='login'>
            <div className="wrapper wrapper-login">
                <div className="container container-login animated fadeIn">
                    <div className='d-flex justify-content-center fw-bold h2 my-1 '>
                        <ReactTypingEffect
                            text={[title]}
                            speed={64}
                            eraseDelay={8050}
                            eraseSpeed={110}
                            typingDelay={3000}
                        />
                    </div>
                    <div className='d-flex justify-content-center fw-bold h2 my-1 mb-2 pt-1'>
                        <ReactTypingEffect
                            text={[description]}
                            speed={90}
                            eraseDelay={4700}
                            eraseSpeed={290}
                            typingDelay={5000}
                        />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="login-form">
                            <div className="form-group form-floating-label">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    onChange={(e) => setValues({ ...values, username: e.target.value })}
                                    className="form-control input-border-bottom"
                                    required
                                    autoComplete="username"
                                />
                                <label htmlFor="username" className="placeholder">Username</label>
                            </div>

                            <div className="form-group form-floating-label">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                                    className="form-control input-border-bottom"
                                    required
                                    autoComplete="current-password"
                                />
                                <label htmlFor="password" className="placeholder">Password</label>
                            </div>
                            <div className="form-action mb-3">
                                <button type='submit' className="btn btn-success btn-rounded btn-login">Log in</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
