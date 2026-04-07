import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Send, Globe, ArrowRight, AlertCircle } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useTheme } from "../context/ThemeContext";
import { citiesData } from "../data/contactLocations";
import api from "../api/axios";

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/**
 * Sub-Component: Contact Hero
 */
const ContactHero = ({ isDark }) => (
  <section className="relative w-full h-[40vh] min-h-[400px] flex items-center overflow-hidden bg-hpe-navy pt-28 sm:pt-32">
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-fixed transition-transform duration-1000 scale-105"
      style={{ backgroundImage: "url('/contact_us2.jpg')" }}
    />
    {/* Overlay - Ensuring text legibility */}
    <div className="absolute inset-0 bg-gradient-to-r from-hpe-navy via-hpe-navy/80 to-transparent"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-hpe-navy/40 via-transparent to-hpe-navy/20"></div>

    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20 animate-fade-in-up">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-[2px] bg-hpe-cyan"></div>
        <span className="text-hpe-cyan font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase">Strategic Connectivity</span>
      </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-4 text-white leading-tight uppercase">
        Let's Start a <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-hpe-cyan via-blue-400 to-blue-600">
          Conversation
        </span>
      </h1>

      <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-8 max-w-xl font-medium opacity-90">
        Connect with our specialized engineering units to build India's next generation of digital infrastructure.
      </p>

    </div>

    {/* Custom Animations */}
    <style dangerouslySetInnerHTML={{
      __html: `
      @keyframes fade-in-up {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    `}} />
  </section>
);

/**
 * Sub-Component: Info Card
 */
const InfoRow = ({ icon: Icon, title, value, isDark, href }) => {
  const Component = href ? "a" : "div";
  return (
    <Component
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`flex items-start gap-4 group cursor-default py-3 border-b border-white/[0.06] last:border-0 hover:no-underline ${href ? "hover:translate-x-1 transition-transform" : ""}`}
    >
      <div className={`mt-0.5 transition-all duration-300 group-hover:scale-110 ${isDark ? 'text-hpe-cyan' : 'text-hpe-navy'
        }`}>
        <Icon
          size={16}
          className="group-hover:animate-pulse"
        />
      </div>
      <div>
        <p className={`text-[9px] font-black uppercase tracking-[0.25em] mb-0.5 ${isDark ? 'text-white/30' : 'text-slate-400'
          }`}>{title}</p>
        <p className={`text-sm font-semibold leading-snug ${isDark ? 'text-white' : 'text-hpe-navy'
          }`}>{value}</p>
      </div>
    </Component>
  );
};

// ── Success Banner shown after form submission ─────────────────────────────────
const SuccessBanner = ({ submissionId, onReset }) => (
  <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
    <div className="w-20 h-20 rounded-full bg-hpe-cyan/10 border-2 border-hpe-cyan/30 flex items-center justify-center mb-8 animate-bounce-once">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-10 h-10 text-hpe-cyan">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">Transmission Received!</h3>
    <p className="text-slate-400 text-sm mb-2 max-w-md leading-relaxed">
      Your inquiry has been logged and will be reviewed by our team shortly.
    </p>
    <p className="text-hpe-cyan text-xs font-black uppercase tracking-widest mb-10">
      Reference ID: {submissionId}
    </p>
    <button
      onClick={onReset}
      className="px-8 py-3 border border-hpe-cyan/30 text-hpe-cyan rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-hpe-cyan/10 transition-all"
    >
      Submit Another Inquiry
    </button>
  </div>
);

