import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { buildWhatsAppUrl, buildVisaShortMessage } from '../utils/whatsapp'

const API_BASE = import.meta.env.VITE_API_URL || ''

// Detailed static dataset representing the 8 major visas with comprehensive yugo-style details
const detailedVisaData = {
  // Umrah Visa
  1: {
    id: 1,
    title: 'Umrah Visa',
    countryName: 'Saudi Arabia (Umrah)',
    subHeader: 'Official Saudi Umrah eVisa Processing from Pakistan',
    description: 'Meticulous electronic visa processing for pilgrims traveling to Saudi Arabia for Umrah rituals. We handle all system lodging, ministry authorization, and mandatory insurance.',
    icon: 'mosque',
    processing: '3-5 Business Days',
    validity: '90 Days (Single Entry)',
    fee: 'PKR 45,000',
    entryType: 'Single Entry',
    heroImage: '/assets/umrah_visa.png',
    overview: 'The Umrah Visa is a dedicated electronic entry permit issued by the Ministry of Hajj & Umrah, Kingdom of Saudi Arabia. It is specifically meant for pilgrims wishing to perform the sacred rituals of Umrah and visit the holy Mosques in Makkah and Madinah. Our service covers the complete electronic submission, Saudi system registration fees, and the mandatory electronic medical insurance for tourists.',
    pricingTable: [
      { category: 'Embassy / Portal Visa Fee', price: 'PKR 33,000' },
      { category: 'Mandatory Saudi Health Insurance', price: 'PKR 4,500' },
      { category: 'Agency Consultation & Portal Vetting', price: 'PKR 7,500' },
    ],
    documents: {
      personal: [
        'Original Passport (valid for at least 6 months with 2 blank pages)',
        'Clear Scanned CNIC (Front and Back)',
        '2 Passport-size photographs (4x6 cm, white background, glossy finish)',
        'Meningitis & Polio vaccination certificate card'
      ],
      financial: [
        'No bank statement is officially required for the Saudi Umrah eVisa.',
        'Proof of financial capacity is recommended if traveling with extensive family packages.'
      ],
      professional: [
        'No business or employment letters are required for standard Umrah pilgrims.',
        'Women under the age of 45 can now travel without a physical Mahram under current rules.'
      ]
    },
    steps: [
      { title: 'Digital Submission', desc: 'Send us high-quality digital scans of your passport, CNIC, and white-background photos.' },
      { title: 'Payment & Verification', desc: 'Securely transfer the visa fee and allow our team to vet your documents for passport validity errors.' },
      { title: 'Portal Lodgement & Insurance', desc: 'We issue your mandatory Saudi health insurance and submit the visa request to the Saudi portal.' },
      { title: 'eVisa Delivery', desc: 'Your approved electronic Umrah Visa is emailed to you as a high-resolution PDF within 3-5 business days.' }
    ],
    faqs: [
      { q: 'Can I travel to other cities in Saudi Arabia on an Umrah Visa?', a: 'Yes! Under the latest regulations, pilgrims holding an Umrah visa can travel freely to Riyadh, Jeddah, Dammam, and any other city in the Kingdom.' },
      { q: 'Is the visa fee refundable if rejected?', a: 'No, all government portal fees and insurance premiums are non-refundable once registered in the Saudi Ministry database.' },
      { q: 'What is the maximum validity of the Umrah Visa?', a: 'The visa is valid for 90 days from the date of issuance, and allows a maximum stay of 90 days inside the country.' }
    ]
  },

  // Saudi Tourist Visa
  2: {
    id: 2,
    title: 'Saudi Tourist Visa',
    countryName: 'Saudi Arabia',
    subHeader: 'Explore the Rich Heritage & Modern Wonders of Saudi Arabia',
    description: 'Discover the spectacular historic sites, pristine beaches, and modern cities of the Kingdom. Perfect for tourism, family visits, and performing Umrah.',
    icon: 'flight',
    processing: '5-7 Business Days',
    validity: '1 Year (Multiple Entry)',
    fee: 'PKR 75,000',
    entryType: 'Multiple Entry',
    heroImage: '/assets/saudi_tourist_visa.png',
    overview: 'The Saudi Tourist Visa is a premium 1-Year Multiple Entry permit designed for tourists and visitors. It allows travelers to explore Saudi Arabia\'s world-famous heritage sites (like Al Ula and Diriyah), attend cultural events, visit friends or family, and perform Umrah. Each stay can be up to 90 days, with a cumulative stay of 180 days per year.',
    pricingTable: [
      { category: 'Official Saudi Embassy eVisa Fee', price: 'PKR 58,000' },
      { category: 'Mandatory Tourist Health Insurance (14-day minimum cover)', price: 'PKR 6,500' },
      { category: 'Agency File Preparation & Support', price: 'PKR 10,500' },
    ],
    documents: {
      personal: [
        'Original Passport valid for at least 6 months with blank pages',
        'CNIC copy and Family Registration Certificate (FRC) if traveling with family',
        '2 Passport-size photographs with a clean white background',
        'Confirmed return flight tickets'
      ],
      financial: [
        'Personal Bank Statement (last 6 months) with account maintenance certificate',
        'Recommended closing balance of PKR 500,000+ per applicant'
      ],
      professional: [
        'Employment Letter stating designation, monthly salary, and joining date',
        'For business owners: FBR NTN certificate and FBR Tax Returns of last 2 years'
      ]
    },
    steps: [
      { title: 'Document Vetting', desc: 'Our consultants review your bank statements and occupation certificates to ensure embassy compliance.' },
      { title: 'Insurance Registry', desc: 'We issue your mandatory international medical coverage via Saudi cooperative insurance portals.' },
      { title: 'Online Lodgement', desc: 'We submit your complete file and travel bookings through the official MoFA tourist visa portal.' },
      { title: 'Visa Delivery', desc: 'Receive your 1-Year Multiple Entry eVisa directly via email as a PDF printout.' }
    ],
    faqs: [
      { q: 'Can I perform Hajj on a Tourist Visa?', a: 'No, Hajj is strictly prohibited on a Tourist Visa. You must hold an official Hajj Visa or permit to enter Makkah during the Hajj season.' },
      { q: 'Is there a minimum bank balance requirement?', a: 'Yes, we recommend showing a closing balance of at least PKR 500,000 to demonstrate sufficient financial standing to Saudi authorities.' },
      { q: 'How long can I stay on each entry?', a: 'You can stay up to 90 days per visit. You must exit before 90 days, and can return multiple times during the 1-year validity.' }
    ]
  },

  // Dubai Visa
  3: {
    id: 3,
    title: 'Dubai Visa',
    countryName: 'United Arab Emirates',
    subHeader: 'Dubai & UAE Tourist eVisa Processing',
    description: 'Streamlined online tourist visa for Dubai and all other Emirates. Fast document evaluation, full insurance, and high-success rate online submission.',
    icon: 'apartment',
    processing: '3-5 Business Days',
    validity: '60 Days (Single Entry)',
    fee: 'PKR 30,400',
    entryType: 'Single Entry (30 Days Stay)',
    heroImage: '/assets/dubai_visa.png',
    overview: 'Explore the breathtaking skyline of Dubai, shopping festivals, and sandy beaches. We offer quick electronic visa processing for all seven United Arab Emirates. The 30-Day Tourist eVisa is the most popular, and requires only clear digital scans. We also offer 60-Day stay visas and Multiple Entry upgrades.',
    pricingTable: [
      { category: 'UAE GDRFA / ICP Govt Visa Fee', price: 'PKR 22,000' },
      { category: 'Mandatory UAE COVID/Travel Medical Insurance', price: 'PKR 3,000' },
      { category: 'Agency Submission & Document Optimization', price: 'PKR 5,400' },
    ],
    documents: {
      personal: [
        'High-resolution color scan of Passport first page (valid for 6 months)',
        'Clear color scanned copy of CNIC (both sides)',
        'Passport-size photograph with white background (JPEG format)',
        'Family Registration Certificate (FRC) if traveling with children'
      ],
      financial: [
        'Generally, no bank statement is required for standard Dubai tourist eVisas.',
        'High-risk profiles may occasionally be requested to provide a 3-month statement (min PKR 300k).'
      ],
      professional: [
        'No formal employment letters or NOCs are required by UAE immigration for standard eVisas.'
      ]
    },
    steps: [
      { title: 'Digital Upload', desc: 'Scan and send your clear passport bio-data page and CNIC to our team.' },
      { title: 'Vetting & Sizing', desc: 'We resize and optimize your digital photos and scans to fit strict UAE immigration upload specs.' },
      { title: 'Government Lodgement', desc: 'Submission of the visa request via direct immigration agency portals in Dubai or Abu Dhabi.' },
      { title: 'eVisa Delivery', desc: 'Receive your official UAE eVisa as a PDF. Print it in color and fly!' }
    ],
    faqs: [
      { q: 'Can I extend my Dubai tourist visa while in the UAE?', a: 'Yes! You can extend your Dubai visit visa inside the UAE for an additional 30 days twice without leaving the country.' },
      { q: 'Do kids need a visa fee?', a: 'Yes, UAE immigration charges the same visa fee for adults, children, and infants alike.' },
      { q: 'Is travel insurance mandatory?', a: 'Yes, our listed price includes the official UAE travel medical insurance which is checked at airport check-in.' }
    ]
  },

  // Turkey Visa
  4: {
    id: 4,
    title: 'Turkey Visa',
    countryName: 'Turkey',
    subHeader: 'Turkey Sticker & eVisa Assistance for Pakistani Citizens',
    description: 'Complete documentation preparation, travel itineraries, approved insurance, and Gerry\'s/VFS appointment booking for Turkey sticker visas.',
    icon: 'travel_explore',
    processing: '7-10 Business Days',
    validity: '90 Days (Stay matches bookings)',
    fee: 'PKR 52,000',
    entryType: 'Single Entry Sticker',
    heroImage: '/assets/turkey_visa.png',
    overview: 'Pakistan ordinary passport holders require a sticker visa to enter Turkey, unless they qualify for an e-Visa by holding an active USA, UK, Schengen, or Ireland visa. We specialize in providing complete sticker visa file preparation, approved travel insurance, verifiable flight and hotel bookings, and fast VFS appointment slots.',
    pricingTable: [
      { category: 'Embassy Visa Fee & Gerry\'s VFS Service Charge', price: 'PKR 39,500' },
      { category: 'Approved Turkey Covid/Travel Insurance', price: 'PKR 4,000' },
      { category: 'Agency File Compiling & Appointment Booking', price: 'PKR 8,500' },
    ],
    documents: {
      personal: [
        'Original Passport valid for 6 months (along with all previous passports)',
        'CNIC copy and Family Registration Certificate (FRC)',
        '2 Biometric photos (5x5 cm, white background, matte finish, face coverage 80%)',
        'Polio Vaccination Card from Govt Hospital'
      ],
      financial: [
        'Original Bank Statement (last 6 months) with bank stamp & signature',
        'Account Maintenance Certificate matching the statement name',
        'Closing Balance of PKR 500,000+ per applicant is strongly advised'
      ],
      professional: [
        'For salaried: Employment Letter, NOC (No Objection Certificate), and last 3 salary slips',
        'For business owners: NTN registration, 2 years tax returns, and business letterhead'
      ]
    },
    steps: [
      { title: 'Document Vetting', desc: 'Our Turkey specialists verify your bank statement transaction flow and letter signatures.' },
      { title: 'Itinerary Planning', desc: 'We compile real, verifiable hotel bookings and flight reservations that embassies verify.' },
      { title: 'VFS Submission', desc: 'We secure a fast slot at Gerry\'s. You visit physically for biometric enrollment and document submission.' },
      { title: 'Embassy Review', desc: 'The Turkish Consulate reviews your physical file. We track the passport until its safe return.' }
    ],
    faqs: [
      { q: 'Who is eligible for a Turkey e-Visa?', a: 'Pakistani citizens holding a valid, active sticker visa or residence permit from the US, UK, Schengen countries, or Ireland can apply for an online Turkey e-Visa (PKR 13,000).' },
      { q: 'Is personal appearance necessary?', a: 'Yes. Every applicant must appear physically at the Gerry\'s/VFS Turkish visa center for biometric fingerprinting.' },
      { q: 'Do I need to submit an NTN certificate?', a: 'Yes, submitting an NTN certificate and tax returns significantly increases the visa success rate for business owners.' }
    ]
  },

  // Schengen Visa
  5: {
    id: 5,
    title: 'Schengen Visa',
    countryName: 'Schengen Area (Germany/France/Italy/Spain)',
    subHeader: 'Travel Across 27 European Nations with a Single Visa',
    description: 'Expert documentation audit, personalized cover letter drafting, verifiable flight and hotel itineraries, and approved €30,000 travel insurance.',
    icon: 'globe',
    processing: '15-20 Business Days',
    validity: 'Up to 90 Days',
    fee: 'PKR 72,000',
    entryType: 'Short Stay (C-Type Tourist)',
    heroImage: '/assets/schengen_visa.png',
    overview: 'The Schengen Visa represents the gold standard of global travel, enabling access to 27 European nations under one passport stamp. Because Schengen embassies inspect financial stability, family ties in Pakistan, and travel motives rigorously, our premium service focuses on creating a flawless, rock-solid application file that maximizes approval chances.',
    pricingTable: [
      { category: 'Embassy Visa Fee (~90 EUR) & VFS Appointment Service Fee', price: 'PKR 32,000' },
      { category: 'Embassy Approved Schengen Insurance (€30,000 coverage)', price: 'PKR 8,000' },
      { category: 'Premium Consultancy, Cover Letter, Bookings & VFS Slot', price: 'PKR 32,000' },
    ],
    documents: {
      personal: [
        'Current Passport (valid 6m) + all previous passports showing travel history',
        'CNIC copy & Family Registration Certificate (FRC)',
        '3 Biometric photos (3.5x4.5 cm, white background, matte finish)',
        'Detailed day-wise European travel itinerary'
      ],
      financial: [
        'Personal Bank Statement (last 6 months) with closing balance min PKR 1.5 Million',
        'Bank Account Maintenance Certificate with active stamp',
        'Wealth Statement or property documents if owned in Pakistan'
      ],
      professional: [
        'For salaried: Employment Letter, NOC on letterhead, 3 salary slips, and Tax Returns',
        'For business: Chamber of Commerce Certificate, NTN registration, 2 years business tax returns, and bank statement of business'
      ]
    },
    steps: [
      { title: 'Profile Vetting', desc: 'In-depth assessment of your financial structure, occupational background, and travel history.' },
      { title: 'Cover Letter & Dossier', desc: 'We draft a customized cover letter highlighting your purpose of travel and arrange verifiable flight/hotel bookings.' },
      { title: 'Appointment Slot', desc: 'We book your biometric slot at VFS Global (Germany, France, Spain, Italy etc.).' },
      { title: 'VFS Interview prep', desc: 'We coordinate your physical submission file and run mock Q&A prep for VFS counters.' }
    ],
    faqs: [
      { q: 'Which Schengen country embassy should I apply to?', a: 'You must apply to the embassy of the country where you will spend the maximum number of nights. If staying equal nights, apply to your first port of entry.' },
      { q: 'What is the recommended bank balance?', a: 'Although there is no set minimum, we recommend single applicants show a closing balance of at least PKR 1.2 to 1.5 Million to prove they can cover European costs.' },
      { q: 'Is the travel insurance included?', a: 'Yes, our package price includes a fully compliant Schengen insurance policy that covers emergency medical up to €30,000.' }
    ]
  },

  // UK Standard Visitor Visa
  6: {
    id: 6,
    title: 'UK Standard Visitor Visa',
    countryName: 'United Kingdom',
    subHeader: 'Premium United Kingdom Visitor Visa Assistance',
    description: 'Complete UKVI portal online application management, detailed document cataloging, high-resolution scanning, and VFS biometric appointment booking.',
    icon: 'home',
    processing: '15-21 Business Days',
    validity: '6 Months (Multiple Entry)',
    fee: 'PKR 127,000',
    entryType: 'Multiple Entry (6 Months)',
    heroImage: '/assets/uk_visa.png',
    overview: 'The UK Standard Visitor Visa allows Pakistani passport holders to travel to England, Scotland, Wales, and Northern Ireland for holidays, family visits, or short business trips. The UK Home Office has a strict online review framework. We take pride in building a bulletproof digital dossier, ensuring your source of income, tax compliance, and family links in Pakistan are completely clear.',
    pricingTable: [
      { category: 'Official UKVI Online Visa Application Fee (115 GBP)', price: 'PKR 42,000' },
      { category: 'Premium Consultancy, Digital Upload, VFS Booking & Document Prep', price: 'PKR 85,000' },
    ],
    documents: {
      personal: [
        'Valid Passport + all expired passports (essential for UKVI background check)',
        'CNIC copy & Family Registration Certificate (FRC)',
        '2 Photographs (white background, matte finish)',
        'Marriage Certificate (MRC) or Child FRC if applicable'
      ],
      financial: [
        '6-Month Personal Bank Statement explaining all large deposits',
        'Account Maintenance Certificate from your home bank',
        'Property Registry or rental income certificates if applicable'
      ],
      professional: [
        'Salaried: Employment Letter, detailed Job description, salary slips, and tax returns',
        'Business: Form-29, Partnership deed, NTN, 2 years tax returns, and business bank statement'
      ]
    },
    steps: [
      { title: 'Questionnaire & Data', desc: 'We collect your comprehensive travel history, family ties, and income details.' },
      { title: 'Portal Application', desc: 'Our experts fill out the complex, multi-page UKVI online visa application on your behalf.' },
      { title: 'Digital Upload & Scan', desc: 'We high-resolution scan, index, and upload all your supporting files directly onto the VFS portal.' },
      { title: 'Biometrics at VFS', desc: 'We book your slot at the UK visa center where you give fingerprints. Passport is held until decision.' }
    ],
    faqs: [
      { q: 'How far back do I need to show my bank statement?', a: 'UKVI strictly requires a 6-month bank statement. It is critical that any large or irregular deposits are backed by written proofs of their source.' },
      { q: 'Is there a visa interview?', a: 'Generally no. UK visitor visa decisions are based entirely on the uploaded digital documents. Telephone calls are made by case workers only in rare cases.' },
      { q: 'Can I apply for a longer validity visa?', a: 'Yes, we can assist with 2-year, 5-year, and 10-year UK visitor visas, though government fees are higher.' }
    ]
  },

  // Malaysia Tourist eVisa
  7: {
    id: 7,
    title: 'Malaysia Tourist eVisa',
    countryName: 'Malaysia',
    subHeader: 'Malaysia Tourist eVisa - Hassle-Free Paperless Processing',
    description: 'Quick electronic tourist visa for Malaysia. Complete paperless application process with direct government API submission and rapid processing.',
    icon: 'layers',
    processing: '2-3 Business Days',
    validity: '90 Days (Stay up to 30 days)',
    fee: 'PKR 16,000',
    entryType: 'Single Entry eVisa',
    heroImage: '/assets/malaysia_visa.png',
    overview: 'Malaysia is a breathtaking tourist destination blending rainforests, islands, and high-tech capital culture. The Malaysia eVisa is a paperless, quick electronic permit issued for tourists from Pakistan. The application is completely online, requiring zero physical embassy visits or passport courier fees.',
    pricingTable: [
      { category: 'Official Malaysian Government eVisa Fee & Portal Charges', price: 'PKR 9,800' },
      { category: 'Agency Processing, Digital Preparation & Submission', price: 'PKR 6,200' },
    ],
    documents: {
      personal: [
        'High-quality scanned Passport bio-page (must be clear, valid for 6 months)',
        'Passport photograph (size 3.5x5 cm, white background, recently shot)',
        'Confirmed return flight tickets showing ticket number',
        'Birth Certificate copy for minors traveling with parents'
      ],
      financial: [
        'Personal Bank Statement of the last 3 months',
        'Recommended closing balance of PKR 300,000+ per applicant'
      ],
      professional: [
        'No formal employment letters are mandatory, but a job certificate or NOC increases safety.'
      ]
    },
    steps: [
      { title: 'Digital Submission', desc: 'Scan and send your passport page, flight tickets, and white-background photo.' },
      { title: 'Image Standardization', desc: 'Malaysian portals reject photos with minor shadow or size errors. We resize and standardize your photos.' },
      { title: 'Online Submission', desc: 'We lodge the request directly on the Malaysia eVisa portal.' },
      { title: 'eVisa Issuance', desc: 'Receive your approved Malaysia eVisa via email. Print it on A4 paper and carry it during travel.' }
    ],
    faqs: [
      { q: 'Do I need to submit my physical passport?', a: 'No, the entire process is online. Your passport remains with you at all times.' },
      { q: 'What is the maximum stay permitted?', a: 'The Malaysia eVisa allows a maximum stay of up to 30 days per entry, and must be used within 3 months of issuance.' },
      { q: 'Is the bank statement mandatory?', a: 'Yes, Malaysian immigration checks the 3-month statement to verify you have sufficient funds for your holiday.' }
    ]
  },

  // Singapore Tourist eVisa
  8: {
    id: 8,
    title: 'Singapore Tourist eVisa',
    countryName: 'Singapore',
    subHeader: 'Singapore eVisa Processing via Authorized Sponsoring Agency',
    description: 'Expert document resizing, local Singaporean sponsor coordination, and official portal submission for Singapore tourist eVisas.',
    icon: 'local_airport',
    processing: '4-5 Business Days',
    validity: '30 Days (Stay matches bookings)',
    fee: 'PKR 25,000',
    entryType: 'Multiple Entry eVisa',
    heroImage: '/assets/singapore_visa.png',
    overview: 'Experience the pristine beauty and hyper-modern sites of Singapore. Since Singapore places Pakistan under its Assessment Level II category, eVisas cannot be filed directly by individual applicants. They must be submitted via an authorized local sponsoring travel agency or a citizen in Singapore. Our fee covers the assigning of an authorized Singapore sponsor and handling the ICA portal submission.',
    pricingTable: [
      { category: 'Official Singapore ICA eVisa Portal Fee', price: 'PKR 7,500' },
      { category: 'Local Singapore Sponsor Registration & System Coordination', price: 'PKR 10,500' },
      { category: 'Agency Vetting & Submission Charges', price: 'PKR 7,000' },
    ],
    documents: {
      personal: [
        'High-resolution scanned Passport first and second page',
        'CNIC copy (both sides)',
        '1 Digital passport photograph (white background, matte finish)',
        'Confirmed return flight ticket and hotel voucher'
      ],
      financial: [
        'Bank Statement (last 3 months) showing account transactions',
        'Recommended closing balance of PKR 350,000+ per applicant'
      ],
      professional: [
        'Salaried: Office ID card copy or salary certificate (if available)',
        'Letter of Introduction (V39A Form) prepared by our assigned local Singapore sponsor'
      ]
    },
    steps: [
      { title: 'Profile Vetting', desc: 'Scan and send your high-resolution passport copy. We verify that all numbers and letters are legible.' },
      { title: 'Sponsor Assignment', desc: 'We match your profile with an authorized local Singapore sponsor who signs the Letter of Introduction.' },
      { title: 'ICA Submission', desc: 'We upload all documents, sponsor information, and forms to the Singapore ICA portal.' },
      { title: 'eVisa Printing', desc: 'Your visa is issued as an electronic PDF. Print it out and carry it along with your passport.' }
    ],
    faqs: [
      { q: 'Why is a Singapore visa more expensive than other eVisas?', a: 'Because Pakistan is in Singapore\'s Assessment Level II list, a local sponsor in Singapore must be registered and assume financial responsibility for your entry, which increases coordination costs.' },
      { q: 'What is the visa validity?', a: 'Singapore eVisas are usually issued with 30-day or 60-day validity, allowing a stay of up to 30 days per entry.' },
      { q: 'Can I travel to Malaysia from Singapore by road?', a: 'Yes! You can cross the Johor Bahru border by road, provided you hold valid visas for both Singapore and Malaysia.' }
    ]
  }
}

const VisaDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [visa, setVisa] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('personal')
  const [pageMedia, setPageMedia] = useState({})
  
  // Inquiry form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    travelDate: '',
    travelers: '1',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    // 1. Fetch page media first
    const savedMedia = localStorage.getItem('pageMedia')
    if (savedMedia) {
      try { setPageMedia(JSON.parse(savedMedia)) } catch (e) {}
    }
    axios.get(`${API_BASE}/api/cms?id=page_media`)
      .then(res => {
        if (res.data) {
          setPageMedia(res.data)
          localStorage.setItem('pageMedia', JSON.stringify(res.data))
        }
      })
      .catch(err => console.error('Media load error:', err))

    // 2. Fetch specific visa details
    setLoading(true)
    axios.get(`${API_BASE}/api/visa`)
      .then(res => {
        const visaList = res.data
        let foundVisa = null

        if (Array.isArray(visaList) && visaList.length > 0) {
          // Attempt to match by UUID or ID first
          foundVisa = visaList.find(v => String(v.id) === String(id))
          
          if (!foundVisa) {
            // Fallback match by matching title/country (e.g. if id is 1, match static list id 1 title with db title)
            const staticVisa = detailedVisaData[id]
            if (staticVisa) {
              foundVisa = visaList.find(v => 
                v.title.toLowerCase().includes(staticVisa.title.toLowerCase()) ||
                staticVisa.title.toLowerCase().includes(v.title.toLowerCase())
              )
            }
          }
        }

        // Merge DB data with our rich detailed static data
        const staticDetails = detailedVisaData[id] || Object.values(detailedVisaData).find(v => 
          foundVisa && (v.title.toLowerCase().includes(foundVisa.title.toLowerCase()) || 
          foundVisa.title.toLowerCase().includes(v.title.toLowerCase()))
        )

        if (foundVisa) {
          setVisa({
            ...staticDetails, // Detailed rich text
            ...foundVisa,     // Real-time DB price and processing from Supabase
            // Ensure array type for documents if returned as string from DB
            documents: foundVisa.documents || (staticDetails ? staticDetails.documents : [])
          })
        } else if (staticDetails) {
          setVisa(staticDetails)
        } else {
          setVisa(null)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Visa fetch error, falling back to static dataset:', err)
        if (detailedVisaData[id]) {
          setVisa(detailedVisaData[id])
        }
        setLoading(false)
      })
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)

    // Build rich, custom WhatsApp message containing client data
    const messageLines = [
      `Assalamu Alaikum Habib Ul Hujjaj,`,
      ``,
      `I am submitting an inquiry for the *${visa.title}* via your website details page.`,
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      `Preferred Travel Date: ${formData.travelDate}`,
      `Number of Travelers: ${formData.travelers}`,
      formData.message ? `Additional Request: ${formData.message}` : '',
      ``,
      `Please let me know the required document check and process start. JazakAllah Khair!`
    ].filter(Boolean).join('\n')

    const whatsappUrl = buildWhatsAppUrl(messageLines)

    // Simulate database or API submission logs
    setTimeout(() => {
      setSubmitting(false)
      setSubmitSuccess(true)
      window.open(whatsappUrl, '_blank')
    }, 800)
  }

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex flex-col justify-between font-manrope">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-32">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-primary font-bold tracking-widest uppercase text-xs">Loading Visa Details...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!visa) {
    return (
      <div className="bg-background min-h-screen flex flex-col justify-between font-manrope">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-32 px-4 text-center">
          <span className="material-symbols-outlined text-red-500 text-6xl mb-6">info</span>
          <h2 className="font-notoSerif text-3xl font-bold text-black mb-4">Visa Service Not Found</h2>
          <p className="text-black/60 max-w-md mb-8">The visa category you are trying to view does not exist or has been modified. Please return to the catalog.</p>
          <Link to="/visa-services" className="bg-primary text-white px-8 py-3 rounded-md font-bold text-sm shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Visas
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-background font-manrope text-black min-h-screen">
      <Navbar />

      {/* Hero Banner Section */}
      <section className="relative min-h-[50vh] flex items-center pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src={visa.heroImage || "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1600&q=80"} alt={visa.title} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/50 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-24 w-full">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm font-bold uppercase tracking-wider mb-6">
              <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <Link to="/visa-services" className="hover:text-secondary transition-colors">Visa Services</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-white">{visa.title}</span>
            </div>
            
            <div className="w-12 h-1 bg-secondary mb-6"></div>
            <h1 className="font-notoSerif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {visa.title} <span className="text-secondary">Assistance</span>
            </h1>
            <p className="font-manrope text-base sm:text-lg text-white/80 max-w-xl mb-8 leading-relaxed">
              {visa.subHeader || `Get professional consultancy and processing for your ${visa.title} from Pakistan.`}
            </p>

            {/* Quick Metadata Info Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 rounded-2xl max-w-4xl">
              <div className="border-r border-white/10 pr-2">
                <p className="text-[10px] text-white/60 uppercase tracking-widest font-black mb-1">Processing Time</p>
                <p className="text-white font-bold text-sm md:text-base flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-sm">schedule</span>
                  {visa.processing || visa.processing_time}
                </p>
              </div>
              <div className="md:border-r border-white/10 pr-2">
                <p className="text-[10px] text-white/60 uppercase tracking-widest font-black mb-1">Base Price</p>
                <p className="text-secondary font-bold text-sm md:text-base flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">payments</span>
                  {visa.fee}
                </p>
              </div>
              <div className="border-r border-white/10 pr-2 pt-2 md:pt-0">
                <p className="text-[10px] text-white/60 uppercase tracking-widest font-black mb-1">Validity</p>
                <p className="text-white font-bold text-sm md:text-base flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-sm">verified</span>
                  {visa.validity || '90 Days'}
                </p>
              </div>
              <div className="pt-2 md:pt-0">
                <p className="text-[10px] text-white/60 uppercase tracking-widest font-black mb-1">Entry Type</p>
                <p className="text-white font-bold text-sm md:text-base flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-sm">swap_horiz</span>
                  {visa.entryType || 'Single Entry'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column (Main Details) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview */}
            <div className="bg-white border border-gray-100 p-6 md:p-10 shadow-sm rounded-3xl">
              <h3 className="font-notoSerif text-2xl md:text-3xl font-bold text-black mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">info</span>
                Visa Overview
              </h3>
              <p className="text-black/70 text-base leading-relaxed mb-6 font-medium">
                {visa.overview || visa.description}
              </p>
              <p className="text-black/70 text-base leading-relaxed font-medium">
                At Habib Ul Hujjaj, we provide authentic, streamlined visa guidance for pilgrims and tourists. We ensure your documents are perfectly in line with embassy expectations, avoiding unnecessary delays or application returns.
              </p>
            </div>

            {/* Document Checklist Tabs */}
            <div className="bg-white border border-gray-100 p-6 md:p-10 shadow-sm rounded-3xl">
              <h3 className="font-notoSerif text-2xl md:text-3xl font-bold text-black mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">description</span>
                Required Documents Checklist
              </h3>
              <p className="text-black/60 text-sm mb-8">Click each tab below to view detailed requirements categorized by personal, financial, and professional documents required by the consulate.</p>
              
              {/* Tab Toggles */}
              <div className="flex border-b border-gray-200 mb-8 overflow-x-auto gap-2">
                {[
                  { id: 'personal', label: 'Personal Papers', icon: 'account_circle' },
                  { id: 'financial', label: 'Financial Proof', icon: 'account_balance' },
                  { id: 'professional', label: 'Employment / Business', icon: 'work' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-bold text-sm tracking-wider uppercase whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                      activeTab === tab.id
                        ? 'border-primary text-primary bg-primary/5'
                        : 'border-transparent text-black/50 hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="min-h-[200px]">
                {activeTab === 'personal' && (
                  <ul className="space-y-4">
                    {(visa.documents?.personal || visa.documents || []).map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <span className="material-symbols-outlined text-primary text-xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        <span className="text-black/80 font-medium text-sm md:text-base">{doc}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'financial' && (
                  <ul className="space-y-4">
                    {(visa.documents?.financial || [
                      'Personal Bank Statement (last 6 months) with account maintenance certificate',
                      'Closing balance matching the destination country checklist (e.g. PKR 500k to PKR 1.5M)',
                      'Active bank stamp and authorized manager signature on each page'
                    ]).map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <span className="material-symbols-outlined text-primary text-xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        <span className="text-black/80 font-medium text-sm md:text-base">{doc}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'professional' && (
                  <ul className="space-y-4">
                    {(visa.documents?.professional || [
                      'Job letter / employment certificate showing designation, join date and monthly package',
                      'No Objection Certificate (NOC) printed on office letterhead',
                      'Salary slips of the last 3 months',
                      'FBR NTN registration certificate and tax returns of last 2 years (strongly recommended for business profiles)'
                    ]).map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <span className="material-symbols-outlined text-primary text-xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        <span className="text-black/80 font-medium text-sm md:text-base">{doc}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="bg-white border border-gray-100 p-6 md:p-10 shadow-sm rounded-3xl">
              <h3 className="font-notoSerif text-2xl md:text-3xl font-bold text-black mb-10 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">hourglass_empty</span>
                Application Processing Timeline
              </h3>
              
              <div className="relative border-l-2 border-primary/20 ml-6 md:ml-8 pl-8 md:pl-12 space-y-12">
                {(visa.steps || [
                  { title: 'Gather Documents', desc: 'Scan and send us your primary passport, CNIC, and photograph.' },
                  { title: 'Payment & Vetting', desc: 'We verify your document guidelines and proceed to issue travel insurance policies.' },
                  { title: 'Lodge Request', desc: 'Our portal experts register your details with official government visa databases.' },
                  { title: 'Visa Approved', desc: 'Receive your print-ready electronic visa in PDF format direct to your email.' }
                ]).map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle Indicator */}
                    <span className="absolute -left-[53px] md:-left-[69px] top-0 bg-primary text-secondary w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-white flex items-center justify-center font-bold text-sm md:text-base shadow-md">
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-black font-manrope text-lg md:text-xl mb-2">{step.title}</h4>
                    <p className="text-black/60 text-sm md:text-base leading-relaxed font-medium">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Breakdowns */}
            <div className="bg-white border border-gray-100 p-6 md:p-10 shadow-sm rounded-3xl overflow-hidden">
              <h3 className="font-notoSerif text-2xl md:text-3xl font-bold text-black mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">payments</span>
                Transparent Fee Breakdown
              </h3>
              <p className="text-black/60 text-sm mb-8">We believe in absolute transparency. Here is the approximate breakdown of the total fee per applicant:</p>
              
              <div className="border border-gray-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-primary text-white font-manrope text-sm uppercase tracking-wider">
                      <th className="p-4 md:p-5">Fee Category</th>
                      <th className="p-4 md:p-5 text-right">Approximate Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(visa.pricingTable || [
                      { category: 'Consulate / Embassy Visa Fee', price: 'Varies by destination' },
                      { category: 'Mandatory Travel Medical Insurance Cover', price: 'Included' },
                      { category: 'Consultancy, Appointment & Document Assistance', price: 'Included' }
                    ]).map((row, idx) => (
                      <tr key={idx} className="border-b border-gray-100 font-medium text-sm md:text-base hover:bg-gray-50/50">
                        <td className="p-4 md:p-5 text-black/70">{row.category}</td>
                        <td className="p-4 md:p-5 text-right font-bold text-primary">{row.price}</td>
                      </tr>
                    ))}
                    <tr className="bg-primary-container text-black/90 font-bold text-base md:text-lg">
                      <td className="p-4 md:p-5 text-primary">Total Combined Package Fee</td>
                      <td className="p-4 md:p-5 text-right text-primary">{visa.fee}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-black/40 text-xs italic mt-4 flex items-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-sm">info</span>
                Consulate and embassy exchange rates are subject to slight market variations. Contact us for real-time calculations.
              </p>
            </div>

            {/* Visa Specific FAQs */}
            <div className="bg-white border border-gray-100 p-6 md:p-10 shadow-sm rounded-3xl">
              <h3 className="font-notoSerif text-2xl md:text-3xl font-bold text-black mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">help_outline</span>
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {(visa.faqs || [
                  { q: 'Is my visa approval guaranteed?', a: 'No, visa approval is at the sole discretion of the destination country\'s embassy or immigration authorities. However, our experts ensure your file has zero errors, achieving the highest possible success rate.' },
                  { q: 'What happens if my visa gets rejected?', a: 'Embassy fees and insurance costs are processed in external portals and are non-refundable. If rejected, we guide you on how to address the embassy objections and when to re-submit.' }
                ]).map((faq, idx) => (
                  <details key={idx} className="group border border-gray-200 rounded-2xl p-5 hover:border-primary/30 transition-colors [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex justify-between items-center font-bold font-manrope text-sm md:text-base text-black cursor-pointer">
                      <span className="flex items-center gap-3 pr-4">
                        <span className="text-primary font-black">Q.</span>
                        {faq.q}
                      </span>
                      <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-primary">expand_more</span>
                    </summary>
                    <p className="text-black/60 text-sm md:text-base leading-relaxed mt-4 pt-4 border-t border-gray-100 font-medium pl-6">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Sticky Form Sidebar) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              {/* Inquiry Card Form */}
              <div className="bg-white border border-gray-100 p-6 md:p-8 shadow-xl rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                
                <h3 className="font-notoSerif text-xl md:text-2xl font-bold text-black mb-2">Apply for Visa</h3>
                <p className="text-black/60 text-xs md:text-sm mb-6 font-medium">Submit your details to start your vetting process. We will check your documents and reach out on WhatsApp.</p>
                
                {submitSuccess ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="text-primary bg-primary/5 w-16 h-16 flex items-center justify-center rounded-full mx-auto">
                      <span className="material-symbols-outlined text-4xl font-bold animate-bounce">done_all</span>
                    </div>
                    <h4 className="font-bold text-black text-lg">Inquiry Sent Successfully!</h4>
                    <p className="text-black/60 text-xs leading-relaxed">We have pre-filled your inquiry details and redirected you to our official WhatsApp line. Click below if it did not open.</p>
                    <a 
                      href={buildWhatsAppUrl(`Assalamu Alaikum Habib Ul Hujjaj, I am interested in applying for ${visa.title}.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex bg-emerald-600 text-white w-full py-3.5 rounded-xl font-bold text-sm items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
                    >
                      Open WhatsApp Chat
                      <span className="material-symbols-outlined text-sm">chat</span>
                    </a>
                    <button 
                      onClick={() => setSubmitSuccess(false)}
                      className="text-primary hover:underline text-xs font-bold uppercase tracking-widest mt-4 block mx-auto cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 font-manrope">
                    <div>
                      <label className="block text-xs font-black text-black/50 uppercase tracking-widest mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Abubaker Siddique"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm font-medium bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-black/50 uppercase tracking-widest mb-1.5">WhatsApp Phone</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +92 300 1234567"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm font-medium bg-gray-50/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-black/50 uppercase tracking-widest mb-1.5">Travel Date</label>
                        <input 
                          type="date" 
                          name="travelDate" 
                          required
                          value={formData.travelDate}
                          onChange={handleInputChange}
                          className="w-full px-3 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-xs font-medium bg-gray-50/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-black/50 uppercase tracking-widest mb-1.5">Travelers</label>
                        <select 
                          name="travelers"
                          value={formData.travelers}
                          onChange={handleInputChange}
                          className="w-full px-3 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-xs font-medium bg-gray-50/50"
                        >
                          {[1, 2, 3, 4, 5, '6+'].map(num => (
                            <option key={num} value={num}>{num} Applicant{num !== 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-black/50 uppercase tracking-widest mb-1.5">Additional Request (Optional)</label>
                      <textarea 
                        name="message" 
                        rows="3"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Mention any custom travel dates or specific doubts..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm font-medium bg-gray-50/50"
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full bg-primary text-white py-4 rounded-xl font-bold text-sm hover:opacity-95 transition-all items-center justify-center gap-2 text-center shadow-lg hover:shadow-primary/20 flex cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing Vetting...
                        </>
                      ) : (
                        <>
                          Submit & Inquire on WhatsApp
                          <span className="material-symbols-outlined text-sm">chat</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Direct Helpline / Support Callout */}
              <div className="bg-primary text-white p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-8 -translate-y-8"></div>
                <h4 className="font-notoSerif text-lg font-bold mb-2">Need Immediate Help?</h4>
                <p className="text-white/70 text-xs md:text-sm mb-6 font-medium">Speak directly with our dedicated Hajj, Umrah, and Visit Visa specialists.</p>
                
                <div className="space-y-4">
                  <a href="tel:+923004634548" className="flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/20 p-3.5 rounded-xl transition-all">
                    <span className="material-symbols-outlined text-secondary text-2xl">call</span>
                    <div>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest font-black">Direct Hot Line</p>
                      <p className="font-bold text-sm">+92 300 463 4548</p>
                    </div>
                  </a>
                  <a href="mailto:info@habibulhujjaj.com" className="flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/20 p-3.5 rounded-xl transition-all">
                    <span className="material-symbols-outlined text-secondary text-2xl">mail</span>
                    <div>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest font-black">Email Queries</p>
                      <p className="font-bold text-sm">info@habibulhujjaj.com</p>
                    </div>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}

export default VisaDetail
