import React, { useState, useEffect } from "react";
import {
  Quote,
  Star,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon,
  Play,
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
        // Fallback to mock data if API fail
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
      {/* Hero Image Section - Full width at top */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroPhoto}
            alt="Rajesh Pandey - Full Stack Web Developer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-5xl lg:text-7xl font-bold mb-4">
              <span className="text-white">Hi, I'm</span>{" "}
              <span className="text-blue-400 font-bold">राजेश</span>
            </h1>
            <h2 className="text-2xl lg:text-4xl font-medium mb-6 text-blue-100">
              Full Stack Web Developer
            </h2>
            <p className="text-lg lg:text-xl text-gray-200 max-w-2xl mb-8">
              Professional MERN Stack Developer from Nepal 🇳🇵 with 3+ years of
              experience creating modern, scalable web applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Hire Me
              </button>
              <button className="px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200">
                View Resume
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction Content */}
          <div className="text-center mb-16">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                About Rajesh Pandey
              </h3>

              {/* Sanskrit Shloka */}
              <div className="bg-white rounded-xl p-6 mb-8 shadow-lg border border-blue-100">
                <p className="text-lg text-gray-700 italic mb-2 font-serif">
                  "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।"
                </p>
                <p className="text-sm text-gray-500">
                  "You have the right to perform your actions, but never to the
                  fruits of action."
                </p>
              </div>

              <div className="text-lg text-gray-600 space-y-4 text-left">
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
              <div className="mt-8">
                <p className="text-gray-700 font-medium mb-4 text-xl">
                  🚀 Technical Expertise:
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
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
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
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
