import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import F1 from './homeHelper/F1';
import F2 from './homeHelper/F2';
import InvestmentPackages from './homeHelper/InvestmentPage';
import F3 from './homeHelper/F3';

const Home = () => {
  // Scroll to top on route change
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const registeredUsers = 12500; // Example number, replace with real data if available
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
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

    // Create particles
    const particlesArray = [];
    const numberOfParticles = 50;
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      // Connect particles
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
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

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="font-sans bg-gray-50 pt-10">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-700 via-blue-5=700 to-purple-700 py-20 lg:py-32 flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 text-black"
          style={{ opacity: 5 }}
        />
        <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
        <div className="relative max-w-6xl px-6 sm:px-10 lg:px-12 text-center z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight animate-fade-in-down">
            Welcome to <span className="text-yellow-300">Dream Pay</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-100 font-medium max-w-3xl mx-auto mb-8 animate-fade-in-up">
            Take control of your financial future with our innovative platform. Earn through referrals and smart investments, all in one secure place.
          </p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/register'}
            className="inline-block bg-yellow-400 text-gray-900 font-semibold py-4 px-8 rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Join Now'}
          </Link>
        </div>
      </section>

      {/* Plans Section */}
      <div className="p-6 bg-gradient-to-br from-indigo-300 via-blue-300 to-purple-300 bg-indigo-600 ">
        <InvestmentPackages />
      </div>

      {/* Features Sections */}
      <div className="bg-gray-50">
        <F1 />
        <F2 />
      </div>

      {/* Registered Users Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 text-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-pulse">Join Our Thriving Community</h2>
          <p className="text-4xl md:text-5xl font-extrabold text-indigo-600">
            {registeredUsers.toLocaleString()} Members Registered
          </p>
          <p className="text-xl mt-4 max-w-2xl mx-auto">
            Become part of a global network of investors and earners building wealth together.
          </p>
        </div>
      </section>

      <F3 />

      {/* Footer Call-to-Action */}
      <section className="py-16 bg-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of members who are transforming their financial future with Dream Pay.
          </p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/register'}
            className="inline-block bg-yellow-400 text-gray-900 font-semibold py-4 px-8 rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Join Now'}
          </Link>
        </div>
      </section>


    </div>
  );
};

export default Home;