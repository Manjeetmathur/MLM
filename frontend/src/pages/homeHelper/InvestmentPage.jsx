import React from "react";
import { Link } from "react-router-dom";

const packages = [
  { id: 1, amount: 250, dailyIncome: 25 },
  { id: 2, amount: 500, dailyIncome: 50 },
  { id: 3, amount: 1000, dailyIncome: 100 },
  { id: 4, amount: 2500, dailyIncome: 250 },
  { id: 5, amount: 5000, dailyIncome: 500 },
];

const InvestmentPackages = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-none relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <h2
          className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
          data-aos="fade-up"
        >
          Investment Opportunities
        </h2>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6 text-yellow-400 animate-fade-in-down"
          data-aos="fade-down"
        >
          🔥 Dream Pay Plans 📈📊
        </h1>
        <p className="text-center text-lg sm:text-xl md:text-2xl mb-12 text-gray-300 font-medium">
          Daily ROI: <span className="text-indigo-400 font-semibold">10% for 20 Days</span>
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="p-6 bg-gray-800 border-2 border-indigo-600 border-double rounded-2xl shadow-lg 
              hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 transform 
              hover:-translate-y-2 animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <h2 className="text-xl md:text-2xl font-bold text-white text-center group-hover:text-yellow-400 transition-colors duration-300">
                Package ₹{pkg.amount.toLocaleString()}
              </h2>
              <p className="text-md md:text-lg text-gray-400 mt-3 text-center">
                Daily Income:{' '}
                <span className="font-semibold text-green-400">₹{pkg.dailyIncome.toLocaleString()}</span>
              </p>
              <p className="text-md md:text-lg font-medium text-indigo-400 mt-2 text-center">
                Total: ₹{(pkg.dailyIncome * 20).toLocaleString()}
              </p>
              <Link to={`/join/${pkg.id}`}>
                <button
                  className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                  py-3 px-6 rounded-full hover:from-indigo-700 hover:to-purple-700 
                  transition-all duration-300 text-md md:text-lg font-semibold 
                  focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-offset-2 
                  shadow-md hover:shadow-lg"
                >
                  Join Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
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
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default InvestmentPackages;