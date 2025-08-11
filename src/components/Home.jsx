import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Quote,
  Star,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";
import { fetchTestimonials, fetchGallery } from "../services/api";
import heroPhoto from "../assets/rajesh-pandeu.png";
import SocialIcons from "./SocialIcons";

const Home = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentGalleryPage, setCurrentGalleryPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const IMAGES_PER_PAGE = 8;

  const handleHireMeClick = () => {
    navigate("/contact");
  };

  const handleViewResumeClick = () => {
    // Create a download link for the resume
    const link = document.createElement("a");
    link.href = "/assets/Rajesh_Pandey_resume.pdf"; // Path to your resume in public folder
    link.download = "RajeshPandey_Resume";
    link.click();
  };
  // Fetch data from backend
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [testimonialsData, galleryData] = await Promise.all([
          fetchTestimonials(),
          fetchGallery(1, 20), // Load more gallery items
        ]);

        setTestimonials(testimonialsData);
        setGallery(galleryData.items || galleryData); // Handle paginated response
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Gallery pagination functions
  const nextGalleryPage = () => {
    const totalPages = Math.ceil(gallery.length / IMAGES_PER_PAGE);
    setCurrentGalleryPage((prev) => (prev + 1) % totalPages);
  };

  const prevGalleryPage = () => {
    const totalPages = Math.ceil(gallery.length / IMAGES_PER_PAGE);
    setCurrentGalleryPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Gallery modal navigation
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

  // Get current page gallery items
  const getCurrentPageGallery = () => {
    const startIndex = currentGalleryPage * IMAGES_PER_PAGE;
    return gallery.slice(startIndex, startIndex + IMAGES_PER_PAGE);
  };

  // Open gallery modal
  const openGalleryModal = (item) => {
    setSelectedImage(item);
    setCurrentImageIndex(0);
  };

  return (
    <div>
      {/* Hero Section - Image and Description */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[80vh]">
            {/* Left Content - Hero Image */}
            <div className="flex-1 flex justify-center lg:justify-start order-1">
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-gradient-to-br from-blue-100 to-indigo-100">
                  <img
                    src={heroPhoto}
                    alt="Rajesh Pandey - Full Stack Web Developer"
                    className="w-full h-full object-cover"
                    style={{
                      // Positioning: Choose where to focus the crop
                      objectPosition: "center top", // Options: 'center', 'top', 'bottom', 'left', 'right', 'center top', 'center bottom', etc.

                      // Zoom/Scale: Adjust the size of the image
                      transform: "scale(1.1)", // 1.0 = normal, 1.1 = 10% zoom in, 0.9 = 10% zoom out

                      // Fine positioning adjustments
                      transformOrigin: "center", // Where the scaling happens from

                      // Optional: Slight vertical/horizontal shift
                      // transform: 'scale(1.1) translateY(-10px)', // Move up 10px
                      // transform: 'scale(1.1) translateX(5px)',   // Move right 5px
                    }}
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-indigo-500 rounded-full animate-pulse delay-1000"></div>
              </div>
            </div>

            {/* Right Content - Description */}
            <div className="flex-1 text-left lg:pl-12 order-2">
              {/* Main Heading */}
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Hi, I'm{" "}
                <span className="text-blue-600 font-bold text-6xl lg:text-7xl">
                  राजेश
                </span>
              </h1>

              <h2 className="text-2xl lg:text-3xl font-medium text-gray-700 mb-6">
                Full Stack Web Developer
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
                  I'm Rajesh Pandey, a dedicated Computer Engineering student in
                  my 7th semester, specializing in MERN Stack development
                  (MongoDB, Express.js, React.js, Node.js). With over 3+ years
                  of hands-on experience, I create modern, scalable web
                  applications that solve real-world problems.
                </p>
                <p>
                  Currently working as an Associate Backend Developer at Covosys
                  and MERN Developer and AI/ML trainer at YOUTH IT, I focus on
                  building efficient, user-friendly solutions that make a
                  difference.
                </p>
              </div>

              {/* Skills Tags */}
              <div className="mb-8">
                <p className="text-gray-700 font-medium mb-3">
                  🚀 Technical Expertise:
                </p>
                <div className="flex flex-wrap gap-2">
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
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleHireMeClick}
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Hire Me
                </button>
                <button
                  onClick={handleViewResumeClick}
                  className="px-8 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  View Resume
                </button>
              </div>

              {/* Social Media Icons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <p className="text-gray-600 font-medium">Connect with me:</p>
                <SocialIcons />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sanskrit Shloka */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg border border-blue-100 max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 italic mb-3 font-serif">
                "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते
                सङ्गोऽस्त्वकर्मणि॥"
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

          {/* Gallery Section */}
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

              {/* Gallery Pagination Info */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <button
                    onClick={prevGalleryPage}
                    disabled={gallery.length <= IMAGES_PER_PAGE}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Prev
                  </button>

                  <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                    Page {currentGalleryPage + 1} of{" "}
                    {Math.ceil(gallery.length / IMAGES_PER_PAGE)}
                  </div>

                  <button
                    onClick={nextGalleryPage}
                    disabled={gallery.length <= IMAGES_PER_PAGE}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {getCurrentPageGallery().map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 flex flex-col h-[520px]"
                  onClick={() => openGalleryModal(item)}
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.images ? item.images[0] : item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Image Count Badge */}
                    {item.images && item.images.length > 1 && (
                      <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        +{item.images.length}
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                        <ExternalLink className="w-5 h-5 text-gray-700" />
                      </div>
                    </div>
                  </div>

                  {/* Content Section - Fixed proportions */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 text-xl mb-3 line-clamp-2">
                      {item.title}
                    </h3>

                    {item.description && (
                      <div className="flex-1 mb-4">
                        <div className="h-40 overflow-y-auto pr-2 border border-gray-100 rounded-lg p-3 bg-gray-50">
                          <p className="text-gray-700 text-sm leading-snug whitespace-pre-line">
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
                </div>
              ))}
            </div>

            {/* Gallery Page Indicators */}
            {gallery.length > IMAGES_PER_PAGE && (
              <div className="flex flex-col items-center gap-4 mt-10">
                <div className="flex justify-center items-center gap-2">
                  {Array.from({
                    length: Math.ceil(gallery.length / IMAGES_PER_PAGE),
                  }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentGalleryPage(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        index === currentGalleryPage
                          ? "bg-blue-600 scale-110"
                          : "bg-blue-200 hover:bg-blue-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Click dots to jump to any page • Total: {gallery.length} items
                </p>
              </div>
            )}
          </div>

          {/* Testimonials Section */}
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

            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
                {testimonials.length > 0 && (
                  <div className="text-center">
                    <div className="flex justify-center mb-6">
                      <img
                        src={testimonials[currentTestimonial]?.photo}
                        alt={testimonials[currentTestimonial]?.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                      />
                    </div>
                    <Quote className="w-8 h-8 text-blue-500 mx-auto mb-6" />
                    <p className="text-lg text-slate-700 mb-6 italic">
                      "{testimonials[currentTestimonial]?.message}"
                    </p>
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonials[currentTestimonial]?.rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
                        )
                      )}
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 mb-1">
                      {testimonials[currentTestimonial]?.name}
                    </h4>
                    <p className="text-slate-600">
                      {testimonials[currentTestimonial]?.role}
                    </p>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    disabled={testimonials.length <= 1}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentTestimonial
                            ? "bg-blue-600"
                            : "bg-blue-200"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    disabled={testimonials.length <= 1}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-full w-full">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors z-20"
            >
              ×
            </button>

            {/* Image Container */}
            <div className="relative">
              <img
                src={
                  selectedImage.images
                    ? selectedImage.images[currentImageIndex]
                    : selectedImage.image
                }
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg mx-auto block"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Navigation Arrows (only show if multiple images) */}
              {selectedImage.images && selectedImage.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Image Info */}
            <div className="bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg absolute bottom-0 left-0 right-0">
              <h3 className="text-white text-xl font-semibold hidden md:block">
                {selectedImage.title}
              </h3>
              <p className="text-gray-300 capitalize mb-2">
                {selectedImage.category}
              </p>
              {/* {selectedImage.description && (
                <p className="text-gray-400 text-sm mb-3">
                  {selectedImage.description}
                </p>
              )} */}
              {selectedImage.images && selectedImage.images.length > 1 && (
                <div className="flex items-center gap-4">
                  <p className="text-gray-300 text-sm">
                    {currentImageIndex + 1} of {selectedImage.images.length}
                  </p>
                  <div className="flex gap-1">
                    {selectedImage.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Navigation (for multiple images) */}
            {selectedImage.images && selectedImage.images.length > 1 && (
              <div className="absolute  left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm rounded-lg p-2 max-w-xs overflow-x-auto">
                {selectedImage.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex
                        ? "border-white"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${selectedImage.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
