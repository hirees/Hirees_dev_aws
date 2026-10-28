import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Rocket,
  ShieldCheck,
  Globe,
  Lock,
  BadgeCheck,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
} from "lucide-react";
import Footer from "../Footer";
import Navbar from "../shared/Navbar";
import { PAGE_META, usePageMeta } from "@/seo/usePageMeta";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";



const stats = [
  { number: "Verified", label: "Employers" },
  { number: "Open", label: "To H1B transfer" },
  { number: "Free", label: "To post" },
  { number: "Direct", label: "Applications" },
];

const features = [
  {
    icon: <Rocket size={26} />,
    title: "Smart Hiring",
    desc: "AI-powered recruitment tools helping companies hire faster and smarter.",
  },
  {
    icon: <ShieldCheck size={26} />,
    title: "Verified Companies",
    desc: "Only trusted and verified companies can post opportunities.",
  },
  {
    icon: <Briefcase size={26} />,
    title: "Career Growth",
    desc: "Helping candidates discover opportunities aligned with their skills.",
  },
  {
    icon: <Globe size={26} />,
    title: "Global Reach",
    desc: "Connecting talent and recruiters across multiple industries.",
  },
];

const team = [
  {
    name: "Talent Acquisition Manager",
    role: "Recruitment Expert",
   image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
  },
  {
    name: "UI/UX Designer",
    role: "Creative Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600",
  },
  {
    name: "Hiring Specialist",
    role: "HR Expert",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600",
  },
];

const trustFeatures = [
  {
    icon: <ShieldCheck size={26} />,
    title: "SSL Secured",
    desc: "Your data and applications are protected with advanced SSL encryption.",
  },
  {
    icon: <BadgeCheck size={26} />,
    title: "Verified Recruiters",
    desc: "Every recruiter goes through verification before posting jobs.",
  },
  {
    icon: <Lock size={26} />,
    title: "Privacy Protected",
    desc: "We never share candidate information without consent.",
  },
  {
    icon: <UserCheck size={26} />,
    title: "Trusted Platform",
    desc: "Thousands of professionals trust Hirees for career growth.",
  },
  {
    icon: <ShieldCheck size={26} />,
    title: "GDPR Ready",
    desc: "Hirees follows modern privacy and data protection practices to keep user information secure.",
  },
];

const faqs = [
  {
    question: "Is Hirees free for job seekers?",
    answer:
      "Yes, candidates can search and apply for jobs completely free.",
  },
  {
    question: "How are companies verified?",
    answer:
      "Recruiters and companies go through profile verification before posting jobs.",
  },
  {
    question: "Is my personal data secure?",
    answer:
      "Yes, we use modern security practices and encrypted connections to keep your data safe.",
  },
  {
    question: "Can recruiters directly contact candidates?",
    answer:
      "Only verified recruiters can connect with candidates through the platform.",
  },
];

