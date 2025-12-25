// "use client";
// import React, { useState, useEffect } from "react";
// import { Send, LoaderCircle } from "lucide-react";

// export default function HireMeForm() {
//   const [loading, setLoading] = useState(false);
//   const [selectedService, setSelectedService] = useState("");
//   const [otherService, setOtherService] = useState("");


//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-16">
//       <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 md:p-10 border border-gray-200">

        
//         <h1 className="text-3xl font-bold text-gray-900 mb-3">Hire Me</h1>
//         <p className="text-gray-600 mb-8 leading-relaxed">
//           “I think people hire me because I am good at what I love to do.”  
//           Let’s discuss your project below and make something great together.
//         </p>

       
//         <div className="mb-6">
//           <label className="block text-gray-700 font-medium mb-2">I prefer to contact via *</label>
//           <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500">
//             <option>Email</option>
//             <option>WhatsApp</option>
//             <option>Upwork</option>
//             <option>Fiverr</option>
//             <option>LinkedIn</option>
//           </select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Your Name *</label>
//             <input type="text" placeholder="John Doe" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Your Email *</label>
//             <input type="email" placeholder="you@example.com" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />
//           </div>
//         </div>

       
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Website (optional)</label>
//             <input type="text" placeholder="https://yourwebsite.com" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Your Location</label>
//             <input type="text" placeholder="California, USA" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />
//           </div>
//         </div>


//         <div className="mb-6">
//           <label className="block text-gray-700 font-medium mb-2">What can I help you with?</label>
//           <div className="flex flex-wrap gap-3">
//             {["Web Design", "Web Development", "UI/UX Design", "Other"].map((item, i) => (
//               <button
//                 key={i}
//                 type="button"
//                 onClick={() => {
//                   setSelectedService(item);
//                   if (item !== "Other") setOtherService("");
//                 }}
//                 className={`px-4 py-2 rounded-lg border transition-all ${
//                   selectedService === item
//                     ? "bg-blue-600 text-white border-blue-600"
//                     : "border-gray-300 text-gray-700 hover:bg-blue-50"
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>
//           {selectedService === "Other" && (
//             <input
//               type="text"
//               placeholder="Please specify your project type..."
//               value={otherService}
//               onChange={(e) => setOtherService(e.target.value)}
//               className="mt-4 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
//             />
//           )}
//         </div>


//         <div className="mb-6">
//           <label className="block text-gray-700 font-medium mb-2">Project Details *</label>
//           <textarea
//             rows="4"
//             placeholder="Describe your project goals, audience, and expectations..."
//             className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
//           ></textarea>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Timeline</label>
//             <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500">
//               <option>Within 1 week</option>
//               <option>Within 3 weeks</option>
//               <option>1 month+</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Budget (USD)</label>
//             <select
//               className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            
//             >
//               <option>Less than $100</option>
//               <option>$100 - $300</option>
//               <option>$300 - $600</option>
//               <option>$600 - $1000</option>
//               <option>$1000+</option>
//             </select>
//           </div>
//         </div>


//         <button
//           onClick={() => setLoading(true)}
//           className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
//         >
//           {loading ? (
//             <>
//               <LoaderCircle className="animate-spin" /> Sending...
//             </>
//           ) : (
//             <>
//               <Send /> Send Request
//             </>
//           )}
//         </button>
//       </div>
//     </section>
//   );
// }
