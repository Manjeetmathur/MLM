import React from 'react';

const F2 = () => {
  return (
    <section className="py-16 bg-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12 text-yellow-400 animate-fade-in-down"
          data-aos="fade-down"
        >
          Why Choose Dream Pay?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Proven System */}
          <div
            className="text-center p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl 
            hover:shadow-indigo-500/30 transition-all duration-300 transform 
            hover:-translate-y-2 animate-fade-in-up group"
            style={{ animationDelay: '0s' }}
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <div
              className="bg-indigo-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex 
              items-center justify-center shadow-md hover:scale-110 transition-transform 
              duration-300"
            >
              <svg
                className="w-8 h-8 text-indigo-400 animate-spin-slow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300">
              Proven System
            </h3>
            <p className="text-gray-400 text-md md:text-lg">
              Our MLM model is tested and trusted, delivering consistent returns to members worldwide.
            </p>
          </div>

          {/* Lucrative Referrals */}
          <div
            className="text-center p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl 
            hover:shadow-indigo-500/30 transition-all duration-300 transform 
            hover:-translate-y-2 animate-fade-in-up group"
            style={{ animationDelay: '0.1s' }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div
              className="bg-indigo-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex 
              items-center justify-center shadow-md hover:scale-110 transition-transform 
              duration-300"
            >
              <svg
                className="w-8 h-8 text-indigo-400 animate-spin-slow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 1.857h10M9 4h6m-6 0a3 3 0 013-3h0a3 3 0 013 3m-6 0v2m6-2v2"
                />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300">
              Lucrative Referrals
            </h3>
            <p className="text-gray-400 text-md md:text-lg">
              Earn generous bonuses by inviting friends and building your network effortlessly.
            </p>
          </div>

          {/* 24/7 Support */}
          <div
            className="text-center p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl 
            hover:shadow-indigo-500/30 transition-all duration-300 transform 
            hover:-translate-y-2 animate-fade-in-up group"
            style={{ animationDelay: '0.2s' }}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div
              className="bg-indigo-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex 
              items-center justify-center shadow-md hover:scale-110 transition-transform 
              duration-300"
            >
              <svg
                className="w-8 h-8 text-indigo-400 animate-spin-slow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.21 0-4 1.79-4 4v2h8v-2c0-2.21-1.79-4-4-4z"
                />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300">
              24/7 Support
            </h3>
            <p className="text-gray-400 text-md md:text-lg">
              Our dedicated team is available round-the-clock to assist you at every step.
            </p>
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
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        .animate-spin-slow {
          animation: spinSlow 10s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default F2;