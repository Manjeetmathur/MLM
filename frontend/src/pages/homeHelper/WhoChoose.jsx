import React from 'react'

const WhoChoose = () => {
       return (
              <div>
                     {/* Why Choose Us Section */}
                     <section className="py-20 ">
                            
                            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
                                   <h2
                                          className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
                                          data-aos="fade-up"
                                   >
                                          Why Choose Dream Pay?
                                   </h2>
                                   <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                          <div
                                                 className="bg-gray-600 from-blue-500 via-pink-400 to-blue-500  p-6 rounded-lg shadow-md hover:shadow-lg 
                    hover:shadow-indigo-500/30 transition-all duration-300"
                                                 data-aos="fade-up"
                                                 data-aos-delay="100"
                                          >
                                                 <h3 className="text-xl font-semibold text-yellow-400 mb-4">
                                                        Secure Platform
                                                 </h3>
                                                 <p className="text-gray-300">
                                                        Your data and transactions are protected with state-of-the-art
                                                        encryption and security protocols.
                                                 </p>
                                          </div>
                                          <div
                                                 className="bg-gray-600  from-blue-500 via-pink-400 to-blue-500  p-6 rounded-lg shadow-md hover:shadow-lg 
                    hover:shadow-indigo-500/30 transition-all duration-300"
                                                 data-aos="fade-up"
                                                 data-aos-delay="200"
                                          >
                                                 <h3 className="text-xl font-semibold text-yellow-400 mb-4">
                                                        High Returns
                                                 </h3>
                                                 <p className="text-gray-300">
                                                        Maximize your earnings with our competitive investment packages
                                                        and referral rewards.
                                                 </p>
                                          </div>
                                          <div
                                                 className="bg-gray-600  from-blue-500 via-pink-400 to-blue-500  p-6 rounded-lg shadow-md hover:shadow-lg 
                    hover:shadow-indigo-500/30 transition-all duration-300"
                                                 data-aos="fade-up"
                                                 data-aos-delay="300"
                                          >
                                                 <h3 className="text-xl font-semibold text-yellow-400 mb-4">
                                                        Easy to Use
                                                 </h3>
                                                 <p className="text-gray-300">
                                                        Our intuitive interface makes investing and earning accessible to
                                                        everyone, from beginners to experts.
                                                 </p>
                                          </div>
                                          <div
                                                 className="bg-gray-600 p-6 rounded-lg shadow-md hover:shadow-lg 
                    hover:shadow-indigo-500/30 transition-all duration-300"
                                                 data-aos="fade-up"
                                                 data-aos-delay="400"
                                          >
                                                 <h3 className="text-xl font-semibold text-yellow-400 mb-4">
                                                        24/7 Support
                                                 </h3>
                                                 <p className="text-gray-300">
                                                        Our dedicated support team is available around the clock to assist
                                                        you with any questions or issues.
                                                 </p>
                                          </div>
                                   </div>
                            </div>
                     </section>

              </div>
       )
}

export default WhoChoose
