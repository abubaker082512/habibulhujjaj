import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const blogPosts = [
  {
    id: 1,
    title: 'How to Perform Umrah – A Complete Step-by-Step Guide',
    excerpt: 'Performing Umrah is a deeply spiritual journey that allows Muslims to seek closeness to Allah, ask for forgiveness, and renew their faith. This guide will walk you through the complete process.',
    category: 'Guides',
    date: 'April 22, 2026',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1572949645079-6416a599c6ae?w=800',
    content: `Performing Umrah is a deeply spiritual journey that allows Muslims to seek closeness to Allah, ask for forgiveness, and renew their faith. Although it is not obligatory like Hajj, Umrah holds great significance and reward in Islam.

This guide will walk you through the complete process of performing Umrah in a clear and authentic way.

What is Umrah?
Umrah is a pilgrimage to Makkah that can be performed at any time of the year. It consists of a set of sacred rituals carried out in and around the Holy Kaaba.

Step-by-Step Guide to Performing Umrah

1. Entering the State of Ihram
Before reaching Makkah, pilgrims must enter the sacred state of Ihram.
Key steps:
- Perform Ghusl (full body purification)
- Wear Ihram clothing:
  o Men: Two white unstitched sheets
  o Women: Modest Islamic dress (no specific color required)
- Make the intention (Niyyah) for Umrah
- Recite the Talbiyah:
"Labbayk Allahumma Labbayk, Labbayka La Sharika Laka Labbayk…"
Continue reciting Talbiyah until you reach the Kaaba.

2. performing Tawaf (Circling the Kaaba)
Upon entering Masjid al-Haram, proceed towards the Kaaba.
Steps of Tawaf:
- Begin at the Black Stone (Hajr al-Aswad)
- Make 7 anti-clockwise circles around the Kaaba
- Men should uncover their right shoulder (Idtiba) during Tawaf
- Try to kiss or point towards the Black Stone if possible
- Engage in dua, dhikr, and Quran recitation throughout
After completing Tawaf, offer 2 Rak'ah Salah near Maqam Ibrahim (if possible).

3. Drinking Zamzam Water
After Salah, drink Zamzam water and make heartfelt duas. It is a blessed water and a Sunnah of the Prophet ﷺ.

4. Performing Sa'i (Between Safa and Marwah)
Next, perform Sa'i between the hills of Safa and Marwah.
Steps:
- Start at Safa and make dua
- Walk towards Marwah
- This counts as one round
- Complete 7 rounds (ending at Marwah)
Men should jog lightly between the green markers.

5. Halq or Taqsir (Hair Cutting)
After completing Sa'i:
- Men: Shave head completely (Halq) OR trim hair (Taqsir)
- Women: Cut a small portion of hair (about a fingertip length)
This step marks the completion of Umrah.

Important Tips for Pilgrims
- Stay in a state of purity (Wudu) as much as possible
- Avoid arguments and maintain good character
- Respect the sacredness of the Haram
- Make abundant dua for yourself and others
- Follow the Sunnah in all actions

Common Mistakes to Avoid in Umrah
- Not making proper Niyyah
- Pushing or hurting others during Tawaf
- Skipping Sunnah acts
- Not learning duas

Umrah Preparation Tips
- Keep Ihram ready before Miqat
- Carry comfortable footwear
- Stay hydrated
- Keep a small dua book

Spiritual Benefits of Umrah
Umrah is a chance to purify your soul and seek forgiveness.
The Prophet ﷺ said:
"Umrah removes the sins between one Umrah and another."

Why Choose Habibulhujaj Umrah & Travels?
At Habibulhujaj Umrah & Travels, we make your journey simple and stress-free.
- Affordable Packages
- Visa Assistance
- Comfortable Hotels
- Complete Guidance
Contact us today to book your Umrah package.

Conclusion
Now that you know how to perform Umrah step by step, you can prepare confidently for this blessed journey. Always perform each step with sincerity and devotion.
May Allah accept your Umrah. Ameen.`
  }
]

const BlogPost = () => {
  const { id } = useParams()
  const post = blogPosts.find(p => p.id === parseInt(id))

  if (!post) {
    return (
      <div className="bg-surface font-manrope text-on-surface min-h-screen">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-notoSerif text-3xl text-primary mb-4">Article Not Found</h1>
            <Link to="/blog" className="text-[#CD9933] font-bold">← Back to Blog</Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-surface font-manrope text-on-surface min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
        <img className="w-full h-full object-cover" src={post.image} alt={post.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#013334] via-[#013334]/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 max-w-4xl mx-auto">
          <span className="bg-[#CD9933] text-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded">{post.category}</span>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
        <div className="flex items-center gap-4 text-sm text-on-surface-variant mb-8">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        
        <h1 className="font-notoSerif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8">{post.title}</h1>
        
        <div className="prose prose-lg max-w-none text-on-surface-variant leading-relaxed whitespace-pre-line">
          {post.content}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 p-4 md:p-8 bg-surface-container-lowest rounded-xl editorial-shadow">
          <h3 className="font-notoSerif text-xl md:text-2xl font-bold text-primary mb-4">Ready to Perform Umrah?</h3>
          <p className="text-on-surface-variant mb-6">Contact us today to book your package and start your spiritual journey.</p>
          <Link to="/packages" className="inline-block bg-[#CD9933] text-white px-6 md:px-8 py-3 rounded font-bold hover:brightness-110 transition-all">View Packages</Link>
        </div>

        <div className="mt-12 pt-8 border-t border-outline-variant">
          <Link to="/blog" className="text-[#CD9933] font-bold flex items-center gap-2 hover:gap-4 transition-all">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Blog
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  )
}

export default BlogPost