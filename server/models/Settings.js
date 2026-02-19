const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    contact: {
        phone: { type: String, default: '+998 76 224-24-24' },
        email: { type: String, default: 'termiz@yoshlar.uz' },
        address: { type: String, default: 'Termiz sh., At-Termiziy ko\'chasi, 12-uy' },
        mapUrl: { type: String, default: '' }
    },
    socials: {
        telegram: { type: String, default: 'https://t.me/yoshlar_agentligi' },
        instagram: { type: String, default: 'https://instagram.com/yoshlaragentligi' },
        facebook: { type: String, default: 'https://facebook.com/yoshlaragentligi' },
        youtube: { type: String, default: 'https://youtube.com/yoshlaragentligi' }
    },
    about: {
        missionTitle: { type: String, default: 'Yoshlar kelajagi - bizning maqsadimiz' },
        missionText: { type: String, default: 'Davlat yoshlar siyosatini amalga oshirish, yoshlarning huquq va manfaatlarini himoya qilish...' },
        heroImage: { type: String, default: '' },
        heroVideo: { type: String, default: '' }
    },
    // Hero Slides for Swiper carousel
    heroSlides: [{
        type: { type: String, enum: ['image', 'video'], required: true },
        mediaUrl: { type: String, required: true },
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        order: { type: Number, default: 0 }
    }],
    leadership: [{
        name: { type: String, required: true },
        role: { type: String, required: true },
        image: { type: String },
        order: { type: Number, default: 0 }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
