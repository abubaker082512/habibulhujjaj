export const WHATSAPP_NUMBER = '923004634548'

const normalizePhone = (phone) => {
  return String(phone || WHATSAPP_NUMBER).replace(/\D/g, '')
}

export const buildWhatsAppUrl = (message, phone = WHATSAPP_NUMBER) => {
  const cleanPhone = normalizePhone(phone)
  const encoded = encodeURIComponent(String(message || '').trim())
  return `https://wa.me/${cleanPhone}?text=${encoded}`
}

export const buildContactMessage = ({ name, email, phone, subject, message }) => {
  const lines = [
    'Assalamu Alaikum Habib Ul Hujjaj,',
    '',
    'I have a new inquiry from the website.',
    name ? `Name: ${name}` : '',
    email ? `Email: ${email}` : '',
    phone ? `Phone: ${phone}` : '',
    subject ? `Subject: ${subject}` : '',
    message ? `Message: ${message}` : '',
    '',
    'Please respond with the next steps. JazakAllah Khair!'
  ].filter(Boolean)
  return lines.join('\n')
}

export const buildPackageInquiryMessage = ({ packageTitle, packagePrice, city, travelers, date, name, phone }) => {
  const lines = [
    'Assalamu Alaikum Habib Ul Hujjaj,',
    '',
    `I am interested in the package: ${packageTitle}`,
    packagePrice ? `Package Price: ${packagePrice}` : '',
    city ? `Departure City: ${city}` : '',
    travelers ? `Travelers: ${travelers}` : '',
    date ? `Preferred Date: ${date}` : '',
    name ? `Name: ${name}` : '',
    phone ? `Phone: ${phone}` : '',
    '',
    'Please share the booking details and availability. JazakAllah Khair!'
  ].filter(Boolean)
  return lines.join('\n')
}

export const buildServiceInquiryMessage = ({ serviceTitle, serviceType, serviceFee }) => {
  const lines = [
    'Assalamu Alaikum Habib Ul Hujjaj,',
    '',
    `I would like to apply for your service: ${serviceTitle}`,
    serviceType ? `Service Type: ${serviceType}` : '',
    serviceFee ? `Fee: ${serviceFee}` : '',
    '',
    'Please send me the application steps and required documents. JazakAllah Khair!'
  ].filter(Boolean)
  return lines.join('\n')
}

export const buildPackageShortMessage = (pkg) => {
  const title = pkg.title || pkg.name || 'Umrah Package'
  const price = pkg.price ? (typeof pkg.price === 'number' ? `PKR ${pkg.price.toLocaleString()}` : pkg.price) : ''
  return [
    'Assalamu Alaikum Habib Ul Hujjaj,',
    '',
    `I am interested in your package: ${title}`,
    price ? `Price: ${price}` : '',
    pkg.location ? `Location: ${pkg.location}` : '',
    pkg.airline ? `Airline: ${pkg.airline}` : '',
    '',
    'Please share more details. JazakAllah Khair!'
  ].filter(Boolean).join('\n')
}

export const buildVisaShortMessage = (visa) => {
  const title = visa.title || visa.name || 'Visa Service'
  const lines = [
    'Assalamu Alaikum Habib Ul Hujjaj,',
    '',
    `I would like to apply for: ${title}`,
    visa.processing ? `Processing Time: ${visa.processing}` : '',
    visa.fee ? `Fee: ${visa.fee}` : '',
    '',
    'Please send the next steps and required documents. JazakAllah Khair!'
  ].filter(Boolean)
  return lines.join('\n')
}
