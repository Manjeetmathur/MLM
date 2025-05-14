import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StreakTracker from "./StreakTracker";

const UserPlans = () => {
  const { user } = useSelector((st) => st.auth);
  const { id } = useParams();
  const plans = user.plans.filter((p, idx) => idx == id); // Assuming id is an index
  const [makeStreak, setMakeStreak] = useState(false); // Renamed for clarity

  return (
    <div className="min-h-screen bg-gray-100 py-28 flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📜 Your Investment Plan
        </h2>

        {plans.length === 0 ? (
          <p className="text-gray-500 text-center">No plans purchased yet.</p>
        ) : (
          <div className="space-y-6">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="bg-indigo-50 p-5 rounded-lg shadow-md border border-indigo-100"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  💰 Package: ₹{plan.packageAmount}
                </h3>
                <p className="text-gray-600 mb-1">
                  📅 Started:{' '}
                  {new Date(plan.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-gray-600 mb-1">
                  💸 Daily Income: <span className="text-green-600 font-medium">₹{plan.dailyIncome}</span>
                </p>
                <p className="text-gray-600 mb-4">
                  🏦 Total Income: <span className="text-indigo-600 font-medium">₹{plan.totalIncome}</span>
                </p>
                <button
                  onClick={() => setMakeStreak((prev) => !prev)}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {makeStreak ? 'Hide Streak' : 'Show Streak'}
                </button>
                {makeStreak && <StreakTracker planId={plan._id} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPlans;