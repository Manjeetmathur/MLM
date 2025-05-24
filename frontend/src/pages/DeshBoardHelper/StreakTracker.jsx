import { useState, useEffect } from "react";
import { completeStreak, getPlanById } from "../../services/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StreakTracker = ({ planId }) => {
       const [streak, setStreak] = useState(0);
       const [balance, setBalance] = useState(0);
       const [taskCompletedToday, setTaskCompletedToday] = useState(false);
       const [loading, setLoading] = useState(false);
       const [error, setError] = useState("");
       const { user } = useSelector((st) => st.auth);
       const navigate = useNavigate();

       const fetchPlanData = async () => {
              try {
                     const data = await getPlanById({ planId });
                     setStreak(data.data.plan.streak);
                     setTaskCompletedToday(data.data.plan.taskCompletedToday || false);
              } catch (error) {
                     const errorMessage =
                            error.response?.data?.message || "Failed to fetch plan data.";
                     setError(errorMessage);
                     toast.error(errorMessage);
              }
       };

       useEffect(() => {
              fetchPlanData();
              setBalance(user.balance);
       }, [planId, user.balance]);

       const completeTask = async () => {
              try {
                     setLoading(true);
                     setError("");
                     const res = await completeStreak({ planId });
                     if (res.data.success) {
                            await fetchPlanData();
                            setStreak(res.data.streak);
                            setBalance(res.data.balance);
                            setTaskCompletedToday(true);
                            toast.success(res.data.message);
                     } else if (res.data.planDeleted) {
                            toast.success(res.data.message);
                            navigate("/dashboard");
                     } else {
                            toast.error(res.data.message);
                     }
              } catch (error) {
                     const errorMessage =
                            error.response?.data?.message || "Failed to complete task.";
                     setError(errorMessage);
                     toast.error(errorMessage);
              } finally {
                     setLoading(false);
              }
       };

       const handleCompleteTask = () => {
              completeTask();

       };

       const refreshData = () => {
              fetchPlanData();
              setBalance(user.balance);
              setError("");
       };

       // Calculate streak progress (e.g., for a 30-day milestone)
       const streakProgress = Math.min((streak / 30) * 100, 100);

       return (
              <div
                     className="flex items-center justify-center mt-4"
                     data-aos="fade-up"
                     data-aos-delay="200"
              >
                     <div
                            className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-md text-center 
        border border-indigo-600/50 transform hover:shadow-indigo-500/50 transition-all duration-300"
                     >
                            {/* Task Instructions */}
                            <p className="text-gray-300 text-sm mb-4">
                                   Complete your daily task to maintain your streak and earn rewards. Each
                                   streak day boosts your balance!
                            </p>

                            {/* Streak Display */}
                            <h2 className="text-xl font-bold text-white mb-2 relative group">
                                   🔥 Streak:{' '}
                                   <span className="text-orange-400 animate-pulse">{streak} Days</span>
                                   <span
                                          className="absolute hidden group-hover:block bg-gray-900 text-gray-300 
            text-xs rounded p-2 -mt-10 w-48"
                                   >
                                          Number of consecutive days you've completed your task.
                                   </span>
                            </h2>

                            {/* Streak Progress Bar */}
                            <div className="mb-4">
                                   <div className="w-full bg-gray-700 rounded-full h-2.5">
                                          <div
                                                 className="bg-gradient-to-r from-orange-400 to-red-400 h-2.5 rounded-full 
              transition-all duration-500"
                                                 style={{ width: `${streakProgress}%` }}
                                          ></div>
                                   </div>
                                   <p className="text-gray-400 text-xs mt-1">
                                          Progress to 30-day milestone: {streak}/20 days
                                   </p>
                            </div>

                            {/* Balance Display */}
                            <h2 className="text-xl font-bold text-white mb-4 relative group">
                                   💰 Balance:{' '}
                                   <span className="text-orange-400 animate-pulse">
                                          ₹{balance.toLocaleString()}
                                   </span>
                                   <span
                                          className="absolute hidden group-hover:block bg-gray-900 text-gray-300 
            text-xs rounded p-2 -mt-10 w-48"
                                   >
                                          Your current account balance, updated with streak rewards.
                                   </span>
                            </h2>

                            {/* Error Message */}
                            {error && (
                                   <p
                                          className="text-red-400 text-sm mb-4 bg-red-900/50 p-2 rounded-lg"
                                          data-aos="fade-up"
                                          data-aos-delay="300"
                                   >
                                          {error}
                                   </p>
                            )}

                            {/* Streak Milestones */}
                            <div className="flex justify-center gap-2 mb-4">
                                   {[7, 30, 100].map((milestone) => (
                                          <span
                                                 key={milestone}
                                                 className={`text-xs font-medium px-2 py-1 rounded-full ${streak >= milestone
                                                               ? "bg-green-900/50 text-green-400"
                                                               : "bg-gray-700 text-gray-400"
                                                        }`}
                                          >
                                                 {milestone} Days
                                          </span>
                                   ))}
                            </div>

                            {/* Complete Task Button */}
                            <button
                                   onClick={handleCompleteTask}
                                   disabled={taskCompletedToday || loading}
                                   className={`w-full px-4 py-2 rounded-xl text-lg font-semibold transition-all 
          flex items-center justify-center ${taskCompletedToday
                                                 ? "bg-gradient-to-r from-green-500 to-green-600 cursor-not-allowed"
                                                 : loading
                                                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 opacity-75 cursor-not-allowed"
                                                        : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md transform hover:scale-105 hover:from-indigo-700 hover:to-purple-700"
                                          }`}
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
                                                 Processing...
                                          </span>
                                   ) : taskCompletedToday ? (
                                          "✅ Task Completed"
                                   ) : (
                                          "🚀 Complete Task"
                                   )}
                            </button>

                            {/* Refresh Button */}
                            <button
                                   onClick={refreshData}
                                   className="w-full mt-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white 
          py-2 px-4 rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all 
          duration-300 font-semibold shadow-md hover:shadow-lg focus:outline-none 
          focus:ring-4 focus:ring-teal-400 focus:ring-offset-2"
                            >
                                   Refresh Data
                            </button>
                     </div>

                     {/* Custom CSS for animations, tooltips, and particles */}
                     <style>{`
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

export default StreakTracker;