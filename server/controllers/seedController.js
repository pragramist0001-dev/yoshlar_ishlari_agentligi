const News = require('../models/News');
const Settings = require('../models/Settings');
const Project = require('../models/Project');
const Document = require('../models/Document');

const seedAll = async (req, res) => {
    try {
        const results = { news: 0, settings: false, heroSlides: 0, leadership: 0, projects: 0, documents: 0 };

        // ==================== SEED NEWS ====================
        const existingNews = await News.countDocuments();
        if (existingNews === 0) {
            const newsData = [
                {
                    title: 'Yoshlar festivali — 2026 munosabati bilan tantanali tadbirlar boshlandi',
                    description: 'O\'zbekiston bo\'ylab minglab yoshlar ishtirokida yirik festival boshlandi. Tadbirda turli yo\'nalishlar bo\'yicha tanlovlar o\'tkazilmoqda.',
                    content: 'O\'zbekiston Respublikasi Yoshlar ishlari agentligi tashabbusi bilan "Yoshlar festivali — 2026" nomi ostida respublika miqyosidagi katta festival boshlandi. Festivalda barcha viloyatlardan yoshlar ishtirok etmoqda.\n\nFestival doirasida quyidagi yo\'nalishlar bo\'yicha tanlovlar o\'tkazilmoqda:\n- IT va raqamli texnologiyalar\n- San\'at va madaniyat\n- Sport va sog\'lom turmush tarzi\n- Tadbirkorlik va startaplar\n\nG\'oliblar davlat mukofotlari va grantlar bilan taqdirlanadi.',
                    category: 'Tadbirlar',
                    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
                    views: 0
                },
                {
                    title: 'Yoshlar uchun 500 ta grant ajratildi — ariza topshirish boshlandi',
                    description: 'Yoshlar ishlari agentligi tomonidan tadbirkorlik, ta\'lim va innovatsiya loyihalariga 500 ta grant ajratildi.',
                    content: 'Yoshlar ishlari agentligi yoshlarning tadbirkorlik, ta\'lim va innovatsiya sohasidagi loyihalarini qo\'llab-quvvatlash maqsadida 500 ta grant ajratdi.\n\nGrant shartlari:\n- Ariza beruvchi 18-30 yosh orasida bo\'lishi kerak\n- Loyiha ijtimoiy ahamiyatga ega bo\'lishi lozim\n- Moliyaviy rejasi aniq ishlab chiqilgan bo\'lishi kerak\n\nAriza topshirish muddati: 2026-yil 1-mart — 15-aprel.\n\nBatafsil ma\'lumot uchun agentlikning rasmiy veb-saytiga murojaat qiling.',
                    category: 'Grantlar',
                    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
                    views: 0
                },
                {
                    title: '"Eng yaxshi yoshlar tashabbusi" tanlovi e\'lon qilindi',
                    description: 'Butun respublika bo\'ylab "Eng yaxshi yoshlar tashabbusi — 2026" tanlovi boshlandi. G\'olib 50 million so\'m bilan mukofotlanadi.',
                    content: '"Eng yaxshi yoshlar tashabbusi — 2026" respublika tanlovi e\'lon qilindi!\n\nTanlov yo\'nalishlari:\n1. Ekologiya va atrof-muhit muhofazasi\n2. Raqamli texnologiyalar\n3. Ijtimoiy tadbirkorlik\n4. Madaniy meros saqlash\n\nHar bir yo\'nalishda g\'olib 50 million so\'m miqdorida pul mukofoti bilan taqdirlanadi.\n\nAriza topshirish: yoshlar.uz saytidan onlayn tarzda amalga oshiriladi.',
                    category: 'Tanlovlar',
                    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
                    views: 0
                },
                {
                    title: 'IT kurslarga ro\'yxatdan o\'tish boshlandi!',
                    description: 'Yoshlar uchun bepul IT kurslari — dasturlash, grafik dizayn va SMM yo\'nalishlarida. Joylar cheklangan!',
                    content: 'Yoshlar ishlari agentligi va IT Park hamkorligida yoshlar uchun bepul ta\'lim kurslari tashkil etilmoqda.\n\nYo\'nalishlar:\n• Web dasturlash (HTML, CSS, JavaScript, React)\n• Mobil dasturlash (Flutter, React Native)\n• Grafik dizayn (Figma, Adobe)\n• SMM va raqamli marketing\n\nKurslar davomiyligi: 3 oy\nDars vaqti: Dushanba-Juma, 14:00-17:00\n\nRo\'yxatdan o\'tish: agentlik ofisida yoki onlayn tarzda',
                    category: "E'lonlar",
                    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
                    views: 0
                }
            ];

            for (const item of newsData) {
                await News.create(item);
            }
            results.news = newsData.length;
        }

        // ==================== SEED PROJECTS ====================
        const existingProjects = await Project.countDocuments();
        if (existingProjects === 0) {
            const projectData = [
                {
                    title: 'Yoshlar tadbirkorlik markazi',
                    description: 'Surxondaryo viloyatida yoshlar uchun zamonaviy tadbirkorlik markazini tashkil etish. Markazda biznes-reja tuzish, mentorlik, ko-working maydoni va startap tezlatish dasturi mavjud. 100 dan ortiq yoshlarga xizmat ko\'rsatilmoqda.',
                    status: 'active',
                    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
                    deadline: new Date('2026-12-31'),
                    views: 0
                },
                {
                    title: '"Raqamli avlod" dasturi',
                    description: 'Yoshlarni IT sohasiga jalb qilish va raqamli ko\'nikmalarini rivojlantirish bo\'yicha keng qamrovli dastur. Dastur doirasida 1000 ta yoshga bepul dasturlash kurslari tashkil etiladi. Hamkorlar: IT Park, EPAM, Najot Ta\'lim.',
                    status: 'active',
                    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
                    deadline: new Date('2026-09-01'),
                    views: 0
                },
                {
                    title: '"Sog\'lom avlod — sog\'lom kelajak" sport dasturi',
                    description: 'Viloyat yoshlari o\'rtasida sportni ommalashtirish va sog\'lom turmush tarzini targ\'ib qilish maqsadidagi loyiha. 15 ta tumanda sport inshootlari zamonaviylashtirild va 50 ta sport to\'garagida bepul mashg\'ulotlar tashkil etildi.',
                    status: 'completed',
                    image: 'https://images.unsplash.com/photo-1461896836934-bd45ba7ab96e?auto=format&fit=crop&w=1200&q=80',
                    deadline: new Date('2025-12-15'),
                    views: 0
                },
                {
                    title: 'Yoshlar volontyorlik harakati',
                    description: 'Surxondaryo viloyatidagi yoshlar o\'rtasida volontyorlik madaniyatini shakllantirish va ko\'ngillilar safini kengaytirish loyihasi. 500 dan ortiq yoshlar volontyor sifatida ro\'yxatdan o\'tdi. Ekologik aksiyalar va ijtimoiy yordamlar tashkil etilmoqda.',
                    status: 'active',
                    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80',
                    deadline: new Date('2026-06-30'),
                    views: 0
                }
            ];

            await Project.insertMany(projectData);
            results.projects = projectData.length;
        }

        // ==================== SEED DOCUMENTS ====================
        const existingDocs = await Document.countDocuments();
        if (existingDocs === 0) {
            const documentData = [
                {
                    title: 'O\'zbekiston Respublikasi Prezidentining "Yoshlar siyosatini amalga oshirish chora-tadbirlari to\'g\'risida"gi Farmoni',
                    fileUrl: 'https://lex.uz/docs/6317959',
                    category: 'Prezident qarori',
                    date: new Date('2026-01-15')
                },
                {
                    title: 'Yoshlar ishlari agentligi faoliyatini yanada takomillashtirish to\'g\'risida Prezident qarori',
                    fileUrl: 'https://lex.uz/docs/6200100',
                    category: 'Prezident qarori',
                    date: new Date('2025-11-20')
                },
                {
                    title: 'Vazirlar Mahkamasining "Yoshlar tadbirkorligini qo\'llab-quvvatlash" to\'g\'risidagi qarori',
                    fileUrl: 'https://lex.uz/docs/6400200',
                    category: 'Vazirlar qarori',
                    date: new Date('2026-02-01')
                },
                {
                    title: 'Yoshlar uchun imtiyozli kredit ajratish tartibi to\'g\'risida Vazirlar Mahkamasi qarori',
                    fileUrl: 'https://lex.uz/docs/6350150',
                    category: 'Vazirlar qarori',
                    date: new Date('2025-12-10')
                },
                {
                    title: 'Agentlik buyrug\'i: Yoshlar markazlari faoliyatini tashkil etish bo\'yicha yo\'riqnoma',
                    fileUrl: 'https://yoshlar.uz/docs/yoriqnoma-2026.pdf',
                    category: "Agentlik buyrug'i",
                    date: new Date('2026-01-25')
                },
                {
                    title: 'Surxondaryo viloyati Yoshlar ishlari agentligi to\'g\'risida Nizom',
                    fileUrl: 'https://yoshlar.uz/docs/nizom-surxondaryo.pdf',
                    category: 'Nizomlar',
                    date: new Date('2025-06-01')
                }
            ];

            await Document.insertMany(documentData);
            results.documents = documentData.length;
        }

        // ==================== SEED SETTINGS ====================
        let settings = await Settings.findOne();
        if (!settings) settings = await Settings.create({});

        // Update contact & socials
        settings.contact = {
            phone: '+998 76 224-24-24',
            email: 'yoshlar@surxondaryo.uz',
            address: 'Termiz sh., At-Termiziy ko\'chasi, 12-uy',
            mapUrl: ''
        };
        settings.socials = {
            telegram: 'https://t.me/yoshlar_agentligi_surxon',
            instagram: 'https://instagram.com/yoshlaragentligi_surxon',
            facebook: 'https://facebook.com/yoshlaragentligi',
            youtube: 'https://youtube.com/@yoshlaragentligi'
        };
        settings.about = {
            missionTitle: 'Yoshlar kelajagi — bizning maqsadimiz',
            missionText: 'Surxondaryo viloyati Yoshlar ishlari agentligi — yoshlarning huquq va manfaatlarini himoya qilish, ularning ta\'lim, sport, madaniyat va tadbirkorlik sohasidagi salohiyatini ro\'yobga chiqarish yo\'lida faoliyat yuritadi.',
            heroImage: '',
            heroVideo: ''
        };
        results.settings = true;

        // Seed hero slides if empty
        if (!settings.heroSlides || settings.heroSlides.length === 0) {
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
            results.heroSlides = 3;
        }

        // Seed leadership if empty
        if (!settings.leadership || settings.leadership.length === 0) {
            settings.leadership = [
                {
                    name: 'Alimov Jasur Bahodirovich',
                    role: 'Agentlik direktori',
                    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                    order: 0
                },
                {
                    name: 'Karimova Nilufar Shavkatovna',
                    role: 'Direktor o\'rinbosari',
                    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
                    order: 1
                },
                {
                    name: 'Toshmatov Sardor Anvarovich',
                    role: 'Yoshlar siyosati bo\'limi boshlig\'i',
                    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
                    order: 2
                }
            ];
            results.leadership = 3;
        }

        await settings.save();

        res.json({
            message: 'Barcha ma\'lumotlar muvaffaqiyatli qo\'shildi!',
            results
        });
    } catch (error) {
        console.error('Seed error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { seedAll };
