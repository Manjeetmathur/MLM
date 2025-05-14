import { useState, useEffect } from "react";
import { completeStreak, getPlanById } from "../../services/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StreakTracker = ({ planId }) => {
       const [streak, setStreak] = useState(0);
       const [balance, setBalance] = useState(0);
       const [taskCompletedToday, setTaskCompletedToday] = useState(false);
       const {user} = useSelector(st => st.auth)
       const navigate =useNavigate()
       const fetchPlanData = async () => {
              try {
                     const data = await getPlanById({ planId });
                     setStreak(data.data.plan.streak);
              } catch (error) {
                     console.error("Error fetching user data:", error);
              }
       };
       useEffect(() => {
              fetchPlanData();
       setBalance(user.balance)

       }, []);

       const completeTask = async () => {
              try {
                     const res = await completeStreak({ planId });
                     console.log(res)
                     if (res.data.success) {
                            fetchPlanData();
                            setStreak(res.data.streak)
                            setBalance(res.data.balance)
                            setTaskCompletedToday(true);
                            toast.success(res.data.message)
                     }
                     else if(res.data.planDeleted){
                            toast.success(res.data.message)
                            navigate("/dashboard")
                     }
                      else {
                            toast.error(res.data.message)
                            // navigate("/dashboard")

                     }
              } catch (error) {
                     alert(error.response.data.message);
              }
       };
       return (
              <div className="flex items-center justify-center mt-4">
                     <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                   🔥 Streak:
                                   <span className="text-orange-500 animate-pulse"> {streak} Days</span>
                            </h2>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                   🔥 Balance:
                                   <span className="text-orange-500 animate-pulse"> Rs. {balance} </span>
                            </h2>
                            <button
                                   onClick={completeTask}
                                   disabled={taskCompletedToday}
                                   className={`w-full px-1 py-1 rounded-xl text-lg font-semibold transition-all ${taskCompletedToday
                                          ? "bg-green-400 cursor-not-allowed"
                                          : "bg-blue-500 hover:bg-blue-600 text-white shadow-md transform active:scale-95"
                                          }`}
                            >
                                   {taskCompletedToday ? "✅ Task Completed" : "🚀 Complete Task"}
                            </button>
                     </div>
              </div>
       );
};

export default StreakTracker;
