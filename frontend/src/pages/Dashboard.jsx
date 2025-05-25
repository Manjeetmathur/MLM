import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProfile, getReferrals, levelIncome } from '../services/api';
import toast from 'react-hot-toast';
import D1 from './DeshBoardHelper/D1';
import D2 from './DeshBoardHelper/D2';
import F1 from './homeHelper/F1';
import Balance from './Balance';
import D3 from './DeshBoardHelper/D3';

export default function Dashboard() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const [referrals, setReferrals] = useState([]);
  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(0);
  const [level, setLevel] = useState(0);
  const [progress, setProgress] = useState(20);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [showTaskPopup, setShowTaskPopup] = useState(true);

  const getUserProfile = async () => {
    try {
      const response = await getProfile();
      setProfile(response.data.user);
    } catch (err) {
      console.error('Error fetching profile:', err);
      if (err.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        navigate('/login');
      }
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getReferrals();
      setReferrals(response.data);
      setBalance(response.data?.balance || 1500.75);
      setLevel(calculateLevel(response.data?.referrals?.length || 0));
      setProgress(calculateProgress(response.data?.referrals?.length || 0));
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    getUserProfile();
    fetchData();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchLevelIncome = async () => {
      try {
        await levelIncome({ userId: user?._id, level });
      } catch (error) {
        console.error('Error fetching level income:', error);
      }
    };
    if (user?._id && level > 0) {
      fetchLevelIncome();
    }
  }, [level, user?._id]);

  const calculateLevel = (referralCount) => {
    if (referralCount >= 20) return 5;
    if (referralCount >= 15) return 4;
    if (referralCount >= 10) return 3;
    if (referralCount >= 5) return 2;
    return 1;
  };

  const calculateProgress = (referralCount) => {
    if (referralCount >= 10) return 100;
    if (referralCount >= 5) return 60;
    return Math.min(referralCount * 10, 100);
  };
  return (
    <div className="min-h-screen bg-gray-900 mt-16 py-16 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-900 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
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

      <div className="max-w-7xl mx-auto relative z-10 ">
        {/* Complete Task Popup */}
        {!loading && user?.plans?.length && showTaskPopup && (
          <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-3 rounded-2xl w-[260px] border border-gray-700 shadow-2xl animate-fade-in z-50 transition-all duration-500">
            <button
              onClick={() => setShowTaskPopup(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 text-lg font-bold focus:outline-none"
            >
              ×
            </button>
            <p className="text-lg font-semibold mb-3">🔥 Complete your streak!</p>
            <Link
              to={`/plans`}
              className="block text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 
                 rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 
                 font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 
                 focus:ring-indigo-400 focus:ring-offset-2"
            >
              View Details
            </Link>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="flex items-center space-x-3 animate-fade-in-up">
              <svg
                className="animate-spin h-10 w-10 text-indigo-400"
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
              <p className="text-2xl font-medium text-gray-300">Loading Dashboard...</p>
            </div>
          </div>
        ) : (
          <>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-white mb-16 animate-fade-in-down"
              data-aos="fade-down"
            >
              🙏Welcome, {profile?.name || 'User'}!
            </h1>

            {/* Overview Section */}
            <D2 profile={profile} level={level} progress={progress} referrals={referrals} />

            {/* Referrals and Transactions */}
            <div className="space-y-16 my-16">
              {/* Your Plans */}
              <div
                className="bg-gray-800 rounded-3xl shadow-lg p-8 transform hover:shadow-xl 
                hover:shadow-indigo-500/30 transition-all duration-300 animate-fade-in-up"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8 text-center">
                  Your Plans
                </h2>
                {user?.plans?.length ? (
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {user.plans.map((item, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-600 rounded-2xl p-6 bg-gray-700 shadow-sm 
                        hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center"
                      >
                        <p className="text-lg font-medium text-gray-300 mb-2">
                          Package Amount:{' '}
                          <span className="text-indigo-400 font-bold">₹{item?.packageAmount?.toLocaleString()}</span>
                        </p>
                        <p className="text-lg font-medium text-gray-300 mb-4">
                          Daily Income:{' '}
                          <span className="text-green-400 font-bold">₹{item?.dailyIncome?.toLocaleString()}</span>
                        </p>
                        <Link
                          to={`/plans/${idx}`}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 
                          rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 
                          font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-4 
                          focus:ring-indigo-400 focus:ring-offset-2"
                        >
                          Go for Streak
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center text-lg">
                    No plans yet. Explore our{' '}
                    <Link to="/#packages" className="text-indigo-400 hover:underline font-medium">
                      investment packages
                    </Link>
                    !
                  </p>
                )}
              </div>

              {/* Referrals */}
              <div
                className="bg-gray-800 rounded-3xl shadow-lg p-8 transform hover:shadow-xl 
                hover:shadow-indigo-500/30 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: '0.2s' }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8 text-center">
                  Your Referrals
                </h2>
                {referrals?.referrals?.length > 0 ? (
                  <ul className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-700 pr-2">
                    {referrals.referrals.map((ref, idx) => (
                      <li
                        key={ref._id}
                        className="flex justify-between items-center border-b border-gray-600 py-4 
                        text-gray-300 hover:bg-gray-700 transition-colors duration-300 rounded-lg px-2 
                        animate-fade-in-up"
                        style={{ animationDelay: `${0.1 * idx}s` }}
                      >
                        <span className="font-medium text-lg text-white">{ref.name}</span>
                        <span className="text-sm text-gray-400 font-mono bg-gray-600 px-2 py-1 rounded">
                          {ref._id.slice(-6)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-center text-lg">
                    No referrals yet. Invite friends to earn bonuses!
                  </p>
                )}
              </div>

              {/* Recent Transactions */}
              <div
                className="bg-gray-800 rounded-3xl shadow-lg p-8 transform hover:shadow-xl 
                hover:shadow-indigo-500/30 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: '0.4s' }}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8 text-center">
                  Recent Transactions
                </h2>
                {user?.paymentScreenshots?.length || user?.withdrawMoney?.length ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {user?.paymentScreenshots?.map((item, idx) => (
                      <D1 transaction={item} deposite={true} key={`deposit-${idx}`} />
                    ))}
                    {user?.withdrawMoney?.map((item, idx) => (
                      <D1 transaction={item} deposite={false} key={`withdraw-${idx}`} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center text-lg">
                    No recent transactions yet.
                  </p>
                )}
              </div>
            </div>

            {/* Investment Packages */}
            <div
              id="packages"
              className="my-16 rounded-3xl animate-fade-in-up"
              style={{ animationDelay: '0.6s' }}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <F1 />
            </div>
            <Balance userId={user?._id} />
          </>
        )}
      </div>

      {/* Custom CSS for animations, scrollbar, and particles */}
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
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out;
        }
        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-indigo-600 {
          scrollbar-color: #4f46e5 #1f2937;
        }
        .scrollbar-track-gray-700 {
          scrollbar-color: #4f46e5 #1f2937;
        }
        .particle {
          animation: float linear infinite;
          pointer-events: none;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
      `}</style>
    </div>
  );
}