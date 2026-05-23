const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function update() {
  const { data: current } = await supabase.from('cms_content').select('content').eq('id', 'page_media').single();
  const updatedContent = {
    ...current.content,
    packages_hero_image: '/assets/umrah_packages_hero.png'
  };

  const { data, error } = await supabase
    .from('cms_content')
    .update({ content: updatedContent })
    .eq('id', 'page_media')
    .select();

  console.log('Error:', error);
  console.log('Updated CMS page_media:', data);
}

update();
