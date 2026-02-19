import { useEffect, useState } from 'react';
import { ShieldCheck, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useTranslation } from 'react-i18next';
import Loader from '../components/common/Loader';

const About = () => {
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await api.get('/settings');
                setSettings(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    if (loading) return <div className="py-32"><Loader /></div>;
    // Fallback if settings are missing or empty
    const missionTitle = settings?.about?.missionTitle || t('about.mission');
    const missionText = settings?.about?.missionText || t('about.mission_text');
    const heroImage = settings?.about?.heroImage || "https://images.unsplash.com/photo-1521737711867-e3b97375f902";


    return (
        <div className="bg-white min-h-screen">
            {/* Page Header */}
            <div className="bg-gray-50 border-b border-gray-100 py-24">
                <div className="max-w-[1440px] mx-auto px-6">
                    <h1 className="text-6xl font-black text-[#1E3A8A] uppercase tracking-tighter leading-tight">{t('about.title')}</h1>
                    <p className="text-gray-400 mt-6 font-bold uppercase text-[11px] tracking-[0.3em]">{t('navbar.agency')}</p>
                </div>
            </div>

            {/* Mission Section */}
            <section className="max-w-[1440px] mx-auto px-6 py-32">
                <div className="flex flex-col lg:flex-row gap-24 items-center">
                    <div className="lg:w-1/2 space-y-12">
                        <h2 className="text-[13px] font-black text-[#1E3A8A] uppercase tracking-[0.3em] inline-block border-b-2 border-[#1E3A8A] pb-3">{t('about.mission')}</h2>
                        <div className="space-y-10 text-[16px] font-medium text-gray-500 leading-[1.8]">
                            <h3 className="text-3xl font-black text-gray-900 leading-tight uppercase tracking-tighter">{missionTitle}</h3>
                            <p className="whitespace-pre-line">
                                {missionText}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-10">
                            {[
                                { title: 'HUQUQIY HIMOYA', desc: 'Yoshlar manfaatlarini kafolatlash.', icon: <ShieldCheck size={32} className="text-[#1E3A8A]" /> },
                                { title: 'IJTIMOIY KO\'MAK', desc: 'Ijtimoiy yordam ko\'rsatish.', icon: <Target size={32} className="text-[#1E3A8A]" /> },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="shrink-0">{item.icon}</div>
                                    <div className="space-y-2">
                                        <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-widest">{item.title}</h4>
                                        <p className="text-[13px] text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full">
                        <div className="overflow-hidden shadow-2xl rounded-sm group relative aspect-video lg:aspect-square">
                            <img
                                src={heroImage}
                                alt="Agency"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-[#1E3A8A]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            {settings?.leadership?.length > 0 && (
                <section className="bg-gray-50 py-32 border-y border-gray-100">
                    <div className="max-w-[1440px] mx-auto px-6 text-center">
                        <h2 className="text-[13px] font-black text-[#1E3A8A] uppercase tracking-[0.3em] inline-block border-b-2 border-[#1E3A8A] pb-3 mb-24">{t('about.leadership')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                            {settings.leadership.map((leader: any, i: number) => (
                                <div key={i} className="flex flex-col items-center group">
                                    <div className="w-64 h-64 rounded-full border-8 border-white shadow-2xl overflow-hidden mb-10 transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:rotate-3">
                                        <img src={leader.image || '/avatar.png'} alt={leader.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-800 tracking-tight uppercase">{leader.name}</h3>
                                    <p className="text-[11px] font-black text-[#1E3A8A] uppercase tracking-widest mt-3">{leader.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer CTA */}
            <section className="bg-white py-32 text-center">
                <div className="max-w-3xl mx-auto space-y-10">
                    <h2 className="text-4xl font-black text-gray-800 uppercase tracking-tighter leading-tight">{t('application.title')}</h2>
                    <p className="text-[15px] font-medium text-gray-400 leading-relaxed">{t('application.subtitle')}</p>
                    <Link to="/apply" className="px-12 py-5 bg-[#1E3A8A] text-white text-[12px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all rounded-sm flex items-center gap-4 mx-auto shadow-2xl shadow-blue-900/20 w-fit">
                        {t('application.submit')} <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;
