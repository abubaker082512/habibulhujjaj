const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('ERROR: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not defined in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const tours = [
  {
    title: 'Turkey Tour',
    subtitle: 'Istanbul, Cappadocia, Antalya',
    description: 'Discover the rich history and stunning landscapes of Turkey. From the Blue Mosque to hot air balloons in Cappadocia.',
    price: 285000,
    duration: '10 Days / 9 Nights',
    image_url: '/assets/gallery images/Turkey tour.jpg',
    highlights: ['Blue Mosque', 'Cappadocia', 'Grand Bazaar', 'Pamukkale']
  },
  {
    title: 'Dubai Tour',
    subtitle: 'Dubai, Abu Dhabi, Sharjah',
    description: 'Experience the dazzling city of Dubai with desert safaris, Burj Khalifa, and luxury shopping.',
    price: 195000,
    duration: '7 Days / 6 Nights',
    image_url: '/assets/gallery images/Dubai tour.jpg',
    highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Frame', 'Sheikh Zayed Mosque']
  },
  {
    title: 'Malaysia Tour',
    subtitle: 'Kuala Lumpur, Genting, Penang',
    description: 'Explore the vibrant culture and natural beauty of Malaysia from the Petronas Towers to Genting Highlands.',
    price: 175000,
    duration: '8 Days / 7 Nights',
    image_url: '/assets/Malaysia.jpg',
    highlights: ['Petronas Towers', 'Genting Highlands', 'Batu Caves', 'Gurney Drive']
  },
  {
    title: 'Europe Tour',
    subtitle: 'Paris, Swiss, Rome',
    description: 'A grand European adventure covering the most iconic cities and landscapes of the continent.',
    price: 550000,
    duration: '12 Days / 11 Nights',
    image_url: '/assets/Europe.jpg',
    highlights: ['Eiffel Tower', 'Swiss Alps', 'Colosseum', 'Lucerne']
  },
  {
    title: 'Singapore Tour',
    subtitle: 'Sentosa Island, Gardens by the Bay',
    description: 'Experience the futuristic city-state of Singapore. Complete with tropical luxury, Sentosa beaches, and stunning high-tech gardens.',
    price: 210000,
    duration: '6 Days / 5 Nights',
    image_url: '/assets/singapore_tour.png',
    highlights: ['Gardens by the Bay', 'Universal Studios', 'Sentosa Island', 'Marina Bay Sands']
  },
  {
    title: 'Thailand Tour',
    subtitle: 'Bangkok, Pattaya, Phuket',
    description: 'Embark on a tropical escapade in Thailand. Discover golden temples in Bangkok, vibrant beaches in Phuket, and legendary street foods.',
    price: 165000,
    duration: '8 Days / 7 Nights',
    image_url: '/assets/thailand_tour.png',
    highlights: ['Grand Palace', 'Phi Phi Islands', 'Pattaya Floating Market', 'Coral Island']
  },
  {
    title: 'Baku Tour',
    subtitle: 'Baku City, Gabala, Quba',
    description: 'Explore Azerbaijan—where East meets West. Discover the modern Flame Towers, the UNESCO heritage Old City, and the majestic Caucasus mountains.',
    price: 185000,
    duration: '7 Days / 6 Nights',
    image_url: '/assets/baku_tour.png',
    highlights: ['Flame Towers', 'Old City (Icherisheher)', 'Nizami Street', 'Nohur Lake']
  },
  {
    title: 'Maldives Tour',
    subtitle: 'Male Atoll Luxury Resorts',
    description: 'Escape to the ultimate paradise. Relax in premium overwater bungalows, swim in turquoise crystal waters, and dine under starlight.',
    price: 395000,
    duration: '5 Days / 4 Nights',
    image_url: '/assets/maldives_tour.png',
    highlights: ['Overwater Bungalows', 'Snorkeling & Diving', 'Sandbank Picnic', 'Sunset Cruise']
  }
];

