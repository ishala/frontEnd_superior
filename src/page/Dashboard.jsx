import { useState, useRef, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faTimes, faCamera, faUpload, faSync } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../assets/img/main_bg.jpg';
import Footer from '../component/Footer';

function Dashboard() {
    const [result, setResult] = useState('');
    const [scanning, setScanning] = useState(false);
    const [cameraImage, setCameraImage] = useState(null);
    const [isBackCamera, setIsBackCamera] = useState(true);
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
        setScanning(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="max-w-md w-full py-10 px-6 bg-white bg-opacity-50 shadow-md rounded-md" style={{ borderRadius: '20px' }}>
                <h2 className="text-2xl text-center font-semibold mb-4">
                    Parkir lebih mudah dengan DioPark, Tinggal scan aja dibawah ini
                </h2>
                {!scanning && !cameraImage && (
                    <div className="flex items-center justify-center">
                        <button onClick={() => setScanning(true)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 inline-block mr-2">
                            <FontAwesomeIcon icon={faQrcode} className="mr-2" />Scan tiket
                        </button>
                        <label htmlFor="file-upload" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 inline-block">
                            <FontAwesomeIcon icon={faUpload} className="mr-2" />Upload Qr
                        </label>
                        <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </div>
                )}
                {(scanning || cameraImage) && (
                    <div className="relative">
                        <video ref={videoRef} style={{ width: '100%', borderRadius: '10px' }} />
                        <button onClick={() => { setScanning(false); setCameraImage(null); }} className="absolute top-2 right-2 text-red-500">
                            <FontAwesomeIcon icon={faTimes} size="2x" />
                        </button>
                        <button onClick={toggleTorch} className="absolute top-2 left-2 text-yellow-500">
                            <FontAwesomeIcon icon={faCamera} size="2x" />
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
            <Footer />
        </div>
    );
}

export default Dashboard;
