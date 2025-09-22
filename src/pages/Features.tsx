import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Smart Supplier Discovery',
    description: 'AI-powered matching system connects you with the perfect suppliers based on your specific requirements',
    benefits: [
      'Advanced filtering and search capabilities',
      'Verified supplier profiles with detailed information',
      'Real-time availability and capacity data',
      'Intelligent recommendations based on your needs'
    ]
  },
  {
    title: 'Real-time Collaboration',
    description: 'Seamless communication and project management tools for efficient supply chain coordination',
    benefits: [
      'Instant messaging and video conferencing',
      'Shared document repositories and version control',
      'Project timeline tracking and milestone management',
      'Multi-language support for global teams'
    ]
  },
  {
    title: 'Quality Assurance',
    description: 'Comprehensive quality control and inspection management system with digital documentation',
    benefits: [
      'Digital inspection checklists and reports',
      'Photo and video documentation capability',
      'Automated quality scoring and analytics',
      'Compliance tracking and certification management'
    ]
  },
  {
    title: 'Supply Chain Analytics',
    description: 'Advanced analytics and reporting tools provide deep insights into your supply chain performance',
    benefits: [
      'Real-time performance dashboards',
      'Predictive analytics for demand forecasting',
      'Cost optimization recommendations',
      'Risk assessment and mitigation strategies'
    ]
  }
];

const plans = [
  {
    name: 'Starter',
    price: '$49',
    period: '/month',
    description: 'Perfect for small businesses getting started',
    features: [
      'Up to 10 supplier connections',
      'Basic search and filtering',
      'Email support',
      'Standard analytics dashboard',
      'Mobile app access'
    ]
  },
  {
    name: 'Professional',
    price: '$149',
    period: '/month',
    description: 'Ideal for growing companies',
    features: [
      'Up to 100 supplier connections',
      'Advanced search with AI matching',
      'Priority email and chat support',
      'Advanced analytics and reporting',
      'API access',
      'Quality management tools',
      'Multi-user collaboration'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations with complex needs',
    features: [
      'Unlimited supplier connections',
      'Custom AI model training',
      '24/7 dedicated support',
      'White-label solutions',
      'Advanced integration capabilities',
      'Custom reporting and analytics',
      'Dedicated account manager',
      'SLA guarantees'
    ]
  }
];

export default function Features() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Powerful Features for Modern Supply Chains
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover how ChainLink Pro's comprehensive suite of tools can transform your supply chain operations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Detail Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex-1 space-y-6">
                  <h3 className="text-3xl font-bold">{feature.title}</h3>
                  <p className="text-lg text-muted-foreground">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <motion.li
                        key={benefitIndex}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: benefitIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckIcon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="w-full h-80 bg-gradient-secondary rounded-xl shadow-secondary flex items-center justify-center">
                    <span className="text-white/80 text-lg font-medium">Feature Demo</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-muted-foreground">
              Select the perfect plan for your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`relative p-8 rounded-xl border transition-all duration-300 hover:shadow-elegant ${
                  plan.popular 
                    ? 'border-primary bg-card shadow-primary scale-105' 
                    : 'border-border bg-card hover:border-primary/50'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-primary text-white hover:shadow-primary'
                      : 'border border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}