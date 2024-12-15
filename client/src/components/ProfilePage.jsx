import { useState } from 'react';

export default function ProfilePage({ user, onUpdateProfile }) {
    const [username, setUsername] = useState(user.username || '');
    const [bio, setBio] = useState(user.bio || '');
    const [profilePicture, setProfilePicture] = useState(user.profilePicture || '');
    const [preview, setPreview] = useState(profilePicture);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateProfile({ username, bio, profilePicture: preview });
    };

    return (
        <div className="min-height">
            <div className="container mt-5">
                <h1 className='py-5'>Atur Profil</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row gap-5 justify-content-evenly    ">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label fw-bold pb-1">Nama pengguna</label>
                                <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bio" className="form-label fw-bold pb-1">Biodata</label>
                                <textarea className="form-control" id="bio" rows="3" value={bio} onChange={handleBioChange}></textarea>
                            </div>
                        </div>
                        <div className="col-md-3 text-center">
                            <div className="mb-3">
                                <label htmlFor="profilePicture" className="fw-bold">Gambar profil</label>
                            </div>
                            {preview && <img src={preview} alt="Profile Preview" className="img-preview mb-3" width="300" height="300" />}
                            <input type="file" className="form-control" id="profilePicture" accept="image/*" onChange={handleProfilePictureChange} />

                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary mt-3 rounded-pill px-3">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
