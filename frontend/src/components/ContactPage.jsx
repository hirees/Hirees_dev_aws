
import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "bg-[url('/images/office1.jpg')]",
      title: "Professional Excellence",
      description: "Leading the industry with innovative solutions"
    },
    {
      image: "bg-[url('/images/office2.jpg')]",
      title: "Global Network",
      description: "Connected worldwide, delivered locally"
    },
    {
      image: "bg-[url('/images/office3.jpg')]",
      title: "24/7 Support",
      description: "Always here when you need us"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-40 mb-8 rounded-lg overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000
            bg-gradient-to-r from-gray-900 to-gray-800
            ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">{slide.title}</h3>
            <p className="text-gray-300">{slide.description}</p>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300
              ${index === currentSlide ? 'bg-blue-400 w-6' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "general",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitStatus("success");
    setIsSubmitting(false);
    setTimeout(() => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "general",
        message: ""
      });
      setSubmitStatus(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-xl">
            {/* Contact Information Panel */}
            <div className="bg-gray-900 p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
              <p className="text-gray-400 mb-8">Let's discuss how we can help you succeed</p>

              <Slideshow />

              <div className="space-y-8 mt-12">
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-blue-400" />
                  <span>+1 012 3456 789</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <span>support@hirees.com</span>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-blue-400 mt-1" />
                  <span>132 Dartmouth Street Boston,<br />Massachusetts 02156 United States</span>
                </div>
              </div>

              <div className="mt-12">
                <div className="flex gap-6">
                  <a href="#" className="text-white hover:text-blue-400 transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-white hover:text-blue-400 transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-white hover:text-blue-400 transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form Panel */}
            <div className="bg-white p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Select Subject?</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['General Inquiry', 'Technical Support', 'Billing Question', 'Partnership'].map((subject) => (
                      <label key={subject} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="subject"
                          value={subject.toLowerCase()}
                          checked={formData.subject === subject.toLowerCase()}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-600">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors resize-none"
                    required
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-lg px-8 py-4"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </div>

                {submitStatus === "success" && (
                  <Alert className="mt-6 bg-green-50 border-green-200">
                    <AlertDescription className="text-green-800">
                      Thank you for your message! We'll get back to you soon.
                    </AlertDescription>
                  </Alert>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactPage;