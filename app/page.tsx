"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Github, Linkedin, Mail, ArrowUpRight, ShoppingCart, Database, Globe, 
  MapPin, Phone, BookOpen, Award, Code2, Layers, Briefcase, Wrench, Send, FileText, Menu, X, Sun, Moon , BarChart2 ,
} from "lucide-react";

type Particle = {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
};

export default function Home() {
  // State Definitions
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleSections, setVisibleSections] = useState(new Set<string>());
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false); 

  // 1. Initial Setup (Client Side Only)
  useEffect(() => {
    const timer = setTimeout(() => {
      const newParticles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 5 + Math.random() * 10,
        delay: Math.random() * 5
      }));
      
      const savedTheme = localStorage.getItem('theme');
      const initialTheme = savedTheme ? savedTheme === 'dark' : true;
      setParticles(newParticles);
      setIsDarkMode(initialTheme);
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 300 && rect.bottom >= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => {
            const newSet = new Set(prev);
            newSet.add(entry.target.id);
            return newSet;
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sectionElements = document.querySelectorAll('section[id]');
    sectionElements.forEach(section => observer.observe(section));
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      sectionElements.forEach(section => observer.unobserve(section));
      observer.disconnect();
    };
  }, [mounted]);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Data Definitions
  const skills = [
    {
      category: "Programming Languages",
      icon: <Code2 size={24} />,
      items: ["JavaScript", "TypeScript", "PHP", "Dart", "Python", "HTML", "CSS"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      category: "Frameworks & Libraries",
      icon: <Globe size={24} />,
      items: ["Next.js", "React", "Laravel", "Flutter", "Tailwind CSS", "Bootstrap", "Express.js"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      category: "Databases",
      icon: <Database size={24} />,
      items: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Supabase"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      category: "Tools & Others",
      icon: <Wrench size={24} />,
      items: ["Git", "GitHub", "VS Code", "Postman", "Figma", "REST API", "AI Integration"],
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const certifications = [
    {
      name: "Dicoding: Web Development Bootcamp",
      link: "https://drive.google.com/file/d/110CRkGGCIkDSsEtX7cHB7Xeteh02DRkC/view?usp=drive_link",
    },
    {
      name: "Dicoding: Belajar Dasar Pemrograman JavaScript",
      link: "https://drive.google.com/file/d/13Ykla298AyW8bizMmjRj4jNVrtWqbjfg/view?usp=drive_link",
    },
    {
      name: "Dicoding: Belajar Membuat Front-End Web untuk Pemula",
      link: "https://drive.google.com/file/d/1fSdbfJsmXxfc1_EyqZb60a7mO-ZKucle/view?usp=drive_link",
    },
    {
      name: "Dicoding: Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)",
      link: "https://drive.google.com/file/d/1xCgvYaPmYDNWxNtxkIl9vABSwUrvkT5G/view?usp=drive_link",
    },
    {
      name: "Codepolitan: Dasar-dasar HTML dan CSS",
      link: "https://drive.google.com/file/d/1873kCtyik64VaIsMBoMMmfy6dVJ1ulQy/view?usp=drive_link",
    },
    {
      name: "Udemy: HTML CSS Coding for Website Development",
      link: "https://drive.google.com/file/d/18l-2bXMcSIQaJ9X28kDDox59nxlapQf5/view?usp=drive_link",
    },
    {
      name: "Udemy: Dart and Flutter: The Ultimate Mobile App Development Course",
      link: "https://www.udemy.com/certificate/UC-d89db2d8-e3a5-44db-bed6-3c37cd3e1981/",
    },
    {
      name: "Udemy: The Full Stack Web Development Bootcamp(Frontend & Backend)",
      link: "https://www.udemy.com/certificate/UC-b867e3af-77b2-4d81-9dca-5f00a5932255/",
    },
    {
      name: "Dibimbing: DSF 46 Faculty of IT: Back End",
      link: "https://drive.google.com/file/d/1wG0xpT-C9p0HY6goIjxLzQLAvmNgQOhC/view?usp=drive_link",
    },
    {
      name: "CCNA: Introduction to Networks",
      link: "https://www.credly.com/badges/a4ff39c2-84ef-40b8-96e0-bc521713cd05/public_url",
    },
  ];

  const themeClasses = {
    bg: isDarkMode ? 'bg-linear-to-br from-[#0a192f] via-[#0d1b2a] to-[#0a192f]' : 'bg-linear-to-br from-[#f1f5f9] via-[#e2e8f0] to-[#f1f5f9]',
    text: isDarkMode ? 'text-slate-300' : 'text-slate-600',
    textPrimary: isDarkMode ? 'text-slate-100' : 'text-slate-800',
    textSecondary: isDarkMode ? 'text-slate-400' : 'text-slate-500',
    cardBg: isDarkMode ? 'from-[#112240] to-[#0a192f]' : 'from-slate-100/80 to-slate-200/50',
    cardBorder: isDarkMode ? 'border-slate-800' : 'border-slate-300',
    navBg: isDarkMode ? 'bg-[#0a192f]/95' : 'bg-slate-100/95',
    inputBg: isDarkMode ? 'bg-[#0a192f]' : 'bg-slate-100',
    inputBorder: isDarkMode ? 'border-slate-700' : 'border-slate-400',
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[#0a192f]"></div>;
  }

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} font-sans selection:bg-teal-300/20 selection:text-teal-300 relative overflow-hidden transition-colors duration-500`}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute w-96 h-96 ${isDarkMode ? 'bg-teal-500/5' : 'bg-teal-500/8'} rounded-full blur-3xl transition-all duration-500`}
          style={{
            left: `${mousePosition.x / 20}px`,
            top: `${mousePosition.y / 20}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className={`absolute top-1/4 right-1/4 w-96 h-96 ${isDarkMode ? 'bg-purple-500/5' : 'bg-purple-500/8'} rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute bottom-1/4 left-1/3 w-96 h-96 ${isDarkMode ? 'bg-blue-500/5' : 'bg-blue-500/8'} rounded-full blur-3xl animate-pulse`} />
      </div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute w-1 h-1 ${isDarkMode ? 'bg-teal-400/30' : 'bg-teal-500/25'} rounded-full`}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `float ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
        .animate-wave { animation: wave 2s ease-in-out infinite; transform-origin: 70% 70%; display: inline-block; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? `${themeClasses.navBg} backdrop-blur-xl shadow-lg ${isDarkMode ? 'shadow-teal-500/5' : 'shadow-slate-200'}` : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
          <a href="#hero" className="text-xl font-bold tracking-wider relative group">
            <span className="bg-linear-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Giga</span>
            <span className={themeClasses.textPrimary}>Kurnia.</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-teal-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          
          <div className="space-x-8 text-sm font-medium hidden md:flex items-center">
            {['About', 'Skills', 'Projects', 'Experience'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`relative group py-2 ${activeSection === item.toLowerCase() ? 'text-teal-400' : ''}`}>
                <span className="hover:text-teal-400 transition">{item}</span>
                <span className={`absolute bottom-0 left-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full ${activeSection === item.toLowerCase() ? 'w-full' : 'w-0'}`}></span>
              </a>
            ))}
            <a href="#contact" className="px-5 py-2.5 border-2 border-teal-400 text-teal-400 rounded-lg hover:bg-teal-400 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-teal-400/50 hover:scale-105">
              Contact
            </a>
            <button onClick={toggleTheme} className={`p-2.5 rounded-lg border-2 ${themeClasses.cardBorder} hover:border-teal-400 transition-all duration-300 hover:scale-110 group`} aria-label="Toggle theme">
              {isDarkMode ? <Sun className="text-teal-400 group-hover:rotate-180 transition-transform duration-500" size={20} /> : <Moon className="text-teal-500 group-hover:-rotate-180 transition-transform duration-500" size={20} />}
            </button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button onClick={toggleTheme} className={`p-2 rounded-lg border ${themeClasses.cardBorder} hover:border-teal-400 transition-all duration-300`} aria-label="Toggle theme">
              {isDarkMode ? <Sun className="text-teal-400" size={20} /> : <Moon className="text-teal-500" size={20} />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-teal-400 hover:text-teal-300 transition">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden ${isDarkMode ? 'bg-[#0a192f]/98' : 'bg-white/98'} backdrop-blur-xl border-t ${themeClasses.cardBorder} animate-fade-in`}>
            <div className="container mx-auto px-6 py-6 space-y-4">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className={`block py-3 px-4 ${activeSection === item.toLowerCase() ? 'text-teal-400 bg-teal-400/10' : themeClasses.text} hover:text-teal-400 hover:bg-teal-400/10 rounded-lg transition`}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">

      {/* HERO SECTION */}
        <section id="hero" className="min-h-screen flex items-center pt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full">
            <div className="order-2 md:order-1 md:col-span-7 space-y-6 animate-fade-in-up">
              <p className="text-teal-400 font-mono tracking-wide text-lg animate-fade-in"><span className="inline-block animate-wave">👋</span> Hi, I am</p>
              
              <div className="relative z-10">
                <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-none bg-linear-to-r ${isDarkMode ? 'from-slate-100 via-teal-100 to-slate-100' : 'from-slate-700 via-teal-600 to-slate-700'} bg-clip-text text-transparent animate-fade-in-up`} style={{animationDelay: '0.1s'}}>
                  Giga Kurnia Fadhillah.
                </h1>
                
                {/* ROLE:*/}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  <span className="bg-linear-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">Mobile & Fullstack Developer.</span>
                </h2>
              </div>

              {/* Tagline */}
              <p className={`max-w-xl ${themeClasses.textSecondary} text-lg md:text-xl font-light leading-relaxed animate-fade-in-up`} style={{animationDelay: '0.3s'}}>
                Crafting scalable <strong className="text-teal-400 font-semibold">Web & Mobile ecosystems</strong> with intelligent <strong className="text-teal-400 font-semibold">AI integration</strong>.
              </p>

              {/* Badges */}
              <div className={`flex flex-wrap items-center gap-6 pt-2 text-sm font-mono ${themeClasses.textSecondary} animate-fade-in-up`} style={{animationDelay: '0.4s'}}>
                <span className={`flex items-center gap-2 px-4 py-2 ${isDarkMode ? 'bg-teal-400/10' : 'bg-teal-50'} rounded-full border border-teal-400/30`}>
                  <MapPin size={18} className="text-teal-400"/> Bandung, Indonesia
                </span>
                <span className={`flex items-center gap-2 px-4 py-2 ${isDarkMode ? 'bg-green-400/10' : 'bg-green-50'} rounded-full border border-green-400/30`}>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Open for work
                </span>
              </div>
              
              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                 <a href="#projects" className="px-8 py-4 bg-linear-to-r from-teal-400 to-cyan-400 text-white rounded-lg hover:shadow-2xl hover:shadow-teal-400/50 transition-all duration-300 font-bold tracking-wide flex items-center gap-2 group hover:scale-105">
                  View Projects <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"/>
                 </a>
                 <a href="https://drive.google.com/file/d/1xG7etTn4P8I_4_r6kL8QN0zPkJVudq4l/view?usp=drive_link" target="_blank" className={`px-8 py-4 border-2 ${isDarkMode ? 'border-slate-400 text-slate-300' : 'border-slate-500 text-slate-600'} rounded-lg hover:border-teal-400 hover:text-teal-400 hover:bg-teal-400/5 transition-all duration-300 font-bold tracking-wide flex items-center gap-2 hover:scale-105`}>
                  My Resume <FileText size={20} />
                 </a>
                 <div className={`flex gap-5 ${themeClasses.textSecondary} ml-2`}>
                    <a href="https://github.com/GigaFdlh" target="_blank" className="hover:text-teal-400 transition-all duration-300 hover:-translate-y-1 hover:scale-110"><Github size={26}/></a>
                    <a href="https://linkedin.com/in/gigafadhillah" target="_blank" className="hover:text-teal-400 transition-all duration-300 hover:-translate-y-1 hover:scale-110"><Linkedin size={26}/></a>
                 </div>
              </div>
            </div>
            
            {/* BAGIAN FOTO*/}
            <div className="order-1 md:order-2 md:col-span-5 flex justify-center md:justify-end relative animate-fade-in" style={{animationDelay: '0.6s'}}>
               <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 group">
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-teal-400 via-cyan-400 to-blue-400 opacity-20 blur-xl transition-all duration-500 group-hover:opacity-40 group-hover:blur-2xl"></div>
                  <div className="absolute inset-0 rounded-2xl border-2 border-teal-400/50 transition-all duration-500 group-hover:border-teal-400 translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6"></div>
                  <div className={`relative w-full h-full rounded-2xl overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-300/50'} shadow-2xl transition-all duration-500 hover:shadow-teal-400/30`}>
                    <div className="absolute inset-0 bg-linear-to-br from-teal-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Image 
                      src="/profile.jpg" 
                      alt="Giga Kurnia" 
                      width={400} 
                      height={400} 
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className={`py-24 max-w-4xl transition-all duration-1000 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
           <div className="flex items-center gap-4 mb-8">
              <h2 className={`text-3xl md:text-4xl font-bold bg-linear-to-r ${isDarkMode ? 'from-slate-100 to-teal-400' : 'from-slate-700 to-teal-500'} bg-clip-text text-transparent`}>About Me</h2>
              <div className="h-0.5 bg-linear-to-r from-teal-400 to-transparent flex-1 ml-4"></div>
           </div>
          <div className={`${themeClasses.textSecondary} leading-loose space-y-6 text-lg`}>
             <p className={`hover:${themeClasses.text} transition-colors duration-300`}>
               I am an Informatics Engineering undergraduate at <strong className="text-teal-400">Universitas Komputer Indonesia (UNIKOM)</strong> with a dual focus on <strong className="text-teal-400">Fullstack & Mobile Development</strong>. I specialize in building comprehensive digital ecosystems—crafting responsive web interfaces, robust backends, and high-performance mobile applications.
             </p>
             <p className={`hover:${themeClasses.text} transition-colors duration-300`}>
               Beyond traditional development, I am deeply invested in the potential of <strong className="text-teal-400">Artificial Intelligence (AI)</strong>. My goal is to bridge the gap between software engineering and AI, creating intelligent, data-driven applications that solve real-world problems efficiently.
             </p>
           </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className={`py-24 max-w-6xl transition-all duration-1000 ${visibleSections.has('skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="flex items-center gap-4 mb-12">
             <h2 className={`text-3xl md:text-4xl font-bold bg-linear-to-r ${isDarkMode ? 'from-slate-100 to-teal-400' : 'from-slate-700 to-teal-500'} bg-clip-text text-transparent`}>Skills & Technologies</h2>
             <div className="h-0.5 bg-linear-to-r from-teal-400 to-transparent flex-1 ml-4"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((group, idx) => (
               <div key={idx} className={`bg-linear-to-br ${themeClasses.cardBg} p-6 rounded-xl hover:-translate-y-3 transition-all duration-500 border ${themeClasses.cardBorder} hover:border-teal-400/50 group h-full relative overflow-hidden ${isDarkMode ? 'hover:shadow-2xl hover:shadow-teal-400/20' : 'hover:shadow-xl hover:shadow-teal-400/30'} ${visibleSections.has('skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: visibleSections.has('skills') ? `${idx * 0.1}s` : '0s' }}>
                 <div className={`absolute inset-0 bg-linear-to-br ${group.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                 <div className={`text-teal-400 mb-4 bg-linear-to-br ${group.gradient} bg-opacity-10 w-fit p-3 rounded-lg group-hover:scale-110 transition-all duration-500 relative z-10`}>{group.icon}</div>
                 <h3 className={`text-lg font-bold ${themeClasses.textPrimary} mb-4 group-hover:text-teal-400 transition-colors duration-300`}>{group.category}</h3>
                 <ul className="space-y-2 relative z-10">
                   {group.items.map((skill) => (
                     <li key={skill} className={`${themeClasses.textSecondary} text-sm font-mono flex items-center gap-2 hover:text-teal-400 transition-all duration-300 hover:translate-x-2`}><span className="text-teal-400">▹</span> {skill}</li>
                   ))}
                 </ul>
               </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className={`py-24 max-w-5xl mx-auto transition-all duration-1000 ${visibleSections.has('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="flex items-center gap-4 mb-16">
             <h2 className={`text-3xl md:text-4xl font-bold bg-linear-to-r ${isDarkMode ? 'from-slate-100 to-teal-400' : 'from-slate-700 to-teal-500'} bg-clip-text text-transparent`}>My Projects</h2>
             <div className="h-0.5 bg-linear-to-r from-teal-400 to-transparent flex-1 ml-4"></div>
          </div>
          
          <div className="space-y-32">
            
            {/* PROJECT 1 */}
            <div className={`grid md:grid-cols-12 gap-8 items-center group transition-all duration-700 ${visibleSections.has('projects') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
               <a 
                 href="https://github.com/GigaFdlh/TapNota-app" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className={`md:col-span-7 h-80 bg-linear-to-br ${isDarkMode ? 'from-slate-800 to-slate-900' : 'from-slate-200/80 to-slate-300/60'} rounded-xl border ${themeClasses.cardBorder} flex items-center justify-center relative overflow-hidden shadow-2xl group-hover:shadow-teal-400/30 transition-all duration-500 cursor-pointer`}
               >
                 <div className="absolute inset-0 bg-linear-to-br from-teal-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className={`absolute inset-0 ${isDarkMode ? 'bg-[#0a192f]/40' : 'bg-slate-100/40'} group-hover:bg-transparent transition-colors duration-500`}></div>
                 <ShoppingCart size={64} className={`${isDarkMode ? 'text-slate-600' : 'text-slate-400'} group-hover:text-teal-400 transition-all duration-500 transform group-hover:scale-125 group-hover:-rotate-12`} />
                 <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-teal-400 text-xs font-mono">
                    View on GitHub ↗
                 </div>
               </a>
               
               <div className="md:col-span-5 md:text-right">
                 <p className="text-teal-400 font-mono text-sm mb-2">Mobile Application</p>
                 <h3 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary} group-hover:text-teal-400 transition-colors duration-300`}>TapNota - Modern POS</h3>
                 <div className={`bg-linear-to-br ${themeClasses.cardBg} p-6 rounded-lg shadow-xl ${themeClasses.textSecondary} text-sm leading-relaxed mb-6 text-left md:text-right ${isDarkMode ? 'hover:shadow-2xl hover:shadow-teal-400/20' : 'hover:shadow-xl hover:shadow-teal-400/30'} transition-all duration-500 border ${themeClasses.cardBorder} hover:border-teal-400/50 hover:-translate-y-1`}>
                   A beautiful, fully offline Point of Sale (POS) application designed for UMKM. Features a cashier system, product management, real-time analytics, and transaction history without internet dependency.
                 </div>
                 <ul className={`flex flex-wrap gap-3 justify-start md:justify-end ${themeClasses.textSecondary} font-mono text-xs mb-6`}>
                   {['Flutter', 'Provider', 'SharedPrefs', 'UI/UX'].map((tech) => (
                     <li key={tech} className={`px-3 py-1 ${isDarkMode ? 'bg-teal-400/10' : 'bg-teal-50'} rounded-full border border-teal-400/30 hover:bg-teal-400/20 hover:scale-110 transition-all duration-300`}>{tech}</li>
                   ))}
                 </ul>
               </div>
            </div>

            {/* PROJECT 2 */}
            <div className={`grid md:grid-cols-12 gap-8 items-center group transition-all duration-700 delay-200 ${visibleSections.has('projects') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
               <div className="md:col-span-5 order-2 md:order-1">
                 <p className="text-teal-400 font-mono text-sm mb-2">Educational App</p>
                 <h3 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary} group-hover:text-teal-400 transition-colors duration-300`}>SortVizu - Algo Visualizer</h3>
                 <div className={`bg-linear-to-br ${themeClasses.cardBg} p-6 rounded-lg shadow-xl ${themeClasses.textSecondary} text-sm leading-relaxed mb-6 ${isDarkMode ? 'hover:shadow-2xl hover:shadow-teal-400/20' : 'hover:shadow-xl hover:shadow-teal-400/30'} transition-all duration-500 border ${themeClasses.cardBorder} hover:border-teal-400/50 hover:-translate-y-1`}>
                   Interactive sorting algorithm visualizer with &quot;Professional but Fun&quot; design. Includes comparison mode, gamification achievements, dynamic sound effects, and clean architecture implementation.
                 </div>
                 <ul className={`flex flex-wrap gap-3 ${themeClasses.textSecondary} font-mono text-xs mb-6`}>
                   {['Flutter', 'Clean Arch', 'Algorithms', 'AudioPlayers'].map((tech) => (
                     <li key={tech} className={`px-3 py-1 ${isDarkMode ? 'bg-teal-400/10' : 'bg-teal-50'} rounded-full border border-teal-400/30 hover:bg-teal-400/20 hover:scale-110 transition-all duration-300`}>{tech}</li>
                   ))}
                 </ul>
               </div>
               <a 
                 href="https://github.com/GigaFdlh/SortVizu-app" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className={`md:col-span-7 h-80 bg-linear-to-br ${isDarkMode ? 'from-slate-800 to-slate-900' : 'from-slate-200/80 to-slate-300/60'} rounded-xl border ${themeClasses.cardBorder} flex items-center justify-center relative overflow-hidden shadow-2xl order-1 md:order-2 group-hover:shadow-teal-400/30 transition-all duration-500 cursor-pointer`}
               >
                  <div className="absolute inset-0 bg-linear-to-br from-teal-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-[#0a192f]/40' : 'bg-slate-100/40'} group-hover:bg-transparent transition-colors duration-500`}></div>
                  <BarChart2 size={64} className={`${isDarkMode ? 'text-slate-600' : 'text-slate-400'} group-hover:text-teal-400 transition-all duration-500 transform group-hover:scale-125 group-hover:rotate-12`} />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-teal-400 text-xs font-mono">
                    View on GitHub ↗
                 </div>
               </a>
            </div>

            {/* PROJECT 3 */}
            <div className={`grid md:grid-cols-12 gap-8 items-center group transition-all duration-700 delay-300 ${visibleSections.has('projects') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
               <div className={`md:col-span-7 h-80 bg-linear-to-br ${isDarkMode ? 'from-slate-800 to-slate-900' : 'from-slate-200/80 to-slate-300/60'} rounded-xl border ${themeClasses.cardBorder} flex items-center justify-center relative overflow-hidden shadow-2xl group-hover:shadow-teal-400/30 transition-all duration-500`}>
                 <div className="absolute inset-0 bg-linear-to-br from-teal-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className={`absolute inset-0 ${isDarkMode ? 'bg-[#0a192f]/40' : 'bg-slate-100/40'} group-hover:bg-transparent transition-colors duration-500`}></div>
                 <Layers size={64} className={`${isDarkMode ? 'text-slate-600' : 'text-slate-400'} group-hover:text-teal-400 transition-all duration-500 transform group-hover:scale-125 group-hover:-rotate-12`} />
               </div>
               <div className="md:col-span-5 md:text-right">
                 <p className="text-teal-400 font-mono text-sm mb-2">Web Development</p>
                 <h3 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary} group-hover:text-teal-400 transition-colors duration-300`}>Fullstack Web App</h3>
                 <div className={`bg-linear-to-br ${themeClasses.cardBg} p-6 rounded-lg shadow-xl ${themeClasses.textSecondary} text-sm leading-relaxed mb-6 text-left md:text-right ${isDarkMode ? 'hover:shadow-2xl hover:shadow-teal-400/20' : 'hover:shadow-xl hover:shadow-teal-400/30'} transition-all duration-500 border ${themeClasses.cardBorder} hover:border-teal-400/50 hover:-translate-y-1`}>
                   A web-based application with full CRUD features. I handled database design, backend API implementation, to responsive frontend display.
                 </div>
                 <ul className={`flex flex-wrap gap-3 justify-start md:justify-end ${themeClasses.textSecondary} font-mono text-xs mb-6`}>
                   {['Laravel', 'MySQL', 'Bootstrap'].map((tech) => (
                     <li key={tech} className={`px-3 py-1 ${isDarkMode ? 'bg-teal-400/10' : 'bg-teal-50'} rounded-full border border-teal-400/30 hover:bg-teal-400/20 hover:scale-110 transition-all duration-300`}>{tech}</li>
                   ))}
                 </ul>
               </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className={`py-24 max-w-6xl mx-auto transition-all duration-1000 ${visibleSections.has('experience') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="flex items-center gap-4 mb-12">
             <h2 className={`text-3xl md:text-4xl font-bold bg-linear-to-r ${isDarkMode ? 'from-slate-100 to-teal-400' : 'from-slate-700 to-teal-500'} bg-clip-text text-transparent`}>Experiences</h2>
             <div className="h-0.5 bg-linear-to-r from-teal-400 to-transparent flex-1 ml-4"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className={`space-y-12 transition-all duration-700 ${visibleSections.has('experience') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div>
                <h3 className={`flex items-center gap-3 text-xl font-bold ${themeClasses.textPrimary} mb-6`}>
                  <Briefcase className="text-teal-400" size={24} /> Experience & Projects
                </h3>
                <div className={`border-l-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-300'} ml-3 pl-8 relative space-y-10`}>
                  <div className="relative group">
                    <span className={`absolute -left-10 top-1 w-5 h-5 rounded-full ${isDarkMode ? 'bg-[#0a192f]' : 'bg-slate-100'} border-2 border-teal-400 group-hover:scale-125 transition-transform duration-300`}></span>
                    <h4 className={`text-lg font-bold ${themeClasses.textPrimary} group-hover:text-teal-400 transition-colors duration-300`}>
                      Junior Fullstack & Mobile Developer
                    </h4>
                    <p className="text-teal-400 font-mono text-xs mb-3">Academic & Personal Projects | 2023 – Present</p>
                    <p className={`${themeClasses.textSecondary} text-sm leading-relaxed group-hover:${themeClasses.text} transition-colors duration-300`}>
                       Experience gained through academic coursework and self-driven projects. I have built small-scale web and mobile applications as part of university assignments and independent learning. While I do not yet have professional industry experience, I am accustomed to problem-solving, learning new technologies, and completing projects with discipline. I am eager to grow in a professional environment and ready to contribute while continuously improving my technical skills.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className={`flex items-center gap-3 text-xl font-bold ${themeClasses.textPrimary} mb-6`}>
                  <Briefcase className="text-teal-400" size={24} /> Organizational Experience
                </h3>
                <div className={`border-l-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-300'} ml-3 pl-8 relative space-y-10`}>
              
                  <div className="relative group">
                    <span className={`absolute -left-10 top-1 w-5 h-5 rounded-full ${isDarkMode ? 'bg-[#0a192f]' : 'bg-slate-100'} border-2 border-teal-400 group-hover:scale-125 transition-transform duration-300`}></span>
                    <h4 className={`text-lg font-bold ${themeClasses.textPrimary} group-hover:text-teal-400 transition-colors duration-300`}>Secretary of UKM Tarung Derajat</h4>
                    <p className="text-teal-400 font-mono text-xs mb-3">UNIKOM | 2024 – 2025</p>
                    <p className={`${themeClasses.textSecondary} text-sm leading-relaxed group-hover:${themeClasses.text} transition-colors duration-300`}>
                      Fully responsible for administrative management, archiving systems, and organizational correspondence at the university level.
                    </p>
                  </div>

                  <div className="relative group">
                    <span className={`absolute -left-10 top-1 w-5 h-5 rounded-full ${isDarkMode ? 'bg-[#0a192f]' : 'bg-slate-100'} border-2 ${isDarkMode ? 'border-slate-600' : 'border-slate-400'} group-hover:border-teal-400 group-hover:scale-125 transition-all duration-300`}></span>
                    <h4 className={`text-lg font-bold ${themeClasses.textPrimary} group-hover:text-teal-400 transition-colors duration-300`}>Vice Chairman of MPK</h4>
                    <p className="text-teal-400 font-mono text-xs mb-3">SMAN 1 Bantarujeg | 2021 – 2022</p>
                    <p className={`${themeClasses.textSecondary} text-sm leading-relaxed group-hover:${themeClasses.text} transition-colors duration-300`}>
                      Led organizational operations, fostered effective internal communication among members, and made strategic decisions.
                    </p>
                  </div>

                </div>
              </div>

              {/* 3. EDUCATION */}
              <div>
                <h3 className={`flex items-center gap-3 text-xl font-bold ${themeClasses.textPrimary} mb-6`}>
                  <BookOpen className="text-teal-400" size={24} /> Education
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`bg-linear-to-br ${themeClasses.cardBg} p-8 rounded-xl border-t-4 border-teal-400 hover:-translate-y-3 transition-all duration-500 shadow-lg ${isDarkMode ? 'hover:shadow-2xl hover:shadow-teal-400/20' : 'hover:shadow-xl hover:shadow-teal-400/30'} relative overflow-hidden group`}>
                    <div className="absolute inset-0 bg-linear-to-br from-teal-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <h4 className={`text-lg font-bold ${themeClasses.textPrimary} relative z-10`}>Universitas Komputer Indonesia</h4>
                    <p className={`${themeClasses.textSecondary} mt-2 text-sm relative z-10`}>Bachelor of Informatics Engineering</p>
                    <p className="text-teal-400 font-mono text-xs mt-4 relative z-10">2023 – Present</p>
                  </div>
                  <div className={`bg-linear-to-br ${themeClasses.cardBg} p-8 rounded-xl border-t-4 ${isDarkMode ? 'border-slate-600' : 'border-slate-400'} hover:border-teal-400 hover:-translate-y-3 transition-all duration-500 shadow-lg ${isDarkMode ? 'hover:shadow-2xl hover:shadow-teal-400/20' : 'hover:shadow-xl hover:shadow-teal-400/30'} relative overflow-hidden group`}>
                    <div className="absolute inset-0 bg-linear-to-br from-teal-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <h4 className={`text-lg font-bold ${themeClasses.textPrimary} relative z-10`}>SMAN 1 Bantarujeg</h4>
                    <p className={`${themeClasses.textSecondary} mt-2 text-sm relative z-10`}>Science Major (IPA)</p>
                    <p className="text-teal-400 font-mono text-xs mt-4 relative z-10">2020 – 2023</p>
                  </div>
                </div>
              </div>

            </div>

            {/* KOLOM KANAN: Certifications */}
            <div className={`transition-all duration-700 delay-200 ${visibleSections.has('experience') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h3 className={`flex items-center gap-3 text-xl font-bold ${themeClasses.textPrimary} mb-6`}>
                <Award className="text-teal-400" size={24} /> Certifications
              </h3>
              <div className={`bg-linear-to-br ${isDarkMode ? 'from-[#112240]/50 to-[#0a192f]/50' : 'from-slate-100/80 to-slate-200/50'} p-8 rounded-2xl border ${themeClasses.cardBorder} backdrop-blur-sm sticky top-24`}>
                <div className="space-y-4">
                   {certifications.map((cert, index) => (
                     <a
                       key={index}
                       href={cert.link}
                       target="_blank"
                       rel="noopener noreferrer"
                       className={`flex items-center gap-4 p-4 rounded-lg bg-linear-to-r ${themeClasses.cardBg} border border-transparent hover:border-teal-400/30 transition-all duration-300 group hover:-translate-y-1 cursor-pointer`}
                     >
                       <div className={`${isDarkMode ? 'bg-teal-400/10' : 'bg-teal-50'} p-2 rounded text-teal-400 group-hover:bg-teal-400 group-hover:text-white transition-all duration-300 group-hover:scale-110`}>
                         <Award size={18} />
                       </div>
                       <span className={`${themeClasses.text} text-sm font-medium group-hover:text-teal-400 transition-colors duration-300`}>{cert.name}</span>
                       <ArrowUpRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-teal-400" />
                     </a>
                   ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className={`py-32 max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <p className="text-teal-400 font-mono mb-4 text-lg animate-fade-in">What&apos;s Next?</p>
          <h2 className={`text-4xl md:text-5xl font-bold bg-linear-to-r ${isDarkMode ? 'from-slate-100 to-teal-400' : 'from-slate-700 to-teal-500'} bg-clip-text text-transparent mb-8`}>Get In Touch</h2>
          <p className={`${themeClasses.textSecondary} text-lg leading-relaxed mb-12`}>
              I am always open to job opportunities, project collaborations, or simply discussing technology.
          </p>
          <div className="grid md:grid-cols-2 gap-12 text-left">
            <div className={`space-y-8 transition-all duration-700 ${visibleSections.has('contact') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h3 className={`text-2xl font-bold ${themeClasses.textPrimary}`}>Contact Information</h3>
              <p className={themeClasses.textSecondary}>Feel free to reach out via the form or through the platforms below:</p>
              <div className="space-y-4">
                <a href="mailto:gigakurnia81@gmail.com" className={`flex items-center gap-4 ${themeClasses.textSecondary} hover:text-teal-400 transition-all duration-300 p-3 rounded-lg hover:bg-teal-400/10 group`}>
                  <div className={`${isDarkMode ? 'bg-teal-400/10' : 'bg-teal-50'} p-2 rounded group-hover:bg-teal-400 group-hover:text-white transition-all duration-300`}>
                    <Mail size={20} />
                  </div>
                  <span>gigakurnia81@gmail.com</span>
                </a>
                <a href="https://wa.me/6281220875501" target="_blank" className={`flex items-center gap-4 ${themeClasses.textSecondary} hover:text-teal-400 transition-all duration-300 p-3 rounded-lg hover:bg-teal-400/10 group`}>
                  <div className={`${isDarkMode ? 'bg-teal-400/10' : 'bg-teal-50'} p-2 rounded group-hover:bg-teal-400 group-hover:text-white transition-all duration-300`}>
                    <Phone size={20} />
                  </div>
                  <span>+62 812 2087 5501</span>
                </a>
                <a href="https://linkedin.com/in/gigafadhillah" target="_blank" className={`flex items-center gap-4 ${themeClasses.textSecondary} hover:text-teal-400 transition-all duration-300 p-3 rounded-lg hover:bg-teal-400/10 group`}>
                  <div className={`${isDarkMode ? 'bg-teal-400/10' : 'bg-teal-50'} p-2 rounded group-hover:bg-teal-400 group-hover:text-white transition-all duration-300`}>
                    <Linkedin size={20} />
                  </div>
                  <span>linkedin.com/in/gigafadhillah</span>
                </a>
              </div>
            </div>
            <div className={`bg-linear-to-br ${themeClasses.cardBg} p-8 rounded-xl border ${themeClasses.cardBorder} shadow-xl ${isDarkMode ? 'hover:shadow-2xl hover:shadow-teal-400/20' : 'hover:shadow-xl hover:shadow-teal-400/30'} transition-all duration-700 ${visibleSections.has('contact') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <form 
                action="https://formsubmit.co/gigakurnia81@gmail.com" 
                method="POST" 
                className="space-y-4"
              >
                <input type="hidden" name="_captcha" value="false" />
                <div>
                  <label htmlFor="name" className={`block text-sm ${themeClasses.textSecondary} mb-2 font-medium`}>Name</label>
                  <input type="text" id="name" name="name" required className={`w-full ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg p-3 ${themeClasses.textPrimary} focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all duration-300`} placeholder="Your Name" />
                </div>
                <div>
                  <label htmlFor="email" className={`block text-sm ${themeClasses.textSecondary} mb-2 font-medium`}>Email</label>
                  <input type="email" id="email" name="email" required className={`w-full ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg p-3 ${themeClasses.textPrimary} focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all duration-300`} placeholder="email@example.com" />
                </div>
                <div>
                  <label htmlFor="subject" className={`block text-sm ${themeClasses.textSecondary} mb-2 font-medium`}>Subject</label>
                  <input type="text" id="subject" name="_subject" required className={`w-full ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg p-3 ${themeClasses.textPrimary} focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all duration-300`} placeholder="Project Collaboration / Hiring / Question" />
                </div>
                <div>
                  <label htmlFor="message" className={`block text-sm ${themeClasses.textSecondary} mb-2 font-medium`}>Message</label>
                  <textarea id="message" name="message" rows={4} required className={`w-full ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg p-3 ${themeClasses.textPrimary} focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 resize-none`} placeholder="Write your message here..."></textarea>
                </div>

                <button type="submit" className="w-full py-4 bg-linear-to-r from-teal-400/10 to-cyan-400/10 border-2 border-teal-400 text-teal-400 rounded-lg font-bold hover:bg-linear-to-r hover:from-teal-400 hover:to-cyan-400 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-teal-400/50 hover:scale-105">
                  Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className={`py-8 text-center ${isDarkMode ? 'text-slate-500' : 'text-slate-400'} font-mono text-sm ${isDarkMode ? 'bg-[#0a192f]' : 'bg-slate-100'} border-t ${themeClasses.cardBorder} relative z-10`}>
        <p className="hover:text-teal-400 transition-colors duration-300 cursor-default mb-2">
          Designed & Built by <span className="text-teal-400 font-bold">Giga Kurnia Fadhillah</span>
        </p>
        <div className={`flex items-center justify-center gap-2 text-xs ${themeClasses.textSecondary}`}>
              <MapPin size={14} className="text-teal-400"/>
              <span>Kota Bandung, Jawa Barat, Indonesia</span>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <a href="https://github.com/GigaFdlh" target="_blank" className={`${isDarkMode ? 'text-slate-500' : 'text-slate-400'} hover:text-teal-400 transition-all duration-300 hover:-translate-y-1`}><Github size={20} /></a>
          <a href="https://linkedin.com/in/gigafadhillah" target="_blank" className={`${isDarkMode ? 'text-slate-500' : 'text-slate-400'} hover:text-teal-400 transition-all duration-300 hover:-translate-y-1`}><Linkedin size={20} /></a>
          <a href="mailto:gigakurnia81@gmail.com" className={`${isDarkMode ? 'text-slate-500' : 'text-slate-400'} hover:text-teal-400 transition-all duration-300 hover:-translate-y-1`}><Mail size={20} /></a>
        </div>
      </footer>
    </div>
  );
}