import React from 'react';

const D1 = ({ transaction, deposite }) => {
  // Simplify date formatting using JavaScript's Date object
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-md mx-auto">
      {deposite ? (
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <p className="text-green-600 text-lg font-semibold">
              + ₹{transaction.money?.toLocaleString()}
            </p>
          </div>
          <p className="text-gray-500 text-sm font-medium bg-gray-50 px-2 py-1 rounded">
            {formatDate(transaction.paymentDate)}
          </p>
        </div>
      ) : (
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <p className="text-red-600 text-lg font-semibold">
              - ₹{transaction.money?.toLocaleString()}
            </p>
          </div>
          <p className="text-gray-500 text-sm font-medium bg-gray-50 px-2 py-1 rounded">
            {formatDate(transaction.withdrawDate)}
          </p>
        </div>
      )}
    </div>
  );
};

export default D1;