const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Murojaat', 'Grant ariza', 'Muammo yuborish'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'seen', 'closed'],
        default: 'new'
    }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
