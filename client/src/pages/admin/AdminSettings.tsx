import { useEffect, useState, useRef } from 'react';
import api from '../../services/api';
import { Settings as SettingsIcon, Phone, Mail, MapPin, Send, Instagram, Facebook, Youtube, Save, Plus, Trash2, Upload, Film } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import Loader from '../../components/common/Loader';
import { useTranslation } from 'react-i18next';

const AdminSettings = () => {
    const { showToast } = useToast();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('general');
    const [settings, setSettings] = useState<any>(null);
    const [newLeader, setNewLeader] = useState({ name: '', role: '', order: 0, image: null as any });

    // Hero slide form
    const [heroSlideForm, setHeroSlideForm] = useState({
        title: '', subtitle: '', mediaUrl: '', mediaType: 'image', file: null as File | null
    });
    const [heroUploading, setHeroUploading] = useState(false);
    const heroFileRef = useRef<HTMLInputElement>(null);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const res = await api.get('/settings');
            setSettings(res.data);
        } catch (err) {
            console.error(err);
            showToast('Sozlamalarni yuklashda xatolik', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Auto-seed ALL data (news, settings, hero slides, leadership) if empty
    const autoSeedAll = async () => {
        try {
            const res = await api.post('/seed');
            console.log('Auto-seed result:', res.data);
            // Re-fetch settings after seed
            const settingsRes = await api.get('/settings');
            setSettings(settingsRes.data);
        } catch (err) {
            console.error('Auto-seed error:', err);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    // Auto-seed when settings load and content is missing
    useEffect(() => {
        if (settings && (!settings.heroSlides || settings.heroSlides.length === 0)) {
            autoSeedAll();
        }
    }, [settings?.heroSlides?.length]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put('/settings', settings);
            showToast(t('admin.success_update'), 'success');
        } catch (err) {
            showToast('Saqlashda xatolik yuz berdi', 'error');
        }
    };

    // Add Hero Slide
    const handleAddHeroSlide = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', heroSlideForm.title);
        formData.append('subtitle', heroSlideForm.subtitle);

        if (heroSlideForm.file) {
            formData.append('media', heroSlideForm.file);
        } else if (heroSlideForm.mediaUrl) {
            formData.append('mediaUrl', heroSlideForm.mediaUrl);
            formData.append('mediaType', heroSlideForm.mediaType);
        } else {
            showToast('Rasm/video fayl yoki URL kiriting!', 'error');
            return;
        }

        try {
            setHeroUploading(true);
            await api.post('/settings/hero-slides', formData);
            showToast(t('admin.success_add'), 'success');
            setHeroSlideForm({ title: '', subtitle: '', mediaUrl: '', mediaType: 'image', file: null });
            if (heroFileRef.current) heroFileRef.current.value = '';
            fetchSettings();
        } catch (err: any) {
            showToast(err.response?.data?.message || 'Xatolik yuz berdi', 'error');
        } finally {
            setHeroUploading(false);
        }
    };

    // Delete Hero Slide
    const handleDeleteHeroSlide = async (id: string) => {
        if (!window.confirm(t('admin.confirm_delete'))) return;
        try {
            await api.delete(`/settings/hero-slides/${id}`);
            showToast(t('admin.success_delete'), 'success');
            fetchSettings();
        } catch (err) {
            showToast('Xatolik yuz berdi', 'error');
        }
    };

    const handleAddLeader = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', newLeader.name);
        data.append('role', newLeader.role);
        data.append('order', String(newLeader.order));
        if (newLeader.image) data.append('image', newLeader.image);
        try {
            await api.post('/settings/leaders', data);
            showToast(t('admin.success_add'), 'success');
            setNewLeader({ name: '', role: '', order: 0, image: null });
            fetchSettings();
        } catch (err) {
            showToast('Xatolik yuz berdi', 'error');
        }
    };

    const handleDeleteLeader = async (id: string) => {
        if (!window.confirm(t('admin.confirm_delete'))) return;
        try {
            await api.delete(`/settings/leaders/${id}`);
            showToast(t('admin.success_delete'), 'success');
            fetchSettings();
        } catch (err) {
            showToast('Xatolik', 'error');
        }
    };

    if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader /></div>;

    const baseUrl = (api.defaults.baseURL || '').replace('/api', '');

    return (
        <div className="space-y-8 max-w-5xl">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-gray-800 dark:text-white uppercase tracking-tight flex items-center gap-3">
                    <SettingsIcon /> {t('admin.settings')}
                </h2>
            </div>

            <div className="flex gap-3 border-b border-gray-100 dark:border-gray-700 pb-4 flex-wrap">
                {['general', 'hero', 'about', 'socials', 'leadership'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-primary text-white shadow-lg shadow-blue-900/20' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                    >
                        {tab === 'general' ? t('admin.contact_info') :
                            tab === 'hero' ? '🎬 Hero Slaydlar' :
                                tab === 'about' ? 'Biz haqimizda' :
                                    tab === 'socials' ? t('admin.social_links') :
                                        t('admin.leadership')}
                    </button>
                ))}
            </div>

            {/* ========== HERO SLIDES TAB ========== */}
            {activeTab === 'hero' && (
                <div className="space-y-8" data-aos="fade-up">
                    {/* Add New Slide Form */}
                    <form onSubmit={handleAddHeroSlide} className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
                        <h3 className="text-[13px] font-black text-primary uppercase tracking-[0.2em]">Yangi slayd qo'shish</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2">{t('admin.title')}</label>
                                <input
                                    type="text"
                                    placeholder="Masalan: Yoshlar festivaliga taklif"
                                    value={heroSlideForm.title}
                                    onChange={(e) => setHeroSlideForm({ ...heroSlideForm, title: e.target.value })}
                                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary font-bold text-gray-700 dark:text-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2">Qo'shimcha matn</label>
                                <input
                                    type="text"
                                    placeholder="Masalan: 2026-yil 15-mart"
                                    value={heroSlideForm.subtitle}
                                    onChange={(e) => setHeroSlideForm({ ...heroSlideForm, subtitle: e.target.value })}
                                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary font-bold text-gray-700 dark:text-gray-200"
                                />
                            </div>
                        </div>

                        {/* Upload Zone */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2">Rasm yoki Video</label>

                            <div className="flex gap-4 items-start">
                                {/* File Upload */}
                                <div
                                    onClick={() => heroFileRef.current?.click()}
                                    className={`flex-1 border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all hover:border-primary hover:bg-blue-50/30 dark:hover:bg-blue-900/10 ${heroSlideForm.file ? 'border-green-400 bg-green-50/30 dark:bg-green-900/10' : 'border-gray-200 dark:border-gray-700'}`}
                                >
                                    <input
                                        ref={heroFileRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                if (file.size > 50 * 1024 * 1024) {
                                                    showToast('Fayl hajmi 50MB dan oshmasligi kerak!', 'error');
                                                    return;
                                                }
                                                setHeroSlideForm({ ...heroSlideForm, file, mediaUrl: '' });
                                            }
                                        }}
                                    />
                                    <Upload size={24} className="mx-auto text-gray-400 dark:text-gray-500 mb-2" />
                                    {heroSlideForm.file ? (
                                        <p className="text-sm font-bold text-green-600 dark:text-green-400">{heroSlideForm.file.name}</p>
                                    ) : (
                                        <>
                                            <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Fayl tanlash</p>
                                            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">JPG, PNG, WebP, MP4, WebM • Maks 50MB</p>
                                        </>
                                    )}
                                </div>

                                <div className="text-[11px] font-black text-gray-300 dark:text-gray-600 uppercase self-center">yoki</div>

                                {/* URL Input */}
                                <div className="flex-1 space-y-2">
                                    <input
                                        type="text"
                                        placeholder="Tashqi URL (https://...)"
                                        value={heroSlideForm.mediaUrl}
                                        onChange={(e) => setHeroSlideForm({ ...heroSlideForm, mediaUrl: e.target.value, file: null })}
                                        className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary font-bold text-gray-700 dark:text-gray-200 text-sm"
                                    />
                                    <select
                                        value={heroSlideForm.mediaType}
                                        onChange={(e) => setHeroSlideForm({ ...heroSlideForm, mediaType: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400"
                                    >
                                        <option value="image">🖼️ Rasm</option>
                                        <option value="video">🎬 Video</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={heroUploading}
                            className="flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-green-700 transition-all disabled:opacity-50"
                        >
                            {heroUploading ? <><Loader /> Yuklanmoqda...</> : <><Plus size={18} /> Slayd qo'shish</>}
                        </button>
                    </form>

                    {/* Existing Slides */}
                    <div className="space-y-4">
                        <h3 className="text-[13px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                            Mavjud slaydlar ({settings?.heroSlides?.length || 0})
                        </h3>

                        {(!settings?.heroSlides || settings.heroSlides.length === 0) ? (
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-12 text-center">
                                <Film size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                <p className="text-sm font-bold text-gray-400 dark:text-gray-500">Hali slayd qo'shilmagan</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {settings.heroSlides.map((slide: any, idx: number) => (
                                    <div key={slide._id} data-aos="zoom-in" data-aos-delay={idx * 100} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group relative">
                                        {/* Media Preview */}
                                        <div className="relative h-48 bg-gray-100 dark:bg-gray-900">
                                            {slide.type === 'video' ? (
                                                <video
                                                    src={slide.mediaUrl.startsWith('http') ? slide.mediaUrl : `${baseUrl}${slide.mediaUrl}`}
                                                    className="w-full h-full object-cover"
                                                    muted
                                                    onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                                                    onMouseLeave={(e) => { (e.target as HTMLVideoElement).pause(); (e.target as HTMLVideoElement).currentTime = 0; }}
                                                />
                                            ) : (
                                                <img
                                                    src={slide.mediaUrl.startsWith('http') ? slide.mediaUrl : `${baseUrl}${slide.mediaUrl}`}
                                                    alt={slide.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                            {/* Badge */}
                                            <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${slide.type === 'video' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'}`}>
                                                {slide.type === 'video' ? '🎬 Video' : '🖼️ Rasm'}
                                            </span>
                                            {/* Order */}
                                            <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center text-xs font-black">
                                                {idx + 1}
                                            </span>
                                        </div>

                                        {/* Info */}
                                        <div className="p-4 space-y-2">
                                            <h4 className="font-black text-gray-800 dark:text-gray-200 text-sm uppercase tracking-tight truncate">
                                                {slide.title || 'Sarlavhasiz'}
                                            </h4>
                                            {slide.subtitle && (
                                                <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate">{slide.subtitle}</p>
                                            )}
                                            <button
                                                onClick={() => handleDeleteHeroSlide(slide._id)}
                                                className="flex items-center gap-1 text-red-500 text-[11px] font-bold hover:text-red-700 mt-2 transition-colors"
                                            >
                                                <Trash2 size={14} /> {t('admin.delete')}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ========== GENERAL TAB ========== */}
            {activeTab === 'general' && (
                <form onSubmit={handleUpdate} data-aos="fade-up" className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2">{t('admin.phone')}</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600" size={18} />
                                <input type="text" value={settings.contact.phone}
                                    onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, phone: e.target.value } })}
                                    className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary font-bold text-gray-700 dark:text-gray-200" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2">Email manzil</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600" size={18} />
                                <input type="email" value={settings.contact.email}
                                    onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })}
                                    className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary font-bold text-gray-700 dark:text-gray-200" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2">Manzil</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600" size={18} />
                            <input type="text" value={settings.contact.address}
                                onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, address: e.target.value } })}
                                className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary font-bold text-gray-700 dark:text-gray-200" />
                        </div>
                    </div>
                    <button type="submit" className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all">
                        <Save size={18} /> {t('admin.save')}
                    </button>
                </form>
            )}

            {/* ========== SOCIALS TAB ========== */}
            {activeTab === 'socials' && (
                <form onSubmit={handleUpdate} data-aos="fade-up" className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {['telegram', 'instagram', 'facebook', 'youtube'].map((social) => (
                            <div key={social} className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2">{social}</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600">
                                        {social === 'telegram' && <Send size={18} />}
                                        {social === 'instagram' && <Instagram size={18} />}
                                        {social === 'facebook' && <Facebook size={18} />}
                                        {social === 'youtube' && <Youtube size={18} />}
                                    </div>
                                    <input type="text" value={settings.socials[social]}
                                        onChange={(e) => setSettings({ ...settings, socials: { ...settings.socials, [social]: e.target.value } })}
                                        className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary font-bold text-gray-700 dark:text-gray-200" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all">
                        <Save size={18} /> {t('admin.save')}
                    </button>
                </form>
            )}

            {/* ========== ABOUT TAB ========== */}
            {activeTab === 'about' && (
                <form onSubmit={handleUpdate} data-aos="fade-up" className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2">Missiyamiz sarlavhasi</label>
                        <input type="text" value={settings.about.missionTitle}
                            onChange={(e) => setSettings({ ...settings, about: { ...settings.about, missionTitle: e.target.value } })}
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary font-bold text-gray-700 dark:text-gray-200" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2">Missiyamiz matni</label>
                        <textarea rows={6} value={settings.about.missionText}
                            onChange={(e) => setSettings({ ...settings, about: { ...settings.about, missionText: e.target.value } })}
                            className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary font-bold text-gray-700 dark:text-gray-200 resize-none" />
                    </div>
                    <button type="submit" className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all">
                        <Save size={18} /> {t('admin.save')}
                    </button>
                </form>
            )}

            {/* ========== LEADERSHIP TAB ========== */}
            {activeTab === 'leadership' && (
                <div className="space-y-8" data-aos="fade-up">
                    <form onSubmit={handleAddLeader} className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
                        <h4 className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Yangi rahbar qo'shish</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <input placeholder={t('admin.full_name')} value={newLeader.name}
                                onChange={(e) => setNewLeader({ ...newLeader, name: e.target.value })}
                                className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl font-bold text-sm text-gray-700 dark:text-gray-200" required />
                            <input placeholder="Lavozimi" value={newLeader.role}
                                onChange={(e) => setNewLeader({ ...newLeader, role: e.target.value })}
                                className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl font-bold text-sm text-gray-700 dark:text-gray-200" required />
                            <input type="file" onChange={(e) => setNewLeader({ ...newLeader, image: e.target.files?.[0] })}
                                className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl font-bold text-sm text-gray-700 dark:text-gray-200" />
                        </div>
                        <button type="submit" className="flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all">
                            <Plus size={18} /> {t('admin.add')}
                        </button>
                    </form>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {settings.leadership.map((leader: any, idx: number) => (
                            <div key={leader._id} data-aos="zoom-in" data-aos-delay={idx * 100} className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center group">
                                <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden mb-4 border-4 border-white dark:border-gray-600 shadow-lg">
                                    <img src={leader.image || '/avatar.png'} alt={leader.name} className="w-full h-full object-cover" />
                                </div>
                                <h5 className="font-black text-gray-800 dark:text-gray-200 uppercase text-xs tracking-tight">{leader.name}</h5>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-black tracking-widest mt-1">{leader.role}</p>
                                <button onClick={() => handleDeleteLeader(leader._id)}
                                    className="mt-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSettings;
