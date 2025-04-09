import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { HiOutlineSquares2X2, HiOutlineXMark } from "react-icons/hi2";

const sections = [
  { id: "terms-of-use", label: "Terms of Use" },
  { id: "terms-of-sale", label: "Terms of Sale" },
  { id: "cancellation-rescheduling", label: "Cancellation & Rescheduling" },
  { id: "emergency-bookings", label: "Emergency Bookings" },
  { id: "copyrights-usage", label: "Copyrights and Usage Rights" },
  { id: "deliverables", label: "Deliverables" },
  { id: "liability", label: "Liability" },
  { id: "privacy-policy", label: "Privacy & Cookie Policy" },
  { id: "company-details", label: "Company Details" },
  { id: "governing-law", label: "Governing Law" },
  { id: "acceptance", label: "Acceptance of Terms" },
];

const TermsPage = () => {
  const [activeSection, setActiveSection] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sectionOffsets = sections.map((section) => {
        const el = document.getElementById(section.id);
        return { id: section.id, offset: el ? el.offsetTop - 200 : 0 };
      });

      const scrollPos = window.scrollY;
      const current = sectionOffsets.reverse().find((section) => scrollPos >= section.offset);

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-black text-gray-300 flex flex-col md:flex-row px-6 md:px-16 pt-12 md:pt-20 relative">
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex flex-col md:w-1/4 sticky top-32 space-y-4 border-r border-zinc-700 pr-8 h-fit">
        <h2 className="text-2xl font-bold text-purple-400 mb-6">Terms & Policies</h2>
        <nav className="space-y-3">
          {sections.map((section) => (
            <Link
              key={section.id}
              to={section.id}
              smooth={true}
              duration={500}
              offset={-120}
              className={`block px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition ${
                activeSection === section.id
                  ? "bg-purple-500 text-white"
                  : "hover:bg-zinc-800 hover:text-purple-300"
              }`}
            >
              {section.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="md:w-3/4 space-y-20 mt-12 md:mt-0 md:pl-16">
        {sections.map((section) => (
          <section id={section.id} key={section.id} className="space-y-6 scroll-mt-32">
            <h3 className="text-3xl font-bold text-white border-b border-purple-500 pb-2">{section.label}</h3>
            {renderSectionContent(section.id)}
          </section>
        ))}
      </main>

      {/* Mobile floating button */}
      {!sidebarOpen && (
        <button
          className="md:hidden fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-xl z-50 transition-all"
          onClick={toggleSidebar}
        >
          <HiOutlineSquares2X2 size={28} />
        </button>
      )}

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <>
          {/* Blur Background */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden transition-all duration-300"
            onClick={closeSidebar}
          ></div>

          {/* Slide-Up Drawer */}
          <div className="fixed bottom-0 left-0 w-full bg-zinc-900 rounded-t-2xl p-6 space-y-4 max-h-[80vh] overflow-y-auto z-50 animate-slide-up-down">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-purple-400">Sections</h2>
              <button onClick={closeSidebar}>
                <HiOutlineXMark size={28} className="text-gray-400 hover:text-white transition" />
              </button>
            </div>

            {sections.map((section) => (
              <Link
                key={section.id}
                to={section.id}
                smooth={true}
                duration={500}
                offset={-100}
                onClick={closeSidebar}
                className="block px-4 py-3 rounded-md text-base hover:bg-zinc-700 hover:text-purple-400 transition"
              >
                {section.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Section content rendering
const renderSectionContent = (id) => {
  switch (id) {
    case "terms-of-use":
      return <p>By accessing and using JB Studios' website and services, you agree to comply with all applicable laws and refrain from misusing the platform or intellectual property.</p>;
    case "terms-of-sale":
      return (
        <ul className="list-disc pl-6 space-y-2">
          <li>A non-refundable studio/fee deposit is required to secure your booking.</li>
          <li>Remaining balance is due the day before your session.</li>
          <li>Payment accepted by bank transfer only.</li>
        </ul>
      );
    case "cancellation-rescheduling":
      return (
        <ul className="list-disc pl-6 space-y-2">
          <li>Cancellations must be made at least 5 days before your scheduled date.</li>
          <li>Rescheduling is permitted subject to availability.</li>
        </ul>
      );
    case "emergency-bookings":
      return (
        <ul className="list-disc pl-6 space-y-2">
          <li>Emergency bookings made within 48 hours may incur additional fees.</li>
          <li>Full payment is required to confirm emergency bookings.</li>
        </ul>
      );
    case "copyrights-usage":
      return (
        <ul className="list-disc pl-6 space-y-2">
          <li>All photos, videos, and media remain the property of JB Studios.</li>
          <li>Clients receive limited usage rights for personal or agreed commercial use.</li>
          <li>Additional commercial use requires prior written consent and may incur licensing fees.</li>
        </ul>
      );
    case "deliverables":
      return (
        <ul className="list-disc pl-6 space-y-2">
          <li>Edited photos delivered within 1 week after shoot via online gallery.</li>
          <li>Consultation summaries provided in writing after sessions.</li>
        </ul>
      );
    case "liability":
      return (
        <ul className="list-disc pl-6 space-y-2">
          <li>JB Studios is not liable for unforeseen circumstances, such as equipment failure or uncontrollable events.</li>
          <li>Liability is limited to a refund of any payments made.</li>
          <li>All consultation discussions are confidential and will not be shared without consent.</li>
        </ul>
      );
    case "privacy-policy":
      return <p>We respect your privacy. Your personal data (e.g., email, phone number) is only used for bookings, newsletters, and improving your experience. Cookies may be used for site optimization.</p>;
    case "company-details":
      return (
        <p>
          JB Studios, United Kingdom. <br />
          Email: <a href="mailto:info@jb-studios.com" className="text-purple-400 hover:underline">info@jb-studios.com</a> <br />
          Phone: <a href="tel:+447842312475" className="text-purple-400 hover:underline">+44 7842 312475</a>
        </p>
      );
    case "governing-law":
      return <p>All disputes will be governed by the laws of the United Kingdom.</p>;
    case "acceptance":
      return <p>By booking with JB Studios or using this site, you agree to be bound by these terms and conditions.</p>;
    default:
      return null;
  }
};

export default TermsPage;
