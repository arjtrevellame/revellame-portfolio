import { useState, useRef, useEffect } from 'react';
import { imageAssets } from './assets';
import resumePdf from './files/REVELLAME_AvonReevenJane_Resume.pdf?url';
import reportPDF from './files/Revellame_Report.pdf?url';
import {
  Home,
  User,
  Code2,
  FolderGit2,
  Award,
  Briefcase,
  Mail,
  Linkedin,
  Github,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  MessageSquareQuote,
  Send,
  X,
  Star,
  Moon,
  Sun,
  School,
  School2,
  BriefcaseIcon,
} from 'lucide-react';

type Recommendation = {
  id: number;
  name: string;
  role: string;
  text: string;
};

const initialRecommendations: Recommendation[] = [
  {
    id: 1,
    name: 'Sarah Cruz',
    role: 'Senior Software Engineer',
    text: 'Avon is an outstanding developer who consistently delivers high-quality work. Her ability to break down complex problems and mentor teammates makes her an invaluable asset to any engineering team.',
  },
  
];

const skills = [
  { name: 'HTML', image: imageAssets.HTML },
  { name: 'JavaScript', image: imageAssets.JavaScript },
  { name: 'CSS', image: imageAssets.CSS },
  { name: 'SQL', image: imageAssets.SQL },
    // { name: 'Node.js', image: imageAssets['Node.js'] },
  // { name: 'TypeScript', image: imageAssets.TypeScript },
  { name: 'Figma', image: imageAssets.Figma },
  { name: 'Jira', image: imageAssets.Jira },
  { name: 'Python', image: imageAssets.Python },
  { name: 'Weka', image: imageAssets.Weka },
  { name: 'Power BI', image: imageAssets['Power BI'] },
  { name: 'GitHub', image: imageAssets.GitHub },
  { name: 'VS Code', image: imageAssets['VS Code'] },
  { name: 'FastAPI', image: imageAssets['FastAPI'] },

];

const googleSkillsBadge = {
  // Paste your public Google Skills / Cloud Skills Boost badge URL here.
  link: 'https://www.skills.google/public_profiles/230ac786-53ae-4149-8eac-5104675f4fc2',
};

const education = [
  {
    level: 'College',
    school: 'Mapúa Malayan Colleges Laguna',
    program: 'Bachelor of Science in Computer Science | 2022-Present',
    details: 'Specialization in Data Science and Analytics',
    website: 'https://mcl.edu.ph/',
    achievements: [
      "President's Lister | 2024-2025",
      "Dean's Lister | 2022-2025",
      "Participated in ASEAN AI Hackathon | 2026",
      "Participated in Data Science Competition | 2025",
      "Participated in IT Quiz Bee | 2025",
      "Participated in A Date with Python Competition | 2023",
    ],
    organization: [
      'Junior Philippine Computer Society (JPCS) - Mapúa MCL Chapter - Member | 2023-Present ',
    ],
  },
  {
    level: 'Junior & Senior High School',
    school: 'Mount Carmel School of Infanta',
    program: 'Science, Technology, Engineering, and Mathematics (STEM) Strand',
    details: 'Class of 2022',
    website: 'https://mcsi.edu.ph/',
    achievements: [
      'Honor Student | 2017-2022',
      'Marian Awardee | 2020',
    ],
    organization: [
      'Department of Cultural Affairs in Arts - Member | 2019-2020',
    ],
  },
];

const projects = [
  
  {
    title: 'PessoPlanner',
    description:
      "PessoPlanner is an AI-powered mobile application that helps college students take control of their finances by tracking income/allowances and expenses, creating budgets, monitoring spending habits, and setting financial goals. Designed with students in mind, it features an intelligent chatbot that delivers personalized budgeting advice, answers financial questions, and provides smart recommendations based on users' financial activities. By combining intuitive mobile development with AI-driven insights, PessoPlanner empowers students to build healthier financial habits and make more informed financial decisions.",
    tags: ['React Native', 'AI', 'Mobile Development'],
    image:
      imageAssets.PesoPlanner,
    imageAlt: 'A mobile app interface showing financial tracking and budgeting features for college students',
    // Paste the live demo, repository, or case-study URL here.
    link: 'https://github.com/arjtrevellame/PesoPlanner/',
  },
  {
    title: '4Pics 1Word Game',
    description:
      'A Python-based word puzzle game inspired by 4 Pics 1 Word, where players identify a word by analyzing four related images. Developed as a Machine Problem for the IT101-2L course, this project demonstrates the practical application of Object-Oriented Programming (OOP) principles, including class design, encapsulation, and modular programming, while showcasing problem-solving and software development skills.',
    tags: ['Python'],
    image:
      imageAssets['4 Pics 1 Word'],
    imageAlt: 'Image representing a word puzzle game interface',
    // Paste the live demo, repository, or case-study URL here.
    link: 'https://github.com/arjtrevellame/4pics1word',
  },
  {
    title: 'Mingle: A Twitter Clone',
    description:
      'A Twitter-like social media platform, this project showcases the implementation of user authentication, real-time updates, and a responsive design.',
    tags: ['CSS', 'JavaScript', 'HTML'],
    image:
      imageAssets['Mingle'],
    imageAlt: 'Image representing a word puzzle game interface',
    // Paste the live demo, repository, or case-study URL here.
    link: 'https://github.com/arjtrevellame/TwitterClone',
  },

];

