import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <section>
    <div id='about' className="about-section bg-black text-white py-28 px-8 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-orange-500 text-3xl lg:text-5xl font-bold mb-8" data-aos="fade-up">
          About Me
        </h2>
        <p className="text-lg leading-relaxed" data-aos="fade-up" data-aos-delay="200">
          I am passionate about harnessing the power of technology to create innovative solutions. My coursework has been continuously equipping me with a strong foundation in programming, hardware, and software development. <br /> <br />
          I'm eager to apply my knowledge and gain practical experience in the field. I am an avid <span className="text-red-500 font-extrabold">problem solver</span>, continuously seeking opportunities to learn and grow in the ever-evolving tech landscape. My desire to contribute to real-world projects and my ability to adapt quickly make me a valuable addition to any team. <br /><br />
          <span className="text-red-500 font-extrabold">I am</span> actively seeking internship opportunities or part-time roles that will allow me to apply my skills, learn from experienced professionals, and make a meaningful impact. Let's connect and explore how I can bring my enthusiasm and technical expertise to your organization.
        </p>
      </div>
    </div>
    </section>
  );
};

export default About;