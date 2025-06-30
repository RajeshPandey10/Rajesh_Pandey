import React from "react";

const Footer = () => {
  const handleClick = () => {
    // Handle button click
    window.location.href = "mailto:imrajesh2005@gmail.com";
  };
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Left Side - Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-3xl font-bold">राजेश</span> 
            </h3>
            <p className="text-gray-300 mb-4">Stay Connected</p>
            <p className="text-gray-400">
              Follow me on social media or reach out directly to stay updated
              with my latest endeavors.
            </p>
          </div>

          {/* Right Side - Contact CTA */}
          <div className="text-center md:text-right">
            <button onClick={handleClick} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              Contact Me
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            Made with ❤️ by{" "}
            <span className="text-white font-medium">Rajesh Pandey</span>
          </p>
          <p className="text-gray-500 mt-2">
            © {new Date().getFullYear()} Rajesh Pandey. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