export default function AboutUs() {
  usePageMeta(PAGE_META.about);

  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  // "Explore Jobs" / "Find Jobs" — common page, no validation needed
  const handleExploreJobs = () => {
    navigate("/jobs");
  };

  // "Hire Talent" / "Post a Job" — only recruiters can post jobs
  const handleHireTalent = () => {
    if (user) {
      if (user.role === "recruiter") {
        navigate("/admin/jobs/post");
      } else {
        toast.error(
          "You are already registered as a candidate. Please log out and sign in/register as a recruiter."
        );
      }
    } else {
      navigate("/signup/recruiter");
    }
  };

  return (
    <div className="bg-[#eef2ff] text-[#0f2057] min-h-screen overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative py-28 px-6 lg:px-20 bg-gradient-to-br from-[#eef2ff] via-[#dde8ff] to-[#eef2ff]">
        {/* subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(#c7d7f7 1px, transparent 1px), linear-gradient(90deg, #c7d7f7 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300/30 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-20 w-64 h-64 bg-orange-200/40 blur-3xl rounded-full" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center relative z-10"
        >
          <div>
            {/* trusted badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              Built for candidates and employers
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-[#0f2057]">
              About{" "}
              <span className="relative">
                <span className="text-[#3b82f6]">Hirees</span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-orange-400 rounded-full" />
              </span>
            </h1>

            <p className="mt-8 text-lg text-[#334d8a] leading-8 max-w-xl">
              Hirees is a modern recruitment platform helping companies discover
              top talent while empowering candidates to build successful careers.
              Our mission is to simplify hiring through technology, trust, and
              innovation.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              {/* HERO: Explore Jobs */}
              <button
                onClick={handleExploreJobs}
                className="px-7 py-3.5 rounded-xl bg-[#0f2057] text-white font-semibold hover:bg-[#1a3080] transition shadow-lg shadow-blue-200"
              >
                Explore Jobs
              </button>

              {/* HERO: Hire Talent */}
              <button
                onClick={handleHireTalent}
                className="px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition shadow-lg shadow-orange-200"
              >
                Hire Talent
              </button>
            </div>
          </div>

          {/* Stats card */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <div className="bg-white border border-blue-100 rounded-3xl p-8 shadow-2xl shadow-blue-100">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-6">
                Platform at a glance
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#eef2ff] rounded-2xl p-5 border border-blue-100 hover:border-blue-300 transition"
                  >
                    <h2 className="text-3xl font-extrabold text-[#0f2057]">
                      {item.number}
                    </h2>
                    <p className="text-[#5b74b8] mt-1 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* STORY */}
      <section className="py-24 px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200"
              alt="team"
              className="rounded-3xl shadow-xl"
            />
            {/* floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-orange-500 text-white rounded-2xl px-5 py-3 shadow-lg font-bold text-sm">
              Est. 2022 · Trusted Globally
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-3">
              Our Story
            </p>
            <h2 className="text-4xl font-extrabold text-[#0f2057] mb-6 leading-tight">
              Built to make hiring <br /> human again
            </h2>
            <p className="text-[#334d8a] leading-8 text-base">
              Hirees started with a simple idea — make hiring easier, transparent,
              and faster for everyone. Traditional recruitment platforms often feel
              outdated and complicated. We wanted to create a clean, intelligent,
              and modern experience that connects talent with the right opportunities.
            </p>
            <p className="text-[#5b74b8] leading-8 mt-5 text-base">
              Today, Hirees continues to grow as a trusted hiring ecosystem for
              recruiters, startups, and job seekers worldwide.
            </p>

            <div className="mt-8 flex gap-8">
              <div>
                <p className="text-lg font-extrabold text-[#0f2057]">Verified employers</p>
              </div>
              <div className="w-px bg-blue-100" />
              <div>
                <p className="text-lg font-extrabold text-[#0f2057]">Open to H1B transfer</p>
              </div>
              <div className="w-px bg-blue-100" />
              <div>
                <p className="text-lg font-extrabold text-[#0f2057]">Free to post</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 lg:px-20 bg-[#eef2ff]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">
              Why Hirees
            </p>
            <h2 className="text-4xl font-extrabold text-[#0f2057]">
              Why Choose Hirees
            </h2>
            <p className="text-[#5b74b8] mt-3 max-w-xl mx-auto">
              Everything you need for smarter hiring and career growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                whileHover={{ y: -8 }}
                key={i}
                className="bg-white border border-blue-100 rounded-2xl p-7 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0f2057] flex items-center justify-center mb-5 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0f2057] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#5b74b8] leading-7 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* TRUST & SECURITY */}
<section className="py-24 px-6 lg:px-20 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">
        Trust & Security
      </p>

      <h2 className="text-4xl font-extrabold text-[#0f2057]">
        Built with Trust in Mind
      </h2>

      <p className="text-[#5b74b8] mt-3 max-w-2xl mx-auto">
        Hirees prioritizes transparency, privacy, and secure hiring experiences
        for both recruiters and candidates.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {trustFeatures.map((item, i) => (
        <motion.div
          whileHover={{ y: -8 }}
          key={i}
          className="bg-[#eef2ff] border border-blue-100 rounded-2xl p-7 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-[#0f2057] flex items-center justify-center mb-5 text-white">
            {item.icon}
          </div>

          <h3 className="text-lg font-bold text-[#0f2057] mb-3">
            {item.title}
          </h3>

          <p className="text-[#5b74b8] leading-7 text-sm">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* TEAM */}
      <section className="py-24 px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">
              The Team
            </p>
            <h2 className="text-4xl font-extrabold text-[#0f2057]">
              Meet Our Team
            </h2>
            <p className="text-[#5b74b8] mt-3">
              Passionate people building the future of recruitment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={i}
                className="bg-[#eef2ff] border border-blue-100 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-blue-100 transition-all"
              >
            <img
  src={member.image}
  alt={member.name}
  className="h-80 w-full object-cover object-top"
/>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0f2057]">{member.name}</h3>
                  <p className="text-orange-500 font-semibold mt-1 text-sm">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ */}
<section className="py-24 px-6 lg:px-20 bg-[#eef2ff]">
  <div className="max-w-5xl mx-auto">
    <div className="text-center mb-16">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">
        FAQs
      </p>

      <h2 className="text-4xl font-extrabold text-[#0f2057]">
        Frequently Asked Questions
      </h2>

      <p className="text-[#5b74b8] mt-3">
        Everything you need to know about Hirees.
      </p>
    </div>

    <div className="space-y-5">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#0f2057]">
              {faq.question}
            </h3>

            <ChevronDown className="text-orange-500" size={20} />
          </div>

          <p className="text-[#5b74b8] mt-4 leading-7">
            {faq.answer}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* CONTACT INFO */}
<section className="py-20 px-6 lg:px-20 bg-white">
  <div className="max-w-6xl mx-auto">
    <div className="bg-[#eef2ff] border border-blue-100 rounded-[32px] p-10 lg:p-14">
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">
          Contact Us
        </p>

        <h2 className="text-4xl font-extrabold text-[#0f2057]">
          We're Here to Help
        </h2>

        <p className="text-[#5b74b8] mt-3">
          Reach out to our support team anytime.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-blue-100">
          <Mail className="text-orange-500 mb-4" size={28} />

          <h3 className="text-lg font-bold text-[#0f2057] mb-2">
            Email Support
          </h3>

          <p className="text-[#5b74b8]">
            Support@Hirees.com
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-blue-100">
          <Phone className="text-orange-500 mb-4" size={28} />

          <h3 className="text-lg font-bold text-[#0f2057] mb-2">
            Phone
          </h3>

          <p className="text-[#5b74b8]">
            +1 732 746 0010
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-blue-100">
          <MapPin className="text-orange-500 mb-4" size={28} />

          <h3 className="text-lg font-bold text-[#0f2057] mb-2">
            Location
          </h3>

          <p className="text-[#5b74b8]">
            USA – Pennsylvania
2003 S Easton Rd, Suite 308
Doylestown, PA 18901
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-20 bg-[#eef2ff]">
        <div className="max-w-5xl mx-auto bg-[#0f2057] rounded-[32px] p-14 text-center relative overflow-hidden">
          {/* decorative blobs inside CTA */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 blur-3xl rounded-full" />

          <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-4 relative z-10">
            Get Started Today
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight relative z-10">
            Ready to Build Your Future?
          </h2>
          <p className="text-blue-200 mt-5 text-lg max-w-xl mx-auto relative z-10">
            Join thousands of recruiters and candidates already growing with Hirees.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10 relative z-10">
            {/* CTA: Find Jobs */}
            <button
              onClick={handleExploreJobs}
              className="px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition shadow-lg shadow-orange-900/30"
            >
              Find Jobs
            </button>

            {/* CTA: Post a Job */}
            <button
              onClick={handleHireTalent}
              className="px-8 py-4 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold transition backdrop-blur-sm"
            >
              Post a Job
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
