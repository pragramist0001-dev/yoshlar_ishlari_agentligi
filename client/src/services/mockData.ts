export const mockNews = [
    {
        _id: '1',
        title: 'Yoshlar festivali — 2026 munosabati bilan tantanali tadbirlar boshlandi',
        description: 'O\'zbekiston bo\'ylab minglab yoshlar ishtirokida yirik festival boshlandi. Tadbirda turli yo\'nalishlar bo\'yicha tanlovlar o\'tkazilmoqda.',
        content: 'O\'zbekiston Respublikasi Yoshlar ishlari agentligi tashabbusi bilan "Yoshlar festivali — 2026" nomi ostida respublika miqyosidagi katta festival boshlandi. Festivalda barcha viloyatlardan yoshlar ishtirok etmoqda.\n\nFestival doirasida quyidagi yo\'nalishlar bo\'yicha tanlovlar o\'tkazilmoqda:\n- IT va raqamli texnologiyalar\n- San\'at va madaniyat\n- Sport va sog\'lom turmush tarzi\n- Tadbirkorlik va startaplar\n\nG\'oliblar davlat mukofotlari va grantlar bilan taqdirlanadi.',
        category: 'Tadbirlar',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
        views: 1250,
        createdAt: new Date().toISOString()
    },
    {
        _id: '2',
        title: 'Yoshlar uchun 500 ta grant ajratildi — ariza topshirish boshlandi',
        description: 'Yoshlar ishlari agentligi tomonidan tadbirkorlik, ta\'lim va innovatsiya loyihalariga 500 ta grant ajratildi.',
        content: 'Yoshlar ishlari agentligi yoshlarning tadbirkorlik, ta\'lim va innovatsiya sohasidagi loyihalarini qo\'llab-quvvatlash maqsadida 500 ta grant ajratdi.\n\nGrant shartlari:\n- Ariza beruvchi 18-30 yosh orasida bo\'lishi kerak\n- Loyiha ijtimoiy ahamiyatga ega bo\'lishi lozim\n- Moliyaviy rejasi aniq ishlab chiqilgan bo\'lishi kerak\n\nAriza topshirish muddati: 2026-yil 1-mart — 15-aprel.\n\nBatafsil ma\'lumot uchun agentlikning rasmiy veb-saytiga murojaat qiling.',
        category: 'Grantlar',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
        views: 980,
        createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
        _id: '3',
        title: '"Eng yaxshi yoshlar tashabbusi" tanlovi e\'lon qilindi',
        description: 'Butun respublika bo\'ylab "Eng yaxshi yoshlar tashabbusi — 2026" tanlovi boshlandi. G\'olib 50 million so\'m bilan mukofotlanadi.',
        content: '"Eng yaxshi yoshlar tashabbusi — 2026" respublika tanlovi e\'lon qilindi!\n\nTanlov yo\'nalishlari:\n1. Ekologiya va atrof-muhit muhofazasi\n2. Raqamli texnologiyalar\n3. Ijtimoiy tadbirkorlik\n4. Madaniy meros saqlash\n\nHar bir yo\'nalishda g\'olib 50 million so\'m miqdorida pul mukofoti bilan taqdirlanadi.\n\nAriza topshirish: yoshlar.uz saytidan onlayn tarzda amalga oshiriladi.',
        category: 'Tanlovlar',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
        views: 750,
        createdAt: new Date(Date.now() - 172800000).toISOString()
    },
    {
        _id: '4',
        title: 'IT kurslarga ro\'yxatdan o\'tish boshlandi!',
        description: 'Yoshlar uchun bepul IT kurslari — dasturlash, grafik dizayn va SMM yo\'nalishlarida. Joylar cheklangan!',
        content: 'Yoshlar ishlari agentligi va IT Park hamkorligida yoshlar uchun bepul ta\'lim kurslari tashkil etilmoqda.\n\nYo\'nalishlar:\n• Web dasturlash (HTML, CSS, JavaScript, React)\n• Mobil dasturlash (Flutter, React Native)\n• Grafik dizayn (Figma, Adobe)\n• SMM va raqamli marketing\n\nKurslar davomiyligi: 3 oy\nDars vaqti: Dushanba-Juma, 14:00-17:00\n\nRo\'yxatdan o\'tish: agentlik ofisida yoki onlayn tarzda',
        category: "E'lonlar",
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
        views: 2100,
        createdAt: new Date(Date.now() - 259200000).toISOString()
    }
];

