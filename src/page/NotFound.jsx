import { Link } from 'react-router-dom';
// import notFoundImage from '../assets/not_found.png';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      {/* <img src={} alt="Not Found" className="w-40 h-40 mb-8" /> */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500 hover:text-blue-700 text-lg">Go back to Home</Link>
    </div>
  );
}

export default NotFound;
