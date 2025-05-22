import React from 'react';

const F3 = () => {
  return (
    <div className="font-sans">
      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-indigo-200 to-blue-200 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-200 rounded-full opacity-15 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200 rounded-full opacity-15 blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-900 animate-fade-in-down">
            What Our Members Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              <p className="text-gray-600 text-md md:text-lg mb-4">
                "Dream Pay has transformed my financial life! The referral system is easy, and the returns are fantastic."
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="John Doe"
                  className="w-12 h-12 rounded-full mr-4 border-2 border-indigo-100"
                />
                <div>
                  <p className="font-semibold text-gray-800">John Doe</p>
                  <p className="text-sm text-gray-500">Member since 2023</p>
                </div>
              </div>
            </div>
            <div
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              <p className="text-gray-600 text-md md:text-lg mb-4">
                "The half-yearly plan gave me steady returns, and the support team is always there to help."
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Jane Smith"
                  className="w-12 h-12 rounded-full mr-4 border-2 border-indigo-100"
                />
                <div>
                  <p className="font-semibold text-gray-800">Jane Smith</p>
                  <p className="text-sm text-gray-500">Member since 2024</p>
                </div>
              </div>
            </div>
            <div
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <p className="text-gray-600 text-md md:text-lg mb-4">
                "I doubled my investment in a year! Highly recommend Dream Pay to anyone."
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/15.jpg"
                  alt="Mike Johnson"
                  className="w-12 h-12 rounded-full mr-4 border-2 border-indigo-100"
                />
                <div>
                  <p className="font-semibold text-gray-800">Jane Smith</p>
                  <p className="text-sm text-gray-500">Member since 2022</p>
                </div>
              </div>
            </div>
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
              opacity: 0.15;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.25;
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
      </section>
    </div>
  );
};

export default F3;