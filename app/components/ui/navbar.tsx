import Link from "next/link";

export default function Navbar({ currentPage }: { currentPage?: string }) {
  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/User/careerpath", label: "Career Path" },
    { href: "/skills", label: "Skills" },
    { href: "/User/jobs", label: "Jobs" },
    { href: "/community", label: "Community" },
  ];

  return (
    <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-white font-bold text-xl">Pathwise</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  currentPage === link.label.toLowerCase()
                    ? "text-white font-medium"
                    : "text-gray-300 hover:text-white transition-colors"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-white font-medium">Alex Thompson</p>
              <p className="text-gray-400 text-sm">Software Developer</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">AT</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}