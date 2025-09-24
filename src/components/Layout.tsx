import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Industries', href: '/industries' },
  { name: 'Directory', href: '/directory' },
  { name: 'Contact', href: '/contact' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Don't show header on auth pages
  const isAuthPage = location.pathname.includes('/sign-in') || 
                     location.pathname.includes('/verify-company') || 
                     location.pathname.includes('/sign-up');

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Only show on non-auth pages */}
      {!isAuthPage && (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ChainLink Pro
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors relative ${
                    location.pathname === item.href
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-primary"
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/sign-in">
                <Button variant="ghost">
                  Sign In
                </Button>
              </Link>
              <Link to="/verify-company">
                <Button variant="hero">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="border-t border-border bg-background px-4 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block text-sm font-medium ${
                  location.pathname === item.href
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t border-border">
              <Link to="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="justify-start w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/verify-company" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="hero" className="justify-start w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </header>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}