const visas = [
  {
    title: 'Umrah Visa',
    description: 'Specialized visa processing for pilgrims traveling to Saudi Arabia for Umrah rituals. We handle all documentation and government approvals.',
    processing_time: '3-5 Business Days',
    fee: 'PKR 15,000',
    icon: 'mosque',
    documents: ['Valid Passport', 'Passport Photos', 'Vaccination Certificate', 'Travel Itinerary']
  },
  {
    title: 'Saudi Tourist Visa',
    description: 'Explore the Kingdom of Saudi Arabia with our tourist visa services. Discover historical sites, modern cities, and cultural heritage.',
    processing_time: '5-7 Business Days',
    fee: 'PKR 12,000',
    icon: 'flight',
    documents: ['Valid Passport', 'Passport Photos', 'Hotel Booking', 'Return Ticket']
  },
  {
    title: 'Dubai Visa',
    description: 'Visit the dazzling city of Dubai with our streamlined visa processing. Perfect for tourism, business, or transit.',
    processing_time: '3-5 Business Days',
    fee: 'PKR 8,000',
    icon: 'apartment',
    documents: ['Valid Passport', 'Passport Photos', 'Bank Statement', 'Hotel Booking']
  },
  {
    title: 'Turkey Visa',
    description: 'Discover the rich history and stunning landscapes of Turkey. Our team ensures a hassle-free visa application process.',
    processing_time: '7-10 Business Days',
    fee: 'PKR 18,000',
    icon: 'travel_explore',
    documents: ['Valid Passport', 'Passport Photos', 'Travel Insurance', 'Proof of Accommodation']
  },
  {
    title: 'Schengen Visa',
    description: 'Travel across 27 European countries with a single Schengen visa. We guide you through the complex application process.',
    processing_time: '10-15 Business Days',
    fee: 'PKR 25,000',
    icon: 'globe',
    documents: ['Valid Passport', 'Passport Photos', 'Travel Insurance', 'Bank Statements', 'Cover Letter']
  },
  {
    title: 'UK Standard Visitor Visa',
    description: 'Travel to the United Kingdom for leisure, business, or family visits. We assist with application drafting, document audit, and appointment booking.',
    processing_time: '15-20 Business Days',
    fee: 'PKR 45,000',
    icon: 'home',
    documents: ['Valid Passport', 'Passport Photos', 'Bank Statements (6 Months)', 'Employment Proof', 'Travel Plan']
  },
  {
    title: 'Malaysia Tourist eVisa',
    description: 'Quick electronic tourist visa for Malaysia. Complete paperless process with direct online government submission.',
    processing_time: '2-3 Business Days',
    fee: 'PKR 9,500',
    icon: 'layers',
    documents: ['Valid Passport', 'Passport Photos', 'Flight Bookings', 'Hotel Confirmation']
  },
  {
    title: 'Singapore Tourist eVisa',
    description: 'Streamlined online tourist visa for Singapore. Fast document evaluation and high-success rate visa submission.',
    processing_time: '4-5 Business Days',
    fee: 'PKR 11,500',
    icon: 'local_airport',
    documents: ['Valid Passport', 'Passport Photos', 'Bank Statement', 'Hotel Reservation', 'Letter of Introduction']
  }
];

async function seed() {
  try {
    console.log('Seeding Supabase database...');

    // 1. Clear existing tours
    console.log('Clearing existing tours...');
    const { error: clearToursErr } = await supabase.from('tours').delete().neq('title', 'placeholder-value-to-allow-all');
    if (clearToursErr) throw clearToursErr;

    // 2. Insert new tours
    console.log('Inserting 8 premium international tours...');
    const { data: insertedTours, error: insertToursErr } = await supabase.from('tours').insert(tours).select();
    if (insertToursErr) throw insertToursErr;
    console.log(`Successfully seeded ${insertedTours.length} international tours!`);

    // 3. Clear existing visas
    console.log('Clearing existing visa services...');
    const { error: clearVisasErr } = await supabase.from('visa_services').delete().neq('title', 'placeholder-value-to-allow-all');
    if (clearVisasErr) throw clearVisasErr;

    // 4. Insert new visas
    console.log('Inserting 8 premium visa services...');
    const { data: insertedVisas, error: insertVisasErr } = await supabase.from('visa_services').insert(visas).select();
    if (insertVisasErr) throw insertVisasErr;
    console.log(`Successfully seeded ${insertedVisas.length} visa services!`);

    console.log('Database seeding completed successfully!');
  } catch (err) {
    console.error('CRITICAL ERROR DURING SEEDING:', err.message);
    process.exit(1);
  }
}

seed();
