import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import pan from '../assets/pan.jpg';
import tan from '../assets/tan.jpg';
import registration from '../assets/Registration.jpg';
const About = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <section
        className="bg-none text-white py-10 pt-36"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
            data-aos="fade-up"
          >
            About Dream Pay
          </h1>
          <p
            className="text-lg md:text-xl mb-8 text-gray-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Empowering wealth creation through innovation, community, and trust.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
            data-aos="fade-up"
          >
            Who We Are
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div data-aos="fade-right">
              <p className="text-gray-400 text-lg leading-relaxed">
                Founded in 2020, Dream Pay is a pioneering multi-level marketing platform dedicated to helping individuals achieve financial independence. With a global community of over 12,500 members, we offer a proven system for generating passive income through strategic investments and a robust referral program.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mt-4">
                Our vision is to democratize wealth-building by providing accessible, transparent, and rewarding opportunities. Whether you're a beginner or an experienced investor, Dream Pay equips you with the tools, resources, and support to secure your financial future and thrive in a collaborative network.
              </p>
            </div>
            <div data-aos="fade-left">
              <img
                src="https://cdn8.dissolve.com/p/D430_49_206/D430_49_206_1200.jpg"
                alt="Dream Pay Team"
                className="w-full rounded-lg shadow-xl border border-indigo-500/30 
                hover:shadow-indigo-500/50 transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-indigo-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
            data-aos="fade-up"
          >
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="text-center bg-gray-700 p-6 rounded-xl shadow-md 
              hover:shadow-indigo-500/50 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div
                className="bg-indigo-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 
                flex items-center justify-center"
              >
                <svg
                  className="w-8 h-8 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Empowerment</h3>
              <p className="text-gray-400">
                We provide cutting-edge tools, educational resources, and personalized support to help every member take charge of their financial journey and achieve lasting success.
              </p>
            </div>
            <div
              className="text-center bg-gray-700 p-6 rounded-xl shadow-md 
              hover:shadow-indigo-500/50 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div
                className="bg-indigo-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 
                flex items-center justify-center"
              >
                <svg
                  className="w-8 h-8 text-indigo-400"
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
              <h3 className="text-xl font-semibold mb-2 text-white">Transparency</h3>
              <p className="text-gray-400">
                Our operations are built on honesty and clarity, ensuring members have full visibility into their investments, earnings, and referral rewards at every step.
              </p>
            </div>
            <div
              className="text-center bg-gray-700 p-6 rounded-xl shadow-md 
              hover:shadow-indigo-500/50 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div
                className="bg-indigo-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 
                flex items-center justify-center"
              >
                <svg
                  className="w-8 h-8 text-indigo-400"
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
              <h3 className="text-xl font-semibold mb-2 text-white">Community</h3>
              <p className="text-gray-400">
                We cultivate a vibrant, inclusive network where members collaborate, share knowledge, and grow together toward collective prosperity.
              </p>
            </div>
          </div>
        </div>
      </section>

    

      {/* Our Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
            data-aos="fade-up"
          >
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              className="text-center bg-gray-700 p-6 rounded-xl shadow-md 
              hover:shadow-indigo-500/50 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-400">Integrity</h3>
              <p className="text-gray-400">
                We uphold the highest ethical standards, ensuring fairness and trust in all our dealings.
              </p>
            </div>
            <div
              className="text-center bg-gray-700 p-6 rounded-xl shadow-md 
              hover:shadow-indigo-500/50 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-400">Innovation</h3>
              <p className="text-gray-400">
                We embrace cutting-edge technology and strategies to deliver unparalleled opportunities.
              </p>
            </div>
            <div
              className="text-center bg-gray-700 p-6 rounded-xl shadow-md 
              hover:shadow-indigo-500/50 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-400">Inclusivity</h3>
              <p className="text-gray-400">
                We welcome everyone, fostering a diverse community united by shared goals.
              </p>
            </div>
            <div
              className="text-center bg-gray-700 p-6 rounded-xl shadow-md 
              hover:shadow-indigo-500/50 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-400">Excellence</h3>
              <p className="text-gray-400">
                We strive for perfection in our platform, support, and member experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Certificate 1 */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="bg-gray-800 p-6 rounded-xl shadow-md text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img
              src={pan}
              alt="Dream Pay Certificate of Excellence"
              className="w-full max-w-xs sm:max-w-sm mx-auto rounded-lg border border-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow duration-300"
            />
          </div>
        </div>
      </div>

      {/* Certificate 2 */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="bg-gray-800 p-6 rounded-xl shadow-md text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img
              src={registration}
              alt="Dream Pay Certificate of Trust"
              className="w-full max-w-xs sm:max-w-sm mx-auto rounded-lg border border-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow duration-300"
            />
            <p className="text-gray-400 text-sm mt-4">Registration Certificate</p>
          </div>
        </div>
      </div>
  {/* Certificate 3 */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="bg-gray-800 p-6 rounded-xl shadow-md text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img
              src={tan}
              alt="Dream Pay Certificate of Innovation"
              className="w-full max-w-xs sm:max-w-sm mx-auto rounded-lg border border-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow duration-300"
            />
            <p className="text-gray-400 text-sm mt-4">Tan Certified</p>
          </div>
        </div>
      </div>
      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center" data-aos="fade-up">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 tracking-tight"
            data-aos="fade-up"
          >
            Join the Dream Pay Revolution
          </h2>
          <p
            className="text-lg mb-6 text-gray-300"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Become part of a global community transforming lives through financial empowerment. Start your journey with Dream Pay today and unlock a world of opportunities.
          </p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/register'}
            className="inline-block bg-yellow-400 text-gray-900 font-semibold py-3 px-8 
            rounded-lg hover:bg-yellow-300 transition-all duration-300 shadow-md 
            hover:shadow-yellow-400/50 focus:outline-none focus:ring-4 focus:ring-yellow-300 
            focus:ring-offset-2"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started Now'}
          </Link>
        </div>
      </section>

      {/* Custom CSS for Animations */}
      <style>{`
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
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default About;