import { useEffect, useState } from 'react';
import api from '../services/api';
import { useTranslation } from 'react-i18next';
import Loader from '../components/common/Loader';

const Leadership = () => {
    const [leadership, setLeadership] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchLeadership = async () => {
            try {
                const res = await api.get('/settings');
                if (res.data?.leadership) {
                    setLeadership(res.data.leadership);
                }
            } catch (err) {
                console.error('Leadership fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchLeadership();
    }, []);

    if (loading) return <div className="py-32"><Loader /></div>;

    return (
        <div className="bg-white min-h-screen">
            {/* Page Header */}
            <div className="bg-gray-50 border-b border-gray-100 py-24">
                <div className="max-w-[1440px] mx-auto px-6">
                    <h1 className="text-6xl font-black text-[#1E3A8A] uppercase tracking-tighter leading-tight">{t('about.leadership')}</h1>
                    <p className="text-gray-400 mt-6 font-bold uppercase text-[11px] tracking-[0.3em]">{t('navbar.agency')}</p>
                </div>
            </div>

            {/* Leadership Grid */}
            <section className="max-w-[1440px] mx-auto px-6 py-32">
                {leadership.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 font-bold uppercase tracking-widest">Rahbarlar ma'lumoti kiritilmagan</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-32">
                        {leadership.map((leader, i) => (
                            <div key={i} className="flex flex-col items-center group">
                                <div className="w-full aspect-square rounded-sm overflow-hidden mb-10 transition-all duration-700 grayscale group-hover:grayscale-0 shadow-2xl relative">
                                    <img
                                        src={leader.image || '/avatar.png'}
                                        alt={leader.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-[#1E3A8A]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="text-center space-y-3">
                                    <h3 className="text-3xl font-black text-gray-900 tracking-tight uppercase leading-tight">{leader.name}</h3>
                                    <p className="text-[12px] font-black text-[#1E3A8A] uppercase tracking-widest border-t border-gray-100 pt-4 px-8 inline-block">
                                        {leader.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Leadership;
