const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("ERROR: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const faqs = [
  { "id": 1, "question": "How much does Umrah cost from Pakistan?", "answer": "Umrah packages from Pakistan typically range from PKR 150,000 to PKR 500,000 depending on the package type (Economy, 3-Star, 4-Star, 5-Star), duration, and season. Ramadan and December packages may have different pricing.", "category": "Umrah Packages" },
  { "id": 2, "question": "How many days are required for Umrah?", "answer": "A standard Umrah journey typically takes 7 to 15 days. This includes 3-5 days in Makkah for Umrah rituals and Ziyarat, and 3-5 days in Madinah for prayers and visiting historical sites.", "category": "Umrah Packages" },
  { "id": 3, "question": "What is included in your Umrah packages?", "answer": "Our packages include Umrah visa processing, return air tickets, hotel accommodation, ground transportation, guided Ziyarat tours, and daily breakfast. Some premium packages also include lunch and dinner.", "category": "Umrah Packages" },
  { "id": 4, "question": "Can I customize my Umrah package?", "answer": "Yes, we offer customized Umrah packages tailored to your preferences. You can choose your preferred hotel, duration, travel dates, and additional services. Contact our team for a personalized quote.", "category": "Umrah Packages" },
  { "id": 5, "question": "What documents are required for Umrah visa?", "answer": "You will need a valid passport (minimum 6 months validity), passport-sized photos, vaccination certificates (Meningitis and COVID-19), return ticket, and hotel booking confirmation.", "category": "Visa Services" },
  { "id": 6, "question": "How long does visa processing take?", "answer": "Umrah visa processing typically takes 3-5 business days. Tourist visas for Saudi Arabia take 5-7 days, while Schengen visas may take 10-15 business days.", "category": "Visa Services" },
  { "id": 7, "question": "Can you help with visa rejection cases?", "answer": "Yes, our experienced team can assist with visa re-application and help address any issues that may have led to rejection. We provide guidance on improving your application.", "category": "Visa Services" },
  { "id": 8, "question": "Which hotels are near Haram in Makkah?", "answer": "We offer hotels at various distances from Haram, ranging from 50m (within Abraj Al Bait) to 1km. Our premium packages include hotels like Pullman Zamzam, Fairmont Clock Tower, and Swissotel Makkah.", "category": "Travel & Hotels" },
  { "id": 9, "question": "What airlines do you work with?", "answer": "We work with major airlines including PIA, Saudi Airlines, Emirates, Turkish Airlines, and Flydubai. Flight options depend on your departure city and travel dates.", "category": "Travel & Hotels" },
  { "id": 10, "question": "Is transportation included in the package?", "answer": "Yes, all our packages include ground transportation including airport transfers, intercity travel between Makkah and Madinah, and transportation for Ziyarat tours.", "category": "Travel & Hotels" },
  { "id": 11, "question": "What international tours do you offer?", "answer": "We offer curated tours to Turkey, Dubai, Malaysia, Europe, and other destinations. Each tour includes accommodation, transportation, guided tours, and select meals.", "category": "International Tours" },
  { "id": 12, "question": "Can I combine Umrah with an international tour?", "answer": "Yes, we offer combined packages that include Umrah followed by an international tour. Popular combinations include Umrah + Turkey and Umrah + Dubai.", "category": "International Tours" },
  { "id": 13, "question": "Are international tour packages customizable?", "answer": "Absolutely! We can customize international tour packages based on your preferences, including duration, destinations, hotels, and activities.", "category": "International Tours" }
];

async function seed() {
  console.log("Seeding cms_faq into cms_content...");
  
  const { data, error } = await supabase
    .from('cms_content')
    .upsert(
      { id: 'cms_faq', content: faqs, updated_at: new Date().toISOString() },
      { onConflict: 'id' }
    )
    .select();

  if (error) {
    console.error("Seeding failed:", error.message);
  } else {
    console.log("Seeding successful! Added 13 FAQs to cms_content under ID: cms_faq");
    console.log("Database Response:", data);
  }
}

seed();
