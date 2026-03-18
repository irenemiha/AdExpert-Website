import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Users, 
  Wrench, 
  Scale, 
  MonitorCheck, 
  MessageSquare, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import emailjs from '@emailjs/browser';
import logo from '../assets/logo.png';

// --- Data ---

const POSTS = [
  {
    id: 1,
    title: 'Cum se calculează corect cota de întreținere?',
    date: '15 Ianuarie 2026',
    category: 'Ghid Practic',
    excerpt: 'Află care sunt elementele care compun factura lunară și cum se împart cheltuielile comune între locatari conform suprafeței utile și numărului de persoane.',
    content: `
      Calculul cotei de întreținere este adesea un subiect de dezbatere în cadrul asociațiilor de proprietari. Conform Legii 196/2018, cheltuielile se împart în mai multe categorii principale:
      
      1. Cheltuieli pe număr de persoane: Aici intră consumul de apă (dacă nu există apometre), energia electrică pentru lift și iluminatul spațiilor comune, serviciile de salubritate.
      2. Cheltuieli pe cota-parte indiviză (suprafață utilă): Aici includem fondul de reparații, salariile personalului administrativ (administrator, cenzor, președinte), serviciile de curățenie și mentenanța tehnică.
      3. Cheltuieli pe consumuri individuale: Gazul, apa și căldura, atunci când sunt contorizate separat per apartament.
      
      AdExpert asigură transparență totală în acest proces prin utilizarea platformei e-Bloc, unde fiecare proprietar poate vedea exact cum a fost calculată suma sa lunară, eliminând orice suspiciune de eroare.
    `
  },
  {
    id: 2,
    title: 'Obligațiile administratorului conform Legii 196/2018',
    date: '2 Februarie 2026',
    category: 'Legislație',
    excerpt: 'Tot ce trebuie să știi despre noul cadru legislativ care reglementează asociațiile de proprietari și responsabilitățile clare ale comitetului executiv.',
    content: `
      Noua legislație a adus clarificări necesare în administrarea imobilelor din România. Administratorul nu mai este doar o persoană care încasează bani, ci un manager de imobil certificat.
      
      Principalele responsabilități includ:
      - Gestionarea transparentă a fondurilor asociației.
      - Mentenanța preventivă și corectivă a clădirii.
      - Reprezentarea asociației în relația cu furnizorii de utilități.
      - Asigurarea respectării normelor de siguranță la incendiu.
      
      La AdExpert, echipa noastră juridică monitorizează constant actualizările legislative pentru a ne asigura că asociațiile partenere sunt mereu în deplină legalitate, evitând amenzile care pot fi extrem de costisitoare.
    `
  },
  {
    id: 3,
    title: 'Importanța mentenanței preventive a instalațiilor',
    date: '20 Decembrie 2025',
    category: 'Mentenanță',
    excerpt: 'De ce este mai ieftin să previi decât să repari? Cum planifică AdExpert reviziile tehnice pentru a evita avariile majore.',
    content: `
      O țeavă spartă în toiul nopții nu este doar un stres, ci și o cheltuială imensă neprevăzută. Mentenanța preventivă este pilonul central al serviciilor AdExpert.
      
      Prin verificări periodice ale subsolurilor, coloanelor de apă și instalațiilor electrice, identificăm punctele critice înainte ca acestea să devină urgențe. Un plan de mentenanță bine pus la punct poate prelungi viața echipamentelor comune cu până la 50% și reduce costurile de reparații capitale pe termen lung.
    `
  }
];

// --- Components ---

const EBlocBadge = () => (
  <div className="bg-[#f0f9ff] border-y border-blue-100 py-4">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
      <MonitorCheck className="text-[#0a6494]" size={24} />
      <p className="text-[#0a6494] font-medium">
        Utilizăm software-ul de ultimă generație <span className="font-bold underline">e-Bloc</span> pentru o transparență financiară totală și acces instant la date.
      </p>
    </div>
  </div>
);