// ── Generate unique submission ID ─────────────────────────────────────────────
function generateId() {
  const existing = (() => {
    try {
      const raw = localStorage.getItem("hpe_contact_submissions");
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  })();
  return `SUB-${String(existing.length + 6).padStart(3, "0")}`;
}

// ── Save submission to localStorage ──────────────────────────────────────────
function saveSubmission(data) {
  try {
    const raw = localStorage.getItem("hpe_contact_submissions");
    const existing = raw ? JSON.parse(raw) : [];
    existing.unshift(data);
    localStorage.setItem("hpe_contact_submissions", JSON.stringify(existing));
  } catch { /* ignore storage errors */ }
}

/**
 * Main Contact Component
 */
export default function Contact() {
  const [selectedCity, setSelectedCity] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [error, setError] = useState("");

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAIL_PUBLIC_KEY);
  }, []);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let filteredValue = value;

    if (name === "name") {
      // Only allow letters, spaces, and dots as per pattern [a-zA-Z .]
      filteredValue = value.replace(/[^a-zA-Z .]/g, "");
    } else if (name === "phone") {
      // Only allow digits, max 10 chars, and must start with 6-9 as per pattern [6-9][0-9]{9}
      const digits = value.replace(/\D/g, "");
      if (digits.length > 0) {
        if (/[6-9]/.test(digits[0])) {
          filteredValue = digits.slice(0, 10);
        } else {
          // Ignore invalid start digit and keep previous value
          filteredValue = form[name] || "";
        }
      } else {
        filteredValue = "";
      }
    } else if (name === "email") {
      // Basic filtering for email-safe characters as per standard patterns
      filteredValue = value.replace(/[^a-zA-Z0-9._%+\-@]/g, "");
    }

    setForm((prev) => ({ ...prev, [name]: filteredValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.subject || !form.message) return;

    setSubmitting(true);
    setError("");

    // Build the emailjs payload once so it can be reused
    const emailPayload = {
      to_email: form.email,
      to_name: form.name,
      subject: "HPE IT SOLUTIONS | Response to Your Inquiry",
      message: `Hello ${form.name},

Thank you for reaching out to HPE IT Solutions.
Our team has reviewed your message and provided the response below:

Thank you for your inquiry regarding ${form.subject}.
Our enterprise team will share the detailed execution plan shortly.

If you require further information, please reply to this email.

Best Regards,
HPE IT Solutions Team`,
    };

    // Fire both requests in parallel — EmailJS is fast; the Render backend
    // may be slow due to cold-starts, so we don't wait for it to unblock the UI.
    const [emailResult, backendResult] = await Promise.allSettled([
      emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        emailPayload
      ),
      api.post("/api/contact/save", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        category: form.subject,
        description: form.message,
      }),
    ]);

    // Log backend result for diagnostics without blocking the user
    if (backendResult.status === "rejected") {
      const backendErr = backendResult.reason;
      // If backend explicitly rejected with a 409 (duplicate), surface that error
      if (backendErr?.response?.status === 409) {
        setError(backendErr.response.data?.error || "Email or Phone Number already exists. Please use another one.");
        setSubmitting(false);
        return;
      }
      console.warn("Backend save failed (non-blocking):", backendErr?.message);
    }

    // The submission is considered successful as long as the email was sent
    if (emailResult.status === "fulfilled") {
      setSubmissionId(generateId());
      setSubmitted(true);
    } else {
      console.error("EmailJS error:", emailResult.reason);
      setError("Failed to send transmission. Please try again.");
    }

    setSubmitting(false);
  };

  const handleReset = () => {
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setSubmitted(false);
    setSubmissionId("");
    setError("");
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 overflow-hidden ${isDark ? 'bg-hpe-navy text-slate-300' : 'bg-slate-50 text-slate-700'}`}>
      <ContactHero isDark={isDark} />

      {/* Main Content Grid */}
      <section id="contact-grid" className="py-10 md:py-16 px-6 md:px-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">

            {/* Left Column: Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="mb-8">
                <h2 className={`text-lg sm:text-xl font-semibold mb-3 uppercase tracking-tight leading-none ${isDark ? 'text-white' : 'text-hpe-navy'}`}>
                  GLOBAL <span className="text-hpe-cyan">COMMUNICATIONS</span>
                </h2>
                <div className="w-12 h-0.5 bg-hpe-cyan mb-5 rounded-full"></div>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} text-sm leading-relaxed`}>
                  Connect with our specialized engineering and support units for bespoke digital infrastructure strategies.
                </p>
              </div>

              <div className="space-y-0">
                <InfoRow
                  icon={Mail}
                  title="Strategic Email"
                  value="support@hpeitsolutions.com"
                  isDark={isDark}
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=support@hpeitsolutions.com"
                />
                <InfoRow
                  icon={Phone}
                  title="Direct Hotline"
                  value="+62 821-3423-5909"
                  isDark={isDark}
                  href="tel:+6282134235909"
                />
                <InfoRow icon={MapPin} title="Corporate Hub" value="Hyderabad, Telangana, India" isDark={isDark} />
                <InfoRow icon={Globe} title="Regional Support" value="Pan-India Operational Matrix" isDark={isDark} />
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7">
              <div className={`p-5 sm:p-7 rounded-2xl shadow-xl relative overflow-hidden group transition-all duration-500
                ${isDark
                  ? 'bg-hpe-navy-light/40 border border-white/5'
                  : 'bg-white border border-slate-200 shadow-slate-200/60'}`}>
                {/* Decorative background element */}
                <div className={`absolute -top-20 -right-24 w-64 h-64 rounded-full blur-[80px] ${isDark ? 'bg-hpe-cyan/5' : 'bg-hpe-cyan/10'}`} />

                {submitted ? (
                  <SuccessBanner submissionId={submissionId} onReset={handleReset} />
                ) : (
                  <>
                    <div className="mb-8 relative z-10">
                      <h3 className={`text-2xl font-black mb-2 uppercase tracking-tight ${isDark ? 'text-white' : 'text-hpe-navy'}`}>Initiate Inquiry</h3>
                      <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'} text-sm font-medium tracking-wide`}>Enter your transmission details below.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 relative z-10">
                      <div className="space-y-3">
                        <label className={`text-xs font-black uppercase tracking-[0.1em] ml-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          pattern="(?=.*[a-zA-Z]{3,})[a-zA-Z .]+"
                          required
                          className={`w-full p-4 rounded-xl border transition-all font-semibold focus:outline-none focus:ring-1 focus:ring-hpe-cyan/30
                            ${isDark
                              ? 'bg-hpe-navy/50 border-white/10 text-white placeholder:text-slate-700 focus:border-hpe-cyan focus:bg-hpe-navy/80'
                              : 'bg-slate-50 border-slate-200 text-hpe-navy placeholder:text-slate-400 focus:border-hpe-cyan focus:bg-white'}`}
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className={`text-xs font-black uppercase tracking-[0.1em] ml-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Corporate Email</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)\.[a-zA-Z]{2,}$"
                          required
                          className={`w-full p-4 rounded-xl border transition-all font-semibold focus:outline-none focus:ring-1 focus:ring-hpe-cyan/30
                            ${isDark
                              ? 'bg-hpe-navy/50 border-white/10 text-white placeholder:text-slate-700 focus:border-hpe-cyan focus:bg-hpe-navy/80'
                              : 'bg-slate-50 border-slate-200 text-hpe-navy placeholder:text-slate-400 focus:border-hpe-cyan focus:bg-white'}`}
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className={`text-xs font-black uppercase tracking-[0.1em] ml-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          pattern="[6-9][0-9]{9}"
                          required
                          className={`w-full p-4 rounded-xl border transition-all font-semibold focus:outline-none focus:ring-1 focus:ring-hpe-cyan/30
                            ${isDark
                              ? 'bg-hpe-navy/50 border-white/10 text-white placeholder:text-slate-700 focus:border-hpe-cyan focus:bg-hpe-navy/80'
                              : 'bg-slate-50 border-slate-200 text-hpe-navy placeholder:text-slate-400 focus:border-hpe-cyan focus:bg-white'}`}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className={`text-xs font-black uppercase tracking-[0.1em] ml-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Transmission Subject</label>
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          required
                          className={`w-full p-4 rounded-xl border transition-all font-semibold focus:outline-none focus:ring-1 focus:ring-hpe-cyan/30 appearance-none
                            ${isDark
                              ? 'bg-hpe-navy/50 border-white/10 text-white focus:border-hpe-cyan focus:bg-hpe-navy/80'
                              : 'bg-slate-50 border-slate-200 text-hpe-navy focus:border-hpe-cyan focus:bg-white'}`}
                        >
                          <option value="" disabled className={isDark ? "bg-hpe-navy text-slate-500" : "bg-white text-slate-400"}>Select Service Category</option>
                          <option value="Enterprise IT Solutions" className={isDark ? "bg-hpe-navy text-white" : "bg-white text-hpe-navy"}>Enterprise IT Solutions</option>
                          <option value="Infrastructure & Brick Services" className={isDark ? "bg-hpe-navy text-white" : "bg-white text-hpe-navy"}>Infrastructure & Brick Services</option>
                          <option value="Workforce & Managed Services" className={isDark ? "bg-hpe-navy text-white" : "bg-white text-hpe-navy"}>Workforce & Managed Services</option>
                          <option value="Other Queries" className={isDark ? "bg-hpe-navy text-white" : "bg-white text-hpe-navy"}>Other Queries</option>
                        </select>
                      </div>
                      <div className="md:col-span-2 space-y-3">
                        <label className={`text-xs font-black uppercase tracking-[0.1em] ml-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Message Detail</label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          rows="5"
                          className={`w-full p-4 rounded-xl border transition-all font-semibold resize-none focus:outline-none focus:ring-1 focus:ring-hpe-cyan/30
                            ${isDark
                              ? 'bg-hpe-navy/50 border-white/10 text-white placeholder:text-slate-700 focus:border-hpe-cyan focus:bg-hpe-navy/80'
                              : 'bg-slate-50 border-slate-200 text-hpe-navy placeholder:text-slate-400 focus:border-hpe-cyan focus:bg-white'}`}
                          placeholder="Outline your technical requirements here..."
                        ></textarea>
                      </div>

                      {error && (
                        <div className="md:col-span-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2">
                          <AlertCircle size={14} /> {error}
                        </div>
                      )}

                      <div className="md:col-span-2 pt-4">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="group w-full py-5 bg-hpe-cyan text-hpe-navy rounded-xl font-black uppercase tracking-[0.2em] transition-all duration-500 hover:shadow-[0_20px_50px_-10px_rgba(0,229,255,0.4)] hover:-translate-y-1 flex items-center justify-center gap-4 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                          {submitting ? (
                            <>Processing… <span className="w-5 h-5 border-2 border-hpe-navy/40 border-t-hpe-navy rounded-full animate-spin" /></>
                          ) : (
                            <>Process Submission <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" /></>
                          )}
                        </button>
                        <p className="text-center mt-6 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Secure AES-256 Encrypted Protocol</p>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Operational Presence Map */}
      <section className={`pt-12 pb-12 border-t ${isDark ? 'bg-hpe-navy-light/30 border-white/5' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
            <div className="max-w-xl">
              <h2 className={`text-xl sm:text-2xl font-black mb-3 uppercase ${isDark ? 'text-white' : 'text-hpe-navy'}`}>
                Regional <span className="text-hpe-cyan">Hubs</span>
              </h2>
              <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                Strategic operational units across the subcontinent, ensuring localized support and
                resilient service delivery for enterprise clients.
              </p>
            </div>

            {/* City Selectors */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(citiesData).map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-6 py-3 rounded-xl border font-bold text-[10px] uppercase tracking-wider transition-all duration-300
                  ${selectedCity === city
                      ? "bg-hpe-cyan border-hpe-cyan text-hpe-navy shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                      : isDark
                        ? "bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:border-hpe-cyan/50 hover:text-hpe-navy shadow-sm"
                    }
                `}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="max-w-6xl mx-auto px-6 mt-4">
          <div className="w-full h-[300px] sm:h-[380px] rounded-2xl overflow-hidden border border-white/10 relative">
            <MapContainer
              key={selectedCity ? selectedCity : "india"}
              center={selectedCity ? citiesData[selectedCity].center : [22, 80]}
              zoom={selectedCity ? citiesData[selectedCity].zoom : 5}
              scrollWheelZoom={false}
              attributionControl={false}
              className="h-full w-full grayscale brightness-[0.85]"
            >
              <TileLayer
                attribution="&copy; CARTO"
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />

              {Object.entries(citiesData).map(([city, data]) => {
                const branch = data.branches[0];
                const markerPos = branch ? branch.position : data.center;
                const redPinIcon = L.divIcon({
                  className: 'custom-div-icon',
                  html: `<div style="
                    width: 24px; height: 32px; position: relative; cursor: pointer;
                  ">
                    <div style="
                      width: 24px; height: 24px; background-color: #ef4444;
                      border-radius: 50% 50% 50% 0; transform: rotate(-45deg);
                      border: 3px solid #fff;
                      box-shadow: 0 0 12px rgba(239,68,68,0.8), 0 2px 8px rgba(0,0,0,0.4);
                    "></div>
                    <div style="
                      width: 6px; height: 6px; background: white; border-radius: 50%;
                      position: absolute; top: 9px; left: 9px; transform: rotate(45deg);
                    "></div>
                  </div>`,
                  iconSize: [24, 32],
                  iconAnchor: [12, 32]
                });
                return (
                  <Marker
                    key={city}
                    position={markerPos}
                    icon={redPinIcon}
                    eventHandlers={{ click: () => setSelectedCity(city) }}
                  />
                );
              })}
            </MapContainer>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .leaflet-popup-content-wrapper { border-radius: 16px !important; padding: 0 !important; overflow: hidden; }
        .leaflet-popup-content { margin: 0 !important; }
        .leaflet-container { background: #0a0e1a !important; }
        .hpe-dark-popup .leaflet-popup-tip { display: none; }
        @keyframes bounce-once {
          0%, 100% { transform: translateY(0); }
          30% { transform: translateY(-12px); }
          60% { transform: translateY(-4px); }
        }
        .animate-bounce-once { animation: bounce-once 0.7s ease-out; }
      `}} />
    </div >
  );
}
