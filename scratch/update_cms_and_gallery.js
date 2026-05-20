const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("ERROR: SUPABASE_URL and SUPABASE_KEY / SUPABASE_SERVICE_ROLE_KEY are required.");
  console.log("Please run this script passing environment variables. Example:");
  console.log("npx env-cmd -f client/.env node scratch/update_cms_and_gallery.js");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Connecting to Supabase at:", supabaseUrl);

  // 1. Update CMS page_media
  console.log("\n--- Updating CMS page_media ---");
  const { data: cmsData, error: cmsFetchError } = await supabase
    .from('cms_content')
    .select('*')
    .eq('id', 'page_media')
    .single();

  let currentContent = {};
  if (cmsData && cmsData.content) {
    currentContent = cmsData.content;
    console.log("Found existing page_media content.");
  } else {
    console.log("No existing page_media content found, creating a new one.");
  }

  const updatedContent = {
    ...currentContent,
    packages_hero_image: "/assets/umrah-packages-hero.webp",
    visa_hero_image: "/assets/visa services hero.jpg",
    gallery_hero_image: "/assets/gallery hero.webp",
    blog_hero_image: "/assets/blogs hero.webp",
    about_hero_image: "/assets/about us hero.webp",
    about_section_image: "/assets/about us 1.jpg",
    contact_hero_image: "/assets/contact us.png"
  };

  const { error: cmsUpsertError } = await supabase
    .from('cms_content')
    .upsert({
      id: 'page_media',
      content: updatedContent,
      updated_at: new Date().toISOString()
    });

  if (cmsUpsertError) {
    console.error("Error upserting page_media:", cmsUpsertError.message);
  } else {
    console.log("Successfully updated page_media hero and section background images in database!");
  }

  // 2. Update Gallery images
  console.log("\n--- Updating Gallery Images ---");
  console.log("Deleting existing gallery items...");
  const { error: deleteError } = await supabase
    .from('gallery')
    .delete()
    .neq('src', 'KEEP_STUB_IF_ANY'); // Delete all

  if (deleteError) {
    console.error("Error deleting old gallery items:", deleteError.message);
  }

  const newGalleryItems = [
    { src: '/assets/gallery images/1.png', label: 'Sanctity of the Holy Kaaba', category: 'Kaaba', type: 'wide' },
    { src: '/assets/gallery images/2.jpg', label: 'Elegance of Masjid Al-Haram', category: 'Kaaba', type: 'tall' },
    { src: '/assets/gallery images/3.jpg', label: 'Medina Al-Munawwarah Peace', category: 'Masjid Nabawi', type: 'standard' },
    { src: '/assets/gallery images/4.webp', label: 'Spires of Devotion', category: 'Masjid Nabawi', type: 'standard' },
    { src: '/assets/gallery images/5.avif', label: 'Holy Ziyarat Pilgrimage', category: 'Ziyarat', type: 'tall' },
    { src: '/assets/gallery images/6.jpg', label: 'Blessed Moments of Hujjaj', category: 'Umrah Groups', type: 'wide' },
    { src: '/assets/gallery images/7.webp', label: 'Sacred Sites Ziyarat', category: 'Ziyarat', type: 'standard' },
    { src: '/assets/gallery images/8.webp', label: 'Pilgrim Groups', category: 'Umrah Groups', type: 'standard' },
    { src: '/assets/gallery images/9.webp', label: 'Masjid Nabawi Umrah Group', category: 'Umrah Groups', type: 'wide' },
    { src: '/assets/gallery images/10.jpg', label: 'Spiritual Ziyarat Sights', category: 'Ziyarat', type: 'standard' }
  ];

  console.log("Inserting 10 new gallery items...");
  const { error: insertError } = await supabase
    .from('gallery')
    .insert(newGalleryItems);

  if (insertError) {
    console.error("Error inserting new gallery items:", insertError.message);
  } else {
    console.log("Successfully inserted 10 new gallery items into database!");
  }
}

run().catch(err => {
  console.error("Unhandled error running script:", err);
});
