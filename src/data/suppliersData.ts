import { Supplier } from '@/components/dashboard/SupplierCard';

export interface RawMaterial {
  id: string;
  name: string;
  category: string;
  specifications: string;
  leadTime: string;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  price: string;
  minOrder: string;
}

export interface SupplierWithMaterials extends Supplier {
  materials: RawMaterial[];
  founded: string;
  employees: string;
  certifications: string[];
  website: string;
}

export const suppliersData: SupplierWithMaterials[] = [
  {
    id: '1',
    companyName: 'Steel Corp India',
    bio: 'Leading manufacturer of high-quality steel products with 25+ years of industry experience. Specialized in industrial-grade materials.',
    location: 'Mumbai, India',
    rating: 4.8,
    specialties: ['Carbon Steel', 'Stainless Steel', 'Alloy Steel', 'Tool Steel'],
    isConnected: true,
    connectionStatus: 'active',
    contactEmail: 'sales@steelcorp.in',
    contactPhone: '+91 22 1234 5678',
    materialsCount: 45,
    founded: '1998',
    employees: '500+',
    certifications: ['ISO 9001', 'ISO 14001', 'OHSAS 18001'],
    website: 'www.steelcorp.in',
    materials: [
      { id: 'm1', name: 'Carbon Steel Sheet', category: 'Sheet Metal', specifications: '2mm-10mm thickness, ASTM A36', leadTime: '5-7 days', stockStatus: 'in-stock', price: '$850/ton', minOrder: '5 tons' },
      { id: 'm2', name: 'Stainless Steel 304', category: 'Sheet Metal', specifications: '1mm-6mm, 2B finish', leadTime: '7-10 days', stockStatus: 'in-stock', price: '$2,400/ton', minOrder: '2 tons' },
      { id: 'm3', name: 'Galvanized Steel Coil', category: 'Coils', specifications: '0.5mm-2mm, Z275 coating', leadTime: '10-14 days', stockStatus: 'low-stock', price: '$1,100/ton', minOrder: '10 tons' },
      { id: 'm4', name: 'Tool Steel D2', category: 'Tool Steel', specifications: 'HRC 58-62, precision ground', leadTime: '14-21 days', stockStatus: 'in-stock', price: '$4,500/ton', minOrder: '500 kg' },
      { id: 'm5', name: 'Alloy Steel 4140', category: 'Alloy Steel', specifications: 'Normalized, Ø20-150mm', leadTime: '7-10 days', stockStatus: 'out-of-stock', price: '$1,800/ton', minOrder: '1 ton' },
    ]
  },
  {
    id: '2',
    companyName: 'Polymer Solutions Ltd',
    bio: 'Premium polymer and plastic raw material supplier serving automotive and electronics industries across Asia.',
    location: 'Singapore',
    rating: 4.6,
    specialties: ['Engineering Plastics', 'Elastomers', 'Thermoplastics', 'Composites'],
    isConnected: true,
    connectionStatus: 'active',
    contactEmail: 'info@polymersolutions.sg',
    contactPhone: '+65 6789 1234',
    materialsCount: 38,
    founded: '2005',
    employees: '200+',
    certifications: ['ISO 9001', 'IATF 16949'],
    website: 'www.polymersolutions.sg',
    materials: [
      { id: 'm6', name: 'ABS Plastic Pellets', category: 'Thermoplastics', specifications: 'High-impact grade, natural color', leadTime: '3-5 days', stockStatus: 'in-stock', price: '$2,100/ton', minOrder: '1 ton' },
      { id: 'm7', name: 'Nylon 66', category: 'Engineering Plastics', specifications: '30% glass-filled, heat stabilized', leadTime: '5-7 days', stockStatus: 'in-stock', price: '$4,800/ton', minOrder: '500 kg' },
      { id: 'm8', name: 'Polycarbonate Sheets', category: 'Sheets', specifications: '3mm-12mm, UV stabilized', leadTime: '7-10 days', stockStatus: 'low-stock', price: '$3,200/ton', minOrder: '200 kg' },
      { id: 'm9', name: 'EPDM Rubber', category: 'Elastomers', specifications: 'Shore A 60, weather resistant', leadTime: '10-14 days', stockStatus: 'in-stock', price: '$2,800/ton', minOrder: '500 kg' },
    ]
  },
  {
    id: '3',
    companyName: 'MetalWorks Germany',
    bio: 'German precision engineering meets high-quality metal fabrication. Trusted by automotive OEMs worldwide.',
    location: 'Stuttgart, Germany',
    rating: 4.9,
    specialties: ['Aluminum', 'Titanium', 'Precision Alloys', 'Metal Powders'],
    isConnected: false,
    contactEmail: 'contact@metalworks.de',
    contactPhone: '+49 711 123 4567',
    materialsCount: 62,
    founded: '1985',
    employees: '800+',
    certifications: ['ISO 9001', 'AS9100', 'NADCAP'],
    website: 'www.metalworks.de',
    materials: [
      { id: 'm10', name: 'Aluminum 6061-T6', category: 'Aluminum', specifications: 'Plate 10-100mm, aerospace grade', leadTime: '7-10 days', stockStatus: 'in-stock', price: '$3,500/ton', minOrder: '500 kg' },
      { id: 'm11', name: 'Titanium Grade 5', category: 'Titanium', specifications: 'Ti-6Al-4V, annealed', leadTime: '14-21 days', stockStatus: 'in-stock', price: '$28,000/ton', minOrder: '100 kg' },
      { id: 'm12', name: 'Inconel 718', category: 'Superalloys', specifications: 'Solution treated, Ø25-100mm', leadTime: '21-28 days', stockStatus: 'low-stock', price: '$45,000/ton', minOrder: '50 kg' },
    ]
  },
  {
    id: '4',
    companyName: 'ChemPure Industries',
    bio: 'Specialty chemicals and industrial compounds for manufacturing processes. ISO certified with global distribution.',
    location: 'Houston, USA',
    rating: 4.5,
    specialties: ['Industrial Chemicals', 'Solvents', 'Catalysts', 'Additives'],
    isConnected: true,
    connectionStatus: 'pending',
    contactEmail: 'sales@chempure.com',
    contactPhone: '+1 713 555 0123',
    materialsCount: 89,
    founded: '1992',
    employees: '350+',
    certifications: ['ISO 9001', 'ISO 14001', 'REACH'],
    website: 'www.chempure.com',
    materials: [
      { id: 'm13', name: 'Industrial Acetone', category: 'Solvents', specifications: '99.5% purity, tech grade', leadTime: '2-3 days', stockStatus: 'in-stock', price: '$1,200/ton', minOrder: '200L' },
      { id: 'm14', name: 'Sodium Hydroxide', category: 'Industrial Chemicals', specifications: '50% solution, membrane grade', leadTime: '3-5 days', stockStatus: 'in-stock', price: '$450/ton', minOrder: '1 ton' },
      { id: 'm15', name: 'Platinum Catalyst', category: 'Catalysts', specifications: '5% Pt on carbon', leadTime: '14-21 days', stockStatus: 'out-of-stock', price: '$8,500/kg', minOrder: '100g' },
    ]
  },
  {
    id: '5',
    companyName: 'EcoFiber Textiles',
    bio: 'Sustainable textile materials and eco-friendly fibers for the modern manufacturing industry.',
    location: 'Barcelona, Spain',
    rating: 4.4,
    specialties: ['Natural Fibers', 'Recycled Textiles', 'Technical Fabrics', 'Biodegradable Materials'],
    isConnected: false,
    contactEmail: 'hello@ecofiber.es',
    contactPhone: '+34 93 123 4567',
    materialsCount: 34,
    founded: '2010',
    employees: '150+',
    certifications: ['GOTS', 'OEKO-TEX', 'B Corp'],
    website: 'www.ecofiber.es',
    materials: [
      { id: 'm16', name: 'Organic Cotton Yarn', category: 'Natural Fibers', specifications: 'Ne 40/1, ring spun', leadTime: '7-10 days', stockStatus: 'in-stock', price: '$5/kg', minOrder: '100 kg' },
      { id: 'm17', name: 'Recycled Polyester', category: 'Recycled', specifications: '75D/36F, dope dyed', leadTime: '10-14 days', stockStatus: 'in-stock', price: '$3.50/kg', minOrder: '200 kg' },
      { id: 'm18', name: 'Hemp Fabric', category: 'Natural Fibers', specifications: '200gsm, natural color', leadTime: '14-21 days', stockStatus: 'low-stock', price: '$12/m', minOrder: '500m' },
    ]
  },
  {
    id: '6',
    companyName: 'Pacific Electronics Co',
    bio: 'Electronic components and semiconductor materials supplier with cutting-edge technology solutions.',
    location: 'Taipei, Taiwan',
    rating: 4.7,
    specialties: ['Semiconductors', 'PCB Materials', 'Electronic Components', 'Connectors'],
    isConnected: false,
    contactEmail: 'inquiry@pacificelec.tw',
    contactPhone: '+886 2 1234 5678',
    materialsCount: 156,
    founded: '1995',
    employees: '1000+',
    certifications: ['ISO 9001', 'ISO 14001', 'IECQ'],
    website: 'www.pacificelec.tw',
    materials: [
      { id: 'm19', name: 'FR-4 PCB Laminate', category: 'PCB Materials', specifications: '1.6mm, double-sided, 1oz Cu', leadTime: '5-7 days', stockStatus: 'in-stock', price: '$15/sheet', minOrder: '100 sheets' },
      { id: 'm20', name: 'Silicon Wafers', category: 'Semiconductors', specifications: '200mm, P-type, <100>', leadTime: '21-28 days', stockStatus: 'in-stock', price: '$85/wafer', minOrder: '25 wafers' },
      { id: 'm21', name: 'SMD Capacitors', category: 'Components', specifications: '0402, 100nF, X7R', leadTime: '3-5 days', stockStatus: 'in-stock', price: '$0.02/pc', minOrder: '10,000 pcs' },
    ]
  },
  {
    id: '7',
    companyName: 'Nordic Wood Products',
    bio: 'Premium Scandinavian wood and timber products. Sustainably sourced from certified forests.',
    location: 'Stockholm, Sweden',
    rating: 4.6,
    specialties: ['Hardwood', 'Softwood', 'Engineered Wood', 'Plywood'],
    isConnected: true,
    connectionStatus: 'active',
    contactEmail: 'sales@nordicwood.se',
    contactPhone: '+46 8 123 4567',
    materialsCount: 28,
    founded: '1975',
    employees: '400+',
    certifications: ['FSC', 'PEFC', 'ISO 14001'],
    website: 'www.nordicwood.se',
    materials: [
      { id: 'm22', name: 'Swedish Pine Lumber', category: 'Softwood', specifications: '50x150mm, kiln dried, graded', leadTime: '7-10 days', stockStatus: 'in-stock', price: '$450/m³', minOrder: '10 m³' },
      { id: 'm23', name: 'Birch Plywood', category: 'Plywood', specifications: '18mm, BB/BB, Baltic birch', leadTime: '10-14 days', stockStatus: 'in-stock', price: '$65/sheet', minOrder: '50 sheets' },
      { id: 'm24', name: 'Oak Veneer', category: 'Veneers', specifications: '0.6mm, quarter cut', leadTime: '14-21 days', stockStatus: 'low-stock', price: '$3.50/sqft', minOrder: '500 sqft' },
    ]
  },
  {
    id: '8',
    companyName: 'CeramTech Solutions',
    bio: 'Advanced ceramic materials and technical ceramics for high-performance industrial applications.',
    location: 'Osaka, Japan',
    rating: 4.8,
    specialties: ['Technical Ceramics', 'Refractory Materials', 'Ceramic Coatings', 'Advanced Materials'],
    isConnected: false,
    contactEmail: 'info@ceramtech.jp',
    contactPhone: '+81 6 1234 5678',
    materialsCount: 42,
    founded: '1988',
    employees: '300+',
    certifications: ['ISO 9001', 'ISO 14001', 'JIS'],
    website: 'www.ceramtech.jp',
    materials: [
      { id: 'm25', name: 'Alumina Ceramic', category: 'Technical Ceramics', specifications: '99.5% Al2O3, custom shapes', leadTime: '14-21 days', stockStatus: 'in-stock', price: '$120/kg', minOrder: '10 kg' },
      { id: 'm26', name: 'Silicon Carbide', category: 'Advanced Materials', specifications: 'Sintered, Ø10-100mm', leadTime: '21-28 days', stockStatus: 'in-stock', price: '$250/kg', minOrder: '5 kg' },
      { id: 'm27', name: 'Zirconia Powder', category: 'Powders', specifications: 'YSZ, 3mol% Y2O3 stabilized', leadTime: '10-14 days', stockStatus: 'out-of-stock', price: '$180/kg', minOrder: '25 kg' },
    ]
  },
];
