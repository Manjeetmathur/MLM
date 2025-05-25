import { useState } from 'react';
import toast from 'react-hot-toast';

const contactUs = async (data) => {
       // Placeholder API; replace with actual service
       return new Promise((resolve) => {
              setTimeout(() => {
                     resolve({ data: { success: true, message: 'Message sent successfully' } });
              }, 1000);
       });
};

const ContactUs = () => {
       const [formData, setFormData] = useState({
              name: '',
              email: '',
              message: '',
       });
       const [errors, setErrors] = useState({});
       const [loading, setLoading] = useState(false);

       const validateForm = () => {
              const newErrors = {};
              if (!formData.name.trim()) {
                     newErrors.name = 'Name is required';
              }
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                     newErrors.email = 'Please enter a valid email';
              }
              if (!formData.message.trim()) {
                     newErrors.message = 'Message is required';
              }
              setErrors(newErrors);
              return Object.keys(newErrors).length === 0;
       };

       const handleChange = (e) => {
              const { name, value } = e.target;
              setFormData({ ...formData, [name]: value });
              setErrors({ ...errors, [name]: '' });
       };

       const handleSubmit = async (e) => {
              e.preventDefault();
              if (!validateForm()) {
                     toast.error('Please fix the errors in the form');
                     return;
              }

              try {
                     setLoading(true);
                     const res = await contactUs(formData);
                     if (res.data.success) {
                            toast.success(res.data.message);
                            setFormData({ name: '', email: '', message: '' });
                     } else {
                            throw new Error(res.data.message || 'Failed to send message');
                     }
              } catch (err) {
                     const errorMessage = err.message || 'Failed to send message';
                     toast.error(errorMessage);
              } finally {
                     setLoading(false);
              }
       };

       return (
              <section className="min-h-screen mt-14 bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
                     <div className="max-w-6xl mx-auto">
                            <h1
                                   className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-4"
                                   data-aos="fade-up"
                            >
                                   Get in Touch
                            </h1>
                            <p
                                   className="text-center text-lg text-gray-300 mb-12"
                                   data-aos="fade-up"
                                   data-aos-delay="100"
                            >
                                   Have questions? Reach out to us, and let's start building your Dream Pay journey!
                            </p>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                   {/* Contact Form */}
                                   <div
                                          className="bg-gray-800 p-8 rounded-2xl border border-indigo-600/50 hover:shadow-indigo-500/50 transition-all"
                                          data-aos="fade-up"
                                          data-aos-delay="200"
                                   >
                                          <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                                          <form onSubmit={handleSubmit} className="space-y-6">
                                                 <div>
                                                        <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                                                               Name
                                                        </label>
                                                        <input
                                                               type="text"
                                                               id="name"
                                                               name="name"
                                                               placeholder="Enter your name"
                                                               value={formData.name}
                                                               onChange={handleChange}
                                                               className={`w-full p-3 bg-gray-700 text-gray-200 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-600'} focus:ring-indigo-400 focus:border-indigo-400 transition-all`}
                                                               disabled={loading}
                                                        />
                                                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                                                 </div>
                                                 <div>
                                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                                                               Email
                                                        </label>
                                                        <input
                                                               type="email"
                                                               id="email"
                                                               name="email"
                                                               placeholder="Enter your email"
                                                               value={formData.email}
                                                               onChange={handleChange}
                                                               className={`w-full p-3 bg-gray-700 text-gray-200 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-600'} focus:ring-indigo-400 focus:border-indigo-400 transition-all`}
                                                               disabled={loading}
                                                        />
                                                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                                                 </div>
                                                 <div>
                                                        <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                                                               Message
                                                        </label>
                                                        <textarea
                                                               id="message"
                                                               name="message"
                                                               placeholder="Your message"
                                                               value={formData.message}
                                                               onChange={handleChange}
                                                               rows="4"
                                                               className={`w-full p-3 bg-gray-700 text-gray-200 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-600'} focus:ring-indigo-400 focus:border-indigo-400 transition-all`}
                                                               disabled={loading}
                                                        />
                                                        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                                                 </div>
                                                 <button
                                                        type="submit"
                                                        className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg font-semibold transition-all hover:-translate-y-1 ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700'}`}
                                                        disabled={loading}
                                                 >
                                                        {loading ? (
                                                               <span className="flex items-center justify-center">
                                                                      <svg
                                                                             className="animate-spin h-5 w-5 mr-2 text-white"
                                                                             xmlns="http://www.w3.org/2000/svg"
                                                                             fill="none"
                                                                             viewBox="0 0 24 24"
                                                                      >
                                                                             <circle
                                                                                    className="opacity-25"
                                                                                    cx="12"
                                                                                    cy="12"
                                                                                    r="10"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="4"
                                                                             />
                                                                             <path
                                                                                    className="opacity-75"
                                                                                    fill="currentColor"
                                                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                             />
                                                                      </svg>
                                                                      Sending...
                                                               </span>
                                                        ) : (
                                                               'Send Message'
                                                        )}
                                                 </button>
                                          </form>
                                   </div>
                                   {/* Contact Info */}
                                   <div
                                          className="bg-gray-800 p-8 rounded-2xl border border-indigo-600/50 hover:shadow-indigo-500/50 transition-all"
                                          data-aos="fade-up"
                                          data-aos-delay="300"
                                   >
                                          <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                                          <div className="space-y-6 text-gray-300">
                                                 <div className="flex items-center">
                                                        <svg
                                                               className="w-6 h-6 text-teal-400 mr-3"
                                                               fill="none"
                                                               stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                        >
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                               />
                                                        </svg>
                                                        <p>  Email:{' '}
                                                               <a
                                                                      href="mailto:support@dreampay.com"
                                                                      className="hover:text-indigo-400 transition-colors duration-300"
                                                               >
                                                                      dreampay.help@gmail.com
                                                               </a></p>
                                                 </div>

                                                 <div className="flex items-center">
                                                        <svg
                                                               className="w-6 h-6 text-teal-400 mr-3"
                                                               fill="none"
                                                               stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                        >
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                               />
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                               />
                                                        </svg>
                                                        <p> Mumbai, India</p>
                                                 </div>
                                          </div>
                                          <h3 className="text-xl font-semibold text-white mt-8 mb-4">Follow Us</h3>
                                          <div className="flex space-x-4">
                                                 <a
                                                        href="https://wa.me/919876543210"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-300 hover:text-teal-400 transition-colors"
                                                 >
                                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                               <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.33.27 2.59.75 3.72L2 21.15l5.81-.84c1.05.56 2.21.88 3.43.88 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.41-.21-4.1.59.6-4.04-.22-.43a8.098 8.098 0 01-1.26-4.34c0-4.54 3.7-8.24 8.24-8.24m4.83 10.28c-.08-.14-.29-.22-.48-.28-.19-.06-.38-.12-.57-.22-.19-.1-.38-.21-.54-.34-.16-.12-.28-.28-.39-.45-.11-.16-.19-.35-.24-.54-.05-.19-.07-.39-.11-.59-.04-.19-.09-.38-.17-.56-.08-.18-.19-.34-.34-.47-.15-.13-.32-.2-.51-.24-.19-.04-.39-.06-.59-.06-.2 0-.41.02-.61.07-.2.05-.39.12-.57.22-.18.1-.34.24-.48.41-.14.17-.26.37-.36.59-.1.22-.17.46-.22.71-.05.25-.08.51-.08.78 0 .27.03.54.09.81.06.27.15.53.27.78.12.25.28.48.47.69.19.21.41.39.65.54.24.15.51.27.79.36.28.09.58.14.89.16.31.02.62-.01.92-.07.3-.06.58-.17.84-.33.26-.16.49-.37.68-.62.19-.25.34-.54.43-.86.09-.32.12-.65.09-1zm-6.29-2.71c.11.06.24.09.39.09.15 0 .29-.03.42-.09.13-.06.24-.15.33-.27.09-.12.15-.27.18-.44.03-.17.03-.36 0-.55-.03-.19-.09-.37-.19-.54-.1-.17-.24-.31-.41-.42-.17-.11-.37-.18-.59-.21-.22-.03-.45 0-.67.08-.22.08-.42.21-.59.39-.17.18-.3.41-.39.67-.09.26-.13.54-.13.83 0 .29.05.57.15.83.1.26.25.5.44.69.19.19.43.34.71.43.28.09.59.12.89.08z" />
                                                        </svg>
                                                 </a>
                                                 <a
                                                        href="https://twitter.com/DreamPayHQ"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-300 hover:text-teal-400 transition-colors"
                                                 >
                                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                               <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 002.048-2.578 9.3 9.3 0 01-2.958.981 4.67 4.67 0 00-7.938 4.25 13.229 13.229 0 01-9.602-4.868 4.67 4.67 0 001.442 6.22 4.647 4.647 0 01-2.114-.583v.06a4.67 4.67 0 003.737 4.574 4.67 4.67 0 01-2.106.08 4.67 4.67 0 004.355 3.234 9.355 9.355 0 01-5.794 1.994c-.376 0-.747-.022-1.112-.065a13.207 13.207 0 007.151 2.096c8.582 0 13.275-7.106 13.275-13.275 0-.202-.005-.403-.014-.603a9.473 9.473 0 002.325-2.41z" />
                                                        </svg>
                                                 </a>
                                                 <a
                                                        href="https://instagram.com/DreamPayHQ"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-300 hover:text-teal-400 transition-colors"
                                                 >
                                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                               <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 3.668.227 1.981 1.914 1.826 5.298.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.155 3.384 1.842 5.071 5.226 5.226 1.28.058 1.689.072 4.948.072s3.668-.014 4.948-.072c3.384-.155 5.071-1.842 5.226-5.226.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.155-3.384-1.842-5.071-5.226-5.226C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                                                        </svg>
                                                 </a>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </section>
       );
};

export default ContactUs;