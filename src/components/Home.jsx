import React, { useState, useEffect } from "react";
import img from "../assets/my2photo.jpeg";
import hoverImg from "../assets/mymainphoto.png";
import { TypeAnimation } from "react-type-animation";
import SocialIcons from "./SocialIcons";
import Button from "./Button";
import { FaArrowUp } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import Testimonial from "./Testimonial";
import AdSense, { HeaderAd, InContentAd } from "./AdSense";
import SEO, { generatePageSEO } from "./SEO";



const Home = () => {
  const [currentImg, setCurrentImg] = useState(img);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll position to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const homeSEO = generatePageSEO("home");

  return (
    <>
      <SEO
        {...homeSEO}
        image="https://rajeshpandey10.com.np/assets/rajesh-pandey-profile.jpg"
        url="https://rajeshpandey10.com.np/"
      />
      <section
        id="home"
        className="flex bg-gray-900 flex-col md:flex-row items-center justify-center overflow-hidden min-h-screen py-10"
      >
        <div className="md:w-1/2 flex justify-center transition-all duration-300 mb-6 md:mb-0">
          <div
            // onMouseEnter={() => setCurrentImg(hoverImg)}
            onMouseLeave={() => setCurrentImg(img)}
          >
            <img
              src={currentImg}
              alt="Rajesh Pandey - Full Stack Web Developer from Nepal"
              className="rounded-full sm:mb-20 w-80 sm:w-64 md:w-80 lg:w-[350px] xl:w-[400px] shadow-[0_0_15px_3px_rgba(222,205,205,0.8)] transition-colors duration-300 hover:shadow-[0_0_15px_3px_rgba(255,0,0,0.8)]"
              loading="eager"
              width="400"
              height="400"
            />
          </div>
        </div>
        <div className="md:w-1/2 text-center md:text-left mt-6 md:mt-0 p-4">
          <Fade direction="up">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Hi, I'm{" "}
              <span className="uppercase text-red-500">Rajesh Pandey</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 ml-1">
              {" "}
              <span className="text-red-500">
                <TypeAnimation
                  sequence={[
                    "Full Stack Web Developer",
                    2000,
                    "MERN Stack Developer",
                    2000,
                    "React.js Developer",
                    2000,
                    "Node.js Specialist",
                    2000,
                    "Software Engineer",
                    2000,
                  ]}
                  speed={50}
                  style={{ fontSize: "1.5rem" }}
                  repeat={Infinity}
                />
              </span>
            </h2>
            <div className="text-sm sm:text-lg mb-6 hover:shadow-[0_0_15px_3px_rgba(255,0,0,0.8)] hover:rounded-2xl transition duration-500 p-4 w-full">
              <p className="mb-4">
                <strong>Rajesh Pandey</strong> - Professional Full Stack Web
                Developer from Nepal 🇳🇵
              </p>
              <p>
                I'm <strong>Rajesh Pandey</strong>, a dedicated Computer
                Engineering student in my 7th semester, specializing in{" "}
                <strong>MERN Stack development</strong> (MongoDB, Express.js,
                React.js, Node.js). With over 3+ years of hands-on experience, I
                create modern, scalable web applications that solve real-world
                problems. Currently working as an Associate Backend Developer at{" "}
                <strong>Covosys</strong> and MERN Intern at{" "}
                <strong>Lunar IT</strong>.
              </p>
              <p className="mt-2">
                🚀 <strong>Rajesh Pandey's</strong> Expertise: React.js •
                Node.js • MongoDB • Express.js • JavaScript • Python • Full
                Stack Development • Web Development Services
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4">
              <Button text="Hire Me" href="/contact" />
              <Button
                text="View Resume"
                href="/assets/RajeshPandey-Resume.pdf"
                download
              />
            </div>
            <div className="py-8 m-2">
              <SocialIcons />
            </div>
          </Fade>
        </div>
      </section>

      {/* Header Ad - Better positioned */}
      <div className="container mx-auto px-6 py-4">
        <HeaderAd />
      </div>

      <Testimonial />

     

      {/* In-content Ad */}
      <div className="container mx-auto px-6 py-4">
        <InContentAd />
      </div>

 

     

      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 z-50 p-3 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-700 transition-all duration-300 ${
          showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <FaArrowUp size={20} />
      </button>
    </>
  );
};

export default Home;
