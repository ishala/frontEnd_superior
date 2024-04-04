import { useState } from 'react';
import QrScanner from 'qr-scanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faTimes, faCamera, faUpload } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../assets/img/main_bg.jpg';
import Footer from '../component/Footer';

function Dashboard() {
    const [result, setResult] = useState('');
    const [scanning, setScanning] = useState(false);
    const [torchOn, setTorchOn] = useState(false);
    const [imageUpload, setImageUpload] = useState('');

    const startScanning = () => {
        setScanning(true);
        const videoElem = document.getElementById('qr-video');
        const qrScanner = new QrScanner(videoElem, result => {
            setResult(result);
            qrScanner.stop();
        });
        qrScanner.start();
    };

    const stopScanning = () => {
        setResult('');
        setScanning(false);
    };

    const toggleTorch = () => {
        const videoElem = document.getElementById('qr-video');
        videoElem.srcObject.getVideoTracks()[0].applyConstraints({
            advanced: [{ torch: !torchOn }]
        });
        setTorchOn(!torchOn);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageUpload(e.target.result);
                QrScanner.scanImage(e.target.result)
                    .then(result => setResult(result))
                    .catch(error => console.error(error || 'No QR code found.'));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="max-w-md w-full py-10 px-6 bg-white bg-opacity-50 shadow-md rounded-md" style={{ borderRadius: '20px' }}>
                <h2 className="text-2xl text-center font-semibold mb-4">
                    Parkir lebih mudah dengan DioPark, Tinggal scan aja dibawah ini
                </h2>
                {!scanning && (
                    <div className="flex items-center justify-center">
                        <button onClick={startScanning} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 inline-block mr-2">
                            <FontAwesomeIcon icon={faQrcode} className="mr-2" />Scan tiket
                        </button>
                        <label htmlFor="file-upload" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 inline-block">
                            <FontAwesomeIcon icon={faUpload} className="mr-2" />Upload Qr
                        </label>
                        <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </div>
                )}
                {scanning && (
                    <div className="relative">
                        <video id="qr-video" style={{ width: '100%' }} />
                        <button onClick={stopScanning} className="absolute top-2 right-2 text-red-500">
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <button onClick={toggleTorch} className="absolute top-2 left-2 text-yellow-500">
                            <FontAwesomeIcon icon={faCamera} />
                        </button>
                    </div>
                )}
                {result && (
                    <div className="mt-4">
                        <p>Hasil scan: {result}</p>
                    </div>
                )}
                {imageUpload && (
                    <div className="mt-4">
                        <img src={imageUpload} alt="Uploaded QR Code" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;
