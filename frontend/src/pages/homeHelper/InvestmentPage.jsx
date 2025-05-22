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
              <div className="py-16 px-4 sm:px-6 lg:px-8 rounded-2xl shadow-2xl
              bg-white g-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 relative overflow-hidden">
                     {/* Background decorative elements */}
                     <div className="absolute inset-0 z-0">
                            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-200 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
                            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
                     </div>

                     <div className="max-w-7xl mx-auto relative z-10">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6 text-gray-900 animate-fade-in-down">
                                   🔥 Dream Pay Plans 📈📊
                            </h1>
                            <p className="text-center text-lg sm:text-xl md:text-2xl mb-12 text-gray-700 font-medium">
                                   Daily ROI: <span className="text-indigo-600 font-semibold">10% for 20 Days</span>
                            </p>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                   {packages.map((pkg, index) => (
                                          <div
                                                 key={pkg.id}
                                                 className="p-6 bg-white border-2 border-blue-700 border-double rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                                                 style={{ animationDelay: `${index * 0.1}s` }}
                                          >
                                                 <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center">
                                                        Package ₹{pkg.amount.toLocaleString()}
                                                 </h2>
                                                 <p className="text-md md:text-lg text-gray-600 mt-3 text-center">
                                                        Daily Income:{' '}
                                                        <span className="font-semibold text-green-600">₹{pkg.dailyIncome.toLocaleString()}</span>
                                                 </p>
                                                 <p className="text-md md:text-lg font-medium text-indigo-600 mt-2 text-center">
                                                        Total: ₹{(pkg.dailyIncome * 20).toLocaleString()}
                                                 </p>
                                                 <Link to={`/join/${pkg.id}`}>
                                                        <button className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-md md:text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2 shadow-md">
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
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
      `}</style>
              </div>
       );
};

export default InvestmentPackages;