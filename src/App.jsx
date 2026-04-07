import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToHash from './components/ScrollToHash';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import VisionMission from './pages/VisionMission';
import Strength from './pages/Strength';
import CorporateStructure from './pages/CorporateStructure';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectsGroup1 from './pages/ProjectsGroup1';
import ProjectsGroup2 from './pages/ProjectsGroup2';
import ProjectsGroup3 from './pages/ProjectsGroup3';
import MajorProjects from './pages/MajorProjects';
import MidProjects from './pages/MidProjects';
import LargeProjects from './pages/LargeProjects';
import CertificationsPage from './pages/CertificationsPage';
import EnterpriseServicesPage from './pages/EnterpriseServicesPage';
import InfrastructureBrickServicesPage from './pages/InfrastructureBrickServicesPage';
import WorkforceManagedServicesPage from './pages/WorkforceManagedServicesPage';
import Contact from './pages/Contact';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import AdminLogin from './AdminDashboard/AdminLogin';
import AdminRoute from './AdminDashboard/AdminRoute';
import GrowthStrategy from './pages/GrowthStrategy';
import Preloader from './components/common/Preloader';
import ScrollIndicator from './components/common/ScrollIndicator';

function AppContent() {
  const location = useLocation();
  const [isPreloading, setIsPreloading] = useState(true);

  // ── SEO Metadata Management ────────────────────────────────────────────────
  React.useEffect(() => {
    const titleMap = {
      '/': 'HPE IT Solutions | Enterprise Infrastructure & Digital Ecosystems',
      '/about': 'About Us | HPE IT Solutions',
      '/vision-mission': 'Our Vision & Mission | HPE IT Solutions',
      '/strength': 'Organizational Strength | HPE IT Solutions',
      '/corporate-structure': 'Corporate Structure & Governance | HPE IT Solutions',
      '/services': 'Enterprise IT & Infrastructure Services | HPE IT Solutions',
      '/services/enterprise': 'Enterprise IT Services & Digital Transformation | HPE IT Solutions',
      '/services/infrastructure': 'Infrastructure & Brick Services | HPE IT Solutions',
      '/services/workforce': 'Workforce & Managed Services Deployment | HPE IT Solutions',
      '/projects': 'Project Portfolio & Case Studies | HPE IT Solutions',
      '/projects/major': 'Major Enterprise Projects | HPE IT Solutions',
      '/projects/mid': 'Mid-Scale Infrastructure Projects | HPE IT Solutions',
      '/projects/large': 'Large-Scale Strategic Projects | HPE IT Solutions',
      '/certifications': 'ISO Certifications & Compliance | HPE IT Solutions',
      '/growth-strategy': 'Future Growth & Strategic Roadmap | HPE IT Solutions',
      '/contact': 'Contact Our Enterprise Team | HPE IT Solutions',
      '/admin/login': 'Admin Login | HPE IT Solutions',
      '/admin': 'Admin Dashboard | HPE IT Solutions',
    };

    const descriptionMap = {
      '/': 'HPE IT Solutions - pioneering enterprise infrastructure for a digital-first future. Providing integrated digital and physical infrastructure ecosystems across India.',
      '/about': 'Discover our heritage, mission, and commitment to delivering infrastructure excellence across India through structured governance.',
      '/vision-mission': 'Our roadmap to leading Indias integrated IT and infrastructure transformation ecosystem through governance and scalable frameworks.',
      '/services': 'Explore our specialized divisions providing enterprise technology, brick-oriented infrastructure, and workforce managed services.',
      '/projects': 'View our comprehensive record of national-scale infrastructure and digital transformation projects delivered with excellence.',
      '/certifications': 'Commitment to transparency and quality through ISO-certified governance frameworks and operational protocols.',
      '/contact': 'Get in touch with hpeitsolutions.com for strategic infrastructure consulting and enterprise-scale project execution.',
    };

    document.title = titleMap[location.pathname] || 'HPE IT Solutions';

    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptionMap[location.pathname] || 'Enterprise IT & Non-IT Infrastructure Services across India.');
    }

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://www.hpeitsolutions.com${location.pathname}`);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', `https://www.hpeitsolutions.com${location.pathname}`);
      document.head.appendChild(canonical);
    }
  }, [location]);

  // ── Admin routes — NO Navbar / Footer / Preloader ─────────────────────────
  const isAdminPath = location.pathname.startsWith('/admin');
  if (isAdminPath) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    );
  }

  // ── Body Scroll Lock during Preloading ──────────────────────────
  React.useEffect(() => {
    if (isPreloading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPreloading]);

  // ── Public routes — with Navbar / Footer / Preloader ─────────────────────
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isPreloading ? 'bg-black' : 'bg-slate-50 dark:bg-[#011b26]'}`}>
      {isPreloading && <Preloader onFinish={() => setIsPreloading(false)} />}

      <Navbar />
      <main className="flex-grow transition-all duration-500 pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/strength" element={<Strength />} />
          <Route path="/corporate-structure" element={<CorporateStructure />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/enterprise" element={<EnterpriseServicesPage />} />
          <Route path="/services/infrastructure" element={<InfrastructureBrickServicesPage />} />
          <Route path="/services/workforce" element={<WorkforceManagedServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/group-1" element={<ProjectsGroup1 />} />
          <Route path="/projects/group-2" element={<ProjectsGroup2 />} />
          <Route path="/projects/group-3" element={<ProjectsGroup3 />} />
          <Route path="/projects/major" element={<MajorProjects />} />
          <Route path="/projects/mid" element={<MidProjects />} />
          <Route path="/projects/large" element={<LargeProjects />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/growth-strategy" element={<GrowthStrategy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <ScrollIndicator />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToHash />
      <AppContent />
    </Router>
  );
}

export default App;

