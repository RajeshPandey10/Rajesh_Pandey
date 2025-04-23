import React, { useState, useEffect } from "react";
import img from "../assets/myphoto.png";
import hoverImg from "../assets/mymainphoto.png";
import { TypeAnimation } from "react-type-animation";
import SocialIcons from "./SocialIcons";
import Button from "./Button";
import { FaArrowUp, FaDownload, FaExpand } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Fade } from "react-awesome-reveal";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [currentImg, setCurrentImg] = useState(img);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("/assets/RajeshPandey-Resume.pdf");
  const [isPdfLoaded, setIsPdfLoaded] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openResumeInNewTab = () => {
    window.open(resumeUrl, "_blank");
  };

  // Update the download handling to avoid sandbox restrictions
  const handleDownloadResume = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Open in new tab is the most reliable approach across all devices and environments
    window.open(resumeUrl, "_blank");
  };

  // Function to render proper resume button based on device type
  const renderResumeButton = () => {
    const isMobile =
      /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

    if (isMobile) {
      return <Button text="View Resume" href={resumeUrl} download={true} />;
    } else {
      return (
        <Button
          text="View Resume"
          onClick={() => setShowResumeModal(true)}
          type="button"
        />
      );
    }
  };

  return (
    <>
      <section
        id="home"
        className="flex bg-gray-900 flex-col md:flex-row items-center justify-center overflow-hidden min-h-screen py-10"
      >
        <div className="md:w-1/2 flex justify-center transition-all duration-300 mb-6 md:mb-0">
          <div
            onMouseEnter={() => setCurrentImg(hoverImg)}
            onMouseLeave={() => setCurrentImg(img)}
          >
            <img
              src={currentImg}
              alt="rajesh"
              className="rounded-full sm:mb-20 w-80 sm:w-64 md:w-80 lg:w-[350px] xl:w-[400px] shadow-[0_0_15px_3px_rgba(222,205,205,0.8)] transition-colors duration-300 hover:shadow-[0_0_15px_3px_rgba(255,0,0,0.8)] "
            />
          </div>
        </div>
        <div className="md:w-1/2 text-center md:text-left mt-6 md:mt-0 p-4">
          <Fade direction="up">
            <h1 className="text-4xl sm:text-6xl font-bold mb-4 ">
              Hi,It's <span className="uppercase text-red-500">Rajesh</span>
            </h1>
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 ml-1">
              I'am a{" "}
              <span className="text-red-500">
                <TypeAnimation
                  sequence={[
                    "Software Engineer",
                    1000,
                    "Web Developer",
                    1000,
                    "Programmer",
                    1000,
                    "Tech Enthusiast",
                    1000,
                    "Full Stack Developer",
                    1000,
                  ]}
                  speed={50}
                  style={{ fontSize: "1.5rem" }}
                  repeat={Infinity}
                />
              </span>
            </h3>
            <p className="text-sm sm:text-lg mb-6 hover:shadow-[0_0_15px_3px_rgba(255,0,0,0.8)] hover:rounded-2xl transition duration-500 p-4 w-full">
              In my seventh semester of computer engineering school, I am a
              committed and driven learner who is passionate about using
              technology to develop original solutions. I've been consistently
              gaining a solid foundation in hardware, software, and programming
              through my coursework. I'm eager to apply my knowledge and gain
              practical experience in the field.
            </p>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4">
              <Button text="Hire Me" href="/contact" />
              {renderResumeButton()}
            </div>
            <div className="py-8 m-2">
              <SocialIcons />
            </div>
          </Fade>
        </div>
      </section>

      {/* Resume Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResumeModal(false)}
            >
              <motion.div
                className="w-11/12 h-[90vh] max-w-4xl bg-gray-900 rounded-xl overflow-hidden flex flex-col relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gray-800 p-4 flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">
                    My Resume
                  </h3>
                  <div className="flex gap-3">
                    <button
                      className="text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
                      onClick={openResumeInNewTab}
                      title="Open in new tab"
                    >
                      <FaExpand />
                    </button>
                    <button
                      className="text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
                      onClick={openResumeInNewTab} // Use openResumeInNewTab for all download actions
                      title="View resume"
                    >
                      <FaDownload />
                    </button>
                    <button
                      className="text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
                      onClick={() => setShowResumeModal(false)}
                      title="Close"
                    >
                      <IoMdClose />
                    </button>
                  </div>
                </div>

                {/* Mobile-friendly PDF Preview Container */}
                <div className="flex-1 w-full h-full bg-gray-100 flex flex-col items-center justify-center p-4">
                  <div className="h-full w-full flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center mb-6">
                      <div className="text-gray-700 text-center mb-4">
                        <p className="font-semibold text-xl mb-2">
                          Resume Preview
                        </p>
                        <p className="text-sm">
                          Due to browser security restrictions, the PDF cannot
                          be displayed directly.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <motion.button
                          onClick={openResumeInNewTab}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <FaExpand className="text-sm" /> View in Browser
                        </motion.button>

                        <motion.button
                          onClick={openResumeInNewTab} // Use openResumeInNewTab instead of handleDownloadResume
                          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <FaDownload className="text-sm" /> View PDF
                        </motion.button>
                      </div>
                    </div>

                    {/* Resume placeholder/image - Static content that won't cause DOM errors */}
                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 flex flex-col items-center justify-center w-4/5 h-4/5 max-w-lg bg-white">
                      <div className="text-4xl font-bold text-gray-400 mb-4">
                        RESUME
                      </div>
                      <div className="text-xl font-semibold text-gray-500 mb-2">
                        Rajesh Pandey
                      </div>
                      <div className="text-sm text-gray-500 mb-6">
                        Full Stack Developer
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={`line-${i}`}
                            className="h-2 bg-gray-200 rounded w-full"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 p-2 flex justify-center">
                  <button
                    onClick={openResumeInNewTab} // Use openResumeInNewTab for more reliable handling
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition-colors text-white py-2 px-4 rounded-lg"
                  >
                    <FaDownload /> View Resume
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
