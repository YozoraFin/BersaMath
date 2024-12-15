import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import diskusi from '../assets/json/diskusi.json'; // Make sure this path is correct

export default function DiskusiAdd({ user }) {
    const { subject, id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [discussion, setDiscussion] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newDiscussion = {
            title,
            discussion,
            sender: user.username,
            date: new Date().toISOString().split('T')[0]
        };
        diskusi.push(newDiscussion); // This modifies the JSON file, update as needed

        // Navigate back to the discussion list page
        navigate(`/materi/${subject}/${id}`);
    };

    return (
        <div className="min-height p-5">
            <div className="container">
                <h1 className="mb-4">Tambah Diskusi</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Judul</label>
                        <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="discussion" className="form-label">Diskusi</label>
                        <textarea className="form-control" id="discussion" rows="5" value={discussion} onChange={(e) => setDiscussion(e.target.value)} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Kirim</button>
                </form>
            </div>
        </div>
    );
}
