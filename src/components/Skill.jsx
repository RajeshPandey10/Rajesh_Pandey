import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const Skills = () => {
  const skillData = [
    {
      name: "React.js",
      description: "Building dynamic UIs and SPAs.",
      image: "https://cdn-icons-png.flaticon.com/512/919/919851.png", // React Icon
    },
    {
      name: "Node.js",
      description: "Server-side development and APIs.",
      image: "https://cdn-icons-png.flaticon.com/512/919/919825.png", // Node.js Icon
    },
    {
      name: "MongoDB",
      description: "NoSQL database management.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMzlF0cI1C-682U2HcOpqjigAIxmhmEuBmdA&s", // MongoDB Icon
    },
    {
      name: "Tailwind CSS",
      description: "Modern, responsive styling.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png", // Tailwind CSS Icon
    },
    {
      name: "MySQL",
      description: "Relational database management.",
      image: "https://cdn-icons-png.flaticon.com/512/919/919836.png", // MySQL Icon
    },
    {
      name: "C",
      description: "General-purpose programming language.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/1200px-C_Programming_Language.svg.png", // C Icon
    },
    {
      name: "C++",
      description: "Object-oriented programming language.",
      image: "https://w7.pngwing.com/pngs/646/751/png-transparent-the-c-programming-language-computer-programming-programmer-others-blue-class-logo-thumbnail.png", // C++ Icon
    },
    {
      name: "Python",
      description: "Used for web development (Django, Flask) and machine learning projects.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png",
    },

    {
      name: "JavaScript",
      description: "High-level, dynamic programming language.",
      image: "https://cdn-icons-png.flaticon.com/512/919/919828.png", // JavaScript Icon
    },
    {
      name: "GSAP",
      description: "JavaScript library for animations.",
      image: "https://pbs.twimg.com/profile_images/1713633504431394816/h28jJ1qM_400x400.jpg", // GSAP Icon
    },
    {
      name: "Locomotive Scroll",
      description: "Smooth scrolling library.",
      image: "https://i.ytimg.com/vi/EMZI-k2IFX4/maxresdefault.jpg", // Locomotive Scroll Icon
    },
  ];

  return (
    <section id="skills" className="bg-black w-full py-28 px-8 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-orange-500 text-3xl lg:text-5xl font-bold mb-8">
          Skills
        </h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          pagination={{ clickable: false}}
          loop={true}
          autoplay={{ delay: 1, disableOnInteraction: true }}
          speed={1500}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          onSwiper={(swiper) => {
            swiper.el.addEventListener('mouseenter', () => {
              swiper.autoplay.stop();
            });
            swiper.el.addEventListener('mouseleave', () => {
              swiper.autoplay.start();
            });
          }}
        >
          {skillData.map((skill, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gray-800 p-6 rounded-lg hover:bg-red-300 hover:text-black  transition-colors duration-500 flex flex-col items-center">
                <img
                  src={skill.image}
                  alt={`${skill.name} Icon`}
                  className="w-16 h-16 mb-4 object-contain"
                />
                <h3 className="text-lg font-semibold ">{skill.name}</h3>
                <p className="text-sm mt-2 text-center">
                  {skill.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Skills;