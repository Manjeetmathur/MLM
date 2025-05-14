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
    <div className="flex p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 w-full max-w-md mx-auto">
      {deposite ? (
        <div className="flex justify-between items-center w-full">
          <p className="text-green-600 text-lg font-semibold">
            + Rs. {transaction.money}
          </p>
          <p className="text-gray-500 text-sm">
            {formatDate(transaction.paymentDate)}
          </p>
        </div>
      ) : (
        <div className="flex justify-between items-center w-full">
          <p className="text-red-600 text-lg font-semibold">
            - Rs. {transaction.money}
          </p>
          <p className="text-gray-500 text-sm">
            {formatDate(transaction.withdrawDate)}
          </p>
        </div>
      )}
    </div>
  );
};

export default D1;