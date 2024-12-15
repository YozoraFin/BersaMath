import { useParams } from 'react-router-dom';
import { useState } from 'react';
import diskusi from '../assets/json/diskusi.json'; // Make sure this path is correct

export default function DiskusiDetail({ user }) {
    const { subject, id, discussionId } = useParams();
    const discussion = diskusi[discussionId];
    const [reply, setReply] = useState('');
    const [replies, setReplies] = useState(discussion.replies || []);

    if (!discussion) {
        return <div>Diskusi tidak ditemukan</div>;
    }

    const handleReplySubmit = (e) => {
        e.preventDefault();
        const newReply = {
            discussion: reply,
            sender: user.username,
            date: new Date().toISOString().split('T')[0]
        };
        setReplies([...replies, newReply]);
        setReply('');
        // Update the JSON (In real use case, you would save this to a database)
        discussion.replies = [...replies, newReply];
    };

    return (
        <div className="min-height p-5">
            <div className="container">
                <h1 className="mb-4">{discussion.title}</h1>
                <p>{discussion.discussion}</p>
                <small>{discussion.sender} - {discussion.date}</small>

                <h3 className="mt-5">Tanggapan</h3>
                <div className="list-group mb-4">
                    {replies.map((reply, index) => (
                        <div className="list-group-item" key={index}>
                            <p className="mb-1">{reply.discussion}</p>
                            <small>{reply.sender} - {reply.date}</small>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleReplySubmit}>
                    <div className="mb-3">
                        <label htmlFor="reply" className="form-label">Tanggapi</label>
                        <textarea className="form-control" id="reply" rows="3" value={reply} onChange={(e) => setReply(e.target.value)} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Kirim</button>
                </form>
            </div>
        </div>
    );
}
