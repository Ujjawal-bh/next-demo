// pages/404.js
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
        <p className="mt-2 text-gray-500">
          Sorry, the page youre looking for doesnt exist or has been moved.
        </p>
        <Link href="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
        
            Go Back Home
        
        </Link>
      </div>
    </div>
  );
}
