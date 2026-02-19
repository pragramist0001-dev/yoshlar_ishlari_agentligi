const mongoose = require('mongoose');
const slugify = require('slugify');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Tadbirlar', "E'lonlar", 'Grantlar', 'Tanlovlar'],
        required: true
    },
    image: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

newsSchema.pre('save', function () {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: false,
            remove: /[*+~.()'\"!:@]/g
        }) || Date.now().toString();
    }
});

module.exports = mongoose.model('News', newsSchema);
