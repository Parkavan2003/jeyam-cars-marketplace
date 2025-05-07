
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, ChevronRight, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

type NavItem = {
  title: string;
  href: string;
};

const navItems: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Cars', href: '/cars' },
  { title: 'Contact', href: '/contact' },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top contact bar */}
      <div className="bg-jeyam-blue text-white py-2 text-sm">
        <div className="container flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>+91 98765 43210</span>
            </div>
            <div className="hidden md:flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>123 Main Street, Trichy, Tamil Nadu</span>
            </div>
          </div>
          <div>
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to="/admin" className="hover:underline flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>Admin Dashboard</span>
                </Link>
                <button onClick={logout} className="hover:underline">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="hover:underline flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>Admin Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-jeyam-blue">
                Jeyam<span className="text-jeyam-amber">Cars</span>
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className={cn(
                    'font-medium transition-colors hover:text-jeyam-blue',
                    location.pathname === item.href
                      ? 'text-jeyam-blue'
                      : 'text-gray-600'
                  )}
                >
                  {item.title}
                </Link>
              ))}
              <Button asChild variant="default" className="bg-jeyam-blue hover:bg-jeyam-blue/90">
                <Link to="/cars">View All Cars</Link>
              </Button>
            </nav>

            {/* Mobile Navigation - Simple version for now */}
            <div className="md:hidden">
              <Button asChild variant="outline">
                <Link to="/cars">Browse Cars</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-jeyam-blue text-white pt-12 pb-6">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Jeyam Cars</h3>
              <p className="mb-4 text-gray-300">
                Your trusted source for quality pre-owned cars in Trichy. We offer the best selection of vehicles at competitive prices.
              </p>
              <div className="flex space-x-4">
                {/* Social media icons would go here */}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.title}>
                    <Link 
                      to={item.href}
                      className="flex items-center text-gray-300 hover:text-white transition-colors"
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <address className="not-italic text-gray-300 space-y-2">
                <p className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 mt-0.5" />
                  <span>123 Main Street, Trichy, Tamil Nadu - 620001</span>
                </p>
                <p className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>+91 98765 43210</span>
                </p>
              </address>
              <div className="mt-4">
                <h4 className="font-semibold mb-1">Business Hours</h4>
                <p className="text-gray-300">Mon - Sat: 9:00 AM - 7:00 PM</p>
                <p className="text-gray-300">Sunday: 10:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Jeyam Cars. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