const certificateFiles = Object.entries(
  import.meta.glob('./certificates/*.{png,jpg,jpeg,webp,pdf}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
)
  .map(([path, source]) => {
    const filename = path.split('/').pop() ?? 'Certificate';
    const isPdf = filename.toLowerCase().endsWith('.pdf');

    return {
      title: filename.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '),
      source: source as string,
      isPdf,
    };
  })
  .sort((first, second) => first.title.localeCompare(second.title));

function ProjectImageHeader({
  image,
  title,
  alt,
}: {
  image?: string;
  title: string;
  alt?: string;
}) {
  if (image) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl bg-slate-100">
        <img
          src={image}
          alt={alt ?? `${title} preview`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#d78eb0] to-[#7a4f6d]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.25),_transparent_60%)]" />
      <span className="relative text-lg font-semibold text-white">{title}</span>
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );
  const [recommendations, setRecommendations] = useState<Recommendation[]>(
    initialRecommendations
  );
  const [recommendationText, setRecommendationText] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [certificatePage, setCertificatePage] = useState(0);
  const [previewedCertificateIndex, setPreviewedCertificateIndex] = useState<number | null>(null);
  const [isCertificateTransitioning, setIsCertificateTransitioning] = useState(false);
  const [heroParallax, setHeroParallax] = useState(0);
  const [profileParallax, setProfileParallax] = useState({ x: 0, y: 0 });
  const homeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });
  const certificateTransitionTimeoutRef = useRef<number | null>(null);

  const scrollToHome = () => {
    homeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const certificatesPerPage = 3;
  const certificatePageCount = Math.ceil(certificateFiles.length / certificatesPerPage);
  const visibleCertificates = certificateFiles.slice(
    certificatePage * certificatesPerPage,
    (certificatePage + 1) * certificatesPerPage
  );

  const changeCertificatePage = (nextPage: number) => {
    if (nextPage === certificatePage || isCertificateTransitioning) return;

    setIsCertificateTransitioning(true);
    certificateTransitionTimeoutRef.current = window.setTimeout(() => {
      setCertificatePage(nextPage);
      setIsCertificateTransitioning(false);
      certificateTransitionTimeoutRef.current = null;
    }, 180);
  };

  const addRecommendation = () => {
    if (recommendationText.trim() === '') return;
    const newRec: Recommendation = {
      id: Date.now(),
      name: 'You',
      role: 'Just now',
      text: recommendationText.trim(),
    };
    setRecommendations((prev) => [...prev, newRec]);
    setRecommendationText('');
    setShowPopup(true);
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => () => {
    if (certificateTransitionTimeoutRef.current) {
      window.clearTimeout(certificateTransitionTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const updateParallax = () => {
      animationFrame = 0;
      setHeroParallax(Math.min(window.scrollY, 800));
    };

    const handleScroll = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;

    type Star = {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      twinkleSpeed: number;
      twinkleOffset: number;
    };

    const stars: Star[] = [];

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars.length = 0;
      const count = Math.min(180, Math.max(100, Math.floor((rect.width * rect.height) / 14000)));

      for (let index = 0; index < count; index += 1) {
        stars.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          size: Math.random() * 1.6 + 0.4,
          speedX: (Math.random() - 0.5) * 0.05,
          speedY: (Math.random() - 0.5) * 0.045,
          alpha: Math.random() * 0.6 + 0.2,
          twinkleSpeed: Math.random() * 0.025 + 0.012,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const handlePointerMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
    };

    const drawScene = (time: number) => {
      context.clearRect(0, 0, width, height);

      const pointerX = (pointerRef.current.x - 0.5) * 10;
      const pointerY = (pointerRef.current.y - 0.5) * 10;

      for (let index = 0; index < stars.length; index += 1) {
        const star = stars[index];
        star.x += star.speedX + pointerX * 0.0025;
        star.y += star.speedY + pointerY * 0.0025;

        if (star.x < -12) star.x = width + 12;
        if (star.x > width + 12) star.x = -12;
        if (star.y < -12) star.y = height + 12;
        if (star.y > height + 12) star.y = -12;

        const twinkle = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(time * 0.001 * star.twinkleSpeed + star.twinkleOffset));
        const alpha = star.alpha * twinkle;

        context.beginPath();
        context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        context.shadowBlur = 12;
        context.shadowColor = 'rgba(173, 216, 230, 0.7)';
        context.fill();
        context.shadowBlur = 0;
      }

      for (let index = 0; index < stars.length; index += 1) {
        for (let next = index + 1; next < stars.length; next += 1) {
          const first = stars[index];
          const second = stars[next];
          const distance = Math.hypot(first.x - second.x, first.y - second.y);

          if (distance < 110) {
            const opacity = (1 - distance / 110) * 0.16;
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.strokeStyle = `rgba(173, 216, 230, ${opacity})`;
            context.lineWidth = 0.7;
            context.stroke();
          }
        }
      }

      animationFrame = window.requestAnimationFrame(drawScene);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handlePointerMove);
    animationFrame = window.requestAnimationFrame(drawScene);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen bg-[#fff8fc] text-slate-800 font-sans scroll-smooth transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100`}>
      {/* ===== NAV BAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#7a4f6d]/95 backdrop-blur-md border-b border-[#a66f8f] shadow-lg dark:border-slate-700 dark:bg-slate-900/95">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white tracking-tight">
            ARJ
          </div>
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'About Me', target: '#about', icon: User },
                { label: 'Education', target: '#education', icon: School },
              { label: 'Skills', target: '#skills', icon: Code2 },
              { label: 'Projects', target: '#projects', icon: FolderGit2 },
              { label: 'Certificates', target: '#certificates', icon: certificateFiles.length > 0 ? Award : Star },
              { label: 'Internship', target: '#internship', icon: BriefcaseIcon },
              // {
              //   label: 'Recommendations',
              //   target: '#recommendations',
              //   icon: MessageSquareQuote,
              // },
            ].map(({ label, target, icon: Icon }) => (
              <a
                key={target}
                href={target}
                className="topmenu group flex items-center gap-2 text-[#f8eaf2] font-medium transition-all duration-200 hover:text-white hover:font-bold hover:underline underline-offset-4"
              >
                <Icon className="w-4 h-4" />
                {label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIsDarkMode((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#f8eaf2] transition-colors hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {/* Mobile menu */}
          <div className="md:hidden flex items-center gap-4">
            {[
              { target: '#about', icon: User },
              { target: '#skills', icon: Code2 },
              { target: '#projects', icon: FolderGit2 },
              { target: '#recommendations', icon: MessageSquareQuote },
            ].map(({ target, icon: Icon }) => (
              <a
                key={target}
                href={target}
                className="text-[#f8eaf2] hover:text-white transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ===== HOME / PROFILE NAME ===== */}
      <section
        id="home"
        ref={homeRef}
        className="relative pt-24 pb-16 px-6 overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full pointer-events-none"
          style={{ transform: `translate3d(0, ${heroParallax * 0.12}px, 0) scale(1.08)` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#221423] via-[#4a2b45] to-[#8b5d88]" style={{ transform: `translate3d(0, ${heroParallax * 0.04}px, 0) scale(1.04)` }} />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_30%,#ffe4ef_0%,transparent_50%)]" style={{ transform: `translate3d(0, ${heroParallax * -0.06}px, 0) scale(1.1)` }} />
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_80%_70%,#d9c7ff_0%,transparent_50%)]" style={{ transform: `translate3d(0, ${heroParallax * 0.08}px, 0) scale(1.1)` }} />
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center justify-center text-center py-16" style={{ transform: `translate3d(0, ${heroParallax * -0.08}px, 0)` }}>
          {/* <a
            href="#about"
            className="group relative mb-7 block rounded-full focus:outline-none focus:ring-4 focus:ring-[#f8dce9]/80 focus:ring-offset-4 focus:ring-offset-[#4a2b45]"
            aria-label="Learn more about Avon Reeven Jane Revellame"
          >
            <span className="absolute -inset-3 rounded-full bg-[#d78eb0]/35 blur-xl transition-opacity duration-300 group-hover:opacity-90" />
            <img
              src={imageAssets.profile}
              alt="Avon Reeven Jane Revellame"
              className="relative h-40 w-40 rounded-full border-4 border-[#f8dce9] object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105 md:h-48 md:w-48"
            />
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#d78eb0] px-4 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-1 group-hover:opacity-100 group-focus:translate-y-1 group-focus:opacity-100">
              Get to know me
            </span>
          </a> */}
          <div className="profile_name float-left text-[#fff4f8] text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
            Hello, I'm Avon Reeven Jane Revellame
          </div>
          <div className="hero-typewriter mt-3 text-sm font-medium text-[#fff4f8] sm:text-base md:text-xl" aria-label="Aspiring UI/UX Designer. Specialization in Data Science and Analytics. Lifelong Learner.">
            <span className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-[#fff4f8] shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f8dce9]/80 hover:bg-white/20 hover:shadow-[#d78eb0]/30 before:flex before:h-6 before:w-6 before:items-center before:justify-center before:rounded-full before:bg-[#d78eb0] before:text-xs before:content-['✦'] group-hover:before:scale-110">
              Aspiring UI/UX Designer
            </span>
            <span className="mx-1 text-[#f8dce9]"></span>
            <span className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-[#fff4f8] shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f8dce9]/80 hover:bg-white/20 hover:shadow-[#d78eb0]/30 before:flex before:h-6 before:w-6 before:items-center before:justify-center before:rounded-full before:bg-[#d78eb0] before:text-xs before:content-['⌘'] group-hover:before:scale-110">
              Specialization in Data Science and Analytics
            </span>
            <span className="mx-1 text-[#f8dce9]"></span>
            <span className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-[#fff4f8] shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f8dce9]/80 hover:bg-white/20 hover:shadow-[#d78eb0]/30 before:flex before:h-6 before:w-6 before:items-center before:justify-center before:rounded-full before:bg-[#d78eb0] before:text-xs before:content-['↗'] group-hover:before:scale-110">
              Lifelong Learner
            </span>
          </div>
          <div className="mt-8 flex gap-4">
            <a
              href="#about"
              className="rounded-full bg-[#d78eb0] px-8 py-3 font-semibold text-white shadow-lg shadow-[#d78eb0]/30 transition-transform hover:scale-105 hover:bg-[#c56f99]"
            >
              Get to know me
            </a>
            <a
              href="#projects"
              className="rounded-full bg-[#d78eb0] px-8 py-3 font-semibold text-white shadow-lg shadow-[#d78eb0]/30 transition-transform hover:scale-105 hover:bg-[#c56f99]"
            >
              View projects
            </a>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ME ===== */}
      <section id="about" className="py-20 px-6 bg-[#fffafc] transition-colors duration-300 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 flex items-center gap-3 dark:text-white">
            <User className="w-7 h-7 text-[#d78eb0]" />
            About Me
          </h2>
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div
              className="rounded-full transition-transform duration-200 ease-out"
              style={{ transform: `translate3d(${profileParallax.x}px, ${profileParallax.y}px, 0)` }}
              onMouseMove={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect();
                setProfileParallax({
                  x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 12,
                  y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 12,
                });
              }}
              onMouseLeave={() => setProfileParallax({ x: 0, y: 0 })}
            >
              <img
                src={imageAssets.profile}
                alt="Avon Reeven Jane Revellame profile"
                className="h-64 w-64 rounded-full object-cover shadow-xl ring-4 ring-[#f5dceb] md:h-72 md:w-72"
              />
            </div>
            <div className="flex-1 text-slate-600 leading-relaxed text-lg dark:text-slate-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-3 dark:text-white">
                Avon Reeven Jane Revellame
              </h3>
              <p className="mb-4">
               I'm a 4th-year student taking Bachelor of Science in Computer Science  at 
               Mapúa Malayan Colleges Laguna (MMCL), driven by a passion for creating
               meaningful digital experiences. I love combining technology and the arts, 
               blending creativity with technical problem-solving to build engaging and user-centered
               solutions. 

              </p>
              <p>
                I'm always eager to learn new technologies, take on challenging projects, 
                 and continuously improve my skills as I grow into a future CS professional.
              </p>
              <a
                href={resumePdf}
                download="REVELLAME_AvonReevenJane_Resume.pdf"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d78eb0] px-8 py-3 font-semibold text-white shadow-lg shadow-[#d78eb0]/30 transition-transform hover:scale-105 hover:bg-[#c56f99]"
              >
                <Download className="h-5 w-5" />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EDUCATION ===== */}
      <section id="education" className="bg-[#fdf2f8] px-6 py-20 transition-colors duration-300 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-white">
            <School className="h-7 w-7 text-[#d78eb0]" />
            Education
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {education.map((school) => (
              <article key={school.level} className="group rounded-2xl border border-[#f3d8e5] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#d78eb0]/15 dark:border-slate-700 dark:bg-slate-800 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#a34d74] dark:text-pink-200">{school.level}</p>
                    <a
                      href={school.website || undefined}
                      target={school.website ? '_blank' : undefined}
                      rel={school.website ? 'noreferrer' : undefined}
                      onClick={(event) => {
                        if (!school.website) event.preventDefault();
                      }}
                      aria-disabled={!school.website}
                      className="mt-2 inline-flex items-center gap-2 text-2xl font-bold text-slate-900 underline decoration-[#d78eb0]/60 decoration-2 underline-offset-4 transition-colors hover:text-[#a34d74] dark:text-white dark:hover:text-pink-200 aria-disabled:cursor-not-allowed aria-disabled:opacity-70"
                    >
                      {school.school}
                      {school.website && <ExternalLink className="h-4 w-4" />}
                    </a>
                  </div>
                  <School2 className="h-9 w-9 shrink-0 text-[#d78eb0] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
                </div>
                <p className="mt-5 font-semibold text-slate-700 dark:text-slate-200">{school.program}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{school.details}</p>
                <details className="mt-6 rounded-xl bg-[#fff5fa] p-4 transition-colors open:bg-[#fdeaf4] dark:bg-slate-900 dark:open:bg-slate-700">
                  <summary className="cursor-pointer font-semibold text-[#a34d74] marker:text-[#d78eb0] dark:text-pink-200">Achievements</summary>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {school.achievements.map((achievement) => (
                      <li key={achievement} className="flex gap-2"><span className="text-[#d78eb0]">•</span>{achievement}</li>
                    ))}
                  </ul>
                </details>
                <details className="mt-6 rounded-xl bg-[#fff5fa] p-4 transition-colors open:bg-[#fdeaf4] dark:bg-slate-900 dark:open:bg-slate-700">
                  <summary className="cursor-pointer font-semibold text-[#a34d74] marker:text-[#d78eb0] dark:text-pink-200">Organization</summary>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {school.organization.map((organization) => (
                      <li key={organization} className="flex gap-2"><span className="text-[#d78eb0]">•</span>{organization }</li>
                    ))}
                  </ul>
                </details>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section id="skills" className="bg-[#fffafc] px-6 py-20 transition-colors duration-300 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 flex items-center gap-3 dark:text-white">
            <Code2 className="w-7 h-7 text-[#d78eb0]" />
            Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="flex flex-col items-center gap-3 rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#d78eb0]/15 group dark:bg-slate-800"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#f3d8e5] bg-white shadow-md group-hover:scale-110 transition-transform">
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section id="projects" className="bg-[#fdf2f8] px-6 py-20 transition-colors duration-300 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 flex items-center gap-3 dark:text-white">
            <FolderGit2 className="w-7 h-7 text-[#d78eb0]" />
            Featured Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#f3d8e5] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#d78eb0]/15 dark:border-slate-700 dark:bg-slate-800"
              >
                <ProjectImageHeader
                  image={project.image}
                  title={project.title}
                  alt={project.imageAlt}
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {project.description}
                  </p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#fdeaf4] px-3 py-1 text-xs font-medium text-[#a34d74] dark:bg-slate-700 dark:text-pink-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link || undefined}
                    target={project.link ? '_blank' : undefined}
                    rel={project.link ? 'noreferrer' : undefined}
                    onClick={(event) => {
                      if (!project.link) event.preventDefault();
                    }}
                    aria-disabled={!project.link}
                    className="mt-auto inline-flex self-end items-center gap-2 rounded-full bg-[#d78eb0] px-6 py-3 font-semibold text-white shadow-lg shadow-[#d78eb0]/30 transition-transform hover:scale-105 hover:bg-[#c56f99] aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:scale-100 aria-disabled:hover:bg-[#d78eb0]"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {project.link ? 'View Project' : 'Project Link Coming Soon'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CERTIFICATES ===== */}
      <section id="certificates" className="bg-[#fffafc] px-6 py-20 text-slate-800 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 flex items-center gap-3 text-3xl font-bold">
            <Award className="h-7 w-7 text-[#d78eb0]" />
            Certificates
          </h2>
          {certificateFiles.length > 0 ? (
            <>
              <div className={`grid gap-8 transition-opacity duration-200 md:grid-cols-2 lg:grid-cols-3 ${isCertificateTransitioning ? 'opacity-0' : 'opacity-100'}`} aria-live="polite">
                {visibleCertificates.map((certificate, index) => {
                  const certificateIndex = certificatePage * certificatesPerPage + index;
                  return (
                    <article key={certificate.source} className="flex min-h-[410px] flex-col rounded-2xl border-2 border-[#f3d8e5] bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d78eb0] hover:shadow-xl hover:shadow-[#d78eb0]/15 focus-within:-translate-y-1 focus-within:border-[#d78eb0] focus-within:shadow-xl focus-within:shadow-[#d78eb0]/15 dark:border-slate-700 dark:bg-slate-800">
                      <div className="relative mb-6 flex h-44 items-center justify-center overflow-hidden rounded-xl bg-[#fff5fa] dark:bg-slate-900">
                        {certificate.isPdf ? (
                          <object data={`${certificate.source}#toolbar=0&navpanes=0&scrollbar=0`} type="application/pdf" aria-label={`${certificate.title} certificate thumbnail`} className="pointer-events-none h-full w-full">
                            <span className="flex h-full items-center justify-center text-sm font-semibold text-[#a34d74] dark:text-pink-200">PDF certificate</span>
                          </object>
                        ) : (
                          <img src={certificate.source} alt={`${certificate.title} certificate thumbnail`} className="h-full w-full select-none object-contain" draggable={false} />
                        )}
                        {certificate.isPdf && <span className="absolute right-3 top-3 rounded-full bg-[#d78eb0] px-2 py-1 text-xs font-bold text-white">PDF</span>}
                      </div>
                      <h3 className="text-xl font-bold leading-snug capitalize text-slate-900 dark:text-white">{certificate.title}</h3>
                      {/* <p className="mt-3 text-slate-500 dark:text-slate-300">Read-only certificate</p> */}
                      <button type="button" onClick={() => setPreviewedCertificateIndex(certificateIndex)} className="mt-auto self-center rounded-full bg-[#d78eb0] px-8 py-3 font-semibold text-white transition-transform hover:scale-105 hover:bg-[#c56f99] focus:outline-none focus:ring-2 focus:ring-[#d78eb0] focus:ring-offset-2 dark:focus:ring-offset-slate-800">View</button>
                    </article>
                  );
                })}
              </div>
              {certificatePageCount > 1 && (
                <div className="mt-10 flex items-center justify-center gap-5">
                  <button type="button" onClick={() => changeCertificatePage(Math.max(0, certificatePage - 1))} disabled={certificatePage === 0 || isCertificateTransitioning} className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d78eb0] text-white transition-transform hover:scale-105 hover:bg-[#c56f99] disabled:cursor-not-allowed disabled:opacity-40" aria-label="Previous certificate page"><ChevronLeft className="h-6 w-6" /></button>
                  <div className="flex gap-3" aria-label="Certificate pages">
                    {Array.from({ length: certificatePageCount }, (_, index) => (
                      <button key={index} type="button" onClick={() => changeCertificatePage(index)} disabled={isCertificateTransitioning} className={`h-4 w-4 rounded-full border-2 border-[#d78eb0] ${index === certificatePage ? 'bg-[#d78eb0]' : 'bg-transparent'} disabled:cursor-not-allowed`} aria-label={`Show certificate page ${index + 1}`} aria-current={index === certificatePage ? 'page' : undefined} />
                    ))}
                  </div>
                  <button type="button" onClick={() => changeCertificatePage(Math.min(certificatePageCount - 1, certificatePage + 1))} disabled={certificatePage === certificatePageCount - 1 || isCertificateTransitioning} className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d78eb0] text-white transition-transform hover:scale-105 hover:bg-[#c56f99] disabled:cursor-not-allowed disabled:opacity-40" aria-label="Next certificate page"><ChevronRight className="h-6 w-6" /></button>
                </div>
              )}
              <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#f3d8e5] bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d78eb0] hover:shadow-xl hover:shadow-[#d78eb0]/15 focus-within:-translate-y-1 focus-within:border-[#d78eb0] focus-within:shadow-xl focus-within:shadow-[#d78eb0]/15 dark:border-slate-700 dark:bg-slate-800 md:flex-row md:text-left">
                <div>
                  <h3 className="flex items-center justify-center gap-2 text-xl font-bold text-slate-900 dark:text-white md:justify-start">
                    <School className="h-5 w-5 text-[#d78eb0]" />
                    Google Skills Badge
                  </h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">
                    View my verified Google Skills and Cloud Skills Boost achievements.
                  </p>
                </div>
                <a
                  href={googleSkillsBadge.link || undefined}
                  target={googleSkillsBadge.link ? '_blank' : undefined}
                  rel={googleSkillsBadge.link ? 'noreferrer' : undefined}
                  onClick={(event) => {
                    if (!googleSkillsBadge.link) event.preventDefault();
                  }}
                  aria-disabled={!googleSkillsBadge.link}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#d78eb0] px-6 py-3 font-semibold text-white shadow-lg shadow-[#d78eb0]/30 transition-transform hover:scale-105 hover:bg-[#c56f99] aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:scale-100 aria-disabled:hover:bg-[#d78eb0]"
                >
                  <ExternalLink className="h-4 w-4" />
                  {googleSkillsBadge.link ? 'View Google Skills Badge' : 'Google Skills Badge Coming Soon'}
                </a>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#d78eb0] bg-white p-8 text-center text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
              Add image or PDF certificate files to <code className="rounded bg-[#fdeaf4] px-1.5 py-0.5 text-[#a34d74] dark:bg-slate-700 dark:text-pink-200">src/certificates</code> to display them here.
            </div>
          )}
        </div>
      </section>

      {previewedCertificateIndex !== null && certificateFiles[previewedCertificateIndex] && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6" role="dialog" aria-modal="true" aria-label="Certificate preview">
          <div className="relative max-h-full w-full max-w-5xl overflow-hidden rounded-2xl bg-white p-4 shadow-2xl dark:bg-slate-800">
            <button type="button" onClick={() => setPreviewedCertificateIndex(null)} className="absolute right-6 top-6 z-10 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black" aria-label="Close certificate preview"><X className="h-5 w-5" /></button>
            <div className="h-[75vh] rounded-xl bg-[#fff5fa] dark:bg-slate-900">
              {certificateFiles[previewedCertificateIndex].isPdf ? (
                <object data={`${certificateFiles[previewedCertificateIndex].source}#toolbar=0&navpanes=0&scrollbar=0`} type="application/pdf" aria-label={`${certificateFiles[previewedCertificateIndex].title} certificate preview`} className="pointer-events-none h-full w-full"><span className="flex h-full items-center justify-center text-[#a34d74] dark:text-pink-200">PDF certificate preview</span></object>
              ) : (
                <img src={certificateFiles[previewedCertificateIndex].source} alt={`${certificateFiles[previewedCertificateIndex].title} certificate`} className="h-full w-full select-none object-contain" draggable={false} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== INTERNSHIP ===== */}
      <section id="internship" className="bg-[#fdf2f8] px-6 py-20 transition-colors duration-300 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="mb-10 flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-white">
            <Briefcase className="h-7 w-7 text-[#d78eb0]" />
            Internship
          </h2>
          <article className="rounded-2xl border border-[#f3d8e5] bg-[#fff5fa] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d78eb0] hover:shadow-xl hover:shadow-[#d78eb0]/15 focus-within:-translate-y-1 focus-within:border-[#d78eb0] focus-within:shadow-xl focus-within:shadow-[#d78eb0]/15 dark:border-slate-700 dark:bg-slate-800 md:p-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#a34d74] dark:text-pink-200">Internship Experience</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Associate Software Quality Engineer-Intern</h3>
                <p className="mt-1 text-slate-500 dark:text-slate-400">OPSolutions · Carolina Center #204 - 207, 213, Sta Rosa - Tagaytay Road Silang, Cavite, Philippines, 4118 · May - July 2026</p>
              </div>
              <Briefcase className="h-10 w-10 shrink-0 text-[#d78eb0]" />
            </div>

            <div className="mt-10">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">Internship Journey</h4>
              <ol className="relative mt-6 border-s-2 border-[#e7b5cc] dark:border-slate-600">
                {[
                  {
                    title: 'Application and Interview',
                    description: 'Submitted my application, prepared my portfolio, and completed the interview process.',
                  },
                  {
                    title: 'Pre-Internship Preparation',
                    description: 'Reviewed quality assurance fundamentals, testing concepts, and the tools used by the team.',
                  },
                  {
                    title: 'Onboarding',
                    description: 'Learned the company workflow, team expectations, development environment, and project context.',
                  },
                  {
                    title: 'QA Training and Learning Phase',
                    description: 'Strengthened my understanding of test planning, test cases, bug reporting, and QA best practices.',
                  },
                  {
                    title: 'Software Testing Lifecycle Execution',
                    description: 'Applied the software testing lifecycle by preparing, executing, documenting, and reviewing test activities.',
                  },
                  {
                    title: 'Development for Automation and Growth',
                    description: 'Explored automation development while continuously improving my technical, communication, and problem-solving skills.',
                  },
                ].map((stage, index) => (
                  <li key={stage.title} className="ms-7 pb-8 last:pb-0">
                    <span className="absolute -start-[11px] flex h-5 w-5 items-center justify-center rounded-full bg-[#d78eb0] ring-4 ring-[#fff5fa] dark:ring-slate-800">
                      <span className="h-2 w-2 rounded-full bg-white" />
                    </span>
                    <p className="text-sm font-semibold text-[#a34d74] dark:text-pink-200">Stage {index + 1}</p>
                    <h5 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{stage.title}</h5>
                    <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">{stage.description}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <section className="rounded-xl border border-[#f3d8e5] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d78eb0] hover:shadow-xl hover:shadow-[#d78eb0]/15 dark:border-slate-700 dark:bg-slate-900">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Key Achievements</h4>
                <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
                  <li className="flex gap-3"><span className="text-[#d78eb0]">•</span>Completed onboarding and foundational QA training.</li>
                  <li className="flex gap-3"><span className="text-[#d78eb0]">•</span>Applied structured testing practices throughout the software testing lifecycle.</li>
                  <li className="flex gap-3"><span className="text-[#d78eb0]">•</span>Built knowledge of test automation concepts and quality-focused development.</li>
                </ul>
              </section>
              <section className="rounded-xl border border-[#f3d8e5] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d78eb0] hover:shadow-xl hover:shadow-[#d78eb0]/15 dark:border-slate-700 dark:bg-slate-900">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Key Takeaways</h4>
                <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
                  <li className="flex gap-3"><span className="text-[#d78eb0]">•</span>Quality is a shared responsibility across the development team.</li>
                  <li className="flex gap-3"><span className="text-[#d78eb0]">•</span>Clear test documentation makes issues easier to reproduce and resolve.</li>
                  <li className="flex gap-3"><span className="text-[#d78eb0]">•</span>Continuous learning is essential when working with testing tools and automation.</li>
                </ul>
              </section>
            </div>
            {/* <a
              href={reportPDF}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d78eb0] px-8 py-3 font-semibold text-white shadow-lg shadow-[#d78eb0]/30 transition-transform hover:scale-105 hover:bg-[#c56f99]"
            >
              <ExternalLink className="h-5 w-5" />
              View Full Report
            </a> */}

          </article>
        </div>
      </section>

      {/* ===== CONTACTS ===== */}
      <section id="contacts" className="bg-[#fffafc] px-6 py-20 transition-colors duration-300 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="mb-10 flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-white">
            <Mail className="h-7 w-7 text-[#d78eb0]" />
            Contacts
          </h2>
          <div className="rounded-2xl bg-[#7a4f6d] p-8 text-[#fff4f8] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#d78eb0]/15 focus-within:-translate-y-1 focus-within:shadow-xl focus-within:shadow-[#d78eb0]/15 md:p-10">
            <h3 className="text-2xl font-bold">Let’s connect</h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-[#f8eaf2]">
              I’m open to collaborations, internship opportunities, and conversations about design and technology.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="mailto: avonreevenrevellame@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-[#7a4f6d] transition-transform hover:scale-105">
                <Mail className="h-5 w-5" />
                avonreevenrevellame@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/avon-reeven-jane-revellame/" aria-label="LinkedIn profile" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/15">
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
              <a href="https://github.com/arjtrevellame" aria-label="GitHub profile" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/15">
                <Github className="h-5 w-5" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      
      {/* ===== FOOTER ===== */}
      <footer className="bg-[#7a4f6d] text-[#fcecf5] py-8 px-6 text-center">
        <p className="text-sm">
          © 2026 Avon Reeven Jane Revellame
        </p>
      </footer>
    </div>
  );
}

export default App;
