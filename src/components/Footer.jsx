import React from "react";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  const handleClick = () => {
    // Handle button click
    window.location.href = "mailto:imrajesh2005@gmail.com";
  };
  return (
    <footer className="bg-[#F4F8FE]  text-gray-800 py-16 border-t border-amber-200/60 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Left Side - Brand */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold mb-2 text-amber-900 tracking-wide">
                <span className="text-4xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent">
                  राजेश
                </span>
              </h3>
              <p className="text-amber-700 text-lg font-semibold tracking-wide">
                Stay Connected
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed text-base max-w-md">
              Follow me on social media or reach out directly to stay updated
              with my latest endeavors and innovative projects.
            </p>

            {/* Social Media Icons */}
            <div className="flex justify-start pt-2">
              <SocialIcons />
            </div>
          </div>

          {/* Right Side - Contact CTA */}
          <div className="flex items-center justify-center md:justify-end">
            <div className="bg-gradient-to-br from-orange-100/80 via-amber-100/80 to-yellow-100/80 p-8 rounded-2xl border border-amber-200/60 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-500 max-w-sm w-full">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-amber-900 mb-2">
                  Ready to Work Together?
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Let's bring your innovative ideas to life
                </p>
                <button
                  onClick={handleClick}
                  className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 hover:from-amber-700 hover:via-orange-700 hover:to-yellow-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 w-full"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gradient-to-r from-amber-300/40 via-orange-300/40 to-yellow-300/40 pt-10">
          {/* Krishna Shloka */}
          <div className="mb-8 bg-gradient-to-r from-amber-200/40 via-orange-200/30 to-yellow-200/40 rounded-2xl p-6 border border-amber-300/50 shadow-inner backdrop-blur-sm">
            <div className="text-center space-y-3">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full"></div>
              </div>
              <p className="text-amber-800 text-lg font-semibold mb-2 drop-shadow-sm tracking-wide">
                कृष्णाय वासुदेवाय हरये परमात्मने 🦚
              </p>
              <p className="text-amber-800 text-lg font-semibold drop-shadow-sm tracking-wide">
                प्रणतः क्लेशनाशाय गोविन्दाय नमो नमः 🦚🙏
              </p>
              <div className="flex justify-center mt-3">
                <div className="w-12 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-3">
            <p className="text-gray-700 font-semibold text-lg">
              Made with <span className="text-red-500 animate-pulse">❤️</span>{" "}
              by{" "}
              <span className="text-amber-800 font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent">
                Rajesh Pandey
              </span>
            </p>
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Rajesh Pandey. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
