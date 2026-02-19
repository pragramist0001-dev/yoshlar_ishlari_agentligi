const Settings = require('../models/Settings');
const path = require('path');
const fs = require('fs');

const getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings(req.body);
        } else {
            Object.assign(settings, req.body);
        }
        await settings.save();
        res.json(settings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add Hero Slide (image or video via file upload)
const addHeroSlide = async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) settings = await Settings.create({});

        const { title, subtitle, order, mediaType, mediaUrl: externalUrl } = req.body;
        let mediaUrl = '';
        let type = mediaType || 'image';

        if (req.file) {
            mediaUrl = `/uploads/${req.file.filename}`;
            type = req.file.mimetype.startsWith('video/') ? 'video' : 'image';
        } else if (externalUrl) {
            mediaUrl = externalUrl;
        } else {
            return res.status(400).json({ message: 'Rasm yoki video fayl yuklang yoki URL kiriting' });
        }

        settings.heroSlides.push({
            type,
            mediaUrl,
            title: title || '',
            subtitle: subtitle || '',
            order: order || settings.heroSlides.length
        });

        // Sort by order
        settings.heroSlides.sort((a, b) => a.order - b.order);
        await settings.save();

        res.status(201).json({ message: 'Hero slayd qo\'shildi!', settings });
    } catch (error) {
        console.error('Add hero slide error:', error);
        res.status(400).json({ message: error.message });
    }
};

// Delete Hero Slide
const deleteHeroSlide = async (req, res) => {
    try {
        const settings = await Settings.findOne();
        if (!settings) return res.status(404).json({ message: 'Settings not found' });

        const slide = settings.heroSlides.id(req.params.id);
        if (slide && slide.mediaUrl.startsWith('/uploads/')) {
            const filePath = path.join(__dirname, '..', slide.mediaUrl);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        settings.heroSlides = settings.heroSlides.filter(s => s._id.toString() !== req.params.id);
        await settings.save();
        res.json({ message: 'Slayd o\'chirildi', settings });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Upload Hero Media (legacy single upload - kept for backwards compatibility)
const uploadHeroMedia = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Fayl yuklanmadi' });

        let settings = await Settings.findOne();
        if (!settings) settings = await Settings.create({});

        const filePath = `/uploads/${req.file.filename}`;
        const mime = req.file.mimetype;

        if (mime.startsWith('video/')) {
            settings.about.heroVideo = filePath;
            settings.about.heroImage = '';
        } else {
            settings.about.heroImage = filePath;
            settings.about.heroVideo = '';
        }
        await settings.save();
        res.json({ message: 'Hero media yuklandi!', type: mime.startsWith('video/') ? 'video' : 'image', path: filePath, settings });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteHeroMedia = async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) return res.status(404).json({ message: 'Settings not found' });
        settings.about.heroVideo = '';
        settings.about.heroImage = '';
        await settings.save();
        res.json({ message: 'Hero media o\'chirildi', settings });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addLeader = async (req, res) => {
    try {
        const settings = await Settings.findOne();
        if (!settings) return res.status(404).json({ message: 'Settings not found' });

        const { name, role, order } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';

        settings.leadership.push({ name, role, image, order });
        await settings.save();
        res.status(201).json(settings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteLeader = async (req, res) => {
    try {
        const settings = await Settings.findOne();
        if (!settings) return res.status(404).json({ message: 'Settings not found' });

        settings.leadership = settings.leadership.filter(l => l._id.toString() !== req.params.id);
        await settings.save();
        res.json(settings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Seed default hero slides into DB
const seedDefaultHeroSlides = async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) settings = await Settings.create({});

        // Only seed if no slides exist
        if (settings.heroSlides && settings.heroSlides.length > 0) {
            return res.json({ message: 'Slaydlar allaqachon mavjud', settings });
        }

        settings.heroSlides = [
            {
                type: 'image',
                mediaUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=2000&q=80',
                title: 'YOSHLAR — KELAJAK BUNYODKORLARI',
                subtitle: 'O\'zbekiston Respublikasi Yoshlar ishlari agentligi yoshlarni qo\'llab-quvvatlash va ularning salohiyatini ro\'yobga chiqarish yo\'lida xizmat qiladi.',
                order: 0
            },
            {
                type: 'video',
                mediaUrl: 'https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4',
                title: 'YANGI AVLOD — YANGI IMKONIYATLAR',
                subtitle: 'Yoshlar uchun ta\'lim, kasb-hunar va tadbirkorlik sohasida keng imkoniyatlar yaratilmoqda.',
                order: 1
            },
            {
                type: 'image',
                mediaUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=80',
                title: 'BIRDAMLIK VA HAMKORLIK',
                subtitle: 'Yoshlar tashabbuslarini qo\'llab-quvvatlash, jamiyatda faol ishtirok etishga undash — bizning vazifamiz.',
                order: 2
            }
        ];

        await settings.save();
        res.json({ message: 'Default slaydlar qo\'shildi!', settings });
    } catch (error) {
        console.error('Seed default slides error:', error);
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getSettings, updateSettings, addLeader, deleteLeader, uploadHeroMedia, deleteHeroMedia, addHeroSlide, deleteHeroSlide, seedDefaultHeroSlides };

