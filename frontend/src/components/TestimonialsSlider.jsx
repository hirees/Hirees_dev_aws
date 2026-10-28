
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FEEDBACK_API_END_POINT } from "@/utils/constant";

export default function TestimonialsSlider() {

  const [testimonials, setTestimonials] = useState([
    {
      id: "empty",
      text: "Approved reviews from people who use Hirees will show up here.",
      name: "Hirees",
      position: "",
      avatar: "",
    },
  ]);

  const issueTypes = [
    { value: "bug", label: "🐛 Bug / Error" },
    { value: "performance", label: "⚡ Performance" },
    { value: "ui", label: "🎨 UI / Display" },
    { value: "login", label: "🔐 Login / Access" },
    { value: "data", label: "📊 Data / Content" },
    { value: "other", label: "🔧 Other" }
  ];

  const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbackType, setFeedbackType] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issueType, setIssueType] = useState("");
  const [issueSeverity, setIssueSeverity] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {

    const fetchTestimonials = async () => {

      try {

        const res = await axios.get(
          `${FEEDBACK_API_END_POINT}/testimonials?type=feedback`
        );

        if (res.data.success && res.data.data.length > 0) {

          const formatted = res.data.data.map((item, index) => ({
            id: item.id,
            text: item.text || item.message,
            name: item.name,
            position: item.role || item.company || item.position || "",
            rating: item.rating,
            avatar: item.avatar || `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,
          }));

          setTestimonials(formatted);

        }

      } catch (error) {
        console.log("Error fetching testimonials", error);
      }

    };

    fetchTestimonials();

  }, []);

  const handlePrev = () => setCurrentIndex(p => p === 0 ? testimonials.length - 1 : p - 1);
  const handleNext = () => setCurrentIndex(p => p === testimonials.length - 1 ? 0 : p + 1);

  const closeForm = () => {
    setIsFormOpen(false);
    setFeedbackType("");
    setRating(0);
    setMessage("");
    setName("");
    setEmail("");
    setIssueType("");
    setIssueSeverity("");
    setIssueDescription("");
    setSubmitted(false);
  };

  const selectFeedbackType = (value) => {
    setFeedbackType(value);
    setRating(0); setMessage(""); setIssueType(""); setIssueSeverity(""); setIssueDescription("");
  };

  const handleSubmit = async () => {

    try {

      const payload = {
        type: feedbackType,
        name,
        email,
        rating,
        issueType,
        severity: issueSeverity,
        message: feedbackType === "feedback" ? message : issueDescription
      };

      const res = await axios.post(
        `${FEEDBACK_API_END_POINT}/submit`,
        payload
      );

      if (res.data.success) {

        setSubmitted(true);

        setTimeout(() => {

          setSubmitted(false);
          setFeedbackType("");
          setRating(0);
          setMessage("");
          setName("");
          setEmail("");
          setIssueType("");
          setIssueSeverity("");
          setIssueDescription("");

        }, 3500);

      }

    } catch (error) {
      console.log("Submit error", error);
    }

  };

  const getAvClass = (i) => {
    if (i === 2) return "w-10 h-10 opacity-100 border-2 border-pink-300";
    if (i === 1 || i === 3) return "w-7 h-7 opacity-80";
    return "w-5 h-5 opacity-60";
  };

// Auto-Rotate effect for testimonials every 5 seconds
  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex(prev =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  }, 5000); // 5 seconds

  return () => clearInterval(interval);
}, [testimonials.length]);

const [isPaused, setIsPaused] = useState(false);
useEffect(() => {

  if (isPaused) return;

  const interval = setInterval(() => {
    setCurrentIndex(prev =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  }, 5000);

  return () => clearInterval(interval);

}, [testimonials.length, isPaused]);



  return (
    <div
      className="flex w-full min-h-screen items-start justify-center "
      style={{ background: "white opacity-100" }}
    >
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-slide { animation: fadeSlide 0.25s ease-out forwards; }
      `}</style>

      {/* ── Outer row: items-stretch makes both cards same height always ── */}
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto my-8 px-4 gap-6 items-stretch">

        {/* ── LEFT CARD — full height, blue panel stretches via flex ── */}
        <div className="flex lg:w-[38%] rounded-2xl overflow-hidden shadow-lg"
         onMouseEnter={() => setIsPaused(true)}
         onMouseLeave={() => setIsPaused(false)}
        >

          {/* Blue panel — justify-between pushes content to top & bottom */}
          <div
            className="w-[42%] text-white p-5 rounded-br-[40px] flex flex-col justify-between"
            style={{ background: "linear-gradient(180deg, #0350C6 0%, #012760 100%)" }}
          >
            <div>
              <div className="text-5xl font-bold font-serif leading-none mb-4">"</div>
              <h2 className="text-lg font-bold leading-tight">What our<br />customer<br />says</h2>
            </div>
            <p className="text-xs font-medium">
              Reviews are shown after they are approved
            </p>
          </div>

          {/* White panel — justify-between keeps nav at bottom */}
          <div className="w-[58%] p-5 flex flex-col items-center justify-between bg-white ">
            <div className="flex flex-col items-center w-full">
              <h3 className="text-xs font-bold text-gray-500 mb-2 text-center">Help us improve our productivity</h3>
              <p className="text-gray-500 text-center mb-4 text-xs leading-relaxed">
                {testimonials[currentIndex].text}
              </p>
              <div className="flex justify-center items-center gap-2 mb-3">
                {testimonials.map((t, index) => {
                  let dp = (currentIndex - 2 + index) % testimonials.length;
                  if (dp < 0) dp += testimonials.length;
                  return (
                    <div
                      key={t.id}
                      className={`${getAvClass(index)} rounded-full bg-cover bg-center transition-all duration-300 flex-shrink-0`}
                      style={{ backgroundImage: `url(${testimonials[dp].avatar})` }}
                    />
                  );
                })}
              </div>
              <h4 className="text-xs font-bold text-blue-600">{testimonials[currentIndex].name}</h4>
              <p className="text-xs text-gray-500 mb-3">{testimonials[currentIndex].position}</p>
            </div>
            <div className="flex justify-center gap-2">
              <button onClick={handlePrev}
                className="w-7 h-7 rounded-full border border-blue-600 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M15 19L9 12L15 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button onClick={handleNext}
                className="w-7 h-7 rounded-full border border-blue-600 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M9 19L15 12L9 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT CARD ── */}
        <div className="w-full lg:w-[62%] bg-white rounded-2xl shadow-lg p-6 flex flex-col">

          {submitted ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                style={{ background: "linear-gradient(180deg, #0350C6 0%, #012760 100%)" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-blue-700">Thank you!</h3>
              <p className="text-xs text-gray-400 mt-1">
                {feedbackType === "issue"
                  ? "Your issue has been reported. We'll look into it soon!"
                  : "Your feedback has been submitted successfully."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-blue-800">Share Your Feedback</h2>
                  <p className="text-xs text-gray-400 mt-1">Help us improve — your opinion matters to us.</p>
                </div>
                {feedbackType && (
                  <button
                    onClick={closeForm}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close form"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Name + Email */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition" />
                </div>
              </div>

              {/* Type selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2">What would you like to share?</label>
                <div className="flex gap-2">
                  {[
                    { value: "feedback", label: "💬 Feedback", desc: "Share thoughts & rating" },
                    { value: "issue", label: "🚨 Issue", desc: "Report a problem" }
                  ].map(type => (
                    <button key={type.value} type="button" onClick={() => selectFeedbackType(type.value)}
                      className={`flex-1 py-2.5 px-3 rounded-xl border-2 text-left transition-all duration-200 ${feedbackType === type.value ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-200 hover:bg-gray-50"}`}>
                      <div className={`text-xs font-bold ${feedbackType === type.value ? "text-blue-700" : "text-gray-600"}`}>{type.label}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{type.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── FEEDBACK fields ── */}
              {feedbackType === "feedback" && (
                <div className="flex flex-col gap-3 fade-slide">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Overall Rating</label>
                    <div className="flex gap-1 items-center">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button key={star} type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="focus:outline-none transition-transform hover:scale-110">
                          <svg width="22" height="22" viewBox="0 0 24 24"
                            fill={(hoverRating || rating) >= star ? "#f59e0b" : "none"}
                            stroke={(hoverRating || rating) >= star ? "#f59e0b" : "#d1d5db"}
                            strokeWidth="1.5">
                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                          </svg>
                        </button>
                      ))}
                      {rating > 0 && (
                        <span className="ml-2 text-xs text-amber-500 font-semibold">{ratingLabels[rating]}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Your Message</label>
                    <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4}
                      placeholder="Tell us what you think — what's working well, what could be better..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition resize-none" />
                  </div>
                </div>
              )}

              {/* ── ISSUE fields ── */}
              {feedbackType === "issue" && (
                <div className="flex flex-col gap-3 fade-slide">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">What type of issue are you facing?</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {issueTypes.map(type => (
                        <button key={type.value} type="button" onClick={() => setIssueType(type.value)}
                          className={`py-2 px-2 rounded-lg border-2 text-xs font-semibold transition-all duration-200 ${issueType === type.value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-blue-200 hover:bg-gray-50"}`}>
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">How severe is the issue?</label>
                    <div className="flex gap-2">
                      {[
                        { value: "low", label: "🟢 Low", base: "border-green-200 text-green-700 hover:bg-green-50", sel: "border-green-500 bg-green-50 text-green-700" },
                        { value: "medium", label: "🟡 Medium", base: "border-amber-200 text-amber-700 hover:bg-amber-50", sel: "border-amber-500 bg-amber-50 text-amber-700" },
                        { value: "high", label: "🔴 High", base: "border-red-200 text-red-700 hover:bg-red-50", sel: "border-red-500 bg-red-50 text-red-700" }
                      ].map(sev => (
                        <button key={sev.value} type="button" onClick={() => setIssueSeverity(sev.value)}
                          className={`flex-1 py-1.5 rounded-lg border-2 text-xs font-bold transition-all duration-200 ${issueSeverity === sev.value ? sev.sel : sev.base}`}>
                          {sev.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Describe the Issue</label>
                    <textarea value={issueDescription} onChange={e => setIssueDescription(e.target.value)} rows={4}
                      placeholder="Please describe what happened, what you expected, and steps to reproduce..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition resize-none" />
                  </div>
                </div>
              )}

              {/* Spacer pushes submit to bottom */}
              <div className="flex-1" />

              {/* Submit */}
              {feedbackType && (
                <button type="button" onClick={handleSubmit}
                  className="w-full py-2.5 rounded-lg text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: "linear-gradient(180deg, #0350C6 0%, #012760 100%)" }}>
                  {feedbackType === "issue" ? "🚨 Report Issue" : "💬 Submit Feedback"}
                </button>
              )}

              <p className="text-center text-xs text-gray-400">
                Your note stays private until it is approved
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}