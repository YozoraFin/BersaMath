import Swiper from './Swiper.jsx';

export default function BerandaGuest({ onShowLoginPopup }) {
    return (
        <div className="min-height">
            <div className="my-5 container-header">
                <div className='header-content'>
                    <div className='content'>
                        <h1 className="mb-4 fw-bold header-title pt-5 pb-3">BersaMath</h1>
                        <p className="mb-4 header-subtitle pb-3">Platform belajar online seputar Matematika gratis untuk seluruh pengguna di Indonesia</p>
                        <button className="btn btn-register shadow-lg" onClick={onShowLoginPopup}>Daftar Sekarang</button>
                    </div>
                </div>
            </div>
            <Swiper />
            <div className="container my-5 d-flex flex-row align-items-center justify-content-evenly">
                <img src="https://www.quipper.com/id/school/assets/images/illustration/closing.png" alt="" width={520} />
                <div>
                    <h1 className="mb-4 fw-bold header-title pt-5 pb-3">Selamat Datang di BersaMath!</h1>
                    <p className="mb-4 header-subtitle pb-3">Platform belajar online seputar Matematika gratis untuk seluruh pengguna di Indonesia.</p>
                    <button className="btn btn-register shadow-lg" onClick={onShowLoginPopup}>Daftar Sekarang</button>
                </div>
            </div>
        </div>
    );
}