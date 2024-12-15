import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="py-5 text-center text-white bg-dark">
            <div className="container">
                <p className="mb-1">© {new Date().getFullYear()} BersaMath. All rights reserved.</p>
                <div className="social-links">
                    <Link to="#" className="mx-2 text-white">Privacy Policy</Link>
                    <Link to="#" className="mx-2 text-white">Terms of Service</Link>
                    <Link to="#" className="mx-2 text-white">Contact Us</Link>
                </div>
            </div>
        </footer>
    );
}