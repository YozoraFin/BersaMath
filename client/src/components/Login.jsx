import { useState } from 'react';

export default function LoginPopup({ show, onClose }) {
    const [isRegistering, setIsRegistering] = useState(false);

    if (!show) return null;

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h5 className="modal-title">{isRegistering ? 'Daftar' : 'Masuk'}</h5>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="modal-body">
                    {isRegistering ? (
                        <form>
                            <div className="mb-3">
                                <label htmlFor="reg-username" className="form-label">Nama pengguna</label>
                                <input type="text" className="form-control" id="reg-username" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="reg-password" className="form-label">Kata sandi</label>
                                <input type="password" className="form-control" id="reg-password" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="reg-confirm-password" className="form-label">Konfirmasi Kata sandi</label>
                                <input type="password" className="form-control" id="reg-confirm-password" required />
                            </div>
                            <button type="submit" className="btn btn-primary">Daftar</button>
                            <div className="my-3">
                                <button className="btn btn-link" onClick={toggleForm}>Belum punya akun?</button>                                
                            </div>
                        </form>
                    ) : (
                        <form>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Nama pengguna</label>
                                <input type="text" className="form-control" id="username" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Kata sandi</label>
                                <input type="password" className="form-control" id="password" required />
                            </div>
                            <button type="submit" className="btn btn-primary">Masuk</button>
                            <div className="my-3">
                                <button className="btn btn-link" onClick={toggleForm}>Belum punya akun?</button>                                
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}