import { useState, useRef, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faTimes, faBolt, faUpload, faSync, faHistory, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../assets/img/main_bg.jpg';
import QRCodeImage from '../assets/img/qr.jpg';
import Footer from '../component/Footer';

function Dashboard() {
    const [result, setResult] = useState('');
    const [scanning, setScanning] = useState(false);
    const [cameraImage, setCameraImage] = useState(null);
    const [isBackCamera, setIsBackCamera] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [showQRPopup, setShowQRPopup] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const startCamera = () => {
            const facingMode = isBackCamera ? 'environment' : 'user';
            const constraints = { video: { facingMode: { exact: facingMode } } };
            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    const qrScanner = new QrScanner(videoRef.current, result => {
                        setResult(result);
                        setScanning(false);
                    });
                    qrScanner.start();
                })
                .catch(error => {
                    console.error('Failed to start camera:', error);
                    setScanning(false);
                });
        };

        if (scanning && videoRef.current) {
            startCamera();
        }
        // Cleanup function to stop camera when component unmounts
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
        };
    }, [scanning, isBackCamera]);

    const toggleTorch = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const videoTracks = stream.getVideoTracks();
            videoTracks.forEach(track => {
                if (track.getCapabilities().torch) {
                    track.applyConstraints({
                        advanced: [{ torch: !track.getSettings().torch }]
                    });
                }
            });
        }
    };

    const handleImageUpload = () => {
        // Add your image upload logic here
    };

    const flipCamera = () => {
        setIsBackCamera(!isBackCamera);
    };

    const handleScanButtonClick = () => {
        if (isMobile()) {
            setScanning(true);
        } else {
            setShowAlert(true);
        }
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    const toggleQRPopup = () => {
        setShowQRPopup(!showQRPopup);
    };

    // Function to detect if the user is on a mobile device
    const isMobile = () => {
        const userAgent = navigator.userAgent;
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* Foto Profil dan Nama */}
            <div className="absolute top-4 left-4">
                <div className="bg-white bg-opacity-50 rounded-lg p-2 flex items-center cursor-pointer" onClick={toggleQRPopup}>
                    <FontAwesomeIcon icon={faUserCircle} size="2x" className="mr-2" />
                    <span className="text-lg font-semibold">Hai Superior</span>
                </div>
            </div>
            {/* Tombol Riwayat Transaksi */}
            <button className="absolute top-4 right-4 text-gray-700" style={{ backgroundColor: 'transparent' }}>
                <FontAwesomeIcon icon={faHistory} size="2x" />
            </button>
            <div className="max-w-md w-full py-10 px-6 bg-white bg-opacity-50 shadow-md lg:max-w-lg lg:mx-auto relative" style={{ borderRadius: '20px', maxWidth: 'calc(55vw - -85px)', margin: '0 10px' }}>
                <h2 className="text-2xl text-center font-semibold mb-4">
                    Parkir lebih mudah dengan DioPark, Tinggal scan aja dibawah ini
                </h2>
                {!scanning && !cameraImage && (
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <button onClick={handleScanButtonClick} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                            <FontAwesomeIcon icon={faQrcode} className="mr-2" />Scan tiket
                        </button>
                        <label htmlFor="file-upload" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            <FontAwesomeIcon icon={faUpload} className="mr-2" />Upload Qr
                        </label>
                        <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </div>
                )}
                {(scanning || cameraImage) && (
                    <div className="relative">
                        <video ref={videoRef} className="w-full rounded-md" />
                        <button onClick={() => { setScanning(false); setCameraImage(null); }} className="absolute top-2 right-2 text-red-500">
                            <FontAwesomeIcon icon={faTimes} size="2x" />
                        </button>
                        <button onClick={toggleTorch} className="absolute top-2 left-2 text-yellow-500">
                            <FontAwesomeIcon icon={faBolt} size="2x" />
                        </button>

                        <button onClick={flipCamera} className="absolute top-2 right-10 text-blue-500">
                            <FontAwesomeIcon icon={faSync} size="2x" />
                        </button>
                    </div>
                )}
                {result && (
                    <div className="mt-4">
                        <p>Hasil scan: {result}</p>
                    </div>
                )}
            </div>
            {/* QR Popup */}
            {showQRPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg">
                        <p className="text-center">Personal QR Code</p>
                        <img src={QRCodeImage} alt="QR Code" className="mx-auto mt-4" />
                        <div className='flex items-center justify-center'>
                            <button onClick={toggleQRPopup} className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600">Close</button>
                        </div>

                    </div>
                </div>
            )}
            {/* Alert */}
            {showAlert && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg">
                        <p className="text-lg text-center">Silahkan akses menggunakan handphone</p>
                        <div className='flex items-center justify-center'>
                            <button onClick={closeAlert} className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600">Close</button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Dashboard;
