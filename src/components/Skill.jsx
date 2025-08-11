import React, { useState } from "react";
import {
  Code2,
  Database,
  Settings,
  Layers,
  Brain,
  BarChart3,
} from "lucide-react";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const skillCategories = [
    { name: "All", icon: <Layers className="w-4 h-4" /> },
    { name: "Frontend", icon: <Code2 className="w-4 h-4" /> },
    { name: "Backend", icon: <Settings className="w-4 h-4" /> },
    { name: "Database", icon: <Database className="w-4 h-4" /> },
    { name: "AI/ML", icon: <Brain className="w-4 h-4" /> },
    { name: "Tools", icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const skillsData = [
    // Frontend
    {
      name: "React.js",
      icon: "⚛️",
      category: "Frontend",
      level: "75%",
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
    },
    {
      name: "JavaScript",
      icon: "🟨",
      category: "Frontend",
      level: "78%",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      name: "HTML5",
      icon: "🌐",
      category: "Frontend",
      level: "80%",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      name: "CSS3",
      icon: "🎨",
      category: "Frontend",
      level: "76%",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      name: "Tailwind CSS",
      icon: "🌊",
      category: "Frontend",
      level: "74%",
      color: "text-teal-500",
      bgColor: "bg-teal-50",
    },
    {
      name: "Bootstrap",
      icon: "🅱️",
      category: "Frontend",
      level: "72%",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      name: "Redux",
      icon: "🔄",
      category: "Frontend",
      level: "73%",
      color: "text-violet-500",
      bgColor: "bg-violet-50",
    },

    // Backend
    {
      name: "Node.js",
      icon: "🟢",
      category: "Backend",
      level: "77%",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      name: "Express.js",
      icon: "🚂",
      category: "Backend",
      level: "75%",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
    {
      name: "Python",
      icon: "🐍",
      category: "Backend",
      level: "79%",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },

    // Database
    {
      name: "MongoDB",
      icon: "🍃",
      category: "Database",
      level: "74%",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: "MySQL",
      icon: "🗄️",
      category: "Database",
      level: "71%",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },

    // Tools
    {
      name: "Git",
      icon: "📝",
      category: "Tools",
      level: "78%",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      name: "GitHub",
      icon: "🐱",
      category: "Tools",
      level: "76%",
      color: "text-gray-700",
      bgColor: "bg-gray-50",
    },
    {
      name: "Postman",
      icon: "📮",
      category: "Tools",
      level: "73%",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },

    // AI/ML
    {
      name: "Pandas",
      icon: "🐼",
      category: "AI/ML",
      level: "75%",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "NumPy",
      icon: "🔢",
      category: "AI/ML",
      level: "74%",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
    {
      name: "TensorFlow",
      icon: "🧠",
      category: "AI/ML",
      level: "72%",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      name: "Scikit-learn",
      icon: "⚙️",
      category: "AI/ML",
      level: "71%",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      name: "Jupyter",
      icon: "📊",
      category: "AI/ML",
      level: "77%",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      name: "OpenCV",
      icon: "👁️",
      category: "AI/ML",
      level: "70%",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: "Matplotlib",
      icon: "📈",
      category: "AI/ML",
      level: "76%",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      name: "Seaborn",
      icon: "🌊",
      category: "AI/ML",
      level: "73%",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  const filteredSkills =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);

  return (
    <section
      id="skills"
      className="py-10 bg-gradient-to-br from-blue-50 to-indigo-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Code2 className="w-4 h-4" />
            Skills & Technologies
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Technical Expertise
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Specialized in modern web technologies and full-stack development
            with a focus on creating scalable, efficient solutions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeCategory === category.name
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div
                  className={`text-3xl ${skill.color} group-hover:scale-110 transition-transform duration-300 p-3 rounded-xl ${skill.bgColor}`}
                >
                  {skill.icon}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-slate-900 text-lg">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-slate-500">{skill.category}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                  <span>Proficiency</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-1000 ease-out"
                    style={{ width: skill.level }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Summary */}
        <div className="mt-16 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Professional Focus
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">
                Full Stack Development
              </h4>
              <p className="text-slate-600 text-sm">
                MERN Stack specialization with modern practices
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">
                Problem Solving
              </h4>
              <p className="text-slate-600 text-sm">
                Creating scalable solutions for complex challenges
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Innovation</h4>
              <p className="text-slate-600 text-sm">
                Always exploring new technologies and methodologies
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
