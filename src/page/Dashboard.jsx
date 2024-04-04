import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../assets/img/main_bg.jpg';
import Footer from '../component/Footer';

function Dashboard() {
    return (
        <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="max-w-md w-full py-10 px-6 bg-white bg-opacity-50 shadow-md rounded-md" style={{ borderRadius: '20px' }}>
                <h2 className="text-2xl text-center font-semibold mb-4">
                    Parkir lebih mudah dengan DioPark, Tinggal scan aja dibawah ini
                </h2>
                <div className="flex items-center justify-center">
                    <Link to="/" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 inline-block">
                        <FontAwesomeIcon icon={faQrcode} className="mr-2" />Scan tiket
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;
