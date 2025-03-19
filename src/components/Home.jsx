import React, { useState, useEffect } from 'react';
import img from '../assets/myPhoto.png';
import hoverImg from '../assets/mymainphoto.png';
import { TypeAnimation } from 'react-type-animation';
import SocialIcons from './SocialIcons';
import Button from './Button';
import About from './About';
import Skills from './Skill';
import Portfolio from './Portfolio';
import Experience from './Experience';
import Contact from './Contact';
import { FaArrowUp } from 'react-icons/fa';

const Home = () => {
    const [currentImg, setCurrentImg] = useState(img);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const heroSection = document.getElementById('hero');
            const heroHeight = heroSection?.offsetHeight || 0;
            const scrollPosition = window.scrollY;
            
            setShowScrollTop(scrollPosition > heroHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <section id="hero" className="flex flex-col md:flex-row items-center justify-center overflow-hidden min-h-screen py-28">
                <div className='md:w-1/2 flex justify-center transition-all duration-300'>
                    <div 
                        onMouseEnter={() => setCurrentImg(hoverImg)}
                        onMouseLeave={() => setCurrentImg(img)}
                    >
                        <img src={currentImg} alt="rajesh" className='rounded-full w-48 sm:w-64 md:w-80 lg:w-[350px] xl:w-[400px] shadow-[0_0_15px_3px_rgba(222,205,205,0.8)] transition-colors duration-300 hover:shadow-[0_0_15px_3px_rgba(255,0,0,0.8)] '/>
                    </div>
                </div>
                <div className='md:w-1/2 text-center md:text-left mt-6 md:mt-0 p-4'>
                    <h1 className='text-4x sm:text-6xl font-bold mb-4 '>Hi,It's <span className='uppercase text-red-500'>Rajesh</span></h1>
                    <h3 className='text-2xl sm:text-3xl font-semibold mb-4 ml-1'>I'am a <span className='text-red-500'>
                        
                        <TypeAnimation
                            sequence={[
                                "Software Engineer", 1000,
                                "Web Developer", 1000,
                                "Programmer", 1000,
                                "Tech Enthusiast", 1000,
                                "Full Stack Developer", 1000,
                            ]}
                            speed={50}
                            style={{ fontSize: "1.5rem" }}
                            repeat={Infinity}
                        />
                    </span></h3>
                    <p className='text-sm sm:text-lg mb-6 hover:shadow-[0_0_15px_3px_rgba(255,0,0,0.8)] hover:rounded-2xl transition duration-500 p-4 w-full'>
                        In my seventh semester of computer engineering school, I am a committed and driven learner who is passionate about using technology to develop original solutions. I've been consistently gaining a solid foundation in hardware, software, and programming through my coursework. I'm eager to apply my knowledge and gain practical experience in the field.
                    </p>
                    <SocialIcons />
                    <Button text="Hire Me" href="#contact" />
                    <Button text="View Resume" href="/assets/RajeshPandey-Resume.pdf" download />
                </div>
            </section>
            <About />
            <Skills />
            <Portfolio />
            <Experience />
            <Contact />
            <button 
                onClick={scrollToTop}
                className={`fixed bottom-4 right-4 z-50 p-3 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-700 transition-all duration-300 ${
                    showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
                <FaArrowUp size={20} />
            </button>
        </>
    );
};

export default Home;
