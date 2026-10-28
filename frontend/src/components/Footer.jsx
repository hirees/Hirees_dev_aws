
import { Mail, Phone, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { NEWSLETTER_API_END_POINT } from "@/utils/constant";


const Footer = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleEmployerClick = () => {
    if (user) {
      if (user.role === "recruiter") {
        navigate("/admin/jobs");
      } else {
        toast.error("You are already registered as a candidate. Please log out to create a recruiter account.");
      }
    } else {
      navigate("/signup/recruiter");
    }
  };

const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);

const handleSubscribe = async () => {
  if (!email) {
    toast.error("Please enter your email");
    return;
  }

  try {
    setLoading(true);
    await axios.post(`${NEWSLETTER_API_END_POINT}/subscribe`, { email });
    toast.success("Subscription successful! Check your email.");
    setEmail("");
  } catch (err) {
    toast.error("Subscription failed. Try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <footer className="bg-[#012760] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Brand */}
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-4xl font-bold">Hirees</h2>
            <p className="text-sm leading-relaxed text-white/80 max-w-sm mx-auto md:mx-0">
              Bridging talent with opportunities across industries.
            </p>
            <div className="flex justify-center md:justify-start gap-4 pt-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#012760] transition"
              >
                <i className="fab fa-facebook-f text-sm"></i>
              </a>

              <a
                href="https://www.linkedin.com/company/fstone-technologies/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FSTONE Technologies on LinkedIn"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#012760] transition"
              >
                <i className="fab fa-linkedin-in text-sm"></i>
              </a>

              <a
                href="https://x.com/fstonetech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FSTONE Technologies on Twitter"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#012760] transition"
              >
                <i className="fab fa-twitter text-sm"></i>
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#012760] transition"
              >
                <i className="fab fa-instagram text-sm"></i>
              </a>
            </div>

          </div>

          {/* Newsletter */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-lg mb-2">
              Join our newsletter to keep up to date
            </h3>
            <p className="text-sm text-white/70 mb-4">
              Get updates about new opportunities and platform improvements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto md:mx-0">
             <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="flex-1 h-11 px-4 rounded-lg bg-transparent border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white"
/>

<button
  onClick={handleSubscribe}
  disabled={loading}
  className="h-11 px-6 rounded-lg bg-white text-[#012760] font-semibold hover:bg-white/90 transition disabled:opacity-60"
>
  {loading ? "Subscribing..." : "Subscribe"}
</button>

            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-10"></div>

        {/* Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-center md:text-left">


          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/80">

              {/* Normal links */}
              <li>
                <Link to="/" onClick={scrollToTop} className="hover:text-white transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/jobs" onClick={scrollToTop} className="hover:text-white transition">
                  Find Jobs
                </Link>
              </li>

              {/* LOGIC BASED LINK */}
              <li>
                <button
                  onClick={handleEmployerClick}
                  className="hover:text-white transition text-left w-full"
                >
                  Post Jobs
                </button>
              </li>

              <li>
                <Link
                  to="/profile"
                  onClick={scrollToTop}
                  className="hover:text-white transition"
                >
                  Upload your CV
                </Link>
              </li>

              <li>
                <Link to="/hire" onClick={scrollToTop} className="hover:text-white transition">
                  Hire Now
                </Link>
              </li>

            </ul>
          </div>



          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-white transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms-conditions"
                  className="hover:text-white transition"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="/cookie-policy"
                  className="hover:text-white transition"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>


          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Mail size={16} />  Support@Hirees.com
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={16} /> +1 732 746 0010
              </div>
              <div className="flex items-start justify-center md:justify-start gap-3">
                <MapPin size={16} className="mt-1" />
                <span>
                  Hirees Inc. (FSTONE Technologies) <br />
                  2003 S Easton Rd, Suite 308,<br />
                  Doylestown, PA 18901 | USA | 
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70 text-center md:text-left">
          <span>© 2024 FstoneTech. All rights reserved.</span>
          <span>Owned by FSTONE Technologies</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
