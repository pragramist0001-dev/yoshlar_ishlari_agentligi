import Hero from '../components/home/Hero';
import NewsSection from '../components/home/NewsSection';
import HomeStats from '../components/home/HomeStats';
import { Send, Instagram, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const [settings, setSettings] = useState<any>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await api.get('/settings');
                setSettings(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSettings();
    }, []);

    return (
        <div className="flex flex-col">
            <Hero />

            {/* Section Title Divider */}
            <div className="py-12 bg-white text-center">
                <h2 className="text-[13px] font-black text-[#1E3A8A] uppercase tracking-[0.3em] inline-block border-b-2 border-[#1E3A8A] pb-2">
                    {t('home.latest_news')}
                </h2>
            </div>

            <NewsSection />

            <div className="bg-gray-50 py-12 text-center">
                <Link to="/news" className="text-[11px] font-black text-gray-500 uppercase tracking-widest hover:text-[#1E3A8A] transition-colors border-b border-gray-200">
                    {t('home.all_news')}
                </Link>
            </div>

            <HomeStats />

            {/* Grid of utility links similar to president.uz footer style but as content */}
            <section className="bg-white py-24 border-t border-gray-100">
                <div className="max-w-[1440px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        <div className="space-y-6">
                            <h3 className="text-sm font-black text-[#1E3A8A] uppercase tracking-widest">{t('home.agency_socials')}</h3>
                            <div className="flex gap-4">
                                <a href={settings?.socials.telegram || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center hover:bg-[#1E3A8A] hover:text-white transition-all"><Send size={18} /></a>
                                <a href={settings?.socials.instagram || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center hover:bg-[#1E3A8A] hover:text-white transition-all"><Instagram size={18} /></a>
                                <a href={settings?.socials.facebook || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center hover:bg-[#1E3A8A] hover:text-white transition-all"><Facebook size={18} /></a>
                                <a href={settings?.socials.youtube || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center hover:bg-[#1E3A8A] hover:text-white transition-all"><Youtube size={18} /></a>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">{t('home.documents')}</h3>
                            <ul className="text-xs font-bold text-gray-600 space-y-3">
                                <li className="hover:text-[#1E3A8A] transition-colors"><Link to="/documents">{t('home.president_decisions')}</Link></li>
                                <li className="hover:text-[#1E3A8A] transition-colors"><Link to="/documents">{t('home.government_decisions')}</Link></li>
                                <li className="hover:text-[#1E3A8A] transition-colors"><Link to="/documents">{t('home.agency_orders')}</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">{t('home.press_service')}</h3>
                            <ul className="text-xs font-bold text-gray-600 space-y-3">
                                <li className="hover:text-[#1E3A8A] transition-colors"><Link to="/news">{t('home.latest_news')}</Link></li>
                                <li className="hover:text-[#1E3A8A] transition-colors"><Link to="/news">{t('home.events')}</Link></li>
                                <li className="hover:text-[#1E3A8A] transition-colors"><Link to="/news">{t('home.announcements')}</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">{t('home.services')}</h3>
                            <ul className="text-xs font-bold text-gray-600 space-y-3">
                                <li className="hover:text-[#1E3A8A] transition-colors"><Link to="/apply">{t('home.online_appeal')}</Link></li>
                                <li className="hover:text-[#1E3A8A] transition-colors"><Link to="/projects">{t('home.projects')}</Link></li>
                                <li className="hover:text-[#1E3A8A] transition-colors"><Link to="/about">{t('home.about_agency')}</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
