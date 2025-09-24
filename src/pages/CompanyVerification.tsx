import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckIcon, DocumentArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';

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

export default function CompanyVerification() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    gstin: '',
    pan: '',
    registrationNumber: '',
  });

  const isIndianCompany = selectedCountry === 'IN';

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files].slice(0, 4));
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleVerification = () => {
    // Simulate verification process
    setTimeout(() => {
      navigate('/sign-up');
    }, 1000);
  };

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
                1
              </div>
              <span className="ml-2 text-sm font-medium text-primary">Verification</span>
            </div>
            <div className="w-16 h-0.5 bg-border" />
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-border text-sm font-medium text-muted-foreground">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-muted-foreground">Sign-Up</span>
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
                Company Verification
              </h1>
              <p className="text-muted-foreground">
                We need to verify your company before creating your account
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <Label htmlFor="country">Country</Label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center space-x-2">
                          <span>{country.name}</span>
                        </div>
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
                      className="mt-1 font-mono"
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
                      className="mt-1 font-mono"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      10-character Permanent Account Number
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="registrationNumber">Company Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                      placeholder="Enter your company registration number"
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Official registration number from your country's business registry
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="documents">Supporting Documents (2-4 files required)</Label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <input
                        id="documents"
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('documents')?.click()}
                        >
                          Choose Files ({uploadedFiles.length}/4)
                        </Button>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Upload business license, tax documents, or other verification documents
                      </p>
                    </div>
                    
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                            <div className="flex items-center space-x-3">
                              <CheckIcon className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium truncate">{file.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="p-1 hover:bg-destructive/20 rounded"
                            >
                              <XMarkIcon className="h-4 w-4 text-destructive" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="flex justify-between pt-6">
                <Link to="/sign-in">
                  <Button variant="ghost">
                    Already have an account?
                  </Button>
                </Link>
                <Button 
                  type="button"
                  onClick={handleVerification}
                  className="bg-gradient-primary hover:opacity-90 transition-opacity duration-300"
                  size="lg"
                >
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Verify & Continue
                  </motion.span>
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}