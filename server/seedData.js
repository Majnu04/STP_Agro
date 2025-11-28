require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Sample products data
const sampleProducts = [
  {
    name: "Organic Neem Fertilizer",
    description: "100% organic neem-based fertilizer perfect for all types of crops. Enhances soil health and provides natural pest control.",
    category: "Fertilizers",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500",
    stock: 150,
    brand: "EcoGrow",
    rating: 4.5,
    reviews: 128,
    weight: "1kg",
    isOrganic: true,
    isFeatured: true,
    crops: ["Rice", "Wheat", "Vegetables"],
    features: ["100% Organic", "Pest Control", "Soil Enrichment"]
  },
  {
    name: "NPK Complex Fertilizer 19-19-19",
    description: "Balanced NPK fertilizer for optimal plant growth. Suitable for all crops during vegetative stage.",
    category: "Fertilizers",
    price: 450,
    originalPrice: 550,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500",
    stock: 200,
    brand: "AgroMax",
    rating: 4.7,
    reviews: 256,
    weight: "5kg",
    isFeatured: true,
    crops: ["All Crops"],
    features: ["Balanced NPK", "Quick Results", "All Crops"]
  },
  {
    name: "BT Cotton Seeds",
    description: "High-yield BT cotton seeds with pest resistance. Certified by government agriculture department.",
    category: "Seeds",
    price: 850,
    originalPrice: 1000,
    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=500",
    stock: 80,
    brand: "SeedMaster",
    rating: 4.8,
    reviews: 89,
    weight: "500g",
    isFeatured: true,
    crops: ["Cotton"],
    features: ["BT Technology", "Pest Resistant", "High Yield"]
  },
  {
    name: "Hybrid Tomato Seeds F1",
    description: "Premium F1 hybrid tomato seeds for commercial farming. Disease resistant and high yielding.",
    category: "Seeds",
    price: 380,
    originalPrice: 450,
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=500",
    stock: 120,
    brand: "VeggiePro",
    rating: 4.6,
    reviews: 145,
    weight: "100g",
    crops: ["Tomato"],
    features: ["F1 Hybrid", "Disease Resistant", "High Yield"]
  },
  {
    name: "Systemic Insecticide",
    description: "Broad spectrum systemic insecticide for effective pest control on all major crops.",
    category: "Pesticides",
    price: 320,
    originalPrice: 400,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500",
    stock: 100,
    brand: "PestAway",
    rating: 4.4,
    reviews: 98,
    weight: "500ml",
    crops: ["All Crops"],
    features: ["Systemic Action", "Long Lasting", "Broad Spectrum"]
  },
  {
    name: "Organic Neem Oil Pesticide",
    description: "Natural neem oil based pesticide. Safe for organic farming and environment friendly.",
    category: "Pesticides",
    price: 280,
    originalPrice: 350,
    image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=500",
    stock: 150,
    brand: "NatureCare",
    rating: 4.5,
    reviews: 167,
    weight: "1L",
    isOrganic: true,
    isFeatured: true,
    crops: ["All Crops"],
    features: ["100% Organic", "Eco-Friendly", "Safe for Crops"]
  },
  {
    name: "Battery Operated Sprayer",
    description: "16L capacity battery sprayer with adjustable nozzle. Perfect for medium-sized farms.",
    category: "Tools",
    price: 2500,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1416339442236-8ceb164046f8?w=500",
    stock: 35,
    brand: "FarmTech",
    rating: 4.6,
    reviews: 78,
    unit: "piece",
    features: ["16L Capacity", "Battery Operated", "Adjustable Nozzle"]
  },
  {
    name: "Garden Pruning Shears",
    description: "Professional grade pruning shears with ergonomic handle. Ideal for trimming and pruning.",
    category: "Tools",
    price: 450,
    originalPrice: 600,
    image: "https://images.unsplash.com/photo-1416339134316-0e91dc9ded92?w=500",
    stock: 60,
    brand: "GardenPro",
    rating: 4.7,
    reviews: 92,
    unit: "piece",
    features: ["Ergonomic Design", "Sharp Blades", "Durable"]
  },
  {
    name: "Vermicompost Organic Manure",
    description: "Premium quality vermicompost rich in nutrients. Improves soil structure and water retention.",
    category: "Organic",
    price: 180,
    originalPrice: 250,
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500",
    stock: 200,
    brand: "OrganicFarm",
    rating: 4.8,
    reviews: 234,
    weight: "5kg",
    isOrganic: true,
    isFeatured: true,
    crops: ["All Crops"],
    features: ["100% Organic", "Nutrient Rich", "Improves Soil"]
  },
  {
    name: "Bio Fertilizer Rhizobium",
    description: "Nitrogen fixing bio-fertilizer for legume crops. Enhances natural nitrogen availability.",
    category: "Organic",
    price: 220,
    originalPrice: 280,
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500",
    stock: 90,
    brand: "BioGrow",
    rating: 4.5,
    reviews: 67,
    weight: "250g",
    isOrganic: true,
    crops: ["Legumes", "Pulses"],
    features: ["Nitrogen Fixing", "Organic", "Eco-Friendly"]
  },
  {
    name: "Potassium Sulphate Fertilizer",
    description: "Water-soluble potassium fertilizer for flowering and fruiting stage. Low salt index.",
    category: "Fertilizers",
    price: 380,
    originalPrice: 480,
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500",
    stock: 110,
    brand: "NutriCrop",
    rating: 4.6,
    reviews: 89,
    weight: "1kg",
    crops: ["Fruits", "Vegetables"],
    features: ["Water Soluble", "Low Salt", "High Quality"]
  },
  {
    name: "Hybrid Chilli Seeds",
    description: "High yielding hybrid chilli seeds with excellent disease resistance and uniformity.",
    category: "Seeds",
    price: 290,
    originalPrice: 350,
    image: "https://images.unsplash.com/photo-1583838812322-62a82b0a785b?w=500",
    stock: 75,
    brand: "SpiceSeed",
    rating: 4.5,
    reviews: 56,
    weight: "50g",
    crops: ["Chilli"],
    features: ["High Yield", "Disease Resistant", "Uniform Size"]
  }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Connected');

    // Clear existing products
    await Product.deleteMany();
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`✅ Added ${sampleProducts.length} sample products`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
