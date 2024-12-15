import { Link, useParams, useNavigate } from 'react-router-dom';
import aljabar from '../assets/json/materi-aljabar.json';
import geometri from '../assets/json/materi-geometri.json';
import kalkulus from '../assets/json/materi-kalkulus.json';
import diskusi from '../assets/json/diskusi.json';

export default function Subjek() {
    const { subject, id } = useParams();
    const navigate = useNavigate();

    const subjectMap = {
        aljabar: aljabar,
        geometri: geometri,
        kalkulus: kalkulus
    };

    const selectedContent = subjectMap[subject] || [];
    const selectedSubject = selectedContent.find(sub => sub.title.toLowerCase() === id);

    if (!selectedSubject) {
        return <div>Materi tidak ditemukan</div>;
    }

    const nextSubjectIndex = selectedContent.findIndex(sub => sub.title.toLowerCase() === id) + 1;
    const nextSubjectId = nextSubjectIndex < selectedContent.length ? selectedContent[nextSubjectIndex].title.toLowerCase() : null;

    return (
        <div className='d-flex flex-column min-height p-5'>
            <h1 className='mb-4'>{selectedSubject.title}</h1>
            <div>
                {selectedSubject.type === "Video" && (
                    <div>
                        <div className='row justify-content-center gap-5'>
                            <iframe
                                title={selectedSubject.title}
                                width="1280"
                                height="720"
                                src={`https://www.youtube.com/embed/${selectedSubject.source}?origin=${window.location.origin}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className='mr-4 col-8'
                            ></iframe>
                            <div className='card shadow-lg col-2'>
                                <div className='card-body'>
                                    <p className='card-text'>{selectedSubject.description}</p>
                                    {nextSubjectId && (
                                        <button
                                            className='btn btn-primary rounded-pill position-absolute bottom-0 end-0 mb-3 me-3 px-3'
                                            onClick={() => navigate(`/materi/${subject}/${nextSubjectId}`)}
                                        >
                                            Lanjut
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className='card shadow-lg col-10'>
                                <div className='card-body'>
                                    <h3 className='card-text pb-3 fw-bolder'>Diskusi</h3>
                                    <div className="border"></div>
                                    <button
                                        className='btn btn-primary rounded-circle position-absolute top-0 end-0 mt-3 me-3'
                                        onClick={() => navigate(`/materi/${subject}/${id}/discussion-add`)}
                                    >
                                        +
                                    </button>
                                    <div className="list-group list-discussion mt-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                        {diskusi.map((discussion, index) => (
                                            <Link to={`/materi/${subject}/${id}/discussion/${index}`} className="list-group-item list-group-item-action" key={index}>
                                                <h5 className="mb-1">{discussion.title}</h5>
                                                <p className="mb-1">{discussion.discussion}</p>
                                                <small>{discussion.sender} - {discussion.date}</small>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {selectedSubject.type === "File" && (
                    <div className="row justify-content-center">
                            <div className='card shadow-lg col-12 mb-5' style={{ width: '300px' }}>
                                <div className='card-body'>
                                    <h4>{selectedSubject.title}</h4>
                                    <p className='card-text'>{selectedSubject.description}</p>
                                    <div className="justify-content-between d-flex">
                                        <a href={selectedSubject.source} download className='btn btn-primary rounded-pill'>
                                            Download File
                                        </a>
                                        {nextSubjectId && (
                                        <button
                                            className='btn btn-primary rounded-pill'
                                            onClick={() => navigate(`/materi/${subject}/${nextSubjectId}`)}
                                        >
                                            Lanjut
                                        </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='card shadow-lg col-10'>
                                <div className='card-body'>
                                    <h3 className='card-text pb-3 fw-bolder'>Diskusi</h3>
                                    <div className="border"></div>
                                    <button
                                        className='btn btn-primary rounded-circle position-absolute top-0 end-0 mt-3 me-3'
                                        onClick={() => navigate(`/materi/${subject}/${id}/discussion-add`)}
                                    >
                                        +
                                    </button>
                                    <div className="list-group list-discussion mt-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                        {diskusi.map((discussion, index) => (
                                            <Link to={`/materi/${subject}/${id}/discussion/${index}`} className="list-group-item list-group-item-action" key={index}>
                                                <h5 className="mb-1">{discussion.title}</h5>
                                                <p className="mb-1">{discussion.discussion}</p>
                                                <small>{discussion.sender} - {discussion.date}</small>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                    </div>
                )}
                {selectedSubject.type === "Lesson" && (
                    <div className="row justify-content-center">
                        <div className='col-10 mb-5'>
                            <div className='card shadow-lg'>
                                <div className='card-body'>
    <p>Pramoedya Ananta Toer pernah berkata “Orang boleh pandai setinggi langit, tapi selama ia tidak menulis, ia akan hilang di dalam masyarakat dan dari sejarah.” Begitu sang legendaris yang melahirkan karyanya selama di penjara Pulau Buru ini menilai kegiatan menulis. “Menulis adalah bekerja untuk keabadian.” Kalimat terakhir ini mestinya bisa jadi ajakan buat kamu mulai nulis juga sih.</p><p>Kegiatan menulis yang seringnya menguras waktu dan pikiran ini, ternyata ditekuni bukan saja oleh mereka yang memiliki banyak waktu luang. Artis atau selebritas yang biasanya dipenuhi kesibukan, tenyata banyak pula yang <em>sudah menerbitkan buku</em>. Bahkan beberapa ada yang sudah menerbitkan lebih dari satu buku. Siapa aja sih?</p><h2>1. Siapa sangka pemeran “Oneng” di Bajaj Bajuri ternyata sudah nerbitin banyak buku. Salah satunya kumpulan puisi Renungan Kloset</h2><p>Kalau kamu anak 90-an mestinya kamu familiar dengan nama Oneng. Ya, pemain serial Bajaj Bajuri yang bernama asli Rieke Diah Pitaloka ini ternyata selain bintang film dan pernah menjadi anggota DPR RI, juga jago sebagai penulis.</p><p>Bukunya yang sudah terbit cukup banyak. Mulai dari, Renungan Kloset(2001), Kekerasan Negara Menular ke Masyarakat(2004), Ups!(2005), Banalitas Kekerasan: Telaah Pemikiran Hannah Arendt(2010), Sumpah Saripah (2011).</p><p>Mayoritas buku Rieke membicarakan potret kepedihan, kepongahan cinta, angan-angan dan keniscayaan politik. Hayo, kamu baru tahu kan kalau pemeran Oneng ini jago nulis buku yang terkesan “berat”.</p><h2>2. Presenter kondang Tamara Geraldine ternyata jago juga nulis buku. Salah satunya berisikan campaign anti-narkob</h2><p>“Kamu Sadar, Saya Punya Alasan untuk Selingkuh ‘kan Sayang?” boleh dikatakan sebagai salah satu <strong>judul buku Tamara Geraldine</strong> yang sukses. Nggak pendek tapi bikin penasaran ya, judulnya. Lewat buku itu Tamara membuktikan bahwa ia bukan sekadar artis yang menulis. Cerita dalam kumpulan cerpen ini berkisah tentang kompleksitas cinta dalam hubungan suami istri, yang disampaikan dengan lugas tanpa kehilangan rasa humornya yang kadang miris.</p><p>2018 silam Tamara bahkan nerbitin lagi bukunya yang berjudul ’<strong>Drums (Not Drugs) Generation</strong>’. Kerennya, sebanyak 30.000 eksemplar cetakan pertama buku ini dibagikan gratis untuk anak-anak SD di beberapa pulau di Indonesia, sebagai pembekalan buat anak-anak agar berani berkata tidak pada narkoba.</p><h2>3. Selain jago di perfilman dan teater, Happy Salma juga sukses nulis buku Hanya Batu dan Pisau Batu</h2><p>Pada tahun 2010 Happy Salma meraih piala Citra kategori Pemeran Pendukung Wanita Terbaik di FFI untuk film 7 Hati 7 Cinta 7 Wanita. Ini membuktikan kemampuannya di dunia peran nggak perlu diragukan lagi. Selain itu ia juga aktif di dunia teater dan pernah berperan sebagai Nyai Ontosoroh dalam pertunjukan teater fenomenal, Bunga Penutup Abad.</p><p>Di dunia penulisan? Happy Salma juga jago nulis dan udah nerbitin buku ternyata. Salah satu bukunya yang terkenal adalah ‘<strong>Hanya Batu dan Pisau Batu</strong>’ yang ia tulis berdua dengan Pidi Baiq</p><h2>4. Bukan cuma doyan adventure, Nadine Chandrawinata juga doyan nulis pengalamannya hingga jadi buku berjudul Nadrenaline</h2><p>Kalau kamu ngira kebanyakan orang pas liburan hanya mendokumentasikan keseruannya lewat foto atau video, kamu mesti baca bukunya Nadine Chandrawinata. Artis yang juga mantan Puteri Indonesia ini menuliskan pengalaman-pengalaman unik selama perjalanan liburannya ke dalam buku yang berjudul “<strong>Nadrenaline</strong>“.</p><p>Seperti pengalaman saat ia nggak bisa mandi seminggu saat perjalanan ke Gunung Everest. Survive saat badai besar di Wakatobi dengan GPS off. Atau tidur di Stasiun Kolkata beralaskan keramik kotor yang banyak nyamuk yang dilalui banyak orang. Mengetahui Nadine punya banyak kesibukan, kamu pasti nggak nyangka kan kalau ia masih sempat nulis buku. Kamu bisa juga nih, bikin catatan perjalanan tiap liburan.</p><h2>5. Nggak hanya modal tampang dan jago akting, Ethan Hawke buktikan kemampuan menulisnya lewat buku berjudul “Ash Wednesday”</h2><p>Karier pertama kepenulisan Hawke dimulai dengan novel berjudul <strong>The Hottest State</strong>. Enam tahun setelahnya terbit Ash Wednesday masih dengan ciri penulisan Hawke yang santai. Selain sebagai aktor film Before Sunrise, kini kamu juga bisa ngenalin Hawke sebagai penulis.</p><p>Karena sebagai penulis ia juga telah menerbitkan Manhattan Story, William Shakespeare’s Hamlet, Chelsea Walls yang rilis pada 2002 bersama Jeff Tweedy, Mark Webber, Robert Sean Leonard, dan Tuesday Weld.</p><h2>6. Tahukah kamu, sosok Madonna ternyata pernah menulis buku untuk anak-anak, lo!</h2><p>Walau terkenal dengan gayanya yang liar, ternyata Madonna punya perhatian lebih pada dunia anak-anak. Itu dibuktikannya dengan merilis lima buku anak dalam satu paket bernama Madonna: Five Books for Children. Paket itu berisi buku The English Roses, Mr. Peabody’s Apples, Yakov and the Seven Thieves, The Adventures of Abdi, dan Lotsa de Casha.</p><p>Buku-buku itu dilengkapi ilustrasi lucu karya Jeffrey Fulvimari. Demi mempertahankan “sisi liarnya”, selain buku anak ternyata Madonna juga menulis buku dewasa. Di antaranya berjudul Se-x dan The Girlie Show.</p><h2>7. Setelah malang melintang di dunia film, Tom Hanks si kolektor mesin tik akhirnya nerbitin buku juga</h2><p>Tom Hanks yang terkenal lewat perannya dalam berbagai film akhirnya nyoba nulis juga. Sebagai kolektor 150-an mesin tik, nggak heran kalau Tom Hanks akhirnya nulis buku. “Uncommon Type” adalah buku pertamanya yang diterbitkan oleh Penguin Random House.</p><p>Buku ini memuat 17 cerpen yang mengisahkan beragam tema, dari kisah imigran asal Eropa Timur yang tiba di New York hingga perempuan yang menata hidup setelah bercerai. Sepertinya menarik, nih, “membaca” sandiwara Tom Hanks melalui bukunya. Kamu tertarik?</p><p>Artis dengan imej super sibuk aja bisa nyempetin nulis buku. Apa kamu nggak ingin tulisanmu juga dibaca orang lain? Ada buku dari beberapa artis barusan yang pengen banget kamu baca? </p>
                                    {nextSubjectId && (
                                        <div className="row">
                                            <div className="col-12 text-end">
                                                <button
                                                    className='btn btn-primary rounded-pill'
                                                    onClick={() => navigate(`/materi/${subject}/${nextSubjectId}`)}
                                                >
                                                    Lanjut
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='card shadow-lg col-10'>
                                <div className='card-body'>
                                    <h3 className='card-text pb-3 fw-bolder'>Diskusi</h3>
                                    <div className="border"></div>
                                    <button
                                        className='btn btn-primary rounded-circle position-absolute top-0 end-0 mt-3 me-3'
                                        onClick={() => navigate(`/materi/${subject}/${id}/discussion-add`)}
                                    >
                                        +
                                    </button>
                                    <div className="list-group list-discussion mt-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                        {diskusi.map((discussion, index) => (
                                            <Link to={`/materi/${subject}/${id}/discussion/${index}`} className="list-group-item list-group-item-action" key={index}>
                                                <h5 className="mb-1">{discussion.title}</h5>
                                                <p className="mb-1">{discussion.discussion}</p>
                                                <small>{discussion.sender} - {discussion.date}</small>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                    </div>
                )}
            </div>
        </div>
    );
}
