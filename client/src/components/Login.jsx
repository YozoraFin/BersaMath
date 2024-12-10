import '../css/Login.css';

export default function LoginPopup({ show, onClose }) {
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h5 className="modal-title">Masuk</h5>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="modal-body">
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
                    </form>
                </div>
            </div>
        </div>
    );
}