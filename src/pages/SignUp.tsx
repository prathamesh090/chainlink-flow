import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const businessTypes = [
  'Manufacturing',
  'Trading',
  'Service Provider',
  'Retail',
  'Wholesale',
  'Import/Export',
  'Technology',
  'Consulting',
  'Other'
];

const industries = [
  'Automotive',
  'Electronics',
  'Textiles & Apparel',
  'Pharmaceuticals',
  'Food & Beverage',
  'Chemical',
  'Machinery',
  'Construction',
  'Energy',
  'Healthcare',
  'Aerospace',
  'Agriculture',
  'Other'
];

export default function SignUp() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formData, setFormData] = useState({
    // Company fields
    companyName: '',
    businessType: '',
    industry: '',
    companyLocation: '',
    
    // Admin fields
    fullName: '',
    workEmail: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate('/verify-company');
    } else {
      setCurrentStep(1);
    }
  };

  const handleSubmit = () => {
    // Simulate account creation
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ChainLink Pro
            </span>
          </Link>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-accent/50 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-primary">Verification</span>
            </div>
            <div className="w-16 h-0.5 bg-primary" />
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-primary">Sign-Up</span>
            </div>
            <div className="w-16 h-0.5 bg-border" />
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-border text-sm font-medium text-muted-foreground">
                3
              </div>
              <span className="ml-2 text-sm font-medium text-muted-foreground">Dashboard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-lg border border-border p-8 shadow-sm"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Complete Your Setup
              </h1>
              <p className="text-muted-foreground">
                Step {currentStep} of 2: {currentStep === 1 ? 'Company Information' : 'Admin Account'}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex space-x-2">
                <div className={`flex-1 h-2 rounded-full ${currentStep >= 1 ? 'bg-primary' : 'bg-border'}`} />
                <div className={`flex-1 h-2 rounded-full ${currentStep >= 2 ? 'bg-primary' : 'bg-border'}`} />
              </div>
            </div>

            {currentStep === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="companyName">Company / Organization Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Your Company Ltd."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="companyLocation">Company Location</Label>
                  <Input
                    id="companyLocation"
                    value={formData.companyLocation}
                    onChange={(e) => handleInputChange('companyLocation', e.target.value)}
                    placeholder="City, State/Province, Country"
                    className="mt-1"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="John Doe"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="workEmail">Work Email</Label>
                  <Input
                    id="workEmail"
                    type="email"
                    value={formData.workEmail}
                    onChange={(e) => handleInputChange('workEmail', e.target.value)}
                    placeholder="john@company.com"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Create a strong password"
                    className="mt-1"
                  />
                  <div className="mt-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full ${
                            passwordStrength >= level
                              ? passwordStrength <= 2
                                ? 'bg-red-500'
                                : passwordStrength <= 3
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                              : 'bg-border'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum 8 characters with uppercase, lowercase, number and special character
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    className="mt-1"
                  />
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                  )}
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm leading-relaxed"
                  >
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </Label>
                </div>
              </motion.div>
            )}

            <div className="flex justify-between pt-8">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                <span>Back</span>
              </Button>
              
              {currentStep === 1 ? (
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-primary hover:opacity-90 transition-opacity duration-300"
                  size="lg"
                >
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue
                  </motion.span>
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={!agreeToTerms}
                  className="bg-gradient-primary hover:opacity-90 transition-opacity duration-300"
                  size="lg"
                >
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Create Account
                  </motion.span>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}