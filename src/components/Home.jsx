import React, { useState, useEffect } from "react";
import {
  Quote,
  Star,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";
import { fetchTestimonials, fetchGallery } from "../services/api";
import heroPhoto from "../assets/my2photo.jpeg";

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [testimonialsData, galleryData] = await Promise.all([
          fetchTestimonials(),
          fetchGallery(1, 8), // Load first 8 gallery items
        ]);

        setTestimonials(testimonialsData);
        setGallery(galleryData.items || galleryData); // Handle paginated response
      } catch (error) {
        console.error("Error loading data:", error);
        // Fallback to mock data if API fails
        setTestimonials([
          {
            id: 1,
            name: "Amit Sharma",
            role: "Project Manager at TechCorp",
            photo:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            message:
              "Rajesh delivered an exceptional web application for our company. His expertise in MERN stack is outstanding!",
            rating: 5,
          },
          {
            id: 2,
            name: "Priya Thapa",
            role: "CEO of Digital Solutions",
            photo:
              "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
            message:
              "Working with Rajesh was a game-changer for our startup. His full-stack development skills helped us launch our product successfully.",
            rating: 5,
          },
        ]);

        setGallery([
          {
            id: 1,
            title: "Workspace Setup",
            image:
              "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
            category: "workspace",
          },
          {
            id: 2,
            title: "Team Collaboration",
            image:
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
            category: "work",
          },
        ]);
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
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Hire Me
                </button>
                <button className="px-8 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200">
                  View Resume
                </button>
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
                "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।"
              </p>
              <p className="text-sm text-gray-500">
                "You have the right to perform your actions, but never to the
                fruits of action."
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
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                A glimpse into my professional journey and workspace
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg">
                        {item.title}
                      </h3>
                      <p className="text-gray-200 text-sm capitalize">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </div>
              ))}
            </div>
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
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors z-10"
            >
              ×
            </button>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white text-xl font-semibold mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-gray-300 capitalize">
                {selectedImage.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
