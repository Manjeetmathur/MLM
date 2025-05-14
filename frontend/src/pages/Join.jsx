import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addPlan } from '../services/api';
import toast from 'react-hot-toast'; // Added for better user feedback

const Join = () => {
  const { user } = useSelector((s) => s.auth);
  const [image, setImage] = useState(null); // Changed to null for clarity
  const [loading, setLoading] = useState(false);
  const { packageId } = useParams(); // Destructured for cleaner access

  const uploadSst = async () => {
    try {
      setLoading(true);
      if (!image) {
        throw new Error('Please upload a screenshot.');
      }
      const formData = new FormData();
      formData.append('packageId', packageId);
      formData.append('userId', user._id);
      formData.append('image', image);

      const res = await addPlan(formData);
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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* QR Code Section */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Deposit via QR Code
            </h2>
            <div className="mb-4">
              <img
                src="https://qrcg-free-editor.qr-code-generator.com/main/assets/images/websiteQRCode_noFrame.png"
                alt="PhonePe QR Code for Deposit"
                className="w-48 h-48 object-contain"
              />
            </div>
            <p className="text-gray-600 mb-2">
              Scan the PhonePe QR code to deposit your amount
            </p>
            <p className="text-gray-500 text-sm">
              Include your user ID ({user._id.slice(10)}) in the payment reference.
            </p>
          </div>

          {/* Upload Section */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Upload Payment Screenshot
            </h2>
            <div className="mb-4 w-full max-w-xs">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 disabled:opacity-50"
                disabled={loading}
              />
            </div>
            <button
              onClick={uploadSst}
              className={`w-full max-w-xs bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Screenshot'}
            </button>
            <p className="text-gray-500 text-sm mt-4">
              Note: Your money will be credited within 24 hours of deposit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;