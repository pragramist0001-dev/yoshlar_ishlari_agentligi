const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Prezident qarori', 'Vazirlar qarori', "Agentlik buyrug'i", 'Nizomlar'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
