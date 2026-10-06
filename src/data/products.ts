import { Product } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_atelier_interior_1791272310771.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'acoustic-horizon-s1',
    name: 'Acoustic Horizon S1 Headphones',
    subtitle: 'Planar Magnetic Over-Ear Studio Monitors',
    category: 'audio',
    categoryLabel: 'Audio Hardware',
    price: 495,
    originalPrice: 550,
    rating: 4.9,
    reviewsCount: 42,
    inStock: true,
    stockCount: 8,
    isNew: true,
    isFeatured: true,
    images: [
      '/src/assets/images/product_acoustic_headphones_1791272328966.jpg',
      '/src/assets/images/product_sculptural_lamp_1791272342338.jpg'
    ],
    variants: [
      { id: 'obsidian-brass', name: 'Obsidian & Brushed Brass', inStock: true, colorHex: '#1c1917' },
      { id: 'titanium-grey', name: 'Raw Titanium Grey', inStock: true, colorHex: '#78716c' },
      { id: 'warm-cream', name: 'Alabaster Birch', inStock: false, colorHex: '#e7e5e4' }
    ],
    description: 'Precision-tuned planar magnetic transducers paired with milled aerospace aluminum and full-grain headband cushioning for uncompromised acoustic fidelity.',
    longDescription: 'The Acoustic Horizon S1 is crafted for discerning listeners, recording engineers, and purists. Featuring custom 50mm planar magnetic drivers engineered in Zurich, it reproduces frequencies from 10Hz to 45kHz with sub-0.05% harmonic distortion. The memory foam earcups are wrapped in perforated lambskin leather, creating an acoustic seal that breathes through marathon listening sessions.',
    features: [
      'Custom 50mm Planar Magnetic Diaphragm with Neodymium N52 Magnets',
      'Aircraft-grade milled aluminum chassis with satin brass hardware',
      'Removable oxygen-free copper cable with 3.5mm & 6.35mm gold-plated adapters',
      'Dual-density memory foam ear cushions with lambskin exterior',
      'Passive ambient isolation rated at -24dB'
    ],
    specs: {
      'Transducer Type': 'Planar Magnetic (50mm)',
      'Frequency Response': '10 Hz – 45,000 Hz',
      'Impedance': '32 Ohms at 1kHz',
      'Total Harmonic Distortion': '< 0.05% (1kHz, 100dB SPL)',
      'Weight': '365 grams (without cable)',
      'Cable Length': '2.0m braided OFC with 3.5mm termination'
    },
    materials: 'CNC-Machined 6061 Aluminum, Raw Brass Accents, Italian Lambskin Leather, Memory Foam',
    dimensions: '200mm × 185mm × 85mm',
    warranty: '5-Year Manufacturer Warranty against defects',
    sku: 'AL-AUD-0101',
    reviews: [
      {
        id: 'rev-1',
        author: 'Julian M., Sound Designer',
        rating: 5,
        date: 'September 2026',
        title: 'Breathtaking clarity across the mid-range',
        comment: 'These replace my reference Sennheisers for mix checks. The transient response is lightning quick, and the brass build feels like a bespoke heirloom object.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Elena Rostova',
        rating: 5,
        date: 'August 2026',
        title: 'Unbelievably comfortable for long studio hours',
        comment: 'The weight distribution across the headband is remarkable. Zero clamping fatigue even after four consecutive hours at the desk.',
        verified: true
      }
    ]
  },
  {
    id: 'lumen-eclipse-lamp',
    name: 'Lumen Eclipse Table Lamp',
    subtitle: 'Sculptural Solid Brass & Smoked Glass Luminaire',
    category: 'lighting',
    categoryLabel: 'Sculptural Lighting',
    price: 380,
    rating: 4.8,
    reviewsCount: 31,
    inStock: true,
    stockCount: 12,
    isNew: false,
    isFeatured: true,
    images: [
      '/src/assets/images/product_sculptural_lamp_1791272342338.jpg',
      '/src/assets/images/hero_atelier_interior_1791272310771.jpg'
    ],
    variants: [
      { id: 'brushed-brass', name: 'Brushed Satin Brass', inStock: true, colorHex: '#d97706' },
      { id: 'antique-bronze', name: 'Patinated Dark Bronze', inStock: true, colorHex: '#451a03' },
      { id: 'mirror-chrome', name: 'Polished Nickel', inStock: true, colorHex: '#94a3b8' }
    ],
    description: 'An architectural table lamp cast from solid brass with a hand-blown mouth-turned smoked glass diffuser casting warm 2200K sunset illumination.',
    longDescription: 'Drawing inspiration from Brutalist geometry and Danish modernism, the Lumen Eclipse is balanced around a weighted cylindrical brass base. A tactile stepless rotary dial on the base allows continuous dimming from ambient ember glow to reading luminance. Every glass dome is hand-blown by master glassworkers in Murano, ensuring subtle one-of-a-kind light refraction.',
    features: [
      'Hand-blown mouth-turned smoked borosilicate glass dome',
      'Solid virgin brass chassis with natural anti-tarnish micro-wax coating',
      'Smooth rotary brass dimmer (0% to 100% flicker-free stepless control)',
      'Integrated high-CRI (98+) warm LED module (2200K – 2700K warm tone)',
      'Braided rayon cord with solid brass plug casing'
    ],
    specs: {
      'Light Output': '650 Lumens (Equivalent to 60W incandescent)',
      'Color Temperature': '2200K – 2700K Warm Dimming',
      'CRI (Color Rendering)': '98.4 CRI',
      'Base Diameter': '140 mm',
      'Total Height': '380 mm',
      'Power Consumption': '9 Watts max (LED included)'
    },
    materials: 'Solid Virgin Brass, Hand-Blown Smoked Glass, Woven Rayon Power Cable',
    dimensions: '180mm W × 380mm H (4.2 kg)',
    warranty: '10-Year Structural & 3-Year Electrical Warranty',
    sku: 'AL-LGT-0202',
    reviews: [
      {
        id: 'rev-3',
        author: 'Christian W., Architect',
        rating: 5,
        date: 'July 2026',
        title: 'Transforms the room mood instantly',
        comment: 'The tactile feel of turning the brass dial is pure satisfaction. The warm light feels like candlelight filtered through smoke.',
        verified: true
      }
    ]
  },
  {
    id: 'chronos-calibre-04',
    name: 'Chronos Calibre 04 Chronograph',
    subtitle: 'Grade 5 Titanium Automatic Watch',
    category: 'horology',
    categoryLabel: 'Horology',
    price: 1250,
    originalPrice: 1400,
    rating: 5.0,
    reviewsCount: 19,
    inStock: true,
    stockCount: 4,
    isNew: true,
    isFeatured: true,
    images: [
      '/src/assets/images/product_chronograph_watch_1791272356624.jpg'
    ],
    variants: [
      { id: 'slate-strap', name: 'Slate Dial / Tuscan Calf Leather', inStock: true, colorHex: '#44403c' },
      { id: 'titanium-bracelet', name: 'Grade 5 Integrated Titanium Mesh', inStock: true, colorHex: '#a8a29e', priceModifier: 150 }
    ],
    description: 'An architectural mechanical chronograph housed in featherweight satin Grade 5 titanium, featuring double-domed sapphire and a 68-hour power reserve.',
    longDescription: 'The Calibre 04 strips chronograph horology down to mathematical purity. Powered by a modified Swiss automatic movement visible through an exhibition sapphire caseback, the dial balances matte slate registers against micro-beveled dauphine hands. Limited to 250 numbered pieces per production run.',
    features: [
      'Swiss Made Automatic Calibre AL-04 movement (28,800 vph)',
      '68-Hour power reserve with bi-directional tungsten rotor',
      'Grade 5 brushed titanium case with polished chamfers',
      'Double-domed sapphire crystal with 5-layer anti-reflective coating',
      'Water resistance to 10 ATM / 100 meters'
    ],
    specs: {
      'Case Diameter': '39.5 mm',
      'Lug-to-Lug': '46.0 mm',
      'Case Thickness': '11.8 mm',
      'Lug Width': '20 mm',
      'Water Resistance': '100m (10 ATM)',
      'Movement': 'Automatic Mechanical Chronograph, 27 Jewels'
    },
    materials: 'Grade 5 Titanium, Anti-Reflective Sapphire Crystal, Vegetable-Tanned Italian Leather',
    dimensions: '39.5mm diameter × 11.8mm depth',
    warranty: '5-Year International Atelier Warranty & Free First Servicing',
    sku: 'AL-HOR-0303',
    reviews: [
      {
        id: 'rev-4',
        author: 'Daniel Chen',
        rating: 5,
        date: 'October 2026',
        title: 'Flawless proportion on the wrist',
        comment: 'At 39.5mm and under 70 grams on the leather strap, it disappears on the wrist until you glance down at that immaculate slate dial. Remarkable value.',
        verified: true
      }
    ]
  },
  {
    id: 'siena-weekender-bag',
    name: 'Siena Full-Grain Leather Weekender',
    subtitle: 'Hand-Stitched Italian Vachetta Carryall',
    category: 'leather',
    categoryLabel: 'Leather & Travel',
    price: 640,
    rating: 4.9,
    reviewsCount: 28,
    inStock: true,
    stockCount: 9,
    isNew: false,
    isFeatured: true,
    images: [
      '/src/assets/images/product_leather_weekender_1791272378151.jpg'
    ],
    variants: [
      { id: 'cognac-tan', name: 'Aged Cognac Tan', inStock: true, colorHex: '#78350f' },
      { id: 'matte-black', name: 'Nero Black Oil Finish', inStock: true, colorHex: '#18181b' },
      { id: 'deep-olive', name: 'Tuscan Forest Olive', inStock: true, colorHex: '#365314' }
    ],
    description: 'A spacious, heirloom-grade travel duffle crafted from vegetable-tanned Tuscan leather, solid antique brass hardware, and heavy waterproof cotton canvas lining.',
    longDescription: 'Designed for effortless 3-to-5 day journeys, the Siena Weekender patinates into a rich, personal story with every flight and road trip. The structured base rests on five brass protective studs, while the dual-direction YKK Excella zippers glide with frictionless precision.',
    features: [
      'Full-grain vegetable-tanned Tuscan Vachetta cowhide (2.2mm thickness)',
      'Padded internal laptop compartment fits up to 16-inch devices',
      'Solid milled antique brass rivets and reinforcement plates',
      'Detachable ergonomic leather shoulder strap with wool padding',
      'Compliant with international commercial airline carry-on dimensions'
    ],
    specs: {
      'Volume Capacity': '42 Liters',
      'Dimensions': '520mm L × 280mm W × 300mm H',
      'Weight Empty': '1.85 kg',
      'Zippers': 'YKK Excella Solid Brass No. 8',
      'Lining': '12oz Heavy Waxed Cotton Canvas'
    },
    materials: 'Vegetable-Tanned Tuscan Cowhide, Solid Brass Hardware, Waxed Cotton Canvas',
    dimensions: '52cm × 28cm × 30cm',
    warranty: 'Lifetime Craftsmanship Guarantee',
    sku: 'AL-LEA-0404',
    reviews: [
      {
        id: 'rev-5',
        author: 'Marcus Aurelius K.',
        rating: 5,
        date: 'June 2026',
        title: 'Already aging with stunning depth',
        comment: 'Took this across Europe for three weeks. Smells sublime, fits in overhead bins like a glove, and gets compliments in every hotel lobby.',
        verified: true
      }
    ]
  },
  {
    id: 'wabi-kuro-vessel',
    name: 'Kuro Terracotta Ceramic Vessel',
    subtitle: 'Wood-Fired Artisanal Amphora Vase',
    category: 'living',
    categoryLabel: 'Artisanal Living',
    price: 210,
    originalPrice: 245,
    rating: 4.7,
    reviewsCount: 16,
    inStock: true,
    stockCount: 15,
    isNew: false,
    isFeatured: true,
    images: [
      '/src/assets/images/product_ceramic_vessel_1791272394740.jpg'
    ],
    variants: [
      { id: 'charcoal-matte', name: 'Charcoal Pit-Fired Matte', inStock: true, colorHex: '#262626' },
      { id: 'raw-terracotta', name: 'Unglazed Red Clay Ochre', inStock: true, colorHex: '#9a3412' }
    ],
    description: 'Wheel-thrown stoneware fired in an anagama wood kiln for 72 hours. Distinct ash patterns and tactile crater texture make every single vessel an individual sculpture.',
    longDescription: 'Created in collaboration with third-generation potter Kenjiro Sato in Shigaraki, Japan. Each vessel is shaped by hand on a kick wheel from high-iron stoneware, then glazed with wild clay slips before entering the wood kiln. The natural ash deposits create unpredictable organic mineral surfaces that cannot be replicated by factory kilns.',
    features: [
      'Hand-thrown on traditional kick wheel using Shigaraki mountain clay',
      '72-Hour continuous wood firing with pine ash deposition',
      'Watertight glazed interior for fresh floral arrangements',
      'Felt-padded underside prevents scratching on marble and timber',
      'Individually stamped with the master potter chop seal'
    ],
    specs: {
      'Height': '320 mm',
      'Maximum Diameter': '210 mm',
      'Neck Opening': '65 mm',
      'Firing Temperature': '1,280°C (Cone 10)',
      'Origin': 'Shigaraki, Shiga Prefecture, Japan'
    },
    materials: 'High-Iron Stoneware Clay, Natural Pine Wood Ash Glaze',
    dimensions: '210mm diameter × 320mm height (2.6 kg)',
    warranty: 'Safe Delivery Guarantee & Certificate of Provenance',
    sku: 'AL-LIV-0505',
    reviews: [
      {
        id: 'rev-6',
        author: 'Sora Tanaka',
        rating: 5,
        date: 'August 2026',
        title: 'A meditative centerpiece',
        comment: 'The tactile grain and dark ash gradient catch the afternoon light so peacefully. It looks just as striking holding dry branches as it does standing alone.',
        verified: true
      }
    ]
  },
  {
    id: 'monolith-brass-desk-pen',
    name: 'Monolith Precision Brass Desk Pen',
    subtitle: 'Balanced Solid Bar Stock Writing Instrument',
    category: 'living',
    categoryLabel: 'Artisanal Living',
    price: 135,
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
    stockCount: 22,
    isNew: true,
    isFeatured: false,
    images: [
      '/src/assets/images/product_sculptural_lamp_1791272342338.jpg'
    ],
    variants: [
      { id: 'raw-brass', name: 'Raw Machined Brass', inStock: true, colorHex: '#ca8a04' },
      { id: 'stealth-black', name: 'PVD Diamond DLC Black', inStock: true, colorHex: '#18181b' }
    ],
    description: 'Turned from a single solid cylinder of naval brass with zero threads and a micro-tolerance magnetic docking cradle.',
    longDescription: 'A tool designed to make signing documents and journaling an intentional ritual. Balanced precisely at the index grip point, it accepts world-standard Schmidt ceramic rollerball cartridges for silk-like ink flow.',
    features: [
      'CNC milled from solid lead-free C360 brass billet',
      'Weighted matching brass pedestal with neodymium alignment',
      'Equipped with Schmidt 5888 Ceramic Rollerball Refill (Germany)',
      'Subtle machined micro-knurling on the grip section'
    ],
    specs: {
      'Weight': '88 grams (Pen only: 48g, Base: 40g)',
      'Pen Length': '138 mm',
      'Pen Diameter': '11 mm',
      'Refill Type': 'Standard Euro / Schmidt 5888'
    },
    materials: 'Naval Grade Brass, Neodymium Magnet, Ceramic Ballpoint Tip',
    dimensions: '138mm × 11mm pen, 45mm base',
    warranty: 'Lifetime Mechanical Warranty',
    sku: 'AL-LIV-0606',
    reviews: [
      {
        id: 'rev-7',
        author: 'Hannah Vogel',
        rating: 5,
        date: 'July 2026',
        title: 'Weight and balance are extraordinary',
        comment: 'Sits proudly on my walnut desk. Picking it up to write feels deliberate and satisfying.',
        verified: true
      }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Artifacts' },
  { id: 'audio', label: 'Audio & Acoustics' },
  { id: 'lighting', label: 'Sculptural Lighting' },
  { id: 'horology', label: 'Horology' },
  { id: 'leather', label: 'Leather & Travel' },
  { id: 'living', label: 'Artisanal Living' }
] as const;
