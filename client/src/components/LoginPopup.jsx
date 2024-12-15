import { useState } from 'react';

export default function LoginPopup({ show, onClose, onLogin }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    if (!show) return null;

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
        setErrorMessage('');
        setFormData({ username: '', email: '', phone: '', password: '', confirmPassword: '' });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        console.log("Form data:", formData);
        console.log("Is Registering:", isRegistering);
    
        if (isRegistering) {
            const { username, email, phone, password, confirmPassword } = formData;
            if (!username || !email || !phone || !password || !confirmPassword) {
                setErrorMessage('Semua kolom harus diisi!');
                return;
            }
            if (password !== confirmPassword) {
                setErrorMessage('Kata sandi dan konfirmasi kata sandi tidak cocok!');
                return;
            }
            
            const userInfo = { username, email, phone, password };
            console.log("Storing user info to local storage:", userInfo);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsRegistering(false);
            setFormData({ username: '', email: '', phone: '', password: '', confirmPassword: '' });
            return;
        } else {
            const { username, password } = formData;
            if (!username || !password) {
                setErrorMessage('Semua kolom harus diisi!');
                return;
            }
            
            const savedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
            console.log("Saved user info:", savedUserInfo);
            
            if (savedUserInfo && savedUserInfo.username === username && savedUserInfo.password === password) {
                console.log("Calling onLogin function");
                onLogin();
                onClose();
            } else {
                setErrorMessage('Nama pengguna atau kata sandi tidak valid!');
            }
        }
    };    

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h5 className="modal-title">{isRegistering ? 'Daftar' : 'Masuk'}</h5>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="modal-body">
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    {isRegistering ? (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Nama pengguna</label>
                                <input type="text" className="form-control" id="username" value={formData.username} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Nomor telepon</label>
                                <input type="text" className="form-control" id="phone" value={formData.phone} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Kata sandi</label>
                                <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Konfirmasi kata sandi</label>
                                <input type="password" className="form-control" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Daftar</button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Nama pengguna</label>
                                <input type="text" className="form-control" id="username" value={formData.username} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Kata sandi</label>
                                <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Masuk</button>
                        </form>
                    )}
                    <div className="mt-3">
                        <button className="btn btn-link" onClick={toggleForm}>
                            {isRegistering ? 'Sudah punya akun?' : 'Belum punya akun?'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
