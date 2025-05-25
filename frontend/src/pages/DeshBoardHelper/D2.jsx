import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const D2 = ({ profile, level, progress, referrals }) => {
  const [sum, setSum] = useState(0);
  let referralLink = window.location.href;
  referralLink =
    referralLink.split('').reverse().join('').slice(9).split('').reverse().join('') + 'register';

  const openWhatsapp = () => {
    const message = `🌟 *Join the Dream Pay Revolution!* 🌟\n\n` +
      `Unlock *passive income* with Dream Pay! 💰\n\n` +
      `*Your Referral Link*: ${referralLink}\n` +
      `*Referral Code*: *${profile.referralCode}*\n\n` +
      `🎉 *Bonuses Await!* 🎉\n` +
      `- Get ₹50 just for signing up!\n` +
      `- Earn an extra ₹50 by using my referral code!\n\n` +
      `---\n` +
      `*Sign up now* and start earning today! ➡️\n` +
      `Use the link and code above when registering.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };
  const copyReferralCode = () => {
    navigator.clipboard.writeText(profile?.referralCode || '');
    toast.success('Referral code copied to clipboard!');
  };

  useEffect(() => {
    if (profile?.plans?.length) {
      const totalIncome = profile?.plans?.reduce((acc, plan) => acc + ((plan?.dailyIncome) * (plan?.dailyDeposit)), 0);
      setSum(totalIncome);
    }
  }, [profile]);

  return (
    <div
      className="relative rounded-3xl p-6 sm:p-8 "
      data-aos="fade-up"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Available Balance */}
        <Link to={`/balance/${profile?._id}`}>
          <div
            className="relative p-6 bg-gray-700 text-center rounded-2xl shadow-md 
          hover:shadow-lg hover:shadow-indigo-400/50 transform hover:-translate-y-1 
          transition-all duration-300 animate-fade-in-up border border-indigo-600/50 group"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <h2 className="text-lg md:text-xl font-semibold text-gray-200 mb-2 flex items-center justify-center gap-2">
              <span className="text-indigo-400">💰</span> Available Balance
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">
              ₹{profile?.balance?.toLocaleString() || '0'}
            </p>
          </div>
        </Link>

        {/* Package Income */}
        <Link to={`/balance/${profile?._id}`}>
          <div
            className="relative p-6 bg-gray-700 text-center rounded-2xl shadow-md 
          hover:shadow-lg hover:shadow-indigo-400/50 transform hover:-translate-y-1 
          transition-all duration-300 animate-fade-in-up border border-indigo-600/50 group"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-lg md:text-xl font-semibold text-gray-200 mb-2 flex items-center justify-center gap-2">
              <span className="text-indigo-400">💰</span> Package Income
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">
              ₹{sum.toLocaleString()}
            </p>
          </div>
        </Link>

        {/* Referrals Income */}
        <Link  to={`/balance/${profile?._id}`}>
          <div
            className="relative p-6 bg-gray-700 text-center rounded-2xl shadow-md 
          hover:shadow-lg hover:shadow-indigo-400/50 transform hover:-translate-y-1 
          transition-all duration-300 animate-fade-in-up border border-indigo-600/50 group"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h2 className="text-lg md:text-xl font-semibold text-gray-200 mb-2 flex items-center justify-center gap-2">
              <span className="text-indigo-400">💰</span> Referrals Income
            </h2>
            <Link
              to="/balance"
              className="text-xl md:text-2xl font-medium text-white hover:text-yellow-400 
            transition-colors duration-300"
            >
              ₹{(referrals?.referrals?.length * 50).toLocaleString()}
            </Link>
          </div>
        </Link>

        {/* Transactions */}
        <Link to={`/balance/${profile?._id}`}>
          <div
            className="relative p-6 bg-gray-700 text-center rounded-2xl shadow-md 
          hover:shadow-lg hover:shadow-indigo-400/50 transform hover:-translate-y-1 
          transition-all duration-300 animate-fade-in-up border border-indigo-600/50 group"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h2 className="text-lg md:text-xl font-semibold text-gray-200 mb-2 flex items-center justify-center gap-2">
              <span className="text-indigo-400">💰</span> Your Wallet
            </h2>
            <div
              className="inline-block bg-gradient-to-r from-indigo-800 to-purple-800 text-white 
            px-5 py-2 rounded-full hover:from-indigo-900 hover:to-purple-900 transition-all 
            duration-300 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-4 
            focus:ring-indigo-400 focus:ring-offset-2"
            >
              See Your Wallet
            </div>
          </div>
        </Link>

        {/* Level Progress */}
        <div
          className="relative p-6 bg-gray-700 text-center rounded-2xl shadow-md 
          hover:shadow-lg hover:shadow-indigo-400/50 transform hover:-translate-y-1 
          transition-all duration-300 animate-fade-in-up border border-indigo-600/50 group"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h2 className="text-lg md:text-xl font-semibold text-gray-200 mb-2 flex items-center justify-center gap-2">
            <span className="text-indigo-400">🏆</span> Your Level: {level}
          </h2>
          <div className="w-full bg-gray-600 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-teal-400 to-cyan-400 h-3 rounded-full transition-all 
              duration-700 ease-in-out group-hover:bg-gradient-to-r group-hover:from-teal-300 
              group-hover:to-cyan-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-300 mt-2 group-hover:text-gray-200 transition-colors duration-300">
            {progress}% to Level {level < 5 ? level + 1 : level}
          </p>
        </div>

        {/* Referral Link */}
        <div
          className="relative p-6 bg-gray-700 text-center rounded-2xl shadow-md 
          hover:shadow-lg hover:shadow-indigo-400/50 transform hover:-translate-y-1 
          transition-all duration-300 animate-fade-in-up border border-indigo-600/50 group"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <h2 className="text-lg md:text-xl font-semibold text-gray-200 mb-2 flex items-center justify-center gap-2">
            <span className="text-indigo-400">🔗</span> Referral Link
          </h2>
          <p className="text-sm text-gray-300 break-all mb-3 font-mono bg-indigo-900/50 px-2 py-1 
          rounded group-hover:bg-indigo-900/70 transition-colors duration-300">
            {referralLink}
          </p>
          <button
            onClick={openWhatsapp}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 
            rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 
            font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-4 
            focus:ring-green-400 focus:ring-offset-2"
          >
            Share on WhatsApp
          </button>
        </div>

        {/* Referral Code */}
        <div
          className="relative p-6 bg-gray-700 text-center rounded-2xl shadow-md 
          hover:shadow-lg hover:shadow-indigo-400/50 transform hover:-translate-y-1 
          transition-all duration-300 animate-fade-in-up border border-indigo-600/50 group"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <h2 className="text-lg md:text-xl font-semibold text-gray-200 mb-2 flex items-center justify-center gap-2">
            <span className="text-indigo-400">📋</span> Referral Code
          </h2>
          <p className="text-lg md:text-xl font-medium text-green-400 mb-3 group-hover:text-green-300 transition-colors duration-300">
            {profile?.referralCode || 'N/A'}
          </p>
          <button
            onClick={copyReferralCode}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-5 py-2 
            rounded-full hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 
            font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-4 
            focus:ring-teal-400 focus:ring-offset-2"
          >
            Copy Code
          </button>
        </div>

        {/* Verification */}
        <div
          className="relative p-6 bg-gray-700 text-center rounded-2xl shadow-md 
          hover:shadow-lg hover:shadow-indigo-400/50 transform hover:-translate-y-1 
          transition-all duration-300 animate-fade-in-up border border-indigo-600/50 group"
          data-aos="fade-up"
          data-aos-delay="700"
        >
          <h2 className="text-lg md:text-xl font-semibold text-gray-200 mb-2 flex items-center justify-center gap-2">
            <span className="text-indigo-400">✅</span> Verification
          </h2>
          {profile?.kycVerified ? (
            <p className="text-lg md:text-xl font-medium text-green-400 flex items-center justify-center 
            group-hover:text-green-300 transition-colors duration-300">
              <svg
                className="w-6 h-6 mr-2 text-green-400 group-hover:text-green-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Done
            </p>
          ) : (
            <Link
              to="/request-otp"
              className="text-lg md:text-xl font-medium text-teal-400 hover:text-teal-300 
              transition-colors duration-300"
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