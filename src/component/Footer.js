import Link from "next/link";
import { FaInstagram, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
 <footer className="w-full bg-gray-300 pt-12 pb-12">
  <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6 md:px-16">

   
    <div>
      <h3 className="text-gray-900 font-semibold mb-5 text-lg border-b border-gray-600 pb-2">Main</h3>
      <ul className="space-y-3">
        <li className="transition-all duration-300 hover:text-blue-500 hover:bg-gray-100 rounded-md px-2"><Link href="/">Home</Link></li>
        <li className="transition-all duration-300 hover:text-blue-500 hover:bg-gray-100 rounded-md px-2"><Link href="/about">About</Link></li>
        <li className="transition-all duration-300 hover:text-blue-500 hover:bg-gray-100 rounded-md px-2"><Link href="/skills">Skills</Link></li>
        <li className="transition-all duration-300 hover:text-blue-500 hover:bg-gray-100 rounded-md px-2"><Link href="/contact">Contact</Link></li>
      </ul>
    </div>

   
    <div>
      <h3 className="text-gray-900 font-semibold mb-5 text-lg border-b border-gray-600 pb-2">Social</h3>
      <ul className="space-y-3">
        <li>
          <Link target="_blank" href="https://www.instagram.com/ardsuhail" className="flex items-center gap-3 px-2 py-1 rounded-full hover:bg-blue-50 hover:scale-105 transition-all duration-300">
            <FaInstagram className="w-5 h-5 text-pink-500" /> Instagram
          </Link>
        </li>
        <li>
          <Link target="_blank" href="https://github.com/suhail134" className="flex items-center gap-3 px-2 py-1 rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300">
            <FaGithub className="w-5 h-5 text-gray-800" /> GitHub
          </Link>
        </li>
        <li>
          <Link target="_blank" href="https://www.linkedin.com/in/ardsuhail" className="flex items-center gap-3 px-2 py-1 rounded-full hover:bg-blue-50 hover:scale-105 transition-all duration-300">
            <FaLinkedin className="w-5 h-5 text-blue-500" /> LinkedIn
          </Link>
        </li>
        <li>
          <Link target="_blank" href="https://www.facebook.com/ardsuhail" className="flex items-center gap-3 px-2 py-1 rounded-full hover:bg-blue-50 hover:scale-105 transition-all duration-300">
            <FaFacebook className="w-5 h-5 text-blue-600" /> Facebook
          </Link>
        </li>
      </ul>
    </div>


    <div>
      <h3 className="text-gray-900 font-semibold mb-5 text-lg border-b border-gray-600 pb-2">Resources</h3>
      <ul className="space-y-3">
        <li className="transition-all duration-300 hover:text-blue-500 hover:bg-gray-100 rounded-md px-2"><Link href="/resume.pdf">Resume</Link></li>
        <li className="transition-all duration-300 hover:text-blue-500 hover:bg-gray-100 rounded-md px-2"><Link href="/projects">Projects</Link></li>
        <li className="transition-all duration-300 hover:text-blue-500 hover:bg-gray-100 rounded-md px-2">
          <a href="mailto:support@ardsuhail.com">support@ardsuhail.com</a>
        </li>
      </ul>
    </div>

  </div>

  <div className="container mx-auto text-center border-t border-gray-600 mt-10 pt-6 text-sm text-gray-800">
    Copyright &copy; 2025 ardSuhail. All rights reserved.
  </div>
</footer>

  );
}
