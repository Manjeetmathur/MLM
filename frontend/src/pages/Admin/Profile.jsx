import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUserById } from '../../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getUserById({ id });
        setUser(result.data.user);
        if (!result.data.success) {
          toast.error("User info not Available");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [id]);



  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-200">
        <div className="text-xl font-medium text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-neutral-200 py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-neutral-100 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-indigo-500 p-6">
          <h2 className="text-3xl font-bold text-neutral-100 text-center">User Profile</h2>
        </div>

        {/* User Info */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-50 rounded-lg">
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg font-medium text-gray-900">{user.email}</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg">
              <p className="text-sm text-gray-600">Balance</p>
              <p className="text-lg font-medium text-gray-900">Rs.{user.balance}</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">KYC Verified</p>
                <p className="text-lg font-medium text-gray-900">
                  {user.kycVerified ? (
                    <span className="text-green-600">✅ Yes</span>
                  ) : (
                    <span className="text-red-600">❌ No</span>
                  )}
                </p>
              </div>
              {!user.kycVerified && (
                <Link to={'/request-otp'}>
                  <button
                    className="bg-teal-500 text-white px-3 py-1 rounded-md hover:bg-teal-600 transition-colors text-sm"
                  >
                    Verify KYC
                  </button>
                </Link>
              )}
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg">
              <p className="text-sm text-gray-600">Referral Code</p>
              <p className="text-lg font-medium text-gray-900">{user.referralCode}</p>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg md:col-span-2">
              <p className="text-sm text-gray-600">Referred By</p>
              <p className="text-lg font-medium text-gray-900">{user.referredBy || 'N/A'}</p>
            </div>
          </div>

          {/* Payment History */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment History</h3>
            <div className="bg-neutral-50 rounded-lg p-4 max-h-72 overflow-y-auto">
              {user.paymentScreenshots.length > 0 ? (
                user.paymentScreenshots.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center py-4 border-b last:border-b-0 hover:bg-neutral-100 transition-colors"
                  >
                    <img
                      src={payment.imageUrl}
                      alt="Payment"
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Amount:</span> Rs.{payment.money}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Date:</span>{' '}
                        {new Date(payment.paymentDate).toLocaleString()}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Transaction ID:</span> {payment.transactionId}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No payment history available.</p>
              )}
            </div>
          </div>

          {/* Investment Plans */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Investment Plans</h3>
            <div className="grid gap-4">
              {user.plans.length > 0 ? (
                user.plans.map((plan, index) => (
                  <div
                    key={index}
                    className="p-4 bg-neutral-50 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <p className="text-sm">
                      <span className="font-medium">Package:</span> Rs. {plan.packageAmount}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Daily Income:</span> Rs. {plan.dailyIncome}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Total Income:</span> Rs. {plan.totalIncome}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No investment plans found.</p>
              )}
            </div>
          </div>

          {/* Withdrawals */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Withdrawals</h3>
            <div className="grid gap-4">
              {user.withdrawMoney.length > 0 ? (
                user.withdrawMoney.map((withdraw, index) => (
                  <div
                    key={index}
                    className="p-4 bg-neutral-50 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <p className="text-sm">
                      <span className="font-medium">Amount:</span> Rs. {withdraw.money}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Date:</span>{' '}
                      {new Date(withdraw.withdrawDate).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No withdrawal history available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;