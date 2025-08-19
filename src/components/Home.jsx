// ...existing code...
// Home.jsx
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Star,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon,
  ExternalLink,
  Download,
  Filter,
  X,
  Loader2,
  AlertCircle,
  ChevronUp,
} from "lucide-react";
import { fetchTestimonials, fetchGallery } from "../services/api";
import heroPhoto from "../assets/myimg.png";
import SocialIcons from "./SocialIcons";

// Lazy Image Component for Performance
const LazyImage = ({ src, alt, className, ...props }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageRef, setImageRef] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let observer;
    if (imageRef && imageSrc === null) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(imageRef);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(imageRef);
    }
    return () => {
      if (observer && observer.unobserve && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, imageSrc, src]);

  return (
    <div ref={setImageRef} className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" />
      )}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded-lg">
          <AlertCircle className="w-8 h-8 text-gray-400" />
        </div>
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={className}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          {...props}
        />
      )}
    </div>
  );
};

// Typewriter Effect Component
const TypewriterEffect = ({ words }) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const word = words[currentWord];

        if (!isDeleting) {
          setCurrentText(word.substring(0, currentText.length + 1));

          if (currentText === word) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setCurrentText(word.substring(0, currentText.length - 1));

          if (currentText === "") {
            setIsDeleting(false);
            setCurrentWord((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 150
    );

    return () => clearTimeout(timeout);
  }, [currentText, currentWord, isDeleting, words]);

  return (
    <span className="text-blue-600">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
  </div>
);

// Loading Bar Component
const LoadingBar = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 200);
      return () => clearInterval(interval);
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }
  }, [isLoading]);

  if (progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
      <motion.div
        className="h-full bg-blue-600"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

// Animated Section Wrapper
const AnimatedSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

// Gallery Modal Component
const GalleryModal = ({
  item,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  onIndexChange,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  if (!item) return null;

  const images = item.images || [item.image];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Main Image */}
          <div className="relative flex-1 flex items-center justify-center">
            <img
              src={images[currentIndex]}
              alt={`${item.title} - Image ${currentIndex + 1}`}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all hover:scale-110"
                  aria-label="Previous image"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all hover:scale-110"
                  aria-label="Next image"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Image Info and Thumbnails */}
          <div className="mt-4 space-y-4">
            {/* Title and Description */}
            <div className="text-center">
              <h3 className="text-white text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300 capitalize mb-2">{item.category}</p>
              {item.description && (
                <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                  {item.description}
                </p>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex justify-center items-center gap-2 pb-4">
                <div className="flex gap-2 max-w-xl overflow-x-auto py-2 px-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        onIndexChange(index);
                      }}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                        index === currentIndex
                          ? "border-white shadow-lg"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="text-center text-gray-400 text-sm">
                {currentIndex + 1} of {images.length}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main Home Component
const Home = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentGalleryPage, setCurrentGalleryPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isPaused, setIsPaused] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const IMAGES_PER_PAGE = 8;

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-play testimonials
  useEffect(() => {
    if (testimonials.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, isPaused]);

  // Fetch data with retry logic
  const loadData = useCallback(async (retryCount = 0) => {
    try {
      setLoading(true);
      setError(null);

      const [testimonialsData, galleryData] = await Promise.all([
        fetchTestimonials(),
        fetchGallery(1, 50),
      ]);

      setTestimonials(testimonialsData || []);
      setGallery(galleryData.items || galleryData || []);
    } catch (error) {
      console.error("Error loading data:", error);

      if (retryCount < 3) {
        setTimeout(() => loadData(retryCount + 1), 1000 * (retryCount + 1));
      } else {
        setError("Failed to load content. Please refresh the page.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ["all", ...new Set(gallery.map((item) => item.category))];
    return cats;
  }, [gallery]);

  // Filter gallery items
  const filteredGallery = useMemo(() => {
    if (activeFilter === "all") return gallery;
    return gallery.filter((item) => item.category === activeFilter);
  }, [gallery, activeFilter]);

  // Get current page gallery items
  const getCurrentPageGallery = useCallback(() => {
    const startIndex = currentGalleryPage * IMAGES_PER_PAGE;
    return filteredGallery.slice(startIndex, startIndex + IMAGES_PER_PAGE);
  }, [currentGalleryPage, filteredGallery]);

  const totalGalleryPages = Math.ceil(filteredGallery.length / IMAGES_PER_PAGE);

  // Navigation handlers
  const handleHireMeClick = () => navigate("/contact");

  const handleViewResumeClick = () => {
    const link = document.createElement("a");
    link.href = "/assets/Rajesh_Pandey_resume.pdf";
    link.download = "RajeshPandey_Resume.pdf";
    link.click();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Gallery navigation
  const nextGalleryPage = () => {
    setCurrentGalleryPage((prev) => (prev + 1) % totalGalleryPages);
  };

  const prevGalleryPage = () => {
    setCurrentGalleryPage(
      (prev) => (prev - 1 + totalGalleryPages) % totalGalleryPages
    );
  };

  // Testimonial navigation
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Gallery modal handlers
  const openGalleryModal = (item) => {
    setSelectedImage(item);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedImage && selectedImage.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedImage.images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage && selectedImage.images) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + selectedImage.images.length) % selectedImage.images.length
      );
    }
  };

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to content
      </a>

      {/* Loading Bar */}
      <LoadingBar isLoading={loading} />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40 flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <div id="main-content">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 pt-8 md:pt-10 pb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[80vh]">
              {/* Left Content - Hero Image with Parallax */}
              <motion.div
                className="flex-1 flex justify-center lg:justify-start order-1"
                style={{ transform: `translateY(${scrollY * 0.2}px)` }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="relative"
                >
                  <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-gradient-to-br from-blue-100 to-indigo-100">
                    <img
                      src={heroPhoto}
                      alt="Rajesh Pandey - Full Stack Web Developer"
                      className="w-full h-full object-contain"
                      style={{
                        objectPosition: "center top",
                        transform: "scale(1.015)",
                        transformOrigin: "center",
                      }}
                    />
                  </div>
                  {/* Animated decorative elements */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="absolute -top-4 -right-4 w-8 h-8 bg-blue-600 rounded-full"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 2,
                      delay: 1,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-indigo-500 rounded-full"
                  />
                </motion.div>
              </motion.div>

              {/* Right Content - Description */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 text-left lg:pl-12 order-2"
              >
                {/* Main Heading */}
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Hi, I'm{" "}
                  <span className="text-blue-600 font-bold text-5xl lg:text-6xl">
                    Rajesh
                  </span>
                </h1>

                <h2 className="text-2xl lg:text-3xl font-medium text-gray-700 mb-6 h-10">
                  <TypewriterEffect
                    words={[
                      "Full Stack Developer",
                      "MERN Specialist",
                      "AI/ML Enthusiast",
                      "Problem Solver",
                    ]}
                  />
                </h2>

                {/* Description */}
                <div className="text-lg text-gray-600 mb-8 space-y-4">
                  <p>
                    <strong className="text-gray-900">
                      Rajesh Pandey - Professional Full Stack Web Developer from
                      Nepal 🇳🇵
                    </strong>
                  </p>
                  <p>
                    I'm Rajesh Pandey, a dedicated Computer Engineering student
                    in my 7th semester, specializing in MERN Stack development
                    (MongoDB, Express.js, React.js, Node.js). With over 3+ years
                    of hands-on experience, I create modern, scalable web
                    applications that solve real-world problems.
                  </p>
                  <p>
                    Currently working as an Associate Backend Developer at
                    Covosys and MERN Developer and AI/ML trainer at YOUTH IT, I
                    focus on building efficient, user-friendly solutions that
                    make a difference.
                  </p>
                </div>

                {/* Skills Tags with Animation */}
                <div className="mb-8">
                  <p className="text-gray-700 font-medium mb-3">
                    🚀 Technical Expertise:
                  </p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, staggerChildren: 0.1 }}
                    className="flex flex-wrap gap-2"
                  >
                    {[
                      "React.js",
                      "Node.js",
                      "MongoDB",
                      "Express.js",
                      "JavaScript",
                      "Python",
                      "AI/ML",
                      "Full Stack Development",
                    ].map((skill, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 mb-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleHireMeClick}
                    className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    Hire Me
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleViewResumeClick}
                    className="px-8 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    View Resume
                  </motion.button>
                </motion.div>

                {/* Social Media Icons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <p className="text-gray-600 font-medium">Connect with me:</p>
                  <SocialIcons />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Additional Content Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
                <button
                  onClick={() => loadData()}
                  className="text-red-700 underline hover:no-underline"
                >
                  Try again
                </button>
              </motion.div>
            )}

            {/* Sanskrit Shloka */}
            <AnimatedSection>
              <div className="text-center mb-16">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg border border-blue-100 max-w-4xl mx-auto">
                  <p className="text-xl text-gray-700 italic mb-3 font-serif">
                    "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा
                    ते सङ्गोऽस्त्वकर्मणि॥"
                  </p>
                  <p className="text-sm text-gray-500">
                    "You have the right to perform your actions, but not to the
                    fruits of those actions.
                    <br />
                    Let not the fruits of action be your motive, nor let your
                    attachment be to inaction."
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Gallery Section */}
            <AnimatedSection delay={0.2}>
              <div className="mb-24">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
                    <ImageIcon className="w-4 h-4" />
                    Gallery
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Work & Life Moments
                  </h2>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                    A glimpse into my professional journey and workspace
                  </p>

                  {/* Filter Buttons */}
                  {!loading && gallery.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-wrap justify-center gap-2 mb-8"
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg text-gray-600 text-sm mb-2">
                        <Filter className="w-4 h-4" />
                        Filter by:
                      </div>
                      {categories.map((category) => (
                        <motion.button
                          key={category}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setActiveFilter(category);
                            setCurrentGalleryPage(0);
                          }}
                          className={`px-4 py-2 rounded-full transition-all duration-300 ${
                            activeFilter === category
                              ? "bg-blue-600 text-white shadow-lg transform scale-105"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                          {activeFilter === category && (
                            <span className="ml-2 text-xs">
                              ({filteredGallery.length})
                            </span>
                          )}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}

                  {/* Gallery Pagination Controls */}
                  {!loading && filteredGallery.length > IMAGES_PER_PAGE && (
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
                      <div className="flex items-center gap-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={prevGalleryPage}
                          disabled={totalGalleryPages <= 1}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300"
                          aria-label="Previous page"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Prev
                        </motion.button>

                        <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                          Page {currentGalleryPage + 1} of {totalGalleryPages}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={nextGalleryPage}
                          disabled={totalGalleryPages <= 1}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300"
                          aria-label="Next page"
                        >
                          Next
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Gallery Grid */}
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {[...Array(4)].map((_, i) => (
                      <SkeletonLoader key={i} />
                    ))}
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeFilter}-${currentGalleryPage}`}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                    >
                      {getCurrentPageGallery().map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -8 }}
                          className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform flex flex-col h-[520px]"
                          onClick={() => openGalleryModal(item)}
                        >
                          {/* Image Container */}
                          <div className="relative h-64 overflow-hidden bg-gray-100">
                            <LazyImage
                              src={item.images ? item.images[0] : item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />

                            {/* Image Count Badge */}
                            {item.images && item.images.length > 1 && (
                              <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-xs font-medium flex items-center gap-1">
                                <ImageIcon className="w-3 h-3" />
                                {item.images.length}
                              </div>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileHover={{ scale: 1, opacity: 1 }}
                                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                              >
                                <ExternalLink className="w-5 h-5 text-gray-700" />
                              </motion.div>
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="p-6 flex-1 flex flex-col">
                            <h3 className="font-bold text-gray-900 text-xl mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </h3>

                            {item.description && (
                              <div className="flex-1 mb-4">
                                <div className="h-40 overflow-y-auto pr-2 border border-gray-100 rounded-lg p-3 bg-gray-50 custom-scrollbar">
                                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full capitalize">
                                {item.category}
                              </span>

                              {item.images && item.images.length > 1 && (
                                <span className="text-gray-500 text-xs font-medium">
                                  {item.images.length} photos
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Gallery Page Indicators */}
                {!loading && filteredGallery.length > IMAGES_PER_PAGE && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center gap-4 mt-10"
                  >
                    <div className="flex justify-center items-center gap-2">
                      {Array.from({ length: totalGalleryPages }).map(
                        (_, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.2 }}
                            onClick={() => setCurrentGalleryPage(index)}
                            className={`transition-all duration-300 ${
                              index === currentGalleryPage
                                ? "w-8 h-3 bg-blue-600 rounded-full"
                                : "w-3 h-3 bg-blue-200 hover:bg-blue-300 rounded-full"
                            }`}
                            aria-label={`Go to page ${index + 1}`}
                          />
                        )
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      Showing {getCurrentPageGallery().length} of{" "}
                      {filteredGallery.length} items
                    </p>
                  </motion.div>
                )}
              </div>
            </AnimatedSection>

            {/* Testimonials Section */}
            <AnimatedSection delay={0.4}>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
                  <Quote className="w-4 h-4" />
                  Testimonials
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  What Clients Say
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12">
                  Feedback from satisfied clients and collaborators
                </p>

                {loading ? (
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
                      <div className="animate-pulse">
                        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
                        <div className="flex justify-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className="w-5 h-5 bg-gray-200 rounded"
                            ></div>
                          ))}
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto"></div>
                      </div>
                    </div>
                  </div>
                ) : testimonials.length > 0 ? (
                  <div
                    className="relative max-w-4xl mx-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentTestimonial}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100"
                      >
                        <div className="text-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 20 }}
                            className="flex justify-center mb-6"
                          >
                            <img
                              src={testimonials[currentTestimonial]?.photo}
                              alt={testimonials[currentTestimonial]?.name}
                              className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${testimonials[currentTestimonial]?.name}&background=3B82F6&color=fff`;
                              }}
                            />
                          </motion.div>
                          <Quote className="w-8 h-8 text-blue-500 mx-auto mb-6" />
                          <p className="text-lg text-slate-700 mb-6 italic max-w-3xl mx-auto">
                            "{testimonials[currentTestimonial]?.message}"
                          </p>
                          <div className="flex justify-center mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < testimonials[currentTestimonial]?.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <h4 className="text-xl font-semibold text-slate-900 mb-1">
                            {testimonials[currentTestimonial]?.name}
                          </h4>
                          <p className="text-slate-600">
                            {testimonials[currentTestimonial]?.role}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    {testimonials.length > 1 && (
                      <div className="flex justify-center items-center gap-4 mt-8">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={prevTestimonial}
                          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                          aria-label="Previous testimonial"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </motion.button>
                        <div className="flex gap-2">
                          {testimonials.map((_, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.2 }}
                              onClick={() => setCurrentTestimonial(index)}
                              className={`transition-all duration-300 ${
                                index === currentTestimonial
                                  ? "w-8 h-3 bg-blue-600 rounded-full"
                                  : "w-3 h-3 bg-blue-200 hover:bg-blue-300 rounded-full"
                              }`}
                              aria-label={`Go to testimonial ${index + 1}`}
                            />
                          ))}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={nextTestimonial}
                          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                          aria-label="Next testimonial"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </div>
                    )}

                    {/* Auto-play indicator */}
                    {testimonials.length > 1 && (
                      <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                          {isPaused ? "Paused" : "Auto-playing"} • Hover to
                          pause
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-50 rounded-2xl p-12 text-center">
                      <Quote className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        No testimonials available yet.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Gallery Modal */}
        {selectedImage && (
          <GalleryModal
            item={selectedImage}
            currentIndex={currentImageIndex}
            onClose={() => setSelectedImage(null)}
            onNext={nextImage}
            onPrev={prevImage}
            onIndexChange={setCurrentImageIndex}
          />
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f1f1;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Prevent layout shift on scrollbar */
        body {
          overflow-y: scroll;
        }

        /* Animation keyframes */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        /* Gallery item hover effects */
        .gallery-item-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Testimonial transition */
        .testimonial-transition {
          transition: all 0.5s ease-in-out;
        }

        /* Loading skeleton animation */
        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }

        .skeleton-shimmer {
          background: linear-gradient(
            to right,
            #f6f7f8 0%,
            #edeef1 20%,
            #f6f7f8 40%,
            #f6f7f8 100%
          );
          background-size: 800px 100px;
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>
    </>
  );
};

export default Home;
