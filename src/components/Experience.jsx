import React from "react";
import { MapPin, Calendar, ExternalLink, Briefcase, Award } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      company: "YOUTH IT",
      position: "MERN Stack Developer & AI/ML Instructor/Trainer",
      location: "Pragati Chowk, Itahari",
      duration: "3 Month",
      description:
        "Leading full-stack development projects using MERN stack while training aspiring developers in modern web technologies and AI/ML fundamentals. Developing innovative solutions and mentoring students in practical programming skills.",
      current: true,
    },
    {
      company: "Covosys",
      position: "Associate Backend Developer",
      location: "Remote",
      duration: "7 Months",
      description:
        "Developed and maintained backend services using Node.js and Express. Integrated third-party APIs and optimized database queries. Built RESTful APIs for web applications with focus on scalability and performance.",
      current: true,
    },
    {
      company: "Lunar IT",
      position: "MERN Stack Intern",
      location: "Remote",
      duration: "2 Months",
      description:
        "Collaborated on full-stack projects using the MERN stack (MongoDB, Express, React, Node.js). Created dynamic user interfaces and RESTful APIs. Worked in an agile team environment with modern development practices.",
      current: false,
    },
    {
      company: "Codesoft",
      position: "Virtual Intern",
      location: "Remote",
      duration: "1 Month",
      description:
        "Worked on building scalable backend systems and APIs for e-commerce platforms. Implemented secure authentication and payment gateway integrations using industry best practices.",
      current: false,
    },
    {
      company: "Self-employed",
      position: "Freelance Web Developer",
      location: "Kathmandu, Nepal",
      duration: "2022 - Present",
      description:
        "Designed and developed custom websites and web applications for various clients. Focused on responsive design, performance optimization, and SEO best practices while delivering high-quality solutions.",
      current: true,
    },
  ];

  const projects = [
    {
      title: "Panas - Korean Consultancy Exam Platform",
      tech: "MERN Stack, Redux, Socket.io, JWT",
      duration: "4 months",
      description:
        "Built a comprehensive exam management system for Korean language consultancy. Features include super admin dashboard, institute management, exam creation, real-time proctoring, and automated grading with detailed analytics.",
    },
    {
      title: "E-commerce Platform",
      tech: "MERN Stack, Redux, Stripe",
      duration: "3 months",
      description:
        "Built a full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment processing.",
    },
    {
      title: "Task Management System",
      tech: "React, Node.js, PostgreSQL",
      duration: "2 months",
      description:
        "Created a collaborative task management system with role-based access control, task assignments, and deadline notifications.",
    },
  ];

  return (
    <section className="py-10 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Briefcase className="w-4 h-4" />
            Professional Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Experience & Projects
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Building innovative solutions and gaining valuable experience across
            various roles and projects.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6 mb-20">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-slate-200 p-8 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {exp.position}
                      </h3>
                      <p className="text-lg font-semibold text-blue-600">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{exp.duration}</span>
                    </div>
                  </div>
                </div>

                {exp.current && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-medium mt-4 lg:mt-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Current Position
                  </div>
                )}
              </div>

              <p className="text-slate-600 leading-relaxed text-lg">
                {exp.description}
              </p>
            </div>
          ))}
        </div>

        {/* Notable Projects */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Featured Projects
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Notable Projects
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Showcasing some of the key projects that demonstrate my technical
              skills and problem-solving abilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-purple-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <ExternalLink className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {project.title}
                  </h4>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.split(", ").map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Duration: {project.duration}</span>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
