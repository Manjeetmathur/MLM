import React from 'react';

const F3 = () => {
  return (
    <div className="font-sans">
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12 text-yellow-400 animate-fade-in-down"
            data-aos="fade-down"
          >
            What Our Members Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl 
              hover:shadow-indigo-500/30 transition-all duration-300 transform 
              hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p className="text-gray-400 text-md md:text-lg mb-4">
                "Dream Pay has transformed my financial life! The referral system is easy, and the returns are fantastic."
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="John Doe"
                  className="w-12 h-12 rounded-full mr-4 border-2 border-indigo-400"
                />
                <div>
                  <p className="font-semibold text-white">John Doe</p>
                  <p className="text-sm text-gray-500">Member since 2023</p>
                </div>
              </div>
            </div>
            <div
              className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl 
              hover:shadow-indigo-500/30 transition-all duration-300 transform 
              hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <p className="text-gray-400 text-md md:text-lg mb-4">
                "The half-yearly plan gave me steady returns, and the support team is always there to help."
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Jane Smith"
                  className="w-12 h-12 rounded-full mr-4 border-2 border-indigo-400"
                />
                <div>
                  <p className="font-semibold text-white">Jane Smith</p>
                  <p className="text-sm text-gray-500">Member since 2024</p>
                </div>
              </div>
            </div>
            <div
              className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl 
              hover:shadow-indigo-500/30 transition-all duration-300 transform 
              hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <p className="text-gray-400 text-md md:text-lg mb-4">
                "I doubled my investment in a year! Highly recommend Dream Pay to anyone."
              </p>
              <div className="flex items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/15.jpg"
                  alt="Mike Johnson"
                  className="w-12 h-12 rounded-full mr-4 border-2 border-indigo-400"
                />
                <div>
                  <p className="font-semibold text-white">Mike Johnson</p>
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
          .animate-fade-in-down {
            animation: fadeInDown 0.8s ease-out;
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out;
          }
        `}</style>
      </section>
    </div>
  );
};

export default F3;