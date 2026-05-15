import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || ''

const blogPosts = [
  {
    id: 1,
    title: 'How to Perform Umrah – A Complete Step-by-Step Guide',
    excerpt: 'Performing Umrah is a deeply spiritual journey that allows Muslims to seek closeness to Allah, ask for forgiveness, and renew their faith. This guide will walk you through the complete process.',
    category: 'Guides',
    date: 'April 22, 2026',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1572949645079-6416a599c6ae?w=800',
    featured: true,
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

2. Performing Tawaf (Circling the Kaaba)
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
- Umrah checklist, Umrah packing list

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
  },
  {
    id: 2,
    title: 'Best Time for Umrah: A Complete Seasonal Guide',
    excerpt: 'Discover the best months to visit Makkah and Madinah based on weather, crowd levels, and spiritual significance.',
    category: 'Planning',
    date: 'March 10, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1469357001414-5c82ea24f067?w=800',
    featured: false
  },
  {
    id: 3,
    title: 'Top Ziyarat Places in Madinah You Must Visit',
    excerpt: 'Explore the most significant historical and religious sites in Madinah, from Masjid Quba to Mount Uhud.',
    category: 'Destinations',
    date: 'February 28, 2024',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800',
    featured: false
  },
  {
    id: 4,
    title: 'Cheapest Umrah Packages from Pakistan 2024',
    excerpt: 'Compare our budget-friendly Umrah packages and find the best deals for your spiritual journey from Pakistan.',
    category: 'Packages',
    date: 'February 20, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800',
    featured: false
  },
  {
    id: 5,
    title: 'Packing List for Umrah: What to Bring',
    excerpt: 'A complete packing checklist to ensure you have everything you need for a comfortable and hassle-free Umrah journey.',
    category: 'Planning',
    date: 'February 15, 2024',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    featured: false
  },
  {
    id: 6,
    title: 'Understanding the History of the Holy Kaaba',
    excerpt: 'Dive deep into the fascinating history of the Kaaba, from its construction by Prophet Ibrahim to its present-day significance.',
    category: 'History',
    date: 'February 10, 2024',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800',
    featured: false
  }
]

const categories = ['All', 'Guides', 'Planning', 'Destinations', 'Packages', 'History']

const Blog = () => {
  const [pageMedia, setPageMedia] = useState({})
  const [posts, setPosts] = useState(blogPosts)
  const [featuredPost, setFeaturedPost] = useState(blogPosts.find(p => p.featured) || blogPosts[0])
  const [regularPosts, setRegularPosts] = useState(blogPosts.filter(p => p !== (blogPosts.find(p => p.featured) || blogPosts[0])))

  useEffect(() => {
    const savedMedia = localStorage.getItem('pageMedia')
    if (savedMedia) {
      try {
        const parsed = JSON.parse(savedMedia)
        if (parsed && Object.keys(parsed).length > 0) {
          setPageMedia(parsed)
        }
      } catch (e) {}
    }
    axios.get(`${API_BASE}/api/cms?id=page_media`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setPageMedia(res.data)
          localStorage.setItem('pageMedia', JSON.stringify(res.data))
        }
      })
      .catch(err => console.error('Failed to fetch page media:', err))

    axios.get(`${API_BASE}/api/blog`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setPosts(res.data)
          const feat = res.data.find(p => p.featured) || res.data[0]
          setFeaturedPost(feat)
          setRegularPosts(res.data.filter(p => p !== feat))
        }
      })
      .catch(err => console.error('Failed to fetch blog posts:', err))
  }, [])

  return (
    <div className="bg-surface font-manrope text-on-surface min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src={pageMedia.blog_hero_image || "https://images.unsplash.com/photo-1469357001414-5c82ea24f067?w=1600"} alt="Blog" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            <div className="w-12 h-1 bg-[#CD9933] mb-6 md:mb-8"></div>
            <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Travel <span className="text-[#CD9933]">Blog</span>
            </h1>
            <p className="font-manrope text-base md:text-lg text-white/80 max-w-xl">
              Insights, guides, and spiritual wisdom to help you prepare for your journey. Stay informed with our latest articles on Umrah, travel tips, and religious guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
      <section className="py-12 md:py-24 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto -mt-8 sm:-mt-12 lg:-mt-16 relative z-20">
        <Link to={`/blog/${featuredPost.id}`} className="block">
          <div className="bg-surface-container-lowest editorial-shadow overflow-hidden asymmetric-clip group">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-48 sm:h-56 md:h-64 lg:h-auto overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={featuredPost.image} alt={featuredPost.title} />
                <div className="absolute top-4 left-4 bg-[#CD9933] text-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded">{featuredPost.category}</div>
              </div>
              <div className="p-4 md:p-6 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-outline mb-4">
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <h2 className="font-notoSerif text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4 group-hover:text-[#CD9933] transition-colors">{featuredPost.title}</h2>
                <p className="text-on-surface-variant leading-relaxed mb-6">{featuredPost.excerpt}</p>
                <span className="text-[#CD9933] font-bold flex items-center gap-2 hover:gap-4 transition-all">
                  Read Article
                  <span className="material-symbols-outlined">arrow_forward</span>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>
      )}

      {/* Categories */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 mb-8">
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {categories.map(cat => (
            <button key={cat} className={`px-4 md:px-6 py-2 rounded-full text-sm font-bold transition-all ${cat === 'All' ? 'bg-[#013334] text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-16 md:pb-24 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {regularPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="block">
              <div className="bg-surface-container-lowest group overflow-hidden editorial-shadow transition-transform hover:-translate-y-1">
                <div className="relative h-44 sm:h-48 md:h-56 overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 asymmetric-clip" src={post.image} alt={post.title} />
                  <div className="absolute top-4 left-4 bg-[#013334] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded">{post.category}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-outline mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-notoSerif text-xl font-bold text-primary mb-3 group-hover:text-[#CD9933] transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                  <span className="text-[#CD9933] font-bold text-sm flex items-center gap-2">
                    Read More
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-primary-container relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1469357001414-5c82ea24f067?w=800" alt="Pattern" />
        </div>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
          <h6 className="font-manrope text-[#CD9933] font-bold text-sm tracking-[0.2em] uppercase mb-4">Stay Updated</h6>
          <h2 className="font-notoSerif text-3xl sm:text-4xl font-bold text-white mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-white/60 mb-8">Get the latest travel tips, package deals, and spiritual guides delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-6 py-4 rounded-md focus:ring-2 focus:ring-[#CD9933] focus:outline-none" placeholder="Enter your email" type="email" />
            <button className="bg-[#CD9933] text-white px-8 py-4 rounded-md font-bold hover:brightness-110 transition-all">Subscribe</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Blog