export const mockProjects = [
    {
        _id: '1',
        title: 'Yoshlar tadbirkorlik markazi',
        description: 'Surxondaryo viloyatida yoshlar uchun zamonaviy tadbirkorlik markazini tashkil etish. Markazda biznes-reja tuzish, mentorlik, ko-working maydoni va startap tezlatish dasturi mavjud.',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        deadline: '2026-12-31',
        views: 450,
        createdAt: new Date().toISOString()
    },
    {
        _id: '2',
        title: '"Raqamli avlod" dasturi',
        description: 'Yoshlarni IT sohasiga jalb qilish va raqamli ko\'nikmalarini rivojlantirish bo\'yicha keng qamrovli dastur. Dastur doirasida 1000 ta yoshga bepul dasturlash kurslari tashkil etiladi.',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        deadline: '2026-09-01',
        views: 890,
        createdAt: new Date().toISOString()
    },
    {
        _id: '3',
        title: '"Sog\'lom avlod — sog\'lom kelajak" sport dasturi',
        description: 'Viloyat yoshlari o\'rtasida sportni ommalashtirish va sog\'lom turmush tarzini targ\'ib qilish maqsadidagi loyiha.',
        status: 'completed',
        image: 'https://images.unsplash.com/photo-1461896836934-bd45ba7ab96e?auto=format&fit=crop&w=1200&q=80',
        deadline: '2025-12-15',
        views: 1200,
        createdAt: new Date().toISOString()
    },
    {
        _id: '4',
        title: 'Yoshlar volontyorlik harakati',
        description: 'Surxondaryo viloyatidagi yoshlar o\'rtasida volontyorlik madaniyatini shakllantirish va ko\'ngillilar safini kengaytirish loyihasi.',
        status: 'active',
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80',
        deadline: '2026-06-30',
        views: 600,
        createdAt: new Date().toISOString()
    }
];

export const mockDocuments = [
    {
        _id: '1',
        title: 'O\'zbekiston Respublikasi Prezidentining "Yoshlar siyosatini amalga oshirish chora-tadbirlari to\'g\'risida"gi Farmoni',
        fileUrl: '#',
        category: 'Prezident qarori',
        date: '2026-01-15'
    },
    {
        _id: '2',
        title: 'Vazirlar Mahkamasining "Yoshlar tadbirkorligini qo\'llab-quvvatlash" to\'g\'risidagi qarori',
        fileUrl: '#',
        category: 'Vazirlar qarori',
        date: '2026-02-01'
    },
    {
        _id: '3',
        title: 'Agentlik buyrug\'i: Yoshlar markazlari faoliyatini tashkil etish bo\'yicha yo\'riqnoma',
        fileUrl: '#',
        category: "Agentlik buyrug'i",
        date: '2026-01-25'
    }
];

export const mockSettings = {
    contact: {
        phone: '+998 76 224-24-24',
        email: 'yoshlar@surxondaryo.uz',
        address: 'Termiz sh., At-Termiziy ko\'chasi, 12-uy',
    },
    socials: {
        telegram: 'https://t.me/yoshlar_agentligi_surxon',
        instagram: 'https://instagram.com/yoshlaragentligi_surxon',
        facebook: 'https://facebook.com/yoshlaragentligi',
        youtube: 'https://youtube.com/@yoshlaragentligi'
    },
    about: {
        missionTitle: 'Yoshlar kelajagi — bizning maqsadimiz',
        missionText: 'Surxondaryo viloyati Yoshlar ishlari agentligi — yoshlarning huquq va manfaatlarini himoya qilish, ularning salohiyatini ro\'yobga chiqarish yo\'lida faoliyat yuritadi.',
    },
    heroSlides: [
        {
            _id: '1',
            type: 'image',
            mediaUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=2000&q=80',
            title: 'YOSHLAR — KELAJAK BUNYODKORLARI',
            subtitle: 'O\'zbekiston Respublikasi Yoshlar ishlari agentligi yoshlarni qo\'llab-quvvatlash va ularning salohiyatini ro\'yobga chiqarish yo\'lida xizmat qiladi.',
            order: 0
        },
        {
            _id: '2',
            type: 'video',
            mediaUrl: 'https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4',
            title: 'YANGI AVLOD — YANGI IMKONIYATLAR',
            subtitle: 'Yoshlar uchun ta\'lim, kasb-hunar va tadbirkorlik sohasida keng imkoniyatlar yaratilmoqda.',
            order: 1
        },
        {
            _id: '3',
            type: 'image',
            mediaUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=80',
            title: 'BIRDAMLIK VA HAMKORLIK',
            subtitle: 'Yoshlar tashabbuslarini qo\'llab-quvvatlash, jamiyatda faol ishtirok etishga undash — bizning vazifamiz.',
            order: 2
        }
    ],
    leadership: [
        {
            _id: '1',
            name: 'Alimov Jasur Bahodirovich',
            role: 'Agentlik direktori',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
            order: 0
        },
        {
            _id: '2',
            name: 'Karimova Nilufar Shavkatovna',
            role: 'Direktor o\'rinbosari',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
            order: 1
        }
    ]
};

export const mockStats = {
    stats: [
        { label: 'Yoshlar', value: '750k+', icon: 'Users', color: 'bg-blue-500' },
        { label: 'Loyihalar', value: '120+', icon: 'Target', color: 'bg-green-500' },
        { label: 'Hujjatlar', value: '450+', icon: 'FileText', color: 'bg-purple-500' },
        { label: 'Yangiliklar', value: '1.2k', icon: 'Newspaper', color: 'bg-orange-500' },
    ],
    recentApplications: [
        { _id: '1', fullName: 'Azizov Bekzod', subject: 'Grant yutib olish bo\'yicha', status: 'pending', createdAt: new Date().toISOString() },
        { _id: '2', fullName: 'Karimova Nargiza', subject: 'IT kurslarga yozilish', status: 'viewed', createdAt: new Date().toISOString() },
        { _id: '3', fullName: 'Tursunov Alisher', subject: 'Volontyorlik', status: 'completed', createdAt: new Date().toISOString() },
    ]
};
