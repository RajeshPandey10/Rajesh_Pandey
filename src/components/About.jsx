import React from "react";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  User,
  Award,
  BookOpen,
  Heart,
} from "lucide-react";

const About = () => {
  return (
    <section className="py-10 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            <User className="w-4 h-4" />
            About Me
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Professional Career
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Rajesh Pandey - Full Stack Web Developer & AI/ML Trainer from Nepal
          </p>
        </div>

        {/* Current Position */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-12 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Current Positions
                </h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-lg font-semibold text-blue-700 mb-2">
                    🚀 MERN Stack Developer & AI/ML Trainer
                  </p>
                  <p className="text-slate-600 text-sm">
                    YOUTHIT, Pragati Chowk, Itahari
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <p className="text-lg font-semibold text-green-700 mb-2">
                    🎯 Associate Backend Developer
                  </p>
                  <p className="text-slate-600 text-sm">Covosys (Remote)</p>
                </div>
             
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Core Expertise
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">
                    Kathmandu, Nepal (Originally from Nuwakot)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">
                    Computer Engineering Student (7th Semester)
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-slate-600 mb-3">
                  💼 <strong>Specializations:</strong>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "MERN Stack",
                    "AI/ML Training",
                    "React.js",
                    "Node.js",
                    "MongoDB",
                    "Express.js",
                    "JavaScript ES6+",
                    "Python",
                    "RESTful APIs",
                    "Database Design",
                    "Git/GitHub",
                    "Responsive Design",
                  ].map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-12 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Professional Summary
            </h3>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            As a passionate Computer Engineering student and professional
            developer, I specialize in creating modern, scalable web
            applications using cutting-edge technologies. My journey in web
            development spans over 2 years, during which I've mastered the MERN
            stack and delivered multiple successful projects for clients across
            different industries. Currently expanding my expertise into AI/ML,
            training the next generation of developers at YOUTHIT while
            continuing to build innovative solutions.
          </p>
        </div>

        {/* Educational Background */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-12 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Educational Background
            </h3>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 mb-1">
                  🎓 Bachelor's in Computer Engineering (Currently 7th Semester)
                </p>
                <p className="text-slate-600 text-sm">
                  Focus on Software Engineering, Data Structures, and AI/ML
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 mb-1">
                  📚 Higher Secondary (+2): Science Stream
                </p>
                <p className="text-slate-600 text-sm">
                  Mathematics and Physics specialization
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 mb-1">
                  🏫 Foundation: Shree Shakti Secondary School, Nuwakot
                </p>
                <p className="text-slate-600 text-sm">
                  Strong foundation in science and mathematics
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-slate-700 leading-relaxed">
              My educational journey began with a strong foundation in science
              and mathematics during my +2 studies, which naturally led me to
              pursue Computer Engineering. Throughout my academic career, I've
              maintained a balance between theoretical knowledge and practical
              application, consistently working on real-world projects alongside
              my coursework.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              <p className="text-blue-700 font-medium text-sm">
                Academic Achievements: Dean's List, Programming Competition
                Winner, Science Fair Participant, Active in Tech Communities
              </p>
            </div>
          </div>
        </div>

        {/* Childhood */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-12 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Childhood</h3>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            I was born in 2005 in the serene hills of Nuwakot, where nature's
            calmness shaped my earliest memories. Growing up in a humble
            village, I studied at Shree Shakti Secondary School, a government
            institution that played a big role in molding my values and
            character. My childhood was filled with laughter, dreams, and
            endless games. I found joy in the simple pleasures of life— playing
            cricket under the sun and chess during the quiet evenings. Those
            carefree days taught me resilience, creativity, and the beauty of
            living close to nature. They were not just moments, but memories
            etched deep in my heart.
          </p>
        </div>

        {/* Hobbies */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Hobbies & Interests
            </h3>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed">
            I am actively involved in extracurricular activities that promote
            creativity, critical thinking, and teamwork. I appreciate chess for
            its strategic depth, and cricket for its vibrant team spirit. In
            addition, I've taken part in a number of science shows, where I've
            presented novel ideas and investigated emerging technologies. These
            activities show my desire to study outside of the classroom, as well
            as my enjoyment of both mental and physical difficulties.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
