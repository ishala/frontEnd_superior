// import Footer from '../component/Footer';
import backgroundImage from '../assets/img/main_bg.jpg';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-md w-full py-10 px-6 bg-white shadow-md rounded-md" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <h2 className="text-2xl text-center font-semibold mb-4">Welcome to DioPark</h2>
        <p className="text-gray-700 text-center">Sabar ya belom jadi WOIII.</p>
      </div>
    </div>
  );
}

export default Home;
