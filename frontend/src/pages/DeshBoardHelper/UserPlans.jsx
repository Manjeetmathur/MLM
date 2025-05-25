import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import StreakTracker from "./StreakTracker";

const UserPlans = () => {
  const { user } = useSelector((st) => st.auth);
  const { id } = useParams();
  const plan = user?.plans?.find((p,idx) => idx == id); // Filter by plan ID
  const [showStreak, setShowStreak] = useState(false);
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

      <div className="w-full max-w-4xl mx-auto relative z-10">
        {/* Plan Overview Section */}
        <div
          className="mb-8 bg-gray-800 p-6 rounded-2xl shadow-xl border border-indigo-600/50 
          transform hover:shadow-indigo-500/50 transition-all duration-300 animate-fade-in-up"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Your Investment Plans
          </h2>
          <p className="text-gray-300 text-center">
            You have {user.plans.length} active plan{user.plans.length !== 1 ? 's' : ''} with a total 
            investment of ₹
            {user.plans.reduce((sum, p) => sum + p.packageAmount, 0).toLocaleString()}.
          </p>
          <div className="mt-4 flex justify-center">
            <Link
              to="/investment-packages"
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 px-6 
              rounded-full hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 
              font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-4 
              focus:ring-teal-400 focus:ring-offset-2"
            >
              Explore More Plans
            </Link>
          </div>
        </div>

        {/* Plan Details Section */}
        <div
          className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-indigo-600/50 
          transform hover:shadow-indigo-500/50 transition-all duration-300 animate-fade-in-up"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            📜 Plan Details
          </h2>

          {!plan ? (
            <div className="text-center">
              <p className="text-gray-400 text-lg mb-4">
                No plan found with the specified ID.
              </p>
              <Link
                to="/dashboard"
                className="text-indigo-400 hover:text-indigo-300 font-semibold 
                hover:underline transition-colors duration-200"
              >
                Return to Dashboard
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div
                className="bg-gray-700 p-5 rounded-lg border border-indigo-600/50 
                transition-all duration-300 hover:bg-gray-600"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-white">
                    💰 Package: ₹{plan.packageAmount.toLocaleString()}
                  </h3>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      plan.status === 'active'
                        ? 'bg-green-900/50 text-green-400'
                        : 'bg-red-900/50 text-red-400'
                    }`}
                  >
                    {plan.status?.charAt(0).toUpperCase() + plan.status?.slice(1) || 'Active'}
                  </span>
                </div>
                <p className="text-gray-300 mb-1">
                  📅 Started:{' '}
                  {new Date(plan.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-gray-300 mb-1 relative group">
                  💸 Daily Income:{' '}
                  <span className="text-green-400 font-medium">
                    ₹{plan.dailyIncome.toLocaleString()}
                  </span>
                  <span
                    className="absolute hidden group-hover:block bg-gray-900 text-gray-300 
                    text-xs rounded p-2 -mt-10 ml-2 w-48"
                  >
                    The amount you earn daily from this plan.
                  </span>
                </p>
                <p className="text-gray-300 mb-4 relative group">
                  🏦 Total Income:{' '}
                  <span className="text-indigo-400 font-medium">
                    ₹{plan?.totalIncome?.toLocaleString()}
                  </span>
                  <span
                    className="absolute hidden group-hover:block bg-gray-900 text-gray-300 
                    text-xs rounded p-2 -mt-10 ml-2 w-48"
                  >
                    The total earnings accumulated from this plan to date.
                  </span>
                </p>
                {/* Additional Metrics */}
                <p className="text-gray-300 mb-1 relative group">
                  ⏳ Duration:{' '}
                  <span className="text-yellow-400 font-medium">
                    {plan.duration || 'Ongoing'}
                  </span>
                  <span
                    className="absolute hidden group-hover:block bg-gray-900 text-gray-300 
                    text-xs rounded p-2 -mt-10 ml-2 w-48"
                  >
                    The expected or remaining duration of the plan.
                  </span>
                </p>
                <p className="text-gray-300 mb-4 relative group">
                  📈 Expected Returns:{' '}
                  <span className="text-teal-400 font-medium">
                    ₹{(plan.dailyIncome * (plan.durationDays||20)).toLocaleString()}
                  </span>
                  <span
                    className="absolute hidden group-hover:block bg-gray-900 text-gray-300 
                    text-xs rounded p-2 -mt-10 ml-2 w-48"
                  >
                    Projected total earnings based on daily income and duration.
                  </span>
                </p>
                <button
                  onClick={() => setShowStreak((prev) => !prev)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                  py-2 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 
                  transition-all duration-300 focus:outline-none focus:ring-4 
                  focus:ring-indigo-400 focus:ring-offset-2 font-semibold shadow-md 
                  hover:shadow-lg transform hover:-translate-y-1"
                >
                  {showStreak ? 'Hide Streak' : 'Show Streak'}
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    showStreak ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  {showStreak && <StreakTracker planId={plan._id} />}
                </div>
              </div>
            </div>
          )}
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
        .animate-fade-in-down { animation: fadeInDown 0.8s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
        .animate-pulse-slow { animation: pulseSlow 8s ease-in-out infinite; }
        .particle { animation: float linear infinite; pointer-events: none; }
        .group-hover:block { display: none; }
        .group:hover .group-hover:block { display: block; }
      `}</style>
    </div>
  );
};

export default UserPlans;