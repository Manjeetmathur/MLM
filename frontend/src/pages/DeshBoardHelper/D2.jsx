import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const D2 = ({ profile, level, progress, referrals }) => {
  const [sum, setSum] = useState(0);

  let referralLink = window.location.href;
  referralLink =
    referralLink.split('').reverse().join('').slice(9).split('').reverse().join('') + 'register';

  const openWhatsapp = () => {
    const message = `${referralLink}\nReferral Code: ${profile.referralCode}\nUse this referral code while registering`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(profile?.referralCode || '');
    toast.success('Referral code copied to clipboard!');
  };

  // Calculate package income
  useEffect(() => {
    if (profile?.plans?.length) {
      const totalIncome = profile.plans.reduce((acc, plan) => acc + (plan.dailyIncome || 0), 0);
      setSum(totalIncome);
    }
  }, [profile]);

  return (
    <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Available Balance */}
        <div className="relative p-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-center rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
          <h2 className="text-lg md:text-xl font-medium text-white mb-2">Available Balance</h2>
          <p className="text-2xl md:text-3xl font-bold text-green-400">₹{profile?.balance?.toLocaleString() || '0'}</p>
        </div>

        {/* Package Income */}
        <div className="relative p-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-center rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-lg md:text-xl font-medium text-white mb-2">Package Income</h2>
          <p className="text-2xl md:text-3xl font-bold text-green-400">₹{sum.toLocaleString()}</p>
        </div>

        {/* Referrals Income */}
        <div className="relative p-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-center rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-lg md:text-xl font-medium text-white mb-2">Referrals Income</h2>
          <Link
            to="/balance"
            className="text-xl md:text-2xl font-medium text-white hover:text-yellow-200 transition-colors duration-300"
          >
            ₹{(referrals?.referrals?.length * 50 || 0).toLocaleString()}
          </Link>
        </div>

        {/* Transactions */}
        <div className="relative p-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-center rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-lg md:text-xl font-medium text-white mb-2">Transactions</h2>
          <Link
            to="/balance"
            className="inline-block bg-gradient-to-r from-indigo-800 to-purple-800 text-white px-5 py-2 rounded-full hover:from-indigo-900 hover:to-purple-900 transition-all duration-300 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2"
          >
            See Your Wallet
          </Link>
        </div>

        {/* Level Progress */}
        <div className="relative p-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-center rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-lg md:text-xl font-medium text-white mb-2">Your Level: {level}</h2>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-teal-400 to-cyan-400 h-3 rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-200 mt-2">
            {progress}% to Level {level < 5 ? level + 1 : level}
          </p>
        </div>

        {/* Referral Link */}
        <div className="relative p-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-center rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-lg md:text-xl font-medium text-white mb-2">Referral Link</h2>
          <p className="text-sm text-gray-200 break-all mb-3 font-mono bg-indigo-800/30 px-2 py-1 rounded">{referralLink}</p>
          <button
            onClick={openWhatsapp}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2"
          >
            Share on WhatsApp
          </button>
        </div>

        {/* Referral Code */}
        <div className="relative p-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-center rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-lg md:text-xl font-medium text-white mb-2">Referral Code</h2>
          <p className="text-lg md:text-xl font-medium text-green-400 mb-3">{profile?.referralCode || 'N/A'}</p>
          <button
            onClick={copyReferralCode}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-5 py-2 rounded-full hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-teal-300 focus:ring-offset-2"
          >
            Copy Code
          </button>
        </div>

        {/* Verification */}
        <div className="relative p-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-center rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <h2 className="text-lg md:text-xl font-medium text-white mb-2">Verification</h2>
          {profile?.kycVerified ? (
            <p className="text-lg md:text-xl font-medium text-green-400 flex items-center justify-center">
              <svg className="w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Done
            </p>
          ) : (
            <Link
              to="/request-otp"
              className="text-lg md:text-xl font-medium text-teal-400 hover:text-teal-300 transition-colors duration-300"
            >
              Verify Now
            </Link>
          )}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
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
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default D2;