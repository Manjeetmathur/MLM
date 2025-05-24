import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../../services/api';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [editName, setEditName] = useState('');
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    userId : ""
    
  });
  const fetchUser = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await getUserById({ id });
      if (result.data.success) {
        setUser(result.data.user);
      } else {
        throw new Error('User info not available');
      }
    } catch (error) {
      setError(error.message || 'Failed to fetch user data');
      toast.error(error.message || 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    return () => {
      // Cleanup to prevent memory leaks
      setUser(null);
    };
  }, [id]);

  const handleKycVerification = () => {
    
      navigate('/request-otp');
    
  };
  const handleSaveName = async () => {
    if (!editName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }
    formData.name=editName
    formData.userId = id
    try {
      const res = await updateUser({ ...formData });
      if (res.data.success) {
        fetchUser();
        toast.success("User updated");
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
    setShowPopup(false);
  };

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-gray-900"
        data-aos="fade-in"
      >
        <div className="text-center space-y-4">
          <svg
            className="animate-spin h-8 w-8 text-indigo-400 mx-auto"
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
          <p className="text-gray-300 text-lg">Loading profile...</p>
          {/* Skeleton UI */}
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl p-6 space-y-4">
            <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-20 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-20 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-20 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-20 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-gray-900"
        data-aos="fade-in"
      >
        <div className="text-center space-y-4 bg-gray-800 p-6 rounded-xl border border-red-600/50">
          <p className="text-red-400 text-lg">{error}</p>
          <button
            onClick={fetchUser}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 
            rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 
            font-semibold shadow-md hover:shadow-lg"
          >
            Retry
          </button>
          <p className="text-gray-300">
            <Link
              to="/dashboard"
              className="text-indigo-400 hover:text-indigo-300 hover:underline"
            >
              Return to Dashboard
            </Link>
          </p>
        </div>
      </div>
    );
  }
  return (
    <div
      className="min-h-screen bg-gray-900 py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-0 left-0 w-96 h-96 bg-indigo-900 rounded-full opacity-20 blur-3xl animate-pulse-slow"
        ></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900 rounded-full opacity-20 blur-3xl animate-pulse-slow"
        ></div>
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

      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-xl border border-indigo-600/50 relative z-10">
        {/* Profile Header */}
        <div
          className="bg- p-6 flex flex-col items-center space-y-4"
          data-aos="fade-down"
        >
          <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
            {user?.avatarUrl ? (
              <img
                src={user?.avatarUrl}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl text-gray-300">{user?.email[0].toUpperCase()}</span>
            )}
          </div>
          <h2 className="text-3xl font-bold text-white text-center">
            {user?.name || user?.email}
          </h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowPopup(true)}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            >
              Edit Profile
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to log out?')) {
                  dispatch(logout());
                  navigate('/logout');
                }
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 
              transition-all duration-300 font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
        {showPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
            <div className="bg-gray-800 p-6 rounded-xl w-[280px] max-w-md">
              <h3 className="text-lg font-semibold text-white mb-4">Edit Name</h3>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full p-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:ring-indigo-400 focus:border-indigo-400"
                placeholder="Enter your name"
              />
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleSaveName}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Summary Section */}
        <div
          className="p-6 bg-gray-700 rounded-lg mx-6 mt-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Profile Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-gray-300">Total Plans</p>
              <p className="text-lg font-medium text-indigo-400">{user?.plans?.length}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-300">Total Withdrawals</p>
              <p className="text-lg font-medium text-indigo-400">
                ₹{user?.withdrawMoney?.reduce((sum, w) => sum + w.money, 0).toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-300">KYC Status</p>
              <p className="text-lg font-medium">
                {user?.kycVerified ? (
                  <span className="text-green-400">✅ Verified</span>
                ) : (
                  <span className="text-red-400">❌ Not Verified</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 space-y-6" data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-xl font-semibold text-white mb-4">User Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-700 rounded-lg relative group">
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-lg font-medium text-gray-200">{user?.email}</p>
              <span
                className="absolute hidden group-hover:block bg-gray-900 text-gray-300 
                text-xs rounded p-2 -mt-10 w-48"
              >
                Your registered email address.
              </span>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg relative group">
              <p className="text-sm text-gray-400">Balance</p>
              <p className="text-lg font-medium text-gray-200">
                ₹{user?.balance?.toLocaleString()}
              </p>
              <span
                className="absolute hidden group-hover:block bg-gray-900 text-gray-300 
                text-xs rounded p-2 -mt-10 w-48"
              >
                Your current account balance, available for withdrawal.
              </span>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg flex justify-between items-center">
              <div className="relative group">
                <p className="text-sm text-gray-400">KYC Verified</p>
                <p className="text-lg font-medium">
                  {user?.kycVerified ? (
                    <span className="text-green-400">✅ Yes</span>
                  ) : (
                    <span className="text-red-400">❌ No</span>
                  )}
                </p>
                <span
                  className="absolute hidden group-hover:block bg-gray-900 text-gray-300 
                  text-xs rounded p-2 -mt-10 w-48"
                >
                  KYC verification is required for withdrawals.
                </span>
              </div>
              {!user?.kycVerified && (
                <button
                  onClick={handleKycVerification}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-3 py-1 
                  rounded-md hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 
                  text-sm shadow-md hover:shadow-lg"
                >
                  Verify KYC
                </button>
              )}
            </div>
            <div className="p-4 bg-gray-700 rounded-lg relative group">
              <p className="text-sm text-gray-400">Referral Code</p>
              <p className="text-lg font-medium text-gray-200">{user?.referralCode}</p>
              <span
                className="absolute hidden group-hover:block bg-gray-900 text-gray-300 
                text-xs rounded p-2 -mt-10 w-48"
              >
                Share this code to earn referral bonuses.
              </span>
            </div>
            <div className="p-4 bg-gray-700 rounded-lg md:col-span-2 relative group">
              <p className="text-sm text-gray-400">Referred By</p>
              <p className="text-lg font-medium text-gray-200">{user?.referredBy || 'N/A'}</p>
              <span
                className="absolute hidden group-hover:block bg-gray-900 text-gray-300 
                text-xs rounded p-2 -mt-10 w-48"
              >
                The referral code used when you registered.
              </span>
            </div>
          </div>

          {/* Payment History */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-xl font-semibold text-white mb-4">Payment History</h3>
            <div className="bg-gray-700 rounded-lg p-4 max-h-72 overflow-y-auto">
              {user?.paymentScreenshots?.length > 0 ? (
                user?.paymentScreenshots?.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center py-4 border-b border-gray-600 last:border-b-0 
                    hover:bg-gray-600 transition-colors"
                  >
                    <Link to={payment?.imageUrl}>
                      <img
                        src={payment?.imageUrl}
                        alt="Payment"
                        className="w-16 h-16 object-cover rounded-md mr-4"
                        onError={(e) => (e.target.src = '/placeholder-image.png')} // Fallback image
                      />
                    </Link>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-300">
                        <span className="font-medium">Amount:</span> ₹{payment?.money?.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-300">
                        <span className="font-medium">Date:</span>{' '}
                        {new Date(payment?.paymentDate).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-gray-300">
                        <span className="font-medium">Transaction ID:</span> {payment._id}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-400">No payment history available.</p>
                  <Link
                    to="/make-payment"
                    className="text-indigo-400 hover:text-indigo-300 hover:underline"
                  >
                    Make a Payment
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Investment Plans */}
          <div data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-xl font-semibold text-white mb-4">Investment Plans</h3>
            <div className="grid gap-4">
              {user?.plans?.length > 0 ? (
                user?.plans?.map((plan, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-700 rounded-lg hover:shadow-indigo-500/50 
                    transition-all duration-300"
                  >
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">Package:</span> ₹{plan?.packageAmount?.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">Daily Income:</span> ₹{plan?.dailyIncome?.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">Total Income:</span> ₹{plan?.totalIncome?.toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-400">No investment plans found.</p>
                  <Link
                    to="/investment-packages"
                    className="text-indigo-400 hover:text-indigo-300 hover:underline"
                  >
                    Explore Plans
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Withdrawals */}
          <div data-aos="fade-up" data-aos-delay="500">
            <h3 className="text-xl font-semibold text-white mb-4">Withdrawals</h3>
            <div className="grid gap-4">
              {user?.withdrawMoney?.length > 0 ? (
                user?.withdrawMoney?.map((withdraw, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-700 rounded-lg hover:shadow-indigo-500/50 
                    transition-all duration-300"
                  >
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">Amount:</span> ₹{withdraw?.money?.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">Date:</span>{' '}
                      {new Date(withdraw?.withdrawDate).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </p>
                    {withdraw?.status && (
                      <p className="text-sm text-gray-300">
                        <span className="font-medium">Status:</span>{' '}
                        <span
                          className={`${withdraw?.status === 'pending'
                            ? 'text-yellow-400'
                            : withdraw?.status === 'processed'
                              ? 'text-green-400'
                              : 'text-red-400'
                            }`}
                        >
                          {withdraw?.status?.charAt(0).toUpperCase() + withdraw?.status?.slice(1)}
                        </span>
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-400">No withdrawal history available.</p>
                  <Link
                    to="/withdraw"
                    className="text-indigo-400 hover:text-indigo-300 hover:underline"
                  >
                    Request Withdrawal
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="p-6 text-center" data-aos="fade-up" data-aos-delay="600">
          <button
            onClick={fetchUser}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 px-6 
            rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 
            font-semibold shadow-md hover:shadow-lg"
          >
            Refresh Profile
          </button>
        </div>
      </div>

      {/* Custom CSS for animations, tooltips, and particles */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100vh) translateX(${Math.random() * 30 - 15}px); opacity: 0.2; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in-down { animation: fadeInDown 0.8s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
        .animate-pulse-slow { animation: pulseSlow 8s ease-in-out infinite; }
        .animate-spin { animation: spin 1s linear infinite; }
        .particle { animation: float linear infinite; pointer-events: none; }
        .group-hover:block { display: none; }
        .group:hover .group-hover:block { display: block; }
      `}</style>
    </div>
  );
};

export default Profile;