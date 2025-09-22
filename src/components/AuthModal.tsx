import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'signin' | 'signup' | 'verification';

const countries = [
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'SG', name: 'Singapore' },
  { code: 'AE', name: 'United Arab Emirates' },
];

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
    gstin: '',
    pan: '',
    registrationNumber: '',
    firstName: '',
    lastName: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isIndianCompany = selectedCountry === 'IN';

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <DialogHeader className="relative">
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-primary bg-clip-text text-transparent">
              {mode === 'signin' ? 'Welcome Back' : mode === 'signup' ? 'Join ChainLink Pro' : 'Company Verification'}
            </DialogTitle>
            <button
              onClick={onClose}
              className="absolute right-0 top-0 p-2 hover:bg-accent rounded-md"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {mode === 'signin' && (
              <motion.div
                key="signin"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4 py-4"
              >
                <div>
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
                <Button variant="hero" className="w-full" size="lg">
                  Sign In
                </Button>
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <button
                      onClick={() => setMode('signup')}
                      className="text-primary hover:underline font-medium"
                    >
                      Sign up
                    </button>
                  </span>
                </div>
              </motion.div>
            )}

            {mode === 'signup' && (
              <motion.div
                key="signup"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4 py-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Create a strong password"
                  />
                </div>
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Your Company Ltd."
                  />
                </div>
                <Button 
                  variant="secondary" 
                  className="w-full" 
                  size="lg"
                  onClick={() => setMode('verification')}
                >
                  Continue to Verification
                </Button>
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <button
                      onClick={() => setMode('signin')}
                      className="text-primary hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </span>
                </div>
              </motion.div>
            )}

            {mode === 'verification' && (
              <motion.div
                key="verification"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4 py-4"
              >
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {isIndianCompany ? (
                  <>
                    <div>
                      <Label htmlFor="gstin">GSTIN</Label>
                      <Input
                        id="gstin"
                        value={formData.gstin}
                        onChange={(e) => handleInputChange('gstin', e.target.value)}
                        placeholder="27AAPFU0939F1ZV"
                        maxLength={15}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        15-digit Goods and Services Tax Identification Number
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="pan">PAN</Label>
                      <Input
                        id="pan"
                        value={formData.pan}
                        onChange={(e) => handleInputChange('pan', e.target.value)}
                        placeholder="AAPFU0939F"
                        maxLength={10}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        10-character Permanent Account Number
                      </p>
                    </div>
                  </>
                ) : (
                  <div>
                    <Label htmlFor="registrationNumber">Company Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                      placeholder="Enter your company registration number"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Official registration number from your country's business registry
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button 
                    variant="ghost" 
                    className="flex-1"
                    onClick={() => setMode('signup')}
                  >
                    Back
                  </Button>
                  <Button variant="hero" className="flex-1" size="lg">
                    Complete Registration
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}