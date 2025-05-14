import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const About = () => {
       const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

       return (
              <div className="bg-gradient-to-br from-blue-400 to-purple-200 ">
                     {/* Hero Section */}
                     <section className="bg-gradient-to-r   from-blue-300 to-indigo-400 text-white py-20  pt-36">
                            <div className="max-w-7xl mx-auto px-6 text-center">
                                   <h1 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">
                                          About Dream Pay
                                   </h1>
                                   <p className="text-lg md:text-xl mb-8" data-aos="fade-up" data-aos-delay="200">
                                          Building wealth together through innovation and community.
                                   </p>
                            </div>
                     </section>

                     {/* Introduction Section */}
                     <section className="py-16">
                            <div className="max-w-7xl mx-auto px-6">
                                   <h2 className="text-3xl font-bold text-center mb-8" data-aos="fade-up">
                                          Who We Are
                                   </h2>
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                          <div data-aos="fade-right">
                                                 <p className="text-gray-600 text-lg">
                                                        Dream Pay is a leading multi-level marketing platform designed to empower individuals to achieve financial freedom. Founded in 2020, we’ve grown into a global community of over 12,500 members who trust our proven system to generate passive income through smart investments and referrals.
                                                 </p>
                                                 <p className="text-gray-600 text-lg mt-4">
                                                        Our mission is to provide a transparent, reliable, and lucrative opportunity for everyone, from beginners to seasoned investors, to build wealth and secure their future.
                                                 </p>
                                          </div>
                                          <div data-aos="fade-left">
                                                 <img
                                                        src="https://cdn8.dissolve.com/p/D430_49_206/D430_49_206_1200.jpg"
                                                        alt="Dream Pay Team"
                                                        className="w-full rounded-lg shadow-lg"
                                                 />
                                          </div>
                                   </div>
                            </div>
                     </section>

                     {/* Mission Section */}
                     <section className="py-16 bg-gradient-to-r from-blue-400 to-purple-200 ">
                            <div className="max-w-7xl mx-auto px-6">
                                   <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">
                                          Our Mission
                                   </h2>
                                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                          <div className="text-center" data-aos="fade-up" data-aos-delay="100">
                                                 <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                        </svg>
                                                 </div>
                                                 <h3 className="text-xl font-semibold mb-2">Empowerment</h3>
                                                 <p className="text-gray-600">
                                                        Equip individuals with tools and opportunities to take control of their financial destiny.
                                                 </p>
                                          </div>
                                          <div className="text-center" data-aos="fade-up" data-aos-delay="200">
                                                 <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                                                        </svg>
                                                 </div>
                                                 <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                                                 <p className="text-gray-600">
                                                        Maintain clear and honest operations so our members can trust every step of their journey.
                                                 </p>
                                          </div>
                                          <div className="text-center" data-aos="fade-up" data-aos-delay="300">
                                                 <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 1.857h10M9 4h6m-6 0a3 3 0 013-3h0a3 3 0 013 3m-6 0v2m6-2v2" />
                                                        </svg>
                                                 </div>
                                                 <h3 className="text-xl font-semibold mb-2">Community</h3>
                                                 <p className="text-gray-600">
                                                        Foster a supportive network where every member thrives together.
                                                 </p>
                                          </div>
                                   </div>
                            </div>
                     </section>

                     {/* Call-to-Action Section */}
                     <section className="bg-blue-600 text-white py-12">
                            <div className="max-w-7xl mx-auto px-6 text-center" data-aos="fade-up">
                                   <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                          Ready to Join Dream Pay?
                                   </h2>
                                   <p className="text-lg mb-6">
                                          Start your journey to financial freedom with a trusted MLM leader.
                                   </p>
                                   <Link
                                          to={isAuthenticated ? '/dashboard' : '/register'}
                                          className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition duration-300"
                                          data-aos="zoom-in"
                                          data-aos-delay="200"
                                   >
                                          {isAuthenticated ? 'Go to Dashboard' : 'Get Started Now'}
                                   </Link>
                            </div>
                     </section>
              </div>
       );
};

export default About;