import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import F1 from './homeHelper/F1';
import F2 from './homeHelper/F2';
import InvestmentPackages from './homeHelper/InvestmentPage';
import F3 from './homeHelper/F3';
import aos from 'aos';
import 'aos/dist/aos.css';
import WhoChoose from './homeHelper/WhoChoose';
import ContactUs from './ContactUs';
import About from './About';

const Home = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const registeredUsers = 12500; // Example number, replace with real data if available
  const canvasRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    aos.init({
      duration: 1000,
      once: false,
      easing: 'ease-out',
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = document.body.scrollWidth;
      canvas.height = document.body.scrollHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height + 10;
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 10 - 1;
        this.speedY = Math.random() * 5 - 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particlesArray = [];
    const numberOfParticles = 500;
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 580) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="font-sans bg-gray-900 text-gray-100 pt-20">
      {/* Hero Section */}
      <div className="relative flex flex-col h-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full z-0 "
          style={{ opacity: 0.5 }}
        />
        <div
          className=" bg-none mt-20 flex flex-col items-center 
        "
          data-aos="fade-in"
        >

          <div className="absolute inset-0 bg- opacity-30 z-0"></div>
          <div className="relative max-w-7xl px-6 sm:px-10 lg:px-12 text-center z-10">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white 
            mb-6 tracking-tight"
              data-aos="fade-down"
            >
              Welcome to Dream<span className="text-yellow-400">Pay</span>
            </h1>
            <p
              className="text-lg sm:text-xl md:text-2xl text-gray-200 font-medium 
            max-w-3xl mx-auto mb-8"
              data-aos="fade-up"
            >
              Unlock your financial potential with Dream Pay. Earn through innovative
              referral programs, smart investments, and a secure, user-friendly platform
              designed for your success.
            </p>
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="inline-block bg-yellow-400 text-gray-900 font-semibold py-4 px-8 
            rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-lg 
            hover:shadow-xl transform hover:-translate-y-1"
              data-aos="zoom-in"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Join Now'}
            </Link>
          </div>

        </div>
        <WhoChoose />
        {/* <InvestmentPackages /> */}

        {/* How It Works Section */}
        <section className="py-20 ">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
              data-aos="fade-up"
            >
              How It Works
            </h2>
            <div className="grid gap-12 md:grid-cols-3">
              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex 
              items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  Sign Up
                </h3>
                <p className="text-gray-300">
                  Create your free account in minutes and join our growing community
                  of investors.
                </p>
              </div>
              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex 
              items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  Invest or Refer
                </h3>
                <p className="text-gray-300">
                  Choose an investment package or invite friends to earn referral
                  bonuses.
                </p>
              </div>
              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex 
              items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  Earn Rewards
                </h3>
                <p className="text-gray-300">
                  Watch your earnings grow with our transparent and secure platform.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <F1 />
          <F2 />
        </div>


        {/* Testimonials Section */}
        <section className="py-20 bg-none">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
              data-aos="fade-up"
            >
              What Our Members Say
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div
                className="bg-gray-700 p-6 rounded-lg shadow-md"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <p className="text-gray-300 mb-4 italic">
                  "Dream Pay has transformed my financial journey. The referral
                  program is easy to use, and I've earned more than I expected!"
                </p>
                <p className="text-yellow-400 font-semibold">– Sarah M.</p>
              </div>
              <div
                className="bg-gray-700 p-6 rounded-lg shadow-md"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <p className="text-gray-300 mb-4 italic">
                  "The investment packages are fantastic, and the platform is so
                  secure. I feel confident growing my wealth here."
                </p>
                <p className="text-yellow-400 font-semibold">– James K.</p>
              </div>
              <div
                className="bg-gray-700 p-6 rounded-lg shadow-md"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <p className="text-gray-300 mb-4 italic">
                  "The support team is amazing, and the dashboard is super intuitive.
                  Dream Pay makes earning effortless."
                </p>
                <p className="text-yellow-400 font-semibold">– Maria L.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Registered Users Section */}
        <section className="py-20 bg-none0">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              data-aos="fade-up"
            >
              Join Our Thriving Community
            </h2>
            <p
              className="text-4xl md:text-5xl font-extrabold text-yellow-400"
              data-aos="zoom-in"
            >
              {registeredUsers.toLocaleString()} Members Registered
            </p>
            <p
              className="text-xl text-gray-200 mt-4 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Become part of a global network of investors and earners building wealth
              together with Dream Pay.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-none">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
              data-aos="fade-up"
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              <div
                className="bg-gray-700 p-6 rounded-lg"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  How do I start earning with Dream Pay?
                </h3>
                <p className="text-gray-300">
                  Simply sign up, choose an investment package or start referring
                  friends, and watch your earnings grow through our platform.
                </p>
              </div>
              <div
                className="bg-gray-700 p-6 rounded-lg"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  Is my money safe with Dream Pay?
                </h3>
                <p className="text-gray-300">
                  Yes, we use advanced encryption and security measures to protect
                  your funds and personal information.
                </p>
              </div>
              <div
                className="bg-gray-700 p-6 rounded-lg"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  Can I withdraw my earnings anytime?
                </h3>
                <p className="text-gray-300">
                  Absolutely! You can withdraw your earnings at any time, subject to
                  our standard processing times.
                </p>
              </div>
              <div
                className="bg-gray-700 p-6 rounded-lg"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  What makes Dream Pay different?
                </h3>
                <p className="text-gray-300">
                  Our unique combination of investment opportunities, referral
                  rewards, and a user-friendly platform sets us apart from traditional
                  financial services.
                </p>
              </div>
            </div>
          </div>
        </section>

        <F3 />
        {/* Footer Call-to-Action */}
        <section className="py-20 bg-none">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              data-aos="fade-up"
            >
              Ready to Transform Your Financial Future?
            </h2>
            <p
              className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Join thousands of members who are building wealth with Dream Pay's
              innovative platform.
            </p>
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="inline-block bg-yellow-400 text-gray-900 font-semibold py-4 px-8 
            rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-lg 
            hover:shadow-xl transform hover:-translate-y-1"
              data-aos="zoom-in"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Join Now'}
            </Link>
          </div>
          <div className="my-6">
            <About/>
          </div>
<ContactUs/>

        </section>
        
      </div>


    </div>
  );
};

export default Home;