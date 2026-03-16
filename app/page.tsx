'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Send, Check, ExternalLink, Mail, Globe, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const whatsappBookCallUrl =
    'https://api.whatsapp.com/send/?phone=212770708444&text=Bonjour%20AtlasKodo%2C%20je%20souhaite%20demander%20un%20devis.&type=phone_number&app_absent=0';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSending, setIsSending] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const projectsScrollRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0');
        }
      });
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = "L'e-mail est requis";
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    if (formData.message.trim().length < 4) {
      newErrors.message = 'Le message doit contenir au moins 4 caractères';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSending(true);
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then(async (res) => {
          if (!res.ok) {
            const data = await res.json().catch(() => null);
            const msg = data?.error || "Échec de l'envoi du message";
            throw new Error(msg);
          }

          setFormSubmitted(true);
          setTimeout(() => {
            setFormSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
          }, 3000);
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : "Échec de l'envoi du message";
          setErrors((prev) => ({ ...prev, submit: msg }));
        })
        .finally(() => setIsSending(false));
    }
  };

  const scrollProjects = (direction: 'left' | 'right') => {
    if (projectsScrollRef.current) {
      projectsScrollRef.current.scrollBy({
        left: direction === 'left' ? -400 : 400,
        behavior: 'smooth',
      });
    }
  };

  const projects = [
    {
      name: 'AI Career Navigator',
      desc: "Plateforme d'orientation de carrière propulsée par IA — démo.",
      tags: ['IA', 'Full-Stack', 'Design'],
      image: '/images/AI%20Career%20Navigator.png',
      url: 'https://ai-career-navigator-orcin.vercel.app/',
    },
    {
      name: 'Highway Academy',
      desc: 'École privée à Fès — site marketing officiel.',
      tags: ['Marketing', 'Landing', 'Responsive'],
      image: '/images/Highway.png',
      url: 'https://www.highwayacademy.ma/',
    },
    {
      name: 'Institut Paramedicalis',
      desc: 'École paramédicale — site institutionnel.',
      tags: ['Éducation', 'UI', 'Web'],
      image: '/images/Institut.png',
      url: 'https://paramedicalis.vercel.app/',
    },
    {
      name: 'Centre Excellence',
      desc: 'Site vitrine pour centre de formation professionnelle — démo.',
      tags: ['UI', 'Vitrine', 'Vercel'],
      image: '/images/Centre.png',
      url: 'https://centerdeformation.vercel.app/',
    },
    {
      name: 'Enactus ENSAH',
      desc: "Site d'association d'entrepreneuriat étudiant — démo.",
      tags: ['Motion', 'UI', 'Association'],
      image: '/images/Enactus-ENSAH.png',
      url: 'https://enactus-ensah.vercel.app/',
    },
    {
      name: 'Al-Fihriya',
      desc: 'Centre de soutien scolaire — site démo.',
      tags: ['Éducation', 'Responsive', 'Web'],
      image: '/images/Al-fihriya.png',
      url: 'https://centerformation.vercel.app/',
    },
  ];

  const services = [
    {
      number: '01',
      title: 'Landing\nPage',
      description: "Site d’une page optimisé pour la conversion. Mobile-first, rapide, prêt pour le SEO.",
      features: ['Design responsive', 'Optimisation SEO', 'Formulaire de contact', 'Analytics intégré'],
      timeline: '1–2 SEMAINES',
      cta: 'DEMANDER UN DEVIS',
    },
    {
      number: '02',
      title: 'Site\nComplet',
      description: 'Multi-pages avec réservation, tableau de bord admin et analytics intégrés.',
      features: ['Tout du Landing Page', 'Système de réservation', 'Tableau de bord admin', 'Multi-langues'],
      timeline: '2–4 SEMAINES',
      cta: 'DEMANDER UN DEVIS',
    },
    {
      number: '03',
      badge: 'LE PLUS POPULAIRE',
      title: 'Plateforme\nSaaS',
      description: 'SaaS complet avec authentification, paiements, temps réel et tableau de bord.',
      features: ['Tout du Site Complet', 'Authentification', 'Intégration paiement', 'Fonctions temps réel', 'Tableau de bord sur mesure'],
      timeline: '8–16 SEMAINES',
      cta: 'DEMANDER UN DEVIS',
      popular: true,
    },
    {
      number: '04',
      title: 'Entreprise',
      description: 'Solutions digitales complètes avec équipe dédiée et support prioritaire.',
      features: ['Tout du SaaS', 'Équipe dédiée', 'Support 24/7', 'Intégrations & API', 'Maintenance continue'],
      timeline: 'SUR MESURE',
      cta: 'DEMANDER UN DEVIS',
    },
  ];

  const testimonials = [
    {
      quote: 'Leur expertise technique et leur sens du design ont complètement transformé notre présence en ligne. Une équipe de vrais professionnels.',
      author: 'Sarah M.',
      title: 'Directrice Créative',
      company: 'Digihive Studio',
    },
    {
      quote: "Nous sommes passés du chaos à un fonctionnement d'horlogerie. Leur solution sur mesure a optimisé tous nos processus internes.",
      author: 'Youssef A.',
      title: 'Directeur des Opérations',
      company: 'Atlas Adventures',
    },
    {
      quote: 'AtlasKodo.dev ne nous a pas juste construit un site web, ils nous ont construit une machine à revenus. Les réservations ont doublé.',
      author: 'Ahmed B.',
      title: 'Propriétaire',
      company: 'Red City Balloons',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-950 grain relative overflow-x-hidden">
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrollY > 50 ? 'glass' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="#" className="text-xl font-bold flex items-center gap-1" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-light-100">AtlasKodo</span>
            <span className="text-emerald-accent">.dev</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#projects" className="text-light-100 hover:text-emerald-accent transition-colors">Réalisations</a>
            <a href="#services" className="text-light-100 hover:text-emerald-accent transition-colors">Services</a>
            <a href="#contact" className="text-light-100 hover:text-emerald-accent transition-colors">Contact</a>
            <a href="#founder" className="text-light-100 hover:text-emerald-accent transition-colors">Fondateur</a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={whatsappBookCallUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block px-6 py-2 bg-emerald-accent text-dark-950 font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-accent/50 transition-all"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Réserver un appel
            </a>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden glass border-t border-emerald-accent/20">
            <div className="px-4 py-4 space-y-4">
              <a href="#projects" className="block text-light-100 hover:text-emerald-accent transition-colors">Réalisations</a>
              <a href="#services" className="block text-light-100 hover:text-emerald-accent transition-colors">Services</a>
              <a href="#contact" className="block text-light-100 hover:text-emerald-accent transition-colors">Contact</a>
              <a href="#founder" className="block text-light-100 hover:text-emerald-accent transition-colors">Fondateur</a>
              <a
                href={whatsappBookCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-2 bg-emerald-accent text-dark-950 font-bold rounded-lg text-center"
              >
                Réserver un appel
              </a>
            </div>
          </div>
        )}
      </nav>

      <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-emerald-accent rounded-full blur-3xl opacity-10" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 fade-up opacity-0 animate-fade-up" style={{ animationDelay: '0s' }}>
          <div className="inline-block glass px-4 py-2 rounded-full">
            <span className="text-emerald-accent">✦ Ouverts à de nouveaux projets</span>
            <span className="text-light-400 ml-2">— Construisons ensemble</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', fontWeight: 700 }}>
            <span className="block animate-fade-up" style={{ animationDelay: '0.1s' }}>Nous ne faisons pas que</span>
            <span className="block animate-fade-up" style={{ animationDelay: '0.2s' }}>coder.</span>
            <span className="block text-gradient animate-fade-up" style={{ animationDelay: '0.3s' }}>Nous architecturons des solutions.</span>
          </h1>

          <p className="text-lg md:text-xl text-light-400 max-w-2xl mx-auto leading-relaxed fade-up" style={{ fontFamily: 'var(--font-body)', animationDelay: '0.4s' }}>
            AtlasKodo.dev est une équipe d'ingénieurs, de chercheurs et de builders. Du MVP aux plateformes de production, chaque ligne de code est pensée avec intention.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 fade-up" style={{ animationDelay: '0.5s' }}>
            <a
              href="#projects"
              className="px-8 py-3 bg-emerald-accent text-dark-950 font-bold rounded-lg hover:glow-emerald-strong transition-all"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Voir nos réalisations
            </a>
            <a
              href={whatsappBookCallUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-emerald-accent text-emerald-accent font-bold rounded-lg hover:bg-emerald-accent/10 transition-all"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Réserver un appel
            </a>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: '#00ff9d' }}>
              ◈ NOS RÉALISATIONS
            </h2>
            <p className="text-light-400 max-w-2xl mx-auto text-lg">Une sélection de projets réels, réalisés dans différents secteurs et stacks techniques.</p>
          </div>

          <div className="relative">
            <div
              ref={projectsScrollRef}
              className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
              style={{ scrollBehavior: 'smooth', scrollbarWidth: 'thin' }}
            >
              {projects.map((project, idx) => (
                <a
                  key={idx}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-lg overflow-hidden border border-emerald-accent/20 hover:border-emerald-accent/50 hover:glow-emerald transition-all group flex-shrink-0 w-full md:w-96 flex flex-col"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                  onMouseEnter={() => setSelectedProject(idx)}
                  onMouseLeave={() => setSelectedProject(null)}
                >
                  <div className="relative h-48 bg-dark-800 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/placeholder.jpg';
                      }}
                    />

                    {selectedProject === idx && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all">
                        <span className="px-6 py-2 bg-emerald-accent text-dark-950 font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-accent/50 flex items-center gap-2">
                          Voir le projet <ExternalLink size={18} />
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="h-1 bg-gradient-to-r from-emerald-accent to-indigo-accent rounded-full mb-4" />
                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>{project.name}</h3>
                    <p className="text-light-400 mb-4 text-sm flex-grow">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tidx) => (
                        <span key={tidx} className="text-xs px-3 py-1 rounded-full border border-emerald-accent/30 text-emerald-accent bg-emerald-accent/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <button
              onClick={() => scrollProjects('left')}
              className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 items-center justify-center w-12 h-12 rounded-full glass border border-emerald-accent/30 hover:border-emerald-accent/70 text-emerald-accent transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scrollProjects('right')}
              className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 items-center justify-center w-12 h-12 rounded-full glass border border-emerald-accent/30 hover:border-emerald-accent/70 text-emerald-accent transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: '#00ff9d' }}>
              ◈ SERVICES
            </h2>
            <p className="text-light-400 max-w-2xl mx-auto text-lg">Des offres claires, orientées résultats, adaptées à votre niveau de croissance.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`relative glass rounded-lg p-8 transition-all group border ${service.popular
                  ? 'border-2 border-emerald-accent glow-emerald-strong'
                  : 'border border-emerald-accent/20 hover:border-emerald-accent/50 hover:glow-emerald'}`}
              >
                {service.badge && (
                  <div className="absolute -top-4 left-6 px-4 py-1 rounded-full text-xs font-bold bg-emerald-accent text-dark-950">
                    {service.badge}
                  </div>
                )}

                <p className="text-sm text-emerald-accent font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                  {service.number}
                </p>

                <h3 className="text-2xl font-bold mb-4 whitespace-pre-line" style={{ fontFamily: 'var(--font-display)' }}>
                  {service.title}
                </h3>

                <p className="text-light-300 text-sm mb-6 leading-relaxed">{service.description}</p>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-3">
                      <Check size={16} className="text-emerald-accent flex-shrink-0" />
                      <span className="text-sm text-light-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-light-400 font-bold tracking-wide mb-6">{service.timeline}</p>

                <a
                  href="#contact"
                  className="block w-full py-2 rounded-lg font-bold text-center transition-all border border-emerald-accent/50 text-emerald-accent hover:bg-emerald-accent/10"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {service.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ fontFamily: 'var(--font-display)', color: '#00ff9d' }}>
            Ce que disent nos clients
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="glass rounded-lg p-8 border border-emerald-accent/20 fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <p className="text-5xl text-emerald-accent mb-4">"</p>
                <p className="text-light-300 mb-6 leading-relaxed">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-accent to-indigo-accent flex items-center justify-center text-dark-950 font-bold">
                    {testimonial.author.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-light-100">{testimonial.author}</p>
                    <p className="text-sm text-light-400">{testimonial.title}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="founder" className="py-20 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in-from-left">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                Achraf Chalkha
              </h2>

              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 rounded-full border border-emerald-accent/30 text-emerald-accent bg-emerald-accent/5">Fondateur</span>
                <span className="text-xs px-3 py-1 rounded-full border border-emerald-accent/30 text-emerald-accent bg-emerald-accent/5">Ingénieur Full-Stack</span>
                <span className="text-xs px-3 py-1 rounded-full border border-indigo-accent/30 text-indigo-accent bg-indigo-accent/5">Assistant de recherche @ Oracle</span>
              </div>

              <p className="text-light-400 leading-relaxed">
                Achraf est ingénieur full-stack chez AtlasKodo. Il a livré des plateformes de niveau production dans plusieurs secteurs — des outils de carrière basés sur l'IA aux plateformes éducatives, systèmes de restauration et dashboards d'entreprise.
              </p>

              <p className="text-light-400 leading-relaxed">
                En parallèle des projets clients, Achraf est assistant de recherche chez Oracle, où il travaille sur des problématiques d'ingénierie logicielle à grande échelle.
              </p>

              <p className="text-light-400 leading-relaxed font-bold">
                Nous ne livrons pas seulement des sites web — nous livrons des solutions réellement conçues.
              </p>

              <div className="flex flex-wrap gap-4 pt-6">
                <a href="mailto:contact@atlaskodo.dev" className="px-6 py-2 rounded-full bg-dark-800 border border-emerald-accent/30 text-emerald-accent hover:border-emerald-accent/70 transition-all flex items-center gap-2">
                  <Mail size={18} /> E-mail
                </a>
                <a href="https://atlaskodo.dev" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full bg-dark-800 border border-emerald-accent/30 text-emerald-accent hover:border-emerald-accent/70 transition-all flex items-center gap-2">
                  <Globe size={18} /> Site web
                </a>
                <a href={whatsappBookCallUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full bg-dark-800 border border-emerald-accent/30 text-emerald-accent hover:border-emerald-accent/70 transition-all flex items-center gap-2">
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>
            </div>

            <div className="relative fade-in-from-right flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md h-96 sm:h-[28rem]">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-accent to-indigo-accent p-1 group">
                  <div className="w-full h-full rounded-3xl bg-dark-900 flex items-center justify-center group-hover:glow-emerald transition-all overflow-hidden">
                    <img
                      src="/images/profil_pic.jpeg"
                      alt="Achraf Chalkha"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/placeholder-user.jpg';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 relative">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Vous avez un projet en tête ?
            </h2>
            <p className="text-light-400">Construisons quelque chose de fort ensemble. Nous répondons sous 24h.</p>
          </div>

          {!formSubmitted ? (
            <form onSubmit={handleFormSubmit} className="glass rounded-lg p-8 space-y-6">
              <div>
                <label className="block text-light-100 text-sm font-medium mb-2">Nom complet</label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg bg-dark-800 border transition-colors ${errors.name ? 'border-red-500' : 'border-emerald-accent/20 hover:border-emerald-accent/50 focus:border-emerald-accent'} text-light-100 outline-none`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-light-100 text-sm font-medium mb-2">Adresse e-mail</label>
                <input
                  type="email"
                  placeholder="vous@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg bg-dark-800 border transition-colors ${errors.email ? 'border-red-500' : 'border-emerald-accent/20 hover:border-emerald-accent/50 focus:border-emerald-accent'} text-light-100 outline-none`}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-light-100 text-sm font-medium mb-2">Parlez-nous de votre projet</label>
                <textarea
                  placeholder="Décrivez votre projet..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg bg-dark-800 border transition-colors resize-none ${errors.message ? 'border-red-500' : 'border-emerald-accent/20 hover:border-emerald-accent/50 focus:border-emerald-accent'} text-light-100 outline-none`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-emerald-accent" required />
                <span className="text-sm text-light-400">J'accepte la Politique de confidentialité</span>
              </label>

              <button
                type="submit"
                disabled={isSending}
                className="w-full px-6 py-3 bg-emerald-accent text-dark-950 font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-accent/50 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <Send size={18} /> {isSending ? 'Envoi…' : 'Envoyer le message'}
              </button>

              {errors.submit && <p className="text-red-400 text-sm text-center">{errors.submit}</p>}
            </form>
          ) : (
            <div className="glass rounded-lg p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-accent/20 flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-emerald-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Message reçu !</h3>
              <p className="text-light-400">Nous revenons vers vous sous 24h.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-emerald-accent/20 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <Link href="#" className="text-xl font-bold flex items-center gap-1 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                <span className="text-light-100">AtlasKodo</span>
                <span className="text-emerald-accent">.dev</span>
              </Link>
              <p className="text-light-400 text-sm">Des solutions digitales solides. Projet par projet.</p>
            </div>

            <div className="flex gap-8">
              <a href="#projects" className="text-light-400 hover:text-emerald-accent transition-colors text-sm">Réalisations</a>
              <a href="#services" className="text-light-400 hover:text-emerald-accent transition-colors text-sm">Services</a>
              <a href="#contact" className="text-light-400 hover:text-emerald-accent transition-colors text-sm">Contact</a>
              <a href="#founder" className="text-light-400 hover:text-emerald-accent transition-colors text-sm">Fondateur</a>
            </div>
          </div>

          <div className="border-t border-emerald-accent/10 pt-8 text-center text-light-400 text-sm">
            <p>© 2026 AtlasKodo.dev — Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      <a
        href={whatsappBookCallUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-accent text-dark-950 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all glow-emerald-strong"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
