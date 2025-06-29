import React, { useState, useEffect } from "react";
import {
  Quote,
  Star,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon,
  Play,
} from "lucide-react";
import { fetchTestimonials, fetchGallery } from "../services/api";

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [testimonialsData, galleryData] = await Promise.all([
          fetchTestimonials(),
          fetchGallery(),
        ]);

        setTestimonials(testimonialsData);
        setGallery(galleryData);
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
              "Working with Rajesh was a great experience. Professional, timely, and delivers quality code.",
            rating: 5,
          },
        ]);

        setGallery([
          {
            id: 1,
            type: "image",
            url: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop",
            title: "Web Development Workshop",
            description: "Teaching MERN stack development",
          },
          {
            id: 2,
            type: "image",
            url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
            title: "Team Collaboration",
            description: "Working with the development team",
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
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 text-left lg:pr-12">
            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Hi, I'm{" "}
              <span className="text-blue-600 font-bold text-6xl lg:text-7xl">
                Rajesh  Pandey
              </span>{" "}
             
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
                (MongoDB, Express.js, React.js, Node.js). With over 3+ years of
                hands-on experience, I create modern, scalable web applications
                that solve real-world problems. Currently working as an
                Associate Backend Developer at Covosys and MERN Developer and AI/ML trainer at YOUTHIT.
              </p>
            </div>

            {/* Skills Tags */}
            <div className="mb-8">
              <p className="text-gray-700 font-medium mb-3">
                🚀 Rajesh Pandey's Expertise:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "React.js",
                  "Node.js",
                  "MongoDB",
                  "Express.js",
                  "JavaScript",
                  "Python",
                  "Full Stack Development",
                  "Web Development Services",
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

          {/* Right Content - Profile Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-gradient-to-br from-blue-100 to-indigo-100">
                <img
                  src="/assets/mymainphoto.png"
                  alt="Rajesh Pandey - Full Stack Web Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-indigo-500 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mt-24">
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
                className="group relative overflow-hidden rounded-xl bg-white border border-slate-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-slate-700 ml-1" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6">
              <Quote className="w-4 h-4" />
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Clients Say
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Feedback from clients and colleagues I've worked with
            </p>
          </div>

          {testimonials.length > 0 && (
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex gap-1">
                    {[
                      ...Array(testimonials[currentTestimonial]?.rating || 5),
                    ].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="text-xl text-slate-700 text-center mb-8 leading-relaxed">
                  "
                  {testimonials[currentTestimonial]?.message ||
                    testimonials[currentTestimonial]?.content}
                  "
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  <img
                    src={
                      testimonials[currentTestimonial]?.photo ||
                      testimonials[currentTestimonial]?.image
                    }
                    alt={testimonials[currentTestimonial]?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-center">
                    <p className="font-semibold text-slate-900">
                      {testimonials[currentTestimonial]?.name}
                    </p>
                    <p className="text-sm text-slate-600">
                      {testimonials[currentTestimonial]?.role ||
                        testimonials[currentTestimonial]?.position}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors"
              >
                <ArrowRight className="w-5 h-5 text-slate-600" />
              </button>

              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial
                        ? "bg-blue-600"
                        : "bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
