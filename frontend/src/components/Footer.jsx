// import { Mail, Phone, MapPin } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="w-full bg-[#0B1F44] px-4 sm:px-10 md:px-24 py-16">
//       <div className="mx-auto max-w-7xl">

//         {/* Top Section */}
//         <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
//           {/* Branding */}
//           <div>
//             <h2 className="font-k2d font-bold text-white text-5xl md:text-6xl mb-4">
//               Hirees
//             </h2>
//             <p className="text-white/80 text-lg max-w-sm leading-relaxed">
//               Bridging talent with opportunities across industries.
//             </p>
//           </div>

//           {/* Newsletter */}
//           {/* <div className="max-w-md w-full">
//             <p className="text-white text-lg font-semibold mb-4">
//               Stay in the loop
//             </p>
//             <div className="flex gap-3">
//               <input
//                 type="email"
//                 placeholder="Your email address"
//                 className="flex-1 h-12 px-4 rounded-lg bg-transparent border border-white/40 text-white placeholder-white/60 focus:outline-none focus:border-white"
//               />
//               <button className="h-12 px-6 rounded-lg bg-white text-[#0B1F44] font-semibold hover:bg-gray-100 transition">
//                 Subscribe
//               </button>
//             </div>
//           </div> */}
//         </div>

//         {/* Divider */}
//         <div className="h-px bg-white/20 mb-12" />

//         {/* Links */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-12">
//           {/* Quick Links */}
//           <div>
//             <h3 className="text-white font-semibold text-lg mb-6">
//               Quick Links
//             </h3>
//             <ul className="space-y-3">
//               {["Home", "Post Jobs", "Upload CV", "Find Jobs", "Hire Now"].map(
//                 (item) => (
//                   <li key={item}>
//                     <a
//                       href="#"
//                       className="text-white/70 hover:text-white transition"
//                     >
//                       {item}
//                     </a>
//                   </li>
//                 )
//               )}
//             </ul>
//           </div>

//           {/* Legal */}
//           <div>
//             <h3 className="text-white font-semibold text-lg mb-6">
//               Legal
//             </h3>
//             <ul className="space-y-3">
//               {["Privacy Policy", "Terms & Conditions", "Cookie Policy"].map(
//                 (item) => (
//                   <li key={item}>
//                     <a
//                       href="#"
//                       className="text-white/70 hover:text-white transition"
//                     >
//                       {item}
//                     </a>
//                   </li>
//                 )
//               )}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className="text-white font-semibold text-lg mb-6">
//               Contact
//             </h3>
//             <div className="space-y-4 text-white/70">
//               <div className="flex items-center gap-3">
//                 <Mail size={18} />
//                 <a href="mailto:support@hirees.com" className="hover:text-white">
//                   support@hirees.com
//                 </a>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Phone size={18} />
//                 <a href="tel:+17327460010" className="hover:text-white">
//                   +1 732 746 0010
//                 </a>
//               </div>
//               <div className="flex items-start gap-3">
//                 <MapPin size={18} className="mt-1" />
//                 <p>
//                   FSTONE Technologies, LLC<br />
//                   2003 S Easton Rd, Suite 308<br />
//                   Doylestown, PA 18901
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom */}
//         <div className="h-px bg-white/20 mb-6" />
//         <p className="text-white/60 text-sm text-center">
//           © 2024 FstoneTech. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0B1F44] px-4 sm:px-10 md:px-20 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          
          {/* Brand */}
          <div>
            <h2 className="font-k2d font-bold text-white text-3xl mb-1">
              Hirees
            </h2>
            <p className="text-white/70 text-sm max-w-xs">
              Bridging talent with opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-10">
            <div>
              <h3 className="text-white text-sm font-semibold mb-3">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                {["Home", "Find Jobs", "Post Jobs"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/60 hover:text-white transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white text-sm font-semibold mb-3">
                Legal
              </h3>
              <ul className="space-y-2 text-sm">
                {["Privacy", "Terms"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/60 hover:text-white transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-2 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <a href="mailto:support@hirees.com" className="hover:text-white">
                support@hirees.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <a href="tel:+17327460010" className="hover:text-white">
                +1 732 746 0010
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/15 mb-4" />

        {/* Bottom */}
        <p className="text-white/50 text-xs text-center">
          © 2024 Fstone Technologies, LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
