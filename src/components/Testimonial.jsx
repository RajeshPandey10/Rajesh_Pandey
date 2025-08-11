import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchTestimonials } from "../services/api";
import { getImageUrl } from "../utils/imageUtils";
import { FaQuoteLeft, FaQuoteRight, FaStar, FaStarHalf } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState(1);
  const autoPlayRef = useRef(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await fetchTestimonials();
        // Ensure we only display approved testimonials
        const approvedTestimonials = data.filter(
          (testimonial) => testimonial.status === "approved"
        );
        setTestimonials(approvedTestimonials);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading testimonials:", error);
        setTestimonials([]);
        setIsLoading(false);
      }
    };
    loadTestimonials();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!testimonials.length) return;

    const autoPlay = () => {
      setCurrent((prevCurrent) => {
        // Calculate next slide with direction
        const nextSlide = (prevCurrent + direction) % testimonials.length;
        return nextSlide < 0 ? testimonials.length - 1 : nextSlide;
      });

      // Every 5 slides, change direction
      if (current > 0 && current % 5 === 0) {
        setDirection((prevDirection) => -prevDirection);
      }
    };

    autoPlayRef.current = setInterval(autoPlay, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [testimonials, current, direction]);

  const handlePrev = () => {
    clearInterval(autoPlayRef.current);
    setCurrent((prevCurrent) =>
      prevCurrent === 0 ? testimonials.length - 1 : prevCurrent - 1
    );
    // Optional: scroll to testimonials section
    document
      .getElementById("testimonials")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNext = () => {
    clearInterval(autoPlayRef.current);
    setCurrent((prevCurrent) =>
      prevCurrent === testimonials.length - 1 ? 0 : prevCurrent + 1
    );
    // Optional: scroll to testimonials section
    document
      .getElementById("testimonials")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half-star" className="text-yellow-400" />);
    }

    return stars;
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  // If no approved testimonials, don't render the component
  if (testimonials.length === 0 && !isLoading) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="bg-gradient-to-b from-black to-gray-900 py-16 px-6 relative overflow-hidden"
    >
      <motion.div
        className="container mx-auto max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
            Testimonials
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-blue-500 mx-auto"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-gray-400 mt-4 max-w-lg mx-auto"
          >
            What my clients and colleagues have to say about my work
          </motion.p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <div
            className="relative overflow-hidden h-[500px] sm:h-[400px]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left arrow */}
            <motion.button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/50 backdrop-blur-sm p-3 rounded-full text-white hover:bg-gray-700/70 transition-all"
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronLeft size={24} />
            </motion.button>

            {/* Right arrow */}
            <motion.button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/50 backdrop-blur-sm p-3 rounded-full text-white hover:bg-gray-700/70 transition-all"
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight size={24} />
            </motion.button>

            {/* Testimonials Carousel */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <div className="h-full flex flex-col items-center justify-center px-6 sm:px-10">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700 max-w-3xl relative">
                    <FaQuoteLeft className="absolute top-6 left-6 text-blue-500/20 text-4xl" />
                    <FaQuoteRight className="absolute bottom-6 right-6 text-blue-500/20 text-4xl" />

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="flex-shrink-0">
                        {testimonials[current].photo ? (
                          <img
                            src={getImageUrl(testimonials[current].photo)}
                            alt={testimonials[current].name}
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-blue-500"
                          />
                        ) : (
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
                            {testimonials[current].name.charAt(0)}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-1">
                          {testimonials[current].name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3">
                          {testimonials[current].role}
                        </p>
                        <div className="flex justify-center sm:justify-start mb-4">
                          {renderStars(testimonials[current].rating)}
                        </div>
                        <p className="text-gray-300 italic">
                          "{testimonials[current].message}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    current === index ? "bg-blue-500 w-6" : "bg-gray-500"
                  }`}
                  onClick={() => {
                    clearInterval(autoPlayRef.current);
                    setCurrent(index);
                    // Smooth scroll to testimonials section when dot is clicked
                    document
                      .getElementById("testimonials")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Background decorations */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`bg-circle-testimonial-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
            y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </section>
  );
};

export default Testimonial;
