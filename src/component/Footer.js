import Link from "next/link";
import { FaInstagram, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    // <footer className="w-full pt-8 pb-8 bg-gradient-to-r from-sky-900 via-indigo-900 to-emerald-800">
    <footer className="w-full pt-8 pb-8 bg-gradient-to-r from-blue-900 via-indigo-900 to-emerald-900">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-5 md:px-16">

        {/* Main Pages */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-lg">Main</h3>
          <ul className="space-y-2">
            <li className="hover:text-white hover:underline"><Link href="/">Home</Link></li>
            <li className="hover:text-white hover:underline"><Link href="/about">About</Link></li>
            <li className="hover:text-white hover:underline"><Link href="/skills">Skills</Link></li>
            <li className="hover:text-white hover:underline"><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-lg">Social</h3>
          <ul className="space-y-3">
            <li>
              <Link target="_blank" href="https://www.instagram.com/ardsuhail" className="flex items-center gap-3 hover:text-pink-400 hover:underline transition-all duration-300">
                <FaInstagram className="w-5 h-5" />
                Instagram
              </Link>
            </li>
            <li>
              <Link target="_blank" href="https://github.com/suhail134" className="flex items-center gap-3 hover:text-gray-300 hover:underline transition-all duration-300">
                <FaGithub className="w-5 h-5" />
                GitHub
              </Link>
            </li>
            <li>
              <Link target="_blank" href="https://www.linkedin.com/in/ardsuhail" className="flex items-center gap-3 hover:text-blue-400 hover:underline transition-all duration-300">
                <FaLinkedin className="w-5 h-5" />
                LinkedIn
              </Link>
            </li>
            <li>
              <Link target="_blank" href="https://www.facebook.com/ardsuhail" className="flex items-center gap-3 hover:text-blue-400 hover:underline transition-all duration-300">
                <FaFacebook className="w-5 h-5" />
                Facebook
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources / Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-lg">Resources</h3>
          <ul className="space-y-2 ">
            <li className="hover:text-white hover:underline"><Link href="/resume.pdf">Resume</Link></li>
            <li className="hover:text-white hover:underline"><Link href="/projects">Projects</Link></li>
            <li className="hover:text-white hover:underline">
              <a href="mailto:support@ardsuhail.com">support@ardsuhail.com</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="container mx-auto text-center border-t border-gray-700 mt-8 pt-5 text-sm text-gray-300">
        Copyright &copy; 2025 ardSuhail. All rights reserved.
      </div>
    </footer>
  );
}
