import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { addPlan } from '../services/api';
import toast from 'react-hot-toast';

const packages = [
  { id: 1, amount: 250, dailyIncome: 25 },
  { id: 2, amount: 500, dailyIncome: 50 },
  { id: 3, amount: 1000, dailyIncome: 100 },
  { id: 4, amount: 2500, dailyIncome: 250 },
  { id: 5, amount: 5000, dailyIncome: 500 },
];

const Join = () => {
  const { user } = useSelector((s) => s.auth);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { packageId } = useParams();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Convert string param to number
  const selectedPackage = packages.find((p) => p.id === parseInt(packageId));

  const uploadSst = async () => {
    try {
      setLoading(true);
      if (!image) {
        throw new Error('Please upload a screenshot.');
      }
      const res = await addPlan({ packageId, userId: user._id, image });
      setImage(null);
      toast.success('Screenshot uploaded successfully!');
      console.log(res);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-4 from-gray-50 to-indigo-100 py-12 pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-200 rounded-full opacity-15 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200 rounded-full opacity-15 blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Package Details at the Top */}
        <div className="mb-12 animate-fade-in-down">
          {selectedPackage ? (
            <div className="bg-white p-6 rounded-2xl shadow-xl text-center border border-indigo-200 transform hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl md:text-3xl font-extrabold text-indigo-600 mb-2">Selected Package</h3>
              <p className="text-lg md:text-xl text-gray-800">Amount: <span className="font-semibold text-indigo-600">₹{selectedPackage.amount.toLocaleString()}</span></p>
              <p className="text-lg md:text-xl text-gray-800">Daily Income: <span className="font-semibold text-green-600">₹{selectedPackage.dailyIncome.toLocaleString()}</span></p>
            </div>
          ) : (
            <div className="bg-red-50 p-6 rounded-2xl shadow-xl text-center border border-red-200">
              <p className="text-lg md:text-xl text-red-600 font-semibold">Invalid package selected</p>
            </div>
          )}
        </div>

        {/* Instructions Section */}
        <div className="mb-12 bg-white rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in-up">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 text-center">How to Join</h2>
          <ol className="space-y-4 text-gray-700">
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full font-semibold">1</span>
              <div>
                <p className="text-lg font-medium">Scan the QR Code and Pay</p>
                <p className="text-gray-600">Use your preferred payment app to scan the QR code below and pay the package amount of ₹{selectedPackage?.amount.toLocaleString() || '0'}.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full font-semibold">2</span>
              <div>
                <p className="text-lg font-medium">Upload Payment Screenshot</p>
                <p className="text-gray-600">After making the payment, take a screenshot and upload it using the form below.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full font-semibold">3</span>
              <div>
                <p className="text-lg font-medium">Wait for Processing</p>
                <p className="text-gray-600">Your package purchase will be processed within 24 hours. You'll receive a confirmation once it's complete.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in-up">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* QR Code Section */}
            <div className="flex flex-col items-center text-center w-full lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                Deposit via QR Code
              </h2>
              <img
                src="https://qrcg-free-editor.qr-code-generator.com/main/assets/images/websiteQRCode_noFrame.png"
                alt="PhonePe QR Code"
                className="w-52 h-52 mb-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
              />
              <p className="text-gray-600 mb-1 text-lg">
                Scan to deposit your amount
              </p>
              <p className="text-gray-500 text-sm">
                Use User ID ({user._id.slice(-8)}) in the payment reference
              </p>
            </div>

            {/* Upload Section */}
            <div className="flex flex-col items-center text-center w-full lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                Upload Payment Screenshot
              </h2>
              <div className="mb-6 w-full max-w-sm">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-indigo-600 file:to-purple-600 file:text-white hover:file:from-indigo-700 hover:file:to-purple-700 transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={loading}
                />
              </div>
              <button
                onClick={uploadSst}
                className={`w-full max-w-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-full focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center ${
                  loading ? 'opacity-75 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700'
                }`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  'Upload Screenshot'
                )}
              </button>
              <p className="text-gray-500 text-sm mt-4">
                Note: Your funds will be credited within 24 hours of deposit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulseSlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.25;
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Join;