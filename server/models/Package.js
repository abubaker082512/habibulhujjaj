const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., Economy, 3 Star, 4 Star, 5 Star, International
  duration: { type: String, required: true }, // e.g., 15 Days
  location: { type: String, required: true }, // e.g., Makkah, Madinah
  hotelName: { type: String },
  distanceFromHaram: { type: String },
  imageUrl: { type: String },
  includes: [String],
  itinerary: [{
    day: String,
    title: String,
    description: String
  }],
  stars: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
