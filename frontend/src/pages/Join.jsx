import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { addPlan } from '../services/api';
import toast from 'react-hot-toast';

const packages = [
  { id: 1, amount: 500, dailyIncome: 50 },
  { id: 2, amount: 1000, dailyIncome: 100 },
  { id: 3, amount: 2500, dailyIncome: 250, featured: true },
  { id: 4, amount: 5000, dailyIncome: 500 },
  { id: 5, amount: 8000, dailyIncome: 800 },
  { id: 6, amount: 10000, dailyIncome: 1000 },
  { id: 7, amount: 25000, dailyIncome: 2500 },
  { id: 8, amount: 50000, dailyIncome: 5000 },
];
const Join = () => {
  const { user } = useSelector((s) => s.auth);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmUpload, setConfirmUpload] = useState(false);
  const { packageId } = useParams();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Clean up image preview URL
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Convert string param to number
  const selectedPackage = packages.find((p) => p.id === parseInt(packageId));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast.error('Please upload a JPEG or PNG image.');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB.');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
    setConfirmUpload(false);
  };

  const uploadSst = async () => {
    try {
      setLoading(true);
      if (!image) {
        throw new Error('Please upload a payment screenshot.');
      }
      const res = await addPlan({ packageId, userId: user._id, image });
      if (res.data.success) {
        setImage(null);
        setImagePreview(null);
        setConfirmUpload(false);
        toast.success('Screenshot uploaded successfully! Awaiting confirmation.');
      } else {
        throw new Error('Failed to upload screenshot.');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred during upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen mt-10 bg-gray-900 py-12 pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-0 left-0 w-96 h-96 bg-indigo-900 rounded-full opacity-20 blur-3xl animate-pulse-slow"
        ></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900 rounded-full opacity-20 blur-3xl animate-pulse-slow"
        ></div>
        {/* Particle Effects */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="particle absolute rounded-full bg-indigo-400 opacity-30"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Package Details */}
        <div
          className="mb-12 animate-fade-in-down"
          data-aos="fade-down"
        >
          {selectedPackage ? (
            <div
              className="bg-gray-800 p-6 rounded-2xl shadow-xl text-center border border-indigo-600/50 
              transform hover:shadow-indigo-500/50 transition-all duration-300"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Selected Package
              </h3>
              <p className="text-lg md:text-xl text-gray-300">
                Amount:{' '}
                <span className="font-semibold text-green-400">
                  ₹{selectedPackage.amount.toLocaleString()}
                </span>
              </p>
              <p className="text-lg md:text-xl text-gray-300">
                Daily Income:{' '}
                <span className="font-semibold text-green-400">
                  ₹{selectedPackage.dailyIncome.toLocaleString()}
                </span>
              </p>
            </div>
          ) : (
            <div
              className="bg-gray-700 p-6 rounded-2xl shadow-xl text-center border border-red-600/50"
            >
              <p className="text-lg md:text-xl text-red-400 font-semibold">
                Invalid package selected
              </p>
            </div>
          )}
        </div>

        {/* Package Benefits */}
        {selectedPackage && (
          <div
            className="mb-12 bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in-up"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              Why Choose This Package?
            </h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p>
                  <span className="font-medium text-white">Passive Income:</span> Earn ₹
                  {selectedPackage.dailyIncome.toLocaleString()} daily without active management.
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p>
                  <span className="font-medium text-white">Referral Bonuses:</span> Boost your earnings by inviting others to join Dream Pay.
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p>
                  <span className="font-medium text-white">Scalable Growth:</span> Upgrade to higher packages anytime to increase your returns.
                </p>
              </li>
            </ul>
          </div>
        )}

        {/* Instructions Section */}
        <div
          className="mb-12 bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in-up"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            How to Join
          </h2>
          <ol className="space-y-6 text-gray-300">
            <li className="flex items-start space-x-3">
              <span
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-900 
                text-indigo-400 rounded-full font-semibold"
              >
                1
              </span>
              <div>
                <p className="text-lg font-medium text-white">Pay the Package Amount</p>
                <p className="text-gray-400">
                  Use the QR code below or bank transfer to pay ₹
                  {selectedPackage?.amount.toLocaleString() || '0'}.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-900 
                text-indigo-400 rounded-full font-semibold"
              >
                2
              </span>
              <div>
                <p className="text-lg font-medium text-white">Upload Payment Screenshot</p>
                <p className="text-gray-400">
                  Take a clear screenshot of the payment confirmation and upload it below.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-900 
                text-indigo-400 rounded-full font-semibold"
              >
                3
              </span>
              <div>
                <p className="text-lg font-medium text-white">Wait for Confirmation</p>
                <p className="text-gray-400">
                  Your package will be activated within 24 hours after verification.
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* Main Content */}
        <div
          className="bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in-up"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* QR Code Section */}
            <div className="flex flex-col items-center text-center w-full lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Deposit via QR Code
              </h2>
              <img
                src="https://qrcg-free-editor.qr-code-generator.com/main/assets/images/websiteQRCode_noFrame.png"
                alt="PhonePe QR Code"
                className="w-52 h-52 mb-4 rounded-lg shadow-md border border-indigo-600/50 
                transform hover:scale-105 transition-transform duration-300"
              />
              <p className="text-gray-300 mb-1 text-lg">
                Scan to deposit your amount
              </p>
              <p className="text-gray-400 text-sm">
                Use User ID ({user._id.slice(-8)}) in the payment reference
              </p>
            </div>

            {/* Upload Section */}
            <div className="flex flex-col items-center text-center w-full lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Upload Payment Screenshot
              </h2>
              {imagePreview && (
                <div className="mb-4">
                  <img
                    src={imagePreview}
                    alt="Payment Screenshot Preview"
                    className="w-48 h-48 object-contain rounded-lg border border-indigo-600/50 
                    shadow-md"
                  />
                  <button
                    onClick={clearImage}
                    className="mt-2 text-red-400 hover:text-red-300 text-sm font-medium 
                    transition-colors duration-300"
                  >
                    Remove Image
                  </button>
                </div>
              )}
              <div className="mb-6 w-full max-w-sm">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 
                  file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm 
                  file:font-semibold file:bg-gradient-to-r file:from-indigo-600 file:to-purple-600 
                  file:text-white hover:file:from-indigo-700 hover:file:to-purple-700 
                  transition-all duration-200 disabled:opacity-50 focus:outline-none 
                  focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                  disabled={loading}
                />
              </div>
              {confirmUpload ? (
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                  <button
                    onClick={uploadSst}
                    className={`flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 
                    rounded-full focus:outline-none focus:ring-4 focus:ring-green-400 
                    focus:ring-offset-2 transition-all duration-300 font-semibold shadow-md 
                    hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center ${
                      loading ? 'opacity-75 cursor-not-allowed' : 'hover:from-green-600 hover:to-green-700'
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
                      'Confirm Upload'
                    )}
                  </button>
                  <button
                    onClick={() => setConfirmUpload(false)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 
                    rounded-full focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-offset-2 
                    transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform 
                    hover:-translate-y-1 hover:from-red-600 hover:to-red-700"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmUpload(true)}
                  className={`w-full max-w-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                  py-3 px-6 rounded-full focus:outline-none focus:ring-4 focus:ring-indigo-400 
                  focus:ring-offset-2 transition-all duration-300 font-semibold shadow-md 
                  hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center ${
                    loading || !image ? 'opacity-75 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700'
                  }`}
                  disabled={loading || !image}
                >
                  Upload Screenshot
                </button>
              )}
              <p className="text-gray-400 text-sm mt-4">
                Note: Ensure the screenshot clearly shows the payment details. Funds will be credited within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Alternative Payment Instructions */}
        {/* <div
          className="mt-12 bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in-up"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Alternative Payment Method
          </h2>
          <p className="text-gray-300 text-center mb-6">
            If you can't scan the QR code, use the bank details below to make the payment.
          </p>
          <div className="bg-gray-700 p-6 rounded-lg border border-indigo-600/50 text-center">
            <p className="text-gray-200 font-medium">
              Bank: Dream Pay Financial Services
            </p>
            <p className="text-gray-200 font-medium">
              Account Number: 1234-5678-9012-3456
            </p>
            <p className="text-gray-200 font-medium">
              IFSC Code: DPAY0001234
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Include your User ID ({user._id.slice(-8)}) in the payment remarks.
            </p>
          </div>
        </div> */}

        {/* FAQ Section */}
        <div
          className="mt-12 bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in-up"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 text-gray-300">
            <div>
              <p className="text-lg font-medium text-white">
                How long does it take to process my package?
              </p>
              <p className="text-gray-400">
                Your package will be processed within 24 hours after we verify your payment screenshot.
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-white">
                What should the screenshot include?
              </p>
              <p className="text-gray-400">
                The screenshot must clearly show the payment amount, date, time, and transaction ID or reference number.
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-white">
                Can I upgrade my package later?
              </p>
              <p className="text-gray-400">
                Yes, you can upgrade to a higher package at any time by selecting a new package and following the same process.
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-white">
                What if my payment is not processed?
              </p>
              <p className="text-gray-400">
                Contact our support team via the{' '}
                <a
                  href="/contact"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Contact
                </a>{' '}
                page, and we'll assist you promptly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations and particles */}
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
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() * 30 - 15}px);
            opacity: 0.2;
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
        }
        .particle {
          animation: float linear infinite;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default Join;