const Hero = ({ onNavigate }: { onNavigate: (id: string) => void }) => (
  <section id="acasa" className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1758448617677-2f8bebc56d9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXNpZGVudGlhbCUyMGNvbXBsZXglMjBhcmNoaXRlY3R1cmUlMjBsdXh1cnklMjBhcGFydG1lbnR8ZW58MXx8fHwxNzcwMTM1OTM2fDA&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Complex Rezidential Modern"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gray-900/60" />
    </div>

    <div className="relative z-10 max-w-6xl mx-auto px-8 sm:px-4 lg:px-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Administrare Profesională pentru <span style={{ color: '#e8b304' }}>Liniștea Casei Tale.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed">
          Servicii complete de administrare imobile, înființări asociații și gestiune cartiere rezidențiale în orașul tău. Transparență, eficiență și profesionalism.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="px-8 py-4 rounded-xl text-white font-bold text-lg text-center transition-transform hover:scale-105"
            style={{ backgroundColor: '#e8b304' }}
            onClick={() => onNavigate('contact')}
          >
            Solicită o Ofertă
          </button>
          <button
            className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold text-lg text-center transition-all hover:bg-white/20"
            onClick={() => onNavigate('servicii')}
          >
            Vezi Serviciile
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const Services = ({ onNavigate }: { onNavigate: (id: string) => void }) => {
  const services = [
    {
      title: 'Administrare Imobile',
      desc: 'Gestionăm asociațiile de proprietari cu accent pe transparență financiară și mentenanță tehnică riguroasă.',
      icon: <Building2 className="w-10 h-10 mb-4" style={{ color: '#e8b304' }} />,
    },
    {
      title: 'Înființare Asociații',
      desc: 'Consultanță juridică și administrativă completă pentru constituirea legală a noilor asociații de proprietari.',
      icon: <Scale className="w-10 h-10 mb-4" style={{ color: '#e8b304' }} />,
    },
    {
      title: 'Cartiere Rezidențiale',
      desc: 'Soluții premium de management pentru complexe mari: pază, peisagistică, curățenie și mentenanță generală.',
      icon: <Users className="w-10 h-10 mb-4" style={{ color: '#e8b304' }} />,
    },
  ];

  return (
    <section id="servicii" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-8 sm:px-4 lg:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0a6494' }}>Servicii Profesionale</h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: '#e8b304' }} />
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            Oferim soluții integrate care acoperă toate aspectele gestionării unui imobil modern.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="p-8 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {service.icon}
              <h3 className="text-xl font-bold mb-4 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.desc}
              </p>
              <button 
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center mt-6 font-semibold text-[#0a6494] hover:underline"
              >
                Află mai multe <ChevronRight size={18} className="ml-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  const points = [
    {
      title: 'Transparență Totală',
      desc: 'Acces la platformă online pentru verificarea cheltuielilor și plata întreținerii în timp real.',
      icon: <ShieldCheck size={40} />,
    },
    {
      title: 'Echipă de Intervenție',
      desc: 'Parteneri verificați și echipe proprii gata să intervină pentru orice defecțiune tehnică 24/7.',
      icon: <Wrench size={40} />,
    },
    {
      title: 'Expertiză Juridică',
      desc: 'Cunoaștem legislația (Legea 196/2018) la perfecție, protejând interesele comunității tale.',
      icon: <Scale size={40} />,
    },
  ];

  return (
    <section id="de-ce-noi" className="py-12 bg-[#0a6494] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">De ce să alegi <span style={{ color: '#e8b304' }}>AdExpert</span>?</h2>
            <p className="text-blue-100 text-lg mb-10">
              Suntem lideri în domeniu datorită modului în care îmbinăm tehnologia modernă cu expertiza umană și atenția la detalii.
            </p>
            <div className="space-y-8">
              {points.map((point, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6"
                >
                  <div className="shrink-0 p-3 rounded-xl bg-white/10 flex items-center justify-center w-16 h-16">
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{point.title}</h4>
                    <p className="text-blue-100">{point.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl rotate-2">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1762087021974-b0729f37a8fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidWlsZGluZyUyMG1haW50ZW5hbmNlJTIwc2VydmljZXMlMjBtYW5hZ2VtZW50fGVufDF8fHx8MTc3MDEzNTkzNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Expertiză tehnică"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-2xl shadow-xl hidden md:block">
              <p className="text-[#0a6494] font-bold text-4xl mb-1">30+</p>
              <p className="text-gray-600 font-medium">Asociații Administrate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    {
      title: "Primul Contact",
      desc: "Ne transmiți nevoile tale, iar noi stabilim o consultanță gratuită pentru a ne cunoaște."
    },
    {
      title: "Audit & Evaluare",
      desc: "Analizăm situația tehnică și financiară a imobilului pentru a identifica punctele de optimizare."
    },
    {
      title: "Ofertă Personalizată",
      desc: "Elaborăm o propunere transparentă, adaptată nevoilor asociației tale, fără costuri ascunse."
    },
    {
      title: "Implementare",
      desc: "Preluăm administrarea și integrăm imobilul în platforma digitală pentru acces instant la date."
    }
  ];

  return (
    <section id="proces" className="py-20 bg-gray-50 dark:bg-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Procesul de Lucru</h2>
          <p className="text-gray-600 mb-8 dark:text-slate-400">Simplitate și eficiență în 4 pași simpli pentru liniștea asociației tale</p>
        </div>
        
        <div className="relative"> 
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative mb-8 z-10 flex flex-col items-center text-center group">
                {/* Cercul cu numărul pasului */}
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 border-4 border-white dark:border-slate-800 shadow-md transition-transform group-hover:scale-110"
                  style={{ backgroundColor: '#0a6494' }}
                >
                  {index + 1}
                </div>
                
                {/* Container pentru text cu margine de sus (mt-2.5 corespunde la 10px) pentru distanțare față de axa liniei */}
                <div className="mt-[10px]">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 text-m leading-relaxed px-4">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section id="testimoniale" className="py-12 bg-white">
    <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Ce spun partenerii noștri</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: 'Ion Popescu', role: 'Președinte Asociație', text: 'AdExpert a transformat modul în care funcționează blocul nostru. Transparența financiară este impecabilă.' },
          { name: 'Elena Ionescu', role: 'Locatar Ansamblul Sky', text: 'Foarte mulțumită de timpul de răspuns al echipei de intervenție. Problemele tehnice se rezolvă rapid.' },
          { name: 'Andrei Radu', role: 'Manager Proiect', text: 'Colaborăm de 3 ani pentru administrarea cartierului nostru. Servicii de mentenanță la superlativ.' }
        ].map((rev, idx) => (
          <div key={idx} className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm italic text-gray-700">
            <div className="mb-4 flex text-yellow-400">
              {[...Array(5)].map((_, i) => <CheckCircle2 key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="mb-6">"{rev.text}"</p>
            <p className="font-bold text-gray-900 not-italic">{rev.name}</p>
            <p className="text-sm text-gray-500 not-italic">{rev.role}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    service: 'administrare', 
    message: '' 
  });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Parametrii trebuie să se potrivească cu {{variabilele}} din template-ul EmailJS
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      selected_service: formData.service,
      message: formData.message,
    };

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
       alert('Mesajul a fost trimis! Veți fi contactat în cel mai scurt timp.');
       setFormData({ name: '', email: '', phone: '', service: 'administrare', message: '' });
    })
    .catch((err) => {
       console.error('FAILED...', err);
       alert('A apărut o eroare la trimitere. Vă rugăm să ne contactați telefonic.');
    })
    .finally(() => {
      setIsSending(false);
    });
  };

  return (
    <section id="contact" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-8 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Ești gata să scapi de griji?</h2>
            <p className="text-gray-600 text-lg mb-10">
              Completează formularul și un expert din echipa noastră te va contacta pentru a discuta detaliile proiectului tău.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50 text-[#0a6494]">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Telefon</p>
                  <p className="text-lg font-bold text-gray-900">+40 721 578 799</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50 text-[#0a6494]">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Email</p>
                  <p className="text-lg font-bold text-gray-900">adexpert2020@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center bg-blue-50 text-[#0a6494]">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Sediu</p>
                  <p className="text-lg font-bold text-gray-900">Str. Constantin Marinescu, nr. 12, București, România</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <MonitorCheck size={16} className="text-[#0a6494]" /> 
                Oferim asistență tehnică 24/7 pentru clienții actuali prin platforma e-Bloc.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Nume Complet *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0a6494] outline-none transition-all"
                    placeholder="Ion Popescu"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Telefon *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0a6494] outline-none transition-all"
                    placeholder="07xx xxx xxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0a6494] outline-none transition-all"
                  placeholder="contact@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Serviciul Dorit *</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0a6494] outline-none transition-all appearance-none bg-white"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="administrare">Administrare Imobile</option>
                  <option value="infiintare">Înființare Asociație</option>
                  <option value="cartier">Gestiune Cartier Rezidențial</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Mesaj</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0a6494] outline-none transition-all resize-none"
                  placeholder="Cum vă putem ajuta?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-xl text-white font-bold text-lg transition-transform hover:scale-[1.02] shadow-lg"
                style={{ backgroundColor: '#e8b304' }}
              >
                Solicită Ofertă Gratuită
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate, onGoToBlog }: { onNavigate: (id: string) => void, onGoToBlog: () => void }) => (
  <footer className="bg-gray-900 text-white py-20">
    <div className="max-w-6xl mx-auto px-8 mb-10 sm:px-4 lg:px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
        <div className="shrink-0">
          <img 
            src={logo} 
            alt="AdExpert Logo" 
            className="h-12 w-12 md:h-16 md:w-16 object-contain" 
          />
        </div>
        <span className="text-3xl font-bold mb-8 block">
          Ad<span style={{ color: '#e8b304' }}>Expert</span>
        </span>
        <p className="text-gray-400 text-m">Expertiză în administrarea imobilelor și managementul comunităților rezidențiale.</p>
      </div>
      {/* Link-uri Navigare */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h4 className="text-xl font-bold border-b border-white/10 mb-8">Navigare</h4>
        <ul className="space-y-2 font-medium">
          <li>
            <button onClick={() => onNavigate('acasa')} className="text-gray-400 hover:text-[#e8b304] transition-colors text-m text-left">
              Acasă
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('servicii')} className="text-gray-400 hover:text-[#e8b304] transition-colors text-m text-left">
              Servicii
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('de-ce-noi')} className="text-gray-400 hover:text-[#e8b304] transition-colors text-m text-left">
              De ce noi?
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('proces')} className="text-gray-400 hover:text-[#e8b304] transition-colors text-m text-left">
              Proces
            </button>
          </li>
          <li>
            <button onClick={onGoToBlog} className="text-gray-400 hover:text-[#e8b304] transition-colors text-m text-left">
              Blog
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('contact')} className="text-gray-400 hover:text-[#e8b304] transition-colors text-m text-left">
              Contact
            </button>
          </li>
        </ul>
      </div>
      {/* Info & Contact */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h4 className="text-xl font-bold mb-8">Contact</h4>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm"><Phone size={18} className="text-[#e8b304]" /> +40 721 578 799</div>
          <div className="flex items-center gap-3 text-sm"><Mail size={18} className="text-[#e8b304]" /> adexpert2020@gmail.com</div>
          <div className="flex items-center gap-3 text-sm"><MapPin size={18} className="text-[#e8b304]" /> București, România</div>
        </div>
      </div>
      {/* Legal Links */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h4 className="text-xl font-bold mb-8">Legal</h4>
        <div className="flex flex-col gap-3">
          <a href="https://anpc.ro/" target="_blank" className="text-sm font-bold bg-white/10 px-8 py-3 rounded-lg text-center">ANPC</a>
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" className="text-sm font-bold bg-white/10 px-8 py-3 rounded-lg text-center">SOL</a>
        </div>
      </div>
    </div>
    {/* Copyright Section */}
    <div className="max-w-6xl mx-auto px-8 sm:px-4 lg:px-6 border-t border-white mt-12 pt-8 text-center text-gray-400 text-sm">
      <p>© {new Date().getFullYear()} AdExpert Administrare Imobile. Toate drepturile rezervate.</p>
    </div>
  </footer>
);

export default function App() {
  const [view, setView] = useState<'home' | 'blog' | 'post'>('home');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWidth(currentWidth);
      
      // Auto-închidere meniu dacă utilizatorul lărgește fereastra peste 768px
      if (currentWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToBlog = () => {
    setIsMenuOpen(false);
    setView('blog');
    window.scrollTo(0, 0);
  };

  // --- Funcție pentru Scroll lin către secțiune ---
  const scrollToSection = (id: string) => {
    setIsMenuOpen(false); // Inchide meniul burger cand se face click
    
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleOpenPost = (post: any) => {
    setSelectedPost(post);
    setView('post');
    window.scrollTo(0, 0);
  };

  const menuItems = [
    { label: 'Acasă', id: 'acasa' },
    { label: 'Servicii', id: 'servicii' },
    { label: 'De ce noi?', id: 'de-ce-noi' },
    { label: 'Proces', id: 'proces' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ];

  const SinglePost = ({ post }: { post: any }) => (
    <div className="pt-28 pb-12 bg-white min-h-screen px-4">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => setView('blog')} className="flex items-center text-[#0a6494] font-bold mb-8 hover:underline">
          <ChevronRight size={20} className="rotate-180 mr-2" /> Înapoi la Blog
        </button>
        <span className="text-xs font-bold uppercase tracking-widest text-[#e8b304] bg-yellow-50 px-3 py-1 rounded-full">{post.category}</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 mb-4 leading-tight">{post.title}</h1>
        <p className="text-gray-500 mb-10 flex items-center gap-2"><FileText size={18} /> Publicat la {post.date}</p>
        <div className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
          {post.content}
        </div>
        <div className="mt-16 p-8 bg-gray-50 rounded-3xl border border-gray-100">
          <h3 className="text-xl font-bold mb-4">Ai întrebări despre acest subiect?</h3>
          <p className="mb-6">Echipa noastră de experți este gata să îți ofere consultanță personalizată.</p>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="px-6 py-3 rounded-xl text-white font-bold" 
            style={{ backgroundColor: '#0a6494' }}
          >
            Contactează-ne acum
          </button>
        </div>
      </div>
    </div>
  );

  const BlogArchive = () => (
    <div className="pt-28 pb-12 bg-gray-50 min-h-screen px-4">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => { setView('home'); window.scrollTo(0,0); }} className="flex items-center text-[#0a6494] font-bold mb-8 hover:underline">
          <ChevronRight size={20} className="rotate-180 mr-2" /> Înapoi la Acasă
        </button>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Blog AdExpert</h1>
        <p className="text-gray-600">Sfaturi și noutăți pentru o administrare eficientă.</p>
        <div className="space-y-12 mt-12">
          {POSTS.map((post) => (
            <div key={post.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <span className="text-xs font-bold text-[#e8b304] uppercase">{post.category}</span>
              <h2 className="text-2xl font-bold mt-2 mb-4">{post.title}</h2>
              <p className="text-gray-600 mb-6">{post.excerpt}</p>
              <button onClick={() => handleOpenPost(post)} className="text-[#0a6494] font-bold flex items-center">Citește articolul <ChevronRight size={18} className="ml-1" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#0a6494]/20 selection:text-[#0a6494]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-4 lg:px-6 h-20 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="flex items-center justify-center">
              <img 
                src={logo} 
                alt="AdExpert Logo" 
                className="h-12 w-12 md:h-16 md:w-16 object-contain transition-transform group-hover:scale-105" 
              />
            </div>
            <span className="text-3xl md:text-3xl font-bold tracking-tighter leading-none flex items-center" style={{ color: '#0a6494' }}>
              Ad<span style={{ color: '#e8b304' }}>Expert</span>
            </span>
          </div>

          {/* Desktop Menu - Hidden on mobile/tablet */}
          <div className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => {
                  if (item.id === 'blog') { setView('blog'); window.scrollTo(0,0); }
                  else { scrollToSection(item.id); }
                }} 
                className="text-gray-600 font-medium hover:text-[#0a6494] cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            {/* Butonul Cere Ofertă */}
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3 rounded-lg text-white font-bold text-sm shadow-md transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#e8b304' }}
            >
              Cere Ofertă
            </button>
          </div>

          {/* Burger Button - Visible ONLY on mobile/tablet */}
          <button 
            style={{ display: width < 768 ? 'flex' : 'none' }}
            className="p-2 text-gray-600 focus:outline-none items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown - Animates in */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-4 space-y-4 shadow-xl">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'blog') { setView('blog'); setIsMenuOpen(false); window.scrollTo(0,0); }
                      else { scrollToSection(item.id); }
                    }}
                    className="text-left py-3 px-4 text-gray-700 font-semibold hover:bg-gray-50 rounded-xl"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {view === 'home' && (
          <>
            <Hero onNavigate={scrollToSection} />
            <EBlocBadge />
            <Services onNavigate={scrollToSection} />
            <WhyUs />
            <Process />
            <Testimonials />
            <section id="blog-preview" className="py-12 bg-gray-50 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                  <h2 className="text-3xl font-bold">Blog / Noutăți</h2>
                  <button onClick={() => { setView('blog'); window.scrollTo(0,0); }} className="text-[#0a6494] font-bold flex items-center text-sm md:text-base">Toate articolele <ArrowRight size={20} className="ml-2" /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {POSTS.slice(0, 2).map((post) => (
                    <div key={post.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-[#e8b304] font-bold text-sm">{post.date}</p>
                      <h3 className="text-2xl font-bold mt-2 mb-4">{post.title}</h3>
                      <p className="text-gray-600 mb-6">{post.excerpt}</p>
                      <button onClick={() => handleOpenPost(post)} className="text-[#0a6494] font-bold flex items-center">Citește mai mult <ChevronRight size={18} className="ml-1" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <Contact />
          </>
        )}
        {view === 'blog' && <BlogArchive />}
        {view === 'post' && selectedPost && <SinglePost post={selectedPost} />}
      </main>
      <Footer onNavigate={scrollToSection} onGoToBlog={goToBlog}/>
    </div>
  );